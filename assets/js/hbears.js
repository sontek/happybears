$(function() {

    // jQuery for page loader
    $(window).load(function() {
        $('#hb-loader').fadeOut('fast');
    });


    // jQuery sticky
    $('.hb-navbar').sticky({topSpacing: 0});


    // jQuery for page scrolling feature - requires jQuery Easing plugin
    var pageScroll = function(){
        $('.page-scroll a').bind('click', function(e) {
            e.preventDefault();

            var $anchor = $(this);

            var offset = $('body').attr('data-offset');

            if($('.hb-navbar').hasClass('hb-side-menu') && $(window).width() >= 992){
                $('body').data('offset', 1);
                offset = $('body').data('offset');
            }

            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - (offset - 1)
            }, 1500, 'easeInOutExpo');
        });
    };

    var stickySideMenu = function(){
        var navbar = $('.hb-navbar.hb-side-menu');

        if ($(window).width() >= 992) {
            navbar.unstick();
        }
        else
        {
            navbar.unstick();
            navbar.sticky({topSpacing: 0});
        }
    };

    pageScroll();
    stickySideMenu();

    window.onresize = function(){
        pageScroll();
        stickySideMenu();
    };


    // jQuery owl carousel
    $('#carousel-who-we-are').owlCarousel({
        autoPlay: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });


    // Contact Form Request
    $('.validate').validate();

    $(document).on('submit', '#contact-us-form', function(e) {
        e.preventDefault();

        $('.form-respond').html("<div class='content-message'><i class='fa fa-refresh fa-spin fa-4x'></i> <h2>Loading..</h2></div>");

        $.ajax({
            url: $('#contact-us-form').attr('action'),
            type: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function(data) {
                if (data == true) {
                    $('.form-respond').html("<div class='content-message'><i class='fa fa-rocket fa-4x'></i> <h2>Email Sent Successfully</h2> <p>Your message has been submitted.</p></div>");
                } else {
                    $('.form-respond').html("<div class='content-message'><i class='fa fa-exclamation-circle fa-4x'></i> <h2>Error sending</h2> <p>Try again later.</p></div>");
                }
            },
            error: function(xhr, err) {
                $('.form-respond').html("<div class='content-message'><i class='fa fa-exclamation-circle fa-4x'></i> <h2>Error sending</h2> <p>Try again later.</p></div>");
            }
        });
    });
});
