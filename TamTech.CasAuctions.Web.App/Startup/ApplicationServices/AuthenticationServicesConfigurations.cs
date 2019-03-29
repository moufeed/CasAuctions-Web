using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;

namespace CasAdmin.AppStartup.MicroServices.ApplicationServices
{

    public static class AuthenticationServicesConfigurations
    {
        public static void MicroServices_AddIdentityServerAuthentication(this IServiceCollection services, IConfiguration Configuration)
        {


            IdentityServiceSettings identityServiceSettings = Configuration
                                                                      .GetSection(AppSettings.MicroServicesSettings)
                                                                      .GetSection(AppSettings.MicroServices_IdentityService)
                                                                      .Get<IdentityServiceSettings>();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = identityServiceSettings.DefaultScheme;
                options.DefaultChallengeScheme = identityServiceSettings.DefaultChallengeScheme;
            })


            .AddCookie(identityServiceSettings.CookieAuthenticationScheme)
            .AddOpenIdConnect(identityServiceSettings.OpenIdConnectAuthenticationScheme, options =>
            {
                options.SignInScheme = identityServiceSettings.SignInScheme;
                options.Authority = identityServiceSettings.Url;
                options.RequireHttpsMetadata = identityServiceSettings.RequireHttpsMetadata;
                options.ClientId = identityServiceSettings.ClientId;
                options.ClientSecret = identityServiceSettings.ClientSecrets;
                options.ResponseType = identityServiceSettings.ResponseType;
                options.SaveTokens = false;
                options.GetClaimsFromUserInfoEndpoint = false;
                foreach (string scop in identityServiceSettings.Scops)
                {
                    options.Scope.Add(scop);
                }
            });

        }
    }
}
