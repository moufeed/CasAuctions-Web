using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;  

namespace CasAdmin.AppStartup.WebApplication.RequestPipeline
{
    public static class MapperConfigurations
    {
        public static void InitializeMapper(this IApplicationBuilder app)
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
               

                cfg.CreateMap<KeyValuePair<Guid, string>, SelectListItem>()
                   .ForMember(dest => dest.Text,
                   opts => opts.MapFrom(src => src.Value))

                   .ForMember(dest => dest.Value,
                   opts => opts.MapFrom(src => src.Key));

              

 
            });

        }
    }
}
