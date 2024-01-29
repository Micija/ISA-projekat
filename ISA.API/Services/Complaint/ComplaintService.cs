using ISA.API.Data.Entities;
using ISA.API.Data.Models;
using ISA.API.Models.Complaint;
using ISA.API.Repository.Complaints;
using ISA.API.Services.Util.Email;
using Microsoft.AspNetCore.Identity;
using System.Net.Mail;

namespace ISA.API.Services.Complaint;

public class ComplaintService : IComplaintService
{
    private readonly IComplaintRepository _complaintRepository;
    private readonly IEmailService _emailService;
    private readonly UserManager<UserEntity> _userManager;

    public ComplaintService(IComplaintRepository complaintRepository, IEmailService emailService, UserManager<UserEntity> userManager)
    {
        _complaintRepository = complaintRepository;
        _emailService = emailService;
        _userManager = userManager;
    }
    public async Task CreateAsync(CreateComplaintModel request, string userId)
    {
        var entity = new ComplaintEntity
        {
            CompanyId = request.CompanyId,
            Date = DateTime.Now,
            Text = request.Text,
            UserId = userId,
            Answer = string.Empty
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

        var user = await _userManager.FindByIdAsync(complaint.UserId);
        await _emailService.SendEmail(user!.Email!, "Odgovor na zalbu", complaint.Answer, new List<Attachment>());

        return string.Empty;
     }
}
