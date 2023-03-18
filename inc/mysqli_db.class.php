<?php
Class DB extends mysqli{
	protected static $connection;
	public function __construct(){
		parent::__construct();
	}
	public function connect($host = NULL, $user = NULL, $password = NULL, 
							$database = NULL, $port = NULL, $socket = NULL){

		if(!isset(self::$connection)){
			if(!file_exists('config.ini')){
				throw new Exception('config file not found');
			}
			$host = $_SERVER['HTTP_HOST'];
			$config = parse_ini_file('config.ini', true);
			if(defined('DEV') && $host == "vm" && isset($config['mysql_dev'])){
				$db_config = $config['mysql_dev'];	  
			}
			else if(defined('DEV') && $host == "localhost" && isset($config['mysql_john'])){
				$db_config = $config['mysql_john'];	  
			}
			else if(isset($config['mysql_prod'])){
				$db_config = $config['mysql_prod'];
			}
			else{
				throw new Exception('mysql database configuration error');
			}
			if( !(isset($db_config['db_host'])) ||
				!(isset($db_config['db_user'])) ||
				!(isset($db_config['db_pass'])) ||
				!(isset($db_config['db_name'])))
			{
				throw new Exception('mysql database configuration error');	 
			}
			
			self::$connection = @new mysqli($db_config['db_host'],
											$db_config['db_user'],
											$db_config['db_pass'],
											$db_config['db_name']);
			if(self::$connection->connect_error){
				throw new Exception(self::$connection->connect_error);
			}

		}
		return(self::$connection);
	}
}
