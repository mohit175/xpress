<?php
require_once('start.php');
require_once('inc/user.class.php');

if(isset($_GET) && isset($_GET['action'])){
	$action = $_GET['action'];
}
else if(!(isset($_POST) && isset($_POST['action']))){
	exit();
}
else{
	$action = $_POST['action'];
}

$user = new User();
if( $action != "getPDF" ){
  header('Content-Type: application/json');
}
switch($action){
	case 'send_otp':
		$user->sendOtp();
	break;
	case 'get_datalist':
		$response = $user->getDataList();
		echo(json_encode($response));
	break;
  case 'get_new_binding_num':
    $resp = $user->getNextBindingNumber();
    $response = array('status'=>'success', 'resp'=>$resp);
    echo(json_encode($response));
  break;
  case 'get_user_detail':
    $response = $user->getUserDetailsById();
    echo(json_encode($response));
  break;
  case 'update_user':
    $user->updateUser();
		$response = array('status'=>'true');
    echo(json_encode($response));
  break;
  case 'update_user_details':
    $user->updateUserDetails();
		$response = array('status'=>'true');
    echo(json_encode($response));
  break;
  case 'is_admin':
    if($user->isAdmin()){
		  $response = array('status'=>'true');
    }
    else{
		  $response = array('status'=>'false');
    }
		echo(json_encode($response));
  break;
	case 'geo_locate':
		$response = $user->geoLocate();
		echo(json_encode($response));
	break;
  case 'change_pass_admin':
    $user->changePassAdmin();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'get_users':
    $response = $user->getUsers();
    echo(json_encode($response));
  break;
  case 'confirm_user':
    $user->confirmUser();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
  case 'unconfirm_user':
    $user->unconfirmUser();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
  case 'unlock_user':
    $user->unlockUser();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
  case 'lock_user':
    $user->lockUser();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
  case 'delete_user':
    $user->deleteUser();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'resend_otp':
		$user->resendOtp();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'verify_otp':
		if($user->verifyOtp()){
			$response = array('status'=>'success');
		}
		else{
			$response = array('status'=>'failed');
		}
		echo(json_encode($response));
	break;
	case 'validate_otp':
		$user->validateOtp();
	break;
	case 'login':
		$user->login();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'logout':
		$user->logout();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'get_paper':
		$paper = $user->getPaper();
		echo(json_encode($paper));
	break;
	case 'edit_paper':
		$user->editPaper();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'delete_paper':
		$user->deletePaper();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'add_paper':
		$user->addPaper();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'update_password':
		$user->updatePassword();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'get_stationery_paper':
		$paper = $user->getStationeryPaper();
		echo(json_encode($paper));
	break;
	case 'heartbeat':
		if($user->isLoggedIn()){
			$response = array('status'=>'success');
		}
		else{
			$response = array('status'=>'failed');
		}
		echo(json_encode($response));
	break;
	case 'register':
		$user->register();
		$response = array('status'=>'success');
		echo(json_encode($response));
	break;
	case 'get_user_details':
		$response = $user->getUserDetails();
		echo(json_encode($response));
	break;
  case 'save_preferences':
    $user->savePreferences();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'save_screen_defaults':
    $user->saveScreenDefaults();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'load_screen_defaults':
    $response = $user->loadScreenDefaults();
    echo(json_encode($response));
  break;
  case 'get_tooltips':
    $resp = $user->getToolTips();
    $response = array('status'=>'success', 'resp'=>$resp);
    echo(json_encode($response));
  break;
  case 'emulate_user':
    $user->emulateUser();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'switch_to_admin':
    $user->switchToAdmin();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'get_customers':
    $resp = $user->getCustomers();
    $response = array('status'=>'success', 'resp'=>$resp);
    echo(json_encode($response));
  break;
  case 'delete_customer':
    $user->deleteCustomer();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'add_customer':
    $user->addCustomer();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'edit_customer':
    $user->editCustomer();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'add_vendor':
    $user->addVendor();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'get_vendors':
    $resp = $user->getVendors();
    $response = array('status'=>'success', 'resp'=>$resp);
    echo(json_encode($response));
  break;
  case 'delete_vendor':
    $user->deleteVendor();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'edit_vendor':
    $user->editVendor();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'save_quotation':
    $resp = $user->saveQuotation();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'update_quotation':
    $user->updateQuotation();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'save_quotation_library':
    $resp = $user->saveQuotation("main_library");
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'update_quotation_library':
    $user->updateQuotation("main_library");
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'get_quotes':
    $resp = $user->showQuotations();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_quotes_library':
    $resp = $user->showQuotations("main_library");
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_quote':
    $resp = $user->loadQuotation();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_quote_library':
    $resp = $user->loadQuotation("main_library");
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'lock_quote':
    $user->lockQuotation();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'delete_quote':
    $user->deleteQuotation();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'delete_quote_library':
    $user->deleteQuotationLibrary();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'generate_pdf':
    $user->generatePDF();
  break;
  case 'generate_invoice':
    $resp = $user->generateInvoice();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'generate_delivery_memo':
    $resp = $user->generateDeliveryMemo();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'generate_quotation':
    $resp = $user->generateQuotation();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'getPDF':
    $user->getPDF();
  break;
  case 'generateJobTicketPDFDirect':
    $resp = $user->generateJobTicketPDFDirect();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'getLibs':
    $resp = $user->getLibs();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'save_job_ticket':
    $resp = $user->saveJobTicket();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_job_ticket':
    $resp = $user->getJobTicket();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'save_binding_lib':
    $user->saveBindingLib();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'add_paper_type':
    $resp = $user->addPaperType();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_paper_type':
    $resp = $user->getPaperTypes();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'add_paper_brand':
    $resp = $user->addPaperBrand();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_paper_brand':
    $resp = $user->getPaperBrands();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'add_paper_new':
    $resp = $user->addPaperNew();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'update_paper_new':
    $resp = $user->updatePaperNew();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_invoices':
    $resp = $user->getInvoices();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_quotations':
    $resp = $user->getQuotations();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_delivery_memo':
    $resp = $user->getDeliveryMemos();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'create_grn_paper':
    $resp = $user->createGRNPaper();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'set_initial_stock':
    $resp = $user->setPaperInitialStock();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'adjust_paper_stock':
    $resp = $user->adjustPaperStock();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_paper_new':
    $resp = $user->getPaperNew();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'delete_paper_new':
    $resp = $user->deletePaperNew();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_paper_with_stock':
    $resp = $user->getPaperWithStock();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'add_warehouse':
    $resp = $user->addWarehouse();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_warehouse':
    $resp = $user->getWarehouse();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'send_message_to_admin':
    $response = $user->sendMessageToAdmin();
		echo(json_encode($response));
  break;
  case 'get_messages':
    $response = $user->getMessages();
		echo(json_encode($response));
  break;
  case 'get_hsn_codes':
    $response = $user->getHSNCodes();
		echo(json_encode($response));
  break;
  case 'add_hsn':
    $response = $user->addHSNCodes();
		echo(json_encode($response));
  break;
  case 'add_spot_color':
    $response = $user->addSpotColor();
		echo(json_encode($response));
  break;
  case 'add_pms_color':
    $response = $user->addPMSColor();
		echo(json_encode($response));
  break;
  case 'get_spot_color':
    $response = $user->getSpotColor();
		echo(json_encode($response));
  break;
  case 'delete_spot_color':
    $response = $user->deleteSpotColor();
		echo(json_encode($response));
  break;
  case 'delete_pms_color':
    $response = $user->deletePMSColor();
		echo(json_encode($response));
  break;
  case 'update_hsn':
    $response = $user->updateHSNCodes();
		echo(json_encode($response));
  break;
  case 'delete_hsn':
    $response = $user->deleteHSNCode();
		echo(json_encode($response));
  break;
  case 'update_invoice_prefs':
    $response = $user->updateInvoicePrefs();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'delete_msg':
    $user->deleteMessage();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'update_site_config':
    $user->updateSiteConfig();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'update_software':
    $user->updateSoftware();
		$response = array('status'=>'success');
		echo(json_encode($response));
  break;
  case 'test_SMS':
    $user->testSMS();
  break;
  case 'create_po':
    $resp = $user->createPO();
		$response = array('status'=>'success','resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'update_po':
    $resp = $user->updatePO();
		$response = array('status'=>'success','resp'=>$resp);
		echo(json_encode($response));
  break;
  case 'get_purchase_orders':
    $resp = $user->getPurchaseOrders();
		$response = array('status'=>'success', 'resp'=>$resp);
		echo(json_encode($response));
  break;
}
