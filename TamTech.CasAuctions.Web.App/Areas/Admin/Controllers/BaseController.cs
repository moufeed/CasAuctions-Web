using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Extensions;
using Microsoft.AspNetCore.Authorization; 
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using TamTech.CasAuctions.Web.Services.Telemetry;
using TamTech.CasAuctions.Web.Core.Constants;

namespace TamTech.CasAuctions.Web.App.Admin.Controllers
{
   
    public  class BaseController : Controller 
    {
        #region Props 
        public readonly ITelemetryClientService _telemetryClientService;
        #endregion

        #region Ctors
        public BaseController(ITelemetryClientService telemetryClientService)
        {
            _telemetryClientService = telemetryClientService; 
        }
        #endregion 

        #region Methodes
        public virtual void TrackException(Exception exc)
        { 
            _telemetryClientService.TrackException(exc, new Dictionary<string, string>
                {
                    { TelemetryEventConstants.UserId, HttpContext.User.Identity.GetUserId() },
                    { TelemetryEventConstants.UserClientId, HttpContext.User.Identity.GetClientId() },
                    { TelemetryEventConstants.UserRoles, HttpContext.User.Identity.GetUserRolesCommaSeparated()}
                });
        }

     
        public void TrackEvent(string name, dynamic model , string statusCode = null)
        {
             
            _telemetryClientService.TrackEvent(name, new Dictionary<string, string>
                {
                    {TelemetryEventConstants.UserId,User.Identity.GetUserId() },
                    { TelemetryEventConstants.UserClientId,User.Identity.GetClientId()}, 
                    {TelemetryEventConstants.InputModel,  JsonConvert.SerializeObject(model) },
                   { TelemetryEventConstants.HttpStatusCode , statusCode},
                });

        }

        public void TrackEvent(string name, ModelStateDictionary modelState, dynamic model = null)
        {

            _telemetryClientService.TrackEvent(name, new Dictionary<string, string>
                {
                    {TelemetryEventConstants.UserId,User.Identity.GetUserId() },
                    { TelemetryEventConstants.UserClientId,User.Identity.GetClientId()},
                       {TelemetryEventConstants.ModelState, JsonConvert.SerializeObject(modelState) },
                    {TelemetryEventConstants.InputModel,  JsonConvert.SerializeObject(model) }
                });

        }


        public RedirectToActionResult RedirectToNotFound(object pName)
        {
            return RedirectToAction("HandelError", "Error", new { statusCode = "404", pageName = pName });
        }
        public RedirectToActionResult RedirectToException(string message)
        {
            return RedirectToAction("Exception", "Error", new { msg = message });
        }


        public  Uri GetAbsoluteUri()
        { 
            UriBuilder uriBuilder = new UriBuilder();
            uriBuilder.Scheme = this.Request.Scheme;
            uriBuilder.Host = this.Request.Host.Host;
            uriBuilder.Path = this.Request.Path.ToString();
            uriBuilder.Query = this.Request.QueryString.ToString();
            return uriBuilder.Uri;
        }
        public Uri GetHostUri()
        {
            UriBuilder uriBuilder = new UriBuilder();
            uriBuilder.Scheme = this.Request.Scheme;
            uriBuilder.Host = this.Request.Host.Host;
            return uriBuilder.Uri;
        }
        #endregion





    }
}
