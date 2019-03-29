using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection; 
using CasAdmin.AppStartup.MicroServices.ApplicationServices;
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;

namespace CasAdmin.AppStartup.WebApplication.ApplicationServices
{
    public static class MainServicesConfigurations
    {
        public static void AddMainServicesConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
            bool useMicroServices = configuration.GetSection(AppSettings.WebApplicationSettings)
                                                 .GetSection(AppSettings.WebApplication_UseMicroServices).Get<bool>();
          
                services.MicroServices_AddUrlBackendSettingsServicesConfigurations(configuration);

                services.MicroServices_AddProvidersServicesConfigurations();
           
        }
    }
}
