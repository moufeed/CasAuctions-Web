using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TamTech.CasAuctions.Web.Services.Telemetry
{
    public interface ITelemetryClientService
    {
        void TrackEvent(string eventName, Dictionary<string, string> properties);
        void TrackException(Exception exc, Dictionary<string, string> properties = null, Dictionary<string, double> metrics = null);
    }
}
