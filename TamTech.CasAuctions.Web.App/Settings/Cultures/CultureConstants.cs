using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace TamTech.CasAuctions.Web.App.Settings.Cultures
{
    public static class CultureConstants
    {

        public static readonly CultureModel DefaultCulture = new CultureModel
        {
            Name = "English",
            Culture = "en",
            Lang = "en"
        };

        public static readonly List<CultureModel> CulturesList = new List<CultureModel>
        {
            DefaultCulture,
            new CultureModel{Name = "العربية", Culture = "ar", Lang = "ar"},
            new CultureModel{Name = "Türkçe", Culture = "tr", Lang = "tr"},
            new CultureModel{Name = "Français", Culture = "fr", Lang = "fr"},
            /*
            new CultureModel{Name = "Deutsch", Culture = "de", Lang = "de"}
             */
        };
        public static readonly string Constraint = DefaultCulture.Culture.Length == 2 ? "^([a||e||t||f||d])+([r||n||r||e])$" : "^([ar||en]{2})+(-)+([ar||en]{2})$";
        //  public static readonly string Constraint = DefaultCulture.Culture.Length == 2 ? "^([a||e])+([r||n])$" : "^([ar||en]{2})+(-)+([ar||en]{2})$";
    }
}
