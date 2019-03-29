using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection; 

namespace CasAdmin.AppStartup.WebApplication.ApplicationServices
{
    public static class BusinessLogicServicesConfigurations
    {
        public static void AddBusinessLogicServicesConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
           
                services._AddBusinessLogicMicroServicesConfigurations(configuration);
           
        }
    }
}
