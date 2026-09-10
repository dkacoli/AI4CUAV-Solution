using ai4cuav.Models;
using AI4CUAV1.Models.Dtos;
using Microsoft.AspNetCore.Http;

namespace AI4CUAV1.Services
{
    public interface IOrderService
    {
        Task<(bool Succeeded, Order? Order, string? Error)> CreateAsync(CreateOrderDto dto);
        Task<Order?> GetByIdAsync(Guid id);
        Task<IEnumerable<Order>> GetAllAsync();
        Task<(bool Succeeded, object? Result, string? Error)> SetDatasetVerifiedAsync(Guid id, bool isVerified);
        Task<(bool Succeeded, object? Result, string? Error)> UploadDatasetProofAsync(Guid id, DatasetProofUploadDto form);
        Task<(byte[]? Content, string? ContentType, string? FileName, string? Error)> GetDatasetProofAsync(Guid id);
    }
}