using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection; 
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.Constants;
using TamTechBackendSDK.Common.Services.IdentityService.Settings;

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static partial class AuthorizationConfigurations
    {

        public static void AddIdentityServerAuthorization(this IServiceCollection services, IConfiguration Configuration)
        {
            IdentityServiceConsumeSettings settings  = Configuration.GetSection(AppSettings.MicroServicesSettings)
                                              .GetSection(AppSettings.MicroServices_IdentityService)
                                              .Get<IdentityServiceConsumeSettings>();

            const string Key = ContentSDKPoliciesConstants.SuperAdmin;
            var role = settings.GetRolesByPolicy(Key);
            services.AddAuthorization(options =>
            {
                options.AddPolicy(Key, policy => policy.RequireRole(role));
            }); ;

        }
    }
}
