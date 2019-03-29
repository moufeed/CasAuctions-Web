//------------------------------------------------------------------
/* 
#1 -    attribute template & option template [attrTemplate , optTemplate ]
#2 -    append attrubite template to dom 
#3 -    toggle atrribute status to update
#4 -    toggle attribute buttons and show error message [update ,insert, error]
#5 -    save attribute
#6 -    remove attribute
#7 -    add  new attribute value
#8 -    save attribute value
#9 -    update attribute value
#10 -   remove attribute value
#12 -
#13 -
*/
//------------------------------------------------------------------
 



$(document).ready(function () {


//------------------------------------------------------------------
//#region #1  attribute template & option template
//------------------------------------------------------------------
const attrTemplate =  `
<section id="attr_item-@@">
    <div class="clearfix inputitem">
        <div class="row attribute">
            <div class="col-md-4 col-sm-4 p-0">
                <div class="form-group clearfix">
                    <label for="Attribute-type-@@" class="control-label col-md-3 col-sm-12 col-xs-12 ">${_localizer.f_type}</label>
                    <div class="col-md-9 col-sm-12 col-xs-12 ">
                        <input type="text" name="Attributes[@@].type" id="Attribute-type-@@" class="form-control ignore"
                            disabled value="select" />
                        <span asp-validation-for="Attributes[@@].type" class="text-danger invalid_field"></span></div>
                </div>
            </div> 
            <div class="col-md-4 col-sm-4 p-0">
                <div class=" form-group clearfix">
                    <label for="Attribute-name-@@" class="control-label col-md-3 col-sm-12 col-xs-12 ">${_localizer.f_name}</label>
                    <div class="col-md-9 col-sm-12 col-xs-12 ">
                        <input type="text" name="Attributes[@@].Name" id="Attribute-name-@@" data-value="" class="form-control " />
                        <span asp-validation-for="Attributes[@@].Name" class="text-danger invalid_field"></span></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12 p-0">
                <div class="form-group clearfix text-right flip p-x-3">
                    <a class="btn btn-save-link save-attrbute" data-id="@@" data-new="true">
                        <i class="fa fa-check" aria-hidden="true"></i>${ _localizer.save}</a>
                    <a class="btn btn-remove-link remove-attrbute" data-new="true" data-id="@@">
                        <i class="fa fa-trash-o"></i> ${_localizer.delete }</a>
                </div>
            </div>
        </div>
        <div class="attr_values collapse" id="values-@@">
            <div class="options-box" id="options-@@">
                <div class="form-group m-y-2 " id="opt-@@-##">
                    <div class="clearfix">
                        <label for="Value-@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">${_localizer.option_value}</label>
                        <div class="col-md-3 col-xs-12 col-sm-8 m-y-2">
                            <input type="text" name="Attributes[@@][Values][##][Value]" class="form-control" id="Value-@@-##" /></div>
                        <label for="Price -@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">${_localizer.f_price}</label>
                        <div class="col-md-3 col-xs-12 col-sm-8 m-y-2">
                            <input type="number" name="Attributes[@@][Values][##][Price]" class="form-control" id="Price-@@-##"
                                min="0" />
                        </div>
                        <div class="col-md-2 col-xs-12">
                            <a class="btn btn-remove-link  pull-right flip-dir m-y-2 remove-option" data-id="opt-@@-##"><i
                                    class="fa fa-trash-o"></i>${_localizer.delete}</a>
                            <a class="btn btn-save-link save-option pull-right flip-dir m-y-2" data-id="opt-@@-##"
                                data-new="true">
                                <i class="fa fa-check" aria-hidden="true"></i>${_localizer.save}</a>
                        </div>
                    </div>
                    <hr class="line" />
                </div>
            </div>
            <div class="option-footer text-right flip">
                <a class="btn btn-addContent m-y-2 m-x-2 small" id="addOptions" data-attr="@@"><i class="fa fa-plus"></i>${_localizer.add_option}</a></div>
        </div>
    </div>   <hr class="m-t0 m-b5" />
</section>`;
    const optTemplate =
        `<div class="form-group m-y-2 " id="opt-@@-##">
        <div class=" clearfix">
            <label for="Value-@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">${_localizer.option_value}</label>
            <div class="col-md-3 col-xs-12 col-sm-8 m-y-2">
                <input type="text" name="Attributes[@@][Values][##][Value]" class="form-control ignore" id="Value-@@-##" /></div>
            <label for="Price-@@-##" class="control-label col-md-2  col-xs-12 col-sm-4 m-y-2">${_localizer.f_price}</label>
            <div class="col-md-3 col-xs-12 col-sm-8 m-y-2">
                <input type="number" name="Attributes[@@][Values][##][Price]" class="form-control ignore" id="Price-@@-##"
                    min="0" value="0" /></div>
            <div class="col-md-2 col-xs-12">
                <a class="btn btn-remove-link  pull-right flip-dir m-y-2 remove-option" data-new="true" data-id="opt-@@-##">
                    <i class="fa fa-trash-o"></i>${ _localizer.delete }</a>
                <a class="btn btn-save-link save-option pull-right flip-dir m-y-2" data-id="opt-@@-##" data-new="true">
                    <i class="fa fa-check" aria-hidden="true"></i>${_localizer.save}</a> </div>
        </div><hr class="line" />
    </div>`;
//------------------------------------------------------------------
//#endregion #1
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #2   append attrubite template to dom  
//------------------------------------------------------------------
$('#addAttrbutes').on('click', function (e) {
    e.preventDefault();
    let temp = attrTemplate.replace(/@@/g, window.product.attrIdx).replace(/##/g, 0);
    $('#a_wrapper').append(temp);
    window.product.attrIdx++;
});
//------------------------------------------------------------------
//#endregion #2
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #3 toggle atrribute status to update
//------------------------------------------------------------------
const inputTempValue={} ;
$(document).on('click','.update-attrbute', function (e) {
    e.preventDefault();
    $(this).hide();
    let id = $(this).data('id');
    let inputName = $(`#Attribute-name-${id}`);
    inputTempValue[id] = inputName.val();
    inputName.removeAttr('disabled');
    $(`.save-attrbute[data-id="${id}"]`).removeClass('hidden');
}); 
//------------------------------------------------------------------
//#endregion #3
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #4 toggle attribute buttons and show error message
//------------------------------------------------------------------
const $toggleUpdateSaveButtons = ($this ,inputName , id )=>{
    $this.addClass('hidden');
    $(`.update-attrbute[data-id="${id}"]`).show();
    inputName.attr('disabled','disabled').removeClass('valid_field');
}  

 //insert case
const $addUpdateButton = ($this ,inputName , id )=>{
     
    inputName.attr('disabled','disabled').attr("data-value",inputName.val()).removeClass('valid_field');
    $('.remove-attrbute[data-id="'+id+'"]').removeAttr('data-new');
    $this.removeAttr('data-new').addClass('hidden'); 


    $this.before(`<a class="btn  btn-link btn-values" role="button"  data-toggle="collapse" 
    href="#values-${id}" aria-expanded="false" aria-controls="values-${id}">
    <i class="fa fa-cubes" aria-hidden="true"></i>${_localizer.values}</a>`);


    $this.after(`<a class="btn btn-update-link update-attrbute" data-id="${id}"> 
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>${_localizer.edit}</a>`);

   $(`#values-${id}`).attr('data-attribute',inputName.val() );
}

 
//------------------------------------------------------------------
//#endregion #4
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #5 save attribute
//------------------------------------------------------------------
$(document).on('click','.save-attrbute',function (e) {
    e.preventDefault();
     
    let $this = $(this),
        isNew = $this[0].hasAttribute("data-new"),
        id = $this.data('id'),
        inputName = $('#Attribute-name-'+id);
    
    if(isNew){
      
        if(inputName.val().length > 0 ){
            let att_data = {
                name : inputName.val(),
                type : $('#Attribute-type-'+id).val(),
                productid : window.product.pid
            };
            $.ajax({
                url:  window.productlinks.createAttributes,
                    type: 'POST',
                    dataType: "json",
                    data: att_data ,
                    beforeSend:()=> $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse ') ,
                    complete: ()=> $this.find('i').removeClass().addClass('fa fa-check') 
                }) 
                .done((data)=> { 
                    if(data.success){
                        $addUpdateButton($this ,inputName , id );
                        $notification.success(window.localization.success, "", 2000, "fa fa-check");
                    }
                    else{
                        $showErorr(data.errors);
                    }
                })
                .fail((jqXHR, Status)=> $fail(jqXHR, Status) );
        }else{
            inputName.addClass('invalid_field').removeClass('valid_field') ;
            inputName.on('change', ()=>  inputName.removeClass('invalid_field') ); 
        }
    
    }else{
        
        if(inputName.val() != inputTempValue[id]){
            const attdata = {
                originalName : inputTempValue[id] ,
                name : inputName.val(),
                type : $('#Attribute-type-'+id).val(),
                productid : window.product.pid
            }; 
            $.ajax({
                url: window.productlinks.editAttributes ,
                    type: 'POST',
                    dataType: "json",
                    data: attdata ,
                    beforeSend:()=> $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse '),
                    complete: ()=> $this.find('i').removeClass().addClass('fa fa-check')
                }) 
                .done( (data)=> { 
                    if(data.success){
                         
                        $notification.success(window.localization.success, "", 2000, "fa fa-check");
                        $toggleUpdateSaveButtons($this ,inputName , id );
                        $refreshCombinationsTable(data.result);
                    }
                    else{
                        inputName.val(inputTempValue[id])
                        $showErorr(data.errors);
                    }
                })
                
                .fail( (jqXHR, Status)=> {
                    $fail(jqXHR, Status)
                    inputName.val(inputTempValue[id]);
                });
        }else{
            $this.find('i').removeClass().addClass('fa fa-check');
            $toggleUpdateSaveButtons($this ,inputName , id );
        }  
        
    }
}); 

//------------------------------------------------------------------
//#endregion #5
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #6 remove attributes
//------------------------------------------------------------------
const removeAttribute=($this)=>{
    if (window.product.attrIdx >= 0) {
        var id = $this.data('id');
        $('#attr_item-' + id).remove();
    }
}

const deleteattribute = ($this)=> {

   
     $.ajax({
        url: window.productlinks.deleteattribute,
        type: 'Get',
        dataType: "json",
        data: {
            productid : window.product.pid,
            name : $this.parents('.attribute').find('input[id^="Attribute-name"]').data("value") 
        }
    })
    .done((data)=>{
        if(data.success){
            $notification.success(window.localization.success, "", 2000, "fa fa-check");
            removeAttribute($this);
        }else{
            $showErorr(data.errors);
        }
    })

    .fail((jqXHR, Status)=> $fail(jqXHR, Status) );

}


$(document).on('click', '.remove-attrbute', function (e) {
    e.preventDefault();
    let $this = $(this),
    isNew =  $this[0].hasAttribute("data-new");

    if(isNew)
        removeAttribute($this);
    else
        $Confirm({},(result)=> (result.value) ? deleteattribute($this) : false ); 
    
})

//------------------------------------------------------------------
//#endregion #6
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #7  `add  new attribute value`
//------------------------------------------------------------------
$(document).on('click', '#addOptions', function (e) {
    e.preventDefault();
    let id = $(this).data('attr');
    let count = $(`#options-${id}`).children('[id^="opt-"]').length;
    
    let temp = optTemplate.replace(/@@/g, id).replace(/##/g, count);
    $(`#options-${id}`).append(temp);

});

//------------------------------------------------------------------
//#endregion #7
//------------------------------------------------------------------
/* 
'<a class="btn btn-remove-link  pull-right m-y-2 remove-option" data-id="'+id+'">'+
        '<i class="fa fa-trash-o"></i> Delete </a>'+
*/

//------------------------------------------------------------------
//#region #8 save attribute value
//------------------------------------------------------------------
 
    const $toggleSaveUpdateOption=($this , opt , id)=>  {

        $(`.Update-option[data-id="${id}"]`).show(); 

        $this.addClass('hidden');

        opt.find('input').attr('disabled','disabled');
    }

    const $addUpdateOptionBtn = ($this , opt , id) => {
        $this.removeAttr('data-new')
              .addClass('hidden');

        $this.siblings()
             .removeAttr('data-new');

    let temp = `<a class="btn btn-update-link Update-option pull-right flip  m-y-2" data-id="${id}">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>${_localizer.edit}</a>`;
        
        $this.after(temp);
         opt.find('input')
            .removeClass('valid_field')
            .attr('disabled','disabled');
    }
    


    const addNewOptionValue = ( $this , opt , atrrname , id )=>{
        if(opt.find('input')[0].value.length >  0 ){
           
            $.ajax({
                url: window.productlinks.createAttrValue,
                    type: 'POST',
                    dataType: "json",  
                    data: {
                        productid : window.product.pid,
                        value : opt.find('input')[0].value,
                        price :opt.find('input')[1].value,
                        attributename : atrrname
                    }  ,
                    beforeSend: () => $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse '),
                    complete: ()=>    $this.find('i').removeClass().addClass('fa fa-check') 
                }) 
                .done(function (data) { 
                    if(data.success){
                        $addUpdateOptionBtn($this , opt , id);
                        $notification.success(window.localization.success, "", 2000, "fa fa-check");
                    }else{
                        $showErorr(data.errors);
                    }
                 
                })
                .fail((jqXHR, Status)=> $fail(jqXHR, Status) );
                 
        }else{

           $( opt.find('input')[0])
            .addClass('invalid_field')
            .removeClass('valid_field')
            .on('change',function(){
                 $(this).removeClass('invalid_field');
            });
           
        }
        delete inputOptionTemp[id];
    }

    $(document).on('click', '.save-option',function (e) {
        e.preventDefault();
        let $this = $(this),
            id =  $this.data('id'),
            opt = $( $this.parents('.form-group')[0]),
            isNew =  $this[0].hasAttribute("data-new"),
            atrrname =  $this.parents('.inputitem').find('input[id^="Attribute-name-"]').val();
            
        if(isNew)
            addNewOptionValue($this,opt,atrrname,id);
        else
            updateOptionValue($this,opt,atrrname,id);
        
    }); 

//------------------------------------------------------------------
//#endregion #8
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #9 update attribute value
//------------------------------------------------------------------
var inputOptionTemp ={}; 
// update option 
$(document).on('click','.Update-option',function (e) {
    e.preventDefault();
    let id = $(this).data('id');
    let opt = $($(this).parents('.form-group')[0]);
    opt.find('input').removeAttr('disabled');
    $(this).hide();
    inputOptionTemp[id] = {
        val : opt.find('input')[0].value,
        price : opt.find('input')[1].value
    };
   
    $(`.save-option[data-id="${id}"]`).removeClass('hidden'); 
   
});

function updateOptionValue($this,opt,atrrname,id){
    if(opt.find('input')[0].value  != inputOptionTemp[id]['val']  || opt.find('input')[1].value !=  inputOptionTemp[id]['price'] ){
        
        $.ajax({
            url: window.productlinks.editAttrValue,
                type: 'POST',
                dataType: "json",
                data: {
                    productid : window.product.pid,
                    value : opt.find('input')[0].value,
                    price :opt.find('input')[1].value,
                    originalvalue : inputOptionTemp[id]['val'],
                    attributename : atrrname
                },
                beforeSend:function(){
                    $this.find('i').removeClass().addClass('fa fa-spinner fa-pulse ');
                },
                complete: function(){
                    $this.find('i').removeClass().addClass('fa fa-check');
                }
            }) 
            .done(function (data) { 
                if(data.success){
                    $notification.success(window.localization.success, "", 2000, "fa fa-check");
                    $addUpdateOptionBtn($this , opt , id);
                    $refreshCombinationsTable(data.result);
                    delete inputOptionTemp[id];
                }else{
                    $showErorr(data.errors);
                } 
            })
            .fail(function (jqXHR, Status) {
                $fail(jqXHR, Status)
                $notification.error( window.localization.error , jqXHR.statusText  , 2000, "fa fa-exclamation-circle")
                opt.find('input')[0].value  = inputOptionTemp[id]['val'] ;
                opt.find('input')[1].value  =  inputOptionTemp[id]['price'] ;

                 

            });
    }else{
        $toggleSaveUpdateOption($this , opt , id);
    }
   
}



//------------------------------------------------------------------
//#endregion #9
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #10  remove attribute value
//------------------------------------------------------------------

const removeOptionRow =($this)=>{

    let data = $this.data('id').split('-').slice(1);
    let index = parseInt(data[data.length - 1]);
    let id = parseInt(data[0]); 
    let count = $('#options-' + id).children('[id^="opt-"]').length - 1;
    let regex = /([a-zA-z]+)+(-\d+-)+(\d+)/g;
    if (count >= 0) {
        $('#opt-' + id + '-' + index).remove();

        if (index < count) {
            $(`#options-${id}`).children('[id^="opt-"]').each((i, option)=> {
                let opt = $(option);
                opt.attr('id', 'opt-' + id + '-' + i);
                $(option).find('.remove-option').attr('data-id', 'opt-' + id + '-' + i);
                let label = opt.find('label');
                label.each((l, lab)=> {
                    $(lab).attr('for', $(lab).attr('for').replace(regex, '$1-' + id + '-' + i))
                })
                let inputs = opt.find('input');
                inputs.each((c, input) => {
                    let ipt = $(input);
                    let reg = /([a-zA-z]+\W)+(\d+)+([a-zA-z]+\W)+(\d+)+([a-zA-z]+\W)/g;
                    ipt.attr('name', ipt.attr('name').replace(reg, '$1' + id + '$3' + i + '$5'))
                })
            })
           
        }

    } 
}

  deleteOptionValue = ($this)=>{
    
    let opt = $($this.parents('.form-group')[0]);
 
    $.ajax(
        {
            url: window.productlinks.deleteAttrValue,
            type: 'GET',
            dataType: "json",
            data: {
                productid : window.product.pid,
                attributename : $this.parents('.inputitem').find('input[id^="Attribute-name-"]').val(),
                value :  opt.find('input')[0].value,
            },
        } )
    .done((data)=>{
        if(data.success){
            $notification.success(window.localization.success, "", 2000, "fa fa-check");
            removeOptionRow( $this );
        }else{
            $showErorr(data.errors);
        }
    })
    .fail((jqXHR, Status) => $fail(jqXHR, Status) );
}


$(document).on('click', '.remove-option', function (e) {
    e.preventDefault();
    var $this = $(this);
    isNew = $this[0].hasAttribute("data-new");

    if(isNew)
        removeOptionRow( $this );
    else
        $Confirm({},(result) =>  (result.value) ?  deleteOptionValue($this) :false  )      
  
})    
//------------------------------------------------------------------
//#endregion #10
//------------------------------------------------------------------

 
 
 //-- end --
}); 