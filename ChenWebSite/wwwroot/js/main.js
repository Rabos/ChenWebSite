(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Portfolio isotope and filter
    var portfolioIsotope = null;

    function initPortfolioIsotope() {
        var container = $('.portfolio-container');
        if (container.length > 0) {
            // Destroy existing Isotope instance if it exists
            if (portfolioIsotope && portfolioIsotope.data('isotope')) {
                portfolioIsotope.isotope('destroy');
            }

            // Reinitialize Isotope
            portfolioIsotope = container.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            // Trigger layout recalculation
            setTimeout(function() {
                portfolioIsotope.isotope('layout');
            }, 100);
        }
    }

    // Initialize on page load
    initPortfolioIsotope();

    // Reinitialize when images are loaded
    $('.portfolio-item img').on('load', function() {
        if (portfolioIsotope) {
            portfolioIsotope.isotope('layout');
        }
    });

    // Reinitialize on window resize with debouncing
    var resizeTimer;
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (portfolioIsotope) {
                portfolioIsotope.isotope('layout');
            }
        }, 250);
    });

    // Filter button click
    $(document).on('click', '#portfolio-flters li', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        if (portfolioIsotope) {
            portfolioIsotope.isotope({filter: $(this).data('filter')});
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
    });
    
})(jQuery);

