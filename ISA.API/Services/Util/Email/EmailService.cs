using System.Net;
using System.Net.Mail;

namespace ISA.API.Services.Util.Email;

public class EmailService: IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task SendEmail(string to, string subject, string message, ICollection<Attachment> attachments)
    {
        var host = _configuration.GetValue<string>("Email:Host");
        var port = _configuration.GetValue<int>("Email:Port");
        var from = _configuration.GetValue<string>("Email:From");

        var mailMessage = new MailMessage
        {
            From = new MailAddress(from),
            Body = message,
            IsBodyHtml = true,
            Subject = subject,

        };
        mailMessage.To.Add(to);
        foreach(var attachment in attachments)
        {
            mailMessage.Attachments.Add(attachment);
        }

        var smtpClient = new SmtpClient(host);
        smtpClient.UseDefaultCredentials = false;
        smtpClient.Port = port;
        await smtpClient.SendMailAsync(mailMessage);
    }
}
