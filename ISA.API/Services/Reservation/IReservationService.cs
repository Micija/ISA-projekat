using ISA.API.Models.Reservation;

namespace ISA.API.Services.Reservation;

public interface IReservationService
{
    Task CreateReservation(CreateReservationModel model, string userId);
}
