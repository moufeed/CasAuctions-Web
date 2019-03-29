using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.IdentityModels
{
    public class UserNameModel
    {
        [Required]
        [JsonProperty("username")]
        public string UserName { get; set; } 

    }
}
