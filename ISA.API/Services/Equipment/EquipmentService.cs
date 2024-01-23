using ISA.API.Data.Entities;
using ISA.API.Repository.Equipment;

namespace ISA.API.Services.Equipment;

public class EquipmentService: IEquipmentService
{
    private readonly IEquipmentRepository _equipmentRepository;

    public EquipmentService(IEquipmentRepository equipmentRepository)
    {
        _equipmentRepository = equipmentRepository;
    }
    public async Task<IEnumerable<EquipmentEntity>> GetListByCompanyIdAsync(int companyId)
    {
        return await _equipmentRepository.GetListByCompanyIdAsync(companyId);
    }
}
