using ISA.API.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Data.Configurations;

public class ReservationHistoryConfiguration : IEntityTypeConfiguration<ReservationHistoryEntity>
{
    public void Configure(EntityTypeBuilder<ReservationHistoryEntity> builder)
    {
        builder.ToTable("reservation_history");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.TermId).IsRequired(true);

        builder.Property(e => e.UserId).IsRequired(true);
    }
}