using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;


namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class AuthenticationConfigurations
    {
        public static void AddIdentityServerAuthentication(this IServiceCollection services, IConfiguration Configuration)
        {


            IdentityServiceSettings identityServiceSettings = Configuration
                                                                      .GetSection(AppSettings.MicroServicesSettings)
                                                                      .GetSection(AppSettings.MicroServices_IdentityService)
                                                                      .Get<IdentityServiceSettings>();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = "Cookies";
                options.DefaultChallengeScheme = "oidc";
            })
            .AddCookie("Cookies")
            .AddOpenIdConnect("oidc", options =>
            {
                options.SignInScheme = "Cookies";
                options.Authority = "http://localhost:60025";
                options.RequireHttpsMetadata = false;
                options.ClientId = "WEB";
                options.ClientSecret = "h8yI4DydzI5ZsKCMGTs9hfTdI1vRS3qfTo9Go92q3aM=";
                options.ResponseType = "code id_token";
                options.SaveTokens = true;
                options.GetClaimsFromUserInfoEndpoint = true;
                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("offline_access");
                options.Scope.Add("auctions.api");
                options.Scope.Add("auctions.identity.api");
                options.Scope.Add("auctions.web.app");

            });

        }

    }
}
