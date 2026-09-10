using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ai4cuav.Models.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AI4CUAV1.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _users;
        private readonly JwtOptions _jwt;

        public AuthService(UserManager<IdentityUser> users, IOptions<JwtOptions> jwt)
        {
            _users = users;
            _jwt = jwt.Value;
        }

        public async Task<(bool Succeeded, object Result)> RegisterAsync(RegisterDto dto)
        {
            // Self-registration never grants roles — the client cannot request "Admin" for itself.
            // Admin accounts are seeded separately (see Program.cs) or promoted by an existing admin.
            var user = new IdentityUser { UserName = dto.Email, Email = dto.Email };
            var result = await _users.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
                return (false, result.Errors);

            return (true, new { user.Id, user.Email });
        }

        public async Task<(bool Succeeded, string? Token, string? Error)> LoginAsync(LoginDto dto)
        {
            var user = await _users.FindByEmailAsync(dto.Email);
            if (user == null)
                return (false, null, "Invalid credentials");

            if (!await _users.CheckPasswordAsync(user, dto.Password))
                return (false, null, "Invalid credentials");

            var token = await GenerateJwtTokenAsync(user);
            return (true, token, null);
        }

        private async Task<string> GenerateJwtTokenAsync(IdentityUser user)
        {
            var key = Encoding.UTF8.GetBytes(_jwt.Key);

            var baseClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName ?? user.Email ?? ""),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? "")
            };

            var allClaims = new List<Claim>(baseClaims);
            var roles = await _users.GetRolesAsync(user);
            foreach (var role in roles)
                allClaims.Add(new Claim(ClaimTypes.Role, role));

            var creds = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: allClaims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.ExpireMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
