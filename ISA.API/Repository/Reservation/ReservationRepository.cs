using ISA.API.Data.Entities;
using ISA.API.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Repository.Reservation;

public class ReservationRepository : IReservationRepository
{
    private readonly DataAccessContext DbContext;

    public ReservationRepository(DataAccessContext dbContext)
    {
        this.DbContext = dbContext;
    }

    public async Task<ReservationEntity> Create(ReservationEntity entity)
    {
        var created = await DbContext.Reservations.AddAsync(entity);
        await DbContext.SaveChangesAsync();

        var history = new ReservationHistoryEntity
        {
            TermId = (await DbContext.Terms.Where(e=>e.ReservationId == created.Entity.Id).FirstAsync()).Id,
            UserId = created.Entity.UserId
        };
        await DbContext.ReservationHistories.AddAsync(history);
        await DbContext.SaveChangesAsync();

        return created.Entity;
    }

    public async Task<ReservationItemEntity> CreateItem(ReservationItemEntity entity)
    {
        var created = await DbContext.ReservationItems.AddAsync(entity);
        await DbContext.SaveChangesAsync();
        return created.Entity;
    }

    public async Task<ReservationEntity?> GetByIdAsync(int reservationId)
    {
        return await DbContext.Reservations.AsNoTracking().Include(e => e.Term).FirstOrDefaultAsync(e => e.Id == reservationId);
    }

    public async Task<ReservationHistoryEntity?> GetByUserIdAndTermId(string userId, int termId)
    {
        return await DbContext.ReservationHistories.Where(e => e.UserId.Equals(userId) && e.TermId == termId).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<ReservationEntity>> GetListByUserIdAsync(string userId)
    {
        return await DbContext.Reservations.Include(e => e.Term).ThenInclude(e => e.Company).Where(e => e.Term != null && e.UserId.Equals(userId)).OrderByDescending(e => e.Term.TermStart).ToListAsync();
    }

}
