<?php
if(!defined('CYBER_CLOUD')){
  header('HTTP/1.0 401 Unauthorized');
  die('No Direct Access');
}


class VALIDATE(){
  public function __construct(){
    $this->db = new MYSQLI_DB();
  }

  /*
   * Validates the email 
   *
   * Validates the email against PHP filter functions and checks if it is 
   * already in use
   *
   * @param string $email the email to check for uses email from $_POST['email']
   *  if none is given
   * @return bool|array returns true if successful, an array with status set to
   *  false and the message if   
   */
  public function validateEmail(string $email = NULL) bool|array{
    $email = postValue($email, 'email', 'Email is required');
    
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if($email){
      $sql = "SELECT COUNT(*) FROM `user_email` WHERE `email` = ?";
      $num_emails = $this->db->fetchValue($sql, 's', $email);
      if($num_emails == 0)
        return true;
      else
        return array('status'=> false, 'msg' =>'emailAlreadyInUse');
    }
    else{
      return false;
    }
  }

  /*
   * Validates a phone number
   *
   * Validates a phone number, as phone numbers vary wildly between countries
   * and given that we will be verifying the phone numbers I find it 
   * unnessecary to actually check the format but instead we are just checking 
   * that it is not currently in use
   * 
   * @param $phone string the phone number to check
   * @return bool|array returns true on success and array with message otherwise
   */
  public function validatePhone(string $phone = NULL) bool|array{
    $phone = postValue($phone, 'phone', 'Phone is required');
    
    $phone = (int) filterNumber($phone);
    $sql = "SELECT COUNT(*) FROM `user_phone` WHERE `phone` = ?";
    $num_phones = $this->db->fetchValue($sql, 'i', $phone);
    if($num_phones == 0){
      return true;
    else
      return array('status'=> false, 'msg' =>'phoneAlreadyInUse');
    }
  }

  /*
   * Validates a name
   *
   * For now this just returns true
   */
  public function validateName(string $name = NULL) bool|array{
    return true;
  }

  /*
   * Validates a zip code
   *
   * For now this just returns true
   */
  public function validateZip(string $zip = NULL, string $country = NULL) bool|array{
    return true;
  }

  /*
   * Validates a city
   *
   * For now this just returns true
   */
  public function validateCity(string $zip = NULL, string $zip = NULL, 
                               string $country = NULL) bool|array{
    
    return true;
  }

  /*
   * Validates a country
   *
   * For now this just returns true
   */
  public function validateCountry(string $country = NULL)bool|array{
    return true;
  }
}
