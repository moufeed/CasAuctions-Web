using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using TamTech.CasAuctions.Web.Core.Extensions;
using TamTech.CasAuctions.Web.Core.Settings.Telemetry;

namespace TamTech.CasAuctions.Web.Services.Telemetry
{
    public class TelemetryClientService : ITelemetryClientService
    {
         private TelemetryClient _telemetry; 
         public TelemetryClientService(TelemetryClientSettings appInsightsSettings, IHttpContextAccessor httpContextAccessor)
        {
            
            _telemetry = new TelemetryClient();
            _telemetry.InstrumentationKey = appInsightsSettings.InstrumentationKey;
            _telemetry.Context.User.Id = httpContextAccessor.HttpContext.User.Identity.GetUserId();
            //_telemetry.Context.Device.Id = ; 
        }

        public void TrackEvent(string eventName, Dictionary<string, string> properties)
        {
            _telemetry.TrackEvent(eventName, properties);
        }

        public void TrackException(Exception exc, Dictionary<string, string> properties = null, Dictionary<string, double> metrics = null)
        {
            _telemetry.TrackException(exc, properties, metrics);
        }
    }
}
