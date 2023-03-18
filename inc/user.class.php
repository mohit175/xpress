<?php
/**
 * File for the user class
 * 
 * File containing the class to manage users
 *
 * @package xpress
 * @author Kaleshwar Chand
 * @copyright ExpressTech
 * @version 0.1
 */

/** require mysqli_db class */
require_once('phpLibs/mysqli_db.class.php');
require_once('config.php');
require_once('sender.class.php');
require_once('vendor/autoload.php');
use GeoIp2\Database\Reader;

/**
 * Class User used to manage user.
 *
 * This class is used to manage all the user functions such as login, logout, 
 * registration, etc. 
 * Requires mysqli_db class (or other relevant class to be present).
 * Supports POST only by design.
 * 
 * @package xpress
 * @author Kaleshwar Chand
 * @since 0.1
 **/
Class User{
	
	/**
	 * constuctor function for class.
	 *
	 * This function creates and sets the database connection for use by rest 
	 * of the script.
	 * 
	 * @throws Exception if $_POST is not set.
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	public function __construct()
	{
		if(!(isset($_POST))){
			throw new Exception('Only POST is supported');
		}
		$this->db = new MYSQLI_DB("config.ini");
		$this->conn = $this->db::$connection;
    $this->pdf_path = "pdf/";
    $this->tmp_path = "tmp/";
    if(isset($_SESSION) && isset($_SESSION['user_id'])){
      $this->user_id = $_SESSION['user_id'];
    } 
	}

  public function getQuotations(){
    $user_id = $this->user_id;
    if(isset($_POST['quote_no'])){
      $quote_no_parts = explode("/",$_POST['quote_no']);
      $quote_num = $quote_no_parts[0];
      $sql = "SELECT * FROM `quotations_pdf` WHERE `user_id` = ? AND 
        `quote_num` = ?";
      $params = Array($user_id,$quote_num);
      $types = "ii";
    }
    else if(isset($_POST['estimate_no'])){
      $estimate_no = $_POST['estimate_no'];
      $sql = "SELECT `quotations_pdf`.*,`estimate_quote`.`estimate_id` FROM 
        `quotations_pdf` INNER JOIN `estimate_quote` ON 
        `estimate_quote`.`quote_id` = `quotations_pdf`.`id` WHERE 
        `quotations_pdf`.`user_id` = ? AND `estimate_quote`.`estimate_id` = ?";
      $params = Array($user_id,$estimate_no);
      $types = "ii";
    }
    else{
      $sql = "SELECT * FROM `quotations_pdf` WHERE `user_id` = ?";
      $params = Array($user_id);
      $types = "i";
      if(isset($_POST['module'])){
        $sql .= " AND `module` = ?";
        $types .="s";
        array_push($params, $_POST['module']);
      }
      if(isset($_POST['customer_id'])){
        $sql .= " AND `customer_id` = ?";
        $types .="i";
        array_push($params, $_POST['customer_id']);
      }
      if(isset($_POST['history'])){
        $sql .= " AND `created` > DATE_SUB(now(), INTERVAL ? MONTH)";
        $types .= "i";
        array_push($params, $_POST['history']);
      }
      else{ 
        if(isset($_POST['month'])){
          $sql .= " AND `created_month` = ?";
          $types .= "i";
          array_push($params, $_POST['month']);
        }
        if(isset($_POST['year'])){
          $sql .= " AND `created_year` = ?";
          $types .= "i";
          array_push($params, $_POST['year']);
        }
      }
    }
    $count = false;
    $page = $_POST['page'];
    if($page == 1){
      if(isset($_POST['estimate_no'])){
        $sql2 = str_replace('`quotations_pdf`.*,`estimate_quote`.`estimate_id`'
          ,'COUNT(*)',$sql);
      }
      else{
        $sql2 = str_replace('*','COUNT(*)',$sql);
      }
      $count = $this->db->fetchValue($sql2,$types,$params);
    }
    $start = ($page - 1) * 10;
    $sql .= " ORDER BY `quotations_pdf`.`id` DESC LIMIT ".$start.", 10";
    $rows = $this->db->fetchAllAssoc($sql,$types,$params);
    return(Array('count'=>$count, 'rows'=>$rows));
  }
  
  public function getPurchaseOrders(){
    $user_id = $this->user_id;
    if(isset($_POST['po_no'])){
      $po_no = explode("/",$_POST['po_no']);
      $po_no = $po_num[0];
      $sql = "SELECT `purchase_order`.*, `quotation`.`job_ref` FROM `purchase_order` 
        INNER JOIN `quotation` ON `purchase_order`.`estimate_num` = `quotation`.`quote_number`
        WHERE `purchase_order`.`user_id` = ? AND `purchase_order`.`po_num` = ?";
      $params = Array($user_id,$po_num);
      $types = "ii";
    }
    else if(isset($_POST['estimate_num'])){
      $estimate_num = $_POST['estimate_num'];
      $sql = "SELECT `purchase_order`.*, `quotation`.`job_ref` FROM `purchase_order` 
        INNER JOIN `quotation` ON `purchase_order`.`estimate_num` = `quotation`.`quote_number`
        WHERE `purchase_order`.`user_id` = ? AND `purchase_order`.`estimate_num` = ?";

      $params = Array($user_id,$estimate_num);
      $types = "ii";
    }
    else{
      $sql = "SELECT `purchase_order`.*, `quotation`.`job_ref` FROM `purchase_order` 
        INNER JOIN `quotation` ON `purchase_order`.`estimate_num` = `quotation`.`quote_number`
        WHERE `purchase_order`.`user_id` = ?";
      $params = Array($user_id);
      $types = "i";
      if(isset($_POST['module'])){
        $sql .= " AND `module` = ?";
        $types .="s";
        array_push($params, $_POST['module']);
      }
      if(isset($_POST['customer_id'])){
        $sql .= " AND `customer_id` = ?";
        $types .="i";
        array_push($params, $_POST['customer_id']);
      }
      if(isset($_POST['vendor_id'])){
        $sql .= " AND `vendor_id` = ?";
        $types .="i";
        array_push($params, $_POST['vendor_id']);
      }
      if(isset($_POST['history'])){
        $sql .= " AND `created` > DATE_SUB(now(), INTERVAL ? MONTH)";
        $types .= "i";
        array_push($params, $_POST['history']);
      }
      else{ 
        if(isset($_POST['month'])){
          $sql .= " AND `created_month` = ?";
          $types .= "i";
          array_push($params, $_POST['month']);
        }
        if(isset($_POST['year'])){
          $sql .= " AND `created_year` = ?";
          $types .= "i";
          array_push($params, $_POST['year']);
        }
      }
    }
    $count = false;
    $sql2 = str_replace('`purchase_order`.*, `quotation`.`job_ref`','COUNT(*)',$sql);
    $count = $this->db->fetchValue($sql2,$types,$params);
    if(!isset($_POST['estimate_num'])){
      $page = $_POST['page'];
      $start = ($page - 1) * 10;
      $sql .= " ORDER BY `purchase_order`.`id` DESC LIMIT ".$start.", 10";
    }
    else{
      $sql .= " ORDER BY `purchase_order`.`id` DESC";
    }
    $rows = $this->db->fetchAllAssoc($sql,$types,$params);
    return(Array('count'=>$count, 'rows'=>$rows));
  }

  public function getDeliveryMemos(){
    $user_id = $this->user_id;
    if(isset($_POST['delivery_no'])){
      $delivery_no_parts = explode("/",$_POST['delivery_no']);
      $delivery_num = $delivery_no_parts[0];
      $sql = "SELECT * FROM `delivery_pdf` WHERE `user_id` = ? AND 
        `delivery_num` = ?";
      $params = Array($user_id,$delivery_num);
      $types = "ii";
    }
    else if(isset($_POST['estimate_no'])){
      $estimate_no = $_POST['estimate_no'];
      $sql = "SELECT `delivery_pdf`.*,`estimate_delivery`.`estimate_id` FROM 
        `delivery_pdf` INNER JOIN `estimate_quote` ON 
        `estimate_delivery`.`delivery_id` = `delivery_pdf`.`id` WHERE 
        `delivery_pdf`.`user_id` = ? AND `estimate_delivery`.`estimate_id` = ?";
      $params = Array($user_id,$estimate_no);
      $types = "ii";
    }
    else{
      $sql = "SELECT * FROM `delivery_pdf` WHERE `user_id` = ?";
      $params = Array($user_id);
      $types = "i";
      if(isset($_POST['module'])){
        $sql .= " AND `module` = ?";
        $types .="s";
        array_push($params, $_POST['module']);
      }
      if(isset($_POST['customer_id'])){
        $sql .= " AND `customer_id` = ?";
        $types .="i";
        array_push($params, $_POST['customer_id']);
      }
      if(isset($_POST['history'])){
        $sql .= " AND `created` > DATE_SUB(now(), INTERVAL ? MONTH)";
        $types .= "i";
        array_push($params, $_POST['history']);
      }
      else{ 
        if(isset($_POST['month'])){
          $sql .= " AND `created_month` = ?";
          $types .= "i";
          array_push($params, $_POST['month']);
        }
        if(isset($_POST['year'])){
          $sql .= " AND `created_year` = ?";
          $types .= "i";
          array_push($params, $_POST['year']);
        }
      }
    }
    $count = false;
    $page = $_POST['page'];
    if($page == 1){
      if(isset($_POST['estimate_no'])){
        $sql2 = str_replace('`delivery_pdf`.*,`estimate_delivery`.`estimate_id`'
          ,'COUNT(*)',$sql);
      }
      else{
        $sql2 = str_replace('*','COUNT(*)',$sql);
      }
      $count = $this->db->fetchValue($sql2,$types,$params);
    }
    $start = ($page - 1) * 10;
    $sql .= " ORDER BY `delivery_pdf`.`id` DESC LIMIT ".$start.", 10";
    $rows = $this->db->fetchAllAssoc($sql,$types,$params);
    return(Array('count'=>$count, 'rows'=>$rows));
  }

  public function getInvoices(){
    $user_id = $this->user_id;
    if(isset($_POST['invoice_no'])){
      $invoice_no_parts = explode("/",$_POST['invoice_no']);
      $invoice_num = $invoice_no_parts[0];
      $sql = "SELECT * FROM `invoice_pdf` WHERE `user_id` = ? AND 
        `invoice_num` = ?";
      $params = Array($user_id,$quote_num);
      $types = "ii";
    }
    else if(isset($_POST['estimate_no'])){
      $estimate_no = $_POST['estimate_no'];
      $sql = "SELECT `invoice_pdf`.*,`estimate_invoice`.`estimate_id` FROM 
        `invoice_pdf` INNER JOIN `estimate_invoice` ON 
        `estimate_invoice`.`invoice_id` = `invoice_pdf`.`id` WHERE 
        `invoice_pdf`.`user_id` = ? AND `estimate_invoice`.`estimate_id` = ?";
      $params = Array($user_id,$estimate_no);
      $types = "ii";
    }
    else{
      $sql = "SELECT * FROM `invoice_pdf` WHERE `user_id` = ?";
      $params = Array($user_id);
      $types = "i";
      if(isset($_POST['module'])){
        $sql .= " AND `module` = ?";
        $types .="s";
        array_push($params, $_POST['module']);
      }
      if(isset($_POST['customer_id'])){
        $sql .= " AND `customer_id` = ?";
        $types .="i";
        array_push($params, $_POST['customer_id']);
      }
      if(isset($_POST['history'])){
        $sql .= " AND `created` > DATE_SUB(now(), INTERVAL ? MONTH)";
        $types .= "i";
        array_push($params, $_POST['history']);
      }
      else{ 
        if(isset($_POST['month'])){
          $sql .= " AND `created_month` = ?";
          $types .= "i";
          array_push($params, $_POST['month']);
        }
        if(isset($_POST['year'])){
          $sql .= " AND `created_year` = ?";
          $types .= "i";
          array_push($params, $_POST['year']);
        }
      }
    }
    $count = false;
    $page = $_POST['page'];
    if($page == 1){
      if(isset($_POST['estimate_no'])){
        $sql2 = str_replace('`invoice_pdf`.*,`estimate_invoice`.`estimate_id`'
          ,'COUNT(*)',$sql);
      }
      else{
        $sql2 = str_replace('*','COUNT(*)',$sql);
      }
      $count = $this->db->fetchValue($sql2,$types,$params);
    }
    $start = ($page - 1) * 10;
    $sql .= " ORDER BY `invoice_pdf`.`id` DESC LIMIT ".$start.", 10";
    $rows = $this->db->fetchAllAssoc($sql,$types,$params);
    return(Array('count'=>$count, 'rows'=>$rows, 'sql'=>$sql));
  }

	public function getDataList(){
		$zip_sql = "SELECT DISTINCT `zip` FROM `city` WHERE 1"; 
		$re = $this->conn->query($zip_sql);
		$zip = array_column($re->fetch_all(MYSQLI_ASSOC),'zip');
		$city_sql = "SELECT DISTINCT `admin_name2` FROM `city` WHERE 1"; 
		$re = $this->conn->query($city_sql);
		$city = array_column($re->fetch_all(MYSQLI_ASSOC),'admin_name2');
		$response = array('city'=>$city, 'zip'=>$zip);
		return($response);
	}
	public function autoComplete(){
		$type = $_GET['type'];
		$q = $_GET['q'] . '%';
		mysqli_report(MYSQLI_REPORT_ALL) ;
		if($type == 'city'){
			$sql = "SELECT DISTINCT `admin_name2` FROM `city` WHERE `admin_name2` LIKE ?";
		  $stmt = $this->conn->prepare($sql);
			$stmt->bind_param('s',$q);
			$stmt->execute();
			$result = $stmt->get_result();
			$rows = array_column($result->fetch_all(MYSQLI_ASSOC),'admin_name2');
			return($rows);
		}
	}
  public function updateUser(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
    }
    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $company_name = $_POST['company_name'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $city = $_POST['city'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $user_id = $_POST['user_id'];
    $plan = $_POST['plan'];
    $plan_expiry = $_POST['plan_expiry'];
    if($plan_expiry == ''){
      $plan_expiry = null;
    }
    $demo_expiry = $_POST['demo_expiry'];
    if($demo_expiry == ''){
      $demo_expiry = null;
    }
    $company_gstin        = $_POST['company_gstin'];
    $company_pan          = $_POST['company_pan'];
    $jurisdiction         = $_POST['jurisdiction'];
    $bank_beneficiary_name= $_POST['bank_beneficiary_name'];
    $bank_name            = $_POST['bank_name'];
    $bank_branch_name     = $_POST['bank_branch_name'];
    $bank_ac_type         = $_POST['bank_ac_type'];
    $bank_ac_num          = $_POST['bank_ac_num'];
    $bank_ifsc            = $_POST['bank_ifsc'];
    if($_POST['lifetime_plan']){
      $lifetime_plan = 1;
    }
    else{
      $lifetime_plan = 0;
    }
    $sql = "UPDATE `users` SET `name` = ?, `lastname` = ?, `company_name` = ?, 
      `address1` = ?, `address2` = ?, `city` = ?, `email` = ?, `contact` = ?,
      `demo_expire` = ?, `plan` = ?, `plan_expire` = ?, `lifetime_plan` = ?,
      `company_gstin` = ?, `company_pan` = ?, `jurisdiction` = ?, 
      `bank_beneficiary_name` = ?, `bank_name` = ?, 
      `bank_branch_name` = ?, `bank_ac_type` = ?, `bank_ac_num` = ?, 
      `bank_ifsc` = ?
      WHERE `id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('sssssssssssisssssssssi',$name, $lastname, $company_name, $address1, 
      $address2, $city, $email, $contact, $demo_expiry, $plan, $plan_expiry, 
      $lifetime_plan, $company_gstin , $company_pan , $jurisdiction , 
      $bank_beneficiary_name, $bank_name , $bank_branch_name , $bank_ac_type , 
      $bank_ac_num , $bank_ifsc , $user_id);
    $stmt->execute();
  }

  public function updateUserDetails(){
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $city = $_POST['city'];
    $company_gstin        = $_POST['company_gstin'];
    $company_pan          = $_POST['company_pan'];
    $jurisdiction         = $_POST['jurisdiction'];
    $bank_beneficiary_name= $_POST['bank_beneficiary_name'];
    $bank_name            = $_POST['bank_name'];
    $bank_branch_name     = $_POST['bank_branch_name'];
    $bank_ac_type         = $_POST['bank_ac_type'];
    $bank_ac_num          = $_POST['bank_ac_num'];
    $bank_ifsc            = $_POST['bank_ifsc'];
    $user_id = $this->user_id;

    $sql = "UPDATE `users` SET `address1` = ?, `address2` = ?, `city` = ?,
      `company_gstin` = ?, `company_pan` = ?, `jurisdiction` = ?, 
      `bank_beneficiary_name` = ?, `bank_name` = ?, 
      `bank_branch_name` = ?, `bank_ac_type` = ?, `bank_ac_num` = ?, 
      `bank_ifsc` = ?
      WHERE `id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ssssssssssssi', $address1, $address2, $city, 
      $company_gstin , $company_pan , $jurisdiction , $bank_beneficiary_name, 
      $bank_name , $bank_branch_name , $bank_ac_type , $bank_ac_num , 
      $bank_ifsc , $user_id);
    $stmt->execute();
  }
 
	public function geoLocate(){
		$reader = new Reader('GeoLite2-City.mmdb');
		$ip = $_SERVER['REMOTE_ADDR'];
		$response = new stdClass();
		$response->status = "success";
		try{
			$record = $reader->city($ip);
		}catch(Exception $e){
			$response->status = "failed";
			return($response);
		}
		$response->city = $record->city->names['en'];
		$response->zip = $record->postal->code;
		return($response);
	}

  public function getUserDetailsById(){
    $user_id = $_POST['user_id'];
		$sql = "SELECT * FROM `users` WHERE `id` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $user_id); 
		$stmt->execute();  
		$re = $stmt->get_result();		
		$user_details = $re->fetch_assoc();
		$stmt->close();
		return($user_details);
  }

	/**
	 * Gets user details from the database.
	 *
	 * Gets user details from the database based on contact.
	 *
	 * @throws ErrorException if user cannot be found
	 * @param int $contact contact number of user to get
	 * @return array cotaining the row returned from the database 
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	public function getUserDetails($contact = null){
		if($contact == null){
			$contact = $_SESSION['contact'];
		}
		$sql = "SELECT * FROM `users` WHERE `contact` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $contact); 
		$stmt->execute();  
		$re = $stmt->get_result();		
		$user_details = $re->fetch_assoc();
		$stmt->close();
		return($user_details);
	}

	/**
	 * sets the user session.
	 *
	 * Sets the user session to say that the user is logged in.
	 *
	 * @param $user_details array containing the row from the database
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	private function setUserSession($user_details){
		$_SESSION['contact'] = $user_details['contact'];
		$_SESSION['logged_in'] = true;
		$_SESSION['user_id'] = $user_details['id'];
    $_SESSION['status'] = $user_details['status'];
    if($user_details['status'] == 2){
      $_SESSION['admin'] = true;
      $_SESSION['admin_user_id'] = $user_details['id'];
		  $_SESSION['admin_contact'] = $user_details['contact'];
    }
		$_SESSION['active_id'] = $this->updateActiveSessions($user_details);
	}

  public function switchToAdmin(){
    if(!$this->isAdmin()){
      die();
    }
    $_SESSION['user_id'] = $_SESSION['admin_user_id'];
    $_SESSION['contact'] = $_SESSION['admin_contact'];
  }

  public function getCustomers(){
    $user_id = $this->user_id;
		$sql = "SELECT * FROM customer_library where user_id = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $user_id);
		$stmt->execute();
		$re = $stmt->get_result();		
		if($stmt->affected_rows != 1){
			$customers = [];
		}
		$customers = $re->fetch_all(MYSQLI_ASSOC);
		$stmt->close();
		return($customers);
  }
  
  public function getVendors(){
    $user_id = $this->user_id;
		$sql = "SELECT * FROM vendor_library where user_id = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $user_id);
		$stmt->execute();
		$re = $stmt->get_result();		
		if($stmt->affected_rows != 1){
			$customers = [];
		}
		$customers = $re->fetch_all(MYSQLI_ASSOC);
		$stmt->close();
		return($customers);
  }

  public function emulateUser(){
    $emulated_user_id = $_POST['emulated_user_id'];
    $emulated_contact = $_POST['emulated_contact'];
    if(!$this->isAdmin()){
      die();
    }
    $_SESSION['user_id'] = $emulated_user_id;
		$_SESSION['contact'] = $emulated_contact;
  }

  public function isAdmin(){
    if($this->isLoggedIn() && isset($_SESSION['admin'])){
      if($_SESSION['admin'] == true){
        return(true);
      }
    }
    return(false);
  }

	/*
	 * Updates the user session.
	 *
	 * Updates the active session table with current session and deletes extra 
	 * sessions
	 *
	 * @param $user_details array containing the user row from database
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	private function updateActiveSessions($user_details){
		$offset = $user_details['max_sessions'] - 1;
		$user_id = $user_details['id'];
		$sql = "SELECT * FROM `active_session` 
							WHERE `user` = ? 
							ORDER BY `id` DESC
							LIMIT ? , 1";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('ii', $user_id, $offset);
		$stmt->execute();
		$re = $stmt->get_result();
		if($re){
			$row = $re->fetch_assoc();
			//TODO: make sure this works
			if($row){
				$this->deleteOldSessions($row['id'], $user_id);
			}
		}
		$stmt->close();
		$active_session_id = $this->addActiveSession($user_id);	
		return($active_session_id);
	}

	/*
   * Saves user preferences
	 *
	 * Saves preferences for the current user
   *
	 * @param $s_id int the last active id that should be deleted
	 * @param $user_id the id of the user 
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */ 
  public function savePreferences(){
		$user_id = $this->user_id;
    $preferences = json_encode($_POST['preferences']);
    $sql = "UPDATE `users` SET `preferences` = ? WHERE `id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('si', $preferences, $user_id);
    $stmt->execute();
    $stmt->close();
  }

  /*
   * Saves screen defaults
   *
   * Saves screen defaults for the current user and module
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function saveScreenDefaults(){
    $user_id = $this->user_id;
    $module = $_POST['module'];
    $inputs = json_encode($_POST['inputs']);
    $sql = "SELECT `id` FROM `screen_defaults` WHERE `user_id` = ? AND `module`
      = ? LIMIT 1";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('is',$user_id,$module);
    $stmt->execute();
    $re = $stmt->get_result();
    if($re->num_rows == 0){
      $stmt->close();
      $sql = "INSERT INTO `screen_defaults`(`user_id`,`module`,`inputs`) 
        VALUES(?,?,?)";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('iss',$user_id,$module,$inputs);
    }
    else{
      $row = $re->fetch_assoc();
      $screen_default_id = $row['id'];
      $stmt->close();
      $sql = "UPDATE `screen_defaults` SET `inputs` = ? WHERE `id` = ?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('si',$inputs,$screen_default_id);
    }
    $stmt->execute();
  }

  /*
   * Loads screen defaults
   *
   * Loads screen defaults for the current user and module
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function loadScreenDefaults(){
    $user_id = $this->user_id;
    $module = $_POST['module'];
    $sql = "SELECT `inputs` FROM `screen_defaults` WHERE `user_id` = ? AND 
      `module` = ? LIMIT 1";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('is',$user_id,$module);
    $stmt->execute();
    $re = $stmt->get_result();
    if($re->num_rows == 0){
      $response = array('status'=>'failed');
    }
    else{
      $row = $re->fetch_assoc();
      $response = array('status'=>'success',
        'inputs'=>json_decode($row['inputs']));
    }
    return($response);
  }

  /*
   * gets the next binding number 
   *
   * Gets the next binding number for the current user
   *
   * @since 0.1
   */
  public function getNextBindingNumber(){
    $user_id = $this->user_id;
    $year = $this->getIndiaYear(); 
    $sql = "UPDATE `users` SET `binding_id` = `binding_id` + 1 WHERE `id` = ?";
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `binding_id` FROM `users` WHERE `id` = ?";
    $quote_num = $this->db->fetchValue($sql,'i',Array($user_id));
    $quote_num_year = $quote_num ."/" . $year;
    $ret = Array(
      'quote_num'=>$quote_num, 
      'quote_num_year'=>$quote_num_year,
      'year'=>$year);
    return($ret);
  }

  /*
   * gets the next job ticket number 
   *
   * Gets the next job ticket number for the current user
   *
   * @since 0.1
   */
  public function getNextJobTicketNumber(){
    $user_id = $this->user_id;
    $year = $this->getIndiaYear(); 
    $sql = "UPDATE `users` SET `job_ticket_num` = `job_ticket_num` + 1 WHERE `id` = ?";
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `job_ticket_num` FROM `users` WHERE `id` = ?";
    $quote_num = $this->db->fetchValue($sql,'i',Array($user_id));
    $quote_num_year = $quote_num ."/" . $year;
    $ret = Array(
      'job_ticket_num'=>$quote_num, 
      'job_ticket_num_year'=>$quote_num_year,
      'year'=>$year);
    return($ret);
  }

  /*
   * gets the next quote number 
   *
   * Gets the next quote number for the current user
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  private function getNextQuoteNum(){
    $user_id = $this->user_id;
    $sql = "UPDATE `users` SET `quote_number_counter` = `quote_number_counter`+1 
      WHERE `id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
    $stmt->execute();
    $stmt->close();
    $sql = "SELECT `quote_number_counter` FROM `users` WHERE `id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
		$stmt->execute();  
    $re = $stmt->get_result();
    $row = $re->fetch_assoc();
    return($row['quote_number_counter']);
  }

  /*
   * Loads Quotation
   *
   * Loads quotation based on the quote_id provided in the post request
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function loadQuotation($library = "user_library"){
    $quote_id = $_POST['quote_id'];
    if($library == "user_library"){
      $user_id = $this->user_id;
      $sql = "SELECT * FROM `quotation` WHERE `quote_number` = ? AND `user_id` = ?";
    }
    else{
      $sql = "SELECT * FROM `quotation` WHERE `id` = ? AND `user_id` = ?";
      $user_id = 0;
    }
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ii', $quote_id, $user_id);
		$stmt->execute();  
		$re = $stmt->get_result();		
		$output_data = $re->fetch_assoc();
    return($output_data);
  }

  public function lockQuotation(){
    $quote_id = $_POST["quote_id"];
    $sql = "UPDATE `quotation` SET `quote_lock` = 1 WHERE `quote_number` = ? 
      AND `user_id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ii', $quote_id, $this->user_id);
    $stmt->execute();
  }

  public function deleteQuotation(){
    $quote_id = $_POST["quote_id"];
    $sql = "DELETE FROM `quotation`  WHERE `quote_number` = ? 
      AND `user_id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ii', $quote_id, $this->user_id);
    $stmt->execute();
  }

  public function deleteQuotationLibrary(){
    $quote_id = $_POST["quote_id"];
    $sql = "DELETE FROM `quotation`  WHERE `id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i', $quote_id);
    $stmt->execute();
  }

  /*
   * Shows all quotations
   *
   * Shows all quotations for the current user
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function showQuotations($library = "user_library"){
    $page_length = 10;
    if($library == "user_library"){
      $user_id = $this->user_id;
    }
    else{
      $user_id = 0;
    }
    $sql = "FROM `quotation` WHERE 
      `user_id` = ?";
    $param_types = 'i';
    $params = [$user_id];
    if(!empty($_POST['month'])){
      $param_types .= 'i';
      $params[] = $_POST['month'];
      $sql .= " AND MONTH(`date`) = ?";
    }
    if(!empty($_POST['year'])){
      $param_types .= 'i';
      $params[] = $_POST['year'];
      $sql .= " AND YEAR(`date`) = ?";
    }
    if(!empty($_POST['module'])){
      $param_types .= 's';
      $params[] = $_POST['module'];
      $sql .= " AND `type` = ?";
    }
    if(!empty($_POST['customer_id'])){
      $param_types .= 'i';
      $params[] = $_POST['customer_id'];
      $sql .= " AND `customer_id` = ?";
    }
    $count_sql = "SELECT COUNT(*) " . $sql;
    $count_param_types = $param_types;
    $count_params = $params;
    if($library == 'user_library'){
      if(!empty($_POST['page'])){
        $param_types .= 'i';
        $params[] = ($_POST['page'] - 1) * $page_length;
        $sql .= " LIMIT ?, $page_length";
      }
      else{
        $sql .= " LIMIT 0, $page_length";
      }
    }
    else{
      $sql .= " ORDER BY `type`";
    }
    $sql = "SELECT `id`,`quote_lock`,`quote_number`,`customer_id`,`type`, 
      `job_ref`,`date`,`description` " . $sql;
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param($param_types, ...$params);
    $stmt->execute();
    $re = $stmt->get_result();		
    $output_data = new stdClass();
    $output_data->data = $re->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    $stmt2 = $this->conn->prepare($count_sql);
    $stmt2->bind_param($count_param_types, ...$count_params);
    $stmt2->execute();
    $re2=$stmt2->get_result();
    $output_data->rows = $re2->fetch_row()[0];
    //$output_data->rows = $this->db->fetchValue($count_sql, $count_param_types, $count_params);
    return($output_data);
  }

	/*
	 * Deletes extra sessions.
	 *
	 * Deletes any extra sessions that the user is not allowed
	 *
	 * @param $s_id int the last active id that should be deleted
	 * @param $user_id the id of the user 
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */ 
	private function deleteOldSessions($s_id, $user_id){
		$sql ='DELETE FROM `active_session` WHERE `id` <= ? AND `user` = ? ';
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('ii', $s_id, $user_id);
		$stmt->execute();
		$stmt->close();
	}

	/*
	 * Adds current session information fo the acctive sessions.
	 *
	 * Adds the current session information to the active sessions.
	 *
	 * @param $user_id int user id of logged in user
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	private function addActiveSession($user_id){
		$session_id = session_id();
		$ip = $_SERVER['REMOTE_ADDR'];
		$sql = 'INSERT INTO `active_session`(
							`session_id`, `ip`, `user`, `time_start`, `last_active`)
							VALUES(?, ?, ?, now(), now())';
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('ssi', $session_id, $ip, $user_id);
		$stmt->execute();
		$active_session_id = $this->conn->insert_id;
		return($active_session_id);
	}

  /*
   * Gets all users
   *
   * Gets list of all users
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function getUsers(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
    }
    $sql = "SELECT `id`, `status`, `email`, `name`, `lastname`, `email`,
      `contact`, `account_status`  FROM `users` WHERE `status` != 2 
      ORDER BY `id`";
		$re = $this->conn->query($sql);
		$output_data = $re->fetch_all(MYSQLI_ASSOC);
    return($output_data);
  }

  /*
   * Locks user
   *
   * Locks the user based on user_id
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function lockUser(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
    }
    $user_id = $_POST['user_id'];
    $sql = "UPDATE `users` SET `status` = 0 WHERE `id` = ? ";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
    $stmt->execute();
  }

  /*
   * Unlocks user
   *
   * Unlocks user based on user_id
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */ 
  public function unlockUser(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
    }
    $user_id = $_POST['user_id'];
    $sql = "UPDATE `users` SET `status` = 1 WHERE `id` = ? ";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
    $stmt->execute();
  }

  /*
   * Deletes user
   *
   * Deletes user based on user_id
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function deleteUser(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
    }
    $user_id = $_POST['user_id'];
    $sql = "DELETE FROM `users`  WHERE `id` = ? ";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
    $stmt->execute();
  }

  /*
   * Conifirms user
   *
   * Confirms the otp of the user and sets status to confirmed.
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function confirmUser(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
    }
    $user_id = $_POST['user_id'];
    $sql = "UPDATE `users` SET `account_status` = 'confirmed'  WHERE `id` = ? ";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
    $stmt->execute();
  }

  /*
   * Unconfirms user
   *
   * Unconfirms user OTP based on user_id by setting status to ''
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function unconfirmUser(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
    }
    $user_id = $_POST['user_id'];
    $sql = "UPDATE `users` SET `account_status` = ''  WHERE `id` = ? ";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
    $stmt->execute();
  }

	/**
	 * logs in the user.
	 *
	 * logs the user in based on the post 
	 *
	 * @throws Exception if POST data is not set
	 * @throws ErrorException if user is not found or password is incorrect.
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */ 
	public function login(){
		if(!(isset($_POST['contact']) && isset($_POST['password']))){
			throw new Exception('username and password required');
		}
		if(!($_POST['contact'] && $_POST['password'])){
			$message = 'username and password are required';
			throw new ErrorException($message, 0, E_USER_ERROR);  
		}
		
		//POST data ok get the users details
		$user_details = $this->getUserDetails($_POST['contact']);
		$user_id = $user_details['id'];
		$status = $user_details['status'];
		$account_status = $user_details['account_status'];
		//check the status of the account
		if($status == 0 || $account_status != 'confirmed'){
			$message = "Please Contact Support";
			throw new ErrorException($message, 0, E_USER_ERROR);
		}
		//check users password 
		if(!(password_verify($_POST['password'], $user_details['enc_pass']))){
			$message = 'username or password is incorrect';
			throw new ErrorException($message, 0, E_USER_ERROR);
		}
    $this->setUserSession($user_details);
	}

	/**
	 * logs out the user
	 *
	 * logs the user out and deletes the session variables and removes the entry 
	 * from active sessions
	 *
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	public function logout(){
    if($this->isAdmin()){
      if($_SESSION['user_id'] != $_SESSION['admin_user_id']){
        $_SESSION['user_id'] = $_SESSION['admin_user_id'];
      }
    }
		if(isset($_SESSION['active_id'])){
			$s_id = $_SESSION['active_id'];
			$sql ='DELETE FROM `active_session` WHERE `id` = ? ';
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param('i', $s_id);
			$stmt->execute();
			$stmt->close();
		}
    session_destroy();
	}

  /*
   * Login as a user
   *
   * Login as a user 
   * 
   * @author Kaleshwar Chand
   * @since 0.1
   */ 
  public function loginAs(){
    if($this->isAdmin() && isset($_POST['user_id'])){
      $_SESSION['user_id'] = $_POST['user_id'];
    }
  }

	/**
	 * get paper for user
	 *
	 * gets paper for user for all pages except stationery
	 *
	 * @author Kaleshwar Chand
	 * @return array array of papers from paper library
	 * @since 0.1
	 */
	public function getPaper(){
		$user_id = $this->user_id;
		$sql = "SELECT * FROM paper_library where user_id = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $user_id);
		$stmt->execute();
		$re = $stmt->get_result();		
		if($stmt->affected_rows != 1){
			$papers = [];
		}
		$papers = $re->fetch_all(MYSQLI_ASSOC);
		$stmt->close();
		return($papers);
	}

  /*
   * Edits the paper
   *
   * Updates the paper for the user based on paper_id
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
	public function editPaper(){
		$paper_name = $_POST["paper_name"];
		$paper_id = $_POST["paper_id"];
		$module = $_POST["module"];
		if($module == 'stationery'){
			$paper_cost = $_POST['paper_cost'];
			$sql = "UPDATE `stationery_paper_library` 
							SET `paper_description` = ?, `paper_cost` = ? where `id` = ?";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param('sdi', $paper_name, $paper_cost, $paper_id);
			$stmt->execute();
		}
		else{
			$sql = "UPDATE `paper_library` SET `paperlibrary` = ? where `id` = ?";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param('si', $paper_name, $paper_id);
			$stmt->execute();
		}
  }

  /*
   * Deletes paper from library
   *
   * Deletes paper from library based on paper_id
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
	public function deletePaper(){
		$paper_id = $_POST["paper_id"];
		$module = $_POST["module"];
		if($module == "stationery"){
			$sql = "DELETE FROM `stationery_paper_library` where `id` = ?";
		}
		else{
			$sql = "DELETE FROM `paper_library` where `id` = ?";
		}
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $paper_id);
		$stmt->execute();	
	}

  /*
   * Adds paper to library
   *
   * Adds paper to the paper library
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
	public function addPaper(){
		$paper_name = $_POST["paper_name"];
		$module = $_POST["module"];
		$user_id = $this->user_id;
		if($module == 'stationery'){
			$paper_cost = $_POST['paper_cost'];
			$sql = "INSERT INTO `stationery_paper_library`
							(`paper_description`,`paper_cost`,`user_id`)
							VALUES(?,?,?)";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param('sdi', $paper_name, $paper_cost, $user_id);
			$stmt->execute();
		}
		else{
			$sql = "INSERT INTO `paper_library`
							(`paperlibrary`,`user_id`)
							VALUES(?,?)";
			$stmt = $this->conn->prepare($sql);
			$stmt->bind_param('si', $paper_name, $user_id);
			$stmt->execute();
		}
  }

	/**
	 * get stationery paper for user
	 *
	 * gets stationery paper for user for all pages
	 *
	 * @author Kaleshwar Chand
	 * @return array array of papers from paper library
	 * @since 0.1
	 */
	public function getStationeryPaper(){
		$user_id = $this->user_id;
		$sql = "SELECT * FROM stationery_paper_library where user_id = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $user_id);
		$stmt->execute();
		$re = $stmt->get_result();		
		if($stmt->affected_rows != 1){
			$papers = [];
		}
		$papers = $re->fetch_all(MYSQLI_ASSOC);
		$stmt->close();
		return($papers);
	}

  /*
   * Gets admin configurable data from database
   *
   * Gets admin configurable data from database
   *
   * @param $key the key of the value to get
   */
  protected function getAdminConfig($key){
    $sql = "SELECT `value` FROM `admin_config` WHERE `name` = ?";
    $value = $this->db->fetchValue($sql, 's', Array($key));
    return($value);
  }

	/*
	 * Registers a user 
	 *
	 * Registers a user based on passed data, unique contact and email needed, 
	 * password is kept both encrypted and unencrypted for now for old system to
	 * be able to log in users
	 *
	 * @author Kaleshwar Chand
	 * @throws ErrorException if email or contact exists
	 * @throws ErrorException if required details are missing
	 * @since 0.1
	 */
	public function register(){
		if(empty($_POST['contact'])){
			$message = 'Phone number is required';
			throw new ErrorException($message, 0, E_USER_ERROR);
		} 
		$email = $_POST['email'];
		$contact = $_POST['contact'];
		$is_registered = $this->isRegistered($email, $contact);
		if($is_registered['email'] == true){
			$message = 'Email is already registered';
			throw new ErrorException($message, 0, E_USER_ERROR);
		}
		if($is_registered['contact'] == true){
			$message = 'Contact is already registered';
			throw new ErrorException($message, 0, E_USER_ERROR);
		}
		$city = $_POST['city'];
		$otp = $this->generateOTP();
		$sql = "INSERT INTO `users`
												(`status`,`created_date`,`email`,`name`,
												 `username`,`contact`,`lastname`,`quote_number_counter`,
												 `account_status`,`enc_pass`,`company_name`,
												 `address1`,`address2`,`city`,`signup_ip`,`OTP`)
												VALUES(0,NOW(),?,?,?,?,?,0,'pending',?,?,?,?,?,?,?)";
    $stmt = $this->conn->prepare($sql);
		$name = $_POST['name'];
		$password = $_POST['password'];
		$last_name = $_POST['last_name'];
		$company = $_POST['company_name'];
		$address1 = $_POST['address1'];
		$address2 = $_POST['address2'];
		$signup_ip = $_SERVER['REMOTE_ADDR'];
		$enc_pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
		$stmt->bind_param('sssssssssssi',$email, $name, $email, $contact,
																	 $last_name, $enc_pass, $company, 
																	 $address1, $address2, $city, $signup_ip,$otp);
		$stmt->execute();  
    $user_id = $this->conn->insert_id;
    $role = 1; 
    $stmt->close();
    $sql = "INSERT INTO `user_roles`(`user_id`, `role_id`) VALUES(?,?)";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ii',$user_id, $role);
    $stmt->execute();
		$this->sendOTP($otp, $contact);
    $sql = "INSERT INTO `paper`(`user_id`, `width`, `height`, `gsm`, `st_price`,
      `brand`, `type`, `name`, `user_id_name`) SELECT ?, `width`, `height`,
      `gsm`, `st_price`, `brand`, `type`, `name`, CONCAT( ?,`name`) FROM `paper`
      WHERE `user_id` = 2";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ii',$user_id, $user_id);
    $stmt->execute();
	}

  /*
   * Changes the password for a user
   *
   * Changes the password for a user by the admin
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
  public function changePassAdmin(){
    if(!$this->isAdmin()){
      return(false);
    }
    $user_id = $_POST['user_id'];
    $password = $_POST['password'];
		$enc_pass = password_hash($password, PASSWORD_DEFAULT);
    $sql ="UPDATE `users` SET `enc_pass` = ? WHERE `id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('si', $enc_pass, $user_id);
    $stmt->execute();
  }

  /*
   * Resends OTP for the user
   *
   * Resends OTP for the user
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
	public function resendOtp(){
		$otp = $this->generateOTP();
		$contact = $_POST['contact'];
		$sql = "UPDATE `users` SET `OTP` = ? WHERE `contact` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('is', $otp, $contact);
		$stmt->execute();
		$this->sendOTP($otp, $contact);	
	}

  /*
   * Verifes given OTP for the user
   *
   * Verfies given OTP for the user
   *
   * @author Kaleshwar Chand
   * @since 0.1
   */
	public function verifyOtp(){
		$contact = trim($_POST['contact'],"+");
		$otp = $_POST['otp'];
		$sql = "UPDATE `users` SET `status` = 1, `account_status` = 'confirmed'
						WHERE `contact` = ? AND `OTP` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('si', $contact, $otp);
		$stmt->execute();	
		$re = $stmt->get_result();		
		if($stmt->affected_rows == 0){
			return false;
		}
		return true;
	}

	/**
	 * Updates password for user
	 *
	 * Updates password for the current logged in user
	 *
	 * @param string $password the new password to set
	 * @param int $user_id the id of the user to change the password
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	public function updatePassword($password = null, $user_id = null){
		if($password == null){
			$password = $_POST['password'];
		}
		if($user_id == null){
			$user_id = $this->user_id;
		}
		$enc_pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
		$sql = "UPDATE `users` SET `enc_pass` = ? WHERE `id` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('si', $enc_pass, $user_id);
		$stmt->execute();
	}

  public function testSMS(){
    if(!$this->isAdmin()){
      return;
    }
    $phone = $_GET['phone'];
		$message = "Your OTP for Xpress Quote is 1234.\n\n"
						 . "-From \n" 
						 . "Xpress Quote";
    $sender = new Sender();
    $sender->send($phone,$message);
  }

	/**
	 * Sends OTP.
	 *
	 * Sends OTP to mobile number.
	 *
	 * @param int $contact phone number to send OTP to.
	 * @param string $otp otp to send
	 * @author Kaleshwar Chand
	 * @since 0.1 
	 */
	private function sendOTP($otp, $contact){
		$sender = new Sender();
		$message = "Your OTP for Xpress Quote is ".$otp.".\n\n"
						 . "-From \n" 
						 . "Xpress Quote";
		$sender->send($contact, $message);
	}
	
	/**
	 * Generates OTP.
	 *
	 * Generates OTP of length given or 4 digits by default.
	 *
	 * @param $length int length of OTP code to generate.
	 * @return string containg OTP code
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	private function generateOTP($length = 4){
		$otp = '';
		for($i = 0; $i < $length; $i++){
			$otp = $otp . rand(0,9);
		}
		return($otp);
	}
	
	/**
	 * Checks if email or contact is registered.
	 *
	 * Checks if email or contact is registered.
	 *
	 * @param $email the email to check for
	 * @param $contact the contact to check for
	 * @return array an array of bool corresponding to the email, contact
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	private function isRegistered($email = null, $contact = null){
		if(empty($email) && empty($contact)){
			$message = "Email or contact required";
			throw new Exception($message);
		}
		$response = array();
		$response['email'] = $this->isEmailRegistered($email);
		$response['contact'] = $this->isContactRegistered($contact);
		return($response);
	}

	/**
	 * Checks if email is registered.
	 *
	 * Checks if email is registerd.
	 *
	 * @return mixed returns true if email is registered and false if it is not.
	 *							returns null if email is empty.
	 * @param $email the email to check for 
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	private function isEmailRegistered($email){
		if(empty($email)){
			return(null);
		}
		$sql = "SELECT * FROM `users` WHERE `email` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $contact); 
		$stmt->execute();  
		$re = $stmt->get_result();		
		if($stmt->affected_rows == 0){
			return false;
		}
		return true;
	}

	/**
	 * Checks if contact is registered.
	 *
	 * Checks if contact is registered.
	 *
	 * @author Kaleshwar Chand
	 * @param $contact string phone number to check
	 * @return mixed returns true if $contact exists and false if it does not
	 *							 exist and returns null if $contact is empty 
	 * @since 0.1
	 */
	private function isContactRegistered($contact){
		if(empty($contact)){
			return(null);
		}
		$sql = "SELECT * FROM `users` WHERE `contact` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $contact); 
		$stmt->execute();  
		$re = $stmt->get_result();		
		if($stmt->affected_rows == 0){
			return false;
		}
		else{
			return true;
		}
	}

	/**
	 * checks if a user is logged in.
	 *
	 * Checks if a user is logged in and returns true if he is and false if not
	 *
	 * @return bool true if user is logged in and false if not
	 * @author Kaleshwar Chand
	 * @since 0.1
	 */
	public function isLoggedIn(){
		if(!isset($_SESSION)){
			return false;
		}
		//check if session variables are set
		if(!(isset($_SESSION['logged_in']) 
			&& $_SESSION['logged_in'] == true
			&& isset($_SESSION['active_id']))){
			return false;
		}
		//check if current session is registed as active session
		$active_id = $_SESSION['active_id'];
		$sql = "SELECT * FROM `active_session` WHERE `id` = ?";
		$stmt = $this->conn->prepare($sql);
		$stmt->bind_param('i', $active_id);
		$stmt->execute();
		$re = $stmt->get_result();
		//if it is not then logout
		if($stmt->affected_rows == 0){
			$this->logout();
			return false;
		}
		//user is properly logged in
		return true;
	}

  public function getToolTips(){
    $lang = $_POST['lang'];
    $all_tooltips = explode("\n",file_get_contents("tooltips.csv"));
    $tooltips = new stdClass();
    $header = str_getcsv(array_shift($all_tooltips));
    $lang_key = array_search($lang, $header);
    foreach($all_tooltips as $tooltip){
      $tooltip = str_getcsv($tooltip);
      if(isset($tooltip[0]) && $tooltip[0]!="" && isset($tooltip[$lang_key])){ 
        $name=$tooltip[0];
        $tooltips->$name = $tooltip[$lang_key];
      }
    }
    return($tooltips);
  }

  public function deleteCustomer(){
    $user_id = $this->user_id;
    $customer_id = $_POST['cust_id'];
    $sql = "UPDATE `customer_library` SET `deleted` = true WHERE `id` = ? AND `user_id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ii', $customer_id, $user_id);
    $stmt->execute();
  }

  public function addCustomer(){
    $company_name = $_POST['company_name'];
    $contact_person = $_POST['contact_person'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $shipping_address = $_POST['shipping_address'];
    $shipping_state = $_POST['shipping_state'];
    $state = $_POST['state'];
    $state_code = $_POST['state_code'];
    $gstin = $_POST['gstin'];
    $sql = "INSERT INTO `customer_library`
      (`company_name`, `person_name`, `contact_number`, `email`, `address`, 
      `state`,`state_code`,`shipping_address`,`shipping_state`,`gstin`,`user_id`) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?)";
    $params = array($company_name, $contact_person, $contact_number,
      $email, $address, $state, $state_code, $shipping_address, $shipping_state,
      $gstin, $this->user_id);
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ssisssisssi', ...$params);
    $stmt->execute();
  }
  
  public function addVendor(){
    $company_name = $_POST['company_name'];
    $contact_person = $_POST['contact_person'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $state = $_POST['state'];
    $state_code = $_POST['state_code'];
    $gstin = $_POST['gstin'];
    $sql = "INSERT INTO `vendor_library`
      (`company_name`, `person_name`, `contact_number`, `email`, `address`, 
      `state`,`state_code`,`gstin`,`user_id`) 
      VALUES(?,?,?,?,?,?,?,?,?)";
    $params = array($company_name, $contact_person, $contact_number,
      $email, $address, $state, $state_code,
      $gstin, $this->user_id);
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ssisssisi', ...$params);
    $stmt->execute();
  }
  
  public function deleteVendor(){
    $user_id = $this->user_id;
    $vendor_id = $_POST['vendor_id'];
    $sql = "DELETE FROM `vendor_library` WHERE `id` = ? AND `user_id` = ?";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ii', $vendor_id, $user_id);
    $stmt->execute();
  }
  
  public function editVendor(){
    $company_name = $_POST['company_name'];
    $contact_person = $_POST['contact_person'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $state = $_POST['state'];
    $state_code = $_POST['state_code'];
    $gstin = $_POST['gstin'];
    $id = $_POST['vendor_id'];
    $sql = "UPDATE `vendor_library` SET `company_name` = ?, `person_name` = ?, 
      `contact_number` = ?, `email` = ?, `gstin` = ?, `address` = ?, `state` = ?,
      `state_code` = ? WHERE `id` = ?";
    $params = array($company_name, $contact_person, $contact_number,
      $email, $gstin, $address, $state, $state_code, $id);
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ssissssii', ...$params);
    $stmt->execute();
  }
  
  public function editCustomer(){
    $company_name = $_POST['company_name'];
    $contact_person = $_POST['contact_person'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $shipping_address = $_POST['shipping_address'];
    $shipping_state = $_POST['shipping_state'];
    $state = $_POST['state'];
    $state_code = $_POST['state_code'];
    $gstin = $_POST['gstin'];
    $id = $_POST['cust_id'];
    $sql = "UPDATE `customer_library` SET `company_name` = ?, `person_name` = ?, 
      `contact_number` = ?, `email` = ?, `gstin` = ?, `address` = ?, `state` = ?,
      `state_code` = ?, `shipping_address` = ?, `shipping_state` = ?
      WHERE `id` = ?";
    $params = array($company_name, $contact_person, $contact_number,
      $email, $gstin, $address, $state, $state_code, $shipping_address, 
      $shipping_state, $id);
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('ssissssissi', ...$params);
    $stmt->execute();
  }

  public function saveQuotation($library = "user_library"){
    if($library == "user_library"){
      $user_id = $this->user_id;
      $quote_number = $this->getNextQuoteNum();
    }
    else{
      $user_id = 0;
      $quote_number = 0;
    }
    $inputs = json_encode($_POST['inputs']);
    $customer = $_POST['customer'];
    $job_ref = $_POST['job_ref'];
    $pdf_desc = $_POST['pdf_desc'];
    $total_quote_a = $_POST['total_quote_a'];
    $total_quote_b = $_POST['total_quote_b'];
    $total_quote_c = $_POST['total_quote_c'];
    $module = $_POST['module'];
    $qty1 = $_POST['qty_a'];
    $qty2 = $_POST['qty_b'];
    $qty3 = $_POST['qty_c'];
    $qty_op = $_POST['qty_op'];
    $date = $_POST['date'];
    $params = array($inputs, $job_ref, $pdf_desc, $total_quote_a, $total_quote_b,
      $total_quote_c, $user_id, $quote_number, $module, $customer, $qty1,
      $qty2, $qty3, $qty_op, $date);
    $sql = "INSERT INTO `quotation`(`inputs`,`job_ref`,`description`,`total_quote_a`,
      `total_quote_b`,`total_quote_c`,`user_id`,`quote_number`,`type`,`customer_id`,
      `qty1`,`qty2`,`qty3`,`qty_op`,`date`)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param('sssdddiisiiiiis', ...$params);
    $stmt->execute();
    $resp = new stdClass();
    if($library == "user_library"){
      $resp->quote_no = $quote_number;
    }
    else{
      $resp->quote_no = $stmt->insert_id;
    }
    return($resp);
  }

/*
 * Updates the quotation
 *
 * Updates the quotation for the user or mainlibrary
 *
 * @param $library the library to update one of "user_library" or
 * "main_library"
 */
  public function updateQuotation($library = "user_library"){
    if($library == "user_library"){
      $user_id = $this->user_id;
      $quote_number = $_POST["quote_no"];
    }
    else if($library =="main_library"){
      $user_id = 0;
      $quote_number = $_POST["quote_no"];
    }
    else{
      throw new Exception('Invalid Library');
    }
    $inputs = json_encode($_POST['inputs']);
    $customer = $_POST['customer'];
    $job_ref = $_POST['job_ref'];
    $pdf_desc = $_POST['pdf_desc'];
    $total_quote_a = $_POST['total_quote_a'];
    $total_quote_b = $_POST['total_quote_b'];
    $total_quote_c = $_POST['total_quote_c'];
    $module = $_POST['module'];
    $qty1 = $_POST['qty_a'];
    $qty2 = $_POST['qty_b'];
    $qty3 = $_POST['qty_c'];
    $qty_op = $_POST['qty_op'];
    if($library == "user_library"){
      $params = array($inputs, $job_ref, $pdf_desc, $total_quote_a, $total_quote_b,
        $total_quote_c, $module, $qty1, $qty2, $qty3, $qty_op, $quote_number, $user_id);
      $sql = "UPDATE `quotation` set `inputs` = ?, `job_ref` = ?, `description` = ?,
      `total_quote_a` = ?, `total_quote_b` = ?, `total_quote_c` = ?, `type` = ?,
      `qty1` = ?, `qty2` = ?,`qty3` = ?, `qty_op` = ?
      WHERE `quote_number` = ? AND `user_id` = ?";
      $types = 'sssdddsiiiiii';
    }
    else if($library =="main_library"){
      $params = array($inputs, $job_ref, $pdf_desc, $total_quote_a, $total_quote_b,
        $total_quote_c, $module, $qty1, $qty2, $qty3, $qty_op, $quote_number);
      $sql = "UPDATE `quotation` set `inputs` = ?, `job_ref` = ?, `description` = ?,
      `total_quote_a` = ?, `total_quote_b` = ?, `total_quote_c` = ?, `type` = ?,
      `qty1` = ?, `qty2` = ?,`qty3` = ?, `qty_op` = ?
      WHERE `id` = ?";
      $types = 'sssdddsiiiii';
    }
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
  }

/*
 * Gets PDF data for the template
 *
 * Gets PDF data for the template
 *
 * @return Array of the pdf template
 */
  private function getPDFData():array{
    $pdf_data = Array();
    $pdf_type = $_GET["pdf_type"];
    $user_id = $this->user_id;
    $quote_num = $_GET["quote_num"];
    $sql = "SELECT `type`,`customer_id`,`date`,`job_ref`,`description`,`qty1`,
      `qty2`,`qty3`, `qty_op`, `total_quote_a`, `total_quote_b`, `total_quote_c` FROM `quotation` 
      WHERE `quote_number` = ? AND `user_id` = ?";
    $quote = $this->db->fetchRowAssoc($sql,'ii',Array($quote_num,$user_id));
    $pdf_data['quote_no'] = $quote_num;
    $pdf_data['date'] = $this->convertDate($quote['date']);
    $pdf_data['job_ref'] = $this->escapePDF($quote["job_ref"]);
    $pdf_data['description'] = $this->escapePDF($quote["description"]);
    $this->getCompanyData($pdf_data);
    $this->getPDFText($pdf_data);
    $qty_amounts = Array(
      "qty_1" => Array("qty" => $quote['qty1'], "amount" => $quote['total_quote_a']),
      "qty_2" => Array("qty" => $quote['qty2'], "amount" => $quote['total_quote_b']),
      "qty_3" => Array("qty" => $quote['qty3'], "amount" => $quote['total_quote_c']));
    if($quote['type'] == 'calendar'){
      $qty_amounts["qty_2"]["qty"] = $quote["qty_op"];
    }
    $this->setTotalQuote($pdf_data, $qty_amounts, $quote['type']);
    $customer_id = $quote['customer_id'];
    $this->getPDFCustomerDetails($customer_id, $pdf_data);
    return($pdf_data);
  }

  private function getCompanyData(&$pdf_data){
    $user_id = $this->user_id;
    $sql = "SELECT `email`,`contact`,`company_name`,`address1`,`address2`,`city`,
      `preferences` FROM `users` WHERE `id` = ?";
    $company = $this->db->fetchRowAssoc($sql, 'i', Array($user_id));
    $pdf_data['company_name'] = $company['company_name'];
    $pdf_data['company_add_1'] = $company['address1'];
    $pdf_data['company_add_2'] = $company['address2'];
    $pdf_data['company_add_3'] = $company['city'];
    $pdf_data['company_phone'] = $company['contact'];
    $pdf_data['company_email'] = $company['email'];
    $prefs = json_decode($company['preferences']);
    $pdf_data['pdf_top_text'] = $this->escapePDF($prefs->pdf_top_text);
    $pdf_data['pdf_bottom_text'] = $this->escapePDF($prefs->pdf_bottom_text);
    $pdf_data['pdf_terms'] = $this->escapePDF($prefs->pdf_terms);
    $pdf_data['beneficiary_name'] = $prefs->bank_benefeciary_name;
    $pdf_data['bank_name'] = $prefs->bank_name;
    $pdf_data['branch_name'] = $prefs->bank_branch_name;
    $pdf_data['ac_type'] = $prefs->bank_acc_type;
    $pdf_data['ac_no'] = $prefs->bank_acc_no;
    $pdf_data['gstin'] = $prefs->company_gstin;
    $pdf_data['invoice_terms'] = $this->escapePDF($prefs->invoice_terms);
    $pdf_data['jurisdiction'] = $prefs->company_jurisdiction;
  }

  private function getPDFText(&$pdf_data){
    $user_id = $this->user_id;
    $sql = "SELECT `preferences` FROM `users` WHERE `id` = ?";
    $prefs = $this->db->fetchRowAssoc($sql, 'i', Array($user_id));
    $prefs = json_decode($prefs['preferences']);
    $pdf_data['pdf_top_text'] = $this->escapePDF($prefs->pdf_top_text);
    $pdf_data['pdf_bottom_text'] = $this->escapePDF($prefs->pdf_bottom_text);
    $pdf_data['pdf_terms'] = $this->escapePDF($prefs->pdf_terms);
  }

  private function escapePDF($pdf_text){
    $pdf_text = htmlspecialchars($pdf_text);
    $pdf_text = nl2br($pdf_text);
    return($pdf_text);
  }

/*
 * Sets the appropriate value for the quotation and quantity
 *
 * Sets the apppropriate value for the quotation and quantity
 *
 * @param $pdf_data the pdf data array
 * @param $amounts Array for the amounts for quotation
 *
 * @return int|string returns the amount to use in the p
 */ 
  private function setTotalQuote(array & $pdf_data, array $qty_amounts, 
    string $quote_type){
    $pdf_data['qty_1'] = '';
    $pdf_data['qty_2'] = '';
    $pdf_data['qty_3'] = '';
    $pdf_data['amount_1'] = '';
    $pdf_data['amount_2'] = '';
    $pdf_data['amount_3'] = '';
    $pdf_data['unit_1'] = '';
    $pdf_data['unit_2'] = '';
    $pdf_data['unit_3'] = '';
    if($quote_type == 'calendar'){
      $pdf_data['qty_1'] = $qty_amounts['qty_2']['qty'];
      $pdf_data['qty_2'] = "";
      $pdf_data['qty_3'] = "";
      $per_cal = intval($qty_amounts['qty_1']['amount'])
        / intval($qty_amounts['qty_1']['qty']);
      $per_cal_op = intval($qty_amounts['qty_2']['amount'])
        / intval($qty_amounts['qty_2']['qty']);
      $per_cal_with_op = $per_cal + $per_cal_op;
      $pdf_data['unit_1'] = round($per_cal_with_op,4);
      $pdf_data['amount_1'] = round($pdf_data['unit_1'] * $pdf_data['qty_1']);
      $pdf_data['unit_2'] = "";
      $pdf_data['unit_3'] = "";
      $pdf_data['amount_2'] = "";
      $pdf_data['amount_3'] = "";
      return;
    }
    $qty = json_decode($_GET['qty']);
    if((array_search("qty_a",$qty) !== false)&&
        ($qty_amounts['qty_1']['qty'] != "") &&
        ($qty_amounts['qty_1']['qty'] != 0)){
      $pdf_data['qty_1'] = $qty_amounts['qty_1']['qty'];
      $pdf_data['amount_1'] = $qty_amounts['qty_1']['amount'];
      $pdf_data['unit_1'] = intval($pdf_data['amount_1'])/intval($pdf_data['qty_1']);
      $pdf_data['unit_1'] = round($pdf_data['unit_1'],4);
    }
    if((array_search("qty_b",$qty) !== false)&&
        ($qty_amounts['qty_2']['qty'] != "") &&
        ($qty_amounts['qty_2']['qty'] != 0)){
      if($pdf_data['qty_1'] == ""){
        $pdf_data['qty_1'] = $qty_amounts['qty_2']['qty'];
        $pdf_data['amount_1'] = $qty_amounts['qty_2']['amount'];
        $pdf_data['unit_1'] = intval($pdf_data['amount_1'])/intval($pdf_data['qty_1']);
        $pdf_data['unit_1'] = round($pdf_data['unit_1'],4);
      }
      else{
        $pdf_data['qty_2'] = $qty_amounts['qty_2']['qty'];
        $pdf_data['amount_2'] = $qty_amounts['qty_2']['amount'];
        $pdf_data['unit_2'] = intval($pdf_data['amount_2'])/intval($pdf_data['qty_2']);
        $pdf_data['unit_2'] = round($pdf_data['unit_2'],4);
      }
    }
    if((array_search("qty_c",$qty) !== false)&&
        ($qty_amounts['qty_3']['qty'] != "") &&
        ($qty_amounts['qty_3']['qty'] != 0)){
      if($pdf_data['qty_1'] == ""){
        $pdf_data['qty_1'] = $qty_amounts['qty_3']['qty'];
        $pdf_data['amount_1'] = $qty_amounts['qty_3']['amount'];
        $pdf_data['unit_1'] = intval($pdf_data['amount_1'])/intval($pdf_data['qty_1']);
        $pdf_data['unit_1'] = round($pdf_data['unit_1'],4);
      }
      else if($pdf_data['qty_2'] == ""){
        $pdf_data['qty_2'] = $qty_amounts['qty_3']['qty'];
        $pdf_data['amount_2'] = $qty_amounts['qty_3']['amount'];
        $pdf_data['unit_2'] = intval($pdf_data['amount_2'])/intval($pdf_data['qty_2']);
        $pdf_data['unit_2'] = round($pdf_data['unit_2'],4);
      }
      else{
        $pdf_data['qty_3'] = $qty_amounts['qty_3']['qty'];
        $pdf_data['amount_3'] = $qty_amounts['qty_3']['amount'];
        $pdf_data['unit_3'] = intval($pdf_data['amount_3'])/intval($pdf_data['qty_3']);
        $pdf_data['unit_3'] = round($pdf_data['unit_3'],4);
      }
    }
  }

  private function getPDFPath(){
    $pdf_type = $_GET["pdf_type"];
    $user_id = $this->user_id;
    $sql = "SELECT `pdf_id`,`doc_type` FROM `user_pdfs` WHERE `user_id` = ? AND `pdf_type` = ?";
    $params = Array($user_id, $pdf_type);
    $pdf = $this->db->fetchRowAssoc($sql, 'is', $params);
    if(!$pdf){
      $pdf = Array(
        'id' => 0,
        'doc_type' => 'odt'
      );
    }
    else{
      $pdf['id'] = $pdf['pdf_id'];
    }
    return($pdf);
  }

  private function editPDFText(string $doc):string {
    $pdf_data = $this->getPDFData();
    foreach($pdf_data as $key => $value){
      $doc = str_replace('['.$key.']', $value, $doc);
    }
    return($doc);
  }

  private function getPDFCustomerDetails(int $customer_id, & $pdf_data){
    $sql = "SELECT * FROM `customer_library` WHERE `id` = ?";
    $customer = $this->db->fetchRowAssoc($sql, 'i', Array($customer_id));
    $pdf_data['customer_address'] = $this->escapePDF($customer['address']);
    $pdf_data['customer_phone'] = $customer['contact_number'];
    $pdf_data['customer_email'] = $customer['email'];
    $pdf_data['customer_name'] = $customer['company_name'];
  }

  private function convertDate(string $date):string{
    $date_db = explode(" ",$date);
    $date_parts = explode("-",$date_db[0]);
    $date_parts = array_reverse($date_parts);
    $date = implode("/", $date_parts);
    return($date);
  }

  public function getIndiaYear($date = NULL){
    $date = date_create($date);
    $month = date_format($date,"n");
    $year = date_format($date,"y");
    if($month < 4){
      $year2 = $year - 1;
      $india_year = $year2 . '-' . $year;
    }
    else{
      $year2 = $year + 1;
      $india_year = $year . '-' . $year2;
    }
    return($india_year);
  }
  private function getNextQuotationNumber(){
    $user_id = $this->user_id;
    $year = $this->getIndiaYear(); 
    $sql = "UPDATE `users` SET `quote_num` = `quote_num` + 1 WHERE `id` = ?";
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `quote_num` FROM `users` WHERE `id` = ?";
    $quote_num = $this->db->fetchValue($sql,'i',Array($user_id));
    $quote_num_year = $quote_num ."/" . $year;
    $ret = Array(
      'quote_num'=>$quote_num, 
      'quote_num_year'=>$quote_num_year,
      'year'=>$year);
    return($ret);
  }
  private function getNextDeliveryNumber(){
    $user_id = $this->user_id;
    $year = $this->getIndiaYear(); 
    $sql = "UPDATE `users` SET `delivery_num` = `delivery_num` + 1 WHERE `id` = ?";
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `delivery_num` FROM `users` WHERE `id` = ?";
    $delivery_num = $this->db->fetchValue($sql,'i',Array($user_id));
    $delivery_num = $delivery_num ."/" . $year;
    return($delivery_num);
  }
  private function getNextInvoiceNumber(){
    $user_id = $this->user_id;
    $year = $this->getIndiaYear(); 
    $sql = "UPDATE `users` SET `invoice_num` = `invoice_num` + 1 WHERE `id` = ?";
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `invoice_num` FROM `users` WHERE `id` = ?";
    $invoice_num = $this->db->fetchValue($sql,'i',Array($user_id));
    $invoice_num_year = $invoice_num ."/" . $year;
    $ret = Array(
      'invoice_num'=>$invoice_num, 
      'invoice_num_year'=>$invoice_num_year,
      'year'=>$year);
    return($ret);
  }
  private function getNextDeliveryMemoNumber(){
    $user_id = $this->user_id;
    $year = $this->getIndiaYear(); 
    $sql = "UPDATE `users` SET `delivery_num` = `delivery_num` + 1 WHERE `id` = ?";
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `delivery_num` FROM `users` WHERE `id` = ?";
    $invoice_num = $this->db->fetchValue($sql,'i',Array($user_id));
    $invoice_num_year = $invoice_num ."/" . $year;
    $ret = Array(
      'invoice_num'=>$invoice_num, 
      'invoice_num_year'=>$invoice_num_year,
      'year'=>$year);
    return($ret);
  }
  public function generateInvoice(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    
    //check for and create the users temp directory
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/invoice";
    
    //delete the invoice dir and recreate it to make sure no old data is there
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    $css = file_get_contents("inc/templates/invoice_delivery_style.css");
    file_put_contents($tmp_dir."/invoice_delivery_style.css",$css);
    $template = file_get_contents("inc/templates/invoice.php");
    $invoice_details = $_POST;
    $date = date_create($invoice_details['supply_date_time']);
    $date = date_format($date,"d-M-Y H:i");
    $invoice_details['supply_date_time'] = $date;
    $sql = "SELECT `company_name`,`preferences` FROM `users` WHERE `id` = ?";
    $user_details = $this->db->fetchRowAssoc($sql, 'i', Array($user_id));
    $prefs = json_decode($user_details['preferences']);
    $invoice_details['company_name'] = $user_details['company_name'];
    $invoice_details['beneficiary_name'] = $prefs->bank_benefeciary_name;
    $invoice_details['bank_name'] = $prefs->bank_name;
    $invoice_details['branch_name'] = $prefs->bank_branch_name;
    $invoice_details['ac_type'] = $prefs->bank_acc_type;
    $invoice_details['ac_no'] = $prefs->bank_acc_no;
    $invoice_details['gstin'] = $prefs->company_gstin;
    $invoice_details['company_pan'] = $prefs->company_pan;
    $invoice_details['terms'] = $prefs->invoice_terms;
    $invoice_details['jurisdiction'] = $prefs->company_jurisdiction;
    $invoice_details['state'] = $prefs->company_jurisdiction;
    $state_code = $prefs->company_state_code;
    $invoice_details['state_code'] = $state_code; 
    $sql = "SELECT `email`,`contact`,`company_name`,`address1`,`address2`,`city`,
      `preferences` FROM `users` WHERE `id` = ?";
    $company = $this->db->fetchRowAssoc($sql, 'i', Array($user_id));
    $invoice_details['company_name'] = $company['company_name'];
    $invoice_details['company_add_1'] = $company['address1'];
    $invoice_details['company_add_2'] = $company['address2'];
    $invoice_details['company_add_3'] = $company['city'];
    $invoice_details['company_phone'] = $company['contact'];
    $invoice_details['company_email'] = $company['email'];
    $invoice_num = $this->getNextInvoiceNumber();
    $invoice_details['invoice_serial_number'] = $invoice_num['invoice_num_year'];
    $date = date_create();
    $date = date_format($date,"d-M-Y");
    $invoice_details['invoice_date'] = $date;
    if($invoice_details['invoice_from'] != "standalone"){
      $customer_id = $invoice_details['customer_id'];
      $sql = "SELECT * FROM `customer_library` WHERE `id` = ?";
      $customer_details = $this->db->fetchRowAssoc($sql, 'i', Array($customer_id));
      $invoice_details['reciever_name'] = $customer_details['company_name'];
      $invoice_details['reciever_state'] = $customer_details['state'];
      $reciever_state_code = $customer_details['state_code'];
      $invoice_details['reciever_state_code'] = $reciever_state_code;
      $invoice_details['reciever_address'] = $this->escapePDF($customer_details['address']);
      $invoice_details['reciever_gstin'] = $customer_details['gstin'];
      if($invoice_details['consignee_invoice'] == "customer"){
        $invoice_details['consignee_name'] = $customer_details['company_name'];
        $invoice_details['consignee_state'] = $customer_details['state'];
        $invoice_details['consignee_address'] = $this->escapePDF($customer_details['address']);
        $invoice_details['consignee_gstin'] = $customer_details['gstin'];
      }
      else if($invoice_details['consignee_invoice'] == 'customer_shipping'){
        $invoice_details['consignee_name'] = $customer_details['company_name'];
        $invoice_details['consignee_state'] = $customer_details['shipping_state'];
        $invoice_details['consignee_address'] = $this->escapePDF($customer_details['shipping_address']);
        $invoice_details['consignee_gstin'] = $customer_details['gstin'];
      }
      if( $invoice_details['invoice_from'] == "estimate"||
          $invoice_details['invoice_from'] == "estimates"){
        $estimates = $_POST['estimates'];
        $est_sql = "SELECT `type`,`customer_id`,`date`,`job_ref`,`description`,`qty1`,
          `qty2`,`qty3`, `qty_op`, `total_quote_a`, `total_quote_b`, `total_quote_c` FROM `quotation` 
          WHERE `quote_number` = ? AND `user_id` = ?";
        $cgst_total = 0;
        $sgst_total = 0;
        $igst_total = 0;
        $amount_total = 0;
        $hsn_details = Array();
        foreach($estimates as $key => $est){
          $est_no = $est['est_no'];
          $params = Array($est_no,$user_id);
          $estimate = $this->db->fetchRowAssoc($est_sql,'ii',$params);
          if($est['qty'] == "qty_a"){
            $qty = $estimate['qty1'];
            $qty_name = 'qty_a';
            $amount = $estimate['total_quote_a'];
            $unit = number_format($estimate['total_quote_a']/$estimate['qty1'],4);
          }
          else if($est['qty'] == "qty_b"){
            $qty = $estimate['qty2'];
            $qty_name = 'qty_b';
            $amount = $estimate['total_quote_b'];
            $unit = number_format($estimate['total_quote_b']/$estimate['qty2'],4);
          }
          else if($est['qty'] == "qty_c"){
            $qty = $estimate['qty3'];
            $qty_name = 'qty_c';
            $amount = $estimate['total_quote_c'];
            $unit = number_format($estimate['total_quote_c']/$estimate['qty3'],4);
          }
          else if($est['qty'] == "qty_op"){
            $qty = $estimate["qty_op"];
            $qty_name = "qty_op";
            $op_amount = $estimate['total_quote_b'];
            $cost_per_cal_op = $op_amount / $qty;
            $blank_print_qty = $estimate['qty1'];
            $blank_print_amount = $estimate['total_quote_a'];
            $cost_per_cal_blank = $blank_print_amount / $blank_print_qty;
            $cost_per_cal_with_op = $cost_per_cal_blank + $cost_per_cal_op;
            $amount = $cost_per_cal_with_op * $qty;
            $unit = number_format($cost_per_cal_with_op,4);
          }
          $estimates[$key]['job_ref'] = $estimate['job_ref'];
          $estimates[$key]['desc'] = $this->escapePDF($estimate['description']);
          $estimates[$key]['qty'] = $qty;
          $estimates[$key]['unit'] = $unit;
          $estimates[$key]['amount'] = $amount;
          $sql = "SELECT * FROM `hsn` WHERE `id` = ?";
          $hsn = $this->db->fetchRowAssoc($sql,'i',Array($est['hsn']));
          $estimates[$key]['hsn_code'] = $hsn['hsn'];
          $cgst_rate = $hsn['cgst'];
          $cgst = $amount * $cgst_rate / 100;
          $cgst_text = number_format($cgst,2) . "<br/>@" . number_format($cgst_rate,2) . "%";
          $estimates[$key]['cgst'] = $cgst_text;
          $estimates[$key]['cgst_amount'] = $cgst;
          
          if($state_code != $reciever_state_code){
            $igst_rate = $hsn['igst'];
            $sgst_rate = 0;
          }
          else{
            $sgst_rate = $hsn['sgst'];
            $igst_rate = 0;
          }
          $sgst = $amount * $sgst_rate / 100;
          $sgst_text = number_format($sgst,2) . "<br/>@" . number_format($sgst_rate,2) . "%";
          $estimates[$key]['sgst'] = $sgst_text;
          $estimates[$key]['sgst_amount'] = $sgst;
          $igst = $amount * $igst_rate / 100;
          $igst_text = number_format($igst,2) . "<br/>@" . number_format($igst_rate,2) . "%";
          $estimates[$key]['igst'] = $igst_text;
          $estimates[$key]['igst_amount'] = $igst;
          $total_tax = 0;
          if(!isset($hsn_details[$hsn['hsn']])){
            $sub_total_tax = $cgst+$sgst+$igst;
            $total_tax+=$sub_total_tax;
            $hsn_details[$hsn['hsn']] = Array(
              'cgst_rate'=>$hsn['cgst'],'cgst_amount'=>$cgst,
              'sgst_rate'=>$sgst_rate,'sgst_amount'=>$sgst,
              'igst_rate'=>$igst_rate,'igst_amount'=>$igst,
              'hsn_code' =>$hsn['hsn'], 'taxable'=>$amount,
              'total_tax'=>$sub_total_tax
            );
          }
          else{
            $sub_total_tax = $cgst+$sgst+$igst;
            $total_tax+=$sub_total_tax;
            $hsn_details[$hsn['hsn']]['cgst_amount'] += $cgst; 
            $hsn_details[$hsn['hsn']]['sgst_amount'] += $sgst; 
            $hsn_details[$hsn['hsn']]['igst_amount'] += $igst; 
            $hsn_details[$hsn['hsn']]['taxable'] += $amount; 
            $hsn_details[$hsn['hsn']]['total_tax'] +=$sub_total_tax;
          }
          $cgst_total += $cgst; 
          $sgst_total += $sgst; 
          $igst_total += $igst; 
          $amount_total += $amount;
        }
        foreach($hsn_details as $key=>$value){
          $hsn_details[$key]['cgst_amount'] = number_format($hsn_details[$key]['cgst_amount'],2);
          $hsn_details[$key]['sgst_amount'] = number_format($hsn_details[$key]['sgst_amount'],2);
          $hsn_details[$key]['igst_amount'] = number_format($hsn_details[$key]['igst_amount'],2);
          $hsn_details[$key]['taxable'] = number_format($hsn_details[$key]['taxable'],2);
          $hsn_details[$key]['total_tax'] = number_format($hsn_details[$key]['total_tax'],2);
        }
        $invoice_details['hsn_details'] = $hsn_details;
        $invoice_details['estimates'] = $estimates;
        $invoice_details['cgst_total'] = number_format($cgst_total,2);
        $invoice_details['sgst_total'] = number_format($sgst_total,2);
        $invoice_details['igst_total'] = number_format($igst_total,2);
        $invoice_details['total_tax'] = number_format($total_tax,2);
        $invoice_details['taxable_total'] = number_format($amount_total,2);
        $net_total = $amount_total + $cgst_total + $sgst_total + $igst_total;
        $invoice_details['net_total'] = $net_total;
        $bill_amount = round($net_total);
        $round_off = $bill_amount - $invoice_details['net_total'];
        $invoice_details['bill_amount'] = number_format($bill_amount, 2);
        $invoice_details['round_off'] = number_format($round_off,2);
        $f = new NumberFormatter("en", NumberFormatter::SPELLOUT);
        $text_amount =  $f->format($bill_amount);
        $invoice_details['text_amount'] = $text_amount . " rupees only";
        $tax_rupees = floor($total_tax);
        $text_rupees =  $f->format($tax_rupees);
        $paise = round(($total_tax - $tax_rupees)*100);
        $tax_text = $text_rupees ." rupees ";
        if($paise != 0)
        {
          $text_paise = $f->format($paise);
          $tax_text = $tax_text ." and " . $text_paise . " paise ";
        }
        $invoice_details['tax_text'] = $tax_text . "only";
      }
    }
    else{
      $customer_id = 0;
      $estimates = $_POST['estimates'];
      $cgst_total = 0;
      $sgst_total = 0;
      $igst_total = 0;
      $amount_total = 0;
      foreach($estimates as $key => $est){
        $qty = $est['qty'];
        $amount = $est['amount'];
        $unit = number_format($amount/$qty,4);
        $estimates[$key]['est_no']= '';
        $estimates[$key]['desc'] = $this->escapePDF($est['desc']);
        $estimates[$key]['qty'] = $qty;
        $estimates[$key]['unit'] = $unit;
        $estimates[$key]['amount'] = $amount;
        $sql = "SELECT * FROM `hsn` WHERE `id` = ?";
        $hsn = $this->db->fetchRowAssoc($sql,'i',Array($est['hsn']));
        $estimates[$key]['hsn_code'] = $hsn['hsn'];
        $cgst_rate = $hsn['cgst'];
        $cgst = $amount * $cgst_rate / 100;
        $cgst_text = number_format($cgst,2) . " @" . number_format($cgst_rate,2) . "%";
        $estimates[$key]['cgst'] = $cgst_text;
        $estimates[$key]['cgst_amount'] = $cgst;
        
        $sgst_rate = $hsn['sgst'];
        $sgst = $amount * $sgst_rate / 100;
        $sgst_text = number_format($sgst,2) . " @" . number_format($sgst_rate,2) . "%";
        $estimates[$key]['sgst'] = $cgst_text;
        $estimates[$key]['sgst_amount'] = $sgst;
        
        $igst_rate = $hsn['igst'];
        $igst = $amount * $igst_rate / 100;
        $igst_text = number_format($igst,2) . " @" . number_format($igst_rate,2) . "%";
        $estimates[$key]['igst'] = $igst_text;
        $estimates[$key]['igst_amount'] = $igst;
        $cgst_total += $cgst; 
        $sgst_total += $sgst; 
        $igst_total += $igst; 
        $amount_total += $amount;
      }
        $invoice_details['estimates'] = $estimates;
        $invoice_details['cgst_total'] = $cgst_total;
        $invoice_details['sgst_total'] = $sgst_total;
        $invoice_details['igst_total'] = $igst_total;
        $net_total = $amount_total + $cgst_total + $sgst_total + $igst_total;
        $invoice_details['net_total'] = $net_total;
        $bill_amount = round($net_total);
        $round_off = $bill_amount - $invoice_details['net_total'];
        $invoice_details['bill_amount'] = number_format($bill_amount, 2);
        $invoice_details['round_off'] = number_format($round_off,2);
        $f = new NumberFormatter("en", NumberFormatter::SPELLOUT);
        $text_amount =  $f->format($bill_amount);
        $invoice_details['text_amount'] = $text_amount . " only";
    }
    $sql = "INSERT INTO `invoice_pdf`(`user_id`,`invoice_num`,`invoice_num_year`,
      `year`,`created_month`,`created_year`,`customer_id`,`data`) 
      VALUES(?,?,?,?,MONTH(NOW()),YEAR(NOW()),?,?)";
    $types = "iissis";
    $params = Array($user_id,$invoice_num['invoice_num'],$invoice_num['invoice_num_year'],
      $invoice_num['year'],$customer_id,json_encode($invoice_details));
    $id = $this->db->insert($sql,$types,$params);
    return($id);
  }

  public function saveJobTicket(){
    $user_id = $this->user_id;
    $html = $_POST['html'];
    $module = $_POST['module'];
    $data = $_POST['data'];
    $estimate_id = $_POST['estimate_id'];
    $job_ref = $_POST['job_ref'];
    $job_desc = $_POST['job_desc'];
    $inputs = $_POST['inputs'];
    $customer_id = $_POST['customer_id'];
    if(isset($_POST['job_ticket_num'])){
      $job_ticket_num = $_POST['job_ticket_num'];
      $job_ticket_num_year = $_POST['job_ticket_num_year'];
      $job_ticket_year = $_POST['job_ticket_year'];
    }
    else{
      $job_ticket_id = $this->getNextJobTicketNumber();
      $job_ticket_num = $job_ticket_id['job_ticket_num'];
      $job_ticket_num_year = $job_ticket_id['job_ticket_num_year'];
      $job_ticket_year = $job_ticket_id['year'];
    }
    $sql = "DELETE FROM `job_ticket` WHERE `user_id` = ? AND `estimate_id` = ?";
    $types = 'ii';
    $params = Array($user_id, $estimate_id);
    $this->db->runSql($sql,$types,$params);
    $sql = "INSERT INTO `job_ticket`(`job_ticket_id`,`job_ticket_id_year`,
      `job_ticket_year`,`user_id`,`customer_id`,`module`,`estimate_id`,`job_ref`,
      `job_desc`,`data`,`html`,`inputs`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    $params = Array($job_ticket_num,$job_ticket_num_year,$job_ticket_year,
      $user_id, $customer_id, $module, $estimate_id, $job_ref, $job_desc,
      $data,$html,$inputs);
    $types = 'issiisisssss';
    $this->db->insert($sql,$types,$params);
    $ret = Array(
      'job_ticket_num' => $job_ticket_num,
      'job_ticket_num_year' => $job_ticket_num_year,
      'job_ticket_year' => $job_ticket_year
    );
    return($ret);
  }

  public function getJobTicket(){
    $user_id = $this->user_id;
    if(isset($_POST['estimate_id'])){
      $id = $_POST['estimate_id'];
      $sql = "SELECT * FROM `job_ticket` WHERE `estimate_id` = ? AND `user_id` = ?";
    }
    else if(isset($_POST['id'])){
      $id = $_POST['id'];
      $sql = "SELECT * FROM `job_ticket` WHERE `id` = ? AND `user_id` = ?";
    }
    $types = "ii";
    $params = Array($id,$user_id);
    $row = $this->db->fetchRowAssoc($sql,$types,$params);
    return($row);
  }

  public function generateJobTicketPDFDirect(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/job_ticket";
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    $file = $tmp_dir.'/job_ticket.php';
    $pages = $_POST['pages'];
    $template_file = "inc/templates/job_ticket.php";
    $template = file_get_contents($template_file);
    $final_cmd = "pdfunite ";
    foreach($pages as $key => $page){
      $out_file = $tmp_dir . "/job_ticket_" . $key . ".html";
      $pdf_file = $tmp_dir . "/job_ticket_" . $key . ".pdf";
      $final_cmd = $final_cmd . $pdf_file . " ";
      $html_template = str_replace('[sample]', $page, $template);
      file_put_contents($out_file,$html_template);
      $cmd = "chromium --headless --disable-gpu --print-to-pdf-no-header "
        . "--print-to-pdf=" . $pdf_file . " " . $out_file;
      shell_exec($cmd);
    }
    $final_cmd = $final_cmd . $tmp_dir . "/job_ticket.pdf";
    shell_exec($final_cmd);
    return($tmp_dir . "/job_ticket.pdf");
  }
  public function generateDeliveryMemo(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    
    //check for and create the users temp directory
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/delivery_memo";
    
    //delete the invoice dir and recreate it to make sure no old data is there
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    $css = file_get_contents("inc/templates/invoice_delivery_style.css");
    file_put_contents($tmp_dir."/invoice_delivery_style.css",$css);
    $template = file_get_contents("inc/templates/delivery.php");
    $invoice_details = $_POST;
    $date = date_create($invoice_details['supply_date_time']);
    $date = date_format($date,"d-M-Y H:i");
    $invoice_details['supply_date_time'] = $date;
    $sql = "SELECT `company_name`,`preferences` FROM `users` WHERE `id` = ?";
    $user_details = $this->db->fetchRowAssoc($sql, 'i', Array($user_id));
    $prefs = json_decode($user_details['preferences']);
    $invoice_details['company_name'] = $user_details['company_name'];
    $invoice_details['beneficiary_name'] = $prefs->bank_benefeciary_name;
    $invoice_details['bank_name'] = $prefs->bank_name;
    $invoice_details['branch_name'] = $prefs->bank_branch_name;
    $invoice_details['ac_type'] = $prefs->bank_acc_type;
    $invoice_details['ac_no'] = $prefs->bank_acc_no;
    $invoice_details['gstin'] = $prefs->company_gstin;
    $invoice_details['company_pan'] = $prefs->company_pan;
    $invoice_details['terms'] = $prefs->invoice_terms;
    $invoice_details['jurisdiction'] = $prefs->company_jurisdiction;
    $invoice_details['state'] = $prefs->company_jurisdiction;
    $state_code = $prefs->company_state_code;
    $invoice_details['state_code'] = $state_code; 
    $sql = "SELECT `email`,`contact`,`company_name`,`address1`,`address2`,`city`,
      `preferences` FROM `users` WHERE `id` = ?";
    $company = $this->db->fetchRowAssoc($sql, 'i', Array($user_id));
    $invoice_details['company_name'] = $company['company_name'];
    $invoice_details['company_add_1'] = $company['address1'];
    $invoice_details['company_add_2'] = $company['address2'];
    $invoice_details['company_add_3'] = $company['city'];
    $invoice_details['company_phone'] = $company['contact'];
    $invoice_details['company_email'] = $company['email'];
    $invoice_num = $this->getNextDeliveryMemoNumber();
    $invoice_details['delivery_note_no'] = $invoice_num['invoice_num_year'];
    $date = date_create();
    $date = date_format($date,"d-M-Y");
    $invoice_details['delivery_note_date'] = $date;
    if($invoice_details['invoice_from'] != "standalone"){
      $customer_id = $invoice_details['customer_id'];
      $sql = "SELECT * FROM `customer_library` WHERE `id` = ?";
      $customer_details = $this->db->fetchRowAssoc($sql, 'i', Array($customer_id));
      $invoice_details['reciever_name'] = $customer_details['company_name'];
      $invoice_details['reciever_state'] = $customer_details['state'];
      $reciever_state_code = $customer_details['state_code'];
      $invoice_details['reciever_state_code'] = $reciever_state_code;
      $invoice_details['reciever_address'] = $customer_details['address'];
      $invoice_details['reciever_gstin'] = $customer_details['gstin'];
      if($invoice_details['consignee_invoice'] == "customer"){
        $invoice_details['consignee_name'] = $customer_details['company_name'];
        $invoice_details['consignee_state'] = $customer_details['state'];
        $invoice_details['consignee_address'] = $customer_details['address'];
        $invoice_details['consignee_gstin'] = $customer_details['gstin'];
      }
      else if($invoice_details['consignee_invoice'] == 'customer_shipping'){
        $invoice_details['consignee_name'] = $customer_details['company_name'];
        $invoice_details['consignee_state'] = $customer_details['shipping_state'];
        $invoice_details['consignee_address'] = $customer_details['shipping_address'];
        $invoice_details['consignee_gstin'] = $customer_details['gstin'];
      }
      if( $invoice_details['invoice_from'] == "estimate"||
          $invoice_details['invoice_from'] == "estimates"){
        $estimates = $_POST['estimates'];
        $est_sql = "SELECT `type`,`customer_id`,`date`,`job_ref`,`description`,`qty1`,
          `qty2`,`qty3`, `qty_op`, `total_quote_a`, `total_quote_b`, `total_quote_c` FROM `quotation` 
          WHERE `quote_number` = ? AND `user_id` = ?";
        $hsn_details = Array();
        foreach($estimates as $key => $est){
          $est_no = $est['est_no'];
          $params = Array($est_no,$user_id);
          $estimate = $this->db->fetchRowAssoc($est_sql,'ii',$params);
          if($est['qty'] == "qty_a"){
            $qty = $estimate['qty1'];
            $qty_name = 'qty_a';
          }
          else if($est['qty'] == "qty_b"){
            $qty = $estimate['qty2'];
            $qty_name = 'qty_b';
          }
          else if($est['qty'] == "qty_c"){
            $qty = $estimate['qty3'];
            $qty_name = 'qty_c';
          }
          else if($est['qty'] == "qty_op"){
            $qty = $estimate['qty_op'];
            $qty_name = "qty_op";
          }
          $estimates[$key]['desc'] = $this->escapePDF($estimate['description']);
          $estimates[$key]['job_ref'] = $this->escapePDF($estimate['job_ref']);
          $estimates[$key]['qty'] = $qty;
          $sql = "SELECT * FROM `hsn` WHERE `id` = ?";
          $hsn = $this->db->fetchRowAssoc($sql,'i',Array($est['hsn']));
          $estimates[$key]['hsn_code'] = $hsn['hsn'];
        }
        $invoice_details['estimates'] = $estimates;
      }
    }
    else{
      $customer_id = 0;
      $estimates = $_POST['estimates'];
      foreach($estimates as $key => $est){
        $qty = $est['qty'];
        $estimates[$key]['desc'] = $this->escapePDF($est['desc']);
        $estimates[$key]['qty'] = $qty;
        $sql = "SELECT * FROM `hsn` WHERE `id` = ?";
        $hsn = $this->db->fetchRowAssoc($sql,'i',Array($est['hsn']));
        $estimates[$key]['hsn_code'] = $hsn['hsn'];
      }
        $invoice_details['estimates'] = $estimates;
    }
    $sql = "INSERT INTO `delivery_pdf`(`user_id`,`delivery_num`,`delivery_num_year`,
      `year`,`created_month`,`created_year`,`customer_id`,`data`) 
      VALUES(?,?,?,?,MONTH(NOW()),YEAR(NOW()),?,?)";
    $types = "iissis";
    $params = Array($user_id,$invoice_num['invoice_num'],$invoice_num['invoice_num_year'],
      $invoice_num['year'],$customer_id,json_encode($invoice_details));
    $id = $this->db->insert($sql,$types,$params);
    return($id);
  }
  public function generateQuotation(){
    $estimates = $_POST['estimates'];
    $user_id = $this->user_id;
    $pdf_data = Array();
    $customer_id = $_POST['customer_id'];
    $this->getCompanyData($pdf_data);
    $this->getCustomerDataPDF($pdf_data,$customer_id);
    $this->getCompanyData($pdf_data);
    $this->getPDFText($pdf_data);
    $quote_num = $this->getNextQuotationNumber();
    $quote_for = $_POST['quote_for'];
    $pdf_data['quote_num'] = $quote_num['quote_num_year'];
    $pdf_data['estimates'] = Array();
    $date = date_create();
    $pdf_data['date'] = date_format($date,"d-M-Y");
    $sql = "SELECT `type`,`customer_id`,`date`,`job_ref`,`description`,`qty1`,
      `qty2`,`qty3`, `qty_op`, `total_quote_a`, `total_quote_b`, `total_quote_c` FROM `quotation` 
      WHERE `quote_number` = ? AND `user_id` = ?";
    foreach($estimates as $key => $est){
      $params = Array($est['est_no'],$user_id);
      $estimate = $this->db->fetchRowAssoc($sql,'ii',$params);
      $qty_amounts = Array();
      if($est['qty']['qty_a'] == "true"){
        $qty_array = Array();
        $qty_array['qty'] = $estimate['qty1'];
        $qty_array['qty_name'] = 'qty_a';
        $qty_array['amount'] = $estimate['total_quote_a'];
        $qty_array['unit'] = number_format($estimate['total_quote_a']/$estimate['qty1'],4);
        array_push($qty_amounts,$qty_array);
      }
      if($est['qty']['qty_b'] == "true"){
        $qty_array = Array();
        $qty_array['qty'] = $estimate['qty2'];
        $qty_array['qty_name'] = 'qty_b';
        $qty_array['amount'] = $estimate['total_quote_b'];
        $qty_array['unit'] = number_format($estimate['total_quote_b']/$estimate['qty2'],4);
        array_push($qty_amounts,$qty_array);
      }
      if($est['qty']['qty_c'] == "true"){
        $qty_array = Array();
        $qty_array['qty'] = $estimate['qty3'];
        $qty_array['qty_name'] = 'qty_c';
        $qty_array['amount'] = $estimate['total_quote_c'];
        $qty_array['unit'] = number_format($estimate['total_quote_c']/$estimate['qty3'],4);
        array_push($qty_amounts,$qty_array);
      }
      if($est['qty']['qty_op'] == "true"){
        $qty_array = Array();
        $op_qty = $estimate['qty_op'];
        $blank_qty = $estimate['qty1'];
        $qty_array['qty'] = $op_qty;
        $op_amount = $estimate['total_quote_b'];
        $blank_print_amount = $estimate['total_quote_a'];
        $blank_print_per_calendar = $blank_print_amount / $blank_qty;
        $op_cost_per_calendar = $op_amount / $op_qty;
        $total_cost_per_calendar = $blank_print_per_calendar + $op_cost_per_calendar;
        $total_amount = $total_cost_per_calendar * $op_qty;
        $qty_array['amount'] = $total_amount;
        $qty_array['unit'] = number_format($total_cost_per_calendar,4);
        array_push($qty_amounts,$qty_array);
      }
      $estimates[$key]['job_ref'] = $estimate['job_ref'];
      $estimates[$key]['desc'] = $this->escapePDF($estimate['description']);
      $estimates[$key]['qty'] = $qty_amounts;
    }
    $pdf_data['estimates'] = $estimates;
    $sql = "INSERT INTO `quotations_pdf`(`user_id`,`quote_num`,`quote_num_year`,
      `year`,`created_month`,`created_year`,`customer_id`,`data`,`quote_for`) 
      VALUES(?,?,?,?,MONTH(NOW()),YEAR(NOW()),?,?,?)";
    $types = "iississ";
    $params = Array($user_id,$quote_num['quote_num'],$quote_num['quote_num_year'],
      $quote_num['year'],$customer_id,json_encode($pdf_data),$quote_for);
    $id = $this->db->insert($sql,$types,$params);
    return($id);
  }
  private function getCustomerDataPDF(&$pdf_data, $customer_id){
    $sql = "SELECT * FROM `customer_library` WHERE `id` = ?";
    $customer_details = $this->db->fetchRowAssoc($sql, 'i', Array($customer_id));
    $pdf_data['customer_name'] = $customer_details['company_name'];
    $pdf_data['customer_state'] = $customer_details['state'];
    $pdf_data['customer_address'] = $this->escapePDF($customer_details['address']);
    $pdf_data['customer_gstin'] = $customer_details['gstin'];
    $pdf_data['customer_email'] = $customer_details['email'];
    $pdf_data['customer_phone'] = $customer_details['contact_number'];
    $pdf_data['customer_shipping_state'] = $customer_details['shipping_state'];
    $pdf_data['customer_shipping_address'] = $this->escapePDF($customer_details['shipping_address']);
  }
  public function getPDF(){
    if($_GET['pdf_type']=="quotation"){
      $this->generateQuotationPDF();
    }
    else if($_GET['pdf_type']=="invoice"){
      $this->generateInvoicePDF();
    }
    else if($_GET['pdf_type']=="delivery_memo"){
      $this->generateDeliveryMemoPDF();
    }
    else if($_GET['pdf_type'] == "po"){
      $this->createPO_PDF();
    }
    else if($_GET['pdf_type'] == "job_ticket"){
      $this->getJobTicketPDF();
    }
  }
  private function getJobTicketPDF(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    $pdf_file = $tmp_dir . "/job_ticket/job_ticket.pdf";
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"job_ticket.pdf\""); 
    readfile($pdf_file);
  }

  private function generateDeliveryMemoPDF(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    
    //check for and create the users temp directory
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/delivery_memo";
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    
    $id = $_GET['id'];
    $sql = "SELECT * FROM `delivery_pdf` WHERE `id` = ? AND `user_id` = ?";
    $row = $this->db->fetchRowAssoc($sql,'ii',Array($id,$user_id));
    $file = 'delivery.php';
    $path = 'inc/templates/'.$file;
    $template = file_get_contents($path);
    $pdf_data = json_decode($row['data']);
    $start = strpos($template,'[sample]');
    $end = strpos($template, '[/sample]', $start) + 9;
    $length = $end - $start;
    $sample_html = substr($template, $start, $length); 
    $template = str_replace($sample_html,'[sample]',$template);
    $sample_html = str_replace('[sample]','',$sample_html); 
    $sample_html = str_replace('[/sample]','',$sample_html); 
    foreach($pdf_data as $key=> $value){
      if($key != 'estimates' && $key!= 'hsn_details'){
        $template = str_replace('['.$key.']',$value,$template);
      }
    }
    $est_html = '';
    foreach($pdf_data->estimates as $k=>$v){
      $sample = $sample_html;
      foreach($v as $key=>$value){
        $sample = str_replace('['.$key.']',$value,$sample);
      }
      $sample = str_replace('[s_no]',$k+1,$sample);
      $est_html = $est_html . $sample;
    }
    $template = str_replace('[sample]', $est_html, $template);
    $css = file_get_contents("inc/templates/invoice_delivery_style.css");
    file_put_contents($tmp_dir."/invoice_delivery_style.css",$css);
    file_put_contents($tmp_dir."/delivery.html",$template);
    if(isset($_GET['preview']) && $_GET['preview'] == "true"){
      $file_name = $tmp_dir."/delivery.html";
      header('Content-Type: text/html');
      readfile($file_name);
      exit();
    }
    $out_file = "file://" . getcwd() . "/" . $tmp_dir."/delivery.html";
    $pdf_filename = $row['delivery_num'] . "_". $row['year']."_delivery.pdf";
    $pdf_file = $tmp_dir . "/" . $pdf_filename;          
    $cmd = "chromium --headless --disable-gpu --print-to-pdf-no-header "
      . "--print-to-pdf=" . $pdf_file . " " . $out_file;
    shell_exec($cmd);
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"" . $pdf_filename."\""); 
    readfile($pdf_file);
  }

  private function generateInvoicePDF(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    
    //check for and create the users temp directory
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/invoice";
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    
    $id = $_GET['id'];
    $sql = "SELECT * FROM `invoice_pdf` WHERE `id` = ? AND `user_id` = ?";
    $row = $this->db->fetchRowAssoc($sql,'ii',Array($id,$user_id));
    $file = 'invoice.php';
    $path = 'inc/templates/'.$file;
    $template = file_get_contents($path);
    $pdf_data = json_decode($row['data']);
    $start = strpos($template,'[sample]');
    $end = strpos($template, '[/sample]', $start) + 9;
    $length = $end - $start;
    $sample_html = substr($template, $start, $length); 
    $template = str_replace($sample_html,'[sample]',$template);
    $sample_html = str_replace('[sample]','',$sample_html); 
    $sample_html = str_replace('[/sample]','',$sample_html); 
    $start = strpos($template,'[tax_sample]');
    $end = strpos($template, '[/tax_sample]', $start) + 13;
    $length = $end - $start;
    $tax_sample_html = substr($template, $start, $length); 
    $template = str_replace($tax_sample_html,'[tax_sample]',$template);
    $tax_sample_html = str_replace('[tax_sample]','',$tax_sample_html); 
    $tax_sample_html = str_replace('[/tax_sample]','',$tax_sample_html); 
    foreach($pdf_data as $key=> $value){
      if($key != 'estimates' && $key!= 'hsn_details'){
        $template = str_replace('['.$key.']',$value,$template);
      }
    }
    $est_html = '';
    foreach($pdf_data->estimates as $k=>$v){
      $sample = $sample_html;
      foreach($v as $key=>$value){
        $sample = str_replace('['.$key.']',$value,$sample);
      }
      $sample = str_replace('[s_no]',$k+1,$sample);
      $est_html = $est_html . $sample;
    }
    $template = str_replace('[sample]', $est_html, $template);
    $tax_html = '';
    foreach($pdf_data->hsn_details as $k=>$v){
      $tax_sample = $tax_sample_html;
      foreach($v as $key=>$value){
        $tax_sample = str_replace('['.$key.']',$value,$tax_sample);
      }
      $tax_html = $tax_html . $tax_sample;
    }
    $template = str_replace('[tax_sample]', $tax_html, $template);
    $css = file_get_contents("inc/templates/invoice_delivery_style.css");
    file_put_contents($tmp_dir."/invoice_delivery_style.css",$css);
    file_put_contents($tmp_dir."/invoice.html",$template);
    if(isset($_GET['preview']) && $_GET['preview'] == "true"){
      $file_name = $tmp_dir."/invoice.html";
      header('Content-Type: text/html');
      readfile($file_name);
      exit();
    }
    $out_file = "file://" . getcwd() . "/" . $tmp_dir."/invoice.html";
    $pdf_filename = $row['invoice_num'] . "_". $row['year']."_invoice.pdf";
    $pdf_file = $tmp_dir . "/" . $pdf_filename;          
    $cmd = "chromium --headless --disable-gpu --print-to-pdf-no-header "
      . "--print-to-pdf=" . $pdf_file . " " . $out_file;
    shell_exec($cmd);
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"" . $pdf_filename."\""); 
    readfile($pdf_file);
  }

  private function generateQuotationPDF(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    
    //check for and create the users temp directory
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/quotation";
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    
    $id = $_GET['id'];
    $sql = "SELECT * FROM `quotations_pdf` WHERE `id` = ? AND `user_id` = ?";
    $row = $this->db->fetchRowAssoc($sql,'ii',Array($id,$user_id));
    if($row['quote_for'] == 'email'){
      $file = 'quotation_email.php';
    }
    else if($row['quote_for'] == 'print'){
      $file = 'quotation_print.php';
    }
    $path = 'inc/templates/'.$file;
    $template = file_get_contents($path);
    $pdf_data = json_decode($row['data']);
    foreach($pdf_data as $key=> $value){
      if($key != 'estimates'){
        $template = str_replace('['.$key.']',$value,$template);
      }
    }
    $start = strpos($template,'[sample]');
    $end = strpos($template, '[/sample]', $start) + 9;
    $length = $end - $start;
    $sample_html = substr($template, $start, $length); 
    $template = str_replace($sample_html,'[sample]',$template);
    $sample_html = str_replace('[sample]','',$sample_html); 
    $sample_html = str_replace('[/sample]','',$sample_html); 
    $est_html = '';
    foreach($pdf_data->estimates as $k=>$v){
      $unit = Array();
      $amount = Array();
      $quantity = Array();
      $sample = $sample_html;
      foreach($v as $key=>$value){
        if($key != 'qty'){
          $sample = str_replace('['.$key.']',$value,$sample);
        }
        else{
          foreach($value as $qty){
            array_push($unit,$qty->unit);
            array_push($amount,$qty->amount);
            array_push($quantity,$qty->qty);
          }
        }
      }
      $unit = implode('<br/>',$unit);
      $amount = implode('<br/>',$amount);
      $quantity = implode('<br/>',$quantity);
      $sample = str_replace('[unit]',$unit,$sample);
      $sample = str_replace('[amount]',$amount,$sample);
      $sample = str_replace('[qty]',$quantity,$sample);
      $sample = str_replace('[s_no]',$k+1,$sample);
      $est_html = $est_html . $sample;
    }
    $template = str_replace('[sample]', $est_html, $template);
    $css = file_get_contents("inc/templates/quote_style.css");
    file_put_contents($tmp_dir."/quote_style.css",$css);
    file_put_contents($tmp_dir."/quotation.html",$template);
    if(isset($_GET['preview']) && $_GET['preview'] == "true"){
      $file_name = $tmp_dir."/quotation.html";
      header('Content-Type: text/html');
      readfile($file_name);
      exit();
    }
    $out_file = "file://" . getcwd() . "/" . $tmp_dir."/quotation.html";
    $pdf_filename = $row['quote_num'] . "_". $row['year']."_quotation.pdf";
    $pdf_file = $tmp_dir . "/" . $pdf_filename;          
    $cmd = "chromium --headless --disable-gpu --print-to-pdf-no-header "
      . "--print-to-pdf=" . $pdf_file . " " . $out_file;
    shell_exec($cmd);
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"" . $pdf_filename."\""); 
    readfile($pdf_file);
  }
  public function generatePDF(){
    $quote_num = $_GET["quote_num"];
    $pdf_type = $_GET["pdf_type"];
    $user_id = $this->user_id;
    $quote_for = $_GET['quote_for'];
    $pdf = $this->getPDFPath();
    $path = $this->pdf_path . $pdf['id'] ."_" . $pdf_type . "_" . $quote_for 
      .  "." . $pdf['doc_type'];
    $tmp_dir = $this->tmp_path . $user_id;
    
    //check for and create the users temp directory
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/pdf";
    
    //delete the pdf dir and recreate it to make sure no old data is there
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    
    //unzip the file to the tmp dir
    shell_exec("unzip $path -d $tmp_dir");
    
    //set the appropriate filename for the text document
    if($pdf['doc_type'] == "docx"){
      //word file docx
      $doc_filename = "word/document.xml";
    }
    else{
      //odt file (libreoffice)
      $doc_filename = "content.xml";
    }
    
    $doc_path = $tmp_dir . '/' . $doc_filename;
    $doc = file_get_contents($doc_path);
    
    //edit the pdf template and save it
    $doc = $this->editPDFText($doc);
    file_put_contents($doc_path, $doc);
    
    //set the document filename
    if($pdf['doc_type'] == "docx"){
      $document_filename = $pdf_type . '.docx';
    }
    else{
      $document_filename = $pdf_type . '.odt';
    }
    
    //zip the file into an appropriate format
    shell_exec("cd $tmp_dir \n zip -r $document_filename".' *');
    
    //convert to PDF
    $exec = "export HOME=/tmp && libreoffice --headless --convert-to pdf " 
      . $tmp_dir . '/' . $document_filename . " --outdir $tmp_dir";
    shell_exec($exec);
    
    //send headers and readfile
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"" . $quote_num.'_'.$pdf_type.".pdf\""); 
    readfile($tmp_dir.'/'.$pdf_type.".pdf");
  }

  public function getLibs(){
    $user_id = $this->user_id;
    $sql = "SELECT `type`,`library` FROM `binding_libs` 
      WHERE `user_id` = ?";
    $params = Array($user_id);
    $rows = $this->db->fetchAllAssoc($sql,'i',$params);
    return($rows);
  }
  

  public function saveBindingLib(){
    $user_id = $this->user_id;
    $library = $_POST['library'];
    $type = $_POST['type'];
    $type_user_id = $type.$user_id;
    $sql = "INSERT INTO `binding_libs`(`type`, `user_id`, `type_user_id`, `library`)
      VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE `library` = ?";
    $params = Array($type, $user_id, $type_user_id, $library, $library);
    $this->db->runSql($sql, 'sisss', $params);
  }

  public function addPaperType(){
    $user_id = $this->user_id;
    $paper_type = $_POST['paper_type'];
    $user_paper_type = $user_id . $paper_type;
    $sql = "INSERT INTO `paper_type`(`user_id`,`paper_type`, `user_paper_type`) 
      VALUES(?,?,?)";
    $params = Array($user_id, $paper_type, $user_paper_type);
		try{
      $this->db->insert($sql, 'iss', $params);
		}catch(Exception $e){
		}
    return($this->getPaperTypes());
  }

  public function getPaperTypes(){
    $user_id = $this->user_id;
    $sql = "SELECT * FROM `paper_type` WHERE `user_id` = ?";
    $rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
    return($rows);
  }

  public function addPaperBrand(){
    $user_id = $this->user_id;
    $paper_brand = $_POST['paper_brand'];
    $user_paper_brand = $user_id . $paper_brand;
    $sql = "INSERT INTO `paper_brand`(`user_id`,`paper_brand`, `user_paper_brand`) 
      VALUES(?,?,?)";
    $params = Array($user_id, $paper_brand, $user_paper_brand);
		try{
      $this->db->insert($sql, 'iss', $params);
		}catch(Exception $e){
		}
    return($this->getPaperBrands());
  }

  public function getPaperBrands(){
    $user_id = $this->user_id;
    $sql = "SELECT * FROM `paper_brand` WHERE `user_id` = ?";
    $rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
    return($rows);
  }

  public function addPaperNew(){
    $user_id = $this->user_id;
    $brand = $_POST['brand'];
    $type = $_POST['type'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    $gsm = $_POST['gsm'];
    $name = $_POST['name'];
    $st_price = $_POST['st_price'];
    if($st_price == ""){
      $st_price = null;
    }
    $user_id_name = $user_id . $name;
    $sql = "INSERT INTO `paper`
      (`user_id`,`width`,`height`,`gsm`,`brand`, `type`,
      `name`,`user_id_name`,`st_price`) 
      VALUES(?,?,?,?,?,?,?,?,?)";
    $params = Array($user_id, $width, $height, $gsm, $brand,
                    $type, $name, $user_id_name, $st_price);
		try{
      $this->db->insert($sql, 'iddissssd', $params);
		}catch(Exception $e){
		}
    return($this->getPaperWithStock());
  }

  public function updatePaperNew(){
    $user_id = $this->user_id;
    $brand = $_POST['brand'];
    $type = $_POST['type'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    $gsm = $_POST['gsm'];
    $name = $_POST['name'];
    $id = $_POST['data_id'];
    $st_price = $_POST['st_price'];
    if($st_price == ""){
      $st_price = null;
    }
    $user_id_name = $user_id . $name;
    $sql = "UPDATE `paper` SET `width` = ?,`height` = ?,`gsm` = ?,`brand` = ?, 
      `type` = ?,`name` = ?,`user_id_name` = ?, `st_price` = ? WHERE `id` = ?";
    $params = Array($width, $height, $gsm, $brand,
                    $type, $name, $user_id_name, $st_price, $id);
		try{
      $this->db->runSql($sql, 'ddissssdi', $params);
		}catch(Exception $e){
		}
    return($this->getPaperWithStock());
  }

  public function deletePaperNew(){
    $id = $_POST['data_id'];
    $sql = "DELETE FROM `paper` WHERE `id` = ?";
    $this->db->runSql($sql, 'i', Array($id));
    return($this->getPaperWithStock());
  }

  public function getPaperNew(){
    $user_id = $this->user_id;
    $sql = "SELECT * FROM `paper` WHERE `user_id` = ?";
    $rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
    return($rows);
  }

  public function getPaperWithStock(){
    $user_id = $this->user_id;
    $sql = "SELECT `paper`.`id`,`paper`.`user_id`,`paper`.`width`,
      `paper`.`height`,`paper`.`gsm`,`paper`.`st_price`,`paper`.`brand`,
      `paper`.`type`,`paper`.`name`,`stock`.`stock`,
      `stock`.`total_stock`,`stock`.`warehouse_name` FROM `paper` 
      LEFT JOIN
      (SELECT `paper_stock`.`paper_id`,`paper_stock`.`warehouse_name`,
        `paper_stock`.`warehouse_id`,`paper_stock`.`stock`,`stock2`.`total_stock` 
        FROM `paper_stock` AS `paper_stock`
        JOIN 
          (SELECT `paper_stock`.`paper_id`,
          SUM(`paper_stock`.`stock`) AS `total_stock` FROM `paper_stock` 
          GROUP BY `paper_id`)AS `stock2`
        ON `paper_stock`.`paper_id` = `stock2`.`paper_id`) AS `stock`
      ON `stock`.`paper_id`=`paper`.`id` 
      WHERE `paper`.`user_id` = ? ORDER BY `paper`.`id` DESC";
    $rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
    if($rows == false){
      $rows = Array();
    }
    return($rows);
  }

  public function addWarehouse(){
    $user_id = $this->user_id;
    $name = $_POST['name'];
    $user_id_name = $user_id . $name;
    $sql = "INSERT INTO `warehouse`(`user_id`,`name`, `user_id_name`) 
      VALUES(?,?,?)";
    $params = Array($user_id, $name, $user_id_name);
		try{
      $this->db->insert($sql, 'iss', $params);
		}catch(Exception $e){
		}
    return($this->getWarehouse());
  }

  public function getWarehouse(){
    $user_id = $this->user_id;
    $sql = "SELECT * FROM `warehouse` WHERE `user_id` = ?";
    $rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
    return($rows);
  }

  public function sendMessageToAdmin(){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $params = array($name, $email, $phone, $message);
    $sql = "INSERT INTO `messages`(`name`,`email`,`phone`,`message`) 
            VALUES(?,?,?,?)";
    $id = $this->db->insert($sql, 'ssss', $params);
    if(!$id){
      return(array('status' => 'failed'));
    }
    return(array('status' => 'success'));
  }

  public function getMessages(){
    $sql = "SELECT * FROM `messages` WHERE 1";
    $msgs = $this->db->fetchAllAssoc($sql);
		$response = array('status'=>'success', 'resp'=>$msgs);
    return($response);
  }
  public function getHSNCodes(){
    $user_id = $this->user_id;
    $sql = "SELECT * FROM `hsn` WHERE `user_id` = ?";
    $rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
		$response = array('status'=>'success', 'resp'=>$rows);
    return($response);
  }

  public function deleteMessage(){
    $id = $_POST['id'];
    $sql = "DELETE FROM `messages` WHERE `id` = ?";
    $this->db->runSql($sql, 'i', Array($id));
  }
  public function updateHSNCodes(){
    $sql = "UPDATE `hsn` SET
      `hsn` = ?,`name` = ?,`description` = ?, `cgst` = ?, `sgst`= ?, `igst` = ?, 
      `s_cgst` = ?, `s_sgst` = ?,  `s_igst` = ?, `hsn_s_cgst_start` = ?,
      `hsn_s_sgst_start` = ?, `hsn_s_igst_start` = ?, `hsn_s_cgst_end` = ?,
      `hsn_s_sgst_end` = ?, `hsn_s_igst_end` = ?
      WHERE `id` = ?";
    $hsn_code          = $_POST['hsn_code'];        
    $hsn_id            = $_POST['hsn_id'];          
    $hsn_name          = $_POST['hsn_name'];        
    $hsn_desc          = $_POST['hsn_desc'];        
    $hsn_cgst          = is_numeric($_POST['hsn_cgst']) ? $_POST['hsn_cgst'] : 0;        
    $hsn_sgst          = is_numeric($_POST['hsn_sgst']) ? $_POST['hsn_sgst'] : 0;        
    $hsn_igst          = is_numeric($_POST['hsn_igst']) ? $_POST['hsn_igst'] : 0;        
    $hsn_s_cgst        = is_numeric($_POST['hsn_s_cgst']) ? $_POST['hsn_s_cgst'] : 0;      
    $hsn_s_sgst        = is_numeric($_POST['hsn_s_sgst']) ? $_POST['hsn_s_sgst'] : 0;      
    $hsn_s_igst        = is_numeric($_POST['hsn_s_igst']) ? $_POST['hsn_s_igst'] : 0;      
    $hsn_s_cgst_start  = $_POST['hsn_s_cgst_start'] ? $_POST['hsn_s_cgst_start'] : NULL;
    $hsn_s_sgst_start  = $_POST['hsn_s_sgst_start'] ? $_POST['hsn_s_sgst_start'] : NULL;
    $hsn_s_igst_start  = $_POST['hsn_s_igst_start'] ? $_POST['hsn_s_igst_start'] : NULL;
    $hsn_s_cgst_end    = $_POST['hsn_s_cgst_end'] ? $_POST['hsn_s_cgst_end'] : NULL; 
    $hsn_s_sgst_end    = $_POST['hsn_s_sgst_end'] ? $_POST['hsn_s_sgst_end'] : NULL;  
    $hsn_s_igst_end    = $_POST['hsn_s_igst_end'] ? $_POST['hsn_s_igst_end'] : NULL;  
    $types = "sssssssssssssssi";
    $params = Array(
      $hsn_code        ,
      $hsn_name        ,
      $hsn_desc        ,
      $hsn_cgst        ,
      $hsn_sgst        ,
      $hsn_igst        ,
      $hsn_s_cgst      ,
      $hsn_s_sgst      ,
      $hsn_s_igst      ,
      $hsn_s_cgst_start,
      $hsn_s_sgst_start,
      $hsn_s_igst_start,
      $hsn_s_cgst_end  ,
      $hsn_s_sgst_end  ,
      $hsn_s_igst_end  ,
      $hsn_id          
    );
    $this->db->runSql($sql,$types,$params);
    return(array('status' => 'success'));
  }

  public function addHSNCodes(){
    $sql = "INSERT INTO `hsn`
      (`user_id`,`hsn`,`name`,`description`,`cgst`,`sgst`,`igst`,`s_cgst`,`s_sgst`,
      `s_igst`,`hsn_s_cgst_start`,`hsn_s_sgst_start`,`hsn_s_igst_start`,
      `hsn_s_cgst_end`,`hsn_s_sgst_end`,`hsn_s_igst_end`)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    $user_id = $this->user_id;
    $hsn_code          = $_POST['hsn_code'];        
    $hsn_name          = $_POST['hsn_name'];        
    $hsn_desc          = $_POST['hsn_desc'];        
    $hsn_cgst          = is_numeric($_POST['hsn_cgst']) ? $_POST['hsn_cgst'] : 0;        
    $hsn_sgst          = is_numeric($_POST['hsn_sgst']) ? $_POST['hsn_sgst'] : 0;        
    $hsn_igst          = is_numeric($_POST['hsn_igst']) ? $_POST['hsn_igst'] : 0;        
    $hsn_s_cgst        = is_numeric($_POST['hsn_s_cgst']) ? $_POST['hsn_s_cgst'] : 0;      
    $hsn_s_sgst        = is_numeric($_POST['hsn_s_sgst']) ? $_POST['hsn_s_sgst'] : 0;      
    $hsn_s_igst        = is_numeric($_POST['hsn_s_igst']) ? $_POST['hsn_s_igst'] : 0;      
    $hsn_s_cgst_start  = $_POST['hsn_s_cgst_start'] ? $_POST['hsn_s_cgst_start'] : NULL;
    $hsn_s_sgst_start  = $_POST['hsn_s_sgst_start'] ? $_POST['hsn_s_sgst_start'] : NULL;
    $hsn_s_igst_start  = $_POST['hsn_s_igst_start'] ? $_POST['hsn_s_igst_start'] : NULL;
    $hsn_s_cgst_end    = $_POST['hsn_s_cgst_end'] ? $_POST['hsn_s_cgst_end'] : NULL; 
    $hsn_s_sgst_end    = $_POST['hsn_s_sgst_end'] ? $_POST['hsn_s_sgst_end'] : NULL;  
    $hsn_s_igst_end    = $_POST['hsn_s_igst_end'] ? $_POST['hsn_s_igst_end'] : NULL;  
    $types = "isssssssssssssss";
    $params = Array(
      $user_id        ,
      $hsn_code        ,
      $hsn_name        ,
      $hsn_desc        ,
      $hsn_cgst        ,
      $hsn_sgst        ,
      $hsn_igst        ,
      $hsn_s_cgst      ,
      $hsn_s_sgst      ,
      $hsn_s_igst      ,
      $hsn_s_cgst_start,
      $hsn_s_sgst_start,
      $hsn_s_igst_start,
      $hsn_s_cgst_end  ,
      $hsn_s_sgst_end  ,
      $hsn_s_igst_end  
    );
    $id = $this->db->insert($sql, $types, $params);
    if(!$id){
      return(array('status' => 'failed'));
    }
    return(array('status' => 'success'));
  }

  public function addSpotColor(){
    $sql = "INSERT INTO `spot_colors`(`spot_color_name`,`user_id`) 
      VALUES(?,?)";
    $user_id = $this->user_id;
    $spot_color_name = $_POST['spot_color_name'];
    $params = Array($spot_color_name,$user_id);
    $id = $this->db->insert($sql, 'si', $params);
    return($this->getSpotColor());
  }
  public function addPMSColor(){
    $sql = "INSERT INTO `pms_colors`(`pms_color_name`,`user_id`) 
      VALUES(?,?)";
    $user_id = $this->user_id;
    $spot_color_name = $_POST['spot_color_name'];
    $params = Array($spot_color_name,$user_id);
    $id = $this->db->insert($sql, 'si', $params);
    return($this->getSpotColor());
  }

  public function getSpotColor(){
    $sql = "SELECT * FROM `spot_colors` WHERE `user_id` = ?";
    $user_id = $this->user_id;
    $spot_rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
    $sql = "SELECT * FROM `pms_colors` WHERE `user_id` = ?";
    $pms_rows = $this->db->fetchAllAssoc($sql, 'i', Array($user_id));
    $resp = array('spot_color'=>$spot_rows,'pms_color'=>$pms_rows);
		$response = array('status'=>'success', 'resp'=>$resp);
    return($response);
  }
  public function deleteSpotColor(){
    $sql = "DELETE FROM `spot_colors` WHERE `id` = ? AND `user_id` = ?";
    $user_id = $this->user_id;
    $id = $_POST['id'];
    $this->db->runSql($sql, 'ii', Array($id,$user_id));
    return($this->getSpotColor());
  }

  public function deletePMSColor(){
    $sql = "DELETE FROM `pms_colors` WHERE `id` = ? AND `user_id` = ?";
    $user_id = $this->user_id;
    $id = $_POST['id'];
    $this->db->runSql($sql, 'ii', Array($id,$user_id));
    return($this->getSpotColor());
  }
  public function deleteHSNCode(){
    $hsn_id = $_POST['hsn_id'];          
    $user_id = $this->user_id;
    $sql = "DELETE FROM `hsn` WHERE `id` = ? && `user_id` = ?";
    $this->db->runSql($sql,'ii',Array($hsn_id,$user_id));
  }

  public function updateSiteConfig(){
    $sql = "UPDATE `prices` SET `3month` = ?, `6month` = ?, `12month` = ?  
      WHERE `plan` = ? ";
    $basic_12 = $_POST['basic_12'];
    $this->db->runSql($sql,'iiis',Array(0,0,$basic_12,'basic'));
    $estimator_3 = $_POST['estimator_3'];
    $estimator_6 = $_POST['estimator_6'];
    $estimator_12 = $_POST['estimator_12'];
    $this->db->runSql($sql,'iiis',
      Array($estimator_3,$estimator_6,$estimator_12,'estimator'));
    $erp_3 = $_POST['erp_3'];
    $erp_6 = $_POST['erp_6'];
    $erp_12 = $_POST['erp_12'];
    $this->db->runSql($sql,'iiis',
      Array($erp_3,$erp_6,$erp_12,'erp'));
    $demo_days = $_POST['demo_days'];
    $sql = "UPDATE `site_config` SET `value` = ? WHERE `name` = 'demo_expire'";
    $this->db->runSql($sql,'i',Array($demo_days));
  }

  public function getSiteconfig(){
    $sql = "SELECT * FROM `prices` WHERE 1";
    $res = $this->db->fetchAllAssoc($sql);
    $sql = "SELECT value FROM `site_config` WHERE `name` = 'demo_expire'";
    $demo = $this->db->fetchValue($sql,'',Array());
    $config = Array();
    foreach($res as $value){
      $config[$value['plan']] = $value;
    }
    $config['demo'] = Array( 'expiry'=> $demo);
    return($config);
  }

  public function updateSoftware(){
    if(!$this->isAdmin()){
			throw new Exception('unauthorised');
      exit();
    }
    $branch = $_POST["branch"];
    $folder = $_POST["folder"];
    $version = $this->base_64_encode_int(time());
    $command = "/usr/local/bin/xpress_updater update_software " . $branch . " " 
      . $folder . " " . $version;
    $resp= Array();
    exec($command,$resp);
  }

  public function base_64_encode_int(int $int){
    $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';
    $string_64 = "";
    $count = 0;
    while($int > 0 ){
      $quotient = intdiv($int, 64);
      $remainder = $int - $quotient * 64;
      $string_64 = $chars[$remainder] . $string_64;
      $int = $quotient;
      $count++;
    }
    return($string_64);
  }

  public function setPaperInitialStock(){
    $paper = $_POST['paper'];
    $paper_id = $_POST['paper_id'];
    $qty = $_POST['qty'];
    $packet = $_POST['packet'];
    $notes = $_POST['notes'];
    $adj_type = 'initial_stock';
    $adj_reason = 'initial_stock';
    $sheets = $_POST["sheets"];
    $sql = "INSERT INTO paper_record(`paper_id`,`adj_type`,`adj_reason`,`qty`,
      `packet`,`notes`,`qty_sheets`) VALUES(?,?,?,?,?,?,?)";
    $params = Array($paper_id, $adj_type,$adj_reason, $qty, $packet,$notes, $sheets);
    $this->db->insert($sql, 'issiisi', $params);
    $sql = "DELETE FROM `paper_stock` WHERE `paper_id` = ?";
    $params = Array($paper_id);
    $this->db->runSql($sql, 'i', $params);
    $sql = "INSERT INTO paper_stock(`paper_id`,`stock`) VALUES(?,?)";
    $params = Array($paper_id, $sheets);
    $this->db->insert($sql, 'ii', $params);
    return($this->getPaperWithStock());
  }

  private function getNextGRN(){
    $sql = "UPDATE `users` SET `grn` = `grn` + 1 WHERE `id` = ? ";
    $user_id = $this->user_id;
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `grn` FROM `users` WHERE `id` = ? ";
    $grn = $this->db->fetchValue($sql,'i',Array($user_id));
    return($grn);
  }

  public function createGRNPaper(){
    $grn = $this->getNextGRN();
    $vendor_id = $_POST['vendor_id'];
    $customer_id = $_POST['customer_id'];
    $reason = $_POST['reason'];
    $po_num = $_POST['po_num'];
    $notes = $_POST['notes'];
    $papers = $_POST['papers'];
    $po_id = NULL;
    $user_id = $this->user_id;
    $sql = "INSERT INTO `paper_record`(`vendor_id`,`po_number`,`po_id`,
      `paper_id`, `adj_type`,`qty`,`packet`,`notes`,`qty_sheets`,
      `grn`,`customer_id`,`date`,`user_id`,`cost`) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,NOW(),?,?)";
    $sql2 = "UPDATE `paper_stock` SET `stock` = `stock` + ? ";
    foreach($papers as $paper){
      $paper_id = $paper['paper_id'];
      $qty = $paper['qty'];
      $packet = $paper['packet'];
      $sheets = $paper['qty_sheets'];
      $cost = $paper['cost'];
      if($cost == ""){
        $cost = 0;
      }
      $params = Array($vendor_id, $po_num, $po_id, $paper_id, $reason, $qty,
        $packet, $notes, $sheets, $grn, $customer_id, $user_id, $cost);
      $this->db->insert($sql,'isiisiisiiiii', $params);
      $this->db->runSql($sql2,'i',Array($sheets));
    }
    return($this->getPaperWithStock());
  }


  public function adjustPaperStock(){
    $paper = $_POST['paper'];
    $paper_id = $_POST['paper_id'];
    $qty = $_POST['qty'];
    $packet = $_POST['packet'];
    $notes = $_POST['notes'];
    $adj_type = $_POST['adj_type'];
    $adj_reason = $_POST['adj_reason'];
    $sheets = $_POST["sheets"];
    $sql = "INSERT INTO paper_record(`paper_id`,`adj_type`,`adj_reason`,`qty`,
      `packet`,`notes`,`qty_sheets`) VALUES(?,?,?,?,?,?,?)";
    $params = Array($paper_id, $adj_type,$adj_reason, $qty, $packet,$notes, $sheets);
    $this->db->insert($sql, 'issiisi', $params);
    if($adj_type == 'add_stock'){
      $sql = "UPDATE `paper_stock` SET `stock` = `stock` + ? WHERE `paper_id` = ?";
    }
    else if($adj_type == 'remove_stock'){
      $sql = "UPDATE `paper_stock` SET `stock` = `stock` - ? WHERE `paper_id` = ?";
    }
    $params = Array($sheets, $paper_id);
    $this->db->insert($sql, 'ii', $params);
    return($this->getPaperWithStock());
  }
  
  /*
   * gets the next purchase order number 
   *
   * Gets the next purchase order number for the current user
   *
   * @since 0.1
   */
  public function getNextPONumber(){
    $user_id = $this->user_id;
    $year = $this->getIndiaYear(); 
    $sql = "UPDATE `users` SET `po_id` = `po_id` + 1 WHERE `id` = ?";
    $this->db->runSql($sql,'i',Array($user_id));
    $sql = "SELECT `po_id` FROM `users` WHERE `id` = ?";
    $po_num = $this->db->fetchValue($sql,'i',Array($user_id));
    $po_num_year = $po_num ."/" . $year;
    $ret = Array(
      'po_num'=>$po_num, 
      'po_num_year'=>$po_num_year,
      'year'=>$year);
    return($ret);
  }

  public function createPO_PDF(){
    $user_id = $this->user_id;
    $tmp_dir = $this->tmp_path . $user_id;
    
    //check for and create the users temp directory
    if(!file_exists($tmp_dir)){
      mkdir($tmp_dir);
    }
    
    //set temp dir for pdf
    $tmp_dir = $tmp_dir . "/po";
    
    shell_exec("rm -rf ".$tmp_dir);
    mkdir($tmp_dir);
    
    $po_num = $_GET['po_num'];
    $sql = "SELECT * FROM `purchase_order` WHERE `user_id` = ? AND `po_num` = ?";
    $po = $this->db->fetchRowAssoc($sql, "ii", Array($user_id, $po_num));
    
    $date = date_create($po['created_date']);
    $date = date_format($date,"d-M-Y");

    $sql = "SELECT `job_ref` FROM `quotation` WHERE `quote_number` = ? AND 
      `user_id` = ?";
    $params = Array($po['estimate_num'],$user_id);
    $job_ref = $this->db->fetchValue($sql,'ii',$params);
    //get the vendor details
    //vendor id of 0 means that it is in house
    if($po['vendor_id'] != 0){
      $sql = "SELECT * FROM `vendor_library` WHERE `id` = ? AND `user_id` = ?";
      $params = Array($po['vendor_id'], $user_id);
      $vendor = $this->db->fetchRowAssoc($sql, 'ii', $params);
    }
    $sql = "SELECT `email`,`contact`,`company_name`,`address1`,`address2`,`city`,
      `name` FROM `users` WHERE `id` = ?";
    $user = $this->db->fetchrowAssoc($sql, 'i', Array($user_id));
    $pdf_data = Array(
      'company_name' => $user['company_name'],
      'company_address' => $user['address1'] . " " . $user['address2'] . " " . $user['city'],
      'company_email' => $user['email'],
      'company_admin_name' => $user['name'],
      'company_phone' => $user['contact'],
      'po_num' => $po['po_num_year'],
      'date' => $date,
      'po_name' => $po['po_name'],
      'service' => $po['service'],
      'notes' => $po['notes'],
      'job_ref' => $job_ref
    );

    $template = file_get_contents("inc/templates/po_template.html");
    
    //vendor id of 0 means that it is in house
    if($po['vendor_id'] == 0){
      $file_name = "inc/templates/po_in_house.php";
    }
    else{
      $file_name = "inc/templates/po_out_source.php";
      $pdf_data['vendor_name'] = $vendor['company_name'];
      $pdf_data['vendor_address'] = $vendor['address'];
      $pdf_data['vendor_email'] = $vendor['email'];
      $pdf_data['vendor_phone'] = $vendor['contact_number'];
    }
    $tpl = file_get_contents($file_name);
    $template = str_replace('[template]',$tpl,$template);

    foreach($pdf_data as $key=> $value){
      $template = str_replace('['.$key.']',$value,$template);
    }
    file_put_contents($tmp_dir . "/po.html", $template);
    if(isset($_GET['preview']) && $_GET['preview'] == "true"){
      $file_name = $tmp_dir."/po.html";
      header('Content-Type: text/html');
      readfile($file_name);
      exit();
    }
    $out_file = "file://" . getcwd() . "/" . $tmp_dir."/po.html";
    $pdf_filename = "purchase_order.pdf";
    $pdf_file = $tmp_dir . "/" . $pdf_filename;          
    $cmd = "chromium --headless --disable-gpu --print-to-pdf-no-header "
      . "--print-to-pdf=" . $pdf_file . " " . $out_file;
    shell_exec($cmd);
    header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"" . $pdf_filename."\""); 
    readfile($pdf_file);
  }
  public function createPO(){
    $user_id = $this->user_id;
    $po_num = $this->getNextPONumber();
    $vendor_id = $_POST['vendor_id'];
    $service = $_POST['service'];
    $service_data = json_encode($_POST['service_data']);
    $notes = $_POST['notes'];
    $estimate_num = $_POST['estimate_num'];
    $module = $_POST['module'];
    $po_type = $_POST['po_type'];
    $po_name = $_POST['po_name'];
    $customer_id = $_POST['customer_id'];
    
    //delete any previous PO of the same type in the same estimate 
    $sql = "DELETE FROM `purchase_order` WHERE `user_id` = ? AND 
      `estimate_num` = ? AND `po_type` = ?";
    $params = Array($user_id, $estimate_num, $po_type);
    $types = "iis";
    $this->db->runSql($sql, $types, $params);

    //insert the new PO
    $sql = "INSERT INTO `purchase_order`(`user_id`,`vendor_id`,`estimate_num`,
      `module`,`po_type`,`po_name`,`po_num`,`po_num_year`,`year`,`service`,
      `service_data`,`notes`,`customer_id`) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    $params = Array($user_id, $vendor_id, $estimate_num, $module, $po_type, 
      $po_name, $po_num['po_num'], $po_num['po_num_year'], $po_num['year'], 
      $service, $service_data, $notes, $customer_id);
    $types = "iiisssisssssi";
    $this->db->insert($sql,$types,$params);
    return($po_num);
  }
}
