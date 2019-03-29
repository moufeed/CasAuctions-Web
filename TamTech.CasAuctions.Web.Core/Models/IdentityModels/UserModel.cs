using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.IdentityModels
{ 
    public class UserModel
    {
        public string Name { get; set; }

        public DateTimeOffset? LockoutEnd { get; set; }
          
        public bool MobileNumberConfirmed { get; set; }

        public string MobileNumber { get; set; }
         
        public bool EmailConfirmed { get; set; }

        public string NormalizedEmail { get; set; }

        public string Email { get; set; }

        public string NormalizedUserName { get; set; }

        public string UserName { get; set; }

        public string Id { get; set; }

        public bool LockoutEnabled { get; set; }

        public int AccessFailedCount { get; set; }

        public string ImageUrl = $"/images/avatar.png";

        public string Gender { get; set; }

        public bool IsLockout { get; set; }

        public bool IsBlocked { get; set; }
 
    }
}
