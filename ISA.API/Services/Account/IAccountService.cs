using ISA.API.Models.Account;
using System.Security.Claims;

namespace ISA.API.Services.Account;

public interface IAccountService
{
    Task<RefreshTokenResponse> GenerateRefreshToken(
        ClaimsPrincipal user, 
        CancellationToken cancellationToken);

    Task<LoginResponse> LoginAsync(
        LoginRequest request, 
        CancellationToken cancellationToken);

    Task RegisterAsync(
        RegisterDto request, 
        CancellationToken cancellationToken);
}

