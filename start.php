<?php
session_start();
$host = $_SERVER['HTTP_HOST'];
define("CYBER_CLOUD",true);
if($host == 'vm' || $host == 'localhost'){
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	define('DEBUG', true);
	define('DEV', true);
}
function exceptions_error_handler($severity, $message, $filename, $lineno) 
{
	throw new ErrorException($message, 0, $severity, $filename, $lineno);
}
function exception_handler($exception) 
{
	$response = array('status'=>'failed');
	if($severity = E_USER_ERROR){
		$response['message'] = $exception->getMessage(); 
	} 
	if(defined('DEBUG')){
		$response['message'] = $exception->getMessage(); 
		$response['line'] = $exception->getLine();
		$response['file'] = $exception->getFile();
		$response['trace'] = $exception->getTrace();
	}
	echo(json_encode($response));
}

set_exception_handler('exception_handler');
set_error_handler('exceptions_error_handler');
