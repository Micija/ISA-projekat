using ISA.API.Data.Models;

namespace ISA.API.Data.Entities;

public class ComplaintEntity
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string UserId { get; set; } = default!;
    public int CompanyId { get; set; }
    public DateTime Date { get; set; }
    public virtual CompanyEntity Company { get; set; } = default!;
    public virtual UserEntity User { get; set; } = default!;
    public string Answer { get; set; } = default!;

}
