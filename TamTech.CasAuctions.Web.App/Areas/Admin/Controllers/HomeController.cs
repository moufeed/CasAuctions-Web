using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc; 
using TamTech.CasAuctions.Web.Services.Identity;
using TamTech.CasAuctions.Web.Core.Extensions;
using TamTech.CasAuctions.Web.Core.Models;
using TamTech.CasAuctions.Web.Core.Constants;
using Microsoft.AspNetCore.Http; 
using Microsoft.Extensions.Localization;
using TamTech.CasAuctions.Web.App.Controllers.Admin;
using TamTech.CasAuctions.Web.Core.Settings.Configurations.AppSetting;

using TamTech.CasAuctions.Web.Core.ViewModels;
using TamTech.CasAuctions.Web.Services.Telemetry;

namespace TamTech.CasAuctions.Web.Core.Controllers.Admin
{

    [Area("Admin")]
  //  [Authorize(Policy = ContentSDKPoliciesConstants.DashboardAdmin)]
    public  class HomeController : AdminBaseController
    {

        #region Props  
        private readonly IAppSettingsConfigurations _appSettingsService;
        private readonly IUsersManagerService _identityService;
    

        #endregion

        #region Ctors  
        public HomeController(ITelemetryClientService telemetryClientService, 
            IAppSettingsConfigurations appSettingsService, 
             IStringLocalizer<AdminBaseController> localizer )
            : base(telemetryClientService,localizer)
        {
            _appSettingsService = appSettingsService; 
        }
        #endregion

        


        public virtual async Task<IActionResult> Index()
        {
             
            ViewBag.Host = _appSettingsService.GetURl();
            var types =   _appSettingsService.GetNumericalStatisticsModulesNames();
       //     ViewBag.statistics = await _contentServices.GetNumericalStatisticsAsync(types, GetCurrentDataLang());

            return View();
        }


        [HttpGet]
        [Authorize]
        public virtual async Task<IActionResult> Token()
        {
            ViewBag.Enabled = _appSettingsService.DisplayTokenInWebView();
            if (ViewBag.Enabled)
            {
                ViewBag.id_token = await HttpContext.GetTokenAsync("id_token");
                ViewBag.access_token = await HttpContext.GetTokenAsync("access_token");
                ViewBag.refresh_token = await HttpContext.GetTokenAsync("refresh_token");
            }
            return View();
        }
        [Authorize]
        public virtual async Task<IActionResult> About()
        {
            //GetLanguages();
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            //var result = await _identityService.GetUsersAsync(new GetUsersModel(), accessToken);
            //ViewBag.count = string.Format("List of Users Count : {0}", result.Data.Count());
            //PaginationMetadataModel pagination = (PaginationMetadataModel)result.Header;

            //var result = await _identityService.BlockUserAsyncEndpoint("test3");
            //  await _identityService.UnblockUserAsyncEndpoint("test3");

            //ViewBag.User = result.Success.ToString();


            //var GetUserResult = await _identityService.GetUserByUsernameAsync("test3", accessToken);
            //ViewBag.User = string.Format("NormalizedUserName  : {0}", GetUserResult.Data.NormalizedUserName);

            //RegisterUserModel newuser = new RegisterUserModel
            //{
            //    UserName = "a.aktaa.n",
            //    MobileNumber = "1234567890",
            //    Password = "P@ss123",
            //    RolesNames = new List<string> { "WhatcookSuperAdmin", "WhatcookUser" }
            //   // Email = "a.aktaa@tamtech.solutions"
            //};
            //var result = await _identityService.RegisterUserAsync(newuser, accessToken);
            //var sms =   new Solutions.Common.Services.SMS.Model.SMSModel {
            //     to = "76894834334",
            //     body = $"Reset password confirmation code ",
            //     properties =   new Dictionary<string, string> { { "ReasonOfSend", "ResetPasswordByMobileNumber" }, { "UserId","user id " } }
            // };


            // _iSMSSender.SendAsync(sms);


            //try
            //{
            //    throw new System.ArgumentException("TamTech.Solutions.Common.Services.Telemetry", "added by a.aktaa for test");
            //}
            //catch (Exception ex)
            //{
            //    TrackException(ex);
            //}

            return View();
        }
        public virtual void TrackException(Exception exc)
        {
            _telemetryClientService.TrackException(exc, new Dictionary<string, string>
                {
                    { TelemetryEventConstants.UserId, HttpContext.User.Identity.GetUserId() },
                    { TelemetryEventConstants.UserClientId, HttpContext.User.Identity.GetClientId() },
                    { TelemetryEventConstants.UserRoles, HttpContext.User.Identity.GetUserRolesCommaSeparated()}
                });
        }
        public virtual IActionResult Contact()
        {
            //GetLanguages();
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public virtual IActionResult Privacy()
        {
            return View();
        }

        public virtual IActionResult Biography()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public virtual IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

      
    }
}
