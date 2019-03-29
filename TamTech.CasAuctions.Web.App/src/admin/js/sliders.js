var errorTitle = window.localization.error ||  "Error!";
$(document).ready(() => {


    $(document).on("click", ".delete__slider", function (event) {
        event.preventDefault();
        var $this = $(this),
            target = $this.data('target'),
            dataurl = $this.data('url');


            $Confirm({},function(result){
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


 



});//

$(document).on("click", ".toggle_publish_slider_item", function (event) {
    event.preventDefault();
    var $this = $(this),
        className =$this.find('.fa').attr("class")
        dataurl = $this.data('url'),
        unpublish = $this.data('unpublish') || "unpublish",
        publish = $this.data('publish') || "publish";

    $this.find('.fa').removeClass().addClass("fa fa-spinner fa-pulse");

    $.ajax({
            url: dataurl,
            type: 'GET',
            dataType: "json",
            data: {} 
        })
        .done(function (data) {
            if (data.success) {
                
                if($this.hasClass("unpublished")){
                    $this.attr("title", unpublish);
                    $this.toggleClass("unpublished published");
                    $this.find('.fa').removeClass().addClass("fa fa-eye-slash");
                    $this.find(".text").text(unpublish)
                }else{
                    $this.attr("title", publish);
                    $this.toggleClass("published unpublished ");
                    $this.find('.fa').removeClass().addClass("fa fa-eye");
                    $this.find(".text").text(publish)
                }


            } else {
                var errors = data.errors;
                            if (errors.length > 0) {
                                txt = MakeErrorsMsg(errors);
                                $notification.error("", txt , 3500, "fa fa-exclamation-circle");
                            }
                            $this.find('.fa').removeClass().addClass(className);
                            

            }
        })
        .fail(function (jqXHR, Status) {
            $notification.error(errorTitle, jqXHR.statusText, 2000, "fa fa-exclamation-circle");
        });
})
  