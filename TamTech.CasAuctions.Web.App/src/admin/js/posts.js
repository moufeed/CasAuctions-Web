var errorTitle = window.localization.error ;
$(document).ready(()=>{
    
   

    $(document).on("click",".delete-post",function(event){
        event.preventDefault();
        var $this = $(this);
        var dataurl = $this.data('url');
        var id = $this.data('id')
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
                        $notification.success("",window.localization.deleted_successfully , 2000, "fa fa-check");
                        $this.parents('tr[id="tr-'+id+'"]').remove();
                   
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
 
 
});

  
$(document).ready(()=>{
     $("#CreateSection").validate({
           errorClass: "invalid_field",
               validClass: "valid_field",
               ignore: ".ignore",
         submitHandler: function (form) {

             let request = async_fetch($(form).attr("action"), $(form).serialize(), {
                 "Content-Type": 'application/x-www-form-urlencoded',
             })

             request.then(res => {
                 if (res.success) {
                     if ($('#errors').length) $('#errors').remove();
                     if (res.sections && res.sections.length > 0) {
                         let options = "";
                         $.each(res.sections, (ind, item) => options += "<option value='" + item.value + "'>" + item.text + "</option>")
                         $("#SectionId").html(options);
                         document.getElementById("CreateSection").reset();
                         $('#sectionModal').modal('hide');
                         
                     } else {
                         window.location.reload();
                     }
                     
                 } else {
                     var txt = MakeErrorsMsg(res.errors);
                     $('#errors').show().find('.content').html(txt);
                 }
             })

             return false;
         }
     });
})




//
/**
 * 
            
    <script>
  

        


        $('[type="file"]').on('change',function(){
            ImgReader(this.files[0],function(img){
                if($('.img-thumbnail').length > 0 ){
                        $('.img-thumbnail').attr('src',img)
                }else{
                    $('<img src="'+img+'" style="max-width:300px" class="img-thumbnail m-b3">').insertBefore('.uploadfile');
                }
            })
        })

    </script>
 */