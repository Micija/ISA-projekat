using ISA.API.Data.Entities;
using ISA.API.Models.Complaint;
using ISA.API.Repository.Complaints;

namespace ISA.API.Services.Complaint;

public class ComplaintService : IComplaintService
{
    private readonly IComplaintRepository _complaintRepository;

    public ComplaintService(IComplaintRepository complaintRepository)
    {
        _complaintRepository = complaintRepository;
    }
    public async Task CreateAsync(CreateComplaintModel request, string userId)
    {
        var entity = new ComplaintEntity
        {
            CompanyId = request.CompanyId,
            Date = DateTime.Now,
            Text = request.Text,
            UserId = userId
        };

        await _complaintRepository.CreateAsync(entity);
    }

    public async Task<IEnumerable<ComplaintEntity>> GetListForAdmin()
    {
        var list = await _complaintRepository.GetList();
        return list.Where(e => e.Answer.Equals(""));
    }

    public async Task<IEnumerable<ComplaintEntity>> GetListByUserId(string userId)
    {
        return await _complaintRepository.GetListByUserId(userId);
    }

    public async Task<string> AnswerComplaint(ComplaintAnswer request)
    {
        var complaint = await _complaintRepository.GetById(request.Id);
        if (complaint == null)
        {
            return "1";
        }
        complaint.Answer = request.Text;
        await _complaintRepository.Update(complaint);

        return string.Empty;
     }
}
