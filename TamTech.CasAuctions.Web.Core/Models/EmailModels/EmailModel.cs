using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.EmailModels
{
    public class EmailModel
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }

        public string HtmlMessage { get; set; }

        public string ReasonOfSend { get; set; }

        public List<string> CC { get; set; }
    }
}
