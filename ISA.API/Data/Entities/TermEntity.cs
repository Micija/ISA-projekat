namespace ISA.API.Data.Entities;

public class TermEntity
{
    public virtual CompanyEntity Company { get; set; } = default!;
    public virtual ReservationEntity? Reservation { get; set; }
    public int Id { get; set; }
    public DateOnly TermStart { get; set; }
    public int CompanyId { get; set; }
    public int? ReservationId { get; set; }
}
