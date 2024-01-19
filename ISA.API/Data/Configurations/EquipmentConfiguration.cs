using ISA.API.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace ISA.API.Data.Configurations;

public class EquipmentConfiguration : IEntityTypeConfiguration<EquipmentEntity>
{
    public void Configure(EntityTypeBuilder<EquipmentEntity> builder)
    {
        builder.ToTable("equipment");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name).IsRequired(true);

        builder.Property(e => e.Tag).IsRequired(false);

        builder.Property(e => e.AvailableQuantity).IsRequired(true);

        builder.HasOne(e => e.Company).WithMany(c => c.Equipment).HasForeignKey(e => e.CompanyId);
    }
}
