using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination
{
    public  class PagingParameterModel
    {
        [JsonProperty("t")]
        public string ContinuationToken { get; set; } = null;

        [JsonProperty("pn")]
        public int PageNumber { get; set; } = 1;

        [JsonProperty("ps")]
        public int PageSize
        {
            get { return pageSize == 0 ? 10 : pageSize; }
            set
            {
                pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            }
        }

        [JsonProperty("s")]
        public string SearchText { get; set; } = "";

        private int pageSize = 10;

        private const int MaxPageSize = 20;



  
    }
}
