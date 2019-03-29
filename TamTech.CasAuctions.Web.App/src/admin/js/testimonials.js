
 


$(".delete-testimonial").on("click", function (event) {
    event.preventDefault();
    let $this = $(this),
        target = $this.data('id'),
        link = $this.data('url');

    $Confirm({}, function (result) {
        if (result.value) {

            fetch(link,{headers :{"Content-Type" : "application/json;charset=utf-8"}})
            .then(res=>res.json())
            .then(response =>{
                 if (response.success){
                    $this.parents(`tr#tr-${target}`).remove();
                 }else{

                 }
            })
            .catch(error => $notification.error("", error.message, 2000, "fa fa-exclamation-circle"))
            
        }
    })

})
