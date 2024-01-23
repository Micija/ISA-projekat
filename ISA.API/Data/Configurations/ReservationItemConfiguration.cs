using ISA.API.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Data.Configurations;

public class ReservationItemConfiguration : IEntityTypeConfiguration<ReservationItemEntity>
{
    public void Configure(EntityTypeBuilder<ReservationItemEntity> builder)
    {
        builder.ToTable("reservation_items");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Quantity).IsRequired(true);

        builder.Property(e => e.ReservationId).IsRequired(true);

        builder.Property(e => e.EquipmentId).IsRequired(true);

        builder.HasOne(e => e.Reservation).WithMany(c => c.ReservationItems).HasForeignKey(e => e.ReservationId);
        builder.HasOne(e => e.Equipment).WithMany(c => c.ReservationItems).HasForeignKey(e => e.EquipmentId);
    }
}
