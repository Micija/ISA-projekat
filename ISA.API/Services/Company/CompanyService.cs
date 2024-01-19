using ISA.API.Data.Entities;
using ISA.API.Repository.Company;

namespace ISA.API.Services.Company;

public class CompanyService: ICompanyService
{
    private readonly ICompanyRepository _repository;

    public CompanyService(ICompanyRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CompanyEntity>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }
}
