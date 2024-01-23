using ISA.API.Data.Models;

namespace ISA.API.Data.Entities;

public class ReservationEntity
{
    public UserEntity User { get; set; } = default!;
    public TermEntity? Term { get; set; }
    public int Id { get; set; }
    public string UserId { get; set; } = default!;
    public ICollection<ReservationItemEntity> ReservationItems { get; set; } = default!;
}
