namespace ISA.API.Models.Complaint;

public class CreateComplaintModel
{
    public string Text { get; set; } = string.Empty;
    public int CompanyId { get; set; }
}
