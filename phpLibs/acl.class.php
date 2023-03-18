<?php
/*
 * File for ACL class
 *
 * File for ACL class that can provide fine grained access control for users.
 *
 * @package acl
 * @version 0.1
 * @since 0.1
 * @author Anil Desai <anil.h.desai@gmail.com>
 * @copy Express Tech www.expressquote.in 
 */

if(!defined('CYBER_CLOUD')){
  header('HTTP/1.0 401 Unauthorized');
  die('No Direct Access');
}

/*
 * ACL Class
 *
 * ACL Class for providing fine grained access control for users
 *
 * @requires PHP 8.0+
 * @version 0.1
 * @since 0.1
 * @author Anil Desai <anil.h.desai@gmail.com>
 * @copy Express Tech www.expressquote.in
 */
class ACL{

  /*
   * constructor for class
   *
   * Constructor for class sets the database and userid
   */
  public function __construct(){
    $this->user_id = GUEST_USER;
    $this->db = new MYSQLI_DB();
  }

  /*
   * adds a group 
   *
   * Adds a group for the current user
   *
   * @param $group_name string the name of the group to add
   * @param $parent int the group_id of the parent
   */
  public function addGroup(string $group_name, int $parent = NULL){
    if(!$group_name)
      throw new UnexpectedValueException("Group name is required",0,E_USER_ERROR);
    if(!checkPermission("addGroup"))
      throw new Exception("User does not have permission to add group");
    if(!canAddSubGroup($parent))
      throw new Exception("Cannot add subgroup",0,E_USER_ERROR);
    $sql = "INSERT INTO `groups`(`name`,`user_id`) VALUES(?,?)";
    return($this->db->insert($sql, 'si', $group_name, $this->user_id));
  }

  /*
   * Checks if Sub Group can be added
   *
   * Checks if Sub Group can be added
   *
   * @param $group_id int the group_id to check
   * @return bool true if subgroup can be added false otherwise
   */
  public function canAddSubGroup(int $group_id):bool{
    if($group_id == NULL)
      return true;
    $sql = "SELECT `subgroup_allowed` FROM `groups` WHERE `group_id` = ?";
    if($this->db->fetchValue($sql, 'i', $group_id))
      return true;
    return false; 
  }

  /*
   * Checks if the user is owner of group
   *
   * Checks if the user is the owner of the group
   *
   * @$group_id int the group id of the group
   * @return bool true if current user is the owner and false otherwise
   */
  private function isGroupOwner(int  $group_id):bool{
    $sql = "SELECT `user_id` FROM `groups` WHERE `group_id` = ?";
    $group_owner = $this->db->fetchValue($sql, 'i', $group_id);
    if($group_owner == $this->user_id)
      return true;
    return false;
  }

  /*
   * Removes a group 
   *
   * Removes a group
   */
  public function removeGroup(){
  }
  public function addUserToGroup(){
  }
  public function removeUserFromGroup(){
  }
  public function addPermissionToUser(){
  }
  public function removePermissionFromUser(){
  }
  public function addPermissionToGroup(){
  }
  public function removePormissionFromGroup(){
  }
  public function addCountedPermissionToUser(){
  }
  public function addCountedPermissionToGroup(){
  }
  public function removeCountedPermissionFromGroup(){
  }
  public function removeCountedPermissinFromUser(){
  }
  public function setMaxLogins(){
  }
  public function checkPermission(){
  }
  public function checkCountedPermission(){
  }
}
