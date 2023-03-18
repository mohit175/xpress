<!DOCTYPE html>
<html>
<head>
  <link rel = "stylesheet" href = "invoice_delivery_style.css" />
</head>
<body>
  <h1 class="delivery_memo_title">Delivery Memo</h1>
  <div class="main_container">
    <div class="row_container">
      <div class="div-2 border-right no-padding">
        <div class="row padding">
          <strong>[company_name]</strong>
          <div class="row">
            [company_add_1]
          </div>
          <div class="row">
            [company_add_2]
          </div>
          <div class="row">
            [company_add_3]
          </div>
          <div class="row">
            Contact: [company_email]&nbsp;&nbsp;[company_phone]
          </div>
          <div class="row">
            GSTIN/UIN: [gstin]
          </div>
          <div class="row">
            State: [state], Code: [state_code]
          </div>
          <div class="row">
            PAN: [company_pan]
          </div>
        </div>
        <div class="row border-top padding">
          Buyer: <strong>[reciever_name]</strong><br/>
          [reciever_address]<br/>
          GSTIN/UIN: [reciever_gstin]<br/>
          State: [reciever_state], Code : [reciever_state_code]
        </div>
        <div class="row border-top padding">
          Consignee: <strong>[consignee_name]</strong><br/>
          [consignee_address]<br/>
          GSTIN Number: [consignee_gstin]<br/>
          State: [consignee_state]
        </div>
      </div>
      <div class="div-2 no-padding">
        <div class="row container">
          <div class="div-2 padding border-right">
            Delivery Note No.<br/>
            <strong>[delivery_note_no]</strong>
          </div>
          <div class="div-2 padding ">
            Dated.<br/>
            <strong>[delivery_note_date]</strong>
          </div>
        </div>
        <div class="row container border-top">
          <div class="div-2 padding border-right">
            Bill of Landing/Lr-RR No.<br/>
            <strong>[landing_no]</strong>
          </div>
          <div class="div-2 padding ">
            Mode/Terms of Payment<br/>
            <strong>[payment_mode]</strong>
          </div>
        </div>
        <div class="row container border-top">
          <div class="div-2 padding border-right">
            Buyer's Order No.<br/>
            <strong>[po_no]</strong>
          </div>
          <div class="div-2 padding ">
            Dated<br/>
            <strong>[po_date]</strong>
          </div>
        </div>
        <div class="row container border-top">
          <div class="div-2 padding border-right">
            Despatch Document No.<br/>
            <strong>[despatch_no]</strong>
          </div>
          <div class="div-2 padding ">
            Mortor Vehicle No<br/>
            <strong>[mortor_vehicle_no]</strong>
          </div>
        </div>
        <div class="row container border-top">
          <div class="div-2 padding border-right">
            Despatched through<br/>
            <strong>[despatched_through]</strong>
          </div>
          <div class="div-2 padding ">
            Destination<br/>
            <strong>[supply_place]</strong>
          </div>
        </div>
        <div class="row container padding border-top">
          Terms of Delivery<br/>
          [terms]
        </div>
      </div>
    </div>
    <div class="main-table delivery">
      <div class="row_container border-top">
        <div class="sno border-right padding">
          #
        </div>
        <div class="est_no border-right padding">
          Est#
        </div>
        <div class="desc border-right padding">
          Description of Goods
        </div>
        <div class="hsn border-right padding">
          HSN/SAC
        </div>
        <div class="qty text-right padding">
          QTY
        </div>
      </div>
      [sample]
      <div class="row_container sample border-top">
        <div class="sno border-right padding">
          [s_no]
        </div>
        <div class="est_no border-right padding">
          [est_no]
        </div>
        <div class="desc border-right padding">
          [desc]
        </div>
        <div class="hsn border-right padding">
          [hsn_code]
        </div>
        <div class="qty text-right padding">
          [qty]
        </div>
      </div>
      [/sample]
    </div>
    <div class="row_container border-top">
      <div class="w-50 border-right terms-block padding">
        Recd. in Good Condition
        <h4>SUBJECT TO [jurisdiction] JURISDICTION</h4>
      </div>
      <div class="w-50 sig-block padding">
        <div class="row company_name">
          For [company_name]
        </div>
        <div class="row">
          Authorised Signatory
        </div>
      </div>
    </div>
  </div>
  <div class="row last_row">
    This is a Computer Generated Document
  </div>
</body>
</html>
