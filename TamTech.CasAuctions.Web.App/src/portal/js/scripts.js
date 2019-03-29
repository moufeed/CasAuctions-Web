function toggleMenuItems() {
    $('.item-has-submenu').children('a').on('click', function (event) {
        event.preventDefault();
        if ($(window).width() < 760) {
            $(this).toggleClass('submenu-open').next('.submenu')
                .slideToggle(200).end().parent('.item-has-submenu')
                .siblings('.item-has-submenu').children('a')
                .removeClass('submenu-open').next('.submenu').slideUp(200);
        }
    });
}




$(document).ready(() => {

    toggleMenuItems();

    $('.list-keys a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        var offset = target.offset().top - 15;
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: offset
            }, 800);
        }


    });




    $('[data-toggle="tooltip"]').tooltip();


    $('.sharebtn').click(function (event) {
        event.preventDefault();
        let width = 650,
            height = 450,
            windowSRC = $(this).attr('href'),
            windowTitle = "Share on";
        window.open(
            windowSRC, windowTitle,
            `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=${width},height=${height},top=${(screen.height/2-height/2)},left=${(screen.width/2-width/2)}`
        );
    });


    $('[gallery-images]').magnificPopup({
        delegate: '[gallery-item]',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

 

    var offset = 250;
    var duration = 300;
    $(window).scroll(function (e) {
        if ($(this).scrollTop() > offset) {
            $(".back-to-top").fadeIn(duration);
        } else {
            $(".back-to-top").fadeOut(duration);
        }
    })
    $(".back-to-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, duration);
        return false;
    })
 
})


$('.navbar  .nav-link.dropdown-toggle').on('click', function (event) {
    $(this).parent().toggleClass('open');
    $(this).next('.dropdown-menu').toggleClass('show');
});

$('body').on('click', function (e) {
    if (!$('.navbar .nav-item.dropdown').is(e.target) &&
        $('.navbar .nav-item.dropdown').has(e.target).length === 0 &&
        $('.open').has(e.target).length === 0
    ) {
        $('.navbar .nav-item.dropdown').removeClass('open');
        $('.navbar .nav-item.dropdown .dropdown-menu').removeClass('show');
    }
});