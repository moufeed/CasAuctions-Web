using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace TamTech.CasAuctions.Web.Core.Extensions
{
    public static class IdentityExtensions
    {
        public static string GetUserId(this IIdentity identity)
        {
            //((System.Security.Claims.ClaimsIdentity)HttpContext.User.Identity).Claims
            var claim = ((System.Security.Claims.ClaimsIdentity)identity).Claims.SingleOrDefault(c => c.Type == "sub");
            return claim?.Value;
        }

        // Get Project Name
        public static string GetClientId(this IIdentity identity)
        {
            var claim = ((System.Security.Claims.ClaimsIdentity)identity).Claims.SingleOrDefault(c => c.Type == "client_id");
            return claim?.Value;
        }

        // Get User Role
        public static List<string> GetUserRoles(this IIdentity identity)
        {
            var result = ((System.Security.Claims.ClaimsIdentity)identity).Claims.Where(c => c.Type == "role").Select(v => v.Value).ToList();
            return result;
        }

        public static string GetUserRolesCommaSeparated(this IIdentity identity)
        {
            var result = ((System.Security.Claims.ClaimsIdentity)identity).Claims.Where(c => c.Type == "role").Select(v => v.Value).ToList();
            return String.Join(",", result);
        }
    }
}
