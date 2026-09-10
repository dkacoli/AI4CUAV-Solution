using System;
using System.ComponentModel.DataAnnotations;
using ai4cuav.Models.Enums;

namespace ai4cuav.Models
{
    public class Dataset
    {
        public Guid Id { get; set; }

        [Required]
        public string ModelType { get; set; }
        [Required]
        public string SensorType { get; set; }
        [Required]
        public string Datasource { get; set; }
        [Required]
        public string Resolution { get; set; }

        [Required]
        public string FrameRate { get; set; }
        [Required]
        public string DataFormat { get; set; }
        [Required]
        public string NumberOfSamples { get; set; }
        [Required]
        public AnnotationType AnnotationType { get; set; }
        [Required]
        public DetectionType TaskType { get; set; }

        public double TrainingSize { get; set; }

        public double ValidationSize { get; set; }
        
        public double TestingSize { get; set; }
        
        public string ProjectPartner { get; set; }

        public long? DatasetSizeMB { get; set; } 

        public string? Commentss { get; set; }
        public string? FileURL { get; set; }
    }

   
}
