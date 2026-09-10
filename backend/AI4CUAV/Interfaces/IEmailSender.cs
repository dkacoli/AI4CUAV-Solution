namespace AI4CUAV1.Services;

public interface IEmailSender
{
    Task SendAsync(string toEmail, string subject, string htmlBody, byte[]? attachment = null, string? attachmentName = null);
}