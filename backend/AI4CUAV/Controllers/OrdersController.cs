using AI4CUAV1.Models.Dtos;
using AI4CUAV1.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AI4CUAV1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
        {
            _orderService = orderService;
            _logger = logger;
        }

        // Public: used by the order-submission wizard, before the customer has any account.
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
        {
            if (dto is null) return BadRequest("Body required.");

            var (succeeded, order, error) = await _orderService.CreateAsync(dto);
            if (!succeeded) return BadRequest(error);

            return CreatedAtAction(nameof(GetById), new { id = order!.Id }, order);
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var order = await _orderService.GetByIdAsync(id);
            return order is null ? NotFound() : Ok(order);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderService.GetAllAsync();
            return Ok(orders);
        }

        [HttpPatch("{id:guid}/dataset/verify")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SetDatasetVerified(Guid id, [FromBody] bool isVerified)
        {
            var (succeeded, result, error) = await _orderService.SetDatasetVerifiedAsync(id, isVerified);
            return succeeded ? Ok(result) : NotFound(error);
        }

        // Public: uploaded immediately after Create, in the same anonymous order-submission flow.
        [HttpPost("{id:guid}/dataset-proof")]
        [Consumes("multipart/form-data")]
        [AllowAnonymous]
        public async Task<IActionResult> UploadDatasetProof(Guid id, [FromForm] DatasetProofUploadDto form)
        {
            var (succeeded, result, error) = await _orderService.UploadDatasetProofAsync(id, form);
            return succeeded ? Ok(result) : BadRequest(error);
        }

        [HttpGet("{id:guid}/dataset-proof")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDatasetProof(Guid id)
        {
            var (content, contentType, fileName, error) = await _orderService.GetDatasetProofAsync(id);
            if (error is not null) return NotFound(error);
            return File(content!, contentType!, fileName);
        }
    }
}
