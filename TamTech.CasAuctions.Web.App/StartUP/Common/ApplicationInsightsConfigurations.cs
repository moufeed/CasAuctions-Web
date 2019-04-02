using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.Settings.Telemetry;
using TamTech.CasAuctions.Web.Services.Telemetry;

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class ApplicationInsightsConfigurations
    {
        public static void AddApplicationInsightsTelemetryConfigurations(this IServiceCollection services, IConfiguration configuration)
        {

            if (!services.Any(s => s.ServiceType == typeof(ITelemetryClientService)))
            {

                services.AddTransient<ITelemetryClientService, TelemetryClientService>((serviceExtension) =>
                {
                    var insightsSettings = configuration.GetSection(AppSettings.WebApplicationSettings)
                                                        .GetSection(AppSettings.WebApplication_ApplicationInsights)
                                                        .Get<TelemetryClientSettings>();
                    var httpContextAccessor = serviceExtension.GetRequiredService<IHttpContextAccessor>();
                    return new TelemetryClientService(insightsSettings, httpContextAccessor);
                });
            }
        }

    }
}
