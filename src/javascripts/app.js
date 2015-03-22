// open navigation
function openNavigation() {
	if ($("#mobile-navigation").hasClass("open-navigation")) {
		$("#mobile-navigation").removeClass('open-navigation');
	} else {
		$("#mobile-navigation").addClass('open-navigation');
	}
}

$(document).ready(function() {
	// menu click
    $(".navbar-collapse a[data-section]").click(function() {
    	$('html, body').animate({scrollTop: eval($('#'+ $(this).data('section') +'').offset().top - 50) }, 1000);
    });

    // fixed navigation on scroll
	$(window).bind('scroll', function() {
     	if ($(window).scrollTop() >= $(window).height()) {
        	$('.navbar').addClass('navbar-fixed-top');
        } else if ($(window).scrollTop() >= ($(window).height() - 50)) {
        	$('.navbar').addClass('navbar-fixed-top');
        } else {
        	$('.navbar').removeClass('navbar-fixed-top');
        }
    });

    $('html').click(function (e) {
    	if (e.target.id == 'mobile-navigation' || e.target.id == 'navbar-toggle') {
    	} else {
        	$("#mobile-navigation").removeClass('open-navigation');
        }
	});

	// first-section image height
	var user_height = $(window).height()+'px';
	$("#first-section").css('height', user_height);

	// parallax effect
	$('.parallax').each(function(){
		var $obj = $(this);
 
		$(window).scroll(function() {
			var yPos = -($(window).scrollTop() / $obj.data('speed')); 
			var bgpos = '0px '+ yPos + 'px';

			if ($(window).scrollTop() <= 0) {
				$obj.css('background-position', '0px 0px');
				return;
			}

			$obj.css('background-position', bgpos);
		});
	});

    // isotope grid
    var $isotope_grid = $('#portfolio-section .grid').isotope({
		itemSelector: '.item',
    	position: 'relative'
    });

	// isotope filter
	$("#portfolio-section .filters li").click(function() {
		$("#portfolio-section .filters li").removeClass('active');
		$(this).addClass('active');
		$isotope_grid.isotope({ filter: $(this).data('filter') });
	});

	// google maps
	var contact_height = $("#contact-section").height()+'px';
	$("#map-canvas").css('height', contact_height);
	new GMaps({
  		div: '#map-canvas',
  		lat: 51.3328322,
  		lng: -0.26288673
	});
});