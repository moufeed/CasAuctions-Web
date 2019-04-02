using Microsoft.AspNetCore.Builder; 
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration; 
using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.App.Settings.Cultures;
using TamTech.CasAuctions.Web.Core.Settings.Routing;

namespace TamTech.CasAuctions.Web.App.StartUP
{
    public static class RouteConfigurations
    {
        public static void UseAppRouter(this IApplicationBuilder app, IConfiguration configuration, RequestLocalizationOptions localizationOptions, bool DisplayArea = false)
        {
            RoutingAppSettings routingSettings = configuration.GetSection(AppSettings.WebApplicationSettings)
                                                            .GetSection(AppSettings.WebApplication_Configuration)
                                                            .GetSection(AppSettings.App_Routing)
                                                            .Get<RoutingAppSettings>();




            app.UseRouter(routes =>
            {
                routes.MapMiddlewareRoute("{culture=" + CultureConstants.DefaultCulture.Culture + "}/{*mvcRoute}", subApp =>
                 {
                     subApp.UseRequestLocalization(localizationOptions);
                     subApp.UseMvc(mvcRoutes =>
                     {
                         mvcRoutes.MapRoute(
                                             name: "default",
                                             template: "{culture}/{area}/{controller}/{action}/{*slug}",
                                             defaults: new
                                             {
                                                 culture = CultureConstants.DefaultCulture.Culture,
                                                 area = routingSettings.DefaultArea,
                                                 controller = "Home",
                                                 action = "index"
                                             },
                                              constraints: new { culture = CultureConstants.Constraint }
                                           );
                        //if (DisplayArea)
                        //{
                        //    mvcRoutes.MapRoute(
                        //                      name: "Portal_Content_Details",
                        //                      template: "{culture}/Portal/{controller}/{slug}",
                        //                      defaults: new { culture = CultureConstants.DefaultCulture.Culture, area = "Portal", controller = "Home", action = "Details" }
                        //                  );
                        //    mvcRoutes.MapRoute(
                        //                       name: "Portal_ContactUs",
                        //                       template: "{culture}/Portal/{action}",
                        //                       defaults: new { culture = CultureConstants.DefaultCulture.Culture, area = "Portal", controller = "Home", action = "ContactUs" });

                        //}
                        //else
                        //{
                        //    mvcRoutes.MapRoute(
                        //             name: "Portal_Content_Details1",
                        //             template: "{culture}/{controller}/{slug}",
                        //             defaults: new { culture = CultureConstants.DefaultCulture.Culture, area = "Portal", controller = "Home", action = "Details" }
                        //         );
                        //    mvcRoutes.MapRoute(
                        //                   name: "Portal_Content_Details",
                        //                   template: "{culture}/{controller}/",
                        //                   defaults: new { culture = CultureConstants.DefaultCulture.Culture, area = "Portal", controller = "Home", action = "Index" }
                        //               );
                        //    mvcRoutes.MapRoute(
                        //                       name: "Portal_ContactUs",
                        //                       template: "{culture}/{action}",
                        //                       defaults: new { culture = CultureConstants.DefaultCulture.Culture, area = "Portal", controller = "Home", action = "ContactUs" });
                        //}

                        //mvcRoutes.MapRoute(
                        //                   name: "Portal_Module_Index",
                        //                   template: "{culture}/{area}/{controller}",
                        //                   defaults: new { culture = CultureConstants.DefaultCulture.Culture, area = "Portal", controller = "Home", action = "index" }
                        //               );




                        //mvcRoutes.MapRoute(
                        //                      name: "Area_Module_Action",
                        //                      template: "{culture}/Portal/{controller}/{action}",
                        //                      defaults: new { culture = CultureConstants.DefaultCulture.Culture, area = "Portal", controller = "Home", action = "index" }
                        //                  );




                        //#region Area = Portal / Controller = Home

                        //mvcRoutes.MapRoute(
                        //                        name: "PortalArea_ContactUs-Culture-Portal",
                        //                        template: "{culture}/Portal/{action}",
                        //                        defaults: new { culture = "en-US", area = "Portal", controller = "Home", action = "ContactUs" });

                        //mvcRoutes.MapRoute(
                        //                      name: "PortalArea_ContactUs-Portal",
                        //                      template: "Portal/{action}",
                        //                      defaults: new { culture = "en-US", area = "Portal", controller = "Home", action = "ContactUs" });

                        //mvcRoutes.MapRoute(
                        //                        name: "PortalArea_ContactUs-Culture",
                        //                        template: "{culture}/{action}",
                        //                        defaults: new { culture = "en-US", area = "Portal", controller = "Home", action = "ContactUs" });

                        //mvcRoutes.MapRoute(
                        //                      name: "PortalArea_ContactUs",
                        //                      template: "{action}",
                        //                      defaults: new { culture = "en-US", area = "Portal", controller = "Home", action = "ContactUs" });

                        //#endregion


                    });
                 });

            });
        }
    }
}

/*
                       * 
                        {   
                          -  Only accepted : https://localhost:44365/portal/services >>>> https://localhost:44365/area/controler
                          -  Unacceptable  : any urle contain {culture}
                          -  Unacceptable  : https://localhost:44365
                           ---------------------------------------------------------------------------------------------------
                           //routes.MapRoute("areaRoute", "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                           ---------------------------------------------------------------------------------------------------
                        }

                       {   
                          -  Only accepted : https://localhost:44365/en-US/Portal/Services >>>> root/culture/area/controler
                          -  Unacceptable : any urle not contain {culture}
                          -  Unacceptable  : https://localhost:44365
                           ---------------------------------------------------------------------------------------------------
                           // mvcRoutes.MapRoute("areaRoute", "{culture=" + CultureConstants.DefaultCulture.Culture + "}/{area:exists}/{controller=Home}/{action=Index}/{id?}");
                           ---------------------------------------------------------------------------------------------------
                        }

  */
//StringBuilder dCultureBuilder = new StringBuilder();
//dCultureBuilder.Append("{culture=")
//        .Append(CultureConstants.DefaultCulture.Culture)
//        .Append("}");
//StringBuilder templateBuilder = new StringBuilder();
//templateBuilder.Append("/{*mvcRoute}");
