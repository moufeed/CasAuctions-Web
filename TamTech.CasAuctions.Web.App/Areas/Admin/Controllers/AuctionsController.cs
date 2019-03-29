using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using TamTech.CasAuctions.Web.App.Controllers.Admin;
using TamTech.CasAuctions.Web.Services.Telemetry;

namespace TamTech.CasAuctions.Web.App.Areas.Admin.Controllers
{
    public class AuctionsController : AdminBaseController
    {
        #region props
        private readonly IStringLocalizer<AdminBaseController> _localizer;
        #endregion

        public AuctionsController(ITelemetryClientService telemetryClientService, 
                                IStringLocalizer<AdminBaseController> localizer) 
            : base(telemetryClientService, localizer)
        {
            _localizer = localizer;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}