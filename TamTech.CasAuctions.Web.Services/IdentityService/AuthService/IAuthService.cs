using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;
using TamTech.CasAuctions.Web.Core.Models.Requests;

namespace TamTech.CasAuctions.Web.Services.Identity
{
    public  interface IAuthService
    {

        Task<IRequestProviderResult<bool>> GenerateResetPasswordByEmailSendig(string email);

        Task<IRequestProviderResult<bool>> ResetPassword(ResetPassword model);

        Task<IRequestProviderResult<bool>> ChangePassword(ChangePassword model);

       
    }
}
