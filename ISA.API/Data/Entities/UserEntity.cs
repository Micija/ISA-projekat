#nullable enable

using Microsoft.AspNetCore.Identity;

namespace ISA.API.Data.Models
{
    public class UserEntity : IdentityUser
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
    }
}
