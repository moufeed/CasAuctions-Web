using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.CommonModels.Filters
{
    public class Filters
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SortBy { get; set; } = null;

        public bool Desc { get; set; } = false;

        public string Name { get; set; }

        public string Title { get; set; } = null;

        public int? CityId { get; set; } = null;

        public int? StatusId { get; set; } = null;
         
        public Guid? SectionId { get; set; } = null;

        public Guid? ParentId { get; set; } = null;
         
        public int? Type { get; set; } 

        public int?  Visibility { get; set; }

        public string RoleId { get; set; } = "";
         
        public string ContinuationToken { get; set; } = null;

        public string Section { get; set; } = "";

        public string AuthorName { get; set; } = "";

        public int? Rating { get; set; }

        public override bool Equals(object obj)
        {
            var filters = obj as Filters;

            return filters != null &&
                   Desc == filters.Desc &&
                   CityId == filters.CityId &&
                   StatusId == filters.StatusId &&
                   Desc == filters.Desc &&
                   Type == filters.Type &&
                   Rating == filters.Rating &&

                   EqualityComparer<Guid?>.Default.Equals(SectionId, filters.SectionId) &&
                   string.IsNullOrWhiteSpace(SortBy) == string.IsNullOrWhiteSpace(filters.SortBy) &&
                   string.IsNullOrWhiteSpace(Title) == string.IsNullOrWhiteSpace(filters.Title) &&
                   string.IsNullOrWhiteSpace(RoleId) == string.IsNullOrWhiteSpace(filters.RoleId) &&
                   string.IsNullOrWhiteSpace(Section) == string.IsNullOrWhiteSpace(filters.Section) &&
                   string.IsNullOrWhiteSpace(AuthorName) == string.IsNullOrWhiteSpace(filters.AuthorName) &&
                   string.IsNullOrWhiteSpace(Name) == string.IsNullOrWhiteSpace(filters.Name);
        }
        public static bool operator ==(Filters filters1, Filters filters2)
        {
            return EqualityComparer<Filters>.Default.Equals(filters1, filters2);
        }

        public static bool operator !=(Filters filters1, Filters filters2)
        {
            return !(filters1 == filters2);
        }

    }
}
