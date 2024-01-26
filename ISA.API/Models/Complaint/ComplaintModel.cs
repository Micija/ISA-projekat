namespace ISA.API.Models.Complaint;

public class ComplaintModel
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Answer { get; set; } = default!;
}
