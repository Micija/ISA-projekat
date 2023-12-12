namespace ISA.API.Models.Account;

public class LoginResponse
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? Jwt { get; set; } 
}
