using System.Threading.Tasks;

namespace ChenWebSite.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string fromEmail, string subject, string message);
    }
}
