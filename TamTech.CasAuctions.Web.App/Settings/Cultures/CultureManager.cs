using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Localization.Routing;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace TamTech.CasAuctions.Web.App.Settings.Cultures
{
    public class CultureManager
    {

        public RequestLocalizationOptions LocalizationOptions
        {
            get
            {
                var options = new RequestLocalizationOptions
                {
                    DefaultRequestCulture = this.DefaultRequestCulture,
                    SupportedCultures = this.SupportedUICultures,
                    SupportedUICultures = this.SupportedUICultures,
                    RequestCultureProviders = this.CultureProviders
                };
                //options.RequestCultureProviders.Insert(0, RouteCultureProviders);
                return options;
            }
        }

        public IList<CultureInfo> SupportedUICultures
        {
            get
            {
                IList<CultureInfo> cultures = new List<CultureInfo>();
                foreach (var cultureModel in CultureConstants.CulturesList)
                {
                    var cul = new CultureInfo(cultureModel.Culture);
                    cul.DateTimeFormat.Calendar = new GregorianCalendar();
                    cultures.Add(cul);
                }
                return cultures;
            }
        }

        public IList<CultureInfo> SupportedCultures
        {
            get
            {
                IList<CultureInfo> cultures = new List<CultureInfo>
                {
                    new CultureInfo(CultureConstants.DefaultCulture.Culture)
                };
                return cultures;
            }
        }

        public RequestCulture DefaultRequestCulture
        {
            get
            {
                return new RequestCulture(CultureConstants.DefaultCulture.Culture);
            }
        }

        public IList<IRequestCultureProvider> CultureProviders
        {
            get
            {
                IList<IRequestCultureProvider> providers = new List<IRequestCultureProvider>
                {
                    new RouteDataRequestCultureProvider()
                };
                return providers;
            }
        }

        public RouteDataRequestCultureProvider RouteCultureProviders
        {
            get
            {
                return new RouteDataRequestCultureProvider();
            }
        }

    }
}
