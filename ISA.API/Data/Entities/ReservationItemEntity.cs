namespace ISA.API.Data.Entities;

public class ReservationItemEntity
{
    public virtual EquipmentEntity Equipment { get; set; } = default!;
    public virtual ReservationEntity Reservation { get; set; } = default!;
    public int Id { get; set; }
    public int Quantity { get; set; }
    public int EquipmentId { get; set; }
    public int ReservationId { get; set; }
}
