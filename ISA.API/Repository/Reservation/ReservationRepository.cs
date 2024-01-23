using ISA.API.Data.Entities;
using ISA.API.EntityFramework;

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
        return created.Entity;
    }

    public async Task<ReservationItemEntity> CreateItem(ReservationItemEntity entity)
    {
        var created = await DbContext.ReservationItems.AddAsync(entity);
        await DbContext.SaveChangesAsync();
        return created.Entity;
    }
}
