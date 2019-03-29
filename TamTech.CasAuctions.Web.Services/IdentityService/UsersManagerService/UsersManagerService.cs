using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.EndpointsSettings.IdentityService;
using TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;
using TamTech.CasAuctions.Web.Core.Models.Requests;
using TamTech.CasAuctions.Web.Core.Providers.Requests;

namespace TamTech.CasAuctions.Web.Services.Identity
{
    public class UsersManagerService : IUsersManagerService
    {
        private readonly IRequestProvider _requestProvider;
        private readonly IIdentityBackendSettings _backendSettings;
        private string _codeVerifier;

        public UsersManagerService (IRequestProvider requestProvider,
                               IIdentityBackendSettings backendSettings
                               )
        {
            _requestProvider = requestProvider;
            _backendSettings = backendSettings;
        }




        public async Task<IRequestProviderResult<List<UserModel>>> GetUsersAsync(GetUsersModel model)
        { 
            return await _requestProvider.GetAsync<List<UserModel>, GetUsersModel, PaginationMetadataModel>(
                                        _backendSettings.GetUsersEndpoint, model, "Paging-Header" );
        }

        public async Task<IRequestProviderResult<UserModel>> GetUserByUsernameAsync(string username)
        {
            return await _requestProvider.GetAsync<UserModel, List<string>>(
                        _backendSettings.GetUserByUserNameEndpoint, new List<string> { username});
        }

        public async Task<IRequestProviderResult<bool>> RegisterUserAsync(RegisterUserModel data)
        {
            return await _requestProvider.PostAsync<bool, RegisterUserModel>( _backendSettings.RegisterUserAsyncEndpoint, data);
            
        }

        public async Task<IRequestProviderResult<bool>> BlockUserAsync(UserNameModel model)
        {
            return await _requestProvider.PostAsync<bool, UserNameModel>(_backendSettings.BlockUserAsyncEndpoint, model);
        }

        public async Task<IRequestProviderResult<bool>> UnblockUserAsync(UserNameModel model)
        {
            return await _requestProvider.PostAsync<bool, UserNameModel>(_backendSettings.UnblockUserAsyncEndpoint, model);
        }

        public async Task<IRequestProviderResult<List<RoleModel>>> _GetRolesAsync()
        {
            return await _requestProvider.GetAsync<List<RoleModel>>(_backendSettings.GetRolesEndpoint);
        }

        public async Task<IEnumerable<RoleModel>> GetRolesAsync()
        {
            var result = await _requestProvider.GetAsync<IEnumerable<RoleModel>>(_backendSettings.GetRolesEndpoint);
            return  GetResult<IEnumerable<RoleModel>>(result);
        }

        public TResult GetResult<TResult>(IRequestProviderResult<TResult> model)
        {
            if(model.Success)
            {
                return  model.Data;
            }
            else 
            {
                // >>>  Loge 
            } 
            return default(TResult);
        }
        //public string CreateAuthorizationRequest(string loginHint)
        //{
        //    var request = new RequestUrl(_backendSettings.IdentityEndpoint);
        //    var url = request.CreateAuthorizeUrl(
        //        clientId: _backendSettings.ClientId,
        //        responseType: OidcConstants.ResponseTypes.CodeIdToken,
        //        responseMode: OidcConstants.ResponseModes.Fragment,
        //        scope: "openid profile offline_access whatcook.realtime whatcook.api identity.api whatcook.upload",
        //        redirectUri: _backendSettings.IdentityCallback,
        //        state: CryptoRandom.CreateUniqueId(),
        //        nonce: CryptoRandom.CreateUniqueId(),
        //        codeChallenge: CreateCodeChallenge(),
        //        codeChallengeMethod: "S256",
        //        loginHint: loginHint,
        //        uiLocales: "en"); 
        //    return url; 
        //}

        //public string CreateLogoutRequest()
        //{
        //    if (string.IsNullOrEmpty())
        //    {
        //        return string.Empty;
        //    }

        //    return string.Format("{0}?id_token_hint={1}&post_logout_redirect_uri={2}",
        //        _backendSettings.LogoutEndpoint,
        //        token,
        //        _backendSettings.LogoutCallback);
        //}

        public async Task<IRequestProviderResult<object>> DeleteUserByUsernameAsync(string username)
        {
            return new RequestProviderResult<object>
            {
                Success = true
            };
        }







        //private string CreateCodeChallenge()
        //{
        //    _codeVerifier = Helpers.RandomNumberGenerator.CreateUniqueId();
        //    var sha256 = PCLCrypto.WinRTCrypto.HashAlgorithmProvider.OpenAlgorithm(PCLCrypto.HashAlgorithm.Sha256);
        //    var challengeBuffer = sha256.HashData(PCLCrypto.WinRTCrypto.CryptographicBuffer.CreateFromByteArray(Encoding.UTF8.GetBytes(_codeVerifier)));
        //    byte[] challengeBytes;
        //    PCLCrypto.WinRTCrypto.CryptographicBuffer.CopyToByteArray(challengeBuffer, out challengeBytes);
        //    var code = Base64Url.Encode(challengeBytes);
        //    return code;
        //}



    }
}
