using System;
using System.Collections.Generic;
using System.Text; 

namespace TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination
{
    public class PagedResultModel<TCollection>
    {
        public TCollection Data { get; set; }

        public PaginationMetadataModel Pagination { get; set; }
         
    }
}
