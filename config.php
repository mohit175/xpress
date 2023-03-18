<?php
define('SMS_USER', '8604860412');
define('SMS_API_KEY', '233820ac6f2243e0a910e7ffea88337f');
define('SMS_SENDER_ID', 'XQuote');
define('SMS_PEID', '1201161953124881890');
define('SMS_TEMPLATEID', '1207161987293967830');

$test_sites = array("localhost","test.expressquote.in");

$host = $_SERVER['SERVER_NAME'];

if(getenv("ENV_TYPE") == 'TEST' || in_array($host, $test_sites)){
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	if(!defined('DEBUG')){
		define('DEBUG', true);
	}
}
