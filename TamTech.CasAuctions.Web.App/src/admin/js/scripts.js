 

 
 (function ($, sr) {
     // debouncing function from John Hann
     // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
     var debounce = function (func, threshold, execAsap) {
         var timeout;

         return function debounced() {
             var obj = this,
                 args = arguments;

             function delayed() {
                 if (!execAsap)
                     func.apply(obj, args);
                 timeout = null;
             } 
             if (timeout)
                 clearTimeout(timeout);
             else if (execAsap)
                 func.apply(obj, args);

             timeout = setTimeout(delayed, threshold || 100);
         };
     };
       
     // smartresize 
     jQuery.fn[sr] = function (fn) {
         return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
     };

 })(jQuery, 'smartresize');
 /**
  * To change this license header, choose License Headers in Project Properties.
  * To change this template file, choose Tools | Templates
  * and open the template in the editor.
  */

 var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
     $BODY = $('body'),
     $MENU_TOGGLE = $('#menu_toggle'),
     $SIDEBAR_MENU = $('#sidebar-menu'),
     $SIDEBAR_FOOTER = $('.sidebar-footer'),
     $LEFT_COL = $('.left_col'),
     $RIGHT_COL = $('.right_col'),
     $NAV_MENU = $('.nav_menu'),
     $FOOTER = $('footer');



 //---------------------------------------
 // Sidebar
 //---------------------------------------
 //#region  Sidebar

 $(document).ready(function () {

    $(".preloader").fadeOut();
    
    if(localStorage.getItem("menu-type") === null){
        localStorage.setItem("menu-type","full");
    }else{
        if(localStorage.getItem("menu-type") == "full"){
           $BODY.removeClass('nav-sm');
           $BODY.addClass('nav-md');
        }else{
            $BODY.removeClass('nav-md');
            $BODY.addClass('nav-sm');
        }

    }


     // TODO: This is some kind of easy fix, maybe we can improve this
     var setContentHeight = function () {
           // reset height
         $RIGHT_COL.css('min-height', $(window).height());

         var bodyHeight = $BODY.outerHeight(),
             footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(), 
             leftColHeight = $LEFT_COL.eq(1).height() + ( $SIDEBAR_FOOTER.height() || 0),
             contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;


         // normalize content
            
         contentHeight -= ($NAV_MENU.height() + footerHeight + 147);
          
         $RIGHT_COL.css('min-height', contentHeight);  
     };

    
    
 
     $SIDEBAR_MENU.find('a').on('click', function (ev) {
         var $li = $(this).parent();
        
         if ($li.is('.active')) {
             $li.removeClass('active active-sm');
             $('ul:first', $li).slideUp(250,function () {
                 setContentHeight();
             });
         } else {
             // prevent closing menu if we are on child menu
             if (!$li.parent().is('.child_menu')) {
                 $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                 $SIDEBAR_MENU.find('li ul').slideUp(250);
             }

             $li.addClass('active');

             $('ul:first', $li).slideDown(250,function () { 
                 setContentHeight();
             });
         }
     });
     $(document).mouseup(function(e) 
     {
         var container = $($SIDEBAR_MENU.find(".child_menu")) ;
         if (!container.is(e.target) && container.has(e.target).length === 0 &&  $BODY.hasClass("nav-sm")) 
         {
              container.parent().removeClass("active");            
              container.hide();
         }
     });

     // toggle small or large menu
     $MENU_TOGGLE.on('click', function () {
         if ($BODY.hasClass('nav-md')) {
             localStorage.setItem("menu-type","sm");
             $SIDEBAR_MENU.find('li.active ul').hide();
             $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
         } else {
             $SIDEBAR_MENU.find('li.active-sm ul').show();
             $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
             localStorage.setItem("menu-type","full");
         }

         $BODY.toggleClass('nav-md nav-sm');

         setContentHeight();

         $('.dataTable').each(function () {
             $(this).dataTable().fnDraw();
         });
     });

     // check active menu
     $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

     
     $SIDEBAR_MENU.find('a').filter(function () {
         return this.href === CURRENT_URL;
     }).parent('li').addClass('current-page').parents('ul').slideDown(250,function () {
         setContentHeight();
     }).parent().addClass('active');

     // recompute content when resizing
     $(window).smartresize(function () {
         setContentHeight();
     });

     
     setContentHeight();
     // fixed sidebar
     if ($.fn.mCustomScrollbar) {
        $('.menu_fixed .scroll-view').mCustomScrollbar({
            autoHideScrollbar: true,
            axis: "y",
            mouseWheelPixels: 70 ,
            scrollInertia: 250,
            theme: 'minimal',
            mouseWheel:{ preventDefault: true }
        });
    }
      

 });




 $(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();

    $('.popover-image').popover({
        html: true,
        trigger: 'hover',
        placement: 'top',
        content: function(){return '<img src="'+$(this).data('img') + '"  class="img-responsive '+ $(this).data("img-class") + '" />';}
      });

    
 });
  
  window.aspectRatio = function (img, target) {
     var css;
     if (img.width > img.height) {

         css = {
             "width": "100%",
             "height": "auto"
         }
         $(target).css(css);
     } else {
         css = {
             "width": "auto",
             "height": "100%"
         }
         $(target).css(css);
     }

 }

 //#region input file
 function readURL(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();

         reader.onload = function (e) {
             var img = new Image();
             img.src = e.target.result;
             img.onload = () => aspectRatio(img, '#imagePreview');
             $('#imagePreview').css('opacity', 1).attr('src', e.target.result);

         };

         reader.readAsDataURL(input.files[0]);
     }
 }
 //---------------------------------------
 // input file  
 //---------------------------------------

 

 $(document).ready(function () {
     $('#avater').change(function () {
         readURL(this);
     })
 })
 

 //#endregion


 //---------------------------------------
 // Remove Item
 //---------------------------------------
 var Element = function (type, id) {

     return swal({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         type: 'error',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#df4818',
         confirmButtonText: 'Yes, delete it!'
     }).then((result) => {

         if (result.value) {
 
             swal(
                 'Deleted!',
                 'has been deleted.',
                 'success'
             )
         }
         return result;
     })
 }



function RemoveItem (table , itm ){

     var row =  table.row( $(itm).parents('tr') );
     var id = $(itm).data('id');
     var type = $(itm).data('type');
     var ajax_url = $(itm).data('url');

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
                        row.remove().draw();
                        $notification.success(window.localization.deleted ,window.localization.item_deleted , 2000, "fa fa-check");
                         
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
    
   
 }

 //---------------------------------------
 // Notification
 //---------------------------------------
 var $notification = {
     alert: function (type, title, message, delay, icon, timer) {
         return $.notify({
              
             icon: icon,
             title: title,
             message: message,
         }, {
             type: type,
             delay: delay || 3000,
             timer: timer || 500,
             z_index: 9000,
             placement: {
                from: "top",
                align: "center" 
            }, 
            offset: {
                x: 0,
                y: 5 
            },
             animate: {
                 enter: 'animated fadeInDown',
                 exit: 'animated fadeOutUp'
             },
             template: '<div data-notify="container" class="col-xs-11 col-sm-5 col-md-4 col-lg-3 alert alert-{0} alert-notify" role="alert"> ' +
                 '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                 '<span data-notify="icon"></span> ' +
                 '<span data-notify="title">{1}</span> ' +
                 '<span data-notify="message">{2}</span>' + 
                 '<div class="progress" data-notify="progressbar">' +
                 '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                 '</div>' +
                 '<a href="{3}" target="{4}" data-notify="url"></a>' +
                 '</div>' 
         });
     },
     success: function (title, message, delay, icon = false, timer = false) {

         return this.alert('success', title, message, delay, icon, timer)
     },
     error: function (title, message, delay, icon = false, timer = false) {

         return this.alert('danger', title, message, delay, icon, timer)
     },
     info: function (title, message, delay, icon = false, timer = false) {

         return this.alert('info', title, message, delay, icon, timer)

     },
     warning: function (title, message, delay, icon = false, timer = false) {

         return this.alert('warning', title, message, delay, icon, timer)
     },
     notify: function (options) {
         return $.notify(options || {});
     }
 }

 //-------------------------------------------------------------------------
 //-------------------------------------------------------------------------
 //-------------------------------------------------------------------------

$(document).ready(function(){
    
    $('.upload-input').on('change',function(e){
        
        var fileInputTextContent = $(this).data('text');
        
        var value = e.target.value.length > 0 ? e.target.value : fileInputTextContent;
        
        $('.uploadfile .url').text(value.replace('C:\\fakepath\\', ''));
        
    }) 
})


//------------------------------------------------------------------
function togglePublishBtn($this , status , published ,unpublished){
    if(status){
        if($this.hasClass('unpublished')){
            $this.removeClass('unpublished ut-unpublished').addClass('published ut-published');
            $this.find('small').text( published || 'published');
            $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye c-green');
            $this.attr("data-original-title",window.localization.unpublish)
        }else{
            $this.removeClass('published ut-published').addClass('unpublished ut-unpublished');
            $this.find('small').text(unpublished || 'unpublished');
            $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye-slash c-red');
            $this.attr("data-original-title",window.localization.publish)
        }
    }else{
        if($this.hasClass('unpublished'))
        $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye-slash c-red');
        else
        $this.find('i').removeClass('fa fa-spinner fa-pulse').addClass('fa fa-eye c-green');
    }
}

function toggleEye($this , status){
    if(status){
        if($this.hasClass('unpublished')){
            $this.removeClass('unpublished').addClass('published');
            $this.attr("data-original-title","publish")
            $this.find('.fa').removeClass('fa-spinner fa-pulse').addClass('fa-eye ');
        }else{
            $this.removeClass('published').addClass('unpublished');
            $this.attr("data-original-title","unpublish")
            $this.find('.fa').removeClass('fa-spinner fa-pulse').addClass('fa-eye-slash');
        }
    }else{
        if($this.hasClass('unpublished'))
        $this.find('.fa').removeClass('fa-spinner fa-pulse').addClass('fa-eye-slash');
        else
        $this.find('.fa').removeClass('fa-spinner fa-pulse').addClass('fa-eye');
    }
}

//--------------------------------------------------------------------

window.swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn no-radius',
    cancelButtonClass: 'btn btn-blue no-radius',
    buttonsStyling: false,
  })

$Confirm  = function(opts, callback){
    var options = {
        title:  window.localization.confirm_title,
        text:   window.localization.confirm_text ,
        type: 'error',
        showCancelButton: true,
        confirmButtonText:window.localization.confirm_yes ,
        cancelButtonText :window.localization.Confirm_cancel  ,
        focusConfirm :false
    }

    var object = $.extend({}, options ,opts);
    window.swalWithBootstrapButtons(object).then((result) =>  callback(result) );
}








$(document).ready(function(){
    
    var Temptext='<span class="pull-left characters-alerts "></span>' +
        '<span class="pull-right sms_messages">'+
            '<small class="characters">@@</small> <small>'+ window.localization.characters  +'</small>'+
        '</span>';

    var optDefaults = {
        warning_count: 158,
        warning_alert: window.localization.text_will_be_truncated , 
        maximum_count: 300, 
        maximum_alert: window.localization.text_count_be_more_than 
    } 

    $("[data-characters]").each(function(index,item){
        var $this = $(item);
        var opts = $this.data("characters");
        var object = $.extend({}, optDefaults ,opts);
         
        var length = opts.maximum_count  - $this.val().length;

        $this.after(Temptext.replace("@@", length));

        $this.keyup(function(){

            var val_length = this.value.length;
            console.log(length ,  val_length)
            if( val_length  > opts.warning_count &&  val_length <  opts.maximum_count){
                $this.parent().find('.characters-alerts').addClass("warning_field").text(optDefaults.warning_alert);
            }  

            if( val_length  > opts.maximum_count ){
                $this.parent().find('.characters-alerts').removeClass("warning_field").addClass("error").text(optDefaults.maximum_alert);
            }

            if(val_length < opts.warning_count &&  val_length <  opts.maximum_count)
            {
                $this.parent().find('.characters-alerts').removeClass("warning_field error").text(" ")
            }

            $this.parent().find('.characters').text( opts.maximum_count - val_length); 
        })
    })

});

 
function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  
$(".fullscreen").click(function(){toggleFullscreen()});



const MakeErrorsMsg = (errors)=>{

    let txt = "";
    errors.forEach((el)=>{
        txt += `<strong>${window.localization[el.key]}</strong>`;
        let div = "<div>";
        el.value.map((vl)=> div += `${vl}<br/>`)
        div += "</div>";
        txt += div;
    }) 

    return txt;
}
 

const ImgReader = (img,callback)=>{
    let reader = new FileReader();
    reader.onload = (e) => callback(e.target.result) ;
    reader.readAsDataURL(img);
}


$(document).ready(()=>{

    $(".toggle__publish").on("change",function(event){

        let $this = $(this);
        let link = $this.data('url');
        let status = $this.prop('checked');
        

        fetch(link,{headers :{"Content-Type" : "application/json;charset=utf-8"}})
        .then(res=>res.json()) 
        .then(response => {
            if(!response.success){  
                if (response.errors.length > 0) {
                    txt = MakeErrorsMsg(response.errors);
                    $notification.error("", txt , 3500, "fa fa-exclamation-circle");
                }else{
                    $notification.error(window.localization.error , window.localization.something_wrong , 3500, "fa fa-exclamation-circle");
                }
                $this.prop('checked' , !status )
            } 
        })
        .catch(error =>  $notification.error("", error.message , 2000, "fa fa-exclamation-circle"));
    })

})


async function async_fetch(url, body, headers) {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers || {
            'Accept': 'application/json',
            "Content-Type": 'application/json; charset=utf-8',
        },
        body: body

    })
    return await response.json();
}