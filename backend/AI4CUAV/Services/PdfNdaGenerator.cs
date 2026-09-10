using AI4CUAV.Interfaces;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace AI4CUAV1.Services;

public sealed class PdfNdaGenerator : INdaGenerator
{
    public byte[] Generate(NdaData data)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        var doc = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(36);
                page.Size(PageSizes.A4);
                page.DefaultTextStyle(x => x.FontSize(11));

                page.Header().Text("Mutual Non-Disclosure Agreement")
                    .SemiBold().FontSize(16).Underline();

                page.Content().PaddingVertical(10).Column(col =>
                {
                    col.Item().Text($"Effective Date: {data.EffectiveDate:yyyy-MM-dd}");
                    col.Item().Text($"Order ID: {data.OrderId}");
                    col.Item().Text($"Recipient: {data.PartyName} <{data.PartyEmail}>");
                    col.Item().Text("Disclosing Party: Your Company, Inc.");

                    col.Item().PaddingTop(12).Text("1. Confidential Information. All non-public information disclosed is confidential.");
                    col.Item().Text("2. Permitted Use. Recipient shall use the information solely to evaluate or perform the Order.");
                    col.Item().Text("3. Term. This Agreement remains in effect for 2 years from the Effective Date.");
                    col.Item().Text("4. Return/Destruction. Upon request, Recipient will delete or return all Confidential Information.");
                    col.Item().Text("5. Miscellaneous. Governed by the laws of [Your Jurisdiction].");

                    col.Item().PaddingTop(24).Row(r =>
                    {
                        r.RelativeItem().Column(c =>
                        {
                            c.Item().Text("Disclosing Party").SemiBold();
                            c.Item().Text("AI4CUAV, Inc.");
                            c.Item().PaddingTop(18).Text("Signature: ____AI4CUAV___________________");
                            c.Item().Text("Name: _____________NATO SPS_______________");
                            c.Item().Text("Title: _____________________________");
                        });
                        r.RelativeItem().Column(c =>
                        {
                            c.Item().Text("Recipient").SemiBold();
                            c.Item().Text($"{data.PartyName} <{data.PartyEmail}>");
                            c.Item().PaddingTop(18).Text("Signature: _______________________");
                            c.Item().Text("Name: ____________________________");
                            c.Item().Text("Title: _____________________________");
                        });
                    });
                });

                page.Footer().AlignCenter().Text(txt =>
                {
                    txt.Span("Page ");
                    txt.CurrentPageNumber();
                    txt.Span(" of ");
                    txt.TotalPages();
                });
            });
        });

        return doc.GeneratePdf();
    }
}
