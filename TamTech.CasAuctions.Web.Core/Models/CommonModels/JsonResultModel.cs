using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.CommonModels
{
    public class JsonResultModel<TResult , TModel>
    {
        public bool Success { get; set; }

        public HttpStatusCode StatusCode { get; set; } 

        public TResult Result { get; set; }

        public TModel Model { get; set; }

        public List<KeyValuePair<string, List<string>>> Errors { get; set; } = new List<KeyValuePair<string, List<string>>>();


        

    }
}
