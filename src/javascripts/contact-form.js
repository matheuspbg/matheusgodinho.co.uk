$(document).ready(function() {
	// check if is mobile
	if(navigator.userAgent.match(/Android/i)
 	   || navigator.userAgent.match(/webOS/i)
 	   || navigator.userAgent.match(/iPhone/i)
 	   || navigator.userAgent.match(/iPod/i)
 	   || navigator.userAgent.match(/BlackBerry/i)
 	   || navigator.userAgent.match(/Windows Phone/i)
 	) {
    	var placement = 'top';
    } else {
    	var placement = 'right';
  	}
  	$('#contact-section .contact-form [data-toggle="tooltip"]').tooltip({ placement: placement, trigger: 'manual' });

	// check if input or textarea is empty
	$("#contact-section .contact-form input, #contact-section .contact-form textarea").blur(function() {
		if (this.value != "") {
			$(this).css("background-color", "#FFFFFF");
		} else {
			$(this).css("background-color", "transparent");
		}
	});

	// validate form
	$("#contact-form").validate({
    	rules:{
      		name: {
        		required: true
      		},
      		email: {
        		required: true, email: true
      		},
      		phone: {
        		required: true
      		},
      		message: {
      			required: true
      		}
    	},
    	errorPlacement: function(error, element) {},
		highlight: function(element, errorClass) {
			$(element).tooltip('show');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).tooltip('destroy');
		},
        submitHandler : function(form) {
            sendEmail();
        }
  	});

    // send email function
    function sendEmail() {
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: { name: $("#name").val(), email: $("#email").val(), phone: $("#phone").val(), message: $("#message").val() },
            dataType: 'JSON',
            success: function(res) {
                if (res.response === true) {
                    $("#contact-form .alert .fa").addClass('fa-check');
                    $("#contact-form .alert strong").html('Success!');
                    $("#contact-form .alert .text").html('Contact form sent!');

                    $("#contact-form input, #contact-form textarea").val('');
                } else {
                    $("#contact-form .alert .fa").addClass('fa-times');
                    $("#contact-form .alert strong").html('Oops!');
                    $("#contact-form .alert .text").html(res.error);
                }

                $("#contact-form .alert").fadeIn();
            }
        });
    }
});