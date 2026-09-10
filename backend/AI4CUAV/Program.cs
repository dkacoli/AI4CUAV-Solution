using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using AI4CUAV.Interfaces;
using AI4CUAV1.Data;
using AI4CUAV1.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.CustomSchemaIds(t => t.FullName);
});

builder.Services.AddDbContext<AI4CUAVDbContext>(opts =>
    opts.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireDigit = false;
})
.AddEntityFrameworkStores<AI4CUAVDbContext>()
.AddDefaultTokenProviders();

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));
var jwt = builder.Configuration.GetSection("Jwt").Get<JwtOptions>()
    ?? throw new InvalidOperationException("Jwt configuration section is missing.");
if (string.IsNullOrWhiteSpace(jwt.Key))
    throw new InvalidOperationException("Jwt:Key is not configured. Set it via user-secrets or an environment variable.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = true;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwt.Issuer,
        ValidateAudience = true,
        ValidAudience = jwt.Audience,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key))
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdmin", policy => policy.RequireRole("Admin"));
});

builder.Services.Configure<SmtpConfig>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddSingleton<IEmailSender, SmtpEmailSender>();
builder.Services.AddSingleton<INdaGenerator, PdfNdaGenerator>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDatasetService, DatasetService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<INdaService, NdaService>();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

var app = builder.Build();

app.UseExceptionHandler(errApp =>
{
    errApp.Run(async context =>
    {
        var feature = context.Features.Get<IExceptionHandlerFeature>();
        app.Logger.LogError(feature?.Error, "Unhandled exception");

        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = "An unexpected error occurred." }));
    });
});

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    const string adminRole = "Admin";
    if (!await roleManager.RoleExistsAsync(adminRole))
    {
        await roleManager.CreateAsync(new IdentityRole(adminRole));
    }

    var seedEmail = builder.Configuration["Seed:AdminEmail"];
    var seedPassword = builder.Configuration["Seed:AdminPassword"];
    if (!string.IsNullOrWhiteSpace(seedEmail) && !string.IsNullOrWhiteSpace(seedPassword))
    {
        var admin = await userManager.FindByEmailAsync(seedEmail);
        if (admin == null)
        {
            admin = new IdentityUser { UserName = seedEmail, Email = seedEmail, EmailConfirmed = true };
            await userManager.CreateAsync(admin, seedPassword);
            await userManager.AddToRoleAsync(admin, adminRole);
        }
    }
    else
    {
        app.Logger.LogInformation(
            "Seed:AdminEmail / Seed:AdminPassword are not configured — no admin account was seeded. " +
            "Set them via user-secrets to create one for local development.");
    }
}

app.Run();
