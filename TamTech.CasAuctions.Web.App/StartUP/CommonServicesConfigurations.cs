using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection; 
using CasAdmin.Services.Configurations.AppSetting;   
using TamTech.CasAuctions.Web.Core.Settings.Configurations.AppSetting;
using TamTech.CasAuctions.Web.Core.Helpers.StringConverters;
using TamTech.CasAuctions.Web.Services.Validations; 

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class CommonServicesConfigurations
    {
        public static void AddCommonServicesConfigurations(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddApplicationInsightsTelemetryConfigurations(configuration);

            services.AddScoped<IAppSettingsConfigurations, AppSettingsConfigurations>();
            services.AddScoped<IStringConverters, StringConverters>();
            services.AddScoped<IExpressionValidation, ExpressionValidation>();
            // services.AddScoped<ICulturesManager, ConstantsCulturesService>();   


            services.AddUrlBackendSettingsConfigurations(configuration);

            services.AddProvidersConfigurations();

        }
    }
}
