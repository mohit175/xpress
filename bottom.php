<?php
if(!isset($module)){
	die();
}
?>
    </div><!-- END main-page -->
    <div id="previewModal" class="modal hide">
      <div class="modal-content">
        <div class="modal-header">
					<div class="header">
						<span class="modal-title"></span>
						<span class="close">&times;</span>
					</div>
        </div><!-- END modal header -->
        <div class="modal-body">
          <iframe class="preview_frame"></iframe>
        </div>
      </div>
    </div>
    <div id="customColorRateModal" class="modal hide">
      <div class="modal-content" >
        <div class="modal-header">
					<div class="header">
						<span class="modal-title">Print Color  Options</span>
						<span class="close">&times;</span>
					</div>
        </div><!-- END modal header -->
        <div class="modal-body">
          <div class="calc_base">
            Minimum 1000 Based Calculation
          </div>
          <input type="hidden" id="four_color_row">
          <div id="color_rate_1000_base">
            <div class="table" base="1000">
              <div class="table-header">
                <div class="table-column">
                  Minimum Amount <br/> 
                  Plate + Printing
                </div>
                <div class="table-column">
                  Plate<br/>
                  Cost
                </div>
                <div class="table-column">
                  Minimum For 1st<br/>
                  1000 Impressions
                </div>
              </div><!-- END table-header -->
            </div><!-- END table -->
            <div class="sample-row hide">
              <div class="table-row data-row">
                <div class="table-column count hide">
                </div>
                <div class="table-column plate_impressions">
                </div>
                <div class="table-column plate_cost_col">
                  <span class="plate_cost"></span>
                  <span> x </span><span class="colors"></span>
                  <span> = </span><span class="plate_cost_total"></span>
                </div>
                <div class="table-column min_impressions_col">
                  <span class="min_impressions"></span>
                  <span> x </span><span class="colors"></span>
                  <span> x 1(000) = </span>
                  <span class="min_impressions_total"></span>
                </div>
              </div><!-- END table-row -->
            </div>
          </div><!-- END four_color_row -->
          <div class="calc_base">
            Minimum 3000 Based Calculation
          </div>
          <div id="color_rate_3000_base">
            <div class="table"  base="3000">
              <div class="table-header">
                <div class="table-column">
                  Minimum Amount <br/> 
                  Plate + Printing
                </div>
                <div class="table-column">
                  Plate<br/>
                  Cost
                </div>
                <div class="table-column">
                  Minimum For 1st<br/>
                  3000 Impressions
                </div>
              </div><!-- END table-header -->
            </div><!-- END table -->
            <div class="sample-row hide">
              <div class="table-row data-row">
                <div class="table-column count hide">
                </div>
                <div class="table-column plate_impressions">
                </div>
                <div class="table-column plate_cost_col">
                  <span class="plate_cost"></span>
                  <span> x </span><span class="colors"></span>
                  <span> = </span><span class="plate_cost_total"></span>
                </div>
                <div class="table-column min_impressions_col">
                  <span class="min_impressions"></span>
                  <span> x </span><span class="colors"></span>
                  <span> x 3(000) = </span>
                  <span class="min_impressions_total"></span>
                </div>
              </div><!-- END table-row -->
            </div>
          </div><!-- END four color row -->
        </div><!--END modal body -->
        <div class="modal-footer">
          <button class="modal-btn" id="edit_custom_color_rate">
            Edit
          </button>
          <button class="modal-btn" id="apply_custom_color_rate">
            Apply
          </button>
        </div><!--END modal footer -->
      </div><!--END modal content -->
    </div><!--END modal -->
    <div id="editHSNCode" class="modal hide">
      <div class="modal-content">
        <div class="modal-header">
					<div class="header">
						<span class="modal-title">Edit HSN Code</span>
						<span class="close">&times;</span>
					</div>
        </div><!-- END modal header -->
        <div class="modal-body">
          <input type="hidden" class="hsn_id" value="">
          <div class="row">
            <div class="w-50 float-left">
              <h4>
                HSN
              </h4>
              <input type="text" class="hsn_code">
            </div>
            <div class="w-50">
              <h4>
                Name
              </h4>
              <input type="text" class="hsn_name">
            </div>
          </div>
          <div class="row">
            <div class="div-3 float-left">
              <h4>
                CGST
              </h4>
              <input type="text" class="hsn_cgst">
            </div>
            <div class="div-3">
              <h4>
                SGST
              </h4>
              <input type="text" class="hsn_sgst">
            </div>
            <div class="div-3">
              <h4>
                IGST
              </h4>
              <input type="text" class="hsn_igst">
            </div>
          </div>
          <div class="row">
            <div class="div-3 float-left">
              <h4>
                CGST Surcharge
              </h4>
              <input type="text" class="hsn_s_cgst">
            </div>
            <div class="div-3">
              <h4>
                SGST Surcharge
              </h4>
              <input type="text" class="hsn_s_sgst">
            </div>
            <div class="div-3">
              <h4>
                IGST Surcharge
              </h4>
              <input type="text" class="hsn_s_igst">
            </div>
          </div>
          <div class="row">
            <div class="div-3 float-left">
              <h4>
                Surcharge Start Date
              </h4>
              <input type="date" class="hsn_s_cgst_start">
            </div>
            <div class="div-3">
              <h4>
                Surcharge Start Date
              </h4>
              <input type="date" class="hsn_s_sgst_start">
            </div>
            <div class="div-3">
              <h4>
                Surcharge Start Date
              </h4>
              <input type="date" class="hsn_s_igst_start">
            </div>
          </div>
          <div class="row">
            <div class="div-3 float-left">
              <h4>
                Surcharge End Date
              </h4>
              <input type="date" class="hsn_s_cgst_end">
            </div>
            <div class="div-3">
              <h4>
                Surcharge End Date
              </h4>
              <input type="date" class="hsn_s_sgst_end">
            </div>
            <div class="div-3">
              <h4>
                Surcharge End Date
              </h4>
              <input type="date" class="hsn_s_igst_end">
            </div>
          </div>
          <div class="row">
            <div class="row">
              <h4>
                Description
              </h4>
              <textarea class="hsn_desc" rows="10"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="footer">
            <button id="save_hsn_button" 
              class="modal-btn">
              Save HSN
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="libraryModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						<span class="library-title">Library</span>
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
          <div class="tab-container">
            <div class="tab active" data-target="customerModal">
              Customers
            </div>
            <div class="tab Preferences_Minimums" data-target="preferences-minimums-tab">
              Process Rates
            </div>
            <div class="tab HSN_Codes" data-target="HSN_Codes">
              HSN Codes
            </div>
            <div class="tab Spot_color" data-target="Spot_color">
              Spot Colors / PMS
            </div>
            <div class="tab Paper_library" data-target="selectPaperModal">
              Paper Library
            </div>
            <div class="tab vendors" data-target="vendorLibrary">
              Vendors Library
            </div>
            <div class="tab warehouse hide" data-target="wareHouseLibrary">
              Godown
            </div>
            <div class="tab stationery" data-target="stationeryBinding">
              Stationery Binding
            </div>
            <div class="tab book_binding hide" data-target="bookBinding">
              Book Binding
            </div>
          </div>
          <div class="tab-body hide" id="wareHouseLibrary">
            <div class="modal-body" id="warehouse_table">
              <div class="warehouse_table table" >
                <div class="row table_header">
                  <div class="num">#</div>
                  <div class="warehouse_name">Godown Name<br/>
                  </div>
                </div>
              </div>
              <div class="sample-row hide">
                <div class="table-row data-row click" 
                  clickfunc="selectWareHouse"
                  item="user">
                  <div class="num count data_id"></div>
                  <div class="warehouse_name"></div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="footer">
                <button id="add_warehouse" 
                  class="modal-btn">
                  Add Godown
                </button>
                <button id="delete_warehouse" 
                  class="modal-btn">
                  Delete Godown
                </button>
              </div>
            </div>
          </div>
          <div class="tab-body hide" id="Spot_color">
            <div class="modal-body" >
              <div class="div-2" id="Spot_color_table">
                <div class="grid">
                  <div class="grid_header grid-row">
                    <div class="spot_color_name">
                    </div>
                  </div>
                  <div class="grid_header grid-row">
                    <div class="spot_color_name">
                      Spot Color
                    </div>
                  </div>
                  <div class="grid_header grid-row">
                    <div class="spot_color_name">
                    </div>
                  </div>
                </div>
                <div class="sample-row hide">
                  <div class="grid-row data-row">
                    <div class="spot_color_name data_id">
                    </div>
                  </div>
                </div>
              </div>
              <div class="div-2" id="PMS_color_table">
                <div class="grid">
                  <div class="grid_header grid-row">
                    <div class="spot_color_name">
                    </div>
                  </div>
                  <div class="grid_header grid-row">
                    <div class="pms_color_name">
                      PMS # / Name
                    </div>
                  </div>
                  <div class="grid_header grid-row">
                    <div class="pms_color_name">
                    </div>
                  </div>
                </div>
                <div class="sample-row hide">
                  <div class="grid-row data-row">
                    <div class="pms_color_name data_id">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="footer">
                <div>
                  <label>Color Name</label>
                  <input type="text" id="new_spot_color_name" class="float-right"></input>
                </div>
                <div>
                  <button id="Add_spot_color" 
                    class="modal-button modal-btn float-right">
                    Add New Spot Color
                  </button>
                </div>
                <div>
                  <button id="Add_pms_color" 
                    class="modal-button modal-btn float-right">
                    Add New PMS Color
                  </button>
                </div>
                <div>
                  <button id="Delete_spot_color" 
                    class="modal-button modal-btn float-right">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-body hide" id="preferences-minimums-tab">
            <div class="modal-body">
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                  </div>
                  <div class="preferences_option">
                    Rate Per <br/>
                    100 inches²
                  </div>
                  <div class="preferences_option">
                    Minimum<br/>
                    Charges<br/>
                    Amount
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                  </div>
                  <div class="preferences_option">
                    Rate Per <br/>
                    1000
                  </div>
                  <div class="preferences_option">
                    Minimum<br/>
                    Charges<br/>
                    Amount
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                  </div>
                  <div class="preferences_option">
                    Rate Per <br/>
                    Each
                  </div>
                  <div class="preferences_option">
                    Minimum<br/>
                    Charges<br/>
                    Amount
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    Lamination Matte
                  </div>
                  <div class="preferences_option">
                    <input id="lamination-matt_100">
                  </div>
                  <div class="preferences_option">
                    <input id="lamination-matt_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Folding (M/c OR Hand)
                  </div>
                  <div class="preferences_option">
                    <input id="folding-hand-mc_1000">
                  </div>
                  <div class="preferences_option">
                    <input id="folding-hand-mc_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Embossing
                  </div>
                  <div class="preferences_option">
                    <input id="embossing_each">
                  </div>
                  <div class="preferences_option">
                    <input id="embossing_min">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    Lamination Gloss
                  </div>
                  <div class="preferences_option">
                    <input id="lamination-gloss_100">
                  </div>
                  <div class="preferences_option">
                    <input id="lamination-gloss_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Creasing (Die Punching)
                  </div>
                  <div class="preferences_option">
                    <input id="creasing-die-punch_1000">
                  </div>
                  <div class="preferences_option">
                    <input id="creasing-die-punch_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Spot UV
                  </div>
                  <div class="preferences_option">
                    <input id="spotuv_each">
                  </div>
                  <div class="preferences_option">
                    <input id="spotuv_min">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    Drip-Off
                  </div>
                  <div class="preferences_option">
                    <input id="drip-off_100">
                  </div>
                  <div class="preferences_option">
                    <input id="drip-off_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Scoring
                  </div>
                  <div class="preferences_option">
                    <input id="creasing-scoring_1000">
                  </div>
                  <div class="preferences_option">
                    <input id="creasing-scoring_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Foil Stamping
                  </div>
                  <div class="preferences_option">
                    <input id="foil-stamping_each">
                  </div>
                  <div class="preferences_option">
                    <input id="foil-stamping_min">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    Aqueous
                  </div>
                  <div class="preferences_option">
                    <input id="aqueous-coating_100">
                  </div>
                  <div class="preferences_option">
                    <input id="aqueous-coating_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Sorting/ Stripping
                  </div>
                  <div class="preferences_option">
                    <input id="stripping_1000">
                  </div>
                  <div class="preferences_option">
                    <input id="stripping_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Staple Cost - Side
                  </div>
                  <div class="preferences_option">
                    <input id="staple-cost-side_each">
                  </div>
                  <div class="preferences_option">
                    <input id="staple-cost-side_min">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    UV Flood
                  </div>
                  <div class="preferences_option">
                    <input id="uv-coating-flood_100">
                  </div>
                  <div class="preferences_option">
                    <input id="uv-coating-flood_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Glueing/Pasting
                  </div>
                  <div class="preferences_option">
                    <input id="glueing_1000">
                  </div>
                  <div class="preferences_option">
                    <input id="glueing_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Staple Cost - Saddle
                  </div>
                  <div class="preferences_option">
                    <input id="staple-cost-saddle_each">
                  </div>
                  <div class="preferences_option">
                    <input id="staple-cost-saddle_min">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    Varnish
                  </div>
                  <div class="preferences_option">
                    <input id="varnishing_100">
                  </div>
                  <div class="preferences_option">
                    <input id="varnishing_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                  Numbering/Perforation
                  </div>
                  <div class="preferences_option">
                    <input id="numbing_1000">
                  </div>
                  <div class="preferences_option">
                    <input id="numbing_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                    Staple Cost - Loop
                  </div>
                  <div class="preferences_option">
                    <input id="staple-cost-loop_each">
                  </div>
                  <div class="preferences_option">
                    <input id="staple-cost-loop_min">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    MetPet
                  </div>
                  <div class="preferences_option">
                    <input id="met-pet_100">
                  </div>
                  <div class="preferences_option">
                    <input id="met-pet_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                  </div>
                  <div class="preferences_option">
                  </div>
                  <div class="preferences_option">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                  </div>
                  <div class="preferences_option">
                  </div>
                  <div class="preferences_option">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
              <div class="row">
                <div class="div">
                  <div class="preferences_text">
                    Blister
                  </div>
                  <div class="preferences_option">
                    <input id="blister_100">
                  </div>
                  <div class="preferences_option">
                    <input id="blister_min">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                  </div>
                  <div class="preferences_option">
                  </div>
                  <div class="preferences_option">
                  </div>
                </div><!-- END div -->
                <div class="div">
                  <div class="preferences_text">
                  </div>
                  <div class="preferences_option">
                  </div>
                  <div class="preferences_option">
                  </div>
                </div><!-- END div -->
              </div><!-- END row -->
            </div><!-- END Modal Body -->
            <div class="modal-footer">
                <button class=" modal-btn" id="save_process_rates">
                  update process rates
                </button>
            </div>
          </div><!-- END tab-body -->
          <div class="tab-body hide" id="HSN_Codes">
            <div class="modal-body" id="HSN_Codes_table">
              <div class="table" >
                <div class="row table_header">
                  <div class="count">
                    #
                  </div>
                  <div class="hsn_code">
                    HSN Code
                  </div>
                  <div class="name">
                    Name
                  </div>
                  <div class="desc">
                    Description
                  </div>
                  <div class="cgst">
                    CGST Rate
                  </div>
                  <div class="sgst">
                    SGST Rate
                  </div>
                  <div class="igst">
                    IGST Rate
                  </div>
                  <div class="surcharge hide s_cgst">
                    Surcharge CGST Rate
                  </div>
                  <div class="surcharge hide hsn_s_cgst_start">
                    Surcharge start date
                  </div>
                  <div class="surcharge hide hsn_s_cgst_end">
                    Surcharge end date
                  </div>
                  <div class="surcharge hide s_sgst">
                    Surcharge SGST Rate
                  </div>
                  <div class="surcharge hide hsn_s_sgst_start">
                    Surcharge start date
                  </div>
                  <div class="surcharge hide hsn_s_sgst_end">
                    Surcharge end date
                  </div>
                  <div class="surcharge hide s_igst">
                    Surcharge IGST Rate
                  </div>
                  <div class="surcharge hide hsn_s_igst_start">
                    Surcharge start date
                  </div>
                  <div class="surcharge hide hsn_s_igst_end">
                    Surcharge end date
                  </div>
                </div>
              </div>
              <div class="sample-row hide">
                <div class="table-row data-row">
                  <div class="data_id hide">
                  </div>
                  <div class="count">
                  </div>
                  <div class="hsn">
                  </div>
                  <div class="name">
                  </div>
                  <div class="description">
                  </div>
                  <div class="cgst">
                  </div>
                  <div class="sgst">
                  </div>
                  <div class="igst">
                  </div>
                  <div class="surcharge hide s_cgst">
                  </div>
                  <div class="surcharge hide hsn_s_cgst_start">
                  </div>
                  <div class="surcharge hide hsn_s_cgst_end">
                  </div>
                  <div class="surcharge hide s_sgst">
                  </div>
                  <div class="surcharge hide hsn_s_sgst_start">
                  </div>
                  <div class="surcharge hide hsn_s_sgst_end">
                  </div>
                  <div class="surcharge hide s_igst">
                  </div>
                  <div class="surcharge hide hsn_s_igst_start">
                  </div>
                  <div class="surcharge hide hsn_s_igst_end">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="footer">
                <button id="screen_default_hsn_button" 
                  class="modal-btn">
                  Screen Default
                </button>
                <button id="edit_hsn_button" 
                  class="modal-btn">
                  Edit  HSN
                </button>
                <button id="delete_hsn_button" 
                  class="modal-btn">
                  Delete HSN
                </button>
                <button id="new_hsn_button" class="modal-btn">
                  Add New HSN
                </button>
              </div>
            </div>
          </div>
          <div class="tab-body" id="customerModal">
            <div class="modal-body" id="customer_table">
              <div class="customer_table table" >
                <div class="row table_header">
                  <div class="num">#</div>
                  <div class="company_name">Company Name<br/>
                    <input type="text" id="lib_customer"></input>
                  </div>
                  <div class="contact_person">Contact Person</div>
                  <div class="contact_number">Contact Number</div>
                  <div class="email">Email</div>
                  <div class="address">Address</div>
                </div>
              </div>
              <div class="sample-row hide">
                <div class="table-row data-row click" 
                  clickfunc="selectCustomer"
                  item="user">
                  <div class="num count data_id"></div>
                  <div class="company_name"></div>
                  <div class="contact_person person_name"></div>
                  <div class="contact_number"></div>
                  <div class="email"></div>
                  <div class="address"></div>
                  <div class="gstin hide"></div>
                  <div class="shipping_address hide"></div>
                  <div class="shipping_state hide"></div>
                  <div class="state hide"></div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="footer">
                <button id="edit_customer_button" 
                  class="modal-btn">
                  Edit  Customer
                </button>
                <button id="delete_customer_button" 
                  class="modal-btn">
                  Delete Customer
                </button>
                <button id="new_customer_button" class="add_customer_button">
                  Add New Customer
                </button>
              </div>
            </div>
          </div>
          <div class="tab-body hide" id="vendorLibrary">
            <div class="modal-body" id="vendor_table">
              <div class="vendor_table table" >
                <div class="row table_header">
                  <div class="num">#</div>
                  <div class="company_name">Company Name </div>
                  <div class="contact_person">Contact Person</div>
                  <div class="contact_number">Contact Number</div>
                  <div class="email">Email</div>
                  <div class="address">Address</div>
                </div>
              </div>
              <div class="sample-row hide">
                <div class="table-row data-row" >
                  <div class="num count data_id"></div>
                  <div class="company_name"></div>
                  <div class="contact_person person_name"></div>
                  <div class="contact_number"></div>
                  <div class="email"></div>
                  <div class="address"></div>
                  <div class="gstin hide"></div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="footer">
                <button id="edit_vendor" 
                  class="modal-btn">
                  Edit Vendor
                </button>
                <button id="delete_vendor" 
                  class="modal-btn">
                  Delete Vendor
                </button>
                <button id="new_vendor" class="modal-btn">
                  Add New Vendor
                </button>
              </div>
            </div>
          </div>
          <div class="tab-body hide" id="bookBinding">
            <div class="modal-body">
              <div class="row">
                <div class="book-size">Book Size</div>
                <div class="manual">Manual<br>(Paper Back)</div>
                <div class="perfect">Perfect<br>(Machine)</div>
                <div class="hard">Case<br>Binding</div>
              </div>
              <div class="row cost">
                <div class="book-size">Demy (18" x 23") 1/4 Size 11.5" x 9" (Untrimmed)</div>
                <div class="manual"><input></input></div>
                <div class="perfect"><input></input></div>
                <div class="hard"><input></input></div>
              </div>
              <div class="row cost">
                <div class="book-size">Demy (18" x 23") 1/8 Size 9" x 5.75" (Untrimmed)</div>
                <div class="manual"><input></input></div>
                <div class="perfect"><input></input></div>
                <div class="hard"><input></input></div>
              </div>
              <div class="row cost">
                <div class="book-size">Demy (18" x 23") 1/16 Size 5.75" x 4.5" (Untrimmed)</div>
                <div class="manual"><input></input></div>
                <div class="perfect"><input></input></div>
                <div class="hard"><input></input></div>
              </div>
              <div class="row cost">
                <div class="book-size">Crown (15" x 20") 1/4 Size 10" x 7.5" (Untrimmed)</div>
                <div class="manual"><input></input></div>
                <div class="perfect"><input></input></div>
                <div class="hard"><input></input></div>
              </div>
              <div class="row cost">
                <div class="book-size">Crown (15" x 20") 1/8 Size 7.5" x 5" (Untrimmed)</div>
                <div class="manual"><input></input></div>
                <div class="perfect"><input></input></div>
                <div class="hard"><input></input></div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="footer">
                <button id="update_book_binding_lib" 
                  class="modal-button modal-btn float-right">
                  Update Library
                </button>
              </div>
            </div>
          </div>
          <div class="tab-body hide" id="stationeryBinding">
            <div class="modal-body">
              <div class="row">
                <div class="size_format">
                  Finish Cut/Fold<br/>
                  Size Format
                </div>
                <div class="Pad_Bound">
                  Pad Binding
                </div>
                <div class="Top_Cover_Paper">
                  Top Cover (Kachcha) Binding
                </div>
                <div class="Hard_Bound">
                  Hard (Pakka) Binding
                </div>
                <div class="Cloth_Bound">
                  Full Cloth Binding
                </div>
                <div class="Binding_Charges_Text">
                  
                </div>
                <div class="Binding_Charges">
                  <div>
                    Numbering / Perforation Charges Per 1000
                  </div>
                </div>
              </div>
              <div class="row size_16">
                <div class="size_format">
                  1/16
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
                <div class="Binding_Charges_Text">
                  By Hand
                </div>
                <div class="Binding_Charges_Hand">
                  <input></input>
                </div>
              </div>
              <div class="row size_12">
                <div class="size_format">
                  1/12
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
                <div class="Binding_Charges_Text">
                  By Machine 
                </div>
                <div class="Binding_Charges_MC">
                  <input></input>
                </div>
              </div>
              <div class="row size_10">
                <div class="size_format">
                  1/10
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
                <div class="Binding_Charges_Text">
                  Digital
                </div>
                <div class="Binding_Charges_Digital">
                  <input></input>
                </div>
              </div>
              <div class="row size_9">
                <div class="size_format">
                  1/9
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
              </div>
              <div class="row size_8">
                <div class="size_format">
                  1/8
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
              </div>
              <div class="row size_6">
                <div class="size_format">
                  1/6
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
              </div>
              <div class="row size_5">
                <div class="size_format">
                  1/5
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
              </div>
              <div class="row size_4">
                <div class="size_format">
                  1/4
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
              </div>
              <div class="row size_3">
                <div class="size_format">
                  1/3
                </div>
                <div class="Pad_Bound">
                  <input></input>
                </div>
                <div class="Top_Cover_Paper">
                  <input></input>
                </div>
                <div class="Hard_Bound">
                  <input></input>
                </div>
                <div class="Cloth_Bound">
                  <input></input>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="footer">
                <button id="update_stationery_binding_lib" 
                  class="modal-button modal-btn float-right">
                  Update Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
		<div id="changePasswordModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Change Password
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
					<div class="div-2">
					  <label>New Password</label>
						<input type="password" 
									 id="new-password">
					</div>
					<div class="div-2">
						<label>Confirm New Password</label>
						<input type="password" 
									 id="confirm-new-password">
					</div>
				</div>
				<div class="modal-footer">
					<div class="footer">
						<div>
							<button class="btn" id="confirm-password">
								Change Password
							</button>	
						</div>
					</div>
				</div>
			</div>
		</div>
    <div id="AddPurchaseOrderPaperModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
            <span>
						  Add Purchase Order
            </span>
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
		<div id="selectPaperModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
            <span>
						  Paper Library
            </span>
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
          <?php
             require("inc/templates/paper.php");
          ?>
				</div>
        <div class="modal-footer" item="paper">
          <button id="savePaper" class="button modal-btn" func="addNewPaper">
            Save Paper To Library
          </button>
          <button id="choosePaper" class="button modal-btn" func="choosePaper">
            Apply Paper to Job
          </button>
          <button id="editPaper" class="button modal-btn" func="editPaper">Edit Paper</button>
          <button id="deletePaper" class="button modal-btn" func="deletePaper">Delete Paper</button>
          <button id="clearPaper" class="button modal-btn" func="clearPaper">Refresh</button>
          <button class="button modal-btn" func="AddPaperStock">
            Add Paper Stock
          </button>
          <button class="button modal-btn" func="AdjustPaperStock">
            Adjust Paper Stock
          </button>
        </div>
			</div>
		</div>
		<div id="addCustomerModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
            <span id="edit_customer_header">
						  Add Customer Details
            </span>
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
          <input type="hidden" id="edit_customer_id" value="">
          <div class="row">
            <div class="w-50 float-left">
              <h4>
                Company Name
              </h4>
              <input type="text" id="cust_company_name">
            </div>
            <div class="w-50">
              <h4>
                Contact Person
              </h4>
              <input type="text" id="cust_contact_person">
            </div>
          </div>
          <div class="row">
            <div class="w-50 float-left">
              <h4>
                Contact Number
              </h4>
              <input type="text" id="cust_contact_number">
            </div>
            <div class="w-50">
              <h4>
                Email
              </h4>
              <input type="text" id="cust_email">
            </div>
          </div>
          <div class="row">
            <div class="w-50">
              <h4>
                Company GSTIN
              </h4>
              <input type="text" id="cust_gstin">
            </div>
          </div>
          <div class="row">
                <h4>
                  Address
                </h4>
            <textarea id="cust_address"></textarea>
          </div>
          <div class="row">
            <div class="w-50">
              <h4>
                State
              </h4>
              <select id="cust_state">
                <option state_code="" value="">Select</option>
                <option state_code="35" value="Andaman">Andaman</option>
                <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option state_code="18" value="Assam">Assam</option>
                <option state_code="10" value="Bihar">Bihar</option>
                <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                <option state_code="04" value="Chandigarh">Chandigarh</option>
                <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                <option state_code="26" value="Dadra">Dadra</option>
                <option state_code="25" value="Daman">Daman</option>
                <option state_code="07" value="Delhi">Dehli</option>
                <option state_code="25" value="Diu">Diu</option>
                <option state_code="96" value="Foreign Country">Foreign Country</option>
                <option state_code="30" value="Goa">Goa</option>
                <option state_code="24" value="Gujrat">Gujrat</option>
                <option state_code="06" value="Haryana">Haryana</option>
                <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                <option state_code="01" value="Jammu">Jammu</option>
                <option state_code="20" value="Jarkhand">Jarkhand</option>
                <option state_code="32" value="Karela">Karela</option>
                <option state_code="29" value="Karnataka">Karnataka</option>
                <option state_code="01" value="Kashmir">Kashmir</option>
                <option state_code="38" value="Ladakh">Ladakh</option>
                <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                <option state_code="27" value="Maharastra">Maharastra</option>
                <option state_code="14" value="Manipur">Manipur</option>
                <option state_code="17" value="Meghalaya">Meghlaya</option>
                <option state_code="15" value="Mizoram">Mizoram</option>
                <option state_code="13" value="Nagaland">Nagaland</option>
                <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                <option state_code="21" value="Odisha">Odisha</option>
                <option state_code="97" value="Other Territory">Other Territory</option>
                <option state_code="34" value="Puducherry">Puducherry</option>
                <option state_code="03" value="Punjab">Punjab</option>
                <option state_code="08" value="Rajasthan">Rajasthan</option>
                <option state_code="11" value="Sikkim">Sikkim</option>
                <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                <option state_code="36" value="Telangana">Telangana</option>
                <option state_code="16" value="Tripura">Tripura</option>
                <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                <option state_code="19" value="West Bengal">Mest Bengal</option>
              </select>
            </div>
          </div>
          <div class="row">
                <h4>
                  Shipping Address
                </h4>
            <textarea id="cust_shipping_address"></textarea>
          </div>
          <div class="row">
            <div class="w-50">
              <h4>
                State
              </h4>
              <select id="cust_shipping_state">
                <option state_code="" value="">Select</option>
                <option state_code="35" value="Andaman">Andaman</option>
                <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option state_code="18" value="Assam">Assam</option>
                <option state_code="10" value="Bihar">Bihar</option>
                <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                <option state_code="04" value="Chandigarh">Chandigarh</option>
                <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                <option state_code="26" value="Dadra">Dadra</option>
                <option state_code="25" value="Daman">Daman</option>
                <option state_code="07" value="Delhi">Dehli</option>
                <option state_code="25" value="Diu">Diu</option>
                <option state_code="96" value="Foreign Country">Foreign Country</option>
                <option state_code="30" value="Goa">Goa</option>
                <option state_code="24" value="Gujrat">Gujrat</option>
                <option state_code="06" value="Haryana">Haryana</option>
                <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                <option state_code="01" value="Jammu">Jammu</option>
                <option state_code="20" value="Jarkhand">Jarkhand</option>
                <option state_code="32" value="Karela">Karela</option>
                <option state_code="29" value="Karnataka">Karnataka</option>
                <option state_code="01" value="Kashmir">Kashmir</option>
                <option state_code="38" value="Ladakh">Ladakh</option>
                <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                <option state_code="27" value="Maharastra">Maharastra</option>
                <option state_code="14" value="Manipur">Manipur</option>
                <option state_code="17" value="Meghalaya">Meghlaya</option>
                <option state_code="15" value="Mizoram">Mizoram</option>
                <option state_code="13" value="Nagaland">Nagaland</option>
                <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                <option state_code="21" value="Odisha">Odisha</option>
                <option state_code="97" value="Other Territory">Other Territory</option>
                <option state_code="34" value="Puducherry">Puducherry</option>
                <option state_code="03" value="Punjab">Punjab</option>
                <option state_code="08" value="Rajasthan">Rajasthan</option>
                <option state_code="11" value="Sikkim">Sikkim</option>
                <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                <option state_code="36" value="Telangana">Telangana</option>
                <option state_code="16" value="Tripura">Tripura</option>
                <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                <option state_code="19" value="West Bengal">Mest Bengal</option>
              </select>
            </div>
          </div>
				</div>
				<div class="modal-footer">
					<div class="footer">
					  <button id="add_customer_button" class="modal-btn">Save Customer</button>
					</div>
				</div>
			</div>
		</div>
		<div id="AddEditVendor" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						  Vendor Details
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
          <input type="hidden" class="id" value="">
          <div class="row">
            <div class="w-50 float-left">
              <h4>
                Company Name
              </h4>
              <input type="text" class="company_name">
            </div>
            <div class="w-50">
              <h4>
                Contact Person
              </h4>
              <input type="text" class="contact_person">
            </div>
          </div>
          <div class="row">
            <div class="w-50 float-left">
              <h4>
                Contact Number
              </h4>
              <input type="text" class="contact_number">
            </div>
            <div class="w-50">
              <h4>
                Email
              </h4>
              <input type="text" class="email">
            </div>
          </div>
          <div class="row">
            <div class="w-50">
              <h4>
                Company GSTIN
              </h4>
              <input type="text" class="gstin">
            </div>
          </div>
          <div class="row">
                <h4>
                  Address
                </h4>
            <textarea class="address"></textarea>
          </div>
          <div class="row">
            <div class="w-50">
              <h4>
                State
              </h4>
              <select class="state">
                <option state_code="" value="">Select</option>
                <option state_code="35" value="Andaman">Andaman</option>
                <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option state_code="18" value="Assam">Assam</option>
                <option state_code="10" value="Bihar">Bihar</option>
                <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                <option state_code="04" value="Chandigarh">Chandigarh</option>
                <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                <option state_code="26" value="Dadra">Dadra</option>
                <option state_code="25" value="Daman">Daman</option>
                <option state_code="07" value="Delhi">Dehli</option>
                <option state_code="25" value="Diu">Diu</option>
                <option state_code="96" value="Foreign Country">Foreign Country</option>
                <option state_code="30" value="Goa">Goa</option>
                <option state_code="24" value="Gujrat">Gujrat</option>
                <option state_code="06" value="Haryana">Haryana</option>
                <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                <option state_code="01" value="Jammu">Jammu</option>
                <option state_code="20" value="Jarkhand">Jarkhand</option>
                <option state_code="32" value="Karela">Karela</option>
                <option state_code="29" value="Karnataka">Karnataka</option>
                <option state_code="01" value="Kashmir">Kashmir</option>
                <option state_code="38" value="Ladakh">Ladakh</option>
                <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                <option state_code="27" value="Maharastra">Maharastra</option>
                <option state_code="14" value="Manipur">Manipur</option>
                <option state_code="17" value="Meghalaya">Meghlaya</option>
                <option state_code="15" value="Mizoram">Mizoram</option>
                <option state_code="13" value="Nagaland">Nagaland</option>
                <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                <option state_code="21" value="Odisha">Odisha</option>
                <option state_code="97" value="Other Territory">Other Territory</option>
                <option state_code="34" value="Puducherry">Puducherry</option>
                <option state_code="03" value="Punjab">Punjab</option>
                <option state_code="08" value="Rajasthan">Rajasthan</option>
                <option state_code="11" value="Sikkim">Sikkim</option>
                <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                <option state_code="36" value="Telangana">Telangana</option>
                <option state_code="16" value="Tripura">Tripura</option>
                <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                <option state_code="19" value="West Bengal">Mest Bengal</option>
              </select>
            </div>
          </div>
				</div>
				<div class="modal-footer">
					<div class="footer">
					  <button id="save_vendor" class="modal-btn">Save Vendor</button>
					</div>
				</div>
			</div>
		</div>
		<div id="quotationLibraryModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
            <div class="quote_args module">
              Module
              <select id="quote_library_module">
                <option value = "">Select</option>
                <option value = "single_sheet">Single Sheet</option>
                <option value = "multi_sheet">Multi Sheet</option>
                <option value = "book">Book-Magazine</option>
                <option value = "stationery">Stationery</option>
                <option value = "calender">Calender</option>
                <option value = "box">Box-Packaging</option>
              </select>
            </div>
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
          <div id="quote_library_body"></div>
				</div>
				<div class="modal-footer">
          <?php
            if($user->isAdmin()){
            ?>
          <button id="save_quote_library" class="quote_buttons">
            Save Estimate
          </button>
          <button id="edit_quote_library" class="quote_buttons">
            Edit Estimate
          </button>
          <?php
          }?>
          <button id="copy_quote_library" class="quote_buttons">
            Copy Estimate
          </button>
          <?php
            if($user->isAdmin()){
            ?>
          <button id="delete_quote_library" class="quote_buttons">
            Delete Estimate
          </button>
          <?php
          }?>
          <button id="back_quote_library" class="quote_buttons">
            Back
          </button>
        </div>
			</div>
		</div>
		<div id="quotationModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
            <div class="quote_args customer">
              Customer
              <input class="customer_sel" id="quote_customer"/>
            </div>
            <div class="quote_args module">
              Module
              <select id="quote_module">
                <option value = "">Select</option>
                <option value = "single_sheet">Single Sheet</option>
                <option value = "multi_sheet">Multi Sheet</option>
                <option value = "book">Book-Magazine</option>
                <option value = "stationery">Stationery</option>
                <option value = "calendar">Calendar</option>
                <option value = "box">Box-Packaging</option>
              </select>
            </div>
            <div class="quote_args month_year">
              Date
              <select id="quote_month">
                <option value = "">Month</option>
                <option value = "1">January</option>
                <option value = "2">February</option>
                <option value = "3">March</option>
                <option value = "4">April</option>
                <option value = "5">May</option>
                <option value = "6">June</option>
                <option value = "7">July</option>
                <option value = "8">August</option>
                <option value = "9">September</option>
                <option value = "10">October</option>
                <option value = "11">November</option>
                <option value = "12">December</option>
              </select>
              <select id="quote_year">
                <option value = "">Year</option>
                <option value = "2020">2020</option>
                <option value = "2021">2021</option>
                <option value = "2022">2022</option>
                <option value = "2023">2023</option>
              </select>
            </div>
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
          <div id="quote_body"></div>
          <div id="quote_page"></div>
				</div>
				<div class="modal-footer">
          <button class="add_estimate quote_buttons hide">
            Add Estimate
          </button>
          <button id="edit_quote" class="quote_buttons">
            Edit Estimate
          </button>
          <button id="copy_quote" class="quote_buttons">
            Copy Estimate
          </button>
          <button id="lock_quote" class="quote_buttons">
            Lock Estimate
          </button>
          <button id="delete_quote" class="quote_buttons">
            Delete Estimate
          </button>
          <button id="copy_desc" class="quote_buttons">
            Copy Description
          </button>
          <button id="back_quote" class="quote_buttons">
            Back
          </button>
        </div>
			</div>
		</div>
		<div id="BindingModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
            Binding
					  <span class="close">&times;</span>
          </div>
				</div>
				<div class="modal-body">
          <table class="binding_table" id="binding_table">
            <thead>
              <tr>
                <th class="book_binding_type">
                  Manual (Hand-Pasted) Binding / Perfect (M/c) Binding /Case (Hard) Binding<br/>
                  In Various Sizes & Binding Charges Per Book<br/>
                  <hr>
                  <span class="book_size">
                    Book Size
                  </span>
                  <span class="book_manual">
                    Manual <br/>(Paper Back)
                  </span>
                  <span class="book_perfect">
                    Perfect <br/>(Machine)
                  </span>
                  <span class="book_case">
                    Case <br/>Binding
                  </span>
                </th>
                <th class="bind_total_pgs">
                  Total <br/>Pages <br/>(Both- <br/> Sides)
                </th>
                <th class="bind_sheet_sig">
                  No. of<br/>
                  Pages In<br/>
                  Folding-<br/>
                  Sheets<br/>
                  Signature<br/>
                </th>
                <th class="bind_folding">
                  Folding<br/>
                  Charges<br/>
                  Per 1000<br/>
                  Sheets
                </th>
                <th class="bind_collating">
                  Collating<br/>
                  Charges<br/>
                  Per 1000<br/>
                  Sheets
                </th>
                <th class="bind_stapling">
                  Stapling<br/>
                  Charges<br/>
                  Per 1000<br/>
                  Books
                </th>
                <th class="bind_sewing">
                  Sewing<br/>
                  Charges<br/>
                  Per 1000<br/>
                  Sections
                </th>
                <th class="profit hide" colspan="2">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody id="binding_inputs">
              <tr>
                <td class="book_binding_type">
                  <select class="book_size">
                    <option value="" selected disabled>
                      Select
                    </option>
                    <option value="1">
                      Demy (18" x 23") 1/4 Size 11.5" x 9" (Untrimmed)
                    </option>
                    <option value="2">
                      Demy (18" x 23") 1/8 Size 9" x 5.75" (Untrimmed)
                    </option>
                    <option value="3">
                      Demy (18" x 23") 1/16 Size 5.75" x 4.5" (Untrimmed)
                    </option>
                    <option value="4">
                      Crown (15" x 20") 1/4 Size 10" x 7.5" (Untrimmed)
                    </option>
                    <option value="5">
                      Crown (15" x 20") 1/8 Size 7.5" x 5" (Untrimmed)
                    </option>
                    <option value="6">
                      Custom
                    </option>
                  </select>
                  <input class="book_manual">
                  <input class="book_perfect">
                  <input class="book_case">
                </td>
                <td class="bind_total_pgs">
                  <input class="bind_total_pgs">
                </td>
                <td class="bind_sheet_sig">
                  <input class="bind_sheet_sig">
                </td>
                <td class="bind_folding">
                  <input class="bind_folding">
                </td>
                <td class="bind_collating">
                  <input class="bind_collating">
                </td>
                <td class="bind_stapling">
                  <input class="bind_stapling">
                </td>
                <td class="bind_sewing">
                  <input class="bind_sewing">
                </td>
                <td class="profit hide" colspan="2">
                  <select class="profit_type">
                    <option value="">Select</option>
                    <option value="percernt">In %</option>
                    <option value="amt">In Amt</option>
                  </select>
                  <input class="profit_inp"></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="results row">
            <div class="div-3 result_div">
              <div class="row title-row">
                <div class="title-res title">
                  Manual (Hand-Pasted) <br/>Binding
                </div>
                <div class="bind-res">
                  Cost Per<br/>
                  Book
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  Only Stapling (Side/Saddle/Loop)
                </div>
                <div class="bind-res manual-staple-cost">
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  Manual Pasting With Stapling
                </div>
                <div class="bind-res manual-paste-cost">
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  Manual Pasting With Sewing
                </div>
                <div class="bind-res manual-sewing-cost">
                </div>
              </div>
            </div>
            <div class="div-3 result_div">
              <div class="row title-row">
                <div class="title-res title">
                  Perfect (M/c) <br/>Binding
                </div>
                <div class="bind-res">
                  Cost Per<br/>
                  Book
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  Without Stapling & Sewing
                </div>
                <div class="bind-res perfect-cost">
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  With Stapling
                </div>
                <div class="bind-res perfect-staple-cost">
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  With Sewing 
                </div>
                <div class="bind-res perfect-sewing-cost">
                </div>
              </div>
            </div>
            <div class="div-3 result_div">
              <div class="row title-row">
                <div class="title-res title">
                  Case (Hard) <br/>Binding
                </div>
                <div class="bind-res">
                  Cost Per<br/>
                  Book
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  With Stapling
                </div>
                <div class="bind-res hard-staple-cost">
                </div>
              </div>
              <div class="bind row">
                <div class="title-res">
                  With Sewing
                </div>
                <div class="bind-res hard-sew-cost">
                </div>
              </div>
              <div class="row text-center binding-info">
                SELECT TO APPLY FOR BINDING COST.
              </div>
            </div>
          </div>
				</div>
				<div class="modal-footer">
          <button id="binding_refresh_screen" class="quote_buttons">
            Refresh Screen
          </button>
          <button id="save_binding_default" class="quote_buttons">
            Save Screen Defaults
          </button>
          <button id="apply_binding_defaults" class="quote_buttons">
            Apply Factory Defaults
          </button>
				</div>
			</div>
		</div>
    <div id="paperRequirementModal" class="modal hide">
      <div class="modal-content" >
        <div class="modal-header">
					<div class="header">
            PAPER/CARD REQUIREMENTS
					  <span class="close">&times;</span>
          </div>
        </div>
        <div class="modal-body">
          <div class="row header_row">
            <div class="option">
              Print/Media Options
            </div>
            <div class="title">Unit/Cost</div>
            <div class="qty_a">QTY A</div>
            <div class="qty_b">QTY B</div>
            <div class="qty_c">QTY C</div>
          </div>
        </div>
        <div id="paper_req_sample">
          <div class="row data_row sheets">
            <div class="option">
            </div>
              <div class="title">SHEETS</div>
              <div class="qty_a"></div>
              <div class="qty_b"></div>
              <div class="qty_c"></div>
            </div>
          <div class="row  data_row kgs">
            <div class="option">
            </div>
              <div class="title">KGS</div>
              <div class="qty_a"></div>
              <div class="qty_b"></div>
              <div class="qty_c"></div>
          </div>
          <div class="row data_row cost">
            <div class="option">
            </div>
              <div class="title">COST</div>
              <div class="qty_a"></div>
              <div class="qty_b"></div>
              <div class="qty_c"></div>
          </div>
          <div class="row  data_row wstg_gain">
            <div class="option">
            </div>
              <div class="title">Aprox. Paper Waste  (कतरन-छांटन) Gain in Kg</div>
              <div class="wstg_gain_a"></div>
              <div class="wstg_gain_b"></div>
              <div class="wstg_gain_c"></div>
          </div>
        </div>
      </div>
    </div>
		<div id="homeModal" class="modal hide">
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
		<div id="preferencesModal" class="modal hide">
			<div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Preferences
						<span class="close">&times;</span>
					</div>
				</div>
				<div class="modal-body">
          <div class="tab-container">
            <div class="tab active" data-target="preferences-general-tab">
              General
            </div>
            <div class="tab" data-target="pdf-text-tab">
              PDF Quotation
            </div>
            <div class="tab" data-target="invoice-text-tab">
              PDF Invoice/ Delivery Memo
            </div>
            <div class="tab" data-target="plate_cost_min_pref">
              Minimum Print Rate + Plate Cost
            </div>
          </div>
          <div class="tab-body hide" id="invoice-text-tab">
            <div class="modal-body">
              <div class="row">
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Beneficiary Name</div>
                  </div>
                  <div class="div-2">
                    <input id="bank_beneficiary_name">
                  </div>
                </div>
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Bank Name</div>
                  </div>
                  <div class="div-2">
                    <input id="bank_name">
                  </div>
                </div>
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Bank Branch/IFSC</div>
                  </div>
                  <div class="div-2">
                    <input id="bank_branch_name">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Type of Account</div>
                  </div>
                  <div class="div-2">
                    <input id="bank_acc_type">
                  </div>
                </div>
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Account No.</div>
                  </div>
                  <div class="div-2">
                    <input id="bank_acc_no">
                  </div>
                </div>
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Pan #</div>
                  </div>
                  <div class="div-2">
                    <input id="company_pan">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Company GSTIN</div>
                  </div>
                  <div class="div-2">
                    <input id="company_gstin">
                  </div>
                </div>
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">Jurisdiction/State</div>
                  </div>
                  <div class="div-2">
                    <select id="company_jurisdiction">
                      <option state_code="" value="">Select</option>
                      <option state_code="35" value="Andaman">Andaman</option>
                      <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                      <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                      <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option state_code="18" value="Assam">Assam</option>
                      <option state_code="10" value="Bihar">Bihar</option>
                      <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                      <option state_code="04" value="Chandigarh">Chandigarh</option>
                      <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                      <option state_code="26" value="Dadra">Dadra</option>
                      <option state_code="25" value="Daman">Daman</option>
                      <option state_code="07" value="Delhi">Dehli</option>
                      <option state_code="25" value="Diu">Diu</option>
                      <option state_code="96" value="Foreign Country">Foreign Country</option>
                      <option state_code="30" value="Goa">Goa</option>
                      <option state_code="24" value="Gujrat">Gujrat</option>
                      <option state_code="06" value="Haryana">Haryana</option>
                      <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                      <option state_code="01" value="Jammu">Jammu</option>
                      <option state_code="20" value="Jarkhand">Jarkhand</option>
                      <option state_code="32" value="Karela">Karela</option>
                      <option state_code="29" value="Karnataka">Karnataka</option>
                      <option state_code="01" value="Kashmir">Kashmir</option>
                      <option state_code="38" value="Ladakh">Ladakh</option>
                      <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                      <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                      <option state_code="27" value="Maharastra">Maharastra</option>
                      <option state_code="14" value="Manipur">Manipur</option>
                      <option state_code="17" value="Meghalaya">Meghlaya</option>
                      <option state_code="15" value="Mizoram">Mizoram</option>
                      <option state_code="13" value="Nagaland">Nagaland</option>
                      <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                      <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                      <option state_code="21" value="Odisha">Odisha</option>
                      <option state_code="97" value="Other Territory">Other Territory</option>
                      <option state_code="34" value="Puducherry">Puducherry</option>
                      <option state_code="03" value="Punjab">Punjab</option>
                      <option state_code="08" value="Rajasthan">Rajasthan</option>
                      <option state_code="11" value="Sikkim">Sikkim</option>
                      <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                      <option state_code="36" value="Telangana">Telangana</option>
                      <option state_code="16" value="Tripura">Tripura</option>
                      <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                      <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                      <option state_code="19" value="West Bengal">Mest Bengal</option>
                    </select>
                  </div>
                </div>
                <div class="div-3">
                  <div class="div-2">
                    <div class="label">&nbsp;</div>
                  </div>
                  <div class="div-2">
                    &nbsp;
                  </div>
                </div>
              </div>
              <div class="row terms">
                <div class="label terms">Terms of Delivery</div>
                  <textarea id="invoice_terms" rows="10">
                  </textarea>
              </div>
            </div>
            <div class="modal-footer">
                <button class=" modal-btn" id="save_pdf_invoice_preferences">
                  update pdf options for invoice/ Delivery Note
                </button>
            </div>
          </div>
          <div class="tab-body" id="preferences-general-tab">
            <div class="modal-body">
              <div class="row hide">
                <div class="preferences_text">
                  Cost Analysis Summary						
                </div>
                <div class="preferences_option">
                  <select id="cost_summary_show">
                    <option value="show">Show</option>
                    <option value="hide">Hide</option>							
                  </select>																																			
                </div>
              </div>
              <div class="row hide">
                <div class="preferences_text">
                  Paper Size Input Units						
                </div>
                <div class="preferences_option">
                  <select id="paper_size_units">
                    <option value="inches">Inches</option>
                    <option value="centimetre">Centimetre</option>							
                  </select>																																			
                </div>
              </div>
              <div class="row">
                <div class="preferences_text">
                  Popup Language						
                </div>
                <div class="preferences_option">
                  <select id="popup_language">
                    <option value="english">English</option>								
                    <option value="hindi">Hindi</option>
                    <option value="bengali">Bengali</option>
                    <option value="none">None</option>							
                  </select>																																			
                </div>
              </div>
              <div class="row">
                <div class="preferences_text">
                  Show/Hide sizes in mm
                </div>
                <div class="preferences_option">
                  <select id="show_hide_mm">
                    <option value="show">Show</option>								
                    <option value="hide">Hide</option>
                  </select>																																			
                </div>
              </div>
              <div class="row">
                <div class="preferences_text">
                  Offset Plates Print-Run Length Limit
                </div>
                <div class="preferences_option">
                  <input id="print_run_length"></input>
                </div>
              </div>
              <div class="row">
                <div class="preferences_text">
                  Plate Master Run Length Limit
                </div>
                <div class="preferences_option">
                  <input id="print_master_run_length"></input>
                </div>
              </div>
              <div class="row hide">
                <div class="preferences_text">
                  Print Cost Escelation For
                </div>
                <div class="preferences_option">
                  <select id="print_calculation_every">
                    <option value="1000">Every 1000 Impressions</option>
                    <option value="500">Bunch of First 500 Impressions</option>
                    <option value="1">Every Single Print</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="preferences_text">
                  Paper Waste (कतरन-छांटन) Rate Per Kg.
                </div>
                <div class="preferences_option">
                  <input id="paper_wastage_gain_rs"></input>
                </div>
              </div>
            </div><!-- END modal body -->
            <div class="modal-footer">
                <button class=" modal-btn" id="save_general_preferences">
                  update preferences
                </button>
            </div>
          </div><!-- END tab body -->
          <div class="tab-body hide" id="pdf-text-tab">
            <div class="modal-body">
              <div class="row">
                <div class="pdf_text">
                  PDF Top text
                </div>
                <div class="pdf_text">
                  <textarea id="pdf_top_text">
                  </textarea>
                </div>
              </div><!-- END row -->
              <div class="row">
                <div class="pdf_text">
                  PDF Bottom Text
                </div>
                <div class="pdf_text">
                  <textarea id="pdf_bottom_text">
                  </textarea>
                </div>
              </div><!-- END row -->
              <div class="row">
                <div class="pdf_text">
                  PDF Terms and Conditions
                </div>
                <div class="pdf_text">
                  <textarea id="pdf_terms">
                  </textarea>
                </div>
              </div><!-- END row -->
            </div><!-- END modal-body -->
            <div class="modal-footer">
                <button class=" modal-btn" id="save_pdf_options_quotation">
                  update pdf options for quotation
                </button>
            </div>
          </div><!-- END tab-body -->
          <div class="tab-body hide" id="plate_cost_min_pref">
            <div class="modal-body">
              <div class="flex table-container">
                <div >
                  <input type="radio" name="print_base" value="1000" 
                    class="radio_print_base" checked></input>
                  <h3>Miminum 1000 Based Calculation</h3>
                  <div class="table base_1000">
                    <div class="table-header">
                      <div class="calc_colors">
                        # Colors
                      </div>
                      <div>
                        Plate Cost 
                      </div>
                      <div>
                        Minimum For 1st 1000 Impressions
                      </div>
                      <div>
                        Plate + Minimum Print Cost
                      </div>
                      <div>
                        Balance Qty Print Rate
                      </div>
                    </div><!-- END table-header -->
                    <div class="table-row 1-color">
                      <div class="calc_colors">
                        One Color
                      </div>
                      <div>
                         1 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 1 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 2-color">
                      <div class="calc_colors">
                        Two Colors
                      </div>
                      <div>
                         2 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 2 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 3-color">
                      <div class="calc_colors">
                        Three Colors
                      </div>
                      <div>
                         3 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 3 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 4-color">
                      <div class="calc_colors">
                        Four Colors
                      </div>
                      <div>
                         4 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 4 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 5-color">
                      <div class="calc_colors">
                        Five Colors
                      </div>
                      <div>
                         5 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 5 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 6-color">
                      <div class="calc_colors">
                        Six Colors
                      </div>
                      <div>
                         6 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 6 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 7-color">
                      <div class="calc_colors">
                        Seven Colors
                      </div>
                      <div>
                         7 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 7 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 8-color">
                      <div class="calc_colors">
                        Eight Colors
                      </div>
                      <div>
                         8 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 8 x 1(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                  </div><!-- END table -->
                </div>
                <div >
                  <input type="radio" name="print_base" value="3000" 
                    class="radio_print_base"></input>
                  <h3>Miminum 3000 Based Calculation</h3>
                  <div class="table base_3000">
                    <div class="table-header">
                      <div class="calc_colors">
                        # Colors
                      </div>
                      <div>
                        Plate Cost 
                      </div>
                      <div>
                        Minimum For 1st 3000 Impressions
                      </div>
                      <div>
                        Plate + Minimum Print Cost
                      </div>
                      <div>
                        Balance Qty Print Rate
                      </div>
                    </div><!-- END table-header -->
                    <div class="table-row 1-color">
                      <div class="calc_colors">
                        One Color
                      </div>
                      <div>
                         1 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 1 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 2-color">
                      <div class="calc_colors">
                        Two Colors
                      </div>
                      <div>
                         2 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 2 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 3-color">
                      <div class="calc_colors">
                        Three Colors
                      </div>
                      <div>
                         3 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 3 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 4-color">
                      <div class="calc_colors">
                        Four Colors
                      </div>
                      <div>
                         4 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 4 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 5-color">
                      <div class="calc_colors">
                        Five Colors
                      </div>
                      <div>
                         5 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 5 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 6-color">
                      <div class="calc_colors">
                        Six Colors
                      </div>
                      <div>
                         6 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 6 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 7-color">
                      <div class="calc_colors">
                        Seven Colors
                      </div>
                      <div>
                         7 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 7 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                    <div class="table-row 8-color">
                      <div class="calc_colors">
                        Eight Colors
                      </div>
                      <div>
                         8 x <input class="plate_cost"></input> = 
                        <span class="plate_total"></span>
                      </div>
                      <div>
                        <input class="min_print"></input> x 8 x 3(000) = 
                        <span class="min_print_total"></span>
                      </div>
                      <div class="min_plate_print">
                      </div>
                      <div>
                         <input class="balance_qty"></input>
                      </div>
                    </div><!-- END table-row -->
                  </div><!-- END table -->
                </div>
              </div>
              <div class="row" id="print_calculation_div">
                <label>Print Cost Escalation For </label>
                <input type="radio" name="print_calculation_every" value="1000"
                checked>
                </input>
                <label>Every 1000 Impressions </label>
                <input type="radio" name="print_calculation_every" value="500">
                </input>
                <label>Bunch of First 500 Impressions </label>
                <input type="radio" name="print_calculation_every" value="1">
                </input>
                <label>Every Single Print </label>
              </div>
              <div class="modal-footer">
                <select class="print_base hide">
                  <option value="1000">1000</option>
                  <option value="3000">3000</option>
                </select>
                <button class="modal-btn" id="save_printing_rates">
                  Save Rates
                </button>
              </div>
            </div>
          </div><!-- END tab-body -->
        </div><!-- END modal-body -->
			</div>
		</div>
    <div id="printRunLength" class="modal hide">
      <div class="modal-content" >
        <div class="modal-body">
          Please note, Print-Run Length for plates in 'PREFERENCES'<br/>
          is set to be <span class="print_run_length"></span> impressions. 
            <br/>
            <br/>
            <button class="button modal-btn cancel_print_run">
              Yes, I understand.
            </button>
        </div>
      </div>
    </div>
    <div id="changePostProcess" class="modal hide">
      <div class="modal-content" >
        <div class="modal-body">
          The last input may need changes in<br/>
          <span class="text-red">'Number of Pages to be Processed'</span><br/>
          Do you want to make changes?
            <br/>
            <br/>
            <button class="button modal-btn change-post-process-yes">
              Yes, make changes
            </button>
            <button class="button modal-btn change-post-process-no">
              No changes to be made
            </button>
        </div>
      </div>
    </div>
    <div id="Consignee_Details" class="modal hide">
      <div class="modal-content">
				<div class="modal-header">
					<div class="header">
						Consignee Details
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
          <button class="modal-btn save_consignee_details">
            Save
          </button>
        </div>
      </div>
    </div>
    <div id="PDF_Options_Quotation" class="modal hide">
      <div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Options for Quotation
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
          <div class="row">
            <div class="div-3">
              <h4>
                Generate <br/>Quotation From
              </h4>
              <div class="quotation_type">
                <select class="quotation_from">
                  <option value="estimate">For This Estimate</option>
                  <option value="estimates">For Multiple Estimates</option>
                </select>
              </div>
            </div>
            <div class="div-3">
              <h4>
                Select <br/>Quote Type
              </h4>
              <div class="quote_type">
                <select class="quote_for">
                  <option value="email" selected="selected">For Email</option>
                  <option value="print">For Print (on your Letterhead)</option>
                </select>
              </div>
            </div>
            <div class="div-3 hide customer">
              <h4>
                Select <br/>Customer
              </h4>
              <div class="quote_customer">
                <input class="quote_customer">
              </div>
            </div>
          </div>
          <div class="quotation-table">
            <div class="table quotation">
              <div class="table-header">
                <div class="estimate_no">
                  Est. #
                </div>
                <div class="module">
                  Module
                </div>
                <div class="job_ref">
                  Job Reference
                </div>
                <div class="quantity-a">
                  Quantity A
                </div>
                <div class="quantity calendar hide">
                  Overprint Qty
                </div>
                <div class="quantity-b">
                  Quantity B
                </div>
                <div class="quantity-c">
                  Quantity C
                </div>
              </div>
            </div>
            <div class="sample-row hide">
              <div class="table-row data-row">
                <div class="estimate_no">
                </div>
                <div class="module">
                </div>
                <div class="job_ref">
                </div>
                <div class="quantity-a">
                  <input type="checkbox" class="quantity-a">
                </div>
                <div class="quantity calendar hide">
                  <input type="checkbox" class="overprint-quantity">
                </div>
                <div class="quantity-b">
                  <input type="checkbox" class="quantity-b">
                </div>
                <div class="quantity-c">
                  <input type="checkbox" class="quantity-c">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn delete_estimate hide">
            Delete Estimate
          </button>
          <button class="modal-btn add_estimate hide">
            Add Estimate
          </button>
          <button class="modal-btn" id="generate_quotation">
            Generate Quotation
          </button>
        </div>
      </div>
    </div>
    <div id="PDF_Options_Invoice" class="modal hide">
      <div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Options for Invoice
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
          <div class="row">
            <div class="div-3">
              <h4>
                Generate <br/>Invoice From
              </h4>
              <div class="invoice_type">
                <select class="invoice_from">
                  <option value="estimate">For This Estimate</option>
                  <option value="estimates">For Multiple Estimates</option>
                  <option value="standalone" selected="selected">Stand Alone</option>
                </select>
              </div>
            </div>
            <div class="div-3">
              <h4>
                Select <br/>Consignee
              </h4>
              <select class="consignee_invoice">
                <option value="customer">Customer -- Address</option>
                <option value="customer_shipping">Customer -- Shipping Address</option>
                <option value="other">Other Consignee</option>
              </select>
            </div>
            <div class="div-3 hide customer">
              <h4>
                Select <br/>Customer
              </h4>
              <div class="quote_customer">
                <input class="quote_customer">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="div-3">
              <h4>
                Destination
              </h4>
              <input type="text" class="supply_place"></input>
            </div>
            <div class="div-3">
              <h4>
                Date & Time of Supply
              </h4>
              <input type="datetime-local" class="supply_date_time"></input>
            </div>
            <div class="div-3">
              <h4>
                Mode/Terms of Payment
              </h4>
              <input class="payment_mode" value="30 days"></input>
            </div>
          </div>
          <div class="row">
            <div class="div-3">
              <h4>
                P O No.
              </h4>
              <input type="text" class="po_no"></input>
            </div>
            <div class="div-3">
              <h4>
                P O Date
              </h4>
              <input type="date" class="po_date"></input>
            </div>
          </div>
          <div class="row">
            <div class="div-3">
              <h4>
                Delivery Note
              </h4>
              <input type="text" class="delivery_note"></input>
            </div>
            <div class="div-3">
              <h4>
                Delivery Note Date
              </h4>
              <input type="date" class="delivery_note_date"></input>
            </div>
          </div>
          <div class="row">
            <div class="div-3">
              <h4>
                Despatch Document No.
              </h4>
              <input type="text" class="despatch_no"></input>
            </div>
            <div class="div-3">
              <h4>
                Despatched Through
              </h4>
              <input type="text" class="despatched_through"></input>
            </div>
          </div>
          <div class="standalone-quotation-table hide">
            <div class="table quotation">
              <div class="table-header">
                <div class="job_desc">
                  Job Description
                </div>
                <div class="hsn">
                  HSN
                </div>
                <div class="quantity">
                  Quantity
                </div>
                <div class="amount">
                  Taxable
                </div>
              </div>
            </div>
            <div class="sample-row hide">
              <div class="table-row data-row">
                <div class="job_desc">
                  <textarea class="desc" rows="3"></textarea>
                </div>
                <div class="hsn">
                  <select class="hsn" data-view_key="hsn" data-id_key="id">
                    <option value="">Select</option>
                  </select>
                </div>
                <div class="quantity">
                  <input class="quantity"></input>
                </div>
                <div class="amount">
                  <input class="amount"></input>
                </div>
              </div>
            </div>
          </div>
          <div class="consignee_details hide">
            <div class="row">
              <h4>
                Consignee Details (Shipped to)
              </h4>
            </div>
            <div class="row">
              <div class="div-3">
                <h4>
                  Name
                </h4>
                <input class="consignee_name"></input>
              </div>
              <div class="div-3">
                <h4>
                  State
                </h4>
                <select class="consignee_state">
                  <option state_code="" value="">Select</option>
                  <option state_code="35" value="Andaman">Andaman</option>
                  <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                  <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                  <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option state_code="18" value="Assam">Assam</option>
                  <option state_code="10" value="Bihar">Bihar</option>
                  <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                  <option state_code="04" value="Chandigarh">Chandigarh</option>
                  <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                  <option state_code="26" value="Dadra">Dadra</option>
                  <option state_code="25" value="Daman">Daman</option>
                  <option state_code="07" value="Delhi">Dehli</option>
                  <option state_code="25" value="Diu">Diu</option>
                  <option state_code="96" value="Foreign Country">Foreign Country</option>
                  <option state_code="30" value="Goa">Goa</option>
                  <option state_code="24" value="Gujrat">Gujrat</option>
                  <option state_code="06" value="Haryana">Haryana</option>
                  <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                  <option state_code="01" value="Jammu">Jammu</option>
                  <option state_code="20" value="Jarkhand">Jarkhand</option>
                  <option state_code="32" value="Karela">Karela</option>
                  <option state_code="29" value="Karnataka">Karnataka</option>
                  <option state_code="01" value="Kashmir">Kashmir</option>
                  <option state_code="38" value="Ladakh">Ladakh</option>
                  <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                  <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                  <option state_code="27" value="Maharastra">Maharastra</option>
                  <option state_code="14" value="Manipur">Manipur</option>
                  <option state_code="17" value="Meghalaya">Meghlaya</option>
                  <option state_code="15" value="Mizoram">Mizoram</option>
                  <option state_code="13" value="Nagaland">Nagaland</option>
                  <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                  <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                  <option state_code="21" value="Odisha">Odisha</option>
                  <option state_code="97" value="Other Territory">Other Territory</option>
                  <option state_code="34" value="Puducherry">Puducherry</option>
                  <option state_code="03" value="Punjab">Punjab</option>
                  <option state_code="08" value="Rajasthan">Rajasthan</option>
                  <option state_code="11" value="Sikkim">Sikkim</option>
                  <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                  <option state_code="36" value="Telangana">Telangana</option>
                  <option state_code="16" value="Tripura">Tripura</option>
                  <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                  <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                  <option state_code="19" value="West Bengal">Mest Bengal</option>
                </select>
              </div>
              <div class="div-3">
                <h4>
                  GSTIN
                </h4>
                <input class="consignee_gstin"></input>
              </div>
            </div>
            <div class="row">
              <h4>
                Address
              </h4>
              <textarea class="consignee_address" rows="5"></textarea>
            </div>
          </div>
          <div class="reciever_details hide">
            <div class="row">
              <h4>
                Receiver Details (Billed to)
              </h4>
            </div>
            <div class="row">
              <div class="div-3">
                <h4>
                  Name
                </h4>
                <input class="reciever_name"></input>
              </div>
              <div class="div-3">
                <h4>
                  State
                </h4>
                <select class="reciever_state">
                  <option state_code="" value="">Select</option>
                  <option state_code="35" value="Andaman">Andaman</option>
                  <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                  <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                  <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option state_code="18" value="Assam">Assam</option>
                  <option state_code="10" value="Bihar">Bihar</option>
                  <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                  <option state_code="04" value="Chandigarh">Chandigarh</option>
                  <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                  <option state_code="26" value="Dadra">Dadra</option>
                  <option state_code="25" value="Daman">Daman</option>
                  <option state_code="07" value="Delhi">Dehli</option>
                  <option state_code="25" value="Diu">Diu</option>
                  <option state_code="96" value="Foreign Country">Foreign Country</option>
                  <option state_code="30" value="Goa">Goa</option>
                  <option state_code="24" value="Gujrat">Gujrat</option>
                  <option state_code="06" value="Haryana">Haryana</option>
                  <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                  <option state_code="01" value="Jammu">Jammu</option>
                  <option state_code="20" value="Jarkhand">Jarkhand</option>
                  <option state_code="32" value="Karela">Karela</option>
                  <option state_code="29" value="Karnataka">Karnataka</option>
                  <option state_code="01" value="Kashmir">Kashmir</option>
                  <option state_code="38" value="Ladakh">Ladakh</option>
                  <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                  <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                  <option state_code="27" value="Maharastra">Maharastra</option>
                  <option state_code="14" value="Manipur">Manipur</option>
                  <option state_code="17" value="Meghalaya">Meghlaya</option>
                  <option state_code="15" value="Mizoram">Mizoram</option>
                  <option state_code="13" value="Nagaland">Nagaland</option>
                  <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                  <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                  <option state_code="21" value="Odisha">Odisha</option>
                  <option state_code="97" value="Other Territory">Other Territory</option>
                  <option state_code="34" value="Puducherry">Puducherry</option>
                  <option state_code="03" value="Punjab">Punjab</option>
                  <option state_code="08" value="Rajasthan">Rajasthan</option>
                  <option state_code="11" value="Sikkim">Sikkim</option>
                  <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                  <option state_code="36" value="Telangana">Telangana</option>
                  <option state_code="16" value="Tripura">Tripura</option>
                  <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                  <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                  <option state_code="19" value="West Bengal">Mest Bengal</option>
                </select>
              </div>
              <div class="div-3">
                <h4>
                  GSTIN
                </h4>
                <input class="reciever_gstin"></input>
              </div>
            </div>
            <div class="row">
              <h4>
                Address
              </h4>
              <textarea class="reciever_address" rows="5"></textarea>
            </div>
          </div>
          <div class="quotation-table">
            <div class="table quotation">
              <div class="table-header">
                <div class="estimate_no">
                  Est. #
                </div>
                <div class="module">
                  Module
                </div>
                <div class="job_ref">
                  Job Reference
                </div>
                <div class="hsn">
                  HSN
                </div>
                <div class="quantity">
                  Quantity
                </div>
              </div>
            </div>
            <div class="sample-row hide">
              <div class="table-row data-row">
                <div class="estimate_no">
                </div>
                <div class="module">
                </div>
                <div class="job_ref">
                </div>
                <div class="hsn">
                  <select class="hsn" data-view_key="hsn" data-id_key="id">
                    <option value="">Select</option>
                  </select>
                </div>
                <div class="quantity">
                  <select class="quantity">
                    <option value="">Select</option>
                    <option value="qty_a">Quantity A</option>
                    <option value="qty_b">Quantity B</option>
                    <option value="qty_c">Quantity C</option>
                    <option value="qty_op" class="hide">Overprint Qty</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn delete_estimate hide">
            Delete Estimate
          </button>
          <button class="modal-btn add_estimate hide">
            Add Estimate
          </button>
          <button class="modal-btn" id="generate_invoice">
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
    <div id="colorSelectModal" class="modal hide">
      <div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Printing Inks 
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
          <div class="div-2 plate_inks">
            <h4>Front Inks</h4>
            <div class="row cmyk_process color-group">
              <div class="color"><input type="checkbox" class="CMYK"></input>
                Process 4 Color
              </div>
            </div>
            <div class="row cmyk color-group">
              <div class="color"><input type="checkbox" class="C"></input>C</div>
              <div class="color"><input type="checkbox" class="M"></input>M</div>
              <div class="color"><input type="checkbox" class="Y"></input>Y</div>
              <div class="color"><input type="checkbox" class="K"></input>K</div>
            </div>
            <div class="row color-group spot_color">
            </div>
          </div>
          <div class="div-2 plate_inks">
            <h4>Back Inks</h4>
            <div class="row cmyk_process color-group">
              <div class="color"><input type="checkbox" class="CMYK"></input>
                Process 4 Color
              </div>
            </div>
            <div class="row cmyk color-group">
              <div class="color"><input type="checkbox" class="C"></input>C</div>
              <div class="color"><input type="checkbox" class="M"></input>M</div>
              <div class="color"><input type="checkbox" class="Y"></input>Y</div>
              <div class="color"><input type="checkbox" class="K"></input>K</div>
            </div>
            <div class="row color-group spot_color">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="footer">
            <button class="modal-btn apply_colors">Apply</button>
          </div>
        </div>
      </div>
    </div>

    <div id="Process_PO_Modal" class="modal hide">
      <div class="modal-content">
        <div class="modal-header">
          <div class="header">
            <span class="po_header">Process Purchase Order</span>
            <span class="close">&times;</span>
          </div>
        </div><!-- END modal-header -->
        <div class="modal-body">
          <div class="row flex po_inputs">
            <div class="process_details table">
            <div class="process_name_div table-row">
              <label>Service</label>
              <div class="process_name">
              </div><!-- END process_name -->
            </div><!-- END process_name_div -->
              <div class="vendor_div table-row">
                <label>Vendor</label>
                <div class="vendor">
                  <select class="vendors" data-id_key="id" data-view_key="company_name">
                    <option value="">Select</option>
                  </select>
                </div><!-- END vendor -->
              </div>
            </div><!-- END process_details -->
            <div class="notes_div">
              <label>Specific Instructions (if Any)</label>
              <div class="notes">
                <textarea class="notes"></textarea>
              </div>
            </div><!-- END notes_div -->
          </div><!-- END row flex -->
        </div><!-- END modal-body -->
        <div class="modal-footer">
          <div class="footer">
            <button class="modal-btn create-po">Generate Preview in Job Ticket</button>
          </div><!-- END footer -->
        </div><!-- END modal-footer -->
      </div><!-- END modal-content -->
    </div><!-- END Process_PO_Modal modal -->
    
    <?php
      require_once("inc/templates/po_out_source.php");
      require_once("inc/templates/po_in_house.php");
    ?>
    
    <div id="PDF_Options_Job_Ticket" class="modal hide">
      <div class="modal-content" >
        <div class="modal-body">
          <section class="page-section page-1">
            <div class="modal-header">
              <div class="header">
                Job Ticket - <span class="module"></span>
                <span class="close-modal">&times;</span>
              </div><!-- END header -->
            </div><!-- END modal-header -->
            <div class="row space-between">
              <div class="flex column container">
                <h4>Job Reference (Name)</h4>
                <div class="job_ref"></div>
              </div>
              <div class="flex column container">
                <h4>Quantity</h4>
                <div class="quantity"></div>
              </div>
              <div class="flex column container">
                <h4>Estimate No. & Date</h4>
                <div class="estimate_details">
                  <span class="estimate_number"> </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="estimate_date"  > </span>
                </div>
              </div>
              <div class="flex column container">
                <h4>Job Ticket No. & Date</h4>
                <div class="job_ticket_details">
                  <span class="job_ticket_number"> </span>
                  <span class="job_ticket_date"  > </span>
                </div>
              </div>
            </div>
            <div class="row space-between">
              <div class="flex column container w-50">
                <h4>Customer Details / Shippiing Address</h4>
                <div class="flex column">
                  <div class="customer"></div>
                  <div class="address"></div>
                  <div class="contact_number"></div>
                  <div class="customer_email"></div>
                </div>
              </div>
              <div class="flex column container w-50">
                <h4>
                  Job Description
                </h4>
                <div class="job_description">
                </div><!--END job_description -->
              </div>
            </div>
            <div class="row space-between">
              
              <div class="flex column container">
                <h4>Job</h4>
                <select class="job">
                  <option value="">Select</option>
                  <option value="New Order">New Order</option>
                  <option value="Reprint Same">Reprint Same</option>
                  <option value="Reprint With Changes">Reprint With Changes</option>
                </select>
              </div>
              
              <div class="flex column container">
                <h4>Job Delivery Date</h4>
                <input type="date" class="due_date" data-date-format="mm/dd/yy"></input>
              </div>
              
              <div class="flex column container">
                <h4>Plate Type</h4>
                <select class="plate_type">
                  <option value="">Select</option>
                  <option value="CTcP">CTcP</option>
                  <option value="Violet CTP">Violet CTP</option>
                  <option value="Thermal CTP">Thermal CTP</option>
                  <option value="POLY">POLY</option>
                </select>
              </div>
              
              <div class="flex column container">
                <h4>Total Plates</h4>
                <div class="total_plates"></div>
              </div>
              
            </div>
            
            <div class="row space-between">
              <div class="flex column container">
                <h4>Finish Size - Closed</h4>
                <div class="closed_job_size"> </div>
              </div>
              
              <div class="flex column container">
                <h4>Finish Size - Open</h4>
                <div class="open_job_size"> </div>
              </div>
              
              <div class="flex column container">
                <h4>Print-Run (Press) Size</h4>
                <div class="machine_size"> </div>
              </div>
              
              <div class="flex column container printing_sides">
                <h4>Printing Side/s</h4>
                <div class="print_sides"> </div>
              </div>
              
              <div class="flex column container stationery hide">
                <h4>Job Size Format</h4>
                <div> 1/<span class="job_size_format"> </span></div>
              </div>
              
              <div class="flex column container hide book">
                <h4>Book Size Format</h4>
                <div class="book_size_format"></div>
              </div>
              
            </div>
            
            <div class="row space-between book hide">
              <div class="flex row">
                
                <div class="flex column container">
                  <h4>Total Pages</h4>
                  <div class="total_pgs"></div>
                </div>
                
                <div class="flex column container">
                  <h4>Book Quantity</h4>
                  <div class="book_quantity"></div>
                </div>
                
                <div class="flex column container">
                  <h4>Binding Type</h4>
                  <div class="binding_type">
                    <select class="binding_type">
                      <option value="perfect">Perfect (Sheetwise)</option>
                      <option value="saddle">Saddle (Center) Stitch</option>
                    </select>
                  </div>
                </div>
                
                <div class="flex column container">
                  <h4>Packing Details</h4>
                  <select class="dispatch">
                    <option value="">Select</option>
                    <option value="Loose">Loose</option>
                    <option value="Wrapping">Wrapping</option>
                    <option value="Boxing">Boxing</option>
                  </select>
                </div>
                <div class="flex column container">
                  <h4>Dispatch Mode</h4>
                  <select class="dispatch">
                    <option value="">Select</option>
                    <option value="Customer Will Pickup">Customer Will Pickup</option>
                    <option value="Delivery By Courier">Delivery By Courier</option>
                    <option value="Delivery By Transporter">Delivery By Transporter</option>
                    <option value="Delivery By Employee">Delivery By Employee</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row stationery hide">
              <div class="flex container table">
                <div class="table-header">
                  <h4>Books</h4>
                  <h4>Sets in A <br/>Book</h4>
                  <h4>Copies in A <br/>Set</h4>
                </div>
                <div class="table-row">
                  <div class="books">&nbsp;</div>
                  <div class="sets_in_book">&nbsp;</div>
                  <div class="copies_in_set">&nbsp;</div>
                </div>
              </div>
              <div class="flex container table">
                <div class="table-header">
                  <h4>Master <br/> on M/c</h4>
                  <h4>Ups in <br/> Master</h4>
                </div>
                <div class="table-row">
                  <div class="plate_master">&nbsp;</div>
                  <div class="ups_in_master">&nbsp;</div>
                </div>
              </div>
              <div class="flex container table">
                <div class="table-header">
                  <h4>Binding Type <br/> &nbsp;</h4>
                </div>
                <div class="table-row">
                  <div class="binding_type">&nbsp;</div>
                </div>
              </div>
              
              <div class="flex container table">
                <div class="table-header">
                  <h4>Binding <br/> Side</h4>
                </div>
                <div class="table-row">
                  <div class="binding_side_div">
                    <select class="binding_side">
                      <option value="">Select</option>
                      <option value="Loose">Loose</option>
                      <option value="Side">Side</option>
                      <option value="Top">Top</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="flex container table">
                <div class="table-header">
                  <h4>Numb'ng <br/> Type</h4>
                  <h4>Numb'ng <br/> From</h4>
                </div>
                <div class="table-row">
                  <div class="numb_type_div">
                    <select class="numb_type">
                      <option value="">Select</option>
                      <option value="None">None</option>
                      <option value="Hand">Hand</option>
                      <option value="M/c">M/c</option>
                      <option value="Digital">Digital</option>
                    </select>
                  </div>
                  <div>
                    <input type="text" class="numb_from"></input>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="row process-row">
              <div class="container inks-row">
                <div class="front-inks div-2">
                  <div class="row">
                    <h4>Front Side Inks </h4>
                  </div><!--END row -->
                  <div class="pre-press single">
                    <div class="plate_inks">
                      <div class="instruction">
                        Click to select color
                      </div>
                      <div class="flex column selected_colors">
                        <div class="cmyk color-group">
                          <div class="color hide"><input type="checkbox" class="C"></input>C</div>
                          <div class="color hide"><input type="checkbox" class="M"></input>M</div>
                          <div class="color hide"><input type="checkbox" class="Y"></input>Y</div>
                          <div class="color hide"><input type="checkbox" class="K"></input>K</div>
                        </div>
                        <div class="row color-group spot_color">
                        </div>
                      </div>
                      <div class="flex column unselected_colors hide">
                        <div class="cmyk color-group">
                          <div class="color"><input type="checkbox" class="C"></input>C</div>
                          <div class="color"><input type="checkbox" class="M"></input>M</div>
                          <div class="color"><input type="checkbox" class="Y"></input>Y</div>
                          <div class="color"><input type="checkbox" class="K"></input>K</div>
                        </div>
                        <div class="row color-group spot_color">
                        </div>
                      </div>
                    </div>
                  </div>
                </div><!-- END front-inks -->
                <div class="back-inks div-2">
                  <div class="row">
                    <h4>Back Side Inks </h4>
                  </div><!--END row -->
                  <div class="pre-press single back-side">
                    <div class="plate_inks">
                      <div class="no-backside hide">
                        Single Side Printing Only
                      </div>
                      <div class="instruction">
                        Click to select color
                      </div>
                      <div class="flex column selected_colors">
                        <div class="cmyk color-group">
                          <div class="color hide"><input type="checkbox" class="C"></input>C</div>
                          <div class="color hide"><input type="checkbox" class="M"></input>M</div>
                          <div class="color hide"><input type="checkbox" class="Y"></input>Y</div>
                          <div class="color hide"><input type="checkbox" class="K"></input>K</div>
                        </div>
                        <div class="row color-group spot_color">
                        </div>
                      </div>
                      <div class="flex column unselected_colors hide">
                        <div class="cmyk color-group">
                          <div class="color"><input type="checkbox" class="C"></input>C</div>
                          <div class="color"><input type="checkbox" class="M"></input>M</div>
                          <div class="color"><input type="checkbox" class="Y"></input>Y</div>
                          <div class="color"><input type="checkbox" class="K"></input>K</div>
                        </div>
                        <div class="row color-group spot_color">
                        </div>
                      </div>
                    </div>
                  </div>
                </div><!-- END back-inks -->
              </div>
            </div><!-- END process-row -->
          </section>
          
          <!-- Start Paper Cutting, Printing & Signatures Operational section -->
          <section class="page-section page-2">
            <div class="row">
              <div class="container">
                <h4>Paper Cutting, Printing & Signatures Operational Details</h4>
                <div class="row pre-press-table">
                  <div class="table pre-press">
                    <div class="table-header">
                      <div class="stock_paper_name">
                        Paper Type, Size (Parent), GSM & Brand
                      </div>
                      <div class="pages_in_row book hide">
                        Pages<br/>
                        Count<br/>
                      </div>
                      <div class="req_quantity">
                        Sheets <br/>
                        Required <br/>
                        Including <br/>
                        Wastage
                      </div>
                      <div class="outs">
                        OUTs &amp; <br/> Cut <br/> Sheet <br/> Size
                      </div>
                      <div class="outs_pieces">
                        Total <br/>OUTs <br/>Sheets <br/>(Pieces)
                      </div>
                      <div class="outs_pieces book hide">
                        Total <br/>OUTs <br/>Sheets <br/>(Pieces)
                      </div>
                      <div class="pages_in_each_sig book hide">
                        Signature<br/>WorkStyle
                      </div>
                      <div class="outs_pieces_per_sig book hide">
                        OUTs <br/>Pieces <br/>per <br/> Sgn't
                      </div>
                      <div class="plates_per_forme">
                        Number of Sgn'ts
                      </div>
                      <div class="forme_per_sig">
                        Forme <br/>Per Each <br/>Sgn't
                      </div>
                      <div class="plate_inks book hide">
                        Inks
                      </div>
                      <div class="ups">
                        UPs in <br/>Plate<br/> Sgn't
                      </div>
                      <div class="ups_pieces">
                        Total <br/>Quantity <br/>Output
                      </div>
                      <div class="sig_plates">
                        Plates
                      </div>
                    </div>
                  </div>
                  <div class="worktype_sample hide">
                    <div class="worktype_row">
                    <select class="worktype_select">
                      <option value="turn">Work & Turn</option>
                      <option value="tumble">Work & Tumble</option>
                    </select> - 
                    <span class="pgs"></span> Pages x <span class="pages_ups"></span> UP/s
                    </div>
                  </div>
                  <div class="sample-row hide">
                    <div class="table-row data-row">
                      <div class="stock_paper_name">
                      </div>
                      <div class="pages_in_row book hide">
                      </div>
                      <div class="req_quantity">
                      </div>
                      <div class="outs_container">
                        1/<span class="outs"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="run_width"></span>"x<span class="run_height"></span>"
                      </div>
                      <div class="outs_pieces">
                      </div>
                      <div class="outs_pieces book hide">
                      </div>
                      <div class=" book hide flex column">
                        <div class="pages_in_each_sig_div worktype_row">
                          <span class="worktype_name">Sheetwise - </span>
                          <span class="pages_in_each_sig"> </span> Front 
                          <span class="worktype_only_text hide">Only</span>
                          <span class="worktype_back_text">+ 
                            <span class="pages_in_each_sig"> </span> Back <span><br/>
                        </div>
                        <div class="worktype">
                        </div>
                        <div class="worktype_2">
                        </div>
                      </div>
                      <div class="flex column book hide">
                        <div class="outs_pieces_per_sig">
                        </div>
                        <div class="outs_pieces_per_sig_part">
                        </div>
                        <div class="outs_pieces_per_sig_part_2">
                        </div>
                      </div>
                      <div class="plates_per_forme">
                      </div>
                      <div class="forme_per_sig">
                      </div>
                      <div class="plate_inks book hide">
                        <div class="instruction">
                          Click to select color
                        </div>
                        <div class="flex column selected_colors">
                          <div class="cmyk color-group">
                            <div class="color hide"><input type="checkbox" class="C"></input>C</div>
                            <div class="color hide"><input type="checkbox" class="M"></input>M</div>
                            <div class="color hide"><input type="checkbox" class="Y"></input>Y</div>
                            <div class="color hide"><input type="checkbox" class="K"></input>K</div>
                          </div>
                          <div class="row color-group spot_color">
                          </div>
                        </div>
                        <div class="flex column unselected_colors hide">
                          <div class="cmyk color-group">
                            <div class="color"><input type="checkbox" class="C"></input>C</div>
                            <div class="color"><input type="checkbox" class="M"></input>M</div>
                            <div class="color"><input type="checkbox" class="Y"></input>Y</div>
                            <div class="color"><input type="checkbox" class="K"></input>K</div>
                          </div>
                          <div class="row color-group spot_color">
                          </div>
                        </div>
                      </div>
                      <div class="ups">
                      </div>
                      <div class="ups_pieces">
                      </div>
                      <div class="sig_plates">
                      </div>
                    </div>
                  </div>
                </div><!--END pre-press-table -->
              </div>
            </div><!--END row -->
          </section>
          <!-- END Paper Cutting, Printing & Signatures Operational section -->
          
          <!-- Start Imposed Signatures section -->
          <section class="page-section page-3">
            <div class="row space-between book hide">
              <div class="flex column container">
                <h4>Imposed Signatures' Pagination</h4>
                <div class="signatures"></div>
                <div class="hide" id="impose_div_sample">
                  <div class="impose_div">
                    <svg xmlns="http://www.w3.org/2000/svg" width="680" height="240"
                      viewBox="0 0 680 240"></svg>
                    <div class="paper_details flex column">
                      <div class="row flex impose_row">
                        <label>
                          Paper Type:
                        </label>
                        <div class="impose_content stock_paper_name">
                        </div>
                      </div>
                      <div class="row flex impose_row">
                        <label>Pages Count : 
                        </label>
                        <div class="impose_content">
                          <span class="pages_in_row"></span>
                        </div>
                      </div>
                      <div class="row flex impose_row">
                        <label class="workstyle">
                          WorkStyle:
                        </label>
                        <div class="worktype impose_content">
                          <span class="turn_tumble">
                          </span> -&nbsp;&nbsp; 
                          <span class="pages_in_each_sig_div">
                              <span class="pages_in_each_sig"></span> Front + 
                              <span class="pages_in_each_sig"></span> Back 
                          </span>
                          <span class="pages_ups">
                              <span class="pages"></span> Pages x
                              <span class="ups_in_plate"></span> UPs
                          </span>
                        </div>
                      </div>
                      <div class="row flex impose_row">
                        <label>
                          Cut Sheet Size:
                        </label>
                        <div class="cut_size impose_content">
                        </div>
                      </div>
                      <div class="row flex impose_row">
                        <label>
                          Sheets (OUTs) Per Signature:
                        </label>
                        <div class="sheets_per_forme impose_content">
                        </div>
                      </div>
                      <div class="row flex impose_row">
                        <label>
                          Color Front:
                        </label>
                        <div class="impose_colors_front impose_content">
                        </div>
                      </div>
                      <div class="row flex impose_row">
                        <label>
                          Color Back:
                        </label>
                        <div class="impose_colors_back impose_content">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- End Imposed Signatures section -->
          
          <!-- Start Pre and Post Printing Process section -->
          <section class="page-section page-4">
            <div class="row space-between">
              <div class="flex column container job-work-container">
                <h4>Pre & Post Printing Process Work</h4>
                <div class="in-house-select job-work">
                  <div class="table">
                    <div class="table-header">
                      <div class="name">
                        Process
                      </div>
                      <div class="paper_details hide multi_sheet">
                        Paper Type, Size (Parent), GSM & Brand
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                        Cut Sheet Size
                      </div>
                      <div class="total_outs hide multi_sheet">
                        Total OUTs Sheets (Pieces)
                      </div>
                      <div class="job_source">
                        In-House /
                        Out-Source
                      </div>
                      <div class="po_div">
                        PO#
                      </div>
                      <div class="notes">
                        Special Instructions
                      </div>
                    </div>
                  </div>
                  <div class="job-work-sample hide">
                    <div class=" table-row dtp-design"> 
                      <div class="name">
                        DTP-Design
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row plate-making"> 
                      <div class="name">
                        Plate Making
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row printing"> 
                      <div class="name">
                        Printing
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row lamination-matt"> 
                      <div class="name">
                        Lamination Matte
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row lamination-gloss"> 
                      <div class="name">
                        Lamination Gloss
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row uv-coating-flood"> 
                      <div class="name">
                        UV Coating (Flood)
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row drip-off"> 
                      <div class="name">
                        Drip-Off
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row varnishing"> 
                      <div class="name">
                        Varnishing
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row aqueous-coating"> 
                      <div class="name">
                        Aqueous Coating
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row met-pet">
                      <div class="name">
                        Met-Pet
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row blister"> 
                      <div class="name">
                        Blister
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row folding-hand-mc">
                      <div class="name">
                        Folding by M/c or Hand
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row creasing-die-punch">
                      <div class="name">
                        Punching (For Creasing/Perfo./Window)
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row creasing-scoring">
                      <div class="name">
                        Scoring (For Creasing/Perfo.)
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row numbing">
                      <div class="name">
                        Numbering/Perforation
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row stripping">
                      <div class="name">
                        Stripping/Sorting
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row glueing">
                      <div class="name">
                        Glueing/Pasting
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row spotuv">
                      <div class="name">
                        SPOT UV
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row foil-stamping">
                      <div class="name">
                        Foil Stamping
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row embossing">
                      <div class="name">
                        Embossing
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row punch-die">
                      <div class="name">
                        Wooden Punch Die
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row blanket-uv">
                      <div class="name">
                        Blanket (For UV)
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                    <div class=" table-row zinc-block">
                      <div class="name">
                        Zinc/Copper/Polymer Block
                      </div>
                      <div class="job_source">
                        <select class="job_source">
                          <option value="">Select</option>
                          <option value="in-house">In-House</option>
                          <option value="out-source">Out-Source</option>
                        </select>
                      </div>
                      <div class="paper_details hide multi_sheet">
                      </div>
                      <div class="cut_sheet_size hide multi_sheet">
                      </div>
                      <div class="total_outs hide multi_sheet">
                      </div>
                      <div class="po_div">
                        <div class="po_num"></div>
                        <div class="po_id hide"></div>
                        <div class="vendor_name"></div>
                        <div class="vendor_email"></div>
                        <div class="vendor_id hide"></div>
                      </div>
                      <div class="notes">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div><!-- END post-process-div -->
            </div>
          </section>
          <!-- END Pre and Post Printing Process section -->
          
          <!-- Start Purchase/Process Orders section -->
          <section class="page-section page-5">
            <div class="row container flex column">
              <div class="flex column">
                <h4>Purchase / Process Orders (POs)</h4>
                <div class="purchase-orders">
                </div>
              </div>
            </div>
          </section
          <!-- END Purchase/Process Orders section -->
          
          
          <!-- Start Cutting diagram section -->
          <section class="page-section page-6">
            <div class="row container flex">
              <div class="flex column">
                <h4>Cutting Diagram<span class="book hide"> -- Inner pages</span></h4>
                <div class="row cutting_diagram flex column">
                  <div class="inner_pgs_container flex column">
                    <div class="inner_pgs_svg flex">
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex column">
                <h4 class="book hide">Cutting Diagram -- Title (Cover)</h4>
                <div class="row cutting_diagram flex column">
                  <div class="title_pgs_container flex column">
                    <div class="title_pgs_svg flex">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- END Cutting diagram section -->
          
          <div class="post-process-sample hide">
            <div class="post-process-row">
              <h4 class="paper_name"></h4>
              <div class="post-process-table table">
                <div class="table-header">
                  <div class="process">
                    Post Press
                  </div>
                  <div class="comments">
                    Notes
                  </div>
                  <div class="sign">
                    Sign
                  </div>
                  <div class="qty">
                    Qty
                  </div>
                  <div class="status">
                    Status
                  </div>
                </div>
              </div>
            </div><!-- END post-process-row -->
          </div>
          <div class="row post-process-row-sample hide">
            <div class="row process-row table-row">
              <div class="process">
              </div>
              <div class="comments">
                <input type="text" class="comments"></input>
              </div>
              <div class="sign">
              </div>
              <div class="qty">
                <input type="text" class="qty"></input>
              </div>
              <div class="status">
                <input type="text" class="status"></input>
              </div>
            </div>
          </div><!-- END post-process-row-sample -->
          
          <div class="hide inks-sample">
          </div><!--END row -->
          
        </div><!-- END modal-body -->
        
        <div class="modal-footer">
          <button class="modal-btn" id="save_job_ticket">
            Save / Update Job Ticket
          </button>
          <button class="modal-btn" id="generate_job_ticket_pdf">
            Download PDF
          </button>
        </div><!-- END modal-footer -->
        
      </div><!-- END modal-content -->
    </div><!-- END modal -->
    <div id="PDF_Options_Delivery" class="modal hide">
      <div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Options for Delivery Memo
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
          <div class="row">
            <div class="div-3">
              <h4>
                Generate <br/>Delivery Memo
              </h4>
              <div class="invoice_type">
                <select class="invoice_from">
                  <option value="estimate">For This Estimate</option>
                  <option value="estimates">For Multiple Estimates</option>
                  <option value="standalone" selected="selected">Stand Alone</option>
                </select>
              </div>
            </div>
            <div class="div-3">
              <h4>
                Select <br/>Consignee
              </h4>
              <select class="consignee_invoice">
                <option value="customer">Customer -- Address</option>
                <option value="customer_shipping">Customer -- Shipping Address</option>
                <option value="other">Other Consignee</option>
              </select>
            </div>
            <div class="div-3 hide customer">
              <h4>
                Select <br/>Customer
              </h4>
              <div class="quote_customer">
                <input class="quote_customer">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="div-3">
              <h4>
                Destination
              </h4>
              <input type="text" class="supply_place"></input>
            </div>
            <div class="div-3">
              <h4>
                Date & Time of Supply
              </h4>
              <input type="datetime-local" class="supply_date_time"></input>
            </div>
            <div class="div-3">
              <h4>
                Mode/Terms of Payment
              </h4>
              <input class="payment_mode" value="30 days"></input>
            </div>
          </div>
          <div class="row">
            <div class="div-3">
              <h4>
                P O No.
              </h4>
              <input type="text" class="po_no"></input>
            </div>
            <div class="div-3">
              <h4>
                P O Date
              </h4>
              <input type="date" class="po_date"></input>
            </div>
            <div class="div-3">
              <h4>
                Bill of Landing/Lr-RR No.
              </h4>
              <input type="text" class="landing_no"></input>
            </div>
          </div>
          <div class="row">
            <div class="div-3">
              <h4>
                Despatch Document No.
              </h4>
              <input type="text" class="despatch_no"></input>
            </div>
            <div class="div-3">
              <h4>
                Despatched Through
              </h4>
              <select class="despatched_through">
                <option value="">Select</option>
                <option value="By Surface">By Surface</option>
                <option value="By Air">By Air</option>
              </select>
            </div>
            <div class="div-3">
              <h4>
                Mortor Vehicle Number
              </h4>
              <input type="text" class="mortor_vehicle_no"></input>
            </div>
          </div>
          <div class="standalone-quotation-table hide">
            <div class="table quotation">
              <div class="table-header">
                <div class="job_desc">
                  Job Description
                </div>
                <div class="hsn">
                  HSN
                </div>
                <div class="quantity">
                  Quantity
                </div>
                <div class="amount">
                  Taxable
                </div>
              </div>
            </div>
            <div class="sample-row hide">
              <div class="table-row data-row">
                <div class="job_desc">
                  <textarea class="desc" rows="3"></textarea>
                </div>
                <div class="hsn">
                  <select class="hsn" data-view_key="hsn" data-id_key="id">
                    <option value="">Select</option>
                  </select>
                </div>
                <div class="quantity">
                  <input class="quantity"></input>
                </div>
                <div class="amount">
                  <input class="amount"></input>
                </div>
              </div>
            </div>
          </div>
          <div class="consignee_details hide">
            <div class="row">
              <h4>
                Consignee Details (Shipped to)
              </h4>
            </div>
            <div class="row">
              <div class="div-3">
                <h4>
                  Name
                </h4>
                <input class="consignee_name"></input>
              </div>
              <div class="div-3">
                <h4>
                  State
                </h4>
                <select class="consignee_state">
                  <option state_code="" value="">Select</option>
                  <option state_code="35" value="Andaman">Andaman</option>
                  <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                  <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                  <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option state_code="18" value="Assam">Assam</option>
                  <option state_code="10" value="Bihar">Bihar</option>
                  <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                  <option state_code="04" value="Chandigarh">Chandigarh</option>
                  <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                  <option state_code="26" value="Dadra">Dadra</option>
                  <option state_code="25" value="Daman">Daman</option>
                  <option state_code="07" value="Delhi">Dehli</option>
                  <option state_code="25" value="Diu">Diu</option>
                  <option state_code="96" value="Foreign Country">Foreign Country</option>
                  <option state_code="30" value="Goa">Goa</option>
                  <option state_code="24" value="Gujrat">Gujrat</option>
                  <option state_code="06" value="Haryana">Haryana</option>
                  <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                  <option state_code="01" value="Jammu">Jammu</option>
                  <option state_code="20" value="Jarkhand">Jarkhand</option>
                  <option state_code="32" value="Karela">Karela</option>
                  <option state_code="29" value="Karnataka">Karnataka</option>
                  <option state_code="01" value="Kashmir">Kashmir</option>
                  <option state_code="38" value="Ladakh">Ladakh</option>
                  <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                  <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                  <option state_code="27" value="Maharastra">Maharastra</option>
                  <option state_code="14" value="Manipur">Manipur</option>
                  <option state_code="17" value="Meghalaya">Meghlaya</option>
                  <option state_code="15" value="Mizoram">Mizoram</option>
                  <option state_code="13" value="Nagaland">Nagaland</option>
                  <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                  <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                  <option state_code="21" value="Odisha">Odisha</option>
                  <option state_code="97" value="Other Territory">Other Territory</option>
                  <option state_code="34" value="Puducherry">Puducherry</option>
                  <option state_code="03" value="Punjab">Punjab</option>
                  <option state_code="08" value="Rajasthan">Rajasthan</option>
                  <option state_code="11" value="Sikkim">Sikkim</option>
                  <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                  <option state_code="36" value="Telangana">Telangana</option>
                  <option state_code="16" value="Tripura">Tripura</option>
                  <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                  <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                  <option state_code="19" value="West Bengal">Mest Bengal</option>
                </select>
              </div>
              <div class="div-3">
                <h4>
                  GSTIN
                </h4>
                <input class="consignee_gstin"></input>
              </div>
            </div>
            <div class="row">
              <h4>
                Address
              </h4>
              <textarea class="consignee_address" rows="5"></textarea>
            </div>
          </div>
          <div class="reciever_details hide">
            <div class="row">
              <h4>
                Receiver Details (Billed to)
              </h4>
            </div>
            <div class="row">
              <div class="div-3">
                <h4>
                  Name
                </h4>
                <input class="reciever_name"></input>
              </div>
              <div class="div-3">
                <h4>
                  State
                </h4>
                <select class="reciever_state">
                  <option state_code="" value="">Select</option>
                  <option state_code="35" value="Andaman">Andaman</option>
                  <option state_code="37" value="Andhra Pradesh">Andhra Pradesh</option>
                  <option state_code="28" value="Andhra Pradesh" class="hide">Andhra Pradesh</option>
                  <option state_code="12" value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option state_code="18" value="Assam">Assam</option>
                  <option state_code="10" value="Bihar">Bihar</option>
                  <option state_code="99" value="Centre Jurisdiction">Centre Jurisdiction</option>
                  <option state_code="04" value="Chandigarh">Chandigarh</option>
                  <option state_code="22" value="Chhattisgarh">Chattisgarh</option>
                  <option state_code="26" value="Dadra">Dadra</option>
                  <option state_code="25" value="Daman">Daman</option>
                  <option state_code="07" value="Delhi">Dehli</option>
                  <option state_code="25" value="Diu">Diu</option>
                  <option state_code="96" value="Foreign Country">Foreign Country</option>
                  <option state_code="30" value="Goa">Goa</option>
                  <option state_code="24" value="Gujrat">Gujrat</option>
                  <option state_code="06" value="Haryana">Haryana</option>
                  <option state_code="02" value="Himachal Pradesh">Himachal Pradesh</option>
                  <option state_code="01" value="Jammu">Jammu</option>
                  <option state_code="20" value="Jarkhand">Jarkhand</option>
                  <option state_code="32" value="Karela">Karela</option>
                  <option state_code="29" value="Karnataka">Karnataka</option>
                  <option state_code="01" value="Kashmir">Kashmir</option>
                  <option state_code="38" value="Ladakh">Ladakh</option>
                  <option state_code="31" value="Lakshadweep">Lakshadweep</option>
                  <option state_code="23" value="Madhya Pradesh">Madhya Pradesh</option>
                  <option state_code="27" value="Maharastra">Maharastra</option>
                  <option state_code="14" value="Manipur">Manipur</option>
                  <option state_code="17" value="Meghalaya">Meghlaya</option>
                  <option state_code="15" value="Mizoram">Mizoram</option>
                  <option state_code="13" value="Nagaland">Nagaland</option>
                  <option state_code="26" value="Nagar Haveli">Nagar Haveli</option>
                  <option state_code="35" value="Nicobar Islands">Nicobar Islands</option>
                  <option state_code="21" value="Odisha">Odisha</option>
                  <option state_code="97" value="Other Territory">Other Territory</option>
                  <option state_code="34" value="Puducherry">Puducherry</option>
                  <option state_code="03" value="Punjab">Punjab</option>
                  <option state_code="08" value="Rajasthan">Rajasthan</option>
                  <option state_code="11" value="Sikkim">Sikkim</option>
                  <option state_code="33" value="Tamil Nadu">Tamil Nadu</option>
                  <option state_code="36" value="Telangana">Telangana</option>
                  <option state_code="16" value="Tripura">Tripura</option>
                  <option state_code="09" value="Uttar Pradesh">Uttar Pradesh</option>
                  <option state_code="05" value="Uttarkhand">Uttarkhand</option>
                  <option state_code="19" value="West Bengal">Mest Bengal</option>
                </select>
              </div>
              <div class="div-3">
                <h4>
                  GSTIN
                </h4>
                <input class="reciever_gstin"></input>
              </div>
            </div>
            <div class="row">
              <h4>
                Address
              </h4>
              <textarea class="reciever_address" rows="5"></textarea>
            </div>
          </div>
          <div class="quotation-table">
            <div class="table quotation">
              <div class="table-header">
                <div class="estimate_no">
                  Est. #
                </div>
                <div class="module">
                  Module
                </div>
                <div class="job_ref">
                  Job Reference
                </div>
                <div class="hsn">
                  HSN
                </div>
                <div class="quantity">
                  Quantity
                </div>
              </div>
            </div>
            <div class="sample-row hide">
              <div class="table-row data-row">
                <div class="estimate_no">
                </div>
                <div class="module">
                </div>
                <div class="job_ref">
                </div>
                <div class="hsn">
                  <select class="hsn" data-view_key="hsn" data-id_key="id">
                    <option value="">Select</option>
                  </select>
                </div>
                <div class="quantity">
                  <select class="quantity">
                    <option value="">Select</option>
                    <option value="qty_a">Quantity A</option>
                    <option value="qty_b">Quantity B</option>
                    <option value="qty_c">Quantity C</option>
                    <option value="qty_op" class="hide">Overprint Qty</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn delete_estimate hide">
            Delete Estimate
          </button>
          <button class="modal-btn add_estimate hide">
            Add Estimate
          </button>
          <button class="modal-btn" id="generate_delivery_memo">
            Generate Delivery Memo
          </button>
        </div>
      </div>
    </div>
    <div id="PDF_Options" class="modal hide">
      <div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Options for Quotation
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
          <div class="row">
            <div class="quote_type">Quote Type</div>
            <div class="quote_type">
              <select id="quote_for">
                <option value="email" selected="selected">For Email</option>
                <option value="print">For Print (on your Letterhead)</option>
              </select>
            </div>
          </div>
          <div class="row">
            <button class="top button" id="generate_quote">
              Generate Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="invoicePDF" class="modal hide">
      <div class="modal-content" >
				<div class="modal-header">
					<div class="header">
						Options for Invoice
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
          <div class="row">
            <div class="quote_type">Invoice Type</div>
            <div class="quote_type">
              <select id="invoice_for">
                <option value="email" selected="selected">For Email</option>
                <option value="print">For Print (on your Letterhead)</option>
              </select>
            </div>
          </div>
          <div class="row pdf_qty_row">
            <input type="checkbox" class="pdf_qty_a" checked></input>
            <div class="pdf_qty">
              Quantity A
            </div>
            <input type="checkbox" class="pdf_qty_b" checked></input>
            <div class="pdf_qty">
              Quantity B
            </div>
            <input type="checkbox" class="pdf_qty_c" checked></input>
            <div class="pdf_qty">
              Quantity C
            </div>
          </div>
          <div class="row">
            <button class="top button" id="generate_invoice">
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="jobSizeModal" class="modal hide">
      <div class="modal-content" >
				<div class="modal-header">
					<div class="header">
            <div class="left-text"> Sketches & Diagrams </div>
						<span class="close">&times;</span>
					</div>
				</div>
        <div class="modal-body">
          <div class="job_size_container">
            <div class="svg_title">
              Inner Pages<br/>
            </div>
            <div class="job_size_inner flex">
              <div id="job_size_svg" class="job_size_svg">
              </div>
              <div class="inner_pgs job_size_cuts flex column">
                <div class="table-row">
                  <label>Finish Size Format: </label><div><span class="cuts"></span> (1/<span class="cuts"></span>)</div> 
                </div>
                <div class="table-row">
                  <label>Pages In Plate Signature: </label><div><span class="pgs"></span> (1/<span class="pgs"></span>)</div> 
                </div>
                <div class="table-row">
                  <label>Parent Paper Size: </label>
                  <div>
                    <span class="parent_w"></span>x<span class="parent_h"></span> 
                    (White) 
                    <div class="legend white">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </div>
                </div>
                <div class="table-row">
                  <label>Finish Page Size: </label>
                  <div>
                    <span class="job_w"></span>x<span class="job_h"></span>
                    (Buff)
                    <div class="legend gray">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </div>
                </div>
                <div class="table-row">
                  <label>Press (Print Run) Size: </label>
                  <div>
                    <span class="machine_w"></span>x<span class="machine_h"></span> 
                    (Green) 
                    <div class="legend green">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <i class="fa-solid fa-rotate-left swap_mc_size"></i>
                  </div>
                </div>
                <div class="table-row">
                  <label>Maximum Trimming: </label><div>0.125" (3.175mm)</div>
                </div>
                <div class="table-row">
                  <label>Gripper Bite: </label><div>0.3937" (10mm Max)</div>
                </div>
              </div>
            </div>
          </div>
          <?php 
            if($module == "book")
             {
             ?>
          <div class="job_size_container">
            <div class="svg_title">
              Title (Cover)<br/>
            </div>
            <div class="job_size_inner flex">
              <div id="title_svg" class="job_size_svg">
              </div>
              <div class="title_pgs job_size_cuts flex column">
                <div class="table-row">
                  <label>Finish Size Format: </label><div><span class="cuts"></span> (1/<span class="cuts"></span>)</div> 
                </div>
                <div class="table-row">
                  <label>Pages In Plate Signature: </label><div><span class="pgs"></span> (1/<span class="pgs"></span>)</div> 
                </div>
                <div class="table-row">
                  <label>Parent Paper Size: </label>
                  <div>
                    <span class="parent_w"></span>x<span class="parent_h"></span> 
                    (White) 
                    <div class="legend white">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </div>
                </div>
                <div class="table-row">
                  <label>Finish Page Size: </label>
                  <div>
                    <span class="job_w"></span>x<span class="job_h"></span>
                    (Buff)
                    <div class="legend gray">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </div>
                </div>
                <div class="table-row">
                  <label>Press (Print Run) Size: </label>
                  <div>
                    <span class="machine_w"></span>x<span class="machine_h"></span> 
                    (Green) 
                    <div class="legend green">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <i class="fa-solid fa-rotate-left swap_mc_size"></i>
                  </div>
                </div>
                <div class="table-row">
                  <label>Maximum Trimming: </label><div>0.125" (3.175mm)</div>
                </div>
                <div class="table-row">
                  <label>Gripper Bite: </label><div>0.3937" (10mm Max)</div>
                </div>
              </div>
            </div>
          </div>
          <?php
            }
          ?>
        </div>
        <div class="modal-footer">
          <div class="div-4-3 job_size">
          <div class="row">
            <div class="job_size_label">
              Press Size 
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="machine_size_w" value="00.00">
              <input class="machine_size_h" value="00.00">
            </div>
          </div>
          <div class="row">
            <div class="job_size_label">
              Finish Job Size (Closed)
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="closed_job_size_w" value="00.00">
              <input class="closed_job_size_h" value="00.00">
            </div>
          </div>
          <div class="row">
            <div class="job_size_label">
              Finish Job Size (Open)
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="open_job_size_w" value="00.00">
              <input class="open_job_size_h" value="00.00">
            </div>
          </div>
          <div class="row hide">
          <?php
            if($module == "book"){
          ?>
            <div class="job_size_label">
              Parent Paper Size (Inner pgs.)
            </div>
          <?php
            }
            else{
          ?>
            <div class="job_size_label">
              Parent Paper Size
            </div>
          <?php
            }
          ?>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="parent_paper_size_w" value="00.00">
              <input class="parent_paper_size_h" value="00.00">
            </div>
          </div>
          <?php
            if($module == "book"){
          ?>
          <div class="row hide">
            <div class="job_size_label">
              Parent Paper Size (Title)
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="title_parent_size_w" value="00.00">
              <input class="title_parent_size_h" value="00.00">
            </div>
          </div>
          <div class="row">
            <div class="job_size_label">
              Title (Cover) Press Size 
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="title_machine_size_w" value="00.00">
              <input class="title_machine_size_h" value="00.00">
            </div>
          </div>
          <?php
            }
            else{
          ?>
          <?php
            }
          ?>
        </div>
          </div>
        </div>
      </div>
    </div>
    <div id="duplicatePostProcess" class="modal hide">
      <div class="modal-content" >
        <div class="modal-body">
          Do you want to duplicate DATA of<br/>
          'POST PRINTING PROCESS COST' also?
            <br/>
            <br/>
            <button class="button modal-btn duplicate-yes">
              Yes
            </button>
            <button class="button modal-btn duplicate-no">
              No
            </button>
        </div>
      </div>
    </div>
    <div id="printRunLengthChange" class="modal hide">
      <div class="modal-content" >
        <div class="modal-body">
          This job needs extra Plate/s with present set up.<br/>
          Do you want to apply cost for extra Plate/s?<br/><br/>
            <button class="button modal-btn cancel_print_run">
              Yes, I will prepare Extra Plate/s, so, apply rate accordingly.
            </button><br/><br/>
            <div class="button modal-btn change_print_run">
              No, Increase Print Run capacity to  
              <input id="change_print_run" class="print_run_length"/>
              impressions for this job only.
            </div>
        </div>
      </div>
    </div>
		<div id="logout_div" class="hide">
				<div class="inner-div">
						<div class="name" id="name">
						</div>
						<div class="contact" id="contact">
            </div>
            <?php
              if($user->isAdmin()){
                ?>
                <button class="top button" id="switch-to-admin-button">
                  SWITCH TO ADMIN
                </button>
              <?php
              }
            ?>
						<button class="top button" id="logout-button">
							LOG OUT
						</button>
						<button class="top button" id="change-password-button">
							CHANGE PASSWORD
						</button>
				</div>
		</div>
		<div id="pdf_div" class="hide">
				<div class="inner-div">
          <button class="top button" id="screenshot-pdf-button">
            COST SHEET
          </button>
          <button class="top button" id="quote-pdf-button">
            QUOTATION
          </button>
          <button class="top button" id="job-ticket-pdf-button">
            JOB TICKET - QTY A
          </button>
          <button class="top button" id="memo-pdf-button">
            DELIVERY MEMO
          </button>
          <button class="top button" id="invoice-pdf-button">
            INVOICE
          </button>
          <button class="top button" id="job-master-button">
            JOB MASTER
          </button>
				</div>
		</div>
		<div id="pdf_reports_div" class="hide">
				<div class="inner-div">
          <button class="top button" id="list_pdf_quotes">
            QUOTATION
          </button>
          <button class="top button" id="list_job_ticket">
            JOB TICKET
          </button>
          <button class="top button" id="list_delivery_memo">
            DELIVERY MEMO
          </button>
          <button class="top button" id="list_invoice">
            INVOICE
          </button>
          <button class="top button" id="list_po">
            PURCHASE ORDER
          </button>
          <button class="top button" id="list_grn">
            GRN
          </button>
				</div>
		</div>
    <div id="add-row-dropdown" class="hide">
      <div class="row delete-row"> 
        <div class="checkbox">
          <i class="fa-solid fa-play"></i>
          <span>Delete Row</span>
        </div>
      </div>
      <div class="row duplicate-row"> 
        <div class="checkbox">
          <i class="fa-solid fa-play"></i>
          <span>Duplicate Row Below</span>
        </div>
      </div>
      <div class="row add-blank-row"> 
        <div class="checkbox">
          <i class="fa-solid fa-play"></i>
          <span>Add Blank Row</span>
        </div>
      </div>
    </div>
    <div id = "tooltip" class="hide">
    </div>
    <div id="loadingModal" class="modal hide">
      <div class="modal-content">
        <span class="loader">
        </span>
      </div>
    </div>
    <div id="alertModal" class="modal hide">
      <div class="modal-content" >
        <div class="modal-header">
          <div class="header">
            <span class="header-text"></span>
            <span class="close">&times;</span>
          </div>
        </div>
        <div class="modal-body">
          <div class="hand_stop">
            <svg
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:cc="http://creativecommons.org/ns#"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:svg="http://www.w3.org/2000/svg"
                xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns:ns1="http://sozi.baierouge.fr"
                id="svg4905"
                viewBox="0 0 200 200"
                version="1.1"
              >
              <defs
                  id="defs4907"
                >
                <linearGradient
                    id="linearGradient2997"
                    y2="586.01"
                    gradientUnits="userSpaceOnUse"
                    x2="-277.6"
                    gradientTransform="matrix(1.2379 0 0 1.2379 439.7 -599.47)"
                    y1="492.9"
                    x1="-277.6"
                  >
                  <stop
                      id="stop4556"
                      style="stop-color:#ffffff;stop-opacity:.51724"
                      offset="0"
                  />
                  <stop
                      id="stop4558"
                      style="stop-color:#ffffff;stop-opacity:0"
                      offset="1"
                  />
                </linearGradient
                >
                <linearGradient
                    id="linearGradient3000"
                    y2="515.69"
                    gradientUnits="userSpaceOnUse"
                    x2="-484.92"
                    gradientTransform="matrix(1.2379 0 0 1.2379 751.14 -488.42)"
                    y1="466.54"
                    x1="-558.5"
                  >
                  <stop
                      id="stop4871"
                      style="stop-color:#cd0e00"
                      offset="0"
                  />
                  <stop
                      id="stop4873"
                      style="stop-color:#550600"
                      offset="1"
                  />
                </linearGradient
                >
              </defs
              >
              <path
                  id="path4568"
                  style="block-progression:tb;text-indent:0;color:#000000;text-transform:none;fill:#4e0200"
                  d="m100.91 17.518c-7.3424-0.3328-13.974 3.3001-17.64 9.6709l-72.958 126.3c-3.5156 6.0752-3.5076 13.262 0 19.342 3.5076 6.0798 9.7309 9.6734 16.75 9.6709h145.88c7.0191 0.002 13.242-3.5911 16.75-9.6709 3.5076-6.0798 3.5156-13.267 0-19.342l-72.92-126.3c-3.3356-5.7991-9.1777-9.3556-15.86-9.6709z"
              />
              <path
                  id="path4564"
                  style="color:#000000;stroke:#ffffff;stroke-width:2.4757;fill:url(#linearGradient3000)"
                  d="m100.48 26.802a10.052 10.052 0 0 0 -9.168 5.0289l-72.954 126.3a10.052 10.052 0 0 0 8.7038 15.087h145.88a10.052 10.052 0 0 0 8.7038 -15.087l-72.92-126.3a10.052 10.052 0 0 0 -8.2396 -5.0289z"
              />
              <path
                  id="path4657"
                  style="color:#000000;fill:url(#linearGradient2997)"
                  d="m99.535 17.517c-6.792 0.14824-12.811 3.6983-16.247 9.6709l-45.453 78.682c18.067 6.7137 39.351 10.599 62.165 10.599 22.833 0 44.126-3.9135 62.203-10.638l-45.41-78.642c-3.3356-5.7991-9.1777-9.3556-15.86-9.6709-0.45891-0.0208-0.93981-0.01-1.3926 0z"
              />
              <path
                  id="path4661"
                  style="color:#000000;fill:#ffffff"
                  d="m114.48 167.63c0-5.0247 0.28474-12.011 2.4167-14.124 2.7481-2.7236 6.7087-8.3071 7.2015-13.18 0.69183-6.8406 9.2318-16.288 11.831-19.15 2.599-2.8624 4.0982-5.0192 4.1974-7.5068 0.14737-3.6964-6.1834-7.1051-9.9963-2.918-2.5789 2.8319-12.721 14.748-16.823 12.861-3.3066-1.5213-8.2738-1.0106-11.561 3.3033-1.0701 1.4045-1.5057 2.9105-2.3203 5.2465-0.38384 1.1007-1.6095 0.89862-1.2209-0.39183 0.5194-1.7248 1.3362-4.2478 2.8685-6.3049 2.587-3.4729 8.8174-5.1389 12.716-3.487 1.7905 0.75872 3.2891-1.8554 3.2891-5.7297v-38.799c0-7.5609-8.641-7.5609-8.641 0v31.054c0 1.8902-2.1602 3.5104-2.1602 0v-40.505c0-7.831-9.4511-8.371-9.4511 0v39.425c0 3.5104-2.47 5.1041-2.47 0.66184v-32.796c0-4.5906-9.4114-5.6707-9.4114 0v33.214c0 3.5104-2.6544 4.6629-2.6544 0.71127v-26.094c0-6.4808-9.284-7.9863-9.284 2.4876v54.489c0 8.371 3.9328 12.747 7.9273 16.742 3.6349 3.6349 2.9802 7.96 2.9802 10.791z"
              />
              <metadata
                >
                <rdf:RDF
                  >
                  <cc:Work
                    >
                    <dc:format
                      >image/svg+xml</dc:format
                    >
                    <dc:type
                        rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                    />
                    <cc:license
                        rdf:resource="http://creativecommons.org/licenses/publicdomain/"
                    />
                    <dc:publisher
                      >
                      <cc:Agent
                          rdf:about="http://openclipart.org/"
                        >
                        <dc:title
                          >Openclipart</dc:title
                        >
                      </cc:Agent
                      >
                    </dc:publisher
                    >
                    <dc:title
                      >Red triangle hand icon</dc:title
                    >
                    <dc:date
                      >2011-01-03T15:03:25</dc:date
                    >
                    <dc:description
                      >White hand in Red glossy icon.</dc:description
                    >
                    <dc:source
                      >https://openclipart.org/detail/103393/red-hand-icon-by-kuba</dc:source
                    >
                    <dc:creator
                      >
                      <cc:Agent
                        >
                        <dc:title
                          >kuba</dc:title
                        >
                      </cc:Agent
                      >
                    </dc:creator
                    >
                    <dc:subject
                      >
                      <rdf:Bag
                        >
                        <rdf:li
                          >glossy</rdf:li
                        >
                        <rdf:li
                          >hand</rdf:li
                        >
                        <rdf:li
                          >icon</rdf:li
                        >
                        <rdf:li
                          >red</rdf:li
                        >
                        <rdf:li
                          >red triangle</rdf:li
                        >
                        <rdf:li
                          >stop</rdf:li
                        >
                        <rdf:li
                          >triangle</rdf:li
                        >
                        <rdf:li
                          >warning</rdf:li
                        >
                        <rdf:li
                          >white</rdf:li
                        >
                        <rdf:li
                          >white hand</rdf:li
                        >
                      </rdf:Bag
                      >
                    </dc:subject
                    >
                  </cc:Work
                  >
                  <cc:License
                      rdf:about="http://creativecommons.org/licenses/publicdomain/"
                    >
                    <cc:permits
                        rdf:resource="http://creativecommons.org/ns#Reproduction"
                    />
                    <cc:permits
                        rdf:resource="http://creativecommons.org/ns#Distribution"
                    />
                    <cc:permits
                        rdf:resource="http://creativecommons.org/ns#DerivativeWorks"
                    />
                  </cc:License
                  >
                </rdf:RDF
                >
              </metadata
              >
            </svg
            >
          </div>
          <div class="message">
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
    <div id="addPaperStockModal" class="modal hide">
      <div class="modal-content">
        <div class="modal-header">
          <div class="header">
            <span class="header-text">Add Paper Stock</span>
            <span class="close">&times;</span>
          </div><!-- END header -->
        </div><!-- END modal-header -->
        <div class="modal-body">
          <div class="row flex">
            <div class="vendor_div">
              <label>Vendor</label>
              <div class="vendor">
                <select class="vendors" data-id_key="id" data-view_key="company_name">
                  <option value="">Select</option>
                </select>
              </div>
            </div>
            <div>
              <label>Reason For Stock Addition</label>
              <div class="add_reason">
                <select class="add_reason change" 
                  changefunc="AddPaperStockReasonChanged">
                  <option value="">Select</option>
                  <option value="purchase">Purchase</option>
                  <option value="provided by customer">Provided By Customer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div class="po_number_div">
              <label>Purchase Order Number</label>
              <div>
                <input type="text" class="po_number"></input>
              </div>
            </div>
            <div class="customer_div hide">
              <label>Customer</label>
              <div class="customer_sel">
                <input type="text" class="po_customer_sel"></input>
              </div>
            </div>
            <div class="notes_div">
              <label>Notes</label>
              <div>
                <input type="text" class="notes"></input>
              </div>
            </div>
          </div>
          <div class="table">
            <div class="table-header">
              <div class="paper_name_stock">
                Paper Type, Size & GSM
              </div>
              <div class="current_stock">
                Current Stock
              </div>
              <div class="quantity">
                Quantity
              </div>
              <div class="packing_style">
                Packing Style
              </div>
              <div class="cost">
                Total Cost
              </div>
              <div class="cost_kg">
                Cost / KG
              </div>
              <div class="cost_sheet">
                Cost / Sheet
              </div>
              <div class="quantity_sheets">
                Quantity (Sheets)
              </div>
              <div class="quantity_kg">
                Quantity (KG)
              </div>
            </div><!-- END table-header -->
          </div><!-- END table -->
          <div class="sample-row hide">
            <div class="table-row data-row">
              <div class="paper_name_stock">
                <select>
                </select>
              </div>
              <div class="current_stock">
              </div>
              <div class="quantity">
                <div>
                  <input type="text" class="add_qty change" 
                    changefunc="calcSheets"></input>
                </div>
              </div>
              <div class="packing_style">
                <div>
                  <select class="packet change" changefunc="calcSheets">
                    <option value="">Select</option>
                    <option value="1">Sheets</option>
                    <option value="72">PKG 72</option>
                    <option value="100">PKG 100</option>
                    <option value="144">PKG 144</option>
                    <option value="150">PKG 150</option>
                    <option value="480">PKG 480</option>
                    <option value="500">PKG 500</option>
                  </select>
                </div>
              </div>
              <div class="cost">
                <div>
                  <input type="text" class="cost change" 
                    changefunc="calcSheets"></input>
                </div>
              </div>
              <div class="cost_kg">
              </div>
              <div class="cost_sheet">
              </div>
              <div class="qty_sheets">
              </div>
              <div class="quantity_kg">
              </div>
            </div><!-- END table-row -->
          </div><!-- END sample-row -->
        </div><!-- END modal-body -->
        <div class="modal-footer">
          <button class="button modal-btn remove_row_for_stock"
            func="removePaperRowForStock">
            Remove Row
          </button>
          <button class="button modal-btn add_row_for_stock"
            func="addPaperRowForStock">
            Add Row
          </button>
          <button class="button modal-btn createGRN"
            func="createGRN">
            Add Stock
          </button>
          <button class="button modal-btn createPOforPaper"
            func="createPOforPaper">
            create Purchase Order
          </button>
        </div><!-- END modal-footer -->
      </div><!-- END modal-content -->
    </div><!-- END modal -->
    <div id="adjustPaperStockModal" class="modal hide">
      <div class="modal-content">
        <div class="modal-header">
          <div class="header">
            <span class="header-text">Adjust Paper Stock</span>
            <span class="close">&times;</span>
          </div><!-- END header -->
        </div><!-- END modal-header -->
        <div class="modal-body" item="paper">
          <div class="flex">
            <div class="column">
              <label>
                Paper Type, Size & GSM
              </label>
              <div class="paper_name_stock">
              </div>
            </div>
            <div  class="column">
              <label>
                Current Stock
              </label>
              <div class="current_stock">
              </div>
            </div>
            <div  class="column">
              <label>
                Adjustment Type
              </label>
              <div>
                <select class="adj_type">
                  <option value="">Select</option>
                  <option value="initial_stock">Set Initial Paper Stock</option>
                  <option value="add_stock">Increase Paper Stock</option>
                  <option value="remove_stock">Decrease Paper Stock</option>
                </select>
              </div>
            </div>
            <div class="column">
              <label>Quantity</label>
              <div>
                <input type="text" class="add_qty change" 
                  changefunc="calcSheets"></input>
                <select class="packet change" changefunc="calcSheets">
                  <option value="">Select</option>
                  <option value="1">Sheets</option>
                  <option value="24">24 Pkt</option>
                  <option value="25">25 Pkt</option>
                  <option value="250">250 Ream</option>
                  <option value="480">480 Ream</option>
                  <option value="500">500 Ream</option>
                  <option value="516">516 Ream</option>
                  <option value="960">960 Bundle</option>
                  <option value="1000">1,000 Bundle</option>
                  <option value="1032">1,032 Bundle</option>
                  <option value="4800">4,800 Bale</option>
                  <option value="5000">5,000 Bale</option>
                  <option value="5160">5,160 Bale</option>
                  <option value="200000">2,00,000 Pallet</option>
                </select>
              </div>
            </div>
            <div class="column">
              <label>Quantity (Sheets)</label>
              <div class="qty_sheets">
              </div>
            </div>
            <div  class="column">
              <label>
               Reason For Adjustment 
              </label>
              <div>
                <select class="adj_reason">
                  <option value="">Select</option>
                  <option value="initial_stock">Initial Stock</option>
                  <option value="miscount">Miscount</option>
                  <option value="damage">Paper Damaged</option>
                  <option value="returned">Paper Returned</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div class="column">
              <label>Notes</label>
              <div>
                <input type="text" class="stock_notes">
              </div>
            </div>
          </div>
        </div><!-- END modal-body -->
        <div class="modal-footer">
          <button class="button modal-btn set_initial_paper_stock"
            func="setInitialPaperStock">
            Save
          </button>
          <button class="button modal-btn adjust_paper_stock"
            func="setAdjustPaperStock">
            Adjust Paper Stock
          </button>
        </div><!-- END modal-footer -->
      </div><!-- END modal-content -->
    </div><!-- END modal -->
	</body>
</html>
