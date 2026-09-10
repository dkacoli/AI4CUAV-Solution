using AI4CUAV.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AI4CUAV1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class DatasetsController : ControllerBase
    {
        private readonly IDatasetService _datasetService;

        public DatasetsController(IDatasetService datasetService)
        {
            _datasetService = datasetService;
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload([FromForm] DatasetUploadDto dto)
        {
            var (succeeded, result, error) = await _datasetService.UploadAsync(dto);
            return succeeded ? Ok(result) : BadRequest(error);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var datasets = await _datasetService.GetAllAsync();
            return Ok(datasets);
        }

        [HttpGet("{id:guid}/download")]
        public async Task<IActionResult> Download(Guid id)
        {
            var (bytes, fileName, error) = await _datasetService.DownloadAsync(id);
            if (error != null) return NotFound(error);
            return File(bytes!, "application/octet-stream", fileName);
        }
    }
}