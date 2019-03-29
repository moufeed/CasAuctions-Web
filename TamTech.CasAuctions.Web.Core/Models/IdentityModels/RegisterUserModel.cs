using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.IdentityModels
{
    public class RegisterUserModel
    {
       
        [JsonProperty("u")]
        public string UserName { get; set; }

        
        [JsonProperty("m")]
        public string PhoneNumber { get; set; }

       
        [JsonProperty("p")]
        public string Password { get; set; }

       
        [JsonProperty("r")]
        public IEnumerable<string> RolesNames { get; set; }


        [JsonProperty("e")]
        public string Email { get; set; }
    }
}
