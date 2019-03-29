using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Localization;
using TamTech.CasAuctions.Web.Core.Models.CommonModels.Filters;
using TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination;

namespace TamTech.CasAuctions.Web.Core.TagHelpers
{
    public class Pagination : TagHelper
    {


        #region Attributes
        public Filters FilterModel { get; set; }
        public PaginationMetadataModel PagniationModel { get; set; }
        public string ActionName { get; set; } = "index";
        public string ControllerName { get; set; }
        public bool Total { get; set; }
        #endregion


        IStringLocalizer<Pagination> _Localizer { get; set; }

        [ViewContext]
        [HtmlAttributeNotBound]
        public ViewContext ViewContext { get; set; }
        private IUrlHelperFactory _urlHelperFactory { get; set; }

        public Pagination(IUrlHelperFactory urlHelperFactory, IStringLocalizer<Pagination> Localizer)
        {
            _urlHelperFactory = urlHelperFactory;

            _Localizer = Localizer;
        }


        private object CreateUrl (int indx)
        {
            dynamic Url = new System.Dynamic.ExpandoObject();

            Url.PageNumber = indx;

            Url.PageSize = FilterModel.PageSize;


            if (!string.IsNullOrEmpty(FilterModel.Title))
            {
                Url.Title = FilterModel.Title;
            }

            if (FilterModel.Desc)
            {
                Url.Desc = FilterModel.Desc;
            }

            if (FilterModel.SectionId != default(Guid))
            {
                Url.SectionId = FilterModel.SectionId;
            }

            if (!string.IsNullOrEmpty(FilterModel.SortBy))
            {
                Url.SortBy = FilterModel.SortBy;
            }

            if (!string.IsNullOrEmpty(FilterModel.Name))
            {
                Url.Name = FilterModel.Name;
            }
              
            if (FilterModel.CityId != null)
            {
                Url.CityId = FilterModel.CityId;
            }

            if (FilterModel.StatusId != null)
            {
                Url.StatusId = FilterModel.StatusId;
            }

            if (!string.IsNullOrEmpty(FilterModel.RoleId))
            {
                Url.RoleId = FilterModel.RoleId;
            }

            if (!string.IsNullOrEmpty(FilterModel.AuthorName))
            {
                Url.AuthorName = FilterModel.AuthorName;
            }

            if (FilterModel.Rating != null)
            {
                Url.Rate = FilterModel.Rating;
            }

            if (FilterModel.Visibility != null )
            {
                Url.Visibility = FilterModel.Visibility;
            }

            return Url;
        }





        private void AppendTotal(StringBuilder Str)
        {

            int str = 1;
            int ps = PagniationModel.TotalCount;
            if (int.Parse(PagniationModel.PageNumber) > 1)
            {
                if (int.Parse(PagniationModel.PageNumber) * PagniationModel.PageSize > PagniationModel.TotalCount)
                {
                    str = 0;
                }
                else
                {
                    str = PagniationModel.PageSize * int.Parse(PagniationModel.PageNumber) - PagniationModel.PageSize;
                }
            }

            if (PagniationModel.PageSize < PagniationModel.TotalCount)
            {
                if (int.Parse(PagniationModel.PageNumber) * PagniationModel.PageSize > PagniationModel.TotalCount)
                {
                    ps = PagniationModel.TotalCount;
                }
                else
                {

                    ps = int.Parse(PagniationModel.PageNumber) * PagniationModel.PageSize;
                }
            }
            Str.Append("<div class=\"m-4 total-count pull-left flip-dir\">");

            Str.Append($"<span>{_Localizer["showing_of", str, ps, PagniationModel.TotalCount]}</span>");

            Str.Append("</div>");

           

        }


        private string PrintPagination()
        {
            StringBuilder Str = new StringBuilder();
            var urlHelper = _urlHelperFactory.GetUrlHelper(ViewContext);
            Str.Append("<div class=\"clearfix\">");
            if (Total)
            {
                AppendTotal(Str);
            }
            Str.Append("<nav aria-label=\"Page navigation\" class=\"m-x-5 pull-right flip-dir\">");
            Str.Append("<ul class=\"pagination  m-4\">");

            if (PagniationModel.PreviousPage)
            {
                object PreviousUrl = CreateUrl(int.Parse(PagniationModel.PageNumber) - 1);

                Str.Append("<li>");
                var link = urlHelper.Action(ActionName, ControllerName, PreviousUrl);

                Str.Append($"<a href=\"{link}\" aria-label=\"Previous\">"); 

                Str.Append($"<span aria-hidden=\"true\">{_Localizer["Previous"]}</span>");


                Str.Append("</a></li>");
 
            }

            if (PagniationModel.TotalPages > 1 )
            {
                int count = PagniationModel.TotalPages - int.Parse(PagniationModel.PageNumber);
                int end = PagniationModel.TotalPages - count;
                int start = 1;
                  if (int.Parse(PagniationModel.PageNumber) >= 10)
                    {
                        start = int.Parse(PagniationModel.PageNumber) - 5;
                    }

                    if (count > 5)
                    {
                        end = end + 5;
                    }
                    else if (count <= 5)
                    {
                        end = PagniationModel.TotalPages;
                    }
                for (int i = start; i <= end; i++)
                {
                    object url = CreateUrl(i);
                    string active = int.Parse(PagniationModel.PageNumber) == i ? "active" : "";
                    var link = urlHelper.Action(ActionName, ControllerName, url);

                    Str.Append($"<li class=\"{active}\">");
                    Str.Append($"<a href=\"{link}\">{i}</a>");
                    Str.Append("</li>");
                }

            }
            
             
            if (PagniationModel.NextPage)
            {
                object nextUrl = CreateUrl(int.Parse(PagniationModel.PageNumber) + 1);

                Str.Append("<li>");
                var link = urlHelper.Action(ActionName, ControllerName, nextUrl);

                Str.Append($"<a href=\"{link}\" aria-label=\"Next\">");

                Str.Append($"<span aria-hidden=\"true\">{_Localizer["Next"]}</span>");
                 
                Str.Append("</a></li>");
            }
            
            Str.Append("</ul></nav></div>");
            return Str.ToString();
        }




        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            string pageintaion = PrintPagination();
            
            output.TagName = null;
            output.Content.SetHtmlContent(pageintaion);
        }
    }
}

