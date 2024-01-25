using ISA.API.Data.Entities;
using ISA.API.Data.Models;
using ISA.API.Models.Reservation;
using ISA.API.Repository.Reservation;
using ISA.API.Repository.Term;
using ISA.API.Services.Util.Email;
using ISA.API.Services.Util.QrCode;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net.Mime;

namespace ISA.API.Services.Reservation;

public class ReservationService : IReservationService
{
    private readonly IReservationRepository _reservationRepository;
    private readonly ITermRepository _termRepository;
    private readonly IQrCodeService _qrCodeService;
    private readonly IEmailService _emailService;
    private readonly UserManager<UserEntity> _userManager;

    public ReservationService(
        IReservationRepository reservationRepository,
        ITermRepository termRepository,
        IQrCodeService qrCodeService,
        IEmailService emailService,
        UserManager<UserEntity> userManager)
    {
        _reservationRepository = reservationRepository;
        _termRepository = termRepository;
        _qrCodeService = qrCodeService;
        _emailService = emailService;
        _userManager = userManager;
    }

    public async Task<string?> CancelReservation(int reservationId, string userId)
    {
        var reservation = await _reservationRepository.GetByIdAsync(reservationId);
        if (reservation == null)
        {
            return "1";
        }

        if (!reservation.UserId.Equals(userId))
        {
            return "2";
        }

        await _termRepository.UpdateUnSetReservation(reservation.Term.Id);

        var penalPoints = 0;
        var dateDiff = reservation.Term.TermStart - DateTime.Now;
        if (dateDiff < TimeSpan.FromHours(24))
        {
            penalPoints = 2;
        } else
        {
            penalPoints = 1;
        }

        var user = await _userManager.FindByIdAsync(userId);
        user.PenalPoints += penalPoints;
        await _userManager.UpdateAsync(user);
        return null;

    }

    [Produces(MediaTypeNames.Application.Json)]
    [Authorize]
    public async Task CreateReservation(CreateReservationModel model, string userId, string userEmail)
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
        var qrCode = _qrCodeService.CreateQRCode("test");
        var attach = new Attachment(new MemoryStream(qrCode), "qr-code.png", MediaTypeNames.Application.Octet);

        await _emailService.SendEmail(userEmail, "Potvrda rezervacije", "Vasa rezervacija je sacuvana", new List<Attachment> { attach });
    }

    public async Task<IEnumerable<ReservationEntity>> GetListByUserIdAsync(string userId)
    {
        return await _reservationRepository.GetListByUserIdAsync(userId);
    }
}
