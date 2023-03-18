<?php
require_once('twilio_otp.class.php');
Class OTP extends TWILIO_OTP{
	public function __construct($phone = null){
		parent::__construct($phone);
		if(defined('TXTLOCAL_AUTH_TOKEN')){
			$this->setAuthToken(TXTLOCAL_AUTH_TOKEN);
		}
		//$this->phone = trim($this->phone, '+');
		$this->mysqli = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE); 
		if ($this->mysqli -> connect_errno) {
			echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
			exit();
		}
	}

	public function sendOtp(){
		$sql = "SELECT * FROM `users` WHERE `contact` = ?"; 
		$stmt = $this->mysqli->prepare($sql);
		$stmt->bind_param('i', $this->phone);
		$re = $stmt->execute();
		$stmt->store_result();
		if($stmt->num_rows == "0"){
			return false;
		}
		$stmt->close();
		$otp = $this->generateOtp();
		/*
		$body = str_replace('__OTP__', $otp, $this->body);
		$data = array(
			'apikey'  => urlencode($this->auth_token),
			'numbers' => $this->phone,
			'sender'  => urlencode('XpressQuote'),
			'message' => rawurlencode($body));
		$ch = curl_init('https://api.textlocal.in/send/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);
		*/
		$otp = parent::sendOtp();
		$this->saveOtp($otp);
		return($otp); 
	}
	private function saveOtp($otp){
		$sql = "UPDATE `users` SET `OTP` = ? WHERE `contact` = ?";
		$stmt = $this->mysqli->prepare($sql);
		if(!$stmt){
			print($this->mysqli->error);
		}
		$stmt->bind_param('ii', $otp, $this->phone);
		$stmt->execute();
		$stmt->close();
	}
	public function validateOtp(){
		$sql = "SELECT COUNT(*) FROM `users` WHERE `OTP` = ? AND `contact` = ?"; 
		$stmt = $this->mysqli->prepare($sql);
		$stmt->bind_param('ii', $otp, $this->phone);
		$re = $stmt->execute();
		if($re > 0){
			return true;
		}
		else{
			return false;
		}
	}
	
}
