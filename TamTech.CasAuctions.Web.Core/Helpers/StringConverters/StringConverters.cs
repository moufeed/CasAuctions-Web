using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Helpers.StringConverters
{
    public class StringConverters : IStringConverters
    {

        public List<string> ToListString(string words , char separator )
        {
            if (!string.IsNullOrEmpty(words) && words.Length > 0)

                return words.Split(separator).ToList();

            return new List<string>();
        }


       
    }
}
