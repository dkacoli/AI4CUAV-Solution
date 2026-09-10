using ai4cuav.Models.Dtos;
using AI4CUAV1.Services;
using Microsoft.AspNetCore.Mvc;

namespace AI4CUAV1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var (succeeded, result) = await _authService.RegisterAsync(dto);
            return succeeded ? Ok(result) : BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var (succeeded, token, error) = await _authService.LoginAsync(dto);
            return succeeded ? Ok(new { token }) : Unauthorized(error);
        }
    }
}