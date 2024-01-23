using ISA.API.Data.Entities;

namespace ISA.API.Services.Equipment;

public interface IEquipmentService
{
    Task<IEnumerable<EquipmentEntity>> GetListByCompanyIdAsync(int companyId);
}
