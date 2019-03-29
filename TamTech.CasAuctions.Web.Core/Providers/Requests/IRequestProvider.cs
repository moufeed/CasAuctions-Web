using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.Requests;

namespace TamTech.CasAuctions.Web.Core.Providers.Requests
{
    public interface IRequestProvider
    { 
        Task<IRequestProviderResult<TResult>> GetAsync<TResult>(string uri);
        Task<IRequestProviderResult<TResult>> GetAsync<TResult, TRequest>(string uri, TRequest data);
        Task<IRequestProviderResult<TResult>> GetAsync<TResult, TRequest, THeader>(string uri, TRequest data, string hederKey);
        Task<IRequestProviderResult<TResult>> PostAsync<TResult, TRequest>(string uri, TRequest data, ICollection<string> urlParams = null, string header = "");

       
        Task<IRequestProviderResult<TResult>> PostAsync<TResult>(string uri, string data, string clientId, string clientSecret);
        Task<IRequestProviderResult<TResult>> PutAsync<TResult, TRequest>(string uri, TRequest data,  string header = "");
        Task DeleteAsync(string uri);
        Task<IRequestProviderResult<TResult>> PostMultipartContent<TResult>(string uri, MultipartFormDataContent content, string header = "");

    }
}

