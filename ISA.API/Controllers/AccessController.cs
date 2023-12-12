using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace ISA.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AccessController : ControllerBase
{
    [HttpGet("public")]
    [Produces(MediaTypeNames.Application.Json)]
    public ActionResult Public()
    {
        return Ok();
    }

    [HttpGet("auth")]
    [Produces(MediaTypeNames.Application.Json)]
    [Authorize]
    public ActionResult Authentication()
    {
        return Ok();
    }

    [HttpGet("admin")]
    [Produces(MediaTypeNames.Application.Json)]
    [Authorize(Roles = "Admin")]
    public ActionResult Admin()
    {
        return Ok();
    }
}
