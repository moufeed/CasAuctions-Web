using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;
using TamTech.CasAuctions.Web.Core.Models.Requests;

namespace TamTech.CasAuctions.Web.Services.Identity
{
    public class AuthService : IAuthService
    {
        public Task<IRequestProviderResult<bool>> ChangePassword(ChangePassword model)
        {
            throw new NotImplementedException();
        }

        public Task<IRequestProviderResult<bool>> GenerateResetPasswordByEmailSendig(string email)
        {
            throw new NotImplementedException();
        }

        public Task<IRequestProviderResult<bool>> ResetPassword(ResetPassword password)
        {
            throw new NotImplementedException();
        }
    }
}
