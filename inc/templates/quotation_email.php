<!DOCTYPE html>
<html>
<head>
  <link rel = "stylesheet" href = "quote_style.css" />
</head>
<body>
  <div class="main_container">
    <div class="company_container">
      <h2 class="company_name">[company_name]</h2>
      <div class="company_address">[company_add_1] [company_add_2] [company_add_3]</div>
      <div class="company_contact">Mob : [company_phone]  Mail : [company_email]</div>
    </div>
    <div class="date text-left">
      Date : [date]
    </div>
    <div class="qno text-left">
      Quote No. : [quote_num]
    </div>
    <br/>
    <div class="customer text-left">
      To<br/><br/>
      [customer_name]<br/>
      [customer_address]<br/>
      Email : [customer_email]<br/>
      Phone : [customer_phone]
    </div>
    <div class="pdf_top_text text-left">
      Dear Sir<br/><br/>
      [pdf_top_text]
    </div>
    <div class="main-table">
      <div class="row_container">
        <div class="sno border-right padding">
          #
        </div>
        <div class="estimate_no border-right padding">
          Est #
        </div>
        <div class="job_ref border-right padding">
          Job Ref
        </div>
        <div class="desc border-right padding">
          Description
        </div>
        <div class="qty border-right padding text-right">
          QTY
        </div>
        <div class="rate border-right padding text-right">
          Unit Price
        </div>
        <div class="amount padding text-right">
          Amount
        </div>
      </div>
      [sample]
      <div class="row_container sample border-top">
        <div class="sno border-right padding">
          [s_no]
        </div>
        <div class="estimate_no border-right padding">
          [est_no]
        </div>
        <div class="job_ref border-right padding">
          [job_ref]
        </div>
        <div class="desc border-right padding">
          [desc]
        </div>
        <div class="qty border-right padding text-right">
          [qty]
        </div>
        <div class="rate border-right padding text-right">
          [unit]
        </div>
        <div class="amount padding text-right">
          [amount]
        </div>
      </div>
      [/sample]
    </div>
    <div class="pdf_bottom_text">
      [pdf_bottom_text]
    </div>
    <div class="pdf_terms">
      Terms And Conditions<br/>
      [pdf_terms]
    </div>
    <div class="auto_text">
      This is a computer generated document.
    </div>
  </div>
</body>
</html>
