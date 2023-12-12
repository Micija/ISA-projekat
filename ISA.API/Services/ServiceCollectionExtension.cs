using ISA.API.Services.Account;
using ISA.API.Services.Util;

namespace ISA.API.Services;
public static class ServiceCollectionExtension
{
    public static IServiceCollection RegisterServices(this IServiceCollection services)
    {

        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<JwtService>();

        return services;
    }
}
