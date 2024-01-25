using System.Net.Mail;

namespace ISA.API.Services.Util.Email;

public interface IEmailService
{
    Task SendEmail(string to, string subject, string message, ICollection<Attachment> attachments);
}
