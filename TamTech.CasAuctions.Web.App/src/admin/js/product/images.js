$(document).ready(function () {

let imgTemplate =
`<div class="col-md-3 col-sm-4 animated zoomIn duration-300" >
<figure class="imgbox imgnew" id="preview-@@">
<a href="#" class="remove-btn" id="removeimage"><i class="fa fa-times"></i></a>
<input type="checkbox" class="ignore" id="thumb-checkbox" />
<div class="thumbnail">
<img src="" alt="" id="imagePreview-@@"  /></div><i  class="fa fa-upload" ></i></figure></div>`;
//-----------------------------------------------------------------
//--- Images  ------------------------------------------
//-----------------------------------------------------------------



const removeImages = (ids,urls,callback)=>{
     
    $.ajax({
        url: window.productlinks.deleteimages,
            type: 'POST',
            dataType: "json",
            cache: false,
            data:{ images  : urls , ProductId  :window.product.pid }
        })
        .done(function (data) {
            $notification.success(window.localization.success, "", 2000, "fa fa-check");
            if(callback && typeof(callback) == 'function') 
                callback(ids, data)
        })

        .fail( (jqXHR, Status) => $fail(jqXHR, Status) );

     
}
// remove image

$(document).on('click','#removeimage', function(){
    const urls = [] , ids = [];
    let $parent =$(this).parent();
    let id = $parent.attr('id');
    let $img = $parent.find('img');
    

    $Confirm({},(result)=>{
       
        if (result.value) {
            
            if(!$parent.hasClass('imgnew')){
                ids.push(id);
                urls.push($img.attr('src'));

                removeImages(ids,urls ,(itemsId,data)=>  $(`.imgbox[id="${id}"]`).parent().remove() );

            } else{
                let _id = parseInt(id.split("-")[1]);
                $parent.parent().remove();
                $('#inputsfiles input[id="input-'+_id+'"]').remove();

                if(_id < $index - 1) 
                    reorderItems();
                 
                $index--;
            }
        }
    }) 

 
    
})

let $index = 0;
let thumbId = [];
let oldimagesCount = 0;


const reorderItems = () => {
    $('.imgnew').each( (index ,item ) => {
        var $img = $(item).find('img');
        $(item).attr('id','preview-'+index)
        $img.attr('id','imagePreview-'+index);
    })
    $('#inputsfiles input').each( (i,itm) =>  $(itm).attr('id', `input-${i}` ).attr('name', `Files[${i}]`))
}

const removePreview = (id) => {
   
    $(`#${id}`).parent().remove();
    var it = parseInt( id.split('-')[1]); 
    $('#inputsfiles').find(`#input-${it}`).remove();

    if(it < $index){
        reorderItems()
    }

    $index--;
}


const removeServerImg = (id , urls ,ids) => {
    
    ids.push(id)
    urls.push( $('#img-'+id).attr('src') )
    
    if(urls.length  == oldimagesCount ){
        removeImages(ids,urls , (itemsId,data) =>  $.each(ids ,(x,i) => $(`.imgbox[id="${i}"]`).parent().remove()) );
    }
}

const removeSelected = ()=>{
    var deferred = new $.Deferred();
    let urls = [] , ids = [] , indxs=0;
    if(thumbId.length > 0){
        
        $.each(thumbId,(i,id)=>{
            if(isNaN(id)){
                removePreview(id);
            }else{
                indxs++;
                removeServerImg(id , urls ,ids)
            }
            if(thumbId.length - 1  ==  i)
                deferred.resolve(true);
        });
    }
    return deferred.promise();
}


$('#removeImages').click(function(){

    $Confirm({}, (result)=>{
        if (result.value) {
            removeSelected().then((status)=>{
                thumbId = [];
                oldimagesCount =0;
                 $('#removeImages').addClass('hidden');
            })
        }
    })
   
})
 
//-------------------------------------------------------------------------
//---- select images to be removed----------------------------------------- 
//-------------------------------------------------------------------------
$(document).on('change','input[id^="thumb-checkbox"]', function () {
    
    let $el = $(this);
    let id = $el.parent().attr('id');
    if($el.is(":checked")){
            thumbId.push(id)
        if(thumbId.length == 1 )
            $('#removeImages').removeClass('hidden');
        if(!isNaN(id))
            oldimagesCount++;
    }else{
            thumbId.splice( thumbId.indexOf(id) , 1);
        if(thumbId.length <= 0)
            $('#removeImages').addClass('hidden');
        if(!isNaN(id))
            oldimagesCount--;
    }
})

$(document).on('change','#addImages', function () {
    let $el = $(this);
    $clone = $el.clone();
     if(this.files && this.files[0]){
        $clone.attr('id' , `input-${$index}` ).attr('name', `Files[${$index}]`).removeClass();
        $clone.appendTo('#inputsfiles');
        let reader = new FileReader();
        reader.onload = function (e) {
            let temp =  imgTemplate.replace(/@@/g,$index)
            $(temp).appendTo('.images-zone');
            $(`#imagePreview-${$index}`).attr('src', e.target.result);
            $index++;
        };
        reader.readAsDataURL(this.files[0]);
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
    }
})


 
//-- end --
});