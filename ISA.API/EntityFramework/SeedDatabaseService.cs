using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.EntityFramework;

public class SeedDatabaseService
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public SeedDatabaseService(
        RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task SeedDatabase()
    {
        if (!await _roleManager.Roles.AnyAsync())
        {
            await _roleManager.CreateAsync(new IdentityRole("Admin"));
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }
    }

}
