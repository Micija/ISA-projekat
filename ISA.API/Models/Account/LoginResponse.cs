﻿namespace ISA.API.Models.Account;

public class LoginResponse
{
    public string Id { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? Jwt { get; set; }
    public string Role { get; set; }
}
