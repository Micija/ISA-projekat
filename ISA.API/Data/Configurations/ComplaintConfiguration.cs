using ISA.API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ISA.API.Data.Configurations;

public class ComplaintConfiguration : IEntityTypeConfiguration<ComplaintEntity>
{
    public void Configure(EntityTypeBuilder<ComplaintEntity> builder)
    {
        builder.ToTable("complaints");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Text).IsRequired(true);

        builder.Property(e => e.Date).HasColumnType("datetime").IsRequired(true);

        builder.HasOne(e => e.Company).WithMany(c => c.Complaints).HasForeignKey(e => e.CompanyId);
    }
}