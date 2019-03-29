using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TamTech.CasAuctions.Web.Core.Settings.ServiceBus
{
    public class ServiceBusSettings
    { 
        //public ServiceBusSettings(string connectionString, string name)
        //{
        //    ServiceBusConnectionString = connectionString;
        //    ServiceBusName = name;
        //}

        //public ServiceBusSettings( )
        //{ 
        //}

        public string ServiceBusConnectionString { get; set; }

        public string ServiceBusName { get; set; }

        public int MaxCharactersLength { get; set; }

        public bool AllowMultiParts { get; set; }

    }
}
