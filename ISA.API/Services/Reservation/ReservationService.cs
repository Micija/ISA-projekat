using ISA.API.Data.Entities;
using ISA.API.Models.Reservation;
using ISA.API.Repository.Reservation;
using ISA.API.Repository.Term;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace ISA.API.Services.Reservation;

public class ReservationService : IReservationService
{
    private readonly IReservationRepository _reservationRepository;
    private readonly ITermRepository _termRepository;

    public ReservationService(
        IReservationRepository reservationRepository,
        ITermRepository termRepository)
    {
        _reservationRepository = reservationRepository;
        _termRepository = termRepository;
    }

    [Produces(MediaTypeNames.Application.Json)]
    [Authorize]
    public async Task CreateReservation(CreateReservationModel model, string userId)
    {
        var termId = model.TermId;
        var term = await _termRepository.GetByIdAsync(termId);
        if (term == null)
        {
            throw new ArgumentException("Term not found");
        }

        var reservation = new ReservationEntity
        {
            Term = term,
            UserId = userId
        };

        await _reservationRepository.Create(reservation);

        var reservationItems = model.ReservationItems.Select(e => new ReservationItemEntity
        {
            EquipmentId = e.EquipmentId,
            Quantity = e.Quantity,
            ReservationId = reservation.Id,
        });

        foreach (var item in reservationItems)
        {
            await _reservationRepository.CreateItem(item);
        }
    }
}
