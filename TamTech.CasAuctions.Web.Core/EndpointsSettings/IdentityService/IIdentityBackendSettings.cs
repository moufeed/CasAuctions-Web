using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.EndpointsSettings.IdentityService
{
     public interface IIdentityBackendSettings
    {
        string ClientId { get; }
        string ClientSecret { get; }
        string IdentityEndpointBase { get; }
        string IdentityEndpoint { get; }
        string UserInfoEndpoint { get; }
        string TokenEndpoint { get; }
        string LogoutEndpoint { get; }
        string IdentityCallback { get; }
        string LogoutCallback { get; }
        string GetUsersEndpoint { get; }
        string GetUserByUserNameEndpoint { get; }
        string RegisterUserAsyncEndpoint { get; }
        string BlockUserAsyncEndpoint { get; }
        string UnblockUserAsyncEndpoint { get; }
        string GetRolesEndpoint { get; }
        string SignupEndpoint { get; }
        string ConfirmnumberEndpoint { get; }
        string UpdateMobileNumber { get; }
        string ChangePasswordEndPoint { get; }

 
    }
}
