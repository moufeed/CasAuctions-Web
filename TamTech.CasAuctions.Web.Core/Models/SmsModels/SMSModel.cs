using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.SmsModels
{
   public class SMSModel
    { 
        public string to { get; set; }

        public string body { get; set; }

        public Dictionary<string, string> properties { get; set; }

    }
}
