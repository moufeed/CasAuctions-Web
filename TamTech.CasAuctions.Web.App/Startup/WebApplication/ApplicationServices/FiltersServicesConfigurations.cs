using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace CasAdmin.AppStartup.WebApplication.ApplicationServices
{
    public static class FiltersServicesConfigurations
    {
        public static void AddFiltersConfigurations(this IServiceCollection services)
        {
            //services.AddTransient<AdminFilter>();
            //  services.AddTransient<MenuFilter>(); 
        }
    }
}
