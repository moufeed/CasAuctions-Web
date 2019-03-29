

const Seo_Defaults_labels ={
    "Add":"Add",
    "page_name": "Page Name :",
    "page_description":"Page description :",
    "service_name":"Service Name :",
    "service_description":"Service description :",
    "service_provider":"Service Provider :",
    "recipe_name":"Recipe Name :",
    "recipe_keywords":"Recipe keywords :",
    "recipe_description":"Recipe description :",
    "recipe_category": "Recipe Category :",
    "recipe_cuisine":"Recipe Cuisine :",
    "cook_time": "Cook Time :",
    "prep_time":"Prep Time :",
    "total_time":"Total Time :",
    "time_in_minutes":"time in minutes :",
    "number_of_servings":"Number of servings :",
    "recipe_ingredient":"Recipe Ingredient :",
    "add_ingredient":"Add Ingredient",
    "recipe_instructions": "Recipe Instructions :",
    "add_instructions": "Add Instructions",
    "author": "Author :",
    "product_name": "Product Name :" ,
    "product_description":"Product description :" ,
    "brand_name": "Brand Name :",
    "product_Category":  "Product Category :",
    "add_category": "Add category :",
    "gallery_name":"Gallery Name :",
    "gallery_description": "Gallery description :",
    "gallery_author":"Gallery author :" ,
    "article_name":"Article Name :" ,
    "article_headLine": "Article HeadLine :",
    "article_description": "Article Description :" ,
    "article_author": "Article author :",
    "article_publisher": "Article publisher :"
}
let localizer = $.extend({}, Seo_Defaults_labels , window.seo_labels || {});


const SEOTemplates = [];

const hiddenTemp =`
<input type="hidden" name="Seo[data][DatePublished]" value="@DatePublished@" />
<input type="hidden" name="Seo[data][DateModified]" value="@DateModified@" />
<input type="hidden" name="Seo[data][Image]" value="@Image@" />`;

/* 
<input type="hidden" name="Seo[data][author][type]" value="Person" />
<input type="hidden" name="Seo[data][author][name]" value="@Name@" /> */

  

SEOTemplates["WebPage"] = 
`<input type="hidden" name="Seo[Type]" id="SeoType" value="WebPage" />
${hiddenTemp}
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.page_name}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][name]" class="form-control"  value="@Title@"/>
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.page_description}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <textarea name="Seo[data][Description]" rows="3" class="form-control">@Description@</textarea>
    </div>
</div>`;



SEOTemplates["Article"]  = 
`<input type="hidden" name="Seo[Type]"  id="SeoType" value="Article" />
 <input type="hidden" name="Seo[data][author][Type]" value="Person" />
 <input type="hidden" name="Seo[data][publisher][Type]" value="Organization" />
 <input type="hidden" name="Seo[data][publisher][logo][Type]" value="ImageObject" />
 <input type="hidden" name="Seo[data][publisher][logo][url]" value="@logoUrl@" />
 <input type="hidden" name="Seo[data][publisher][logo][Width]" value="125" />
 <input type="hidden" name="Seo[data][publisher][logo][Height]" value="125" />

   ${hiddenTemp}
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.article_name}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][name]" class="form-control" value="@Title@"/>
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.article_headLine}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text"  class="form-control"  name="Seo[data][HeadLine]"/>
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.article_description}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <textarea name="Seo[data][Description]" rows="3" class="form-control">@Description@</textarea>
    </div>
</div>

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.article_author}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" class="form-control" name="Seo[data][author][name]" value="@author@" />
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.article_publisher}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" class="form-control" name="Seo[data][publisher][name]" value="" />
    </div>
</div>
`;

SEOTemplates["ImageGallery"] =`
<input type="hidden" name="Seo[Type]" id="SeoType" value="ImageGallery" />
${hiddenTemp}
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.gallery_name}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][name]" class="form-control"  value="@Title@"/>
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.gallery_description}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <textarea name="Seo[data][Description]" rows="3" class="form-control" >@Description@</textarea>
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.gallery_author}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" class="form-control" name="Seo[data][author][name]" value="@author@"  />
    </div>
</div>
`;
SEOTemplates["Product"] =`
<input type="hidden" name="Seo[Type]" id="SeoType" value="Product" />
<input type="hidden" name="Seo[data][Image]" value="@Image@" />

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.product_name}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][name]" class="form-control"  value="@Title@"/>
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.product_description}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
    <textarea name="Seo[data][Description]" rows="3" class="form-control" >@Description@</textarea>
    </div>
</div>

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.brand_name}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][brand]" class="form-control" />
    </div>
</div>

<div class="form-group ">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.product_Category}</label>
    <div class="col-md-7 col-sm-9 col-xs-12 category">
        <div class="input-group mb-3 add-category">
            <input type="text" class="form-control" id="input-category" placeholder="${localizer.add_category}">
            <div class="input-group-addon">
                <button class="btn btn-success btn-add-category" type="button"> <i class="fa fa-plus"></i> ${localizer.Add} </button>
            </div>
        </div>
        <div class="category-items"></div>
    </div>
</div>

`;

SEOTemplates["Service"] =`
<input type="hidden" name="Seo[Type]" id="SeoType" value="Service" />
<input type="hidden" name="Seo[data][provider][Type]" value="Organization" />
<input type="hidden" name="Seo[data][provider][logo][Type]" value="ImageObject" />
<input type="hidden" name="Seo[data][provider][logo][url]" value="@logoUrl@" />
<input type="hidden" name="Seo[data][provider][logo][Width]" value="125" />
<input type="hidden" name="Seo[data][provider][logo][Height]" value="125" />

${hiddenTemp}
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.service_name}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][name]" class="form-control"  value="@Title@"/>
    </div>
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.service_description}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <textarea name="Seo[data][Description]" rows="3" class="form-control" >@Description@</textarea>
    </div> 
</div>
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.service_provider}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" class="form-control" name="Seo[data][provider][name]" value=""  />
    </div>
</div>
`;


//- ------------------------------------------

const Ingredient_Instructions_item = `
<div class="input-Ingredient">
<input type="text" class="form-control" id="" name="Seo[data][##][]" value="$$">
<button class="btn btn-danger remove-input-item" type="button" data-type="##"><i class="fa fa-times"></i></button>
</div>
`;

 

SEOTemplates["Recipe"] =`
<input type="hidden" name=Seo[Type]  id="SeoType" value="Recipe" />
    ${hiddenTemp}
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.recipe_name}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][name]" class="form-control"  value="@Title@"/>
    </div>
</div>
    
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.recipe_keywords}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
    <input name="Seo[data][Keywords]"  class="form-control" /> 
    </div>
</div> 

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 "> ${localizer.author}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" class="form-control" name="Seo[data][author][name]" value="@author@" />
    </div>
</div>

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.recipe_description}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <textarea name="Seo[data][Description]" rows="3" class="form-control">@Description@</textarea>
    </div>
</div> 

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.recipe_category}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][recipeCategory]" class="form-control" />
    </div>
</div>
 
<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.recipe_cuisine}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="text" name="Seo[data][recipeCuisine]" class="form-control" />
    </div>
</div>

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.cook_time}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="number" name="Seo[data][cookTime]" class="form-control" placeholder="${localizer.time_in_minutes}"  />
    </div>
</div>

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.prep_time}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="number" name="Seo[data][prepTime]" class="form-control" placeholder="${localizer.time_in_minutes}"  />
    </div>
</div>

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.total_time}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="number" name="Seo[data][totalTime]" class="form-control" placeholder="${localizer.time_in_minutes}" />
    </div>
</div>

<div class="form-group">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.number_of_servings}</label>
    <div class="col-md-7 col-sm-9 col-xs-12">
        <input type="number" name="Seo[data][recipeYield]" class="form-control" />
    </div>
</div>
<hr />
<div class="form-group ">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.recipe_ingredient}</label>
    <div class="col-md-7 col-sm-9 col-xs-12 recipeIngredient">
        <div class="input-group mb-3 add-ingredient">
            <input type="text" class="form-control" id="input-recipeIngredient" placeholder="${localizer.add_ingredient}">
            <div class="input-group-addon">
                <button class="btn btn-success btn-add-ingredient" type="button"> <i class="fa fa-plus"></i> ${localizer.Add} </button>
            </div>
        </div>
        <div class="recipeIngredient-items"></div>
    </div>
</div>
<hr />
<div class="form-group ">
    <label for="" class="control-label col-md-3 col-sm-3 col-xs-12 ">${localizer.recipe_instructions}</label>
    <div class="col-md-7 col-sm-9 col-xs-12 recipeInstructions">
        <div class="input-group mb-3 add-Instructions">
            <input type="text" class="form-control" id="input-recipeInstructions" placeholder="${localizer.add_instructions}">
            <div class="input-group-addon">
                <button class="btn btn-success btn-add-Instructions" type="button"> <i class="fa fa-plus"></i> ${localizer.Add} </button>
            </div>
        </div>
        <div class="recipeInstructions-items"></div>
    </div>
</div>`;


//-------------------------------------------------------------------
// #1  select seo type
// #2  Ingredient - Instructions 
//-------------------------------------------------------------------




// #1  select seo type


 var d = new Date();
 let day = d.getDate();
 let year = d.getFullYear();
 let month = ("0" + (d.getMonth() + 1)).slice(-2);


const Seo_Defaults = {
    Name : " ",
    image: " ",
    DatePublished :`${year}-${month}-${day}`,
    DateModified:`${year}-${month}-${day}`,
};

 
var Seo_data;
var Seo_types; 
$(document).ready(function(){ 
   

      Seo_data ={
        Name : $(document).find('[data-seo-name]').val() || "",
        Image : $(document).find('[data-seo-image]').data('seo-image') || "" ,
        DatePublished : $(document).find('[data-seo-published]').val()|| "" ,
        DateModified : $(document).find('[data-seo-modified]').val()|| "" ,
        logo : $('#rootLogo').attr("href")  || "" ,
        description :  $(document).find('[data-seo-description]').val()  || "",
        author : $(document).find('[data-seo-author]').val()  || "",
    }
    
    $(document).on("change" , "[data-seo-description] , [data-seo-author] , [data-seo-name]" ,()=>   JsonSerialize() )
    
     if(Seo_data.Image){
         $(document).find('[name="Seo[data][Image]"]').val(Seo_data.Image)
     }
  
    try{
        Seo_types = JSON.parse($(document).find('[data-seo-types]').val())
    }catch(e){}
      

    $(document).on('change','#SeoTypes',function(){
        let $this = $(this);
        if($this.val() =="null"){
            $('#Seofields').html(null);
            JsonSerialize();
        }
        else{ 
            let template = SEOTemplates[Seo_types[$this.val()]];
            var data = $.extend({}, Seo_Defaults ,Seo_data);
                
            let html = template.replace("@Name@",data.Name)
                    .replace("@Image@",data.Image)
                    .replace("@DatePublished@",data.DatePublished)
                    .replace("@DateModified@",data.DateModified)
                    .replace("@logoUrl@",data.logo)
                    .replace("@Title@",data.Name)
                    .replace("@author@",data.author)
                    .replace("@Description@",StripTags(data.description));
                    console.log(data)
            $('#Seofields').html(html);
            JsonSerialize();
        }
    })


})

/* 
 Seo_types

*/


 const StripTags =(html)=>{
    return html.replace(/<\/?[^>]+(>|$)/g, "");
 }





const ConvertToISO8601  = (stime)=>{
    let time = parseInt(stime);
    if(isNaN(time))
        return "";

    let str = "PT"
    if(time >  60){
        str += `${Math.round( time / 60 )}H`;
        if((time % 60)  > 0 ){
            str += `${time % 60}M`;
        }
    }
    if(time < 60){
        str += `${time % 60}M`;
    }
    return str;
}
//----------------
const JsonSerialize =()=>{
 
    let json = $('#Seofields').serializeJSON();
         
    if(json.hasOwnProperty('Seo')){
 
    let Seo  = json.Seo;
      
    let SeoMarkup = {
        "@context" : "http://schema.org",
        "@type": Seo.Type,
        "datePublished" : Seo.data.DatePublished,
        "dateModified" : Seo.data.DateModified,
        "name" :Seo.data.name,
        "description" :Seo.data.Description,
        "image" : Seo.data.Image
    };

    if(Seo.Type == 'Article'){ 
         
        SeoMarkup.headline = Seo.data.HeadLine;
        SeoMarkup.author =  {
            "@type":  Seo.data.author.Type || "person" ,
            "name": Seo.data.author.name || ""
        };
        SeoMarkup.publisher =  {
            "@type":  Seo.data.publisher.Type,
            "name": Seo.data.publisher.name,
            "logo" :{
                "@type":  Seo.data.publisher.logo.Type,
                "height" : Seo.data.publisher.logo.Height,
                "Width" : Seo.data.publisher.logo.Width,
                "url" : Seo.data.publisher.logo.url
            }
        };

   
    }
   
    if(Seo.Type == 'Recipe'){
        SeoMarkup.cookTime = ConvertToISO8601(Seo.data.cookTime);
        SeoMarkup.prepTime = ConvertToISO8601(Seo.data.prepTime);
        SeoMarkup.recipeCategory = Seo.data.recipeCategory;
        SeoMarkup.recipeYield = Seo.data.recipeYield;
        SeoMarkup.totalTime = ConvertToISO8601(Seo.data.totalTime);

        SeoMarkup.author =  {
                "@type":  Seo.data.author.Type || "person" ,
                "name": Seo.data.author.name || "" 
        };

        if(Seo.data.recipeIngredient && Seo.data.recipeIngredient.length > 0){
            SeoMarkup.recipeIngredient =  Seo.data.recipeIngredient;
        }

        if(Seo.data.recipeInstructions && Seo.data.recipeInstructions.length > 0){
            SeoMarkup.recipeInstructions =  Seo.data.recipeInstructions;
        }
    }

    if(Seo.Type == 'Product'){
         
         if(Seo.data.category && Seo.data.category.length > 0){
            SeoMarkup.category =  Seo.data.category;
        }

    }

    if(Seo.Type == 'ImageGallery'){
        SeoMarkup.author =  {
            "@type":  Seo.data.author.Type || "person" ,
            "name": Seo.data.author.name || ""
        };
    }

    if(Seo.Type == 'Service'){
        SeoMarkup.provider =  {
            "@type":  Seo.data.provider.Type,
            "name": Seo.data.provider.name,
            "logo" :{
                "@type":  Seo.data.provider.logo.Type,
                "height" : Seo.data.provider.logo.Height,
                "Width" : Seo.data.provider.logo.Width,
                "url" : Seo.data.provider.logo.url
            }
        };
    }

    let seotext = JSON.stringify(SeoMarkup, undefined, 4);
    $('#SEOField').val(seotext);
     
    

    $('#SEOMarkup').val(JSON.stringify({
        type : Seo.Type,
        data : SeoMarkup
    }, undefined, 4)); 

    $("#SEOField").css("height" , "1px")
    $("#SEOField").css("height" ,(25+$("#SEOField")[0].scrollHeight)+"px" )
    
    } else{
        $('#SEOField').val(null).height("100px");
        $('#SEOMarkup').val(null);
    }
}
//----------------
  


const AppendInput = ($traget,Type )=>{    
    let input = $(`#input-${Type}`);
    let html = Ingredient_Instructions_item.replace(/##/g , Type).replace( "$$" , input.val() );
    let length = $traget.find('input').length;
    $traget.append(html) ;
    input.val(null);
}

  

//# Ingredient  - Instructions

$(document).on('click','.btn-add-ingredient',()=> { 
    AppendInput( $('.recipeIngredient-items') , 'recipeIngredient'  ) ;
    JsonSerialize();
});

$(document).on('click','.btn-add-Instructions',()=> {
    AppendInput( $('.recipeInstructions-items') , 'recipeInstructions'  );
    JsonSerialize();
});

$(document).on('click','.btn-add-category',()=> {
    AppendInput( $('.category-items') , 'category'  );
    JsonSerialize();
});
 
$(document).on('click','.remove-input-item', function(){ 
    $(this).parent().remove();
    JsonSerialize();
});




$('#JsonIsEditable').on('change',function(){
    let $this = $(this);
    console.log($this.data("alert-msg"))
    if($this.is(':checked')){
        $Confirm({
            title: $this.data("alert-title") || 'Are you sure?',
            text:  $this.data("alert-msg") || "i hope you know what you're doing",
            type: 'warning',
            showCancelButton: true, 
            focusConfirm :false 
        },function (result) {
            if (result.value) {
                    $('#SEOField').removeAttr('disabled');
            }else{
                $this.prop('checked',false)
            }
        })

    }else{
        $('#SEOField').attr('disabled','disabled');
    } 
    
})

$(document).on('change',"[name^='Seo['] ",()=> JsonSerialize() )
 
$('#SEOField').on('change',function(){
    let value = $(this).val();
    let isValid = $(this).valid();
    if(isValid){
        let obj = JSON.parse(value);
        if(obj.hasOwnProperty("@type")){
            $('#SEOMarkup').val(JSON.stringify({
                type : obj["@type"],
                data : obj
            }, undefined, 4)); 
        } 
    }    
});