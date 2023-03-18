<?php
class Sender{

	public function __construct(){
		$this->user_name = SMS_USER;
		$this->password = SMS_API_KEY;
		$this->sender_id = SMS_SENDER_ID;
		$this->peid = SMS_PEID;
		$this->templateid = SMS_TEMPLATEID;
	}

	public function send($contact, $message){
		$url="http://sms.dynasoft.in/smsstatuswithid.aspx";
		$post_data = array(
			'mobile' => $this->user_name,
			'pass' => $this->password,
			'senderid' => $this->sender_id,
			'to' => $contact,
			'msg' => $message,
			'peid' => $this->peid,
			'templateid' => $this->templateid,
			'restype'=> 'json'
		);
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);
	}
}
