using ISA.API.Data.Entities;

namespace ISA.API.Repository.Term;

public interface ITermRepository
{
    Task<TermEntity?> GetByIdAsync(int termId);
    Task<IEnumerable<TermEntity>> GetListByCompanyIdAsync(int companyId);
}
