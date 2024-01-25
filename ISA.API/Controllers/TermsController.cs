using ISA.API.Data.Entities;
using ISA.API.Services.Term;
using ISA.API.Services.Util.Email;
using ISA.API.Services.Util.QrCode;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net.Mime;

namespace ISA.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TermsController : ControllerBase
{
    private readonly ITermService _termService;

    public TermsController(ITermService termService)
    {
        _termService = termService;
    }

    [HttpGet("Company/{companyId}")]
    public async Task<ActionResult<IEnumerable<CompanyEntity>>> GetAvailableTermsByCompanyAsync([FromRoute] int companyId)
    {
        var terms = await _termService.GetAvailableListByCompanyIdAsync(companyId);
        return Ok(terms);
    }

}
