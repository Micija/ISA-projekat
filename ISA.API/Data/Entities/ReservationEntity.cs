using ISA.API.Data.Models;

namespace ISA.API.Data.Entities;

public class ReservationEntity
{
    public UserEntity User { get; set; } = default!;
    public TermEntity? Term { get; set; }
    public int Id { get; set; }
    public int UserId { get; set; }
}
