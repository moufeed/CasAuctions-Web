using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting; 

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class DevelopmentEnvironmentConfigurations
    {
        public static void ConfigureDevelopmentEnvironment(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
        }
    }
}
