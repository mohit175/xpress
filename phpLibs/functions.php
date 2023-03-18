<?php
/*
 * File for database class
 *
 * File for Database Class to help for connections to mysql
 *
 * @package db
 * @version 0.1
 * @since 0.1
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific www.cyberpacificfj.com 
 */

if(!defined('CYBER_CLOUD')){
  header('HTTP/1.0 401 Unauthorized');
  die('No Direct Access');
}

//create a UUID
function createUID($min=10000000, $max=400000000000):array{
  $decimal_uid = random_int($min, $max);
  $base64 = decimalToBase64($decimal_uid);
  $UID = array(['decimal' => $decimal_uid, 'base64' => $base64]);
  return($UID);
}

/*
 * converts decimal to Base64
 * 
 * Converts decimal integer to base64
 *
 * @param $decimal int to convert to base64
 * @return string representation of the base64 number
 */
function decimalToBase64(int $decimal_number):string{
  $base64 = '';
  $chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  $binary_number = decbin($decimal_number);
  while(strlen($binary_number) > 0){
    if(strlen($binary_number) < 6){
      $part = $binary_number;
      $binary_number = '';
    }
    else{
      $part = substr($binary_number, -6);
      $binary_number = substr($binary_number, 0, strlen($binary_number) -6);
    }
    $base64 = $chars[bindec($part)] . $base64;
  }
  return($base64);
}

/*
 * converts base64 to decimal
 *
 * Converts base64 number to decimal number
 *
 * @param $base64 string representation of base64 number
 * @return int decimal represantanion of the number
 */
function base64ToDec(string $base64){
  $chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_+";
  $binary_number = '';
  for($i = 1; $i <= strlen($base64); $i++){
    $pos = strpos($chars, substr($base64, $i*-1, 1));
    $binary_number = str_pad(decbin($pos),6,'0',STR_PAD_LEFT) . $binary_number;
  }
  $decimal_number = bindec($binary_number);
  return($decimal_number);
}

//convert errors to exceptions
function errorHandler($severity, $message, $filename, $lineno) 
{
  global $errors;
  $errors->handlePhpError($severity, $message, $filename, $lineno);
}

//handle exceptions in the class
function exceptionHandler($exception) 
{
  global $errors;
  $errors->handleException($exception);
  return(true);
}

/*
 * Filters an integer
 * 
 * Filters a number to contain integers only
 *
 * @param string number The integer to filter
 * @return int the filtered int
 */
function filterInt(string $number):string{
  $number = preg_replace("/[^0-9]/", "", $number);
  return((int) $number);
}

/*
 * Gets a $_GET value 
 *
 * Gets the value of $_GET for the key variable, returns $value if it is not 
 * null
 *
 * @param mixed $value The defoult value to return.
 * @param string $key the key for check for.
 * @param string $message The message to throw if the key is not set or $_GET is
 * not set.
 * @throws Exception if the key is not set or $_GET is not set
 * @return mixed the value from the $_GET or the value passed in.
 */ 
function getValue($value, string $variable, string $message){
  if($value == NULL){
    if(!isset($_GET) || !isset($_GET[$variable])){
      throw new Exception($message);
    }
    return trim($_GET[$variable]);
  }
  return $value;
}

/*
 * Gets a $_REQUEST value 
 *
 * Gets the value of $_REQUEST for the key variable, returns $value if it is not 
 * null
 *
 * @param mixed $value The defoult value to return.
 * @param string $key the key for check for.
 * @param string $message The message to throw if the key is not set or $_REQUEST is
 * not set.
 * @throws Exception if the key is not set or $_REQUEST is not set
 * @return mixed the value from the $_REQUEST or the value passed in.
 */ 
function requestValue($value, string $variable, string $message){
  if($value == NULL){
    if(!isset($_REQUEST) || !isset($_REQUEST[$variable])){
      throw new Exception($message);
    }
    return trim($_REQUEST[$variable]);
  }
  return $value;
}

/*
 * Gets a $_POST value 
 *
 * Gets the value of $_POST for the key variable, returns $value if it is not 
 * null
 *
 * @param mixed $value The defoult value to return.
 * @param string $key the key for check for.
 * @param string $message The message to throw if the key is not set or $_POST is
 * not set.
 * @throws Exception if the key is not set or $_POST is not set
 * @return mixed the value from the $_POST or the value passed in.
 */ 
function postValue($value, string $variable, string $message, bool $optional=false){
  if($value == NULL){
    if(!isset($_POST) || !isset($_POST[$variable])){
      if($optional == false)
        throw new Exception($message);
      else
        return(false);
    }
    return trim($_POST[$variable]);
  }
  return $value;
}

/*
 * Creates an otp
 *
 * Creates a numeric OTP of the length desired
 *
 * @param int length The length of the OTP
 * @return int The OTP that was created
 */
function createOtp(int $length){
  $max = 10 ** $length - 1;
  $min = 10 ** ($length - 1);
  $otp = mt_rand($min, $max);
  return($otp);
}

/*
 * Gets the host name 
 *
 * Gets the host name that was used to make the request
 * TODO: for now this simply returns $_SERVER['HTTP_HOST'] need to make it more 
 * robust
 *
 * @return string the host name
 */
function get_host(){
  return($_SERVER['HTTP_HOST']);
}
