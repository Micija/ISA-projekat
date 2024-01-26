using ISA.API.Models.Complaint;
using ISA.API.Models.Reservation;
using ISA.API.Services.Complaint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ISA.API.Controllers;

[Route("api/[controller]")]
[ApiController]

public class ComplaintController: ControllerBase
{
    private readonly IComplaintService _complaintService;

    public ComplaintController(IComplaintService complaintService)
    {
        _complaintService = complaintService;
    }
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateAsync([FromBody] CreateComplaintModel request)
    {
        await _complaintService.CreateAsync(request, User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        return Ok();
    }

    [HttpGet("My")]
    [Authorize]
    public async Task<IActionResult> MyComplaintsAsync()
    {
        var complaints = await _complaintService.GetListByUserId(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        return Ok(complaints.Select(e => new ComplaintModel
        {
            Id = e.Id,
            CompanyName = e.Company.Name,
            Date = e.Date,
            Text = e.Text,
            Answer = e.Answer
        }));
    }

    [HttpGet("Admin")]
    [Authorize]
    public async Task<IActionResult> AdminComplaintsAsync()
    {
        var complaints = await _complaintService.GetListForAdmin();
        return Ok(complaints.Select(e => new AdminComplaintModel
        {
            Id = e.Id,
            CompanyName = e.Company.Name,
            Date = e.Date,
            Text = e.Text,
            UserName = $"{e.User.FirstName} {e.User.LastName}"
        }));
    }


    [HttpPost("Answer")]
    [Authorize]
    public async Task<IActionResult> AdminAnswerComplaint([FromBody] ComplaintAnswer request)
    {
        var error = await _complaintService.AnswerComplaint(request);
        if (error.Equals("1"))
        {
            return BadRequest("Zalba nije pronadjena");
        }
        return Ok();
    }
}
