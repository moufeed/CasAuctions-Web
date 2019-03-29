using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.EndpointsSettings.IdentityService;

namespace CasAdmin.AppStartup.MicroServices.ApplicationServices
{
    public static class UrlBackendSettingsServicesConfigurations
    {
        public static void MicroServices_AddUrlBackendSettingsServicesConfigurations(this IServiceCollection services, IConfiguration configuration)
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
