using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Helpers.StringConverters
{
    public interface IStringConverters
    {
        List<string> ToListString(string words, char separator = ',');
    }
}
