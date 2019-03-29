using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Text;

namespace CasAdmin.AppStartup.WebApplication.RequestPipeline
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
