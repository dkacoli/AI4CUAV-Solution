namespace AI4CUAV1.Services;

public interface INdaGenerator
{
    byte[] Generate(NdaData data);
}

public sealed class NdaData
{
    public string PartyName { get; init; } = "";
    public string PartyEmail { get; init; } = "";
    public string OrderId { get; init; } = "";
    public DateTime EffectiveDate { get; init; }
}
