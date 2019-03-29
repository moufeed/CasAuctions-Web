using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection; 
using TamTech.CasAuctions.Web.Services.Email;
using TamTech.CasAuctions.Web.Services.Identity;
using TamTech.CasAuctions.Web.Services.ServiceBus;

using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.Settings.ServiceBus;

namespace CasAdmin.AppStartup.WebApplication.ApplicationServices
{
    public static class BLLMicroServicesConfigurations
    {
        public static void _AddBusinessLogicMicroServicesConfigurations(this IServiceCollection services, IConfiguration configuration)
        {

          
            #region Identity Service 

            services.AddTransient<IUsersManagerService, UsersManagerService>();
            services.AddTransient<IRolesService, RolesService>();

            #endregion


       


            #region Service Bus 

            services.AddTransient<IServiceBus, ServiceBusProvider>();

            #endregion

            #region Email Service  

            services.AddTransient<IEmailSenderService, EmailSenderToServiceBus>((serviceExtension) =>
            {
                IServiceBus bus = serviceExtension.GetRequiredService<IServiceBus>();
                ServiceBusSettings settings = configuration.GetSection(AppSettings.MicroServicesSettings)
                                                           .GetSection(AppSettings.MicroServices_EmailService)
                                                           .Get<ServiceBusSettings>();
                return new EmailSenderToServiceBus(settings, bus);
            });

            #endregion


             
        }
    }
}
