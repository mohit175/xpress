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

/*
 * Database Class
 *
 * DB Class for extending mysqli functions
 *
 * @requires PHP 8.0+
 * @version 0.1
 * @since 0.1
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific www.cyberpacificfj.com
 */
Class MYSQLI_DB extends mysqli{
  
  /* static variable to store the database connection */
  public static $connection;
  
  /*
   * constructor function for the class
   *
   * Sets the database config and calls parent constructor
   * if the configuration file is given then the file is used, and if the 
   * configuration ($db_config) is given then the configuration is used and 
   * if the DB_CONFIG constant is defined then that is used the priority is
   *    1. $config_file
   *    2. $db_config variable
   *    3. DB_CONFIG constant
   * The configuration array (from any source) MUST be formatted as such
   *    Array=(
   *      db_host => 'localhost',
   *      db_user => 'database name',
   *      db_user => 'database user',
   *      db_pass => 'database pass',
   *      db_port => 3306 //optional needed to connect via TCP/IP
   *    )
   *    
   * @param string $config_file the configuration file to use
   * @param array $db_config the database configuration to use
   */
  public function __construct(string|null $config_file = null, 
                              array|null $db_config = null){
    
    //if a config file load the config file
    if($config_file !== null)
    {
      $this->setConfigFile($config_file);
      $this->loadConfigFile();
    }
    
    //if configuration is set then set database config
    else if($db_config !== null)
      $this->setDbConfig($db_config);
    
    //if database config is defined such as from external ini parser or config 
    //file then set the database configuration accordingly
    else if(defined('DB_CONFIG'))
      $this->setDbConfig(DB_CONFIG);
    
    parent::__construct();
    
    if($config_file !== null || $db_config !== null || defined('DB_CONFIG')){
      $this->connectDB(false);
    }
  }

  /*
   * Insert a row into the database
   *
   * Inserts a single row into the database, if more than one row is inserted.
   * Ideal when wanting to insert data and get the inserted id.
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for the sql
   *
   * @return int|bool returns the insert_id on success or false on failure.
   */
  public function insert(string $sql, string $types, $params): int|bool{
    if(!$stmt = $this->runSql($sql, $types, $params))
      return(false);
    if(self::$connection->affected_rows == 0)
      return(0);
    else if(self::$connection->affected_rows == 1)
      return($stmt->insert_id);
    else
      throw new Exception('More than 1 row inserted');
  }

  public function insertMulti(string $sql, string $types, ...$params){
    
  }
  
  /*
   * Updates the database 
   *
   * Updates the database based on the sql
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for the sql
   * @return bool|int returns the number of affected rows on success and false 
   * on failure
   */
  public function update(string $sql, string $types, ...$params): int|bool{
    if(!$stmt = $this->runSql($sql, $types, ...$params))
      return false;
    else{
      $stmt->store_result();
      return $self::$connection->affected_rows;
    }
  }

  /*
   * fetches the row from database
   *
   * Fetches the row from the database using the given sql
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for the sql
   * @return array array containing row from database
   */
  public function fetchRow(string $sql, string $types, ...$params){
    if(!$stmt = $this->runSql($sql, $types, ...$params))
      throw new Exception(self::connection->error);
    
    $re = $stmt->get_result();
    $rows = $stmt->num_rows;
    if($rows == 0)
      return false;
    else if($rows == 1){
      $row = $re->fetch_row();
      return($row);
    }
    else
      throw new Exception('More than 1 row returned');
  }

  /*
   * fetches an associative 
   *
   * fetches an associative row from the database 
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for the sql
   * @return array array containing row from database
   */
  public function fetchRowAssoc(string $sql, string $types, $params){
    if(!$stmt = $this->runSql($sql, $types, $params))
      throw new Exception(self::connection->error);
    $re = $stmt->get_result();
    $rows = $re->num_rows;
    if($rows == 0)
      return false;
    else if($rows == 1){
      $row = $re->fetch_assoc();
      return($row);
    }
    else
      throw new Exception('More than 1 row returned');
  }

  /*
   * fetches all rows from the database
   *
   * fetches all rows from the database
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for the sql
   * @return array array containing rows from database
   */
  public function fetchAll(string $sql, string|null $types = NULL, ...$params){
    if($types == NULL){
      $re = self::$connection->query($sql);
    }
    else{
      if(!$stmt = $this->runSql($sql, $types, ...$params))
        throw new Exception(self::connection->error);
      $re = $stmt->get_result();
    }
    $rows = $re->num_rows;
    if($rows == 0)
      return false;
    else{
      $data = $re->fetch_all();
      return($data);
    }
  }

  /*
   * fetches all rows from the database as associative array
   *
   * fetches all rows from the database as an associative array
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for the sql
   * @return array array containing rows from database
   */
  public function fetchAllAssoc(string $sql, string $types='', $params=Array()){
    if(!$stmt = $this->runSql($sql, $types, $params))
      throw new Exception(self::connection->error);
    $re = $stmt->get_result();
    $rows = $stmt->affected_rows;
    if($rows == 0)
      return false;
    else{
      $data = $re->fetch_all(MYSQLI_ASSOC);
      return($data);
    }
  }

  /*
   * fetches a single value from the database
   *
   * Fetches a single value from the database based on the sql query, assumes a 
   * prepared statement sql has been given
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for teh sql
   * @throws Exception if the query fails or if more than 1 row is returned
   * @return mixed returns value returned from the database
   */
  public function fetchValue(string $sql, string $types, ...$params){
    if(!$stmt = $this->runSql($sql, $types, ...$params))
      throw new Exception(self::connection->error);
    
    $re = $stmt->get_result();
    $rows = $re->num_rows;
    if($rows == 0)
      throw new Exception("0 rows returned");
    else if($rows == 1){
      $data = $re->fetch_row();
      return $data[0]; 
    }
    else if($rows > 1)
      throw new Exception("More than one row returned");
    else
      throw new Exception("Should never get here");
  }

  /*
   * Runs the sql given
   *
   * Runs the sql given with the bind types and values, returns false on 
   * failure or mysqli->stmt object on success
   *
   * @param string $sql the sql to run
   * @param string $types the type information to use for binding
   * @param array $params the params to bind for teh sql
   * @return bool|mysqli->stmt returns false on failure and mysqli->stmt on 
   * success
   */
  public function runSql(string $sql, string $types, $params){
    if(!$stmt = self::$connection->prepare($sql))
      throw new Exception(self::$connection->error);
    if($types != ''){
      if(!$stmt->bind_param($types, ...$params))
        throw new Exception(self::$connection->error);
    }
    if($stmt->execute())
      return($stmt);
    else
      throw new Exception(self::$connection->error);
  }


  /*
   * sets configuration file
   *
   * sets configuration file for database
   * @param $config_file
   * @throws Exception if file does not exist
   */
  public function setConfigFile(string $config_file){
    if(!file_exists($config_file)){
      throw new Exception('config file not found');
    }
    $this->config_file = $config_file; 
  }

  /*
   * loads config file
   *
   * Loads the configuration file for the database
   *
   * @throws Exception if file is not found or loading config fails for some reason
   */
  private function loadConfigFile(){
    if(!file_exists($this->config_file)){
      throw new Exception('config file not found');
    }
		$config = @parse_ini_file($this->config_file, true);
    if(!$config){
      throw new Exception('database configuration error');
    }
    $this->setDbConfig($config['mysql']);
  }

  /*
   * Sets the database configuration
   *
   * Sets the database configuration based on the config array
   *
   * @param Array $db_config an array containing the database configuration
   */
  public function setDbConfig(array $db_config){
    $this->db_config = $db_config;
  }

  /*
   * Connect to the database
   *
   * Connects to the mysql database and return the mysqli object
   *
   * @throws Exception if the mysqli connection fails or configuration is 
   * incorrect
   * @return mysqli object
   */
	public function connectDB(bool $return_conn = true){
    //check if connection is set
    if(!isset(self::$connection)){
    
      //check of configuration seems ok
      if(!isset($this->db_config)){
				throw new Exception('mysql database configuration error');	 
      }
      else{
        $db_config = $this->db_config;
      }
			if( !(isset($db_config['db_host'])) ||
				!(isset($db_config['db_user'])) ||
				!(isset($db_config['db_pass'])) ||
				!(isset($db_config['db_name'])))
			{
				throw new Exception('mysql database configuration error');	 
			}
       
      
      if(isset($db_config['db_port'])){
        //connect via TCP/IP to the database
			  self::$connection = @new mysqli($db_config['db_host'],
											$db_config['db_user'],
											$db_config['db_pass'],
                      $db_config['db_name'],
                      $db_config['db_port']);
      }
      else{  
        // connect via unix socket to the database
			  self::$connection = @new mysqli($db_config['db_host'],
											$db_config['db_user'],
											$db_config['db_pass'],
                      $db_config['db_name']);
      }
			if(self::$connection->connect_error){
				throw new Exception(self::$connection->connect_error);
			}
    }
    if($return_conn == true){
      return(self::$connection);
    }
	}

  /*
   * Returns the last error that has occured
   *
   * Returns the last error that has occured
   *
   * @return string returns the string returned by $mysqli->error
   */
  public function getError():string{
    return(self::$connection->error);
  }

  /*
   * Returns the last error code
   *
   * Returns the error code of the last error
   *
   * @return int the error code returned by $mysqli->errno
   */
  public function getErrno():int{
    return(self::$connection->errno);
  }
}
