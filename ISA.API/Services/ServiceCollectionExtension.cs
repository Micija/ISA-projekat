using ISA.API.Services.Account;
using ISA.API.Services.Company;
using ISA.API.Services.Util;

namespace ISA.API.Services;
public static class ServiceCollectionExtension
{
    public static IServiceCollection RegisterServices(this IServiceCollection services)
    {

        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<ICompanyService, CompanyService>();
        services.AddScoped<JwtService>();

        return services;
    }
}
