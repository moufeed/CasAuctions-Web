
var default_page_Localization ={
    "t_unpublish" :"unpublish",
    "t_unpublished" :"unpublished",
    "unpublished_successfully" :"unpublished successfully",
    "t_publish" :"publish",
    "t_published" :"published",
    "published_successfully" :"published successfully"
}

var _localizer = $.extend({}, default_page_Localization ,window.pageLocalization || {});
 


$(document).on("click",".remove_page",function(){
    let $this = $(this);
    let ajax_url = $this.data('url');
    $Confirm({},function(result){
        if (result.value) {
            $.ajax(ajaxrequest = {
                url: ajax_url,
                    type: 'GET',
                    cache: false,
                    data: {}
                })
                .done(function (response) {
                    if(response.success){
                        $notification.success(window.localization.deleted ,window.localization.item_deleted , 2000, "fa fa-check");
                        $this.parents('tr')[0].remove();
                    }else{
                        var errors = data.errors;
                        if (errors.length > 0) {
                            txt = MakeErrorsMsg(errors);
                            $notification.error("", txt , 3500, "fa fa-exclamation-circle");
                        }
                    }
                })
                .fail(function (jqXHR, Status) {
                    $notification.error(window.localization.error , jqXHR.statusText, 2000, "fa fa-exclamation-circle")
                });

        }
    })
})