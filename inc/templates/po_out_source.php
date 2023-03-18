<div id="Process_PO_PDF_Modal" class="modal hide">
  <div class="modal-content">
    <div class="modal-header">
      <div class="header">
        Purchase Order (Out-Sourcing)
        <span class="close">&times;</span>
      </div>
    </div><!-- END modal-header -->
    <div class="modal-body">
      <div class="main-letter">
        <div class="company_name_div">
          <h3 class="company_name">[company_name]</h3>
          <div class="company_details">
            <div class="company_address">[company_address]</div>
            <div class="company_email">[company_email]</div>
          </div>
        </div>
        <br/>
        <div class="po_div>">
          <label>PO # </label>
          <span class="po_num">[po_num] </span>
        </div>
        <div class="date_div>">
          <label>Date: </label>
          <span class="po_date">[date]</span>
        </div>
        <div class="job_ref_div>">
          <label>Job Reference: </label>
          <span class="job_ref">[job_ref]</span>
        </div>
        <br/>
        <div class="vendor flex column">
          <label>To : </label>
          <div><span class="vendor_name">[vendor_name]</span></div>
          <div><span class="vendor_address">[vendor_address]</span></div>
          <div><span class="vendor_email">[vendor_email]</span></div>
          <div><span class="vendor_phone">[vendor_phone]</span></div>
        </div>
        <p>Dear Sir,</p>
        <p>
          This letter is to formally inform you to supply or render services for 
          below depicted material in accordance to the information furnished thereof.
        </p> 
        <p>
          In case of any query, please contact the under signed before proceeding.
        </p>
        <p>Warm regards.</p>
        <p>-<span class="company_contact">[company_admin_name]</span> 
          (+<span class="company_phone">[company_phone]</span>)
        </p>
        <div class="process_details table">
          [service]
        </div>
        <br/>
      </div>
    </div><!-- END modal-body -->
    <div class="modal-footer">
      <div class="footer">
        <button class="modal-btn edit-po">Edit / New Preview</button>
        <button class="modal-btn download-po">Create PDF</button>
      </div><!-- END footer -->
    </div><!-- END modal-footer -->
  </div><!-- END modal-content -->
</div><!-- END Process_PO_Modal modal -->
