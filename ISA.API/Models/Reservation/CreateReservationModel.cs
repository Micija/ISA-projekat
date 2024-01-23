namespace ISA.API.Models.Reservation;

public class CreateReservationModel
{
    public int TermId { get; set; }
    public ICollection<CreateReservationItemModel> ReservationItems { get; set; } = default!;
}
