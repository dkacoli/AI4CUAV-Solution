// Services/NdaService.cs
using AI4CUAV.Interfaces;
using AI4CUAV1.Models;
using Microsoft.AspNetCore.Http;

namespace AI4CUAV1.Services
{
    public class NdaService : INdaService
    {
        private readonly IEmailSender _emailSender;
        private readonly INdaGenerator _ndaGenerator;
        private readonly ILogger<NdaService> _logger;

        public NdaService(IEmailSender emailSender, INdaGenerator ndaGenerator, ILogger<NdaService> logger)
        {
            _emailSender = emailSender;
            _ndaGenerator = ndaGenerator;
            _logger = logger;
        }

        public async Task<(bool Succeeded, object? Result, int StatusCode, string? Error)> SendAsync(SendNdaRequest req)
        {
            if (!IsValidEmail(req.Email))
                return (false, null, StatusCodes.Status400BadRequest, "Invalid email.");

            if (string.IsNullOrWhiteSpace(req.OrderId))
                return (false, null, StatusCodes.Status400BadRequest, "OrderId is required.");

            byte[] pdfBytes;
            try
            {
                pdfBytes = _ndaGenerator.Generate(new NdaData
                {
                    PartyName = req.PartyName ?? "Customer",
                    PartyEmail = req.Email,
                    OrderId = req.OrderId,
                    EffectiveDate = DateTime.UtcNow.Date
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PDF generation failed");
                return (false, null, StatusCodes.Status500InternalServerError, "Failed to generate NDA.");
            }

            var subject = $"NDA for Order {req.OrderId}";
            var html = $@"
                <p>Hi{(string.IsNullOrWhiteSpace(req.PartyName) ? "" : $" {System.Net.WebUtility.HtmlEncode(req.PartyName)}")},</p>
                <p>Attached is your NDA for order <b>{System.Net.WebUtility.HtmlEncode(req.OrderId)}</b>.</p>
                <p>If you did not request this, you can ignore this email.</p>
                <p>— AI4CUAV</p>";

            try
            {
                await _emailSender.SendAsync(req.Email, subject, html, pdfBytes, $"NDA-{SanitizeFileName(req.OrderId)}.pdf");
                return (true, new { status = "sent" }, StatusCodes.Status200OK, null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Email send failed");
                return (false, null, StatusCodes.Status502BadGateway, "Email provider error.");
            }
        }

        private static bool IsValidEmail(string email)
        {
            try { _ = new System.Net.Mail.MailAddress(email); return true; }
            catch { return false; }
        }

        private static string SanitizeFileName(string s)
        {
            foreach (var c in Path.GetInvalidFileNameChars())
                s = s.Replace(c, '_');
            return s;
        }
    }
}