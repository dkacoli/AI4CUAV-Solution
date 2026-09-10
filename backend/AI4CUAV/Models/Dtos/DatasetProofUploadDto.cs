using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace AI4CUAV1.Models.Dtos
{
    public class DatasetProofUploadDto
    {
        [Required]
        public IFormFile File { get; set; } = default!;
    }
}