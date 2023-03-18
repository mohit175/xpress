<?php
/*
 * File for Database Class
 *
 * File for database class to extend PHP PDO
 *
 * @package db
 * @version 0.1
 * @since 0.1
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy UTECH www.utech.com.fj
 */

/*
 * Database Class
 *
 * This database class uses PHP PDO class to make it similar enough to mysqli
 * in use that pdo and mysqli can be used interchangeably. It also attempts to 
 * to normalize the diffirences between diffirent database formats.
 * This class will also provide a way to add in data sources that have not been
 * included in PHP PDO to be used in the exact same way as far as practicle. 
 * See specific sections for details.
 *
 * @requires PHP 8.0+
 */
Class DB{
  
  /* Property to store the database connection */
  protected $connection;

  /* Property to store the last error in */
  private $last_error;

  /*
   * Constructor for the class
   *
   * This method shall attempt to determine the type of the database selected 
   * and automatically set the appropriate connector and connect to the required
   * database if all roquired options have been set.
   */
  public function __construct(string|null $config_file = null,
    array|null $db_config = null):int{
    $this->setDefaultValues();
  }

  /*
   * Sets all property values to valid or sane defaults.
   *
   * Sets all property values to valid or sane defaults. Usually this just means
   * setting it to null.
   *
   */
  private function setDefaultValues(){
    $this->connection = null;
    $this->last_error = null;
  }

  /*
   * Gets the last error for the database
   *
   * Gets the last error that has happened accorditg to the specific database
   * driver. For errors not related to database specific drivers or those that 
   * have been caught before query was sent to the database the relevant error 
   * message will be returned.
   *
   * @return string The string containing the error message.
   */
  public function getLastError(){
  }
}
