namespace AI4CUAV1.Services;

public sealed class SendGridConfig
{
    public string ApiKey { get; set; } = "";
    public string FromEmail { get; set; } = "";
    public string FromName { get; set; } = "";
}