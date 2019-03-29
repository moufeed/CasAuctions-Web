using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.SmsModels
{
    public class Smslite
    {
        public string Id { get; set; }

        public string Massage { get; set; }

        public List<SmsRecipient> Recipients { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
