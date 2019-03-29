using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.CommonModels.Policies;

namespace TamTech.CasAuctions.Web.Core.Models.IdentityModels
{
    public class IdentityServiceSettings
    {

        public string Url { get; set; }
        public string ApiName { get; set; }
        public bool RequireHttpsMetadata { get; set; }
        public string SignInScheme { get; set; }
        public string DefaultScheme { get; set; }
        public string CookieAuthenticationScheme { get; set; }
        public string OpenIdConnectAuthenticationScheme { get; set; }
        public string DefaultChallengeScheme { get; set; }
        public string ClientId { get; set; }
        public string ClientSecrets { get; set; }
        public string ResponseType { get; set; }
        public bool SaveTokens { get; set; }
        public bool GetClaimsFromUserInfoEndpoint { get; set; }
        public List<string> Scops { get; set; }


        public List<PolicySetting> Policies { get; set; }

       



        public List<string> GetRolesByPolicy(string policy)
        {
            var result = this.Policies
                       .Where(r => r.Key == policy)
                       .SelectMany(r => r.Value.Split(','))
                       .ToList();

            return result;
        }
    }
}
