using ISA.API.Data.Entities;
using ISA.API.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Repository.Equipment;

public class EquipmentRepository: IEquipmentRepository
{
    private readonly DataAccessContext DbContext;

    public EquipmentRepository(DataAccessContext dbContext)
    {
        this.DbContext = dbContext;
    }

    public async Task<IEnumerable<EquipmentEntity>> GetListByCompanyIdAsync(int companyId)
    {
        return await DbContext.Equipment.Where(e => e.CompanyId == companyId).ToListAsync();
    }

}
