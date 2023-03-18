<?php
require_once('start.php');
require_once('inc/user.class.php');
$user = new User();

if(!$user->isLoggedIn()){
	$user->logout();
	header("Location: index.php");
}
