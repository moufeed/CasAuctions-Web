 

var revapi112;
jQuery(document).ready(function () {

    if (jQuery("#main_slider").revolution == undefined) {
        revslider_showDoubleJqueryError("#main_slider");
    } else {
        jQuery('#main_slider').show().revolution({
            sliderType: 'standard',
            sliderLayout: 'fullwidth',
            delay: 9000,
            gridwidth: 1170,
            gridheight: 600, 
            navigation: {
                arrows: {
                    enable: true,
                    style: "hesperiden",
                    hide_onleave: false
                },
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                bullets: {
                    enable: false,
                }
            } 
        });
    }
})
 