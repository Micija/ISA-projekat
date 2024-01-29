using ISA.API.Data.Models;
using ISA.API.Models.Account;
using ISA.API.Services.Util;
using ISA.API.Services.Util.Email;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace ISA.API.Services.Account;
public class AccountService : IAccountService
{
    private readonly JwtService _jwtService;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly UserManager<UserEntity> _userManager;
    private readonly IEmailService _emailService;

    public AccountService(
        JwtService jwtService,
        SignInManager<UserEntity> signInManager,
        UserManager<UserEntity> userManager,
        IEmailService emailService)
    {
        _jwtService = jwtService;
        _signInManager = signInManager;
        _userManager = userManager;
        _emailService = emailService;
    }

    public async Task<RefreshTokenResponse> GenerateRefreshToken(
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        var usr = await _userManager.FindByNameAsync(user.FindFirst(ClaimTypes.Email)!.Value);
        if (usr == null)
        {
            throw new ArgumentException("Token could not be generated");
        }

        return new RefreshTokenResponse {
            Token = await _jwtService.CreateJwt(usr)
        };
    }

    public async Task<LoginResponse> LoginAsync(
        LoginRequest request, 
        CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Username); 
        if (user == null)
        {
            throw new UnauthorizedAccessException("Wrong username or password");
        }

        var loginResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (!loginResult.Succeeded)
        {
            throw new UnauthorizedAccessException("Wrong username or password");
        }

        var roles = await _userManager.GetRolesAsync(user);
        return new LoginResponse
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Jwt = await _jwtService.CreateJwt(user),
            Role = roles.FirstOrDefault()!
        };
    }

    public async Task RegisterAsync(
        RegisterDto request, 
        CancellationToken cancellationToken)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email!.ToLower().Equals(request.Email.ToLower()))) {
            throw new ArgumentException("Email already exists");
        }

        var user = new UserEntity
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email,
            Job = request.Job,
            City = request.City,
            Phone = request.Phone,
            State = request.State
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            throw new ArgumentException(result.Errors.ToString());
        }

        var roleResult = await _userManager.AddToRoleAsync(user, "User");
        if (!roleResult.Succeeded)
        {
            throw new ArgumentException(result.Errors.ToString());
        }

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
        var url = "https://localhost:5001/api/Account/ConfirmEmail?token=" + token + "&email=" + user.Email;
        var message = $"<p>Please confirm you account <a href='{url}'>here</a>.";
        await _emailService.SendEmail(user.Email, "Email confirmation", message, new List<Attachment>());
    }

    public async Task<string> ConfirmEmail(
     string userEmail,
     string token)
    {
        var usr = await _userManager.FindByEmailAsync(userEmail);
        if (usr == null)
        {
            return "1";
        }

        if (usr.EmailConfirmed)
        {
            return "2";
        }

        token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
        var result = await _userManager.ConfirmEmailAsync(usr, token);
        if (!result.Succeeded)
        {
            return "3";
        }

        return string.Empty;
    }

    public async Task ResendEmailConfirmation(string email)
    {
        var usr = await _userManager.FindByEmailAsync(email);
        if (usr != null && !usr.EmailConfirmed)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(usr);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var url = "https://localhost:5001/Account/ConfirmEmail?token=" + token + "&email=" + usr.Email;
            var message = $"<p>Please confirm you account <a href='{url}'>here</a>.";
            await _emailService.SendEmail(usr.Email, "Email confirmation - resend", message, new List<Attachment>());
        }
    }
}
 