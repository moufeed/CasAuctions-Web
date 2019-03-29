using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Extensions
{
    public static class UrlHelperExtensions
    {
        /// <summary>
        /// Extension method to handle localized URL using a dedicated, multi-language custom route.
        /// for additional info, read the following post:
        /// https://www.ryadel.com/en/setup-a-multi-language-website-using-asp-net-mvc/
        /// </summary>
        public static string PortalAction(this IUrlHelper helper, string actionName, string controllerName, object routeValues)
        {  
            // arrange a "localized" controllerName to be handled with a dedicated localization-aware route.
            // string localizedControllerName = String.Format("{0}/Portal/{1}", CultureInfo.CurrentCulture.Name, controllerName);

            // build the Action
            // var customAction =  helper.Action(actionName, localizedControllerName, routeValues);
            var action = helper.Action(actionName, controllerName, routeValues);
            return action;
        }

        /// <summary>
        /// Extension method to handle localized URL using a dedicated, multi-language custom route.
        /// for additional info, read the following post:
        /// https://www.ryadel.com/en/setup-a-multi-language-website-using-asp-net-mvc/
        /// </summary>
        public static string AdminUrl(this IUrlHelper helper, string actionName, string controllerName, object routeValues = null  )
        {
            var url = helper.Action(actionName, controllerName, routeValues);
            return url;
        }
    }
}
