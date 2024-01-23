using ISA.API.Data.Entities;

namespace ISA.API.Repository.Term;

public interface ITermRepository
{
    Task<IEnumerable<TermEntity>> GetListByCompanyIdAsync(int companyId);
}
