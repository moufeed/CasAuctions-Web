using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.EndpointsSettings.IdentityService;

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class UrlBackendSettingsConfigurations
    {
        public static void AddUrlBackendSettingsConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
       

            services.AddScoped<IIdentityBackendSettings, IdentityBackendSettings>((serviceExtension) =>
            {
                var url = configuration
                .GetSection(AppSettings.MicroServicesSettings)
                .GetSection(AppSettings.MicroServices_IdentityService)
                .GetValue<string>("Url");

                return new IdentityBackendSettings(url);
            });

           




       




        }
    }
}
