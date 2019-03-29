using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TamTech.CasAuctions.Web.App.Controllers
{
    public class RedirectionToAdminController : Controller
    {
        [Route("admin")]
        public IActionResult RedirectToDashboard()
        {
            return RedirectToAction("index", "Home", new { Area = "Admin" });
        }
    }
}