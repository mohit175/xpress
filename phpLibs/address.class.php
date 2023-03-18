<?php
/*
 * File for address class
 *
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific www.cyberpacificfj.com
 * @package user
 * @version 0.1
 */

if(!defined('CYBER_CLOUD')){
  header('HTTP/1.0 401 Unauthorized');
  die('No Direct Access');
}

/*
 * ADDRESS class for management of address
 *
 * ADDRESS class for easy management of address
 *
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy CyberPacific www.cyberpacificfj.com
 * @requires php 8.0+
 * @depends MYSQLI_DB
 */
class ADDRESS{
  
  public $user_id = GUEST_USER;
  
  /*
   * Constructor for address class
   *
   * Constructor for address class
   */ 
  public function __construct(int $user_id = GUEST_USER){
    $this->db = new MYSQLI_DB();
    $this->user_id = $user_id;
  }

  /*
   * Adds an address for the user
   *
   * Adds an address for the user
   *
   * @param string $type the address type to add
   * @param string $line_1 Line 1 of address
   * @param string $line_2 Line 2 of address
   * @param string $city the city
   * @param string $state the state
   * @param string $zip the zip code
   * @param string $country the country 
   * @return int the id of the inserted address
   */
  public function addAddress(string $type = NULL, string $line_1 = NULL, 
      string $line_2 = NULL, string $city = NULL, $state = NULL, $zip = NULL, 
      $country = NULL):int{
    $type = postValue($type, 'type', 'Type of address to add');
    $line_1 = postValue($line_1, 'line_1', 'Street Address is required');  
    $line_2 = postValue($line_2, 'line_2', 'Street Address is required');  
    $city = postValue($city, 'city', 'City is required');
    $state = postValue($state, 'state', 'State is required');
    $zip = postValue($zip, 'zip', 'Zip is required');
    $country = postValue($country, 'country', 'Country is required');
    $sql = "INSERT INTO `address`(`type`,`user_id`,`line_1`,`line_2`,`city`,
      `state`,`zip`,`country`,`user_id`) VALUES(?,?,?,?,?,?,?,?,?)";
    $params = array($type,$this->user_id,$line_1,$line_2,$city,$state,$zip,$country);
    return($this->db->insert($sql, 'sissssss', $params));
  }

  /*
   * Removes an address
   *
   * Removes an address
   *
   * @param int address_id the id of the address to remove
   */
  public function removeAddress(int $address_id = NULL){
    $address_id = postValue($address_id,'address_id','Id of address is required');
    $sql = "DELETE FROM `address` WHERE `id` = ? AND `user_id` = ?";
    $this->db->query($sql,'ii',$address_id, $this->user_id);
  }
}
