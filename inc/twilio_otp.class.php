<?php
require __DIR__ . '/vendor/autoload.php';
use Twilio\Rest\Client;
Class TWILIO_OTP{
	public function __construct($phone = null){
		$this->setOtpType();
		$this->setOtpSize();
		$this->setPhone($phone);
		$this->setBody();
		if(defined('TWILIO_ACCOUNT_SID')){
			$this->setAccountSid(TWILIO_ACCOUNT_SID);
		}
		if(defined('TWILIO_AUTH_TOKEN')){
			$this->setAuthToken(TWILIO_AUTH_TOKEN);
		}
		if(defined('TWILIO_NUMBER')){
			$this->setTwilioNumber(TWILIO_NUMBER);
		}
	}
	public function sendOtp(){
		$otp = $this->generateOtp();
		$client = new Client($this->account_sid, $this->auth_token);
		$body = str_replace('__OTP__', $otp, $this->body);
		$client->messages->create(
			$this->phone,
			array(
				'from' => $this->twilio_number,
				'body' => $body
			)
		);
		return($otp);
	}
	public function setOtpSize($size = 6){
		$this->otp_size = $size;
	}
	public function setPhone($phone){
		//remove anything that is not a number
		$phone = preg_replace('/\D/', '', $phone);
		//add plus sign in front of number as needed by twilio
		$this->phone = '+' . $phone;
	}
	public function setBody($body = null){
		if(!($body)){
			$this->body = 'Your OTP is: __OTP__'; 
		}
		else{
			$this->body = $body;
		}
	}
	public function setOtpType($digits_only = true){
		if($digits_only == true){
			$chars = '0123456789';
		}
		else{
			$chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		}
		$this->setAllowedChars($chars); 
	}
	public function setAllowedChars($chars){
		$this->allowed_chars = $chars;
	}
	public function setAccountSid($account_sid){
		$this->account_sid = $account_sid;
	}
	public function setAuthToken($auth_token){
		$this->auth_token = $auth_token;
	}
	public function setTwilioNumber($twilio_number){
		$this->twilio_number = $twilio_number;
	}
	public function generateOtp(){
		$otp = '';
		for($i = 0; $i < $this->otp_size; $i++){
			$char_loc = rand(0, strlen($this->allowed_chars) - 1);
			$char = $this->allowed_chars[$char_loc];
			$otp = $otp . $char; 
		}
		return($otp);
	}
}

