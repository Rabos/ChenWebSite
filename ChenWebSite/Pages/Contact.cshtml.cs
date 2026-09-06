using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using ChenWebSite.Services.Interfaces;

namespace ChenWebSite.Pages
{
    public class ContactModel : PageModel
    {
        private readonly IEmailService _emailService;

        public ContactModel(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [BindProperty]
        [Required]
        public string Name { get; set; }

        [BindProperty]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [BindProperty]
        [Required]
        public string Subject { get; set; }

        [BindProperty]
        [Required]
        public string Message { get; set; }

        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
                return Page();

            var emailBody = $@"
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> {Name}</p>
                <p><strong>Email:</strong> {Email}</p>
                <p><strong>Message:</strong><br/>{Message}</p>
            ";

            try
            {
                await _emailService.SendEmailAsync(
                    Email,
                    Subject,
                    emailBody
                );

                SuccessMessage = "Message sent successfully!";
                ModelState.Clear();
            }
            catch
            {
                ErrorMessage = "Failed to send message. Try again or email us directly to chenstructurehub@gmail.com";
            }

            return Page();
        }
    }
}
