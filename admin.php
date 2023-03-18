<?php
require_once("login_required.php");
if(!$user->isAdmin()){
  $user->logout();
  header("Location: index.php");
  die();
}
$site_config = $user->getSiteConfig();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Xpress Quote</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/bootstrap.min.css">    
  <link rel="stylesheet" href="fontawesome/css/all.css">
	<link rel="stylesheet" href="css/admin.css?v=1Zkm0U">
	<script src="js/libs/jquery-3.6.0.min.js" defer></script>
	<script src="js/admin.js?v=1Zkm0U" defer></script>
  <link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>
      Xpress Admin Page
    </h1>
    <div class="left-menu">
      <ul>
        <li id="user_home">User Home</li>
        <li id="logout-button">Logout</li>
        <li class="tab" data-target="users">Users</li>
        <li class="tab" data-target="messages">Messages</li>
        <li class="tab" data-target="config">Site Config</li>
      </ul>
    </div>
    <div class="right-side">
      <div class="tab-body" id="users">
      </div>
      <div id="messages" class="tab-body hide">
      </div>
      <div id="config" class="tab-body hide">
        <h1>Site Configuration</h1>
        <div class="row">
          <div class="demo">
            <label>Days for Demo</label>
            <input type="text" 
              class="days" 
              value="<?=$site_config['demo']['expiry'] ?>"></input>
          </div>
        </div>
        <div class="row basic">
          <div>
            <label>Basic 3 Months</label>
            <input type="text" value="NA" disabled>
            </input>
          </div>
          <div>
            <label>Basic 6 Months</label>
            <input type="text" value="NA" disabled>
            </input>
          </div>
          <div>
            <label>Basic 12 Months</label>
            <input type="text" 
              class="12month"
              value="<?=$site_config['basic']['12month'] ?>">
            </input>
          </div>
        </div>
        <div class="row estimator">
          <div>
            <label>Estimator 3 Months</label>
            <input type="text" 
              class="3month" 
              value="<?=$site_config['estimator']['3month'] ?>">
            </input>
          </div>
          <div>
            <label>Estimator 6 Months</label>
            <input type="text" 
              class="6month"
              value="<?=$site_config['estimator']['6month'] ?>">
            </input>
          </div>
          <div>
            <label>Estimator 12 Months</label>
            <input type="text" 
              class="12month"
              value="<?=$site_config['estimator']['12month'] ?>">
            </input>
          </div>
        </div>
        <div class="row erp">
          <div>
            <label>ERP 3 Months</label>
            <input type="text" 
              class="3month"
              value="<?=$site_config['erp']['3month'] ?>">
            </input>
          </div>
          <div>
            <label>ERP 6 Months</label>
            <input type="text" 
              class="6month"
              value="<?=$site_config['erp']['6month'] ?>">
            </input>
          </div>
          <div>
            <label>ERP 12 Months</label>
            <input type="text" 
              class="12month"
              value="<?=$site_config['erp']['12month'] ?>">
            </input>
          </div>
        </div>
        <div class="row">
          &nbsp;
        </div>
        <div class="row">
          <div>
            <button id="save_config">Save Site Config</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="editUser" class="modal hide">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit User</h2>
        <span class="close">&times;</span>
      </div>
      <div class="modal-body">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-10 register-form" id="register-form">
              <form name="form" id="register-form-form">
                <input type ="hidden" id="edit_user_id">
                <div class="container">
                  <div class="row gy-3">
                    <div class="form-row row">
                      <div class="col-6 form-group">
                        <label>YOUR FIRST NAME</label>
                        <input type="text" 
                               id="name"
                               class="form-control " 
                               name="name"
                               placeholder="Name" required>
                      </div> 
                      <!-- form-group end. -->
                      <div class="col-6 form-group">
                        <label>YOUR LAST NAME</label>
                        <input type="text" 
                               id="last_name"
                               class="form-control" 
                               name="lastname"
                               placeholder="Last Name" required>
                      </div> 
                      <!-- form-group end. -->
                    </div> 
                    <!-- form-row end. -->
                    <div class="col-12  form-group">
                      <label>YOUR COMPANY (Printing Press) NAME</label>
                      <input type="text"
                             id="company_name"
                             class="form-control"  
                             name="Company Name" 
                             placeholder="Company Name" required>
                    </div>
                      <div class="form-row row">
                        <div class="div-2 form-group">
                          <label>COMPANY GSTIN</label>
                          <input type="text"
                                 id="company_gstin"
                                 class="form-control company_gstin"  
                                 name="comppany_gstin" 
                                 placeholder="GSTIN"/>
                        </div>
                        <!-- form-group end. -->
                        <div class="div-2  form-group">
                          <label>PAN</label>
                          <input type="text"
                                 id="company_pan"
                                 class="form-control company_pan"  
                                 name="company_pan"
                                 placeholder="PAN"/>
                        </div>
                        <!-- form-group end. -->
                      </div><!-- end form-row -->
                    <div class ="col-12 form-group">
                      <label>
                        YOUR COMPANY (Printing Press) ADDRESS WITH CITY NAME IN 3 LINES
                      </label>
                      <div class="address-container">
                        <input type="text"
                               name="address1"
                               class="form-control address address-1"
                               placeholder="Address Line One"
                               id="address-1" required/>
                        <input type="text"
                               name="address2"
                               class="form-control address address-2"
                               placeholder="Address Line Two"
                               id="address-2" required/>
                        <input type="text"
                               name="city"
                               class="form-control address city"
                               placeholder="City"
                               id="city" required/>
                      </div>
                    </div>
                    <!-- form-group end. -->
                      <div class="col-12  form-group">
                        <label>JURISDICTION</label>
                        <input type="text"
                               id="jurisdiction"
                               class="form-control jurisdiction"  
                               placeholder="Jurisdiction">
                      </div>
                      <!-- form-group end. -->
                    <div class="col-12  form-group">
                      <label>YOUR E-MAIL ID</label>
                      <input type="email"
                             id="email"
                             class="form-control"  
                             name="email" 
                             placeholder="Email">
                    </div>
                    <!-- form-group end. -->
                    <div class="col-12  form-group">
                      <label>YOUR MOBILE NUMBER (Your login id)</label>
                      <input type="tel"
                             id="contact"
                             class="form-control"  
                             name="mobile" 
                             placeholder="Mobile No" required>
                    </div>
                    <!-- form-group end. -->
                    <div class="form-row row">
                      <div class="col-4 form-group">
                        <label>Account Plan</label>
                        <select id="plan"
                               class="form-control"  
                               name="plan" 
                               required>
                          <option value="demo">Demo</option>
                          <option value="basic">Basic</option>
                          <option value="estimator">Estimator</option>
                          <option value="erp">ERP</option>
                        </select>
                      </div>
                      <!-- form-group end. -->
                      <div class="col-4  form-group">
                        <label>Plan Expiry</label>
                        <input type="date" id="plan_expiry"
                               class="form-control"  
                               name="plan_expiry">
                      </div>
                      <!-- form-group end. -->
                      <div class="col-4  form-group">
                        <label>LifeTime Plan</label>
                        <input type="checkbox" id="plan_lifetime"
                               class="form-control"  
                               name="plan_lifetime">
                      </div>
                      <!-- form-group end. -->
                    </div><!-- form-row end -->
                    <div class="col-12  form-group">
                      <label>Demo Expiry</label>
                      <input type="date"
                             id="demo_expiry"
                             class="form-control"  
                             name="demo_expiry" >
                    </div>
                    <!-- form-group end. -->
                    <div class="form-row row">
                      <div class="form-group">
                        <label>
                          Bank Details
                        </label>
                      </div><!-- form-group end -->
                    </div><!-- form-row end -->
                    <div class="form-row row">
                      <div class="div-2 form-group">
                        <label>Beneficiary/ Account Name</label>
                        <input type="text"
                               class="form-control bank_beneficiary_name"  
                               id="bank_beneficiary_name" 
                               name="bank_beneficiary_name" 
                               placeholder="Beneficiary Name"/>
                      </div>
                      <!-- form-group end. -->
                      <div class="div-2  form-group">
                        <label>Bank Name</label>
                        <input type="text"
                               class="form-control bank_name"  
                               name="bank_name"
                               id="bank_name"
                               placeholder="Bank Name"/>
                      </div>
                      <!-- form-group end. -->
                    </div><!-- end form-row -->
                    <div class="form-row row">
                      <div class="div-2 form-group">
                        <label>Branch Name</label>
                        <input type="text"
                               class="form-control bank_branch_name"  
                               name="bank_branch_name" 
                               id="bank_branch_name" 
                               placeholder="Branch Name"/>
                      </div>
                      <!-- form-group end. -->
                      <div class="div-2  form-group">
                        <label>Type of Account</label>
                        <input type="text"
                               class="form-control bank_ac_type"  
                               name="bank_ac_type"
                               id="bank_ac_type"
                               placeholder="Bank Account Type"/>
                      </div>
                      <!-- form-group end. -->
                    </div><!-- end form-row -->
                    <div class="form-row row">
                      <div class="div-2 form-group">
                        <label>Account Number</label>
                        <input type="text"
                               class="form-control bank_ac_num"  
                               name="bank_ac_num" 
                               id="bank_ac_num" 
                               placeholder="Account Number"/>
                      </div>
                      <!-- form-group end. -->
                      <div class="div-2  form-group">
                        <label>IFSC Code/ NEFT</label>
                        <input type="text"
                               class="form-control bank_ifsc"  
                               name="bank_ifsc"
                               id="bank_ifsc"
                               placeholder="IFSC Code/ NEFT"/>
                      </div>
                      <!-- form-group end. -->
                    </div><!-- end form-row -->
                  </div>
                  <!-- end row -->
                </div>
                <!-- container end -->
              </form>
            </div>
            <!-- end register-form-->
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="update_user">Update User</button>
      </div>
    </div>
  </div>
  <div id="changePass" class="modal hide">
    <div class="modal-content">
      <div class="modal-header">
        <div class="header">
          <span class="paper-title">Changing Password For </span>
          <span class="paper-title" id="password_contact"></span>
          <span class="close">&times;</span>
        </div>
      </div>
      <div class="modal-body row">
        <input type="hidden" id="password_user_id">
        <div class="row form-group col-6">
          <label>New Password</label>
          <input type="password" 
                 id="new_password" 
                 placeholder="New Password" 
                 class="form-control">
        </div>
        <div class="row form-group col-6">
          <label>Confirm Password</label>
          <input type="password" 
                 id="confirm_password" 
                 placeholder="Confirm Password" 
                 class="form-control">
        </div>
      </div>
      <div class="modal-footer">
        <div class="footer">
        <button id="change_pass_submit">Change Password</button>
        </div>
      </div>
    </div>
  </div>
</body>
