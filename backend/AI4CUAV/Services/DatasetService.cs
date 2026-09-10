using ai4cuav.Models;
using AI4CUAV.Interfaces;
using AI4CUAV1.Data;
using Google.Cloud.Storage.V1;
using Microsoft.EntityFrameworkCore;

namespace AI4CUAV1.Services
{
    public class DatasetService : IDatasetService
    {
        private readonly AI4CUAVDbContext _db;
        private const string BucketName = "dataset-storage-ai4cuav";
        private static readonly string ObjectUrlPrefix = $"https://storage.googleapis.com/{BucketName}/";

        public DatasetService(AI4CUAVDbContext db)
        {
            _db = db;
        }

        public async Task<(bool Succeeded, object? Result, string? Error)> UploadAsync(DatasetUploadDto dto)
        {
            if (dto.File is not null)
            {
                string objectName = $"datasets/{Guid.NewGuid()}{Path.GetExtension(dto.File.FileName)}";

                using var memoryStream = new MemoryStream();
                await dto.File.CopyToAsync(memoryStream);
                memoryStream.Position = 0;

                var storageClient = await StorageClient.CreateAsync();
                await storageClient.UploadObjectAsync(BucketName, objectName, dto.File.ContentType, memoryStream);

                dto.FileURL = $"{ObjectUrlPrefix}{objectName}";
            }

            var dataset = new Dataset
            {
                Id = Guid.NewGuid(),
                ModelType = dto.ModelType,
                SensorType = dto.SensorType,
                Datasource = dto.Datasource,
                Resolution = dto.Resolution,
                FrameRate = dto.FrameRate,
                DataFormat = dto.DataFormat,
                NumberOfSamples = dto.NumberOfSamples,
                AnnotationType = dto.AnnotationType,
                TaskType = dto.TaskType,
                TrainingSize = dto.TrainingSize,
                ValidationSize = dto.ValidationSize,
                TestingSize = dto.TestingSize,
                ProjectPartner = dto.ProjectPartner,
                Commentss = dto.Commentss,
                DatasetSizeMB = (long?)(dto.File?.Length / 1024f / 1024f),
                FileURL = dto.FileURL
            };

            _db.Datasets.Add(dataset);
            await _db.SaveChangesAsync();

            return (true, new { dataset.Id, dataset.ModelType, dataset.FileURL }, null);
        }

        public async Task<IEnumerable<Dataset>> GetAllAsync()
        {
            return await _db.Datasets.OrderBy(d => d.ModelType).ToListAsync();
        }

        public async Task<(byte[]? Bytes, string? FileName, string? Error)> DownloadAsync(Guid id)
        {
            var dataset = await _db.Datasets.FindAsync(id);
            if (dataset == null)
                return (null, null, "Dataset not found");

            if (string.IsNullOrEmpty(dataset.FileURL) || !dataset.FileURL.StartsWith(ObjectUrlPrefix))
                return (null, null, "No file is available for this dataset");

            var objectName = dataset.FileURL[ObjectUrlPrefix.Length..];

            var storageClient = await StorageClient.CreateAsync();
            using var memoryStream = new MemoryStream();
            await storageClient.DownloadObjectAsync(BucketName, objectName, memoryStream);

            return (memoryStream.ToArray(), Path.GetFileName(objectName), null);
        }
    }
}
