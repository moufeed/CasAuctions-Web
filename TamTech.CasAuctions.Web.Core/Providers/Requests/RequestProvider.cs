using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.Requests;

namespace TamTech.CasAuctions.Web.Core.Providers.Requests
{
    public class RequestProvider : IRequestProvider
    {
        private readonly JsonSerializerSettings _serializerSettings;
        private string _token;
        public RequestProvider(string token)
        {
            _serializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                DateTimeZoneHandling = DateTimeZoneHandling.Utc,
                NullValueHandling = NullValueHandling.Ignore
            };
            _serializerSettings.Converters.Add(new StringEnumConverter());
            _token = token;
        }

        public async Task DeleteAsync(string uri)
        {
            HttpClient httpClient = CreateHttpClient();
            await httpClient.DeleteAsync(uri);
        }

        public async Task<IRequestProviderResult<TResult>> GetAsync<TResult>(string uri)
        {
            IRequestProviderResult<TResult> result = new RequestProviderResult<TResult>();
            HttpClient httpClient = CreateHttpClient();
            HttpResponseMessage response = await httpClient.GetAsync(uri);
            await HandleResponse<TResult>(response, result);

            if (result.Success)
            {
                string serialized = await response.Content.ReadAsStringAsync();
                result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
            }
            return result;
        }

        public async Task<IRequestProviderResult<TResult>> GetAsync<TResult, TRequest>(string uri, TRequest data)
        {
            IRequestProviderResult<TResult> result = new RequestProviderResult<TResult>();
            HttpClient httpClient = CreateHttpClient();
            HttpResponseMessage response = await httpClient.GetAsync(GetRequestUri<TRequest>(uri, data));
            await HandleResponse<TResult>(response, result);

            if (result.Success)
            {
                string serialized = await response.Content.ReadAsStringAsync();
                result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
            }
            return result;
        }
        public async Task<IRequestProviderResult<TResult>> GetAsync<TResult, TRequest, THeader>(string uri, TRequest data, string hederKey)
        {
            IRequestProviderResult<TResult> result = new RequestProviderResult<TResult>();
            HttpClient httpClient = CreateHttpClient();
            HttpResponseMessage response = await httpClient.GetAsync(GetRequestUri<TRequest>(uri, data));
            await HandleResponse<TResult>(response, result);

            if (result.Success)
            {
                string serialized = await response.Content.ReadAsStringAsync();
                result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
                try
                {
                    if (hederKey != null)
                    {
                        var header = response.Headers.GetValues(hederKey);
                        foreach (var h in header)
                        { result.JsonHeader = h; }
                        result.Header = JsonConvert.DeserializeObject<THeader>(result.JsonHeader);
                    }
                }
                catch (Exception ex) { }
            }
            return result;
        }

        private string GetRequestUri<TRequest>(string uri, TRequest data)
        {
            try
            {
                if (data != null)
                {
                    var json = JsonConvert.SerializeObject(data);
                    Type type = typeof(TRequest);
                    if (type == typeof(List<string>) || type == typeof(List<Guid>))
                    {
                        var list = JsonConvert.DeserializeObject<List<string>>(json, _serializerSettings);
                        var parameters = "";
                        if (list.Count > 0)
                        {
                            foreach (string str in list)
                            {
                                parameters += $"/{str}";
                            }
                            return $"{uri}{parameters}";
                        }
                    }
                    else
                    {
                        var pairs = JsonConvert.DeserializeObject<Dictionary<string, string>>(json, _serializerSettings);
                        var queries = "";
                        foreach (var pair in pairs)
                        {
                            if (!string.IsNullOrEmpty(pair.Value))
                            {
                                queries += $"{pair.Key}={pair.Value}&";
                            }
                        }
                        if (queries.Length > 0)
                        {
                            queries = queries.Remove(queries.Length - 1);
                            return $"{uri}?{queries}";
                        }
                    }
                }
            }
            catch (Exception ex) { }
            return uri;
        }

        //public async Task<IRequestProviderResult<TResult>> GetAsync<TResult, TRequest>(string uri, TRequest data, string token)
        //{
        //    IRequestProviderResult<TResult> result = new RequestProviderResult<TResult>();

        //    HttpClient httpClient = CreateHttpClient(token);

        //    var content = new StringContent(JsonConvert.SerializeObject(data));
        //    content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

        //    HttpResponseMessage response = await httpClient.GetAsync(uri,);


        //    await HandleResponse<TResult>(response, result);

        //    if (result.Success)
        //    {
        //        string serialized = await response.Content.ReadAsStringAsync();
        //        result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
        //    }
        //    return result;
        //}

        private async Task HandleResponse<TResult>(HttpResponseMessage response, IRequestProviderResult<TResult> result)
        { 
            result.StatusCode = response.StatusCode;
            if (!response.IsSuccessStatusCode)
            {
                result.Success = false; 
                var content = await response.Content.ReadAsStringAsync();
                if (response.StatusCode == HttpStatusCode.InternalServerError)
                {
                    try
                    {
                        //result.Exception = await response.ExceptionResponse();
                        //result.Exception = new ExceptionResponse();
                        //result.Exception.Message = "Internal Server Error";
                        try
                        {
                            string serialized = await response.Content.ReadAsStringAsync();
                        }
                        catch(Exception ex) { }
                    }
                    catch (Exception ex)
                    {
                       
                    } 
                 } 
                if (response.StatusCode == HttpStatusCode.BadRequest)
                {
                    try
                    {
                        Dictionary<string, List<string>> errors = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(content, _serializerSettings);
                        result.Messages = errors; 
                    }
                    catch (Exception exc)
                    {
                        
                    }
                } 
            }
        }

        public async Task<IRequestProviderResult<TResult>> PostAsync<TResult, TRequest>(string uri, TRequest data, ICollection<string> urlParams, string header)
        {
            RequestProviderResult<TResult> result = new RequestProviderResult<TResult>();

            HttpClient httpClient = CreateHttpClient(); 

            if (!string.IsNullOrEmpty(header))
            {
                AddHeaderParameter(httpClient, header);
            }
            
            if(urlParams != null && urlParams.Count > 0)
            {
                var parameters = ""; 
                    foreach (string param in urlParams)
                    {
                        parameters += $"/{param}";
                    }
                uri =   $"{uri}{parameters}";
                
            }
            var content = new StringContent(JsonConvert.SerializeObject(data));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            HttpResponseMessage response = await httpClient.PostAsync(uri, content);

            await HandleResponse<TResult>(response, result);
            if (result.Success)
            {
                string serialized = await response.Content.ReadAsStringAsync();
                result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
            }
            return result;
        }

        public async Task<IRequestProviderResult<TResult>> PostAsync<TResult>(string uri, string data, string clientId, string clientSecret)
        {
            IRequestProviderResult<TResult> result = new RequestProviderResult<TResult>();

            HttpClient httpClient = CreateHttpClient();

            if (!string.IsNullOrWhiteSpace(clientId) && !string.IsNullOrWhiteSpace(clientSecret))
            {
                AddBasicAuthenticationHeader(httpClient, clientId, clientSecret);
            }

            var content = new StringContent(data);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
            HttpResponseMessage response = await httpClient.PostAsync(uri, content);

            await HandleResponse(response, result);
            if (result.Success)
            {
                string serialized = await response.Content.ReadAsStringAsync();

                result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
            }
            return result;
        }

        
        public async Task<IRequestProviderResult<TResult>> PostMultipartContent<TResult>(string uri, MultipartFormDataContent content, string header = "")
        {
            RequestProviderResult<TResult> result = new RequestProviderResult<TResult>();
            HttpClient httpClient = temp_CreateHttpClient();

            if (!string.IsNullOrEmpty(header))
            {
                AddHeaderParameter(httpClient, header);
            }
            HttpResponseMessage response;
            try
            {
                response = await httpClient.PostAsync(uri, content);
                await HandleResponse<TResult>(response, result);
                if (result.Success)
                {
                    string serialized = await response.Content.ReadAsStringAsync();
                    result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
                }
            }
            catch (Exception )
            {

                throw;
            }

            return result;
        }






        public async Task<IRequestProviderResult<TResult>> PutAsync<TResult, TRequest>(string uri, TRequest data, string header)
        {
            IRequestProviderResult<TResult> result = new RequestProviderResult<TResult>();
            HttpClient httpClient = CreateHttpClient();

            if (!string.IsNullOrEmpty(header))
            {
                AddHeaderParameter(httpClient, header);
            }

            var content = new StringContent(JsonConvert.SerializeObject(data));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            HttpResponseMessage response = await httpClient.PutAsync(uri, content);

            await HandleResponse(response, result);
            if (result.Success)
            {
                string serialized = await response.Content.ReadAsStringAsync();

                result.Data = JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings);
            }
            return result;
        }








        private HttpClient CreateHttpClient()
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));



          //  TODO: after supporting login
            if (!string.IsNullOrEmpty(_token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
            }
            return httpClient;
        }
     private HttpClient temp_CreateHttpClient()
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


            var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3NTA0YWY3YzhiMzZjOWI2NzIzMTlmMWNmYzAzZTQ1IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1MzA4NjQ1ODAsImV4cCI6MTUzMzQ1NjU4MCwiaXNzIjoiaHR0cHM6Ly93aGF0Y29vay1kZXYtaWRlbnRpdHkuYXp1cmV3ZWJzaXRlcy5uZXQiLCJzdWIiOiJjOWE0ZjBjZi1hZGE2LTQ5YzMtYmQ4Yy00NzhiMTY1ODFhYmIiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImJlYTEwNDZmLTFlYTktNGMwMi05ZDY5LTM3M2FkNTEyYTI2YyIsInJvbGUiOiJXaGF0Y29va1VzZXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI3NTMxNTkyODY0IiwibmFtZSI6Ijc1MzE1OTI4NjQiLCJwaG9uZV9udW1iZXIiOiI3NTMxNTkyODY0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50X2lkIjoid2hhdGNvb2thcHAiLCJhdXRoX3RpbWUiOiIxNTMwODY0NTgwIiwiYXVkIjpbIm9mZmxpbmVfQWNjZXNzIiwid2hhdGNvb2suYXBpIiwid2hhdGNvb2sucmVhbHRpbWUiLCJpZGVudGl0eS5hcGkiLCJ3aGF0Y29vay51cGxvYWQiLCJodHRwczovL3doYXRjb29rLWRldi1pZGVudGl0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiXSwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwib2ZmbGluZV9BY2Nlc3MiLCJ3aGF0Y29vay5hcGkiLCJ3aGF0Y29vay5yZWFsdGltZSIsImlkZW50aXR5LmFwaSIsIndoYXRjb29rLnVwbG9hZCJdfQ.XfZoGMc1Nc2wljUHb2iGKf4nXe0Xj4CE3vMV1CTUFB1SVviQfWcvAxxTTnxP-b2gKAfwy-YgIh3-IEXRQEa9kYZD2W9tDpy7X9nF0tnFrMaYMveYzNTZGKyMelws_pocbgbpk8WMSiUdJ7hM-b-F7rYNz-prirfQX17fVjb-iCgD7t28scO4w7veK15-z94tJdhfpMmX4SmPdSUbs2nzd6A-Fiim4yTmDYyJ0bPZKjlaHTHdCX4en0eOXUXMAIJq6OVnY0xsk-THUdsFLKtV91nniLl2CGEbkStfqZC66WRrBHxZvTrEy_rpjlFFDoCfyvRgGy0D9LJUjDH5Lc1Asg";
          //  TODO: after supporting login
            if (!string.IsNullOrEmpty(token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
            return httpClient;
        }

        private void AddHeaderParameter(HttpClient httpClient, string parameter)
        {
            if (httpClient == null)
                return;

            if (string.IsNullOrEmpty(parameter))
                return;

            httpClient.DefaultRequestHeaders.Add(parameter, Guid.NewGuid().ToString());
        }

        private void AddBasicAuthenticationHeader(HttpClient httpClient, string clientId, string clientSecret)
        {
            if (httpClient == null)
                return;

            if (string.IsNullOrWhiteSpace(clientId) || string.IsNullOrWhiteSpace(clientSecret))
                return;

            // httpClient.DefaultRequestHeaders.Authorization = new BasicAuthenticationHeaderValue(clientId, clientSecret);
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(clientId, clientSecret);
        }



    }
}
