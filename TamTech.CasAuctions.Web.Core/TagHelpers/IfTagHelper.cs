using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.TagHelpers
{
    public class IfTagHelper : TagHelper
    {
        public override int Order => -1000;

        [HtmlAttributeName("include-if")]
        public bool Include { get; set; } = true;

        [HtmlAttributeName("exclude-if")]
        public bool Exclude { get; set; } = false;

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            // Always strip the outer tag name as we never want <if> to render
            output.TagName = null;

            if (Include && !Exclude)
            {
                return;
            }

            output.SuppressOutput();
        }

    }
}
