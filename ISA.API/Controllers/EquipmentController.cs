using ISA.API.Data.Entities;
using ISA.API.Services.Equipment;
using Microsoft.AspNetCore.Mvc;

namespace ISA.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EquipmentController : ControllerBase
{
    private readonly IEquipmentService _equipmentService;

    public EquipmentController(
        IEquipmentService equipmentService)
    {
        _equipmentService = equipmentService;
    }

    [HttpGet("Company/{companyId}")]
    public async Task<ActionResult<IEnumerable<EquipmentEntity>>> GetListByCompanyIdAsync([FromRoute] int companyId)
    {
        var result = await _equipmentService.GetListByCompanyIdAsync(companyId);

        return Ok(result);
    }
}
