using ISA.API.Data.Entities;
using ISA.API.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Repository.Complaints;

public class ComplaintRepository : IComplaintRepository
{
    private readonly DataAccessContext DbContext;

    public ComplaintRepository(DataAccessContext dbContext)
    {
        this.DbContext = dbContext;
    }

    public async Task CreateAsync(ComplaintEntity entity)
    {
        await DbContext.Complaints.AddAsync(entity);
        await DbContext.SaveChangesAsync();
    }

    public async Task<ComplaintEntity?> GetById(int id)
    {
        return await DbContext.Complaints.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<IEnumerable<ComplaintEntity>> GetList()
    {
        return await DbContext.Complaints.Include(e => e.Company).Include(e => e.User).OrderByDescending(e => e.Date).ToListAsync();
    }

    public async Task<IEnumerable<ComplaintEntity>> GetListByUserId(string userId)
    {
        return await DbContext.Complaints.Include(e => e.Company).Where(e => e.UserId.Equals(userId)).OrderByDescending(e => e.Date).ToListAsync();
    }

    public async Task Update(ComplaintEntity complaint)
    {
        var fromDb = await DbContext.Complaints.FirstAsync(e => e.Id == complaint.Id);
        fromDb.Text = complaint.Text;
        fromDb.Answer = complaint.Answer;
        fromDb.UserId = complaint.UserId;
        fromDb.CompanyId = complaint.CompanyId;
        fromDb.Date = complaint.Date;

        await DbContext.SaveChangesAsync();
    }
}
