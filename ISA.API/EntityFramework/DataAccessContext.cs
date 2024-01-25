using ISA.API.Data.Configurations;
using ISA.API.Data.Entities;
using ISA.API.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ISA.API.EntityFramework
{
    public class DataAccessContext : IdentityDbContext<UserEntity>
    {
        public virtual DbSet<UserEntity> Users { get; set; }
        public virtual DbSet<CompanyEntity> Companies { get; set; }
        public virtual DbSet<EquipmentEntity> Equipment { get; set; }
        public virtual DbSet<TermEntity> Terms { get; set; }
        public virtual DbSet<ReservationEntity> Reservations { get; set; }
        public virtual DbSet<ReservationItemEntity> ReservationItems { get; set; }
        public virtual DbSet<ReservationHistoryEntity> ReservationHistories { get; set; }

        public DataAccessContext(
            DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new CompanyConfiguration());
            builder.ApplyConfiguration(new EquipmentConfiguration());
            builder.ApplyConfiguration(new ReservationConfiguration());
            builder.ApplyConfiguration(new ReservationItemConfiguration());
            builder.ApplyConfiguration(new TermConfiguration());
            builder.ApplyConfiguration(new ReservationHistoryConfiguration());
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            base.ConfigureConventions(configurationBuilder);

            configurationBuilder.Properties<DateOnly>()
               .HaveConversion<NullableDateOnlyConverter>()
               .HaveColumnType("date");
        }

    }

    /// <summary>
    /// Converts <see cref="DateOnly?" /> to <see cref="DateTime?"/> and vice versa.
    /// </summary>
    public class NullableDateOnlyConverter : ValueConverter<DateOnly?, DateTime?>
    {
        /// <summary>
        /// Creates a new instance of this converter.
        /// </summary>
        public NullableDateOnlyConverter() : base(
            d => d == null
                ? null
                : new DateTime?(d.Value.ToDateTime(TimeOnly.MinValue)),
            d => d == null
                ? null
                : new DateOnly?(DateOnly.FromDateTime(d.Value)))
        { }
    }
}
