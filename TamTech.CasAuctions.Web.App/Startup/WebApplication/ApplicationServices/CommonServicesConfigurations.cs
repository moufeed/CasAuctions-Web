using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using CasAdmin.Services.Configurations.AppSetting; 

using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.Settings.Configurations.AppSetting;
using TamTech.CasAuctions.Web.Core.Helpers.StringConverters;
using TamTech.CasAuctions.Web.Services.Validations;

namespace CasAdmin.AppStartup.WebApplication.ApplicationServices
{
    public static class CommonServicesConfigurations
    {
        public static void AddCommonServicesConfigurations(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddApplicationInsightsTelemetryConfigurations(configuration);
            services.AddScoped<IWebApplicationSettingsService, WebApplicationSettingsService>();
            services.AddScoped<IStringConverters, StringConverters>();
            services.AddScoped<IExpressionValidation, ExpressionValidation>();
            // services.AddScoped<ICulturesManager, ConstantsCulturesService>();   

        }
    }
}
