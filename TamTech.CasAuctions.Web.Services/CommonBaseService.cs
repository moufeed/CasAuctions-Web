using System;
using System.Collections.Generic;
using System.Text;
using TamTech.CasAuctions.Web.Core.Models.Requests;

namespace TamTech.CasAuctions.Web.Services
{
    public class CommonBaseService
    {
 
        public TResult GetDataResult<TResult>(IRequestProviderResult<TResult> model)
        {
            if (model.Success && model.Data != null)
            {
                return model.Data;
            } 
            else
            {
                // >>>  Loge 
            }

            return default(TResult);
        }
    }
}
