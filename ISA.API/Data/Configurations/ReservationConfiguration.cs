using ISA.API.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Data.Configurations;

public class ReservationConfiguration : IEntityTypeConfiguration<ReservationEntity>
{
    public void Configure(EntityTypeBuilder<ReservationEntity> builder)
    {
        builder.ToTable("reservations");

        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.User).WithMany(e => e.Reservations).HasForeignKey( e => e.UserId).IsRequired(true);
    }
}