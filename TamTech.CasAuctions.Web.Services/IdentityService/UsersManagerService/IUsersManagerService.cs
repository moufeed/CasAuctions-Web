using System.Collections.Generic;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;
using TamTech.CasAuctions.Web.Core.Models.Requests;

namespace TamTech.CasAuctions.Web.Services.Identity
{
    public interface IUsersManagerService
    {
        Task<IRequestProviderResult<List<UserModel>>> GetUsersAsync(GetUsersModel model);

        Task<IRequestProviderResult<UserModel>> GetUserByUsernameAsync(string username);

      //  Task<IRequestProviderResult<bool>> DeleteUserByUsernameAsync(string username);

        Task<IRequestProviderResult<bool>> RegisterUserAsync(RegisterUserModel data);

        //Task<bool> RegisterUserAsync(RegisterUserModel data); 

        Task<IRequestProviderResult<bool>> BlockUserAsync(UserNameModel model);

        Task<IRequestProviderResult<bool>> UnblockUserAsync(UserNameModel model);

      
      
    }
}
