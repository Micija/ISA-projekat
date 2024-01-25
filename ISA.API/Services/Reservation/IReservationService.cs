using ISA.API.Data.Entities;
using ISA.API.Models.Reservation;

namespace ISA.API.Services.Reservation;

public interface IReservationService
{
    Task<string?> CancelReservation(int reservationId, string value);
    Task CreateReservation(CreateReservationModel model, string userId, string userEmail);
    Task<IEnumerable<ReservationEntity>> GetListByUserIdAsync(string userId);
}
