<?php
/*
 * File for config loader
 *
 * File containing the config loader class
 *
 * @package config
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific 2021 
 * @version 0.1
 * @since 0.1
 */

/*
 * CONFIG Class to load config
 *
 * Class to load the configuration and handle any custom configuration
 *
 * @requires PHP 7.0+
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific 2021
 * @version 0.1
 * @since 0.1
 */
Class CONFIG{

  /*
   * Constructor function 
   *
   * Constructor function for config class sets the config file if given
   *
   * @param string $config_file the config file to load
   * @param string $load_type define the configs or return the config array
   */ 
  public function __construct($config_file = null, $load_type = 'define'){
    $this->setLoadType($load_type);
    if($config_file !== null){
      $this->setConfigFile($config_file);
      $this->loadConfig();
    }
  }

  /*
   * sets the configuration file
   *
   * Sets the configuration file
   *
   * @param string $config_file the filename (including path)
   * @throws Exception if the file does not exist
   */
  public function setConfigFile($config_file){
    if(!file_exists($config_file)){
      throw new Exception('Config file does not exist');
    }
    $this->config_file = $config_file;
  }

  /*
   * Sets the way to load config
   * Sets the way to load the config i.e. either to return the config data or 
   * to define the config arrays
   *
   * @param string $load_type the way to load the config
   * @throws InvalidArgumentException if value for $load_type is not correct 
   */ 
  public function setLoadType($load_type = 'define'){
    if($load_type == 'define' || $load_type == 'return')
      $this->load_type = $load_type;
    else
      throw new InvalidArgumentException('Invalid value for $load_type');
  }

  /*
   * loads the configuration
   *
   * loads the configuration
   *
   * @return array returns the config array if $load_type is return 
   */ 
  public function loadConfig(){
    $config = @parse_ini_file($this->config_file, true);
    if(empty($config))
      throw new Exception('Failed loading configuration');
    if($this->load_type == 'return')
      return($config);
    foreach($config as $key => $value){
      define(strtoupper($key), $value);
    }
  }
}
