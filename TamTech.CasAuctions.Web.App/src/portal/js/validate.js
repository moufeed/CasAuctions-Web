

$('#ContactForm').validate(
    {
          errorClass: "invalid_field",
          validClass: "valid_field",
        rules: {
            Name: {
                required: true,
                minlength: 2
            },
            Mobile:{
                required: function(element) {
                    return $("#cemail").val().length == 0;  
                },
                number :true,
                minlength: 10
            },
            Email:{
                required:  function(element) {
                    return $("#cphone").val().length == 0;  
                }, 
                email: true
            },
            Message: {
                required: true, 
                minlength: 4
            },
        },
        messages: {
            Mobile: "Enter your phone number or fill an email field",
            Email: "Enter your email or fill a phone field",
        },
        submitHandler: function (form) {
                 
            var $form = $(form);
                $form.find('.lds-spinner').removeClass('d-none');
                $form.find('.btn-send').attr('disabled' ,"disabled");
                $form.valid()
                var url = $form.attr('action');
                var message ={};
                data = $form.serializeArray();
                $.each(data,function(key,val){
                    message[val.name] = val.value;
                })
                
                $.ajax({  
                    type: 'POST',
                    url: url,
                    data: message,  
                })
                .done(function (data) { 
                        if(data.success){
                            $form[0].reset();
                            $form.find('.lds-spinner').addClass('d-none');
                            $form.find('.btn-send').removeAttr('disabled' );
                            $('#ContactModel').modal('show');
                            $('#ContactModel').on('shown.bs.modal', function (e) {
                                var modal = $(this);
                                    modal.find('.customer_name').text(message['Name']);
                              })
                        }
                })
                .fail(function (jqXHR, Status) {
                        console.log(jqXHR, Status);
                        $form.find('.lds-spinner').addClass('d-none');
                        $form.find('.btn-send').removeAttr('disabled' );
                });

                return false;
        },
    }
);

    $('#phone').on('change', function(evt){
        $('#cemail').valid();
    })

    $('#email').on('change', function(evt){
        $('#cphone').valid();
    })


    
    
    