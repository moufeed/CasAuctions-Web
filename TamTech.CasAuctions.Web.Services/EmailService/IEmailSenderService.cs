using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.EmailModels;

namespace TamTech.CasAuctions.Web.Services.Email
{
    public interface IEmailSenderService
    {
        Task<bool> SendAsync(EmailModel model,
                       string userId = "",
                       string clientId = "",
                       List<string> userRoles = null); 
    }
}
