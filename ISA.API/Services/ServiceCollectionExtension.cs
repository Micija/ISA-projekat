using ISA.API.Services.Account;
using ISA.API.Services.Company;
using ISA.API.Services.Equipment;
using ISA.API.Services.Reservation;
using ISA.API.Services.Term;
using ISA.API.Services.Util;
using ISA.API.Services.Util.Email;
using ISA.API.Services.Util.QrCode;

namespace ISA.API.Services;
public static class ServiceCollectionExtension
{
    public static IServiceCollection RegisterServices(this IServiceCollection services)
    {

        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<ICompanyService, CompanyService>();
        services.AddScoped<IEquipmentService, EquipmentService>();
        services.AddScoped<ITermService, TermService>();
        services.AddScoped<IReservationService, ReservationService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IQrCodeService, QrCodeService>();
        services.AddScoped<JwtService>();

        return services;
    }
}
