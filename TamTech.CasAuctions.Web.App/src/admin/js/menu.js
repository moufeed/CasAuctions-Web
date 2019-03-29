
var errorTitle = window.localization.error ||  "Error!";
$(document).ready(function(){

    $(document).on("click",".btn-submenu",function(){
            var col=   $($(this).parents("tr")[0]).next();
              $(col.find('div.collapse')).each(function(ix,el){
                $(el).collapse('hide');
              })
              $(col.find('div.collapse')[0]).collapse('toggle');
    })
 


    $('#MenuItemModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)  
        var isRoot = button.data('root');
        let $modal = $(this)
        var key = null; 
        if(!isRoot){
            key = $(button.closest(".submenu")).data('key');

            var level = key +"";
        console.log(level , MenuMaxLevels , $modal)
            if(level.split('_').length == (MenuMaxLevels - 1)){
                $modal.find('li[data-type="dropdown"]').addClass('hidden');   
            }else{
                $modal.find('li[data-type="dropdown"]').removeClass('hidden');   
            }

        } 
        var parentKey = $modal.find("input[name=\"parentKey\"]");
        parentKey.each(function(index, element)  {
            $(element).val(key)
        }); 
        })
 
       
    

}) 


//btn-link-pup


//------------------------------------------------------------------
//#region    toggle Publish   button 
//------------------------------------------------------------------

//------------------------------------------------------------------
//#endregion #8


//------------------------------------------------------------------
//#region   publish & unpublish  
//------------------------------------------------------------------

 


$(document).on('change', '.toggle_visibility', function (e) {
    let $this = $(this);
    let [root, key ,status] = [$this.data("root"), $this.attr("id"), $this.prop('checked')];

    $.ajax({
        url: publishUrl,
        type: 'GET',
        dataType: "json",
        data: {
            RootMenuId: root,
            key: key
        }
    })
    .done((response) => {
        if (!response.success) {
            if (response.errors.length > 0) {
                txt = MakeErrorsMsg(response.errors);
                $notification.error("", txt, 3500, "fa fa-exclamation-circle");
            }else{
                $notification.error(window.localization.error, window.localization.something_wrong, 3500, "fa fa-exclamation-circle");
            }
        }
 
    })
    .fail( (jqXHR, Status)=> {
        $notification.error(errorTitle, jqXHR.statusText, 2000, "fa fa-exclamation-circle");
    });

})

 

//------------------------------------------------------------------
//#endregion #9 
//------------------------------------------------------------------


$(document).on('click','.delete-menuitem' ,function(e){
    e.preventDefault();
    var $this = $(this);
    var dataurl = $this.data('url');
    var type = $this.data('type');
    $Confirm({},function(result){
        if (result.value) {
             
            
            $.ajax({
               url: dataurl ,
               type: 'Get',
               dataType: "json",  
               data: {}
           })
           .done(function(data){
               if(data.success){
                   $notification.success(window.localization.deleted || "",window.localization.deleted_successfully || "Deleted successfully", 2000, "fa fa-check");
                   
                   var itm = $this.parent().parent();
                   if(type == "dropdown"){
                       /**
                        * var key = itm.data('key');
                        $('.submenu[data-key="'+key+'"]').remove();
                        */
                       itm.next().remove();
                   }
                    itm.remove();
               }else{ 
                var errors = data.errors;
                if (errors.length > 0) {
                    txt = MakeErrorsMsg(errors);
                    $notification.error("", txt , 3500, "fa fa-exclamation-circle");
                }
               }
              
                  
            }
       ) .fail(function (jqXHR, Status) {
           $notification.error(errorTitle, jqXHR.statusText, 2000, "fa fa-exclamation-circle");
       })  
          
       }
    })
    
})

function toggle($input,$order,$this){
    $input.attr("disabled","disabled");
    $order.attr("disabled","disabled");
    $this.removeClass('btn-save editable').addClass('btn-edit').attr('data-original-title',"Edit");
    $this.find(".fa").removeClass().addClass('fa fa-edit');
}

var tmpVal;
var tempdata = [];  

$(".input-title , .url-control").on('keyup',function(){
     let $this = $(this);
        if($this.hasClass("invalid_field") && $this.val().length > 0){
            $this.removeClass("invalid_field")
        }
}) 


const SaveItem = ($this)=> {

    let $tr = $($this.parent().parent()),
    $input = $( $tr.find('.input-title')),
    $order = $( $tr.find('.order-control')),
    $target =  $($tr.find('.url-target')),
    type = $this.data('type');
     


    if( $input.val().length <= 0 ){

        $this.find(".fa").removeClass().addClass('fa fa-floppy-o');
         $input.addClass("invalid_field");
      
        return;
    }
    

      if(type == "url"  ){
       // let regx = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);
        let url = $tr.find('.url-control');
        if(url.val().length <= 0 ){
            $this.find(".fa").removeClass().addClass('fa fa-floppy-o');
            $tr.find('.url-control').addClass("invalid_field");
            return;
        }
 
    }
 
    var dataRequest =  { 
        RootMenuId : $this.data('root'),
        key : $this.data('key'),
        Title : $input.val(),
        DisplayOrder : $order.val()
    }
    if(type == "url"){
        dataRequest["UrlTarget"] =  $target.find('select').val() ;
        dataRequest["url"] =  $tr.find('.url-control').val() ;
    }
     
    
    $.ajax({
        url: edit_url,
        type: 'POST',
        dataType: "json",
        data: dataRequest
    })
    .done((data)=>{
        
        if(data.success){

            $notification.success("", window.localization.updateted_successfully ||  "updateted successfully", 2000, "fa fa-check");
            setTimeout(()=>{
                window.location.reload();
            },500)
            $tr.find(".btn-remove").removeClass("hidden");
             
            if(type == "url"){
                $target.find('select').addClass('hidden');
                $target.find('.badge').removeClass('hidden').text($target.find('select').val() );
                $target.next().attr('disabled','disabled');
            }
            
            /* toggle($input,$order,$this);
            $tr.find(".btn-cancel").addClass("hidden"); */

        }else{ 
            $this.find(".fa").removeClass().addClass('fa fa-floppy-o');
            let errors = data.errors;
            $input.val(tmpVal);
            
            if (errors.length > 0) {
                txt = MakeErrorsMsg(errors);
                $notification.error("", txt , 3500, "fa fa-exclamation-circle");
            }
        } 
        
           
     }
) .fail((jqXHR, Status)=>{
    toggle($input,$order,$this);
    $notification.error(errorTitle +  "  - "+jqXHR.status +"<br>", jqXHR.statusText, 2000, "fa fa-exclamation-circle");
})

}

const toggleEdit_menuitem = ($this)=>{

    let $tr = $($this.parent().parent()),
    $input = $( $tr.find('.input-title')),
    $order = $( $tr.find('.order-control')),
    $target =  $($tr.find('.url-target')),
    type = $this.data('type');

    if(type == "url"){
        $target.find('select').removeClass('hidden');
        $target.find('.badge').addClass('hidden');
        $target.next().removeAttr('disabled');
    }

    tmpVal = $input.val();
    $input.removeAttr("disabled");
    $order.removeAttr("disabled");
    $this.removeClass('btn-edit').addClass('btn-save editable').attr('data-original-title',window.localization.save);
    $this.find(".fa").removeClass().addClass('fa fa-floppy-o');
    $tr.find(".btn-remove").addClass("hidden");
    $tr.find(".btn-cancel").removeClass("hidden");
    
}

$(document).on('click',".edit-menuitem",function(event){
    var $this = $(this);
        $this.find('.fa').removeClass().addClass("fa fa-spinner fa-pulse");
        if($this.hasClass("editable"))
            SaveItem($this);
        else
            toggleEdit_menuitem($this);
})

$(document).on('click',".cancel-menuitem",function(event){
    var $this = $(this),
        $tr = $($this.parent().parent()),
        $input = $( $tr.find('.input-title')),
        $order = $( $tr.find('.order-control')),
        $target =  $($tr.find('.url-target')),
        $object = $this.data("object"),
        $edit = $($tr.find(".edit-menuitem"));
        $input.val($object.title);
        $order.val($object.displayOrder);
        if($object.itemType == "url"){
            $tr.find(".url-control").val($object.url);
            $target.find('select').addClass('hidden');
            $target.find('.badge').removeClass('hidden');
            $target.next().attr('disabled','disabled');
        }
    toggle($input,$order,$edit);
    
    $this.addClass("hidden");
    $tr.find(".btn-remove").removeClass("hidden");
 
})

$(document).on("click", ".delete__menu", function (event) {
    event.preventDefault();
    var $this = $(this),
        target = $this.data('target'),
        dataurl = $this.data('url');


    $Confirm({}, function (result) {
        if (result.value) {
            $.ajax({
                url: dataurl,
                type: 'Get',
                dataType: "json",
                data: {}
            })
                .done(function (data) {
                    if (data.success) {
                        $notification.success("", window.localization.deleted_successfully || "Deleted successfully", 2000, "fa fa-check");
                        $(target).remove();
                    } else {
                        var errors = data.errors;
                        if (errors.length > 0) {
                            txt = MakeErrorsMsg(errors);
                            $notification.error("", txt , 3500, "fa fa-exclamation-circle");
                        }
                    }
                }).fail(function (jqXHR, Status) {
                    $notification.error(errorTitle, jqXHR.statusText, 2000, "fa fa-exclamation-circle");
                })
        }
    });


})
 
//----------------------------------------------------------------

function getText($el,$target){
    $($target).val($($el).find("option:selected").text())
}
$('#page-Url').on('change',function(){
        getText(this,'#page-Title')
})
$('#Static-page-Url').on('change',function(){
         getText(this,'#staticpage-Title')
})
$('#servics-Url').on('change',function(){
        getText(this,'#service-Title')
})
$('#gallery-Url').on('change',function(){
        getText(this,'#gallery-Title')
})
$('#section-Url').on('change',function(){
    getText(this,'#section-Title')
})

$('#section_of_service-Url').on('change',function(){
    getText(this,'#section_of_service-Title')
})