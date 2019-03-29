using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.IdentityModels
{
    public class ChangePassword
    {
        [Required]
        [JsonProperty("c")]
        public string CurrentPassword { get; set; }


        [Required]
        [JsonProperty("n")]
        public string NewPassword { get; set; }

    }
}
