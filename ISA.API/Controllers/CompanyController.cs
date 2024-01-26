using ISA.API.Data.Entities;
using ISA.API.Models.Company;
using ISA.API.Services.Company;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ISA.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly ICompanyService _companyService;

    public CompanyController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    public async Task<ActionResult<IEnumerable<CompanyEntity>>> GetCompaniesAsync()
    {
        var companies = await _companyService.GetAllAsync();
        return Ok(companies);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CompanyEntity?>> GetCompanyByIdAsync([FromRoute] int id)
    {
        var company = await _companyService.GetByIdAsync(id);
        if (company == null)
        {
            return NotFound();
        }

        return Ok(company);
    }

    [Authorize]
    [HttpGet("Complaints")]
    public async Task<ActionResult<IEnumerable<CompanyEntity>>> GetCompaniesForComplaintsAsync()
    {
        var companies = await _companyService.GetCompaniesWhichUserCooperatedWithAsync(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        return Ok(companies.Select(e => new CompanyForComplaint
        {
            Id = e.Id,
            Address = e.Address,
            Name = e.Name
        }));
    }
}
