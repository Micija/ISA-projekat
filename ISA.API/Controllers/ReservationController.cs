using ISA.API.Models.Account;
using ISA.API.Models.Reservation;
using ISA.API.Services.Reservation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ISA.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReservationController : ControllerBase
{
    private readonly IReservationService _reservationService;

    public ReservationController(
        IReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<LoginResponse>> CreateReservation(
       CreateReservationModel request)
    {
        await _reservationService.CreateReservation(request, User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        return Ok();
    }
}
