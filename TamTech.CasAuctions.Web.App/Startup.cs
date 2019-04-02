using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http; 
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;   
using TamTech.CasAuctions.Web.App.Settings.Cultures;
using TamTech.CasAuctions.Web.App.StartUP;

namespace CasAdmin
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMVCConfigurations();  

            services.AddFiltersConfigurations();

            services.AddIdentityServerAuthentication(Configuration);

            services.AddIdentityServerAuthorization( Configuration);

            services.AddCommonServicesConfigurations(Configuration);

            services.AddBLLServicesConfigurations(Configuration);
             

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                // app.UseBrowserLink(); from web admin panel
                app.UseDeveloperExceptionPage();

               
            }
            else
            {
                app.UseExceptionHandler("/error/500");
                app.UseHsts();
            }


           // app.MigrateDB(Configuration);


            //app.UseHttpsRedirection();
            //app.UseStaticFiles();
            //app.UseCookiePolicy();



            var cachePeriod = env.IsDevelopment() ? "600" : "86400";
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
                }
            });
            app.UseResponseCompression();


         //   app.UseStatusCodePagesWithRedirects("/error/{0}");

            app.InitializeMapper();

           
          

            app.UseResponseCompression();

 
            app.UseAppRouter(Configuration, new CultureManager().LocalizationOptions);
            // app.UseAppRouter(Configuration, localizationOptions);


        }
    }
}
 