using ISA.API.Data.Entities;
using ISA.API.Models.Complaint;

namespace ISA.API.Services.Complaint;

public interface IComplaintService
{
    Task CreateAsync(CreateComplaintModel request, string userId);
    Task<IEnumerable<ComplaintEntity>> GetListForAdmin();
    Task<IEnumerable<ComplaintEntity>> GetListByUserId(string value);
    Task<string> AnswerComplaint(ComplaintAnswer request);
}
