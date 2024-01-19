using ISA.API.Data.Entities;

namespace ISA.API.Repository.Company;

public interface ICompanyRepository
{
    Task<IEnumerable<CompanyEntity>> GetAllAsync();
}
