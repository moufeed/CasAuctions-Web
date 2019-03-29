using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination
{
   public class PaginationModel
    {
        public string PageNumber { get; set; } = "1";

        public int PageSize { get; set; } = 10 ;
    }
}
