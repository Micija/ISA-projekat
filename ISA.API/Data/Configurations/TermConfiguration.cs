using ISA.API.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Data.Configurations;

public class TermConfiguration : IEntityTypeConfiguration<TermEntity>
{
    public void Configure(EntityTypeBuilder<TermEntity> builder)
    {
        builder.ToTable("terms");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.TermStart)
            .HasColumnType("date")
            .IsRequired(true);

        builder.HasOne(e => e.Reservation).WithOne(e => e.Term).HasForeignKey<TermEntity>(e => e.ReservationId).IsRequired(false);
        builder.HasOne(e => e.Company).WithMany(e => e.Terms).HasForeignKey(e => e.CompanyId).IsRequired(true);
    }

}
