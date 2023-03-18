<!DOCTYPE html>
<html>
<head>
  <link rel = "stylesheet" href = "invoice_delivery_style.css" />
</head>
<body>
  <h1>Tax Invoice</h1>
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
        </div>
        <div class="row border-top padding">
          Buyer: <strong>[reciever_name]</strong><br/>
          [reciever_address]<br/>
          GSTIN/UIN: [reciever_gstin]<br/>
          State: [reciever_state], Code : [reciever_state_code]
        </div>
        <div class="row border-top padding">
          Reciever: <strong>[consignee_name]</strong><br/>
          [consignee_address]<br/>
          GSTIN Number: [consignee_gstin]<br/>
          State: [consignee_state]
        </div>
      </div>
      <div class="div-2 no-padding">
        <div class="row container">
          <div class="div-2 padding border-right">
            Invoice No.<br/>
            <strong>[invoice_serial_number]</strong>
          </div>
          <div class="div-2 padding ">
            Invoice Date.<br/>
            <strong>[invoice_date]</strong>
          </div>
        </div>
        <div class="row container border-top">
          <div class="div-2 padding border-right">
            Delivery Note<br/>
            <strong>[delivery_note]</strong>
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
            Dilevery Note Date<br/>
            <strong>[delivery_note_date]</strong>
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
    <div class="main-table">
      <div class="row_container border-top reverse-color">
        <div class="sno border-right padding-top">
          #
        </div>
        <div class="est_no border-right padding-top">
          Est#
        </div>
        <div class="desc border-right padding-top">
          Description of Goods
        </div>
        <div class="hsn border-right padding-top">
          HSN/SAC
        </div>
        <div class="qty border-right padding-top">
          QTY
        </div>
        <div class="rate border-right padding-top">
          Rate
        </div>
        <div class="taxable border-right padding-top">
          Taxable
        </div>
        <div class="gst padding-top">
          <div class="row top_gst">
            GST
          </div>
          <div class="row">
            <div class="div-3 border-right border-top cgst">
              CGST
            </div>
            <div class="div-3 border-right border-top sgst">
              SGST
            </div>
            <div class="div-3 border-top igst">
              IGST
            </div>
          </div>
        </div>
      </div>
      [sample]
      <div class="row_container sample border-top">
        <div class="sno border-right padding-top">
          [s_no]
        </div>
        <div class="est_no border-right padding-top">
          [est_no]
        </div>
        <div class="desc border-right padding">
          [desc]
        </div>
        <div class="hsn border-right padding-top">
          [hsn_code]
        </div>
        <div class="qty border-right padding-top">
          [qty]
        </div>
        <div class="rate border-right padding-top">
          [unit]
        </div>
        <div class="taxable border-right padding-top">
          [amount]
        </div>
        <div class="gst">
          <div class="row">
            <div class="div-3 border-right cgst padding-top">
              [cgst]
            </div>
            <div class="div-3 border-right sgst padding-top">
              [sgst]
            </div>
            <div class="div-3 igst padding-top">
              [igst]
            </div>
          </div>
        </div>
      </div>
      [/sample]
    </div>
    <div class="row_container border-top">
      <div class="w-70 border-right">
        Amount Chargeable (in words)
        <div class="row bill-text text_amount">
          INR [text_amount]
        </div>
      </div>
      <div class="w-30 padding">
        <div class="row">
          Net Total <span class="net_total float-right">[net_total]</span>
        </div>
        <div class="row">
          Round Off <span class="round_off float-right">[round_off]</span>
        </div>
        <div class="row bill-amount">
          Bill Amount <span class="round_off float-right">[bill_amount]</span>
        </div>
      </div>
    </div>
    <div class="row_container border-top text-center">
      <div class="w-16 border-right">
        HSN/SAC
      </div>
      <div class="w-16 border-right">
        Taxable Value
      </div>
      <div class="w-17 border-right">
        <div class="row">Central Tax</div>
        <div class="row container border-top">
          <div class="div-2 border-right no-padding">
            Rate %
          </div>
          <div class="div-2 no-padding">
            Amount
          </div>
        </div>
      </div>
      <div class="w-17 border-right">
        <div class="row">State Tax</div>
        <div class="row container border-top">
          <div class="div-2 border-right no-padding">
            Rate %
          </div>
          <div class="div-2 no-padding">
            Amount
          </div>
        </div>
      </div>
      <div class="w-17 border-right">
        <div class="row">Inter-State Tax</div>
        <div class="row container border-top">
          <div class="div-2 border-right no-padding">
            Rate %
          </div>
          <div class="div-2 no-padding">
            Amount
          </div>
        </div>
      </div>
      <div class="w-17">
        <div class="row">
          Total<br/>
          Tax Amount
        </div>
      </div>
    </div>
    [tax_sample]
    <div class="row_container border-top text-center">
      <div class="w-16 border-right">
        [hsn_code]
      </div>
      <div class="w-16 border-right">
        [taxable]
      </div>
      <div class="w-17 border-right">
        <div class="row container">
          <div class="div-2 border-right no-padding">
            [cgst_rate]
          </div>
          <div class="div-2 no-padding">
            [cgst_amount]
          </div>
        </div>
      </div>
      <div class="w-17 border-right">
        <div class="row container">
          <div class="div-2 border-right no-padding">
            [sgst_rate]
          </div>
          <div class="div-2 no-padding">
            [sgst_amount]
          </div>
        </div>
      </div>
      <div class="w-17 border-right">
        <div class="row container">
          <div class="div-2 border-right no-padding">
            [igst_rate]
          </div>
          <div class="div-2 no-padding">
            [igst_amount]
          </div>
        </div>
      </div>
      <div class="w-17">
        <div class="row">
          [total_tax]
        </div>
      </div>
    </div>
    [/tax_sample]
    <div class="row_container border-top text-center">
      <div class="w-16 border-right">
        Total
      </div>
      <div class="w-16 border-right">
        [taxable_total]
      </div>
      <div class="w-17 border-right">
        <div class="row container">
          <div class="div-2 border-right no-padding">
          </div>
          <div class="div-2 no-padding">
            [cgst_total]
          </div>
        </div>
      </div>
      <div class="w-17 border-right">
        <div class="row container">
          <div class="div-2 border-right no-padding">
          </div>
          <div class="div-2 no-padding">
            [sgst_total]
          </div>
        </div>
      </div>
      <div class="w-17 border-right">
        <div class="row container">
          <div class="div-2 border-right no-padding">
          </div>
          <div class="div-2 no-padding">
            [igst_total]
          </div>
        </div>
      </div>
      <div class="w-17">
        <div class="row">
          [total_tax]
        </div>
      </div>
    </div>
    <div class="row_container border-top padding">
      Tax Amount:&nbsp;
      <span class="bill-text text_amount">
        INR [tax_text]
      </span>
    </div>
    <div class="row_container border-top">
      <div class="w-30 border-right terms-block padding">
        <h3>Declaration:</h3>
        We declare that this invoice shows the actual price of the goods 
        described and that all particulars are true and correct.<br/>
        <h4>SUBJECT TO [jurisdiction] JURISDICTION</h4>
      </div>
      <div class="w-45 bank-details border-right padding">
        <h3>Bank Details :</h3>
        <div class="row">
          <div class="w-30 bank-detail">
            <div class="bank-detail-inner">
              A/c Name
            </div>
          </div>
          <div class="w-70">
            [beneficiary_name]
          </div>
        </div>
        <div class="row">
          <div class="w-30 bank-detail">
            <div class="bank-detail-inner">
              Bank Name
            </div>
          </div>
          <div class="w-70">
            [bank_name]
          </div>
        </div>
        <div class="row">
          <div class="w-30 bank-detail">
            <div class="bank-detail-inner">
              Branch/IFSC
            </div>
          </div>
          <div class="w-70">
            [branch_name]
          </div>
        </div>
        <div class="row">
          <div class="w-30 bank-detail">
            <div class="bank-detail-inner">
              A/C no.
            </div>
          </div>
          <div class="w-70">
            [ac_no]
          </div>
        </div>
        <div class="row">
          <div class="w-30 bank-detail">
            <div class="bank-detail-inner">
              PAN
            </div>
          </div>
          <div class="w-70">
            [company_pan]
          </div>
        </div>
      </div>
      <div class="w-25 sig-block padding">
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
    This is a Computer Generated Invoice
  </div>
</body>
</html>
