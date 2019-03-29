using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TamTech.CasAuctions.Web.App.Controllers
{
    [Route("account/[action]")]
    public class RedirectionToAccountController : Controller
    {
        //public IActionResult Login(string returnUrl = "")
        //{
        //    //TODO: language should be automaticaly provided in a custom implementation of RedirectToAction
        //    if (Url.IsLocalUrl(returnUrl))
        //        return RedirectToAction("login", "account", new { Area = "Identity", Lang = "en", returnUrl });
        //    else
        //        return RedirectToAction("index", "home");
        //}

        //public IActionResult AccessDenied(string returnUrl = "")
        //{
        //    //TODO: language should be automaticaly provided in a custom implementation of RedirectToAction
        //    if (Url.IsLocalUrl(returnUrl))
        //        return RedirectToAction("AccessDenied", "account", new { Area = "Identity", Lang = "en", returnUrl });
        //    else
        //        return RedirectToAction("index", "home");
        //}


    }
}