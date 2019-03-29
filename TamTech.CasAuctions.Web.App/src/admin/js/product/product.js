var default_product_Localization ={
    "f_type" :  "Type :",
    "f_name" :  "Name :",
    "save" :  "save",
    "delete" :  "delete",
    "option_value" :  "Option Value",
    "f_price" :  "Price",
    "add_option" :  "Add option",
    "option_value" :  "Option Value",
    "values" :  "Values",
    "edit" :  "Edit",
    "select" :"Select",
    "product_havent_attributes" :"This product does not have any attributes",
    "unpublished" :"unpublished",
    "published" :"published",
    "delete_combination" :"Delete Combination",
    "no_data_table" :"No data available in table",
    "f_title" :"Title :",
    "f_description" :"Description :",
}


var _localizer = $.extend({}, default_product_Localization ,window.productLocalization || {});

window.substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};


function autocomplete(itm) {
    $(itm).typeahead(t_settings, {
        name: 'Key-' + window.product.idx,
        limit: 10,
        source: substringMatcher(hints)
    });
}



var t_settings = {
    hint: false,
    highlight: true,
    classNames: {
        menu: "dropdown-menu suggestion-list",
        suggestion: "suggestion-item"
    }
}

const $showErorr = (errors)=>{
    
    if (errors.length > 0) {
        txt = MakeErrorsMsg(errors);
        $notification.error("", txt , 3500, "fa fa-exclamation-circle");
    }
}

const $fail  = (jqXHR, Status)=>{
    $notification.error(window.localization.success.error, jqXHR.statusText  , 2000, "fa fa-exclamation-circle")
}


$(document).ready(function () {
    //-----------------------------------------------------------------
    //--- LoadHints ------------------------------------------
    //-----------------------------------------------------------------

    $.getJSON(window.productlinks.LoadHints, function (response) {
        hints = response.data;
        autocomplete('.typeahead');
    })

    
    //-----------------------------------------------------------------
    //--- Shipping  ------------------------------------------
    //-----------------------------------------------------------------
    $('#Shipping').on('change', function () {

        if ($(this).is(":checked")) {
            $('#IsFreeShipping').prop('disabled', false);
            $('.shipping_inputs input').each((indx, itm) => $(itm).prop('disabled', false));
        } else {
            $('#IsFreeShipping').prop('disabled', true).prop('checked', false);
            $('.shipping_inputs input').each((indx, itm) => $(itm).prop('disabled', true).val(0));
        }

    })
    //-----------------------------------------------------------------
    //--- select picker  ------------------------------------------
    //-----------------------------------------------------------------

   
 

$('#publish_product').on('change',function(e){
    var $this = $(this);
    var Published = $this.data("published-text") || "Published successfully";
    var Unpublished = $this.data("unpublished-text") || "Unpublished successfully";

    console.log( window.productlinks.publishProduct)
    $.get( window.productlinks.publishProduct )
    .done(function (res){
        if(res.success){
            if($this.is(":checked")){
                $notification.success("", Published, 2000, "fa fa-check");
            }else{
                $notification.warning("", Unpublished , 2000, "fa fa-check");
            }
        }
    })
    fail(  (jqXHR, Status)  => $fail(jqXHR, Status) )
});



    $(document).on('click','.delete-product' ,function(e){
        e.preventDefault();
        var $this = $(this);
        var dataUrl = $this.data("url");
        var backurl = $this.data("backurl");
        $Confirm({},function(result){
            if (result.value) {
                $.ajax({
                    url: dataUrl ,
                    type: 'Get',
                    dataType: "json",  
                    data: {
                        redirection : true
                    }
                })
                .done((data)=>{
                    if(data.success){
                        $notification.success("", window.localization.deleted_successfully , 2000, "fa fa-check");
                        window.location.assign(backurl || window.location.origin + '/Admin/products');
                    }else{
                        $showErorr(data.errors)
                    }   
                 }
            ) .fail(  (jqXHR, Status)  => $fail(jqXHR, Status))
               
            }

        })

       
    })

}) // end document ready fn