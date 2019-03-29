

    let i =  window.product.dtab || 0;
   
    let template =
    `<section id="section-&&" class="m-b3 clearfix">
    <a class="btn btn-remove-content" id="remove-content" data-id="&&">
        <i class="fa fa-trash-o"></i></a>
    <div class="form-group">
        <Label for="Title-&&" class="control-label col-md-3 col-sm-4 col-xs-12">${_localizer.f_title}</Label>
        <div class="col-md-7 col-sm-8 col-xs-12" id="">
            <input type="text" name="Description[&&].Key" id="Title-&&" class="form-control m-b2" required />
        </div>
    </div>
    <div class="form-group">
        <Label for="Description-&&" class="control-label col-md-3 col-sm-4 col-xs-12 ">${_localizer.f_description}</Label>
        <div class="col-md-7 col-sm-8 col-xs-12" id="">
            <textarea rows="4" class="form-control" id="Description-&&" name="Description[&&].Value"></textarea>
        </div>
    </div>
    <hr class="line" />
</section>`;


    $('#addContent').on('click', function (e) {
        e.preventDefault(); 
        let temp = template.replace(/&&/g, i);//.replace(/%%/g, i+1)
        $('#ContentItems').append(temp);
        i++;
    });


    $(document).on('click', '#remove-content', function () { 
        if (i > 0) {
            let id = $(this).data('id');
            $(`#section-${id}`).remove();

            if (id < (i - 1)) {
                let sections = $('#ContentItems').find('section');
                sections.each(function (indx, section) {
                    let sec = $(section),
                        link = sec.find("#remove-content"),
                        labTitle = sec.find('.control-label[for^="title-"]'),
                        labContent = sec.find('.control-label[for^="Description-"]'),
                        input = sec.find('input[id^="title-"]'),
                        textarea = sec.find('textarea[id^="Description-"]');
         
                        sec.attr("id", "section-" + indx);
                        link.attr("data-id", indx);
                        labTitle.attr("for", `title-${indx}`);
                        labContent.attr("for",`Description-${indx}` );
                        input.attr("id", "title-" + indx).attr('name', `Description[${indx}].Key`);
                        textarea.attr("id", `Description-${indx}`).attr('name', `Description[${indx}].Value`);
                })
            }
            i--;
        }
    })
   
 
 
