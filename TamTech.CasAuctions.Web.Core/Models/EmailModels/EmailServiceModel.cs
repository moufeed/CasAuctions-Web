using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.EmailModels
{
     public class EmailServiceModel
    {
        public string From { get; set; }

        public string Subject { get; set; }

        public string Text { get; set; }

        public string Html { get; set; }

        public string Recipients { get; set; }

        public string ReasonOfSend { get; set; }

        public string ClientId { get; set; }

        public string UserId { get; set; }

        public List<string> UserRoles { get; set; }
    }
}
