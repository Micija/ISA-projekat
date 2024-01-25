using ISA.API.Data.Models;

namespace ISA.API.Data.Entities;

public class ReservationHistoryEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = default!;
    public int ReservationId { get; set; }
}
