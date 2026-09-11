// Services/OrderService.cs
using System.IO;
using ai4cuav.Models;
using ai4cuav.Models.Enums;
using AI4CUAV1.Data;
using AI4CUAV1.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace AI4CUAV1.Services
{
    public class OrderService : IOrderService
    {
        private readonly AI4CUAVDbContext _db;
        private static readonly string[] AllowedProofTypes = { "application/pdf", "image/png", "image/jpeg" };

        public OrderService(AI4CUAVDbContext db)
        {
            _db = db;
        }

        public async Task<(bool Succeeded, Order? Order, string? Error)> CreateAsync(CreateOrderDto dto)
        {
            var detectionTypes = new List<DetectionType>();
            foreach (var raw in dto.DetectionTypes)
            {
                if (!Enum.TryParse<DetectionType>(raw, ignoreCase: true, out var parsed))
                    return (false, null, $"'{raw}' is not a valid detection type.");
                detectionTypes.Add(parsed);
            }

            var order = new Order
            {
                Id = Guid.NewGuid(),
                DetectionTypes = detectionTypes,
                DroneTypes = dto.DroneTypes ?? Array.Empty<DroneType>(),
                MultiRotorClasses = dto.MultiRotorClasses ?? Array.Empty<MultiRotorClass>(),
                FixedWingClasses = dto.FixedWingClasses ?? Array.Empty<FixedWingClass>(),
                HybridVTOLClasses = dto.HybridVTOLClasses ?? Array.Empty<HybridVTOLClass>(),
                RecognitionType = dto.RecognitionType,
                RecognitionMethods = dto.RecognitionMethods?.ToList() ?? new List<RecognitionMethod>(),
                RequiresTracking = dto.RequiresTracking,
                ProvideOwnDataset = dto.ProvideOwnDataset,
                DataFusionMethod = dto.DataFusionMethod,
                CustomModelNeed = dto.CustomModelNeed,
                Specifications = dto.Specifications,
                UrgencyLevel = string.IsNullOrWhiteSpace(dto.UrgencyLevel) ? "Low" : dto.UrgencyLevel,
                AdditionalDetails = dto.AdditionalDetails,
                DatasetURL = dto.DatasetURL,
                CreatedAt = DateTime.UtcNow,
                OrderStatus = "Pending",
                Enviroment = dto.Enviroment,
                HasAnnotationType = dto.HasAnnotationType,
                AnnotationFormat = "YOLO",
                DataModality = dto.DataModality,
                IsDatasetVerified = dto.IsDatasetVerified
            };

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();
            return (true, order, null);
        }

        public async Task<Order?> GetByIdAsync(Guid id) =>
            await _db.Orders.FindAsync(id);

        public async Task<IEnumerable<Order>> GetAllAsync() =>
            await _db.Orders.OrderByDescending(o => o.CreatedAt).ToListAsync();

        public async Task<(bool Succeeded, object? Result, string? Error)> SetDatasetVerifiedAsync(Guid id, bool isVerified)
        {
            var order = await _db.Orders.FindAsync(id);
            if (order is null)
                return (false, null, "Order not found.");

            order.IsDatasetVerified = isVerified;
            await _db.SaveChangesAsync();
            return (true, new { orderId = id, isVerified }, null);
        }

        public async Task<(bool Succeeded, object? Result, string? Error)> UploadDatasetProofAsync(Guid id, DatasetProofUploadDto form)
        {
            var file = form.File;
            if (file is null || file.Length == 0)
                return (false, null, "File is required.");

            var order = await _db.Orders.FindAsync(id);
            if (order is null)
                return (false, null, "Order not found.");

            if (!order.IsDatasetVerified)
                return (false, null, "Dataset is not marked as verified.");

            var contentType = string.IsNullOrWhiteSpace(file.ContentType)
                ? "application/octet-stream"
                : file.ContentType;

            if (!AllowedProofTypes.Contains(contentType))
                return (false, null, "Only PDF/PNG/JPEG are allowed as proof.");

            byte[] bytes;
            await using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                bytes = ms.ToArray();
            }

            var existing = await _db.OrderDatasetProofs.SingleOrDefaultAsync(p => p.OrderId == id);
            if (existing is null)
            {
                _db.OrderDatasetProofs.Add(new OrderDatasetProof
                {
                    OrderId = id,
                    FileName = Path.GetFileName(file.FileName),
                    ContentType = contentType,
                    SizeBytes = file.Length,
                    Content = bytes
                });
            }
            else
            {
                existing.FileName = Path.GetFileName(file.FileName);
                existing.ContentType = contentType;
                existing.SizeBytes = file.Length;
                existing.Content = bytes;
                existing.UploadedAtUtc = DateTime.UtcNow;
            }

            if (!order.IsDatasetVerified)
                order.IsDatasetVerified = true;

            await _db.SaveChangesAsync();
            return (true, new { status = "uploaded", size = file.Length }, null);
        }

        public async Task<(byte[]? Content, string? ContentType, string? FileName, string? Error)> GetDatasetProofAsync(Guid id)
        {
            var proof = await _db.OrderDatasetProofs.SingleOrDefaultAsync(p => p.OrderId == id);
            if (proof is null)
                return (null, null, null, "Proof not found.");

            return (proof.Content, proof.ContentType, proof.FileName, null);
        }
    }
}