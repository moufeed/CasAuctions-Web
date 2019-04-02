using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Providers.Requests;

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class ProvidersConfigurations
    {
        public static void  AddProvidersConfigurations(this IServiceCollection services)
        {
            services.AddScoped<IRequestProvider, RequestProvider>((serviceExtension) =>
            {
                // var _token = Task.Run(async () => await httpContextAccessor.HttpContext.GetTokenAsync("access_token")).Result;
                // var token = GetToken(httpContextAccessor.HttpContext).GetAwaiter().GetResult();
                IHttpContextAccessor httpContextAccessor = serviceExtension.GetRequiredService<IHttpContextAccessor>();
                string token = GetToken(httpContextAccessor.HttpContext).Result;
                return new RequestProvider(token);
            });

            async Task<string> GetToken(HttpContext httpContext)
            {
                return await httpContext.GetTokenAsync("access_token");
            }
        }
    }
}
