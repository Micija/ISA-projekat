using ISA.API.Data.Entities;

namespace ISA.API.Services.Company;

public interface ICompanyService
{
    Task<IEnumerable<CompanyEntity>> GetAllAsync();
    Task<CompanyEntity?> GetByIdAsync(int id);
    Task<IEnumerable<CompanyEntity>> GetCompaniesWhichUserCooperatedWithAsync(string userId);
}
