using System.ComponentModel.DataAnnotations;
using ai4cuav.Models.Enums;

namespace AI4CUAV1.Models.Dtos
{
    public class CreateOrderDto
    {
        [Required, MinLength(1)]
        public string[] DetectionTypes { get; set; } = Array.Empty<string>();
        public DroneType[]? DroneTypes { get; set; }
        public MultiRotorClass[]? MultiRotorClasses { get; set; }
        public FixedWingClass[]? FixedWingClasses { get; set; }
        public HybridVTOLClass[]? HybridVTOLClasses { get; set; }
        [Required]
        public DroneRecognitionType RecognitionType { get; set; }
        public RecognitionMethod[]? RecognitionMethods { get; set; }
        public bool RequiresTracking { get; set; }
        public bool ProvideOwnDataset { get; set; }
        public string? DataFusionMethod { get; set; }
        public string? CustomModelNeed { get; set; }
        public string? Specifications { get; set; }
        public string? UrgencyLevel { get; set; }
        public string? AdditionalDetails { get; set; }
        public string? DatasetURL { get; set; }

        [Required]
        public string Enviroment { get; set; } = "";
        public bool HasAnnotationType { get; set; }
        public string? AnnotationFormat { get; set; }

        public string? DataModality { get; set; }
        public bool IsDatasetVerified { get; set; } = false;
    }
}
