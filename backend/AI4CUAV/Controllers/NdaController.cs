 
using AI4CUAV1.Models;
using AI4CUAV1.Services;
using Microsoft.AspNetCore.Mvc;

namespace AI4CUAV1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NdaController : ControllerBase
{
    private readonly INdaService _ndaService;

    public NdaController(INdaService ndaService)
    {
        _ndaService = ndaService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> Send([FromBody] SendNdaRequest req)
    {
        var (succeeded, result, statusCode, error) = await _ndaService.SendAsync(req);

        if (succeeded) return Ok(result);

        return statusCode switch
        {
            StatusCodes.Status400BadRequest => BadRequest(error),
            StatusCodes.Status502BadGateway => StatusCode(502, error),
            _ => StatusCode(500, error)
        };
    }
}