using ISA.API.Data.Entities;
using ISA.API.Services.Company;
using Microsoft.AspNetCore.Mvc;

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
}
