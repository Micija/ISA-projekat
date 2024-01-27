#nullable enable

using ISA.API.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace ISA.API.Data.Models
{
    public class UserEntity : IdentityUser
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public int PenalPoints { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Phone { get; set; }
        public string? Job { get; set; }
        public virtual ICollection<ReservationEntity> Reservations { get; set; } = default!;
    }
}
