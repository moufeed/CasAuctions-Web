using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TamTech.CasAuctions.Web.Core.ViewModels.Admin.Email
{
    public class EmailVM
    {
        
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public List<string> Recipients { get; set; }


        public EmailVM()
        {
            Recipients = new List<string>();
        }

    }
}
