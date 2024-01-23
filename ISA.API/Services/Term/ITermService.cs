using ISA.API.Data.Entities;

namespace ISA.API.Services.Term;

public interface ITermService
{
    Task<IEnumerable<TermEntity>> GetListByCompanyIdAsync(int companyId);
}
