using ISA.API.Data.Entities;
using ISA.API.Services.Term;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<ActionResult<IEnumerable<CompanyEntity>>> GetTermsByCompanyAsync([FromRoute] int companyId)
    {
        var terms = await _termService.GetListByCompanyIdAsync(companyId);
        return Ok(terms);
    }
}
