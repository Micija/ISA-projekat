using ISA.API.Data.Entities;

namespace ISA.API.Repository.Complaints;

public interface IComplaintRepository
{
    Task CreateAsync(ComplaintEntity entity);
    Task<ComplaintEntity?> GetById(int id);
    Task<IEnumerable<ComplaintEntity>> GetList();
    Task<IEnumerable<ComplaintEntity>> GetListByUserId(string userId);
    Task Update(ComplaintEntity complaint);
}
