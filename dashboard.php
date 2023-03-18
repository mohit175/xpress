<?php
$module = 'DASHBOARD';
require_once("login_required.php");
if(!isset($module)){
	die();
}
require_once("config.php");
require_once("top.php");
?>
		<div class="top row">
			<button class="top button" id="change_module"><?=$module;?></button><!--
			--><button class="top button" id="main_library">LIBRARIES</button><!--
			--><button class="top button" id="preferences">PREFERENCES</button><!--
			--><button class="top button" id="home_button">&nbsp;</button><!--
			--><button class="top button" id="quote_library_button">TEMPLATES</button><!--
			--><button class="top button" id="pdf_reports"> PDF REPORTS </button><!--
			--><button class="top button" id="log_out">LOG OUT</button>
		</div>
    <div id="main-content" class="hide">
      <div class="main-header">
        <h1 class="main-title">
        </h1>
        <div class="args customer">
          Customer
          <input type="text" class="customer_sel"></input>
        </div>
        <div class="args module">
          Module
          <select class="module">
            <option value="">Select</option>
            <option value="single_sheet">Single Sheet</option>
            <option value="multi_sheet">Multi Sheet</option>
            <option value="book">Book-Magazine</option>
            <option value="stationery">Stationery</option>
            <option value="calendar">Calendar</option>
            <option value="box">Box-Packaging</option>
          </select>
        </div>
        <div class="args vendor">
          Vendor
          <input type="text" class="vendor_sel"></input>
        </div>
        <div class="args delivery_no">
          Delivery Memo #
          <input type="text" class="delivery_no" ></input>
        </div>
        <div class="args po_no">
          PO #
          <input type="text" class="po_no" ></input>
        </div>
        <div class="args invoice_no">
          Invoice #
          <input type="text" class="invoice_no" ></input>
        </div>
        <div class="args quote_no">
          Quotation #
          <input type="text" class="quote_no" ></input>
        </div>
        <div class="args est_no">
          Estimate #
          <input type="text" class="est_no"></input>
        </div>
        <div class="args date">
          Date
          <select class="month">
            <option value="">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select class="year">
            <option value="">Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div class="args history">
          History
          <select class="history">
            <option value="">All Time</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">1 Year</option>
            <option value="24">2 Years</option>
          </select>
        </div>
      </div>
      <div class="inner-content">
      </div>
      <div class="main-footer">
        <div class="pages">
        </div>
        <div class="buttons">
          <button class="modal-btn preview">
            Preview
          </button>
          <button class="modal-btn download">
            Download
          </button>
        </div>
      </div>
    </div>
    <div id="home-div" >
			<div class="modal-content" >
        <div class="container">
          <div class="row">
            <div class="pentagon first">
              <picture>
                <source srcset="images/singlesheet.webp" 
                  type="image/webp">
                <source srcset="images/singlesheet.png" 
                  type="image/png"> 
                <img src="images/singlesheet.png">
              </picture>
              <a href="single_sheet.php">SINGLE-SHEET</a>
            </div>
            <div class="pentagon">
              <picture>
                <source srcset="images/stationery.webp" 
                  type="image/webp">
                <source srcset="images/stationery.png" 
                  type="image/png"> 
                <img src="images/stationery.png">
              </picture>
              <a href="stationery.php">STATIONERY</a>
            </div>
            <div class="pentagon">
              <picture>
                <source srcset="images/multi_sheet.webp" 
                  type="image/webp">
                <source srcset="images/multi_sheet.png" 
                  type="image/png"> 
                <img src="images/multi_sheet.png">
              </picture>
              <a href="multi_sheet.php">MULTI-SHEET</a>
            </div>
            <div class="pentagon">
              <picture>
                <source srcset="images/calendar.webp" 
                  type="image/webp">
                <source srcset="images/calendar.png" 
                  type="image/png"> 
                <img src="images/calendar.png">
              </picture>
              <a href="calendar.php">CALENDAR</a>
            </div>
          </div> <!-- end row-->
          <div class="row">
            <div class="pentagon first">
              <picture>
                <source srcset="images/book.webp" 
                  type="image/webp">
                <source srcset="images/book.png" 
                  type="image/png"> 
                <img src="images/book.png">
              </picture>
              <a href="book.php">BOOK<br/>MAGAZINE</a>
            </div>
            <div class="pentagon">
              <picture>
                <source srcset="images/box.webp" 
                  type="image/webp">
                <source srcset="images/box.png" 
                  type="image/png"> 
                <img src="images/box.png">
              </picture>
              <a href="box.php">BOX<br/>PACKAGING</a>
            </div>
            <div class="pentagon">
              <picture>
                <source srcset="images/binding.webp" 
                  type="image/webp">
                <source srcset="images/binding.png" 
                  type="image/png"> 
                <img src="images/binding.png">
              </picture>
              <a href="binding.php">BINDING<br/>BOOK</a>
            </div>
            <div class="pentagon">
              <picture>
                <source srcset="images/dashboard.webp" 
                  type="image/webp">
                <source srcset="images/dashboard.png" 
                  type="image/png"> 
                <img src="images/dashboard.png">
              </picture>
              <a href="dashboard.php">DASHBOARD</a>
            </div>
          </div> <!-- end row-->
        </div><!-- end container -->
			</div>
    </div>
		<div class="row dashboard modal-footer">
			<button class="modal-btn" id="manage_quotation">
        MANAGE ESTIMATES
      </button>
		</div>
<?php
require_once("bottom.php");
