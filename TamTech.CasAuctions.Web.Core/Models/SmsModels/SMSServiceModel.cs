using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.SmsModels
{
    class SMSServiceModel
    {
        public string To { get; set; }

        public string Body { get; set; }

        public string ReasonOfSend { get; set; }

        public string ClientId { get; set; }

        public string UserId { get; set; }

        public List<string> UserRoles { get; set; }
    }
}
