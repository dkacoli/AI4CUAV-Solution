using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AI4CUAV1.Services;

public sealed class SendGridEmailSender : IEmailSender
{
    private readonly SendGridConfig _cfg;

    public SendGridEmailSender(IOptions<SendGridConfig> cfg) => _cfg = cfg.Value;

    public async Task SendAsync(string toEmail, string subject, string htmlBody, byte[]? attachment = null, string? attachmentName = null)
    {
        if (string.IsNullOrWhiteSpace(_cfg.ApiKey))
            throw new InvalidOperationException("SendGrid ApiKey not configured.");

        var client = new SendGridClient(_cfg.ApiKey);
        var from = new EmailAddress(_cfg.FromEmail, _cfg.FromName);
        var to = new EmailAddress(toEmail);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent: null, htmlContent: htmlBody);

        if (attachment is not null && !string.IsNullOrWhiteSpace(attachmentName))
        {
            msg.AddAttachment(attachmentName, Convert.ToBase64String(attachment), "application/pdf");
        }

        var response = await client.SendEmailAsync(msg);
        if ((int)response.StatusCode >= 300)
        {
            var body = await response.Body.ReadAsStringAsync();
            throw new InvalidOperationException($"SendGrid failed: {(int)response.StatusCode} {response.StatusCode} {body}");
        }
    }
}
