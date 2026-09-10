 
using AI4CUAV1.Models;

namespace AI4CUAV1.Services
{
    public interface INdaService
    {
        Task<(bool Succeeded, object? Result, int StatusCode, string? Error)> SendAsync(SendNdaRequest req);
    }
}