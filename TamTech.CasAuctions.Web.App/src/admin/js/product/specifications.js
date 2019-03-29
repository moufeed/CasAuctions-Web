$(document).ready(function () {
    
    //-----------------------------------------------------------------
    //--- specifications  ------------------------------------------
    //-----------------------------------------------------------------

let specifications_template = 
`<div class="form-group clearfix inputitem" id="sitem-##">
    <div class="col-md-3 col-sm-3 col-xs-12 scrollable-dropdown-menu">
        <input type="text" id="Key-##" name="Specifications[##].Key" class="form-control typeahead" value="" required />
    </div>
    <div class="col-md-8 col-sm-7 col-xs-12">
        <textarea type="text" id="Value-##" name="Specifications[##].Value" class="form-control" rows="1"></textarea>
    </div>
    <div class="col-md-1 col-sm-2 col-xs-12">
        <a class="btn btn-remove-content m-t0 remove-content" data-id="##">
            <i class="fa fa-trash-o"></i>
        </a></div>
</div>`;

    $('#addItems').on('click', function (e) {
        e.preventDefault();
        var temp = specifications_template.replace(/##/g, window.product.idx);
        $('#s_wrapper').append(temp);
        autocomplete(`#Key-${ window.product.idx}`)
        window.product.idx++;
    });

    $(document).on('click', '.remove-content', function (e) {
        e.preventDefault();
        if (window.product.idx > 0) {
            let id = $(this).data('id');

            $('#sitem-' + id).remove();
                $('.remove-content').addClass('disabled'); 
                let items = $('#s_wrapper').find('.inputitem');
                items.each(  (i, itm) => {
                    let item = $(itm);
                    input = item.find('input[id^="Key-"]'),
                    textarea = item.find('textarea[id^="Value-"]');
                    item.attr('id', `sitem-${i}`);
                    input.attr("id", `Key-${i}`).attr('name', `Specifications[${i}].Key`);
                    textarea.attr("id", `Value-${i}`).attr('name', `Specifications[${i}].Value`);
                    item.find('.remove-content').attr('data-id', i);
                }); 
                $('.remove-content').removeClass('disabled');  
                window.product.idx--;
        }
    });
//-- end -- 
});