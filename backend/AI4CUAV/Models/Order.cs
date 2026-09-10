using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ai4cuav.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace ai4cuav.Models
{
    public class Order
    {
        public Guid Id { get; set; }

        //[Required]
        //public string UserId { get; set; }

        //[ForeignKey("UserId")]
        //public IdentityUser User { get; set; }

        [Required]
        public List<DetectionType> DetectionTypes { get; set; } = new();

        [Required]
        public DroneType[] DroneTypes { get; set; }
        public MultiRotorClass[]? MultiRotorClasses { get; set; }
        public FixedWingClass[]? FixedWingClasses { get; set; }
        public HybridVTOLClass[]? HybridVTOLClasses { get; set; }
        [Required]
        public DroneRecognitionType RecognitionType { get; set; }

        public List<RecognitionMethod> RecognitionMethods { get; set; } = new();

        public bool RequiresTracking { get; set; } = false;
        public bool ProvideOwnDataset { get; set; } = false;

        //public Dataset? Dataset { get; set; }
        public string? DataFusionMethod { get; set; } = "Raw Data";

        public string? CustomModelNeed { get; set; }

        public string? Specifications { get; set; }

        public string? UrgencyLevel { get; set; } = "Medium";

        public string? AdditionalDetails { get; set; }

        public string? OrderStatus { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? DatasetURL { get; set; }
        public string Enviroment { get; set; }

        public string? DataModality { get; set; }

        public bool HasAnnotationType {  get; set; }
        public string? AnnotationFormat { get; set; }

        public bool IsDatasetVerified { get; set; }

    }

}
