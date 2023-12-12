using ISA.API.Models.Account;
using ISA.API.Services.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ISA.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(
        IAccountService accountService
        )
    {
        _accountService = accountService;
    }

    [HttpPost("Login")]
    public async Task<ActionResult<LoginResponse>> Login(
        LoginRequest request, 
        CancellationToken cancellationToken = default!)
    {
        try { 
        var result = await _accountService.LoginAsync(request, cancellationToken);
        return Ok(result);
        } catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpPost("Register")]
    public async Task<ActionResult> Register(
       RegisterDto request,
       CancellationToken cancellationToken = default!)
    {
        try
        {
            await _accountService.RegisterAsync(request, cancellationToken);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("refresh-token")]
    [Authorize]
    public async Task<ActionResult<RefreshTokenResponse>> RefreshToken(
        CancellationToken cancellationToken)
    {
        try
        { 
            var response = await _accountService.GenerateRefreshToken(User, cancellationToken);
            return response;
        } catch (ArgumentException exception)
        {
            return BadRequest(exception.Message);
        }
    }
}
