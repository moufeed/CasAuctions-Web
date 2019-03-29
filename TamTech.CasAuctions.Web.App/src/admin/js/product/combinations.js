//------------------------------------------------------------------
/*
#1 -    combination modal   [show , ajax:get , hide ]  
#2 -    create combination  model   [fn]
#3 -    append new combination to table  [fn]
#4 -    append Errors to commbination modal [fn]
#5 -    validate and save new Combintion  [validate , ajax:post]
#6 -    toggle update combination button [fn]
#7 -    save updated Combination [ ajax:post ]
#8 -    toggle Publish Combination button [fn]
#9 -    publish & unpublish combination [ajax:get]
#10 -   refresh Combinations table  
#11 -   delete combination
#12 -   
#13 -   
*/
//------------------------------------------------------------------

$(document).ready(function () {
 
//------------------------------------------------------------------
//#region #1    combination modal
//------------------------------------------------------------------
$('#combinationModal').on('show.bs.modal', function (e) {
    let button = $(e.relatedTarget)
    let productid = button.data('productid');
    let modal = $(this);
    let trTemplate = "";
    modal.find('#pro_sku').val($('input[id="SKU"]').val()) || window.product.PSKU;

    $.getJSON( window.productlinks.geteditAttributes, (data)=> {

        
            if (data.success && data.result.length > 0) {
                
                modal.find('.atrributes_selects_box').html(" ");
                $.each(data.result,   (idx, attr) => {
                    modal.find('.atrributes_selects_box').append(
                        `<div class="form-group clearfix" id="selects_box">
                        <label class="control-label col-md-3 col-sm-4">${attr.name}</label>
                        <div class="col-md-9 col-sm-8 col-xs-12">
                        <select class="form-control" name="attr-${attr.name}-${idx}"><option value="null">${_localizer.select}  ${attr.name} </option></select></div></div>`);
                    $.each(attr.values,   (i , opt)=> {
                        modal.find('select[name="attr-' + attr.name + '-' + idx + '"]')
                            .append(`<option value="${opt.value}"> ${opt.value} </option>`)
                    })
                });
            }
             else if(data.success && data.result.length == 0){
                modal.find('#saveCombination').hide();
                modal.find('.atrributes_selects_box').html(`<div class="alert alert-warning">${_localizer.product_havent_attributes}</div>`);
            }
            else {
                $notification.error(window.localization.error, window.localization.something_wrong, 2000, "fa fa-exclamation-circle");
            }
        })
        .fail((jqXHR, Status) => $fail(jqXHR, Status))

});
$('#combinationModal').on('hidden.bs.modal',   (e)=> {

    let modal = $(this);
    modal.find('.atrributes_selects_box').html('<div class="lds-ripple"><div></div><div></div></div>');

    if ($('#combinationModal').find('.alert').length > 0)  
        $('.alert').remove();
    
});
//------------------------------------------------------------------
//#endregion #1
//------------------------------------------------------------------

//------------------------------------------------------------------
//#region  #2  create combination  model
//------------------------------------------------------------------
const createObj= ($form) => { 
    let inputs = $form.find('input').serializeArray();
    let selects = $form.find('select').serializeArray();
    var deferred = new $.Deferred();
    let combinationData = {
        Attributes: {},
        productid: window.product.pid,
        ProductSku : window.product.PSKU
    };


    $.each(inputs, (i, item)=> combinationData[item.name] = item.value )

    $.each(selects,   (i, select) => {
        if (select.value != "null")
            combinationData.Attributes[select.name.split('-')[1]] = select.value;
        if (selects.length - 1 == i)
            deferred.resolve(combinationData);
    })
    return deferred.promise();
}

//------------------------------------------------------------------
//endregion  #2
//------------------------------------------------------------------

//------------------------------------------------------------------
//#region  #3   append new combination to table 
//------------------------------------------------------------------

const appendTableRow = (row,key,refresh) => {
    
    
    let attrHtml = ""; 
    if(refresh)
        attrHtml = key.replace(/,/g,"<br/>").replace(/:/g," : ");
    else
        $.each(row.attributes, (index, item) =>  attrHtml += `${index} : ${item} <br />`) ;
    
 
    let temp =  `<tr><td>${attrHtml}</td><td>
                <input type="number" step="1" class="form-control m-y-1 ignore" name="ProductAttributeCombinations[${window.product.comb}].Quantity"   value="${row.quantity}" disabled /></td><td>
                <p class="form-control-static">${row.sku}</p></td><td>
                <input type="number" step="any" class="form-control m-y-1 ignore" name="ProductAttributeCombinations[${window.product.comb}].Price" value="${row.price}" disabled /></td> 
                <td><input type="number" step="any" class="form-control m-y-1 ignore" name="ProductAttributeCombinations[${window.product.comb}].DiscountPrice" value="${row.discountPrice}" disabled /></td> 
                <td class="text-center" ><a data-sku="${row.sku}"  data-key="${key}" class="btn btn-link-pup toggle_comb_publish">   <span class="unpublished"> <i class="fa fa-eye-slash c-red"></i> <small>${_localizer.unpublished}</small></span></a> </td> 
                <td><a href="#" class="btn btn-update-link update-combination  hidden m-y-2 " data-index="${window.product.comb}">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>${_localizer.edit}</a>
                <a title="${_localizer.delete_combination}" data-sku="${row.sku}" data-key="${key}" data-id="${window.product.comb}" class="btn btn-remove-combination c-red m-y-2 remove-combination">
                <i class="fa fa-trash-o"></i>${_localizer.delete}</a>
                <a class="btn btn-save-link save-combination hidden m-y-2" data-index="${window.product.comb}">
                <i class="fa fa-check" aria-hidden="true"></i>${_localizer.save}</a></td></tr>`;

    if(row.published){
         temp = temp.replace(/unpublished/g, 'published')
         temp = temp.replace('fa-eye-slash c-red','fa-eye c-green'); 
    }

    if($('.combinations-table').has('.empty_row ').length > 0) 
        $('.combinations-table').find('.empty_row').remove();


    $('.combinations-table tbody').append(temp);
    window.product.comb++;
} 

//------------------------------------------------------------------
//endregion #3
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region  #4  append Errors to commbination modal 
//------------------------------------------------------------------

const appendError =(errors,$form) => {
    var alertTemp = 
    `<div class="alert alert-danger alert-dismissible fade in" style="border-radius: 0;" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span></button><ol id="errors_list" class="m-b0"></ol></div>`;

    if ($('#combinationModal').find('.alert').length <= 0) 
        $form.before(alertTemp);
    
    $.each(errors, (key, value) => $.each(value.value,(k, v) => $('#errors_list').append(`<li>${v}</li>`))) 
}

//------------------------------------------------------------------
//#endregion #4
//------------------------------------------------------------------
    
//------------------------------------------------------------------
//#region  #5   validate and save new Combintion  
//------------------------------------------------------------------
var cobinations_validator =  $(" #product_cobinations ").validate({
    errorClass: "invalid_field",
    validClass: "valid_field", 
    ignore: ".ignore",
    rules: { 
        "discountprice" :{
            lessThan: ["#combination_price" ,"price"],
        },
        "price" :{
            greaterThan: ["#discount_price" ,"Discount Price"],
        }
    },
    submitHandler: function (form) {
        let $form = $(form);
        createObj($form).then(function (result) {

            if ($('#combinationModal').find('.alert').length > 0) 
                $('.alert').remove();
            

            $.ajax({
                    url: window.productlinks.createCombination,
                    type: 'POST',
                    dataType: "json",
                    data: result
                })
                .done(  (data)=> {
                    if (data.success) {

                        $notification.success(window.localization.success, "", 2000, "fa fa-check");
                        $("[data-dismiss=modal]").trigger({
                            type: "click"
                        });
                        
                        appendTableRow(data.model,data.result.key);
                        $form[0].reset();
                    } else {
                        appendError(data.errors,$form);
                    }
                })
                .fail((jqXHR,Status) => {
                    if(jqXHR.status == 400 ){
                        appendError(jqXHR.responseJSON,$form);
                    }else{
                        $notification.error(window.localization.error, jqXHR.statusText, 2000, "fa fa-exclamation-circle");
                    }
                })
        });
        return false;
    }
})
$("#combination_price").on('keyup',function(){
    cobinations_validator.element( "#discount_price" );
})
$("#discount_price").on('keyup',function(){ 
    cobinations_validator.element( "#combination_price" );
})

//------------------------------------------------------------------
//#endregion #5
//------------------------------------------------------------------


    
//------------------------------------------------------------------
//#region #6  toggle update combination button 
//------------------------------------------------------------------
const ShowUpdateBtn = ($this, $tr) => {
    $tr.find(":input").attr('disabled', 'disabled');
    $this.addClass('hidden');
    $this.siblings('.update-combination').removeClass('hidden'); 
}

var combinationTemp = {};
$(document).on('click', '.update-combination', function (e) {
    e.preventDefault();
    let $tr = $($(this).parents('tr')[0]),
        index = $(this).data('index');
    $tr.find(":input").removeAttr('disabled');
    combinationTemp[index] = $tr.find(":input").serializeArray();
    $(this).addClass('hidden').siblings('a.save-combination').removeClass('hidden');
})
//------------------------------------------------------------------
//#endregion #6
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #7 save updated Combination
//------------------------------------------------------------------
$(document).on('click', '.save-combination', function () {
    let $tr = $($(this).parents('tr')[0]),
        index = $(this).data('index');
    data = $tr.find(":input").serializeArray();
    if (JSON.stringify(combinationTemp[index]) !== JSON.stringify(data)) {
        var comData = {
            Quantity: data[0].value,
            Sku: combinationTemp[index][1].value,
            newSku: data[1].value,
            price: data[2].value,
            productid: window.product.pid
        }
        $.ajax({
                url: window.productlinks.editCombination,
                type: 'POST',
                dataType: "json",
                data: comData
            })
            .done((data) => {
                if (data.success) {
                    $notification.success(window.localization.success, "", 2000, "fa fa-check");
                    ShowUpdateBtn($(this), $tr);
                } else {
                    showErrorsMsg(data.data);
                }
            })
            .fail((jqXHR, Status)=> {
                $fail(jqXHR, Status);
                $.each(data, (idx, item) =>  $(`input[name="${item.name}"]`).val(combinationTemp[index][idx].value) );
            });
    } else {
        delete combinationTemp[index];
        ShowUpdateBtn($(this), $tr);
    }
})
//------------------------------------------------------------------
//#endregion #7
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #8  toggle Publish Combination button 
//------------------------------------------------------------------
const   togglePublishCombBtn = ($this , status) => {
    if(status){
        if($this.find('span').hasClass('unpublished')){
            $this.find('span').removeClass('unpublished').addClass('published');
            $this.find('small').text(_localizer.published);
            $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye c-green');
        }else{
            $this.find('span').removeClass('published').addClass('unpublished');
            $this.find('small').text(_localizer.unpublished);
            $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye-slash c-red');
        }
    }else{
        if($this.find('span').hasClass('unpublished'))
        $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye-slash c-red');
        else
        $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye c-green');
    }
}
//------------------------------------------------------------------
//#endregion #8
//------------------------------------------------------------------


//------------------------------------------------------------------
//#region #9 publish & unpublish combination
//------------------------------------------------------------------
$(document).on('click','.toggle_comb_publish',function(e){
    e.preventDefault();
    var $this =$(this);

    $this.find('i').removeClass().addClass("fa fa-spinner fa-pulse");

    $.ajax({
        url: window.productlinks.publishCombination ,
        type: 'GET',
        dataType: "json",
        data: {
            productid : window.product.pid,
            combinationkey : $this.data('key'),
            sku : $this.data('sku'),
        }
    })
    .done((data) => {
        if(data.success){
           togglePublishCombBtn($this , true);
        }else{
            $showErorr(data.errors);
            togglePublishCombBtn($this , false);
        }
    })
    .fail((jqXHR, Status) => {
        $fail(jqXHR, Status)
        togglePublishCombBtn($this , false);
    });
}); 

//------------------------------------------------------------------
//#endregion #9
//------------------------------------------------------------------

 


//------------------------------------------------------------------
//#region #10  refresh Combinations table 
//------------------------------------------------------------------
window.$refreshCombinationsTable = (newData) => {
     $('.combinations-table').find('tbody').html(' ');
     window.product.comb= 0;
     $.each(newData, (index , row ) => appendTableRow(row,row.attributesvalues,true) );
 };
//------------------------------------------------------------------
//#endregion #10
//------------------------------------------------------------------

 

//------------------------------------------------------------------
//#region #11   delete combination
//------------------------------------------------------------------

var emptyRowTemp = 
`<tr class="empty_row"><td colspan="7">                                    
    <div class='empty_table text-center'> 
    <i class='fa fa fa-exclamation-circle'></i>
    <p>${_localizer.no_data_table}</p></div></td></tr>`;

                             

$(document).on('click','.remove-combination',function(e){
    e.preventDefault();
    var $this = $(this);
    $Confirm({},(result) =>  (result.value) ? deleteCombination($this) : null ) 
})

const deleteCombination = ($this) => {
    $.ajax({
        url: window.productlinks.deleteCombination,
        type: 'Get',
        dataType: "json",
        data: {
            productid : window.product.pid,
            combinationkey : $this.data('key'),
            sku : $this.data('sku'),
        }
    })
    .done((data)=>{
        if(data.success){

            $notification.success(window.localization.success, "", 2000, "fa fa-check");

            $this.parents('tr').remove();
            
            if($('.combinations-table tbody tr').length == 0 )
                $('.combinations-table tbody').append(emptyRowTemp);
            
        }else{
            
            $showErorr(data.errors)
        }
    })
    .fail((jqXHR,Status) => $fail(jqXHR, Status));
}

 


//------------------------------------------------------------------
//#endregion #11
//------------------------------------------------------------------

 //-- end --
});