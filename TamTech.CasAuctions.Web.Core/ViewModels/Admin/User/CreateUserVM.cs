using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TamTech.CasAuctions.Web.Core.ViewModels.Admin.User
{
    public class CreateUserVM
    {
        public string Id { get; set; }

        [Required]
        [StringLength(30)]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Password confirmation doesn't match Password!")]
        public string ConfirmPasswoord { get; set; }

        //[Required]
        //[StringLength(30)]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Gender { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public bool Status { get; set; }

        public bool PhoneNumberConfirmed { get; set; }

        [Required]
        public IEnumerable<string> Roles { get; set; }
    }
}
