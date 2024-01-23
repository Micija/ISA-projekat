using ISA.API.Data.Entities;

namespace ISA.API.Repository.Equipment;

public interface IEquipmentRepository
{
    Task<IEnumerable<EquipmentEntity>> GetListByCompanyIdAsync(int companyId);
}
