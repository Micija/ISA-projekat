using ISA.API.Repository.Company;

namespace ISA.API.Repository;

public static class ServiceCollectionExtensions 
{ 
    public static IServiceCollection RegisterRepositories(this IServiceCollection services)
    {

        services.AddScoped<ICompanyRepository, CompanyRepository>();

        return services;
    }
}