var errorTitle = window.localization.error ;
$(document).ready(()=>{
    
   

    $(document).on("click",".delete-service",function(event){
        event.preventDefault();
        var $this = $(this);
        var dataurl = $this.data('url');
        var id = $this.data('id');
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