using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TamTech.CasAuctions.Web.Core.ViewModels.Admin.Sms
{
    public class SmsVM
    {
        
        public string Id { get; set; }
         
        public string Massage { get; set; }

        public List<string> Recipients { get; set; }

        public DateTime createdDate { get; set; }

        public SmsVM()
        {
            Recipients = new List<string>();
        }

    }
}
