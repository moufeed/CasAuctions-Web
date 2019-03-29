using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination
{
    public class PaginateWithFilterModel
    {
        [JsonProperty("sort")]
        public string SortBy;

        [JsonProperty("desc")]
        public bool Descending;

        [JsonProperty("pagenum")]
        public int PageNumber { get; set; } = 1;

        [JsonProperty("pagesize")]
        public int PageSize
        {
            get { return pageSize == 0 ? 10 : pageSize; }
            set
            {
                pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            }
        }

        [JsonProperty("continuation")]
        public string ContinuationToken { get; set; } = null;

        [JsonProperty("search")]
        public Dictionary<string, string> SearchProperties = new Dictionary<string, string>();



        private int pageSize = 10;
        const int MaxPageSize = 20;
    }
}
