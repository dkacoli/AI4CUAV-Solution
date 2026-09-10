 
using ai4cuav.Models.Dtos;
using Microsoft.AspNetCore.Identity;

namespace AI4CUAV1.Services
{
    public interface IAuthService
    {
        Task<(bool Succeeded, object Result)> RegisterAsync(RegisterDto dto);
        Task<(bool Succeeded, string? Token, string? Error)> LoginAsync(LoginDto dto);
    }
}