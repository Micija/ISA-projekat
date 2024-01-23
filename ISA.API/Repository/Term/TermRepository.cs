using ISA.API.Data.Entities;
using ISA.API.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Repository.Term;

public class TermRepository : ITermRepository
{
    private readonly DataAccessContext DbContext;

    public TermRepository(DataAccessContext dbContext)
    {
        this.DbContext = dbContext;
    }

    public Task<TermEntity?> GetByIdAsync(int termId)
    {
        return DbContext.Terms.Where(e => e.Id == termId).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<TermEntity>> GetListByCompanyIdAsync(int companyId)
    {
        return await DbContext.Terms.Where(e => e.CompanyId == companyId).ToListAsync();
    }

}
