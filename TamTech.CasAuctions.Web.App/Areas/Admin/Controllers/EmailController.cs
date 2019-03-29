using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks; 
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using TamTech.CasAuctions.Web.Services.Email;
using TamTech.CasAuctions.Web.Services.Identity;
using TamTech.CasAuctions.Web.Core.Constants;
using TamTech.CasAuctions.Web.Services.Telemetry;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;
using TamTech.CasAuctions.Web.Core.ViewModels.Admin.Email;
using TamTech.CasAuctions.Web.Core.Mappers.IdentityMapper;
using TamTech.CasAuctions.Web.Core.Models.EmailModels;
using TamTech.CasAuctions.Web.App.Controllers.Admin;

namespace TamTech.CasAuctions.Web.App.Admin.Controllers
{
//    [Authorize(Policy =ContentSDKPoliciesConstants.UsersAdmin)]
    public  class EmailController : AdminBaseController
    {


        IEmailSenderService _EmailService;
        IUsersManagerService _IdentityService;
         

        public EmailController(
            IUsersManagerService IdentityService ,  
            IEmailSenderService emailService,
            ITelemetryClientService telemetryClientService,
            IStringLocalizer<AdminBaseController> localizer
            ) : base(telemetryClientService,localizer)
        {
            _IdentityService = IdentityService;
             
            _EmailService = emailService;
        }

         
        [HttpGet("{Culture}/[Area]/[controller]")]
        public virtual ActionResult Index()
        {
            return View();
        }

        
        [HttpGet("{Culture}/[Area]/[controller]/new")]
        public virtual async Task<ActionResult> CreatEmail()
        {
            ViewBag.SpecificUser = false;
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            GetUsersModel model = new GetUsersModel();
            EmailVM EmailMD = new EmailVM();
            ViewBag.UsersList = new List<SelectListItem> { };
            var result = await _IdentityService.GetUsersAsync(model);
             
            if (result.Success)
            {
                ViewBag.UsersList = result.Data != null ? result.Data.Select(m => m.MapToUserModelByEmail()).ToList() : new List<SelectListItem>();
            }

            return View("CreateEmail", EmailMD );
        }

        public ViewResult GetViewNewEmailStartup(string username, List<string> emails)
        {
                ViewBag.SpecificUser = true;
                EmailVM EmailMD = new EmailVM();
                EmailMD.Recipients = emails; ;

                ViewBag.username = username;
                ViewBag.email = emails[0];
                return View("CreateEmail", EmailMD);
        }
         
        [HttpGet("{Culture}/[Area]/[controller]/new/{username}/{email}")]
        public virtual ActionResult NewEmail(string username , string email ,string bt)
        {
            ViewBag.route = bt;
            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(email))
            {
                return GetViewNewEmailStartup(username, new List<string> { email });
            }
            return View();
        }
         
        // POST: Email/Create
        [HttpPost("{Culture}/[Area]/[controller]/create")]  
        public virtual async Task<ActionResult> Create(EmailVM model ,string bt ,string na, IFormCollection collection)
        {
            var count = model.Recipients.Count;
            // string backToController = Request.Query["bt"].ToString();//collection.ContainsKey("save-continue")
            string backToController = collection["route"];
                    Dictionary<string, bool> results = new Dictionary<string, bool>();
            if (ModelState.IsValid)
            {
                try
                {
                    foreach ( var email  in model.Recipients)
                    {

                        results.Add(email,
                                     await _EmailService.SendAsync(new EmailModel
                                     {
                                         Email = email,
                                         Subject = model.Subject,
                                         HtmlMessage = model.Message,
                                         Message = Regex.Replace(model.Message, "<.*?>", String.Empty),
                                         ReasonOfSend = "MessageByWebAdminPanel"
                                     }));

                    }
                }
                catch (Exception ex )
                {
                    TrackException(ex);
                    return View("Error");

                }

                

                if (string.IsNullOrWhiteSpace(backToController))
                {
                    return RedirectToAction(nameof(CreatEmail)); 
                }
                else
                {
                    bool resultValue;
                     
                    if (count == 1 && results.TryGetValue( model.Recipients[0], out resultValue))
                    {
                        if (resultValue)
                        { TempData["showSuccessAlert"] = true; }
                        else
                        { TempData["showFailedAlert"] = true; }

                        TempData["username"] = model.UserName;
                        TempData["subject"] = model.Subject;
                    }

                    return RedirectToAction("Index", backToController);
                }
            }
          
            return GetViewNewEmailStartup(model.UserName, model.Recipients);


        }


        [HttpPost("{Culture}/[Area]/[controller]/SendJsonEmail")]
        public virtual async Task<JsonResult> SendJsonEmail(EmailVM model)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    bool result = await _EmailService.SendAsync(new EmailModel
                    {
                        Email = model.Recipients[0],
                        Subject = model.Subject,
                        HtmlMessage = model.Message,
                        Message = Regex.Replace(model.Message, "<.*?>", String.Empty),
                        ReasonOfSend = "MessageByWebAdminPanel"
                    });

                    return Json(new { success = result });

                }
                else
                {
                    return ReturnJsonErrorResult(ModelState, model);
                }
            }
            catch (Exception ex)
            {
                TrackException(ex);
            }
            return Json(new { success = false });
        }
    }
}