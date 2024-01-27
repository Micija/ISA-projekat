using ISA.API.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ISA.API.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.ToTable("users");

            builder.Property(e => e.FirstName).IsRequired(true);

            builder.Property(e => e.LastName).IsRequired(true);
            builder.Property(e => e.PenalPoints).IsRequired(true);
            builder.Property(e => e.State).IsRequired(false);
            builder.Property(e => e.City).IsRequired(false);
            builder.Property(e => e.Phone).IsRequired(false);
            builder.Property(e => e.Job).IsRequired(false);
        }
    }
}
