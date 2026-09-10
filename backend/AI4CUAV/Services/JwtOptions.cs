namespace AI4CUAV1.Services;

public sealed class JwtOptions
{
    public string Key { get; set; } = "";
    public string Issuer { get; set; } = "";
    public string Audience { get; set; } = "";
    public int ExpireMinutes { get; set; } = 60;
}
