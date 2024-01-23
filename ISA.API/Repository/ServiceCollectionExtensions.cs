using ISA.API.Repository.Company;
using ISA.API.Repository.Equipment;
using ISA.API.Repository.Term;

namespace ISA.API.Repository;

public static class ServiceCollectionExtensions 
{ 
    public static IServiceCollection RegisterRepositories(this IServiceCollection services)
    {

        services.AddScoped<ICompanyRepository, CompanyRepository>();
        services.AddScoped<IEquipmentRepository, EquipmentRepository>();
        services.AddScoped<ITermRepository, TermRepository>();

        return services;
    }
}