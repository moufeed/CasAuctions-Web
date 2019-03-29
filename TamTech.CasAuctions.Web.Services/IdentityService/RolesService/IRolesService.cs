using System.Collections.Generic;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;

namespace TamTech.CasAuctions.Web.Services.Identity
{
    public interface IRolesService
    {
         

        Task<IEnumerable<RoleModel>> GetAllAsync(); 
         
    }
}
