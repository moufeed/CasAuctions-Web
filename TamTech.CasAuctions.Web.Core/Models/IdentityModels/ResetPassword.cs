using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.IdentityModels
{
    public class ResetPassword
    {

        [Required]
        public string UserId { get; set; }

        [Required]
        public string NewPassword { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Token { get; set; }

    }
}
