using ISA.API.Data.Entities;
using ISA.API.Repository.Company;
using ISA.API.Repository.Reservation;

namespace ISA.API.Services.Company;

public class CompanyService: ICompanyService
{
    private readonly ICompanyRepository _repository;
    private readonly IReservationRepository _reservationRepository;

    public CompanyService(ICompanyRepository repository, IReservationRepository reservationRepository)
    {
        _repository = repository;
        _reservationRepository = reservationRepository;
    }

    public async Task<IEnumerable<CompanyEntity>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<CompanyEntity?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<CompanyEntity>> GetCompaniesWhichUserCooperatedWithAsync(string userId)
    {
        var reservations = await _reservationRepository.GetListByUserIdAsync(userId);
        var companies = reservations.DistinctBy(e => e.Term.CompanyId).Select(e => e.Term.Company).ToList();
        return companies;
    }
}
