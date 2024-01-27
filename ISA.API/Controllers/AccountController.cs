using ISA.API.Data.Entities;
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

    [HttpGet("ConfirmEmail")]
    public async Task<ActionResult> ConfirmEmail(
    [FromQuery] string token,
    [FromQuery] string email)
    {
        var response = await _accountService.ConfirmEmail(email, token);
        if (response.Equals("1"))
        {
            return BadRequest("Email is not valid");
        } else if (response.Equals("2"))
        {
            return BadRequest("Account is already confirmed");
        } else if (response.Equals("3"))
        {
            return BadRequest("Token is not valid");
        }

        return Ok("Nalog je aktiviran. Idite na stranicu za prijavu");
    }

    [HttpPost("ResendEmailConfirmation")]
    public async Task<ActionResult> ResendEmailConfirmation(
   [FromBody] EmailConfirmation request)
    {
        await _accountService.ResendEmailConfirmation(request.Email);

        return Ok();
    }
}
