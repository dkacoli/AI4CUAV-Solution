using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace AI4CUAV1.Services;

public sealed class SmtpEmailSender : IEmailSender
{
    private readonly SmtpConfig _cfg;

    public SmtpEmailSender(IOptions<SmtpConfig> cfg) => _cfg = cfg.Value;

    public async Task SendAsync(string toEmail, string subject, string htmlBody, byte[]? attachment = null, string? attachmentName = null)
    {
        if (string.IsNullOrWhiteSpace(_cfg.Username) || string.IsNullOrWhiteSpace(_cfg.Password))
            throw new InvalidOperationException("SMTP credentials are not configured.");

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_cfg.FromName, _cfg.FromEmail));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = subject;

        var builder = new BodyBuilder { HtmlBody = htmlBody };
        if (attachment is not null && !string.IsNullOrWhiteSpace(attachmentName))
        {
            builder.Attachments.Add(attachmentName, attachment, new ContentType("application", "pdf"));
        }
        message.Body = builder.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(_cfg.Host, _cfg.Port, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_cfg.Username, _cfg.Password);
        await client.SendAsync(message);
        await client.DisconnectAsync(quit: true);
    }
}
