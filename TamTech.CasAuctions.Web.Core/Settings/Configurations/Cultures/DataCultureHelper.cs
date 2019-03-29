using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Settings.Configurations.Cultures
{
    public static class DataCultureHelper
    {
        /// <summary>
        ///  this method useing when call CRUD oprations from bussines logic (Services) to get data by activated language 
        /// </summary>
        /// <returns>string : activated language [en/ar] </returns>
        public static string GetCurrent( IQueryCollection queries)
        {

            
            return System.Globalization.CultureInfo.CurrentCulture.TwoLetterISOLanguageName;
        }
    }
}
