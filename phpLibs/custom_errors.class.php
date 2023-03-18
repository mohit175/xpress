<?php
/*
 * File for custom error class
 *
 * File for custom error class
 *
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy Cyber Pacific
 * @version 0.1
 * @since 0.1
 */

/*
 * Custom error class
 *
 * Class to handle cutom errors. All errors and exceptions will be handled 
 * through this class for now its just very simply printing out the error 
 * messages. The idea is that it can be extended without changing the rest of 
 * the code
 *
 * @author Kaleshwar Chand <kaleshwar@utech.com.fj>
 * @copy UTECH Systems (FIJI) PTE LTD 2022
 * @version 0.1
 * @since 0.1
 */
class CUSTOM_ERRORS{

  /*
   * Constructor for error class
   *
   * Constructor for error class
   */
  public function __construct(){
    
    $errors = Array();
  
  }

  /*
   * Function to handle exceptions.
   *
   * Function to handle exceptions. Prints the information in json format can be
   * easily handled using ajax functions
   *
   * @param $exception Exception to handle.
   */ 
  public function handleException($exception){
    $exp = Array();
    print_r($exception);
    $severity = $exception->getSeverity();
    if($severity === E_USER_ERROR){
      $exp['message'] = $exception->getMessage(); 
    } 
    else{
      $exp['message'] = 'An error occured please try again later.';
    }
    if(defined('DEV')){
      $exp['message'] = $exception->getMessage(); 
      $exp['line'] = $exception->getLine();
      $exp['file'] = $exception->getFile();
      $exp['trace'] = $exception->getTrace();
    }
    $this->errors[] = $exp;
    $this->log_error();
  }

  public function handlePhpError($severity, $message, $filename, $lineno){
    $err = Array();
    if($severity === E_USER_ERROR){
      $err['message'] = $message; 
    } 
    else{
      $exp['message'] = 'An error occured please try again later.';
    }
    if(defined('DEV')){
      $err['message'] = $message; 
      $err['line'] = $lineno;
      $err['file'] = $filename;
      $err['trace'] = debug_backtrace(10);
    }
    $this->errors[] = $err;
  }

  public function handleError($severity, $message){
    $err = Array();
    if($severity === E_USER_ERROR){
      $err['message'] = $message; 
    } 
    else{
      $exp['message'] = 'An error occured please try again later.';
    }
    if(defined('DEV')){
      $err['message'] = $message; 
      $err['trace'] = debug_backtrace(10);
    }
    $this->errors[] = $err;
  }
}
