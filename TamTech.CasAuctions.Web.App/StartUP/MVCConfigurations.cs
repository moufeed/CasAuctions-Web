using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection; 
using System.IO.Compression;
using System.Linq; 

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class MVCConfigurations
    {
        public static void AddMVCConfigurations(this IServiceCollection services)
        { 
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.Configure<RouteOptions>(options => options.LowercaseUrls = false);

            services.AddMvc( )
                               .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
                               .SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddFluentValidation();

            services.AddPortableObjectLocalization(options => options.ResourcesPath = "Localization");

            services.AddMvcCore().AddJsonFormatters();

            #region Response Compression
            services.Configure<GzipCompressionProviderOptions>(option =>
            {
                option.Level = CompressionLevel.Fastest;
            });

            services.AddResponseCompression(options =>
            { 
                options.EnableForHttps = true;
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
                {
                    "application/xml",
                    "text/xml",
                    "application/json",
                    "text/json",
                    "image/svg+xml",
                    "application/font-woff2",
                    "application/x-font-ttf",
                    "font/ttf",
                    "font/eot",
                    "font/otf",
                    "font/opentype"
                }); 
                options.Providers.Add<GzipCompressionProvider>(); 
            });
            #endregion
        }
    }
}
