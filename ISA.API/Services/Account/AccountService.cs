using ISA.API.Data.Models;
using ISA.API.Models.Account;
using ISA.API.Services.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ISA.API.Services.Account;
public class AccountService : IAccountService
{
    private readonly JwtService _jwtService;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly UserManager<UserEntity> _userManager;

    public AccountService(
        JwtService jwtService,
        SignInManager<UserEntity> signInManager,
        UserManager<UserEntity> userManager)
    {
        _jwtService = jwtService;
        _signInManager = signInManager;
        _userManager = userManager;
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

        return new LoginResponse
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Jwt = await _jwtService.CreateJwt(user)
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
            UserName = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            throw new ArgumentException(result.Errors.ToString());
        }

        var roleResult = await _userManager.AddToRoleAsync(user, "Admin");
        if (!roleResult.Succeeded)
        {
            throw new ArgumentException(result.Errors.ToString());
        }
    }
}
