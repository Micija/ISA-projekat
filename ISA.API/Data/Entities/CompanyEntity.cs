namespace ISA.API.Data.Entities;

public class CompanyEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Address { get; set; } = default!;
    public virtual ICollection<EquipmentEntity> Equipment { get; set; } = default!;
    public virtual ICollection<TermEntity> Terms { get; set; } = default!;
    public virtual ICollection<ComplaintEntity> Complaints { get; set; } = default!;
}
