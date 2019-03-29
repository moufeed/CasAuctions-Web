using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.EmailModels
{
    public class EmailFromInfo
    {
        public string From { get; set; }
        public string FromName { get; set; }
        public List<string> CC { get; set; }
    }

}
