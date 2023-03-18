<?php
define('CYBER_CLOUD','ok');
require_once("functions.php");
require_once('custom_errors.class.php');
$errors = new CUSTOM_ERRORS(); 
set_exception_handler('exceptionHandler');
set_error_handler('errorToException');
throw new Exception('test');
print('here');
