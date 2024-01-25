using ISA.API.Data.Entities;
using ISA.API.Repository.Term;

namespace ISA.API.Services.Term;

public class TermService : ITermService
{
    private readonly ITermRepository _termRepository;

    public TermService(ITermRepository termRepository)
    {
        _termRepository = termRepository;
    }
    public async Task<IEnumerable<TermEntity>> GetAvailableListByCompanyIdAsync(int companyId)
    {
        return (await _termRepository.GetListByCompanyIdAsync(companyId)).Where(e => e.ReservationId == null && e.TermStart > DateTime.Now);
    }

}
