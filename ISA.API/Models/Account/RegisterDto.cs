namespace ISA.API.Models.Account;

public class RegisterDto
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? Job { get; set; } 
    public string? State { get; set; } 
    public string? City { get; set; } 
    public string? Phone { get; set; } 
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
}
