<?php
define("OTP_LENGTH",6); 
/*
 * File for user class
 *
 * File containing the user class
 *
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific www.cyberpacificfj.com
 * @package user
 * @version 0.1
 */

if(!defined('CYBER_CLOUD')){
  header('HTTP/1.0 401 Unauthorized');
  die('No Direct Access');
}

/*
 * USER class for user management
 *
 * USER class for user management 
 *
 * @author Kalsehwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific www.cyberpacificfj.com
 * @requires php 8.0+
 * @depends ACL, MYSQLI_DB, ADDRESS
 */
class USER extends ACL{

  public function __construct(){
    if(!defined("GUEST_USER")){
      define("GUEST_USER", 1);
    }
    
    $this->user_id = GUEST_USER;
    
    $this->db = new MYSQLI_DB("config.ini");
  }

  /*
   * Registers a user
   *
   * Registers a user
   */
  public function registerUser(){
    $first_name = postValue(NULL, 'first_name', '');
    $last_name = postValue(NULL, 'last_name', '');
    $password = password_hash(postValue(NULL, 'password', ''),PASSWORD_DEFAULT);
    $sql = "INSERT INTO `users`(`first_name`,`last_name`,`password`,`signup_time`)
      VALUES(?,?,?,NOW())";
    $params = array($first_name, $last_name, $password);
    $this->user_id = $this->db->insert($sql, 'sss', ...$params);
    $email_id = $this->addEmail();
    $phone_id = $this->addPhone();
    $resp = array("status"=>true,
      "resp" => array("phone_id"=>$phone_id, "email_id"=>$email_id));
    return($resp);
  }

  /*
   * Adds email
   *
   * Adds email for the current user
   *
   * @param string $email the email address to add
   * @return bool|int returns email_id on success and false on failure;
   */
  public function addEmail(string $email = NULL): bool|int{
    $email = postValue($email, 'email', 'Email is required');
    $sql = "INSERT INTO `user_email`(`email`, `user_id`) VALUES(?, ?)";
    $email_id = $this->db->insert($sql, 'si', $email, $this->user_id);
    if(gettype($email_id) == "integer"){
      return($email_id);
    }
    if($this-db->getErrno() == DUPLICATE_DATABASE_ENTRY)
      throw new Exception("Cannot remove primary phone", 0, E_USER_ERROR);
  }

  /*
   * Sends verification email 
   *
   * Sends verification email to the email
   *
   * @param int $email_id the id of the email to send the email to
   * @return bool true on success and false otherwise
   * @throws Exception if invalid email id is accessed
   * TODO add actual email sending function
   */
  public function sendVerificationEmail(int $email_id = NULL): bool{
    $email_id = (int) postValue($email_id, 'email_id','Incorrect email');
    
    //check if email belongs to user
    $sql = "SELECT `user_id` FROM `user_email` WHERE `id` = ?";
    try{
      $user_id = $this->db->fetchValue($sql, 'i', $email_id);
    }
    catch(Exception $e){
      throw new Exception('Invalid email id');
    }
    if($user_id != $this->user_id)
      throw new Exception('Attempt to verify unauthorized email');
    
    //add Otp to database
    $otp = createOtp(OTP_LENGTH);
    $sql = "INSERT INTO `email_otp`(`user_id`, `email_id`, `otp`) VALUES(?,?,?)";
    $params = array($this->user_id, $email_id, $otp);
    $this->db->insert($sql, 'iii', ...$params);
    return true;
    //actual email sending functions will come here
  }

  /*
   * Verifies email
   *
   * Verifies the email 
   *
   * @param int $email_id the id of the email to verify
   * @param int $otp the otp to use to verify
   * @return bool true on success and false otherwise  
   */
  public function verifyEmail(int $email_id = NULL, int $otp = NULL):bool{
    $email_id = (int) postValue($email_id, 'email_id', 'Incorrect email');
    $otp = (int) postValue($otp, 'otp', 'Otp must be included');
    
    $sql = "SELECT `otp` FROM `email_otp` WHERE ``email_id` = ? LIMIT 1";
    $OTP = $this->db->fetchValue($sql, 'i',  $email_id);
    if($otp == $OTP)
      return true;
    return false;
  }

  /*
   * Adds phone number 
   *
   * Adds phone number for current user
   *
   * @param string $display_phone the phone number to add
   * @return bool|int returns the email id on success and false on failure
   */
  public function addPhone(string $display_phone = NULL): bool|int{
    $display_phone = postValue($display_phone, 'phone', 'Phone is required');
    $phone = (int) filterInt($display_phone);
    $sql = "INSERT INTO `user_phone` (`phone`, `user_id`, `display_phone`)
            VALUES(?, ?, ?)";
    $params = array($phone, $this->user_id, $display_phone);
    return($this->db->insert($sql, 'iis', ...$params));
  }

  /*
   * Sends an otp to the users phone
   * 
   * Sends an otp to the users phone
   *
   * @param int $phone_id the id of the phone to  send otp to
   * @return bool true on success and false on failure
   * TODO add actual code for sending sms
   */
  public function sendOtp(int $phone_id=NULL, $phone=NULL){
    $phone_id = (int) postValue($phone_id, 'phone_id', 'Incorrect Phone');
    $phone = (int) postValue($phone, 'phone', 'Incorrect Phone');
    $otp = createOtp(OTP_LENGTH);
    $sql = "INSERT INTO `phone_otp`(`user_id`,`phone_id`,`otp`) VALUES(?,?,?)";
    $params = array($this->user_id, $phone_id, $otp);
    $this->db->insert($sql, 'iii', ...$params);
    //actual otp sending functions will come here
    $twilio = new TWILIO_OTP($phone);
    $twilio->sendOtp($otp);
    return(true);
  }


  /*
   * verifies a phone number with an otp
   *
   * Verifies a phone number with an otp
   *
   * @param int $phone_id the phone number to verify
   * @param int $otp the otp to use
   */
  public function verifyPhone(int $phone_id = NULL, int $otp = NULL){
    $phone_id = (int) postValue($phone_id, 'phone_id', 'Incorrect Phone');
    $otp = (int) postValue($otp, 'otp', 'Otp must be included');
    
    $sql = "SELECT `otp` FROM `phone_otp` WHERE `phone_id` = ? LIMIT 1";
    $OTP = $this->db->fetchValue($sql, 'i',  $phone_id);
    if($otp == $OTP)
      return true;
    return false;
  }

  /*
   * Removes a phone number
   *
   * Removes a phone number from the account
   *
   * @param $phone_id the id of the phone number to remove
   */
  public function removePhone(int $phone_id = NULL){
    $phone_id = (int) postValue($phone_id, 'phone_id', 'Incorrect Phone'); 
    if($this->isPrimaryPhone($phone_id))
      throw new Exception("Cannot remove primary phone", 0, E_USER_ERROR);
    $sql = "DELETE FROM `phone` where `phone_id` = ?";
    $this->db->query($sql, 'i', $phone_id);
    $sql = "DELETE FROM `phone_otp` = ?";
    $this->db->query($sql, 'i', $phone_id);
  }

  /*
   * Checks if the phone is the primary phone 
   *
   * Checks if the phone is the primary phone
   *
   * @param $phone_id int the phone id to check
   */
  public function isPrimaryPhone(int $phone_id = NULL){
    $phone_id = (int) postValue($phone_id, 'phone_id', 'Incorrect Phone'); 
    $sql = "SELECT `primary` from `phone` WHERE `phone_id` = ? AND `user_id` = ?";
    if($this->db->fetchValue($sql, 'ii', $phone_id, $this->user_id) === 0)
      return false;
    return true;
  }

  /*
   * Adds an address 
   *
   * Adds an address for the current user
   * 
   */
  public function addAddress(){
    $address = new address();
    $address->addAddress();
  }

  /*
   * Removes an address
   *
   * Removes an address for the current user
   */
  public function removeAddress(){
    $address = new address();
    $address->removeAddress();
  }

  /*
   * Sets the primary email for the current user
   *
   * Sets the primary email for the current user
   *
   * @param int $email_id The id of the emal to set as the primary email.
   */
  public function setPrimaryEmail(int $email_id){
    $email_id = postValue($email_id, 'email_id', 'Email id is required');
    $sql = "UPDATE `user_email` SET `is_primary` = 0 WHERE `user_id` = ?";
    $this->db->query($sql, 'i', $this->user_id);
    $sql = "UPDATE `user_email` SET `is_primary` WHERE `user_id` = ? AND `id` = ?";
    $this->db->query($sql, 'ii', $this->user_id, $email_id);
  }


  /*
   * Sets the primary phone
   *
   * Sets the primary phone for the user
   *
   * @param int $phone_id the id of the phone to set as the primary phone
   */
  public function setPrimaryPhone(int $phone_id = NULL){
    $phone_id = postValue($phone_id, 'phone_id', 'Phone id is required');
    $sql = "UPDATE `user_phone` SET `is_primary` = 0 WHERE `user_id` = ?";
    $this->db->query($sql, 'i', $this->user_id);
    $sql = "UPDATE `user_phone` SET `is_primary` = 1 WHERE `user_id` = ? AND 
      `id` = ?";
    $this->db->query($sql, 'ii', $this->user_id, $phone_id);
  }

  /*
   * Enables 2fa for the current user
   *
   */
  public function enable2fa(){
    if(!defined('TWO_FA') || TWO_FA != true)
      throw new Exception('Setting of 2FA is disabled');
    $sql = "UPDATE `users` SET `twofa` = 1 WHERE `user_id = ?";
    $this->db->query($sql,'i',$this->user_id2);
  }

  /*
   * Disables 2fa for the current user
   */
  public function disable2fa(){
    $sql = "UPDATE `users` SET `twofa` = 1 WHERE `user_id = ?";
    $this->db->query($sql,'i',$this->user_id2);
  }

  public function uploadFile(){
    $uplad_path = $this->upload_dir . '/' . $this->user_id;
    if( !file_exists( $upload_path) && !is_dir( $upload_path)){
      if( !is_writeable( $this->upload_dir) ){
        mkdir( $upload_path );
      }
      else{
        throw new Exception("Cannot create folder");
      }
    } 
    if( !is_dir($upload_path) || !is_writeable($upload_path) ){
      throw new Exception("Cannot create folder");
    }
  }
  public function addContactPerson(){
  }
  public function removeContactPerson(){
  }
  public function changePrimaryConatctPerson(){
  }
  public function login(){
  }
  public function logout(){
  }
}
