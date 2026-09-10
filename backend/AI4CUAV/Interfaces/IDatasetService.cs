using ai4cuav.Models;

namespace AI4CUAV.Interfaces
{
    public interface IDatasetService
    {
        Task<(bool Succeeded, object? Result, string? Error)> UploadAsync(DatasetUploadDto dto);
        Task<IEnumerable<Dataset>> GetAllAsync();
        Task<(byte[]? Bytes, string? FileName, string? Error)> DownloadAsync(Guid id);
    }
}
