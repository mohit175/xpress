"use strict";
$("#signup_button").click(function(e){
	e.preventDefault();
	window.location.href="registration.html";
});
$(".forgot-password").click(function(e){
	e.preventDefault();
	$("#login_error").html("");
	$("#login_error").hide();
	$("#password_div").hide();
	$("#login_btn").hide();
	$("#send_code").show();
	$("#send_code_button").show();
});
$("#cancel_code").click(function(e){
	e.preventDefault();
	$("#login_error").html("");
	$("#login_error").hide();
	$("#password_div").show();
	$("#login_btn").show();
	$("#send_code").hide();
	$("#send_code_button").hide();
});
$("#login-form").submit(function(e){
	e.preventDefault();
	e.stopPropagation();
});
$("#login_button").click(function(e){
	e.preventDefault();
	e.stopPropagation();
	$("#login_error").html("");
	$("#login_error").hide();
	$("#login_button_text").hide();
	$("#login_button_loading").removeClass("hide");
	var contact = $("#contact").val();
	var password = $("#password").val();
	var post_data = { action: 'login', contact : contact, password : password};
	$.post("ajax_api.php", post_data,
		function(data){
			if(data.status == 'success'){
				window.location.href = 'home.php';
			}
			else{
				$("#login_error").html(data.message);
				$("#login_error").show();
				$("#login_button_text").show();
				$("#login_button_loading").addClass("hide");
			}
		},"json");
});
$("#password").keypress(function(e){
	if(e.which == 13){
		e.preventDefault();
		e.stopPropagation();
		$("#login_button").click();
	}
});
$(".tab").click(function(e){
  var target = $(this).attr("data-target");
  $(".tab-body").addClass("hide");
  $("#"+target).removeClass("hide");
});
$("#send_message").click(function(e){
  var name    = $("#contact_form .full_name").val();
  var email   = $("#contact_form .email").val();
  var phone   = $("#contact_form .phone").val();
  var message = $("#contact_form .message").val();
  var post_data = {
    action  : "send_message_to_admin",
    name    : name,
    email   : email,
    phone   : phone,
    message : message
  };
  $.post("ajax_api.php", post_data, function(data){
    if(data.status == "success"){
      alert("Your message was sent");
    }
    else{
      alert("There was a problem sending your message, please try again");
    }
  }).fail(function(){
      alert("There was a problem sending your message, please try again");
  });
});
