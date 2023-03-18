/**
 * File for the javascript functions for user registration
 * 
 * File containing the javascript functions for user registration
 *
 * @package xpress
 * @author Kaleshwar Chand
 * @copyright ExpressTech
 * @version 0.1
 */

const OTP_EXPIRE = 120;

$(document).ready(function(){
	var post_data = {action:"geo_locate"};
	$.post("ajax_api.php",post_data,function(data){
		if(data.status == "success"){
			$("#city").val(data.city);
			$("#zip").val(data.zip);
		}
	},"json");
	var data_list_action = {action: 'get_datalist'};
	/*
	$.post("ajax_api.php",data_list_action,function(data){
		var cities ='';
		data.city.forEach(function(city){
			cities += '<option>'+city+'</option>';
		});
		$("#cities").html(cities);
		var zips='';
		data.zip.forEach(function(zip){
			zips += '<option>'+zip+'</option>';
		});
		$("#zips").html(zips);
	});*/
});

/**
 * check and register user
 */
$("#register").click(function(e){
	e.preventDefault();
	e.stopPropagation();
	if(checkRegForm()){
		registerUser();
	}
	else{
		$("#register-form-form")[0].reportValidity();
		$("#reg_error").parent().parent().removeClass("hide");
		setTimeout(function(){
			$("#reg_error").parent().parent().addClass("hide");
		}, 3000);
	}
});

/**
 * Registeres the user
 *
 * Registers the user
 *
 * @author Kaleshwar Chand
 * @since 0.1
 */
function registerUser(){
	var post_data = {action: 'register',
		name : $("#name").val(),
		last_name : $("#last_name").val(),
		email : $("#email").val(),
		company_name : $("#company_name").val(),
		contact : $("#contact").val(),
		password : $("#password").val(),
		confirm_password: $("#confirm_password").val(),
		address1: $("#address-1").val(),
		address2: $("#address-2").val(),
		city: $("#city").val()};
	$(".loading").removeClass("hide");
	$.post("ajax_api.php", post_data,
		function(data){
			if(data.status == "failed"){
				$("#reg_error").html(data.message);	
				$("#reg_error").parent().parent().removeClass("hide");
				setTimeout(function(){
					$("#reg_error").parent().parent().addClass("hide");
				}, 3000);
			}
			else if(data.status == "success"){
				$(".loading").addClass("hide");
				$("#register-form").addClass("hide");
				$("#otp_div").removeClass("hide");
        $("#resend_otp").addClass("animate");
				setTimeout(function(){
					$("#resend_otp").prop("disabled", false);
          $("#resend_otp").removeClass("animate");
				}, OTP_EXPIRE * 1000);
			$("#resend_otp").attr("time",OTP_EXPIRE);
			window.otp_timer = setInterval(function(){
				updateTime();
			}, 1000);
			}
		},"json"
	);
}
$(".address").focusin(function(e){
	$(".address-container").addClass("focus");
});
$(".address").focusout(function(e){
	$(".address-container").removeClass("focus");
});
$("#submit_otp").click(function(e){
	e.preventDefault();
	e.stopPropagation();
	var otp = $("#otp").val();
	var contact = $("#contact").val();
	var post_data = {action:"verify_otp", otp:otp, contact:contact};
	$.post("ajax_api.php", post_data, function(data){
		if(data.status == "success"){
			alert("Account Created Please Login");
			window.location.href = "index.php";
		}
		else{
			alert("The OTP is incorrect");
			$("#otp").val("");
		}
	},"json");
});
$("#resend_otp").click(function(e){
	var contact = $("#contact").val();
	var post_data = {action:"resend_otp", contact:contact};
	$.post("ajax_api.php", post_data, function(data){
		$("#resend_otp").prop("disabled", true);
		alert("OTP resent");
		setTimeout(function(){
			$("#resend_otp").prop("disabled", false);
		}, OTP_EXPIRE * 1000);
		$("#resend_otp").attr("time",OTP_EXPIRE);
		$("#otp").prop("disabled", false);
		window.otp_timer = setInterval(function(){
			updateTime();
		}, 1000);
	});
});
function updateTime(){
	var time = parseInt($("#resend_otp").attr("time")) - 1;
	$("#resend_otp").attr("time",time);
	if(time >= 60){
		var time_seconds = time - 60;
		var time_minutes = 1;
	}
	else{
		var time_seconds = time;
		var time_minutes = 0;
	}
	if(time_seconds < 10){
		time_seconds = '0' + time_seconds;
	}
	if(time == 0){
		clearInterval(window.otp_timer);
		$("#resend_otp").html("Resend Otp");
		$("#otp").prop("disabled", true);
	}
	else{
		var time_str = time_minutes + ':' + time_seconds 
		$("#resend_otp").html("Resend OTP:<br/>" + time_str);
	}
}
//terms of service agree and disagree
$("#agree-terms").click(function(e){
	$("#checkagree").val(true);
	$("#terms_form").addClass("hide");
	$("#register-form").removeClass("hide");
});
$("#disagree-terms").click(function(e){
	$("#checkagree").val(false);
	$("#terms_form").addClass("hide");
	$("#register-form").removeClass("hide");
});
$("#checkagree").change(function(e){
	e.preventDefault();
	$("#register-form").addClass("hide");
	$("#terms_form").removeClass("hide");
});

/**
 * checks the registration form for required values
 *
 * checks the registration form for required values
 *
 * @return bool false if any required fields are missing and true otherwise
 * @author Kaleshwar Chand
 * @since 0.1
 */
function checkRegForm(){
	var message ="";
	if($("#name").val() == ""){
		message = "First name is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#last_name").val() == ""){
		message = "Last name is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#email").val() == ""){
		message = "Email is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#company_name").val() == ""){
		message = "Company name is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#contact").val() == ""){
		message = "Phone number is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#password").val() == ""){
		message = "Password is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#confirm_password").val() == ""){
		message = "Password Confirmation is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#checkagree").val() == false){
		message = "You must agree to terms and conditions to register";
		$("#reg_error").html(message);
		return false;
	}
	if($("#password").val() != $("#confirm_password").val()){
		message = "Passwords do not match";
		$("#reg_error").html(message);
		return false;
	}
	if($("#address-1").val() == false){
		message = "Address Line One is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#address-2").val() == false){
		message = "Address Line Two is required";
		$("#reg_error").html(message);
		return false;
	}
	if($("#city").val() == false){
		message = "City is required";
		$("#reg_error").html(message);
		return false;
	}
	return true;
}
