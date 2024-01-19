using ISA.API.Data.Entities;
using ISA.API.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace ISA.API.Repository.Company;

public class CompanyRepository: ICompanyRepository
{
    private readonly DataAccessContext DbContext;

    public CompanyRepository(DataAccessContext dbContext)
    {
        this.DbContext = dbContext;
    }

    public async Task<IEnumerable<CompanyEntity>> GetAllAsync()
    {
        return await DbContext.Companies.ToListAsync();
    }
}
