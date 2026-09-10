using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ai4cuav.Models;

public class OrderDatasetProof
{
    public Guid Id { get; set; }

    [Required]
    public Guid OrderId { get; set; }

    [ForeignKey(nameof(OrderId))]
    [JsonIgnore]
    public Order Order { get; set; } = null!;

    [Required, MaxLength(255)]
    public string FileName { get; set; } = string.Empty;

    [Required, MaxLength(128)]
    public string ContentType { get; set; } = "application/octet-stream";

    [Required]
    public long SizeBytes { get; set; }

    [Required]
    public byte[] Content { get; set; } = Array.Empty<byte>(); 

    public DateTime UploadedAtUtc { get; set; } = DateTime.UtcNow;
}
