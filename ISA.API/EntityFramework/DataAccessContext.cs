using ISA.API.Data.Configurations;
using ISA.API.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.EntityFramework
{
    public class DataAccessContext : IdentityDbContext<UserEntity>
    {

        public DataAccessContext(
            DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserConfiguration());
        }

    }
}
