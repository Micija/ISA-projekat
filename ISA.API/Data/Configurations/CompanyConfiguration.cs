using ISA.API.Data.Entities;
using ISA.API.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ISA.API.Data.Configurations;

public class CompanyConfiguration : IEntityTypeConfiguration<CompanyEntity>
{
    public void Configure(EntityTypeBuilder<CompanyEntity> builder)
    {
        builder.ToTable("companies");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name).IsRequired(true);

        builder.Property(e => e.Address).IsRequired(true);
    }
}
