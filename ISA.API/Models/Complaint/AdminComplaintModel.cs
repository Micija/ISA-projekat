namespace ISA.API.Models.Complaint;

public class AdminComplaintModel
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string UserName { get; set; } = string.Empty;
}
