namespace ISA.API.Data.Entities;

public class EquipmentEntity
{
    public virtual CompanyEntity Company { get; set; } = default!;
    public virtual ICollection<ReservationItemEntity> ReservationItems { get; set; } = default!;
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Tag { get; set; } = default!;
    public int AvailableQuantity { get; set; }
    public int CompanyId { get; set; }
}
