using ISA.API.Data.Entities;
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
        await _reservationService.CreateReservation(request, User.FindFirst(ClaimTypes.NameIdentifier)!.Value, User.FindFirst(ClaimTypes.Email)!.Value);
        return Ok();
    }

    [HttpGet("My")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<UserReservation>>> GetAvailableTermsByCompanyAsync()
    {

        var reservations = await _reservationService
            .GetListByUserIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        return Ok(reservations.Select(e => new UserReservation
        {
            Id = e.Id,
            StartDate = e.Term!.TermStart
        }));
    }

    [HttpPost("Cancel")]
    [Authorize]
    public async Task<IActionResult> CancelReservation(CancelReservation request)
    {

        var error = await _reservationService
            .CancelReservation(request.ReservationId, User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (error != null)
        {
            if (error.Equals("1"))
                return BadRequest("Rezervacija nije pronadjena");
            if (error.Equals("2"))
                return BadRequest("Operacija nije dozvoljena");
        } 
        return Ok();
    }
}
