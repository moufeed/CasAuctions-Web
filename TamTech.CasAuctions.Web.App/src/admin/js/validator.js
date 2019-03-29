 
 
$.validator.addMethod('lessThan', function(value, element, param) {
    return this.optional(element) || parseInt(value) <= parseInt($(param[0]).val());
},$.validator.messages.lessThan);

$.validator.addMethod('greaterThan', function(value, element, param) {
    return this.optional(element) || parseInt(value) >= parseInt($(param[0]).val());
}, $.validator.messages.greaterThan);

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },$.validator.messages.regex );

$.validator.addMethod(
    "slug",
    function(value, element ) {
        var re = new RegExp('^([A-Za-z0-9\u0621-\u064A0-9])+(?:[-|_]|[A-Za-z0-9\u0621-\u064A0-9])+([A-Za-z0-9\u0621-\u064A0-9])$');
        return this.optional(element) || re.test(value);
    },$.validator.messages.slug);


$.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= (param * 1024))
}, $.validator.messages.filesize );


 



$.validator.addMethod(
    "json",
    function(value, element ) {
        try{
            JSON.parse(value);
        }
        catch (e) {
            return this.optional(element) || false;
         }
         return this.optional(element) || true ;
    },$.validator.messages.json);

$.validator.addMethod(
    "schemaType",
    function(value, element ) {
        try{
            let obj = JSON.parse(value);
            if(obj.hasOwnProperty("@type"))
                return this.optional(element) || true ;
            else
                return this.optional(element) || false
        }catch(e){
            return this.optional(element) || false
        }
         
    },$.validator.messages.json);




$("#CreateUserForm").validate({
    errorClass: "invalid_field",
    validClass: "valid_field",
    rules: {
        Username: {
            required: true,
            minlength: 4
        },
        Password: {
            required: true,
            minlength: 4
        },
        ConfirmPasswoord: {
            equalTo: "#Password"
        },
        Phone:{
            required: true,
            number :true,
            minlength: 10
        }
    }
});
var submitted = false

var alertTemplate =
'<div class="alert alert-danger alert-dismissible alert-summary" role="alert" >'+
'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'<div class="summary">@@</div>'+
'</div>';


var Productvalidator = $(" #ProductForm ").validate({
    errorClass: "invalid_field",
    validClass: "valid_field",
    ignore: ".ignore",
    rules: { 
            "DiscountPrice" :{
                lessThan: ["#Price" ,"Price"],
            },
            "Price" :{
                greaterThan: ["#DiscountPrice" ,"Discount Price"],
            }
    },
    showErrors: function(errorMap, errorList) {
        if (submitted) {
            var summary = "You have the following errors: <br>";
            $.each(errorList, function() { 
                summary += " * "+this.element.name + " : " + this.message + "<br>"; 
            });
            var temp = alertTemplate.replace(/@@/g, summary);
            if($('.forn-new').find('.alert-summary').length > 0 ){
                    $('.alert-summary').remove();
            } 
                $(temp).insertAfter('.page-title');
                
            submitted = false;
        }
        this.defaultShowErrors();
    },          
    invalidHandler: function(form, validator) {
        submitted = true;
    }
});
$("#Price").on('keyup',function(){
    Productvalidator.element( "#DiscountPrice" );
})
$("#DiscountPrice").on('keyup',function(){
    Productvalidator.element( "#Price" );
})

$('#BrandForm ,#CategoriesForm ,#ListPageForm ,#EmailForm ,#CreateUserForm ,#GalleryItemForm ').validate({
    errorClass: "invalid_field",
    validClass: "valid_field",
    ignore: ".ignore",
   
});     
 

 
//THIS VALIDATION WAS MERGED INTO THE HTML SCRIPT :
// by adding :data-rule-slug="true"

//$('#MenuForm').validate({
//    errorClass: "invalid_field",
//    validClass: "valid_field",
//    ignore: ".ignore",
//    rules: { 
//        "Key" :{
//            slug :true 
//        },
         
//},
//});

//THIS VALIDATION WAS MERGED INTO THE HTML SCRIPT :
// by adding : data-rule-slug="true"

//$('#SlidersForm').validate({
//    errorClass: "invalid_field",
//    validClass: "valid_field",
//    ignore: ".ignore",
//    rules: {
//        "Key": {
//            slug: true
//        },

//    },
//});
 


$('#CreatePageForm,#EditPageForm ,#ServicesForm , #PostForm ').validate({
    errorClass: "invalid_field",
    validClass: "valid_field",
    ignore: ".ignore",
    rules: { 
        "Title" :{
            required :true
        },
        "Slug" :{
            slug :true ,
            minlength: 3
        }, 
        "SEOField" :{
            json :true ,
            schemaType : true
        },
},
});
