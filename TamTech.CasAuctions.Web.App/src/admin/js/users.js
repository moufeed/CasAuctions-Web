 
function blocking(status,$this,unblock_url,block_url,userName){
    $.ajax({
        url: (status) ? unblock_url : block_url,
        type: 'POST',
        contentType: 'application/json',
        dataType: "json",
        cache: false,
        data: JSON.stringify({
            username: userName
        })
    })

    .done(function (data) {
        if (data.success) {
            $notification.success("success", "", 2000, "fa fa-check");
            if (status) {

                $('#UserStatus').removeClass('c-red')
                    .addClass('c-green')
                    .html(`<i class="fa fa-check"></i> Active `);

                $this.data('status', !status)
                    .removeClass('unblock')
                    .addClass('block')
                    .text('block User');
            } else {
                $('#UserStatus').removeClass('c-green')
                    .addClass('c-red')
                    .html(`<i class="fa fa-times-circle-o c-red"></i>  Blocked`);

                $this.data('status', !status)
                    .removeClass('block')
                    .addClass('unblock')
                    .text('Unblock User');
            }
        } else {
            if (status) {
                var text = "";
                $.each(data.messges, function (i, item) {

                    text += item + "\s\n";
                })
                $notification.error(window.localization.error , text, 2000, "fa fa-exclamation-circle")
            } else {
                var text = "\s\n";
                $.each(data.messages, function (i, item) {

                    text += item + "\s\n";

                })
                $notification.error(window.localization.error , text, 2000, "fa fa-exclamation-circle")
            }
        }
    })
    .fail(function (jqXHR, Status) {
        $notification.error(window.localization.error , jqXHR.statusText, 2000, "fa fa-exclamation-circle")
    });
}

 
$('.toggleblock').on('click', function () {
    var $this = $(this);
    var userId = $(this).data('id');
    var userName = $(this).data('username');
    var block_url = $(this).data('block-url');
    var unblock_url = $(this).data('unblock-url');
    var status = $(this).data('status');
    var confirm_title = $(this).data("confirm-title");
    var confirm_text = $(this).data("confirm-text");
    var confirm_yes = $(this).data("confirm-yes");

 

    if(!status){
        window.swalWithBootstrapButtons({
            title:confirm_title || 'Are you sure?',
            text: confirm_text || "Blocking this user will prevent them from logging in ",
            type: 'error',
            showCancelButton: true,
            confirmButtonText: confirm_yes || window.localization.confirm_yes ,
            focusConfirm :false
        }).then((result) => {
            if(result.value){
                blocking(status,$this,unblock_url,block_url,userName)
            }
        } );
    }else{
        blocking(status,$this,unblock_url,block_url,userName)
    }
})





$('.toggle_status').on("click",function(){
    let $this = $(this);
    let link = $this.data("url");
    let username = $this.data("user");
    let classList = $this[0].classList;

    if(classList.contains("block-user")){
        $Confirm({
            text: window.localization.block_user_from_logging_in,
            type: 'warning',
        }, result => {
            if(result.value) {
                let response = async_fetch(link, JSON.stringify({
                    username: username
                }));

               response.then(response => {
                   if (!response.success && response.errors.length > 0) {
                        txt = MakeErrorsMsg(response.errors);
                        $notification.error("", txt, 3500, "fa fa-exclamation-circle");
                   }

                   if (response.success) {
                        $this.addClass("hidden");
                        $this.parent().find(".unblock-user").removeClass("hidden")
                   }

               })
            }
        })
    }
    else if(classList.contains("unblock-user")){
             let response = async_fetch(link, JSON.stringify({
                 username: username
             }));

             response.then(response => {
                 if (!response.success && response.errors.length > 0) {
                     txt = MakeErrorsMsg(response.errors);
                     $notification.error("", txt, 3500, "fa fa-exclamation-circle");
                 }

                 if (response.success) {
                     $this.addClass("hidden");
                     $this.parent().find(".block-user").removeClass("hidden")
                 }
             })
    }

})

let alert = `
<div class="alert alert-danger alert-dismissible" style="border-radius:0" role="alert">
<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
<span class="content">@@</span>
</div>
`;
//-----------------------------------------------------

$('#EmailModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)  
    let recipient = button.data('email')
    let userName = button.data('name')
     
    let modal = $(this)
    modal.find('.mailto').text(recipient);
    modal.find('#Recipient').val(recipient);
    modal.find('#userName').val(userName);
 
})


$('#EmailModal').on('hidden.bs.modal', () => $('#NewEmail').trigger("reset") );
 
 $("#NewEmail").validate({
      errorClass: "invalid_field",
      validClass: "valid_field",
     submitHandler: (form)=>{
        let request = async_fetch($(form).attr("action"), $(form).serialize(), {
                "Content-Type": 'application/x-www-form-urlencoded' ,
            })
            request.then(response=> {
                 if (!response.success && response.errors.length > 0) {
                     txt = MakeErrorsMsg(response.errors);
                        if ($("#NewEmail").find(".alert").length > 0) {
                            $("#NewEmail").find(".alert .content").html(txt)
                        }else{
                            $(alert.replace(/@@/g, txt)).insertBefore('.modal-body')
                        } 
                 }
                 if (response.success) {
                    $('#NewEmail').trigger("reset");
                    $('#EmailModal').modal('hide');
                    $notification.success("", window.localization.email_sent, 2000, "fa fa-check");
                 }

            });
         return false;
     }
 });