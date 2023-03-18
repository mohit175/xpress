class USER{

  /*
   * Function constructor
   *
   * Constructor for user class
   *
   * Sets up the class for use
   */
  constructor(){
    this.heart_beat_interval = 15000
    this.setHashOptions()
    this.setModule()
    this.enableBindingModule()
    this.setCustomCalendarInputs()
    this.enableActions()
    this.AddRemoveInputRows()
    this.enableProcessCost()
    this.enableModalMove()
    this.enableJobSize()
    this.getHSNCodes()
    this.enableHSNCodeActions()
    this.enablePDFGeneration()
    this.enablemmHovering()
    this.enableSpotColors()
    this.loadVendors()
    this.enableDashboardActions()
    this.enableJobTicketSave()
  }
  enableBindingModule(){
    let _this = this
    if( _this.module == "binding" ){
      $("#BindingModal").show()
      $("#BindingModal").removeClass("modal")
      $("#BindingModal").addClass("bindingModule")
      $("#BindingModal").find(".close").remove()
      $("#BindingModal .modal-header .header").html("Book-Binding")
      $("#main-content").addClass("binding")
      $("#pdf_div button").hide()
      $("#screenshot-pdf-button").show()
    }
  }
  enableJobTicketSave(){
    let _this = this
    $("#save_job_ticket").click(function(){
      _this.confirmSaveJobTicket()
    })
  }
  enableDashboardActions(){
    let _this = this
    $("#main-content .main-header input").change(function(){
      const css_class = $(this).attr("class")
      if( css_class == "quote_no"    || 
          css_class == "delivery_no" ||
          css_class == "invoice_no"  ){
        $("#main-content .main-header select.month").val("")
        $("#main-content .main-header select.year").val("")
        $("#main-content .main-header select.history").val("")
        $("#main-content .main-header input.est_no").val("")
        $("#main-content .main-header input.customer_sel").val("")
        $("#main-content .main-header input.customer_sel").attr("data-id","")
      }
      else if(css_class == "est_no"){
        $("#main-content .main-header select.month").val("")
        $("#main-content .main-header select.year").val("")
        $("#main-content .main-header select.history").val("")
        $("#main-content .main-header input.quote_no").val("")
        $("#main-content .main-header input.delivery_no").val("")
        $("#main-content .main-header input.invoice_no").val("")
        $("#main-content .main-header input.customer_sel").val("")
        $("#main-content .main-header input.customer_sel").attr("data-id","")
        $("#main-content .main-header .vendor").hide()
        $("#main-content .main-header .vendor_sel").val("")
        $("#main-content .main-header .po_no").hide()
        $("#main-content .main-header select.po_no").val("")
      }
      switch(_this.item_loaded){
        case 'quotations':
          _this.getQuotations()
        break;
        case 'delivery_memo':
          _this.getDeliveryMemo()
        break;
        case 'invoices':
          _this.getInvoices()
        break;
        case 'purchase_orders':
          _this.getPurchaseOrders()
        break;
      }
    })
    $("#main-content .main-header select").change(function(){
      const css_class = $(this).attr("class")
      if(css_class == "month" || css_class == "year"){
        $("#main-content .main-header select.history").val("")
        $("#main-content .main-header input.est_no").val("")
        $("#main-content .main-header input.quote_no").val("")
        $("#main-content .main-header input.delivery_no").val("")
        $("#main-content .main-header input.invoice_no").val("")
      }
      else if(css_class == "history"){
        $("#main-content .main-header select.month").val("")
        $("#main-content .main-header select.year").val("")
        $("#main-content .main-header input.est_no").val("")
        $("#main-content .main-header input.quote_no").val("")
        $("#main-content .main-header input.delivery_no").val("")
        $("#main-content .main-header input.invoice_no").val("")
      }
      switch(_this.item_loaded){
        case 'quotations':
          _this.getQuotations()
        break;
        case 'delivery_memo':
          _this.getDeliveryMemo()
        break;
        case 'invoices':
          _this.getInvoices()
        break;
        case 'purchase_orders':
          _this.getPurchaseOrders()
        break;
      }
    })
  }

  getQuotations(page = 1){
    let _this = this
    _this.item_loaded = 'quotations' 
    const limit = 10
    if(page == 1){
      $("#main-content .main-header .delivery_no").hide()
      $("#main-content .main-header input.delivery_no").val("")
      $("#main-content .main-header .quote_no").show()
      $("#main-content .main-header .invoice_no").hide()
      $("#main-content .main-header input.invoice_no").val("")
      $("#main-content .main-header .vendor").hide()
      $("#main-content .main-header .vendor_sel").val("")
      $("#main-content .main-header .po_no").hide()
      $("#main-content .main-header select.po_no").val("")
    }
    let params = {action:"get_quotations", page:page}
    let quote_no = $("#main-content .main-header input.quote_no").val().trim()
    let est_no = $("#main-content .main-header input.est_no").val().trim()
    let customer_id = $("#main-content .main-header input.customer_sel")
      .attr("data-id")
    let month = $("#main-content .main-header select.month").val()
    let year = $("#main-content .main-header select.year").val()
    let history = $("#main-content .main-header select.history").val()
    let sel_module = $("#main-content .main-header select.module").val()
    if(quote_no != ""){
      params.quote_no = quote_no
    }
    else if(est_no != ""){
      params.estimate_no = est_no
    }
    else{
      if(sel_module != ""){
        params.module = sel_module
      }
      if(customer_id != ""){
        params.customer_id = customer_id
      }
      if(history != ""){
        params.history = history
      }
      else{
        if(month != ""){
          params.month = month
        }
        if(year != ""){
          params.year = year
        }
      }
    }
    $.post("ajax_api.php",params,function(data){
      _this.quotations = data.resp
      if(page == 1){
        const count = data.resp.count
        const pages = Math.ceil(count / limit)
        if(count == 0){
          const html = "<h1>No Quotations Found</h1>"
          const page_div = "#main-content .main-footer .pages"
          $(page_div).html("")
          $("#main-content .inner-content").html(html)
          return
        }
        let start_page = 1
        let end_page = pages
        if(pages > 10){
          end_page = 10
        }
        if(page > 5){
          start_page = page - 4
          end_page = page + 6
          if(end_page > pages){
            end_page = pages
          }
        }
        const page_div = "#main-content .main-footer .pages"
        $(page_div).html("")
        for(let i = start_page; i <= end_page; i++){
          let html = '<button class="modal-btn" page="'+i+'">'+i+'</button>'
          $(page_div).append(html)
        }
        $(page_div).find("button").click(function(){
          const page = $(this).attr("page")
          _this.getQuotations(page)
        })
      }
      _this.loadQuotations("#dashboard_div")
    })
  }

  getDeliveryMemo(page = 1){
    let _this = this
    _this.item_loaded = 'delivery_memo' 
    const limit = 10
    if(page == 1){
      $("#main-content .main-header .quote_no").hide()
      $("#main-content .main-header input.quote_no").val("")
      $("#main-content .main-header .delivery_no").show()
      $("#main-content .main-header .invoice_no").hide()
      $("#main-content .main-header input.invoice_no").val("")
      $("#main-content .main-header .vendor").hide()
      $("#main-content .main-header .vendor_sel").val("")
      $("#main-content .main-header .po_no").hide()
      $("#main-content .main-header select.po_no").val("")
    }
    let params = {action:"get_delivery_memo", page:page}
    let delivery_no = $("#main-content .main-header input.delivery_no").val().trim()
    let est_no = $("#main-content .main-header input.est_no").val().trim()
    let customer_id = $("#main-content .main-header input.customer_sel")
      .attr("data-id")
    let month = $("#main-content .main-header select.month").val()
    let year = $("#main-content .main-header select.year").val()
    let history = $("#main-content .main-header select.history").val()
    let sel_module = $("#main-content .main-header select.module").val()
    if(delivery_no != ""){
      params.delivery_no = delivery_no
    }
    else if(est_no != ""){
      params.estimate_no = est_no
    }
    else{
      if(sel_module != ""){
        params.module = sel_module
      }
      if(customer_id != ""){
        params.customer_id = customer_id
      }
      if(history != ""){
        params.history = history
      }
      else{
        if(month != ""){
          params.month = month
        }
        if(year != ""){
          params.year = year
        }
      }
    }
    $.post("ajax_api.php",params,function(data){
      _this.delivery_memo = data.resp
      if(page == 1){
        const count = data.resp.count
        const pages = Math.ceil(count / limit)
        if(count == 0){
          const html = "<h1>No Delivery Memo</h1>"
          const page_div = "#main-content .main-footer .pages"
          $(page_div).html("")
          $("#main-content .inner-content").html(html)
          return
        }
        let start_page = 1
        let end_page = pages
        if(pages > 10){
          end_page = 10
        }
        if(page > 5){
          start_page = page - 4
          end_page = page + 6
          if(end_page > pages){
            end_page = pages
          }
        }
        const page_div = "#main-content .main-footer .pages"
        $(page_div).html("")
        for(let i = start_page; i <= end_page; i++){
          let html = '<button class="modal-btn" page="'+i+'">'+i+'</button>'
          $(page_div).append(html)
        }
        $(page_div).find("button").click(function(){
          const page = $(this).attr("page")
          _this.getDeliveryMemo(page)
        })
      }
      _this.loadDeliveryMemo("#dashboard_div")
    })
  }

  getInvoices(page = 1){
    let _this = this
    _this.item_loaded = 'invoices' 
    const limit = 10
    if(page == 1){
      $("#main-content .main-header .quote_no").hide()
      $("#main-content .main-header input.quote_no").val("")
      $("#main-content .main-header .delivery_no").hide()
      $("#main-content .main-header input.delivery_no").val("")
      $("#main-content .main-header .invoice_no").show()
      $("#main-content .main-header .vendor").hide()
      $("#main-content .main-header .vendor_sel").val("")
      $("#main-content .main-header .po_no").hide()
      $("#main-content .main-header select.po_no").val("")
    }
    let params = {action:"get_invoices", page:page}
    let invoice_no = $("#main-content .main-header input.invoice_no").val().trim()
    let est_no = $("#main-content .main-header input.est_no").val().trim()
    let customer_id = $("#main-content .main-header input.customer_sel")
      .attr("data-id")
    let month = $("#main-content .main-header select.month").val()
    let year = $("#main-content .main-header select.year").val()
    let history = $("#main-content .main-header select.history").val()
    let sel_module = $("#main-content .main-header select.module").val()
    if(invoice_no != ""){
      params.invoice_no = invoice_no
    }
    else if(est_no != ""){
      params.estimate_no = est_no
    }
    else{
      if(sel_module != ""){
        params.module = sel_module
      }
      if(customer_id != ""){
        params.customer_id = customer_id
      }
      if(history != ""){
        params.history = history
      }
      else{
        if(month != ""){
          params.month = month
        }
        if(year != ""){
          params.year = year
        }
      }
    }
    $.post("ajax_api.php",params,function(data){
      _this.invoices = data.resp
      if(page == 1){
        const count = data.resp.count
        const pages = Math.ceil(count / limit)
        if(count == 0){
          const html = "<h1>No Invoices Found</h1>"
          const page_div = "#main-content .main-footer .pages"
          $(page_div).html("")
          $("#main-content .inner-content").html(html)
          return
        }
        let start_page = 1
        let end_page = pages
        if(pages > 10){
          end_page = 10
        }
        if(page > 5){
          start_page = page - 4
          end_page = page + 6
          if(end_page > pages){
            end_page = pages
          }
        }
        const page_div = "#main-content .main-footer .pages"
        $(page_div).html("")
        for(let i = start_page; i <= end_page; i++){
          let html = '<button class="modal-btn" page="'+i+'">'+i+'</button>'
          $(page_div).append(html)
        }
        $(page_div).find("button").click(function(){
          const page = $(this).attr("page")
          _this.getInvoices(page)
        })
      }
      _this.loadInvoices("#dashboard_div")
    })
  }
  
  getPurchaseOrders(page = 1){
    let _this = this
    _this.item_loaded = 'purchase_orders' 
    const limit = 10
    if(page == 1){
      $("#main-content .main-header .quote_no").hide()
      $("#main-content .main-header input.quote_no").val("")
      $("#main-content .main-header .delivery_no").hide()
      $("#main-content .main-header input.delivery_no").val("")
      $("#main-content .main-header .invoice_no").hide()
      $("#main-content .main-header input.invoice_no").val("")
    }
    let params = {action:"get_purchase_orders", page:page}
    let po_no = $("#main-content .main-header input.po_no").val().trim()
    let est_no = $("#main-content .main-header input.est_no").val().trim()
    let vendor_id = $("#main-content .main-header vendor_sel").val()
    let customer_id = $("#main-content .main-header input.customer_sel")
      .attr("data-id")
    let month = $("#main-content .main-header select.month").val()
    let year = $("#main-content .main-header select.year").val()
    let history = $("#main-content .main-header select.history").val()
    let sel_module = $("#main-content .main-header select.module").val()
 
    if(po_no != ""){
      params.po_no = po_no
    }
    else if(est_no != ""){
      params.estimate_no = est_no
    }
    else{
      if(sel_module != ""){
        params.module = sel_module
      }
      if(customer_id != ""){
        params.customer_id = customer_id
      }
      if(vendor_id != ""){
        params.vendor_id = vendor_id
      }
      if(history != ""){
        params.history = history
      }
      else{
        if(month != ""){
          params.month = month
        }
        if(year != ""){
          params.year = year
        }
      }
    }
    $.post("ajax_api.php",params,function(data){
      _this.purchase_orders = data.resp
      if(page == 1){
        const count = data.resp.count
        const pages = Math.ceil(count / limit)
        if(count == 0){
          const html = "<h1>No Purchase Orders Found</h1>"
          const page_div = "#main-content .main-footer .pages"
          $(page_div).html("")
          $("#main-content .inner-content").html(html)
          return
        }
        let start_page = 1
        let end_page = pages
        if(pages > 10){
          end_page = 10
        }
        if(page > 5){
          start_page = page - 4
          end_page = page + 6
          if(end_page > pages){
            end_page = pages
          }
        }
        const page_div = "#main-content .main-footer .pages"
        $(page_div).html("")
        for(let i = start_page; i <= end_page; i++){
          let html = '<button class="modal-btn" page="'+i+'">'+i+'</button>'
          $(page_div).append(html)
        }
        $(page_div).find("button").click(function(){
          const page = $(this).attr("page")
          _this.getPurchaseOrders(page)
        })
      }
      _this.loadPurchaseOrders("#dashboard_div")
    })
  }

  saveJobTicket(){
    let _this = this
    const pdf = "#PDF_Options_Job_Ticket"
    $(pdf).find("select").each(function(i,d){
      $(d).find("option").removeAttr("selected")
      $(d).find("option:selected").attr("selected","selected")
    })
    $(pdf).find("input").each(function(i,d){
      const type = $(d).attr("type")
      if(type == "checkbox"){
        if( $(d).is(":checked") ){
          $(d).attr("checked","checked")
        }
        else{
          $(d).removeAttr("checked")
        }
      }
      else{
        let value = $(d).val()
        $(d).removeAttr("value")
        $(d).attr("value",value)
      }
    })
    let html = $(pdf).html()
    const data = JSON.stringify(_this.job_ticket)
    const module = _this.module
    const estimate_id = $("#quote_no").val()
    const job_ref = $("#job_ref").val()
    const job_desc = $("#pdf_desc").val()
    const customer_id = $("#customer").attr("data-id")
    const job_ticket_num_year = $(pdf + " .job_ticket_number").html().trim()
    let inputs = ['test_inputs']
    $(pdf).find("select").each(function(i,d){
      
    })
    inputs = JSON.stringify(inputs)
    let params = {action:"save_job_ticket",html, data, module, estimate_id, 
      job_ref, job_desc, inputs, customer_id}
    if(job_ticket_num_year != ""){
      params.job_ticket_num_year = job_ticket_num_year
      params.job_ticket_year = $(pdf + " .job_ticket_number").attr("job_ticket_year")
      params.job_ticket_num = $(pdf + " .job_ticket_number").attr("job_ticket_num")
    }
    $.post("ajax_api.php", params, function(data){
      $(pdf + " .job_ticket_number").html(data.resp.job_ticket_num_year)
      $(pdf + " .job_ticket_number").attr("job_ticket_num_year",data.resp.job_ticket_num_year)
      $(pdf + " .job_ticket_number").attr("job_ticket_num",data.resp.job_ticket_num)
      $(pdf + " .job_ticket_number").attr("job_ticket_year",data.resp.job_ticket_year)
      const job_ticket_date = getDate('').split(" ")[0]
      $(pdf + " .job_ticket_date").html(job_ticket_date)
      window.xpress.modalAlert("alert","Job Ticket Saved",
        "Job Ticket saved successfully", "success");
    })
  }

  confirmSaveJobTicket(){
    let _this = this
    if( $("#quote_locked").length == 1 ){
      _this.saveJobTicket()
      return
    }
    const alert_text = `Saving Job Ticket will lock this Estimate. You will not
      be able to edit this Estimate but you can view and copy this Estimate`
    window.xpress.modalAlert("confirm", "Confirm Locking of Estimate",
      alert_text, "info", ['Yes Lock Estimate','Cancel']).then(function(data){
        const quote_id = $("#quote_no").val()
        $.post("ajax_api.php",{action: "lock_quote", quote_id: quote_id}, function(d){
          $(".quote_no").append('<span id="quote_locked"><i class="fa-solid fa-lock"></i></span>')
          _this.saveJobTicket()
        })
      })
  }

  loadInvoices(element){
    let _this = this
    $("#pdf_reports_div").hide()
    let html = '<div class="table">'
      + '<div class="table-header"><div class="invoice_num">Invoice #</div>'
      + '<div class="date">Date</div><div class="cust_name">Customer Name</div>'
      + '<div class="est_no">Estimate #</div><div class="job_ref">Job Reference'
      + '</div><div class="actions">Job Description</div></div>'
    _this.invoices.rows.forEach(function(d){
      const invoice_id = d.id
      const customer_id = d.customer_id
      let data = JSON.parse(d.data)
      let estimates = data.estimates
      let date = formatDate(d.created)
      let invoice_num = d.invoice_num_year
      let customer_name = filterCustomer(customer_id)[0].company_name
      estimates.forEach(function(e,i){
        if(i > 0){
          date = ""
          invoice_num = ""
          customer_name = ""
        }
        const estimate_id = e.est_no
        const job_ref = e.job_ref
        const job_desc = e.desc
        html = html + '<div class="table-row" data-id="' + invoice_id 
          + '"><div class="invoice_num">' + invoice_num 
          + '</div><div class="date">' + date + '</div><div class="cust_name">' 
          + customer_name + '</div><div class="est_no">'+ estimate_id +
          '</div><div class="job_ref">' + job_ref + '</div><div class="job_desc">'
          + job_desc + '</div></div>'
      })
    })
    html = html + "</div>"
    $("#main-content .main-header .main-title").html("Invoices")
    $("#main-content .inner-content").html(html)
    $("#main-content").show()
    $("#home-div").hide()
    $("#main-content .table-row").click(function(){
      $("#main-content .quote_highlight").removeClass("quote_highlight")
      $(this).addClass("quote_highlight")
    })
    $("#main-content .preview").off("click")
    $("#main-content .preview").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Invoice",
          "Please Select the delivery memo.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=invoice&preview=true&id='+id
      $("#previewModal .preview_frame").attr("src",url)
      $("#previewModal").show()
    })
    $("#main-content .download").off("click")
    $("#main-content .download").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Delivery Memo",
          "Please Select the delivery memo.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=invoice&id='+id
      window.open(url, "_blank")
    })
  }
  
  loadPurchaseOrders(element){
    let _this = this
    $("#pdf_reports_div").hide()
    let html = `<div class="table">
      <div class="table-header"><div class="po_num">PO #</div>
      <div class="process">Process</div>
      <div class="date">Date</div><div class="cust_name">Customer Name</div>
      <div class="vendor_name">Vendor</div>
      <div class="est_no">Estimate #</div><div class="module">Module</div>
      <div class="job_ref">Job Reference</div></div>`
    _this.purchase_orders.rows.forEach(function(d){
      const po_id = d.po_num
      const po_num = d.po_num_year
      const customer_id = d.customer_id
      const vendor_id = d.vendor_id
      const estimate_num = d.estimate_num
      const process = d.po_name
      let po_module = ""
      switch(d.module){
        case "single_sheet":
          po_module = "Single Sheet";
        break;
        case "multi_sheet":
          po_module = "Multi Sheet";
        break;
        case "book":
          po_module = "Book-Magazine";
        break;
        case "stationery":
          po_module = "Stationery";
        break;
        case "calendar":
          po_module = "Calendar";
        break;
        case "box":
          po_module = "Box-Packaging";
        break;
      }
      let date = formatDate(d.created_date)
      let invoice_num = d.invoice_num_year
      let vendor_name = ""
      if(vendor_id == 0){
        vendor_name = "In-House"
      }
      else{
        vendor_name = filterVendor(vendor_id).company_name
      }
      let customer_name = filterCustomer(customer_id)[0].company_name
      html = html + '<div class="table-row" data-id="' + po_id 
        + '"><div class="po_num">' + po_num +'</div><div class="process">'+ process
        + '</div><div class="date">' + date + '</div><div class="cust_name">' 
        + customer_name + '</div><div class="vendor_name">'+vendor_name+'</div>'
        +'<div class="est_no">'+ estimate_num + '</div><div class="module">' 
        + po_module + '</div><div class="job_ref">'+d.job_ref+'</div></div>'
    })
    html = html + "</div>"
    $("#main-content .main-header .main-title").html("POs")
    $("#main-content .inner-content").html(html)
    $("#main-content").show()
    $("#home-div").hide()
    $("#main-content .table-row").click(function(){
      $("#main-content .quote_highlight").removeClass("quote_highlight")
      $(this).addClass("quote_highlight")
    })
    $("#main-content .preview").off("click")
    $("#main-content .preview").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Invoice",
          "Please Select the delivery memo.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=po&preview=true&po_num='+id
      $("#previewModal .preview_frame").attr("src",url)
      $("#previewModal").show()
    })
    $("#main-content .download").off("click")
    $("#main-content .download").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Delivery Memo",
          "Please Select the delivery memo.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=po&po_num='+id
      window.open(url, "_blank")
    })
  }

  loadDeliveryMemo(element){
    let _this = this
    $("#pdf_reports_div").hide()
    let html = '<div class="table">'
      + '<div class="table-header"><div class="del_memo_num">Delivery Memo #</div>'
      + '<div class="date">Date</div><div class="cust_name">Customer Name</div>'
      + '<div class="est_no">Estimate #</div><div class="job_ref">Job Reference'
      + '</div><div class="actions">Job Description</div></div>'
    _this.delivery_memo.rows.forEach(function(d){
      const delivery_id = d.id
      const customer_id = d.customer_id
      let data = JSON.parse(d.data)
      let estimates = data.estimates
      let date = formatDate(d.created)
      let delivery_num = d.delivery_num_year
      let customer_name = filterCustomer(customer_id)[0].company_name
      estimates.forEach(function(e,i){
        if(i > 0){
          date = ""
          delivery_num = ""
          customer_name = ""
        }
        const estimate_id = e.est_no
        const job_ref = e.job_ref
        const job_desc = e.desc
        html = html + '<div class="table-row" data-id="' + delivery_id 
          + '"><div class="del_memo_num">' + delivery_num 
          + '</div><div class="date">' + date + '</div><div class="cust_name">' 
          + customer_name + '</div><div class="est_no">'+ estimate_id +
          '</div><div class="job_ref">' + job_ref + '</div><div class="job_desc">'
          + job_desc + '</div></div>'
      })
    })
    html = html + "</div>"
    $("#main-content .main-header .main-title").html("Delivery Memos")
    $("#main-content .inner-content").html(html)
    $("#main-content").show()
    $("#home-div").hide()
    $("#main-content .table-row").click(function(){
      $("#main-content .quote_highlight").removeClass("quote_highlight")
      $(this).addClass("quote_highlight")
    })
    $("#main-content .preview").off("click")
    $("#main-content .preview").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Delivery Memo",
          "Please Select the delivery memo.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=delivery_memo&preview=true&id='+id
      $("#previewModal .preview_frame").attr("src",url)
      $("#previewModal").show()
    })
    $("#main-content .download").off("click")
    $("#main-content .download").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Delivery Memo",
          "Please Select the delivery memo.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=delivery_memo&id='+id
      window.open(url, "_blank")
    })
  }

  loadQuotations(element){
    let _this = this
    $("#pdf_reports_div").hide()
    let html = '<div class="table">'
      + '<div class="table-header"><div class="quote_num">Quotation #</div>'
      + '<div class="date">Date</div><div class="cust_name">Customer Name</div>'
      + '<div class="est_no">Estimate #</div><div class="job_ref">Job Reference'
      + '</div><div class="actions">Job Description</div></div>'
    _this.quotations.rows.forEach(function(d){
      const quote_id = d.id
      const customer_id = d.customer_id
      let data = JSON.parse(d.data)
      let estimates = data.estimates
      let date = formatDate(d.created)
      let quote_num = d.quote_num_year
      let customer_name = filterCustomer(customer_id)[0].company_name
      estimates.forEach(function(e,i){
        if(i > 0){
          date = ""
          quote_num = ""
          customer_name = ""
        }
        const estimate_id = e.est_no
        const job_ref = e.job_ref
        const job_desc = e.desc
        html = html + '<div class="table-row" data-id="' + quote_id 
          + '"><div class="quote_num">' + quote_num 
          + '</div><div class="date">' + date + '</div><div class="cust_name">' 
          + customer_name + '</div><div class="est_no">'+ estimate_id +
          '</div><div class="job_ref">' + job_ref + '</div><div class="job_desc">'
          + job_desc + '</div></div>'
      })
    })
    html = html + "</div>"
    $("#main-content .main-header .main-title").html("Quotations")
    $("#main-content .inner-content").html(html)
    $("#main-content").show()
    $("#home-div").hide()
    $("#main-content .table-row").click(function(){
      $("#main-content .quote_highlight").removeClass("quote_highlight")
      $(this).addClass("quote_highlight")
    })
    $("#main-content .preview").off("click")
    $("#main-content .preview").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Quotation",
          "Please Select the quotation.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=quotation&preview=true&id='+id
      $("#previewModal .preview_frame").attr("src",url)
      $("#previewModal").show()
    })
    $("#main-content .download").off("click")
    $("#main-content .download").click(function(){
      let selected_row = $("#main-content .quote_highlight")
      if(selected_row.length == 0){
        window.xpress.modalAlert("alert","Select Quotation",
          "Please Select the quotation.", "failure")
        return
      }
      const id = $(selected_row).attr("data-id")
      const url = 'ajax_api.php?action=getPDF&pdf_type=quotation&id='+id
      window.open(url, "_blank")
    })
  }

  enableSpotColors(){
    let _this = this
    _this.getSpotColor()
    $("#Add_spot_color").click(function(){
      const spot_color_name = $("#new_spot_color_name").val().trim()
      if(spot_color_name == ""){
        window.xpress.modalAlert("alert","Please Enter Spot Color Name",
          "Please enter the Spot Color Name to add", "failure")
        return
      }
      const action = 'add_spot_color'
      $.post("ajax_api.php",{action,spot_color_name},function(data){
        if(data.status == "failed" && data.message.search("Duplicate entry") >= 0){
          window.xpress.modalAlert("alert","Spot Color Exists",
            "Spot Color already exists", "failure")
          return
        }
        _this.loadPMSColors(data.resp.pms_color)
        _this.loadSpotColors(data.resp.spot_color)
      })
    })
    $("#Add_pms_color").click(function(){
      const spot_color_name = $("#new_spot_color_name").val()
      if(spot_color_name == ""){
        window.xpress.modalAlert("alert","Please Enter PMS Number",
          "Please enter the PMS Number", "failure")
        return
      }
      const action = 'add_pms_color'
      $.post("ajax_api.php",{action,spot_color_name},function(data){
        if(data.status == "failed" && data.message.search("Duplicate entry") >= 0){
          window.xpress.modalAlert("alert","PMS Number Exists",
            "PMS Number already exists", "failure")
          return
        }
        _this.loadPMSColors(data.resp.pms_color)
        _this.loadSpotColors(data.resp.spot_color)
      })
    })
    $("#Delete_spot_color").click(function(){
      const selected = $("#Spot_color .quote_library_highlight")
      if($(selected).length == 0){
        window.xpress.modalAlert("alert","Please Select Color",
          "Please select color to delete", "failure");
        return;
      }
      let action = 'delete_spot_color'
      const id = $(selected).attr("data_id")
      if($(selected).hasClass("pms_color_name")){
        action ="delete_pms_color"
      }
      $.post("ajax_api.php",{action,id},function(data){
        $(selected).parent().remove()
      })
    })
    $("#colorSelectModal .apply_colors").click(function(){
      
    })
  }
  loadSpotColors(data){
    let _this = this;
    _this.spot_color = data
    window.xpress.loadData('#Spot_color_table', data, ".grid") 
    $("#Spot_color_table .spot_color_name").click(function(){
      $("#Spot_color_table .spot_color_name").removeClass("quote_library_highlight")
      $(this).addClass("quote_library_highlight")
    })
    _this.addColorsFromLib("#colorSelectModal")
  }
  loadPMSColors(data){
    let _this = this;
    _this.pms_color = data
    window.xpress.loadData('#PMS_color_table', data, ".grid") 
    $("#PMS_color_table .pms_color_name").click(function(){
      $("#PMS_color_table").parent().find(".quote_library_highlight")
        .removeClass("quote_library_highlight")
      $(this).addClass("quote_library_highlight")
    })
  }
  
  addColorsFromLib(element){
    const spot_color = $(element).find(".spot_color")
    let html = "";
    window.xpress.user.spot_color.forEach(function(d,i){
      const color_class ='sp_' + d.spot_color_name.replace(/[\W_]+/g,"_")
      html = html + '<div class="color"><input type="checkbox" class="'+
        color_class+'"></input>'+d.spot_color_name+'</div>'
    })
    $(spot_color).html(html)
    $(element).find(".selected_colors .spot_color .color").addClass("hide")
  }

  getSpotColor(){
    let _this = this
    $.post("ajax_api.php",{action:'get_spot_color'},function(data){
      if(data.resp.pms_color === false){
        data.resp.pms_color = []
      }
      if(data.resp.spot_color === false){
        data.resp.spot_color = []
      }
      _this.loadPMSColors(data.resp.pms_color)
      _this.loadSpotColors(data.resp.spot_color)
    })
  }
  saveInvoicePrefences(){
    var _this = this;
    _this.preferences.bank_benefeciary_name = $("#bank_beneficiary_name").val();
    _this.preferences.bank_name = $("#bank_name").val();
    _this.preferences.bank_branch_name = $("#bank_branch_name").val();
    _this.preferences.bank_acc_type = $("#bank_acc_type").val();
    _this.preferences.bank_acc_no = $("#bank_acc_no").val();
    _this.preferences.company_isfc = $("#company_isfc").val();
    _this.preferences.company_gstin = $("#company_gstin").val();
    _this.preferences.company_jurisdiction = $("#company_jurisdiction").val();
    _this.preferences.company_pan = $("#company_pan").val();
    _this.preferences.company_state_code = $("#company_jurisdiction option:selected")
      .attr("state_code");
    _this.preferences.invoice_terms = $("#invoice_terms").val();
    _this.savePreferences();
  }
  enablePDFGeneration(){
    this.enablePDFGenerationInvoice()
    this.enablePDFGenerationQuotation()
    this.enablePDFGenerationDeliveryMemo()
    this.enablePDFGenerationJobTicket()
  }
  
  enablePDFGenerationJobTicket(){
    var _this = this
    var pdf = "#PDF_Options_Job_Ticket"
    const max_colors = 8
    $(pdf + " .close-modal").click(function(){
      $(pdf).hide()
    })
    $("#job-ticket-pdf-button").click(function(){
      //set the quantity to be qty a by default so the rest of the details can
      //be calculated
      _this.job_ticket = new JOB_TICKET;
      const estimate_id = $("#quote_no").val()
      $.post("ajax_api.php",{action:'get_job_ticket',estimate_id},function(data){
        if(data.resp != false){
          let job_ticket_data = JSON.parse(data.resp.data)
          $(pdf).html(data.resp.html)
          const job_ticket_keys = Object.keys(job_ticket_data)
          job_ticket_keys.forEach(function(key){
            _this.job_ticket[key] = job_ticket_data[key]
          })
          _this.job_ticket.id = data.resp.id
          _this.job_ticket.renderJobTicket(pdf,true)
          $(pdf).find(".page-1").find("select").attr("disabled","disabled")
          $(pdf).find(".page-1").find(".job-work-container select").removeAttr("disabled")
          const date = formatDate(data.resp.created)
          $(pdf).find(".job_ticket_date").html(date).split(" ")[0]
          $(pdf).find(".job_ticket_number").html(data.resp.job_ticket_id_year)
        }
        else{
          _this.job_ticket.createJobTicket("quantity_a")
          _this.job_ticket.renderJobTicket(pdf)
        }
        $("#save_job_ticket").off("click")
        $("#save_job_ticket").click(function(){
          _this.confirmSaveJobTicket()
        })
      })
      
      $("#generate_job_ticket_pdf").off("click")
      $("#generate_job_ticket_pdf").click(function(){
        _this.job_ticket.generatePDF(pdf)
      })
      
      $("#pdf_div").hide()
      
      _this.generateCuts()
      const svg = $("#job_size_svg").parent().html()
      $(pdf).find(".cutting_diagram .inner_pgs_svg").html(svg)
      $(pdf).find(".cutting_diagram").find(".job_size_svg").removeAttr("id")
      if(_this.module == "book"){
        const title_svg = $("#job_size_svg").parent().html()
        $(pdf).find(".cutting_diagram .title_pgs_svg").html(title_svg)
        $(pdf).find(".cutting_diagram").find(".job_size_svg").removeAttr("id")
      }
      const module_text = $("#change_module").html()
      $(pdf).find(".module").html(module_text)
      $(pdf).show()
    })
  }
  
  enablePDFGenerationDeliveryMemo(){
    var _this = this;
    var pdf = "#PDF_Options_Delivery";
    $("#memo-pdf-button").click(function(){
      var hsn = [];
      _this.hsn_codes.forEach(function(d){
        hsn.push({id:d.id,hsn:d.hsn + ' -- ' +d.name});
      });
      $(pdf).show();
      $(pdf + " .invoice_from").val("estimate");
      $(pdf + " .quotation-table .table .data-row").remove();
      _this.addDeliveryEstimate();
      $("#pdf_div").hide();
      $(pdf +" select.hsn .data-select").remove();
      window.xpress.loadSelectData($(pdf + " select.hsn"),hsn);
    });
    _this.enableInvoiceActions(pdf);
    $("#generate_delivery_memo").click(function(){
      var invoice_from = $(pdf + " .invoice_from").val();
      var estimates = [];
      if( invoice_from == "estimate" || invoice_from == "estimates"){
        var est_rows = $(pdf + " .quotation-table .table .data-row");
        try {
          est_rows.each(function(i,d){
            var est_no = $(d).find('.estimate_no').html();
            var qty = $(d).find("select.quantity").val();
            var hsn = $(d).find("select.hsn").val();
            if( qty == "" || hsn == "" ){
              throw("invalid qty")
            }
            var estimate = {
              est_no:est_no,
              qty:qty,
              hsn:hsn
            };
            estimates.push(estimate);
          });
        }
        catch(e){
          window.xpress.modalAlert("alert","Please select Quantity and HSN",
            `Please select Quantity and HSN for each Estimate`, "failure")
          return
        }
        if( invoice_from == "estimates" && estimates.length < 2 ){
          window.xpress.modalAlert("alert",
            "Please select Estimate to create Delivery Memo",
            `Must Select minimum of 2 or more estimates to generate 
            Delivery Memo.`, "failure")
          return
        }
      }
      else if(invoice_from == "standalone"){
        var est_rows = $(pdf + " .standalone-quotation-table .table .data-row");
        est_rows.each(function(i,d){
          var desc = $(d).find('.desc').val();
          var qty = $(d).find("input.quantity").val();
          var amount = $(d).find("input.amount").val();
          var hsn = $(d).find("select.hsn").val();
          var estimate = {
            desc:desc,
            qty:qty,
            hsn:hsn,
            amount:amount
          };
          estimates.push(estimate);
        });
      }
      if( invoice_from == "estimate" ){
        var customer_id = $("#customer").attr("data-id");
      }
      else if( invoice_from == "estimates" ){
        var customer_id = $(pdf + " .quote_customer").attr("data-id");
      }
      var params = {action: "generate_delivery_memo",
        invoice_details:{},
        customer_id:customer_id,
        estimates:estimates
      };
      
      $(pdf +" input, " + pdf + " textarea," + pdf + " select").each(function(i,d){
        var css_class = $(d).attr("class").replace("hide",'').trim();
        var value = $(d).val();
        //params['invoice_details'][css_class] = value;
        params[css_class] = value;
      });
      $.post("ajax_api.php",params,function(data){
        window.location.href = 'ajax_api.php?action=getPDF&pdf_type=delivery_memo&id='+data.resp;
      });
    });
  }
  enablePDFGenerationInvoice(){
    var _this = this;
    var pdf = "#PDF_Options_Invoice";
    $("#invoice-pdf-button").click(function(){
      var hsn = [];
      _this.hsn_codes.forEach(function(d){
        hsn.push({id:d.id,hsn:d.hsn + ' -- ' +d.name});
      });
      $(pdf).show();
      $(pdf + " .invoice_from").val("estimate");
      $(pdf + " .quotation-table .table .data-row").remove();
      _this.addInvoiceEstimate();
      $("#pdf_div").hide();
      $("#PDF_Options_Invoice select.hsn .data-select").remove();
      window.xpress.loadSelectData($("#PDF_Options_Invoice select.hsn"),hsn);
    });
    _this.enableInvoiceActions(pdf);
    $("#generate_invoice").click(function(){
      var invoice_from = $(pdf + " .invoice_from").val();
      var estimates = [];
      if( invoice_from == "estimate" || invoice_from == "estimates"){
        var est_rows = $(pdf + " .quotation-table .table .data-row");
        try {
          est_rows.each(function(i,d){
            var est_no = $(d).find('.estimate_no').html();
            var qty = $(d).find("select.quantity").val();
            var hsn = $(d).find("select.hsn").val();
            if( qty == "" || hsn == "" ){
              throw("invalid qty")
            }
            var estimate = {
              est_no:est_no,
              qty:qty,
              hsn:hsn
            };
            estimates.push(estimate);
          });
        }
        catch(e){
          window.xpress.modalAlert("alert","Please select Quantity and HSN",
            `Please select Quantity and HSN for each Estimate`, "failure")
          return
        }
        if( invoice_from == "estimates" && estimates.length < 2 ){
          window.xpress.modalAlert("alert",
            "Please select Estimate to create Delivery Memo",
            `Must Select minimum of 2 or more estimates to generate Invoice.`,
            "failure")
          return
        }
      }
      else if(invoice_from == "standalone"){
        var est_rows = $(pdf + " .standalone-quotation-table .table .data-row");
        est_rows.each(function(i,d){
          var desc = $(d).find('.desc').val();
          var qty = $(d).find("input.quantity").val();
          var amount = $(d).find("input.amount").val();
          var hsn = $(d).find("select.hsn").val();
          var estimate = {
            desc:desc,
            qty:qty,
            hsn:hsn,
            amount:amount
          };
          estimates.push(estimate);
        });
      }
      if( invoice_from == "estimate" ){
        var customer_id = $("#customer").attr("data-id");
      }
      else if( invoice_from == "estimates" ){
        var customer_id = $(pdf + " .quote_customer").attr("data-id");
      }
      var params = {action: "generate_invoice",
        invoice_details:{},
        customer_id:customer_id,
        estimates:estimates
      };
      
      $(pdf +" input, " + pdf + " textarea," + pdf + " select").each(function(i,d){
        var css_class = $(d).attr("class").replace("hide",'').trim();
        var value = $(d).val();
        //params['invoice_details'][css_class] = value;
        params[css_class] = value;
      });
      $.post("ajax_api.php",params,function(data){
        window.location.href = 'ajax_api.php?action=getPDF&pdf_type=invoice&id='+data.resp;
      });
    });
  }
  addInvoiceBlank(){
    var _this = this;
    var pdf = "#PDF_Options_Invoice";
    var html = $(pdf + " .standalone-quotation-table .sample-row").html();
    $(pdf + " .standalone-quotation-table .table").append(html);
    var data_row = $(pdf + " .quotation-table .table").find(".data-row").last();
    $(pdf + " .quotation-table .table .data-row").off("click");
    $(pdf + " .quotation-table .table .data-row").click(function(){
      $(pdf + " .quotation-table .table .quote_highlight").removeClass("quote_highlight");
      $(this).addClass("quote_highlight");
    });
  }
  addInvoiceEstimate(estimate_no = null, module = null, job_ref = null){
    var _this = this;
    var pdf = "#PDF_Options_Invoice";
    var html = $(pdf + " .quotation-table .sample-row").html();
    $(pdf + " .quotation-table .table").append(html);
    var data_row = $(pdf + " .quotation-table .table").find(".data-row").last();
    if(estimate_no == null)
    {
      estimate_no = $("#quote_no").val();
    }
    if(module == null){
      module = $("#change_module").html();
    }
    if(job_ref == null){
      job_ref = $("#job_ref").val();
    }
    $(data_row).find(".estimate_no").html(estimate_no);
    $(data_row).find(".module").html(module);
    $(data_row).find(".job_ref").html(job_ref);
    $(pdf + " .quotation-table .table .data-row").off("click");
    $(pdf + " .quotation-table .table .data-row").click(function(){
      $(pdf + " .quotation-table .table .quote_highlight").removeClass("quote_highlight");
      $(this).addClass("quote_highlight");
    });
  }
  addDeliveryEstimate(estimate_no = null, module = null, job_ref = null){
    var _this = this;
    var pdf = "#PDF_Options_Delivery";
    var html = $(pdf + " .quotation-table .sample-row").html();
    $(pdf + " .quotation-table .table").append(html);
    var data_row = $(pdf + " .quotation-table .table").find(".data-row").last();
    if(estimate_no == null)
    {
      estimate_no = $("#quote_no").val();
    }
    if(module == null){
      module = $("#change_module").html();
    }
    if(job_ref == null){
      job_ref = $("#job_ref").val();
    }
    $(data_row).find(".estimate_no").html(estimate_no);
    $(data_row).find(".module").html(module);
    $(data_row).find(".job_ref").html(job_ref);
    $(pdf + " .quotation-table .table .data-row").off("click");
    $(pdf + " .quotation-table .table .data-row").click(function(){
      $(pdf + " .quotation-table .table .quote_highlight").removeClass("quote_highlight");
      $(this).addClass("quote_highlight");
    });
  }
  
  addQuotationEstimate(estimate_no = null, module = null, job_ref = null){
    var _this = this;
    var pdf = "#PDF_Options_Quotation";
    var html = $(pdf + " .quotation-table .sample-row").html();
    $(pdf + " .quotation-table .table").append(html);
    var data_row = $(pdf + " .quotation-table .table").find(".data-row").last();
    if(estimate_no == null)
    {
      estimate_no = $("#quote_no").val();
    }
    if(module == null){
      module = $("#change_module").html();
    }
    if(job_ref == null){
      job_ref = $("#job_ref").val();
    }
    $(data_row).find(".estimate_no").html(estimate_no);
    $(data_row).find(".module").html(module);
    $(data_row).find(".job_ref").html(job_ref);
    $(pdf + " .quotation-table .table .data-row").off("click");
    $(pdf + " .quotation-table .table .data-row").click(function(){
      $(pdf + " .quotation-table .table .quote_highlight").removeClass("quote_highlight");
      $(this).addClass("quote_highlight");
    });
  }
  
  enablePDFGenerationQuotation(){
    var _this = this;
    var pdf = "#PDF_Options_Quotation";
    //save as pdf Qoutation button
    $("#quote-pdf-button").click(function(e){
      //TODO: disable saving on basic plan
      
      //customer is not selected
      if($("#customer").val() == ""){
        window.xpress.modalAlert("alert","Please Select Customer",
          "Please select customer before creating quotation PDF", "failure");
        return;
      }
      
      //TODO only save if quotation has been changed
      //currently saves always
      //save quotation
      window.xpress.user.saveQuotation().then(
        //show pdf making options
        function(){
          $(pdf + " .quotation_from").val("estimate");
          $(pdf + " .quotation-table .table .data-row").remove();
          _this.addQuotationEstimate();
          $(pdf + " .add_estimate").hide();
          $(pdf + " .customer").hide();
          $(pdf + " .customer").val("");
          $(pdf + " .customer").removeAttr("data-id");
          $(pdf).show();
          $("#pdf_div").hide();
          $(pdf + " .quotation_from").off("change");
          $(pdf + " .quotation_from").change(function(){
            if($(this).val() == "estimate"){
              $(pdf + " .quotation-table .table .data-row").remove();
              _this.addQuotationEstimate();
              $(pdf + " .add_estimate").hide();
              $(pdf + " .customer").hide();
              $(pdf + " .quote_customer").val("");
              $(pdf + " .quote_customer").removeAttr("data-id");
              $(pdf + " .delete_estimate").hide();
            }
            else if($(this).val() == "estimates"){
              $(pdf + " .quotation-table .table .data-row").remove();
              $(pdf + " .add_estimate").show();
              var customer = $("#customer").val();
              var customer_id = $("#customer").attr("data-id");
              $(pdf + " .quote_customer").val(customer);
              $(pdf + " .quote_customer").attr("data-id",customer_id);
              $(pdf + " .customer").show();
              $(pdf + " .delete_estimate").show();
            }
          });
          $("#generate_quotation").off("click");
          $("#generate_quotation").click(function(){
            var q_from = $(pdf + " .quotation_from").val();
            if(q_from == 'estimate'){
              var customer_id = $("#customer").attr("data-id");
            }
            else if(q_from == 'estimates'){
              var customer_id = $(pdf + " .quote_customer").attr("data-id");
            }
            var est_rows = $(pdf + " .quotation-table .table .data-row");
            var estimates = [];
            try {
              est_rows.each(function(i,d){
                var est_no = $(d).find('.estimate_no').html();
                var qty = {
                  qty_a : $(d).find('input.quantity-a').is(":checked"),
                  qty_b : $(d).find('input.quantity-b').is(":checked"),
                  qty_c : $(d).find('input.quantity-c').is(":checked"),
                  qty_op: false
                };
                if( _this.module == "calendar" &&
                    $(d).find("input.overprint-quantity").is(":checked")){
                  qty.qty_op = true
                }
                if( !qty.qty_a && !qty.qty_b && !qty.qty_c && !qty.qty_op){
                  throw("invalid qty")
                }
                var estimate = {
                  est_no:est_no,
                  qty:qty
                };
                estimates.push(estimate);
              });
            }
            catch(e){
              window.xpress.modalAlert("alert","Please select Quantity",
                `Please select at least one Quantity for each Estimate`, "failure")
              return
            }
            if( q_from == "estimates" && estimates.length < 2 ){
              window.xpress.modalAlert("alert",
                "Please select Estimate to create Delivery Memo",
                `Must Select minimum of 2 or more estimates to generate 
                Delivery Memo.`, "failure")
              return
            }
            var quote_for = $(pdf + " select.quote_for").val();
            if( quote_for != "email" && quote_for != "print" ){
              window.xpress.modalAlert("alert","Please select Quote Type",
                "Please select Quote Type", "failure")
              return
            }
            var params = {
              action:'generate_quotation',
              pdf_type:'quotation',
              customer_id:customer_id,
              estimates:estimates,
              quote_for:quote_for
            };
            $.post("ajax_api.php",params,function(data){
              window.location.href = 'ajax_api.php?action=getPDF&pdf_type=quotation&id='+data.resp;
            });
            
          });
          $(pdf + " .add_estimate").off("click");
          $(pdf + " .add_estimate").click(function(){
            $("#quotationModal").show();
            var customer = $(pdf + " input.quote_customer").val();
            var customer_id = $(pdf + " input.quote_customer").attr("data-id");
            $("#quote_customer").val(customer);
            $("#quote_customer").attr("data-id",customer_id);
            $("#quote_customer").attr("disabled","disabled");
            $("#quotationModal .quote_buttons").hide();
            $("#quotationModal .add_estimate").show();
            $("#back_quote").show();
            getQuotes();
            $("#quotationModal .add_estimate").off("click");
            $("#quotationModal .add_estimate").click(function(){
              var estimate = $("#quotationModal .quote_highlight");
              if(estimate.length == 0){
                window.xpress.modalAlert("alert","Please select estimate to add",
                  "Please select estimate to add to quotation", "failure");
                return;
              }
              var estimate_no = $(estimate).find(".quote_number").html();
              var module = $(estimate).find(".quote_module").html();
              var job_ref = $(estimate).find(".quote_job_ref").html();
              _this.addQuotationEstimate(estimate_no, module, job_ref);
              window.xpress.modalAlert("alert","Estimate added",
                "Estimate added successfully.");
            });
          });
          $(pdf + " .delete_estimate").click(function(){
            $(pdf + " .quote_highlight").remove();
          });
        },
        //failed saving quotation
        function(){
          window.xpress.modalAlert("alert","Could not automatically save quotation",
            "Please save quotation manually and try again", "failure");
        }
      )
    });
  }
  
  enableInvoiceActions(pdf){
    var _this = this;
    $(pdf + " .consignee_invoice").off("change");
    $(pdf + " .consignee_invoice").change(function(){
      if($(this).val() == "other"){
        $(pdf + " .consignee_details input").val("");
        $(pdf + " .consignee_details textarea").val("");
        $(pdf + " .consignee_details").show();
      }
      else{
        $(pdf + " .consignee_details").hide();
      }
    });
    $(pdf + " .invoice_from").off("change");
    $(pdf + " .invoice_from").change(function(){
      var invoice_from = $(this).val();
      if(invoice_from == "standalone"){
        $(pdf + " .consignee_invoice").val("other").change();
        $(pdf + " .reciever_details input").val("");
        $(pdf + " .reciever_details textarea").val("");
        $(pdf + " .reciever_details").show();
        $(pdf + " .quotation-table").hide();
        $(pdf + " .add_estimate").hide();
        $(pdf + " .delete_estimate").hide();
        $(pdf + " .standalone-quotation-table").show();
        _this.addInvoiceBlank();
      }
      else if(invoice_from == "estimate"){
        $(pdf + " .reciever_details input").val("");
        $(pdf + " .reciever_details textarea").val("");
        $(pdf + " .reciever_details").hide();
        $(pdf + " .consignee_invoice").val("customer").change();
        $(pdf + " .quotation-table .table .data-row").remove();
        $(pdf + " .add_estimate").hide();
        $(pdf + " .delete_estimate").hide();
        $(pdf + " .customer").hide();
        $(pdf + " .quote_customer").val("");
        $(pdf + " .quote_customer").removeAttr("data-id");
        $(pdf + " .standalone-quotation-table").hide();
        $(pdf + " .quotation-table").show();
        if(pdf == "#PDF_Options_Invoice"){
          _this.addInvoiceEstimate();
        }
        else if(pdf == "#PDF_Options_Delivery"){
          _this.addDeliveryEstimate();
        }
      }
      else if(invoice_from == "estimates"){
        $(pdf + " .reciever_details input").val("");
        $(pdf + " .reciever_details textarea").val("");
        $(pdf + " .reciever_details").hide();
        $(pdf + " .consignee_invoice").val("customer").change();
        $(pdf + " .quotation-table .table .data-row").remove();
        $(pdf + " .add_estimate").show();
        $(pdf + " .delete_estimate").show();
        var customer = $("#customer").val();
        var customer_id = $("#customer").attr("data-id");
        $(pdf + " .quote_customer").val(customer);
        $(pdf + " .quote_customer").attr("data-id",customer_id);
        $(pdf + " .standalone-quotation-table").hide();
        $(pdf + " .quotation-table").show();
        $(pdf + " .customer").show();
      }
    });
    $(pdf + " .add_estimate").off("click");
    $(pdf + " .add_estimate").click(function(){
      $("#quotationModal").show();
      var customer = $(pdf + " input.quote_customer").val();
      var customer_id = $(pdf + " input.quote_customer").attr("data-id");
      $("#quote_customer").val(customer);
      $("#quote_customer").attr("data-id",customer_id);
      $("#quote_customer").attr("disabled","disabled");
      $("#quotationModal .quote_buttons").hide();
      $("#quotationModal .add_estimate").show();
      $("#back_quote").show();
      getQuotes();
      $("#quotationModal .add_estimate").off("click");
      $("#quotationModal .add_estimate").click(function(){
        var estimate = $("#quotationModal .quote_highlight");
        if(estimate.length == 0){
          window.xpress.modalAlert("alert","Please select estimate to add",
            "Please select estimate to add to invoice", "failure");
          return;
        }
        var estimate_no = $(estimate).find(".quote_number").html();
        var module = $(estimate).find(".quote_module").html();
        var job_ref = $(estimate).find(".quote_job_ref").html();
        if(pdf == "#PDF_Options_Invoice"){
          _this.addInvoiceEstimate(estimate_no, module, job_ref);
        }
        else if(pdf == "#PDF_Options_Delivery"){
          _this.addDeliveryEstimate(estimate_no, module, job_ref);
        }
        window.xpress.modalAlert("alert","Estimate added",
          "Estimate added successfully.");
      });
    });
    $(pdf + " .delete_estimate").click(function(){
      $(pdf + " .quote_highlight").remove();
    });
  }
  
  enableHSNCodeActions(){
    var _this = this;
    $("#delete_hsn_button").click(function(){
      var hsn = $("#HSN_Codes .quote_highlight")
      if(hsn.length == 0){
        window.xpress.modalAlert("alert", "Select HSN Code",
          "Please select HSN Code first","failure");
        return;
      }
      var hsn_code = $(hsn).find(".hsn").html();
      var alert_text = "Do you really mant to delete HSN Code " + hsn_code + "?";
      window.xpress.modalAlert("confirm", "Really Delete HSN Code?",
        alert_text,"failure", 
        ['Yes, Delete HSN Code',
          "No, Do Not Delete"])
        .then(function(){
          var hsn_id = $(hsn).find(".data_id").attr("data_id");;
          //send the delete request
          $.post("ajax_api.php",{action:"delete_hsn", hsn_id:hsn_id},
            function(data){
              _this.getHSNCodes();
          });
        });
    });
    $("#edit_hsn_button").click(function(){
      var hsn = $("#HSN_Codes .quote_highlight")
      if(hsn.length == 0){
        window.xpress.modalAlert("alert", "Select HSN Code",
          "Please select HSN Code first","failure");
        return;
      }
      var hsn_code = $(hsn).find(".hsn").html();
      var hsn_id = $(hsn).find(".data_id").attr("data_id");
      var hsn_name = $(hsn).find(".name").html();
      var hsn_desc = $(hsn).find(".description").html();
      var hsn_cgst = $(hsn).find(".cgst").html();
      var hsn_sgst = $(hsn).find(".sgst").html();
      var hsn_igst = $(hsn).find(".igst").html();
      var hsn_s_cgst = $(hsn).find(".s_cgst").html();
      var hsn_s_sgst = $(hsn).find(".s_sgst").html();
      var hsn_s_igst = $(hsn).find(".s_igst").html();
      var hsn_s_cgst_start = $(hsn).find(".hsn_s_cgst_start").html();
      var hsn_s_sgst_start = $(hsn).find(".hsn_s_sgst_start").html();
      var hsn_s_igst_start = $(hsn).find(".hsn_s_igst_start").html();
      var hsn_s_cgst_end = $(hsn).find(".hsn_s_cgst_end").html();
      var hsn_s_sgst_end = $(hsn).find(".hsn_s_sgst_end").html();
      var hsn_s_igst_end = $(hsn).find(".hsn_s_igst_end").html();
      $("#editHSNCode .hsn_code").val(hsn_code);
      $("#editHSNCode .hsn_id").val(hsn_id);
      $("#editHSNCode .hsn_name").val(hsn_name);
      $("#editHSNCode .hsn_desc").val(hsn_desc);
      $("#editHSNCode .hsn_cgst").val(hsn_cgst);
      $("#editHSNCode .hsn_sgst").val(hsn_sgst);
      $("#editHSNCode .hsn_igst").val(hsn_igst);
      $("#editHSNCode .hsn_s_cgst").val(hsn_s_cgst);
      $("#editHSNCode .hsn_s_sgst").val(hsn_s_sgst);
      $("#editHSNCode .hsn_s_igst").val(hsn_s_igst);
      $("#editHSNCode .hsn_s_cgst_start").val(hsn_s_cgst_start);
      $("#editHSNCode .hsn_s_sgst_start").val(hsn_s_sgst_start);
      $("#editHSNCode .hsn_s_igst_start").val(hsn_s_igst_start);
      $("#editHSNCode .hsn_s_cgst_end").val(hsn_s_cgst_end);
      $("#editHSNCode .hsn_s_sgst_end").val(hsn_s_sgst_end);
      $("#editHSNCode .hsn_s_igst_end").val(hsn_s_igst_end);
      $("#editHSNCode").show();
    });
    $("#new_hsn_button").click(function(e){
      $("#editHSNCode input").val("");
      $("#editHSNCode textarea").val("");
      $("#editHSNCode").show();
    });
    $("#save_hsn_button").click(function(e){
      var hsn = $("#editHSNCode .modal-body");
      var hsn_code = $(hsn).find(".hsn_code").val();
      var hsn_id   = $(hsn).find(".hsn_id").val();
      var hsn_name = $(hsn).find(".hsn_name").val();
      var hsn_desc = $(hsn).find(".hsn_desc").val();
      var hsn_cgst = $(hsn).find(".hsn_cgst").val();
      var hsn_sgst = $(hsn).find(".hsn_sgst").val();
      var hsn_igst = $(hsn).find(".hsn_igst").val();
      var hsn_s_cgst = $(hsn).find(".hsn_s_cgst").val();
      var hsn_s_sgst = $(hsn).find(".hsn_s_sgst").val();
      var hsn_s_igst = $(hsn).find(".hsn_s_igst").val();
      var hsn_s_cgst_start = $(hsn).find(".hsn_s_cgst_start").val();
      var hsn_s_sgst_start = $(hsn).find(".hsn_s_sgst_start").val();
      var hsn_s_igst_start = $(hsn).find(".hsn_s_igst_start").val();
      var hsn_s_cgst_end = $(hsn).find(".hsn_s_cgst_end").val();
      var hsn_s_sgst_end = $(hsn).find(".hsn_s_sgst_end").val();
      var hsn_s_igst_end = $(hsn).find(".hsn_s_igst_end").val();
      if(hsn_id == ""){
        var action = "add_hsn";
      }
      else{
        var action = "update_hsn";
      }
      var params = {
        action,
        hsn_code,
        hsn_id,
        hsn_name,
        hsn_desc,
        hsn_cgst,
        hsn_sgst,
        hsn_igst,
        hsn_s_cgst,
        hsn_s_sgst,
        hsn_s_igst,
        hsn_s_cgst_start,
        hsn_s_sgst_start,
        hsn_s_igst_start,
        hsn_s_cgst_end,
        hsn_s_sgst_end,
        hsn_s_igst_end
      };
      $.post("ajax_api.php",params ,function(data){
        _this.getHSNCodes();
      }); 
    });
  }
  
  getHSNCodes(){
    var _this = this;
    $.post("ajax_api.php", {action:"get_hsn_codes"}, function(data){
      _this.hsn_codes = data.resp;
      window.xpress.loadData($("#HSN_Codes_table"),data.resp);
      $("#HSN_Codes_table .data-row").click(function(e){
        $("#HSN_Codes_table .data-row").removeClass("quote_highlight");
        $(this).addClass("quote_highlight");
      });
    });
  }
  
  /*
   * Runs the calculations using the cuts library and generates svg
   *
   * Runs the calculations using the cuts library and generates svg
   */
  calculateCuts(inputs, svg_element, cuts_element, wastage_element, type = "general"){
    let _this = this
    let cuts = new CUTS
    let r_cuts = new CUTS
    cuts.setMachineSize(inputs.machine_size_w, inputs.machine_size_h)
    r_cuts.setMachineSize(inputs.machine_size_w, inputs.machine_size_h)
    if(type == "general"){
      cuts.setClosedJobSize(inputs.closed_job_size_w, inputs.closed_job_size_h)
      r_cuts.setClosedJobSize(inputs.closed_job_size_h, inputs.closed_job_size_w)
    }
    else if(type== "title"){
      cuts.setClosedJobSize(inputs.open_job_size_w, inputs.open_job_size_h)
      cuts.create_spine = true
      r_cuts.setClosedJobSize(inputs.open_job_size_h, inputs.open_job_size_w)
      r_cuts.create_spine = true
    }
    cuts.setOpenJobSize(inputs.open_job_size_w, inputs.open_job_size_h)
    r_cuts.setOpenJobSize(inputs.open_job_size_h, inputs.open_job_size_w)
    cuts.setParentSize(inputs.parent_size_w, inputs.parent_size_h)
    r_cuts.setParentSize(inputs.parent_size_w, inputs.parent_size_h)
    cuts.generateAllCuts()
    r_cuts.generateAllCuts()
    //check pieces are valid
    //for book inner pages (general) need to be power of two but title does not
    //need to be
    //for multi sheet it needs to be either 2 or 4 or 8 piecess
    
    //define pieces for easy access
    let pieces = cuts.cuts.cut.cut.pieces
    let r_pieces = r_cuts.cuts.cut.cut.pieces
    
    if( type == "title" ){
      pieces = pieces * 2
      r_pieces = r_pieces * 2
    }
    //assume both cuts are valid
    let is_valid = true
    let r_is_valid = true
    
    if( _this.module == "book" ){
      //bookwork inner pages is valid if it is power of 2
      is_valid = isPowerOfTwo(pieces)
      r_is_valid = isPowerOfTwo(r_pieces)
    }
    else if( _this.module == "multi_sheet" ){
      //multi sheet
      //it is valid if pieces is 2 or 4 or 8
      is_valid = pieces == 2 || pieces == 4 || pieces == 8
      r_is_valid = r_pieces == 2 || r_pieces == 4 || r_pieces == 8
    }

    //check that it is not 0, as it would have been errornously detected as
    //valid if it was 0
    if( pieces == 0 ){
      is_valid = false
    }
    if( r_pieces == 0 ){
      r_is_valid = false
    }
    if( !is_valid && !r_is_valid ){
      window.xpress.modalAlert("alert","Invalid Paper Size",
        `The Paper Size is invalid. Please Check the Paper Size`, "failure");
      return
    }
    const wstg = cuts.cuts.cut.cut.wastage
    const r_wstg = r_cuts.cuts.cut.cut.wastage
    if( is_valid && r_is_valid ){
      if( wstg <= r_wstg ){
        var generated_cut = cuts.cuts.cut.cut
        var job_size = cuts.cuts.cut.closed_job_size
        cuts.generateSvg(svg_element, generated_cut, job_size)
        $(cuts_element).html(pieces)
        $(".selected_job_size_wstg").val(wstg)
        var wastage = (wstg*100).toFixed(2)+"%"
        $(wastage_element).html(wastage)
        return(cuts)
      }
      else{
        var generated_cut = r_cuts.cuts.cut.cut
        var job_size = r_cuts.cuts.cut.closed_job_size
        r_cuts.generateSvg(svg_element, generated_cut, job_size)
        $(cuts_element).html(r_pieces)
        $(".selected_job_size_wstg").val(r_wstg)
        var wastage = (r_wstg*100).toFixed(2)+"%"
        $(wastage_element).html(wastage)
        return(cuts)
      }
    }
    else if( is_valid ){
      var generated_cut = cuts.cuts.cut.cut
      var job_size = cuts.cuts.cut.closed_job_size
      cuts.generateSvg(svg_element, generated_cut, job_size)
      $(cuts_element).html(pieces)
      $(".selected_job_size_wstg").val(wstg)
      var wastage = (wstg*100).toFixed(2)+"%"
      $(wastage_element).html(wastage)
      return(cuts)
    }
    else if( r_is_valid ){
      var generated_cut = r_cuts.cuts.cut.cut
      var job_size = r_cuts.cuts.cut.closed_job_size
      r_cuts.generateSvg(svg_element, generated_cut, job_size)
      $(cuts_element).html(r_pieces)
      $(".selected_job_size_wstg").val(r_wstg)
      var wastage = (r_wstg*100).toFixed(2)+"%"
      $(wastage_element).html(wastage)
      return(cuts)
    }
  }
  
  generateCuts(){
    let _this = this
    _this.generateSvgCuts()
    let parent_width = $($("#inputs_rows tr")[0]).find(".width").val()
    parent_width = padStart( parent_width, 5, '0', 2)
    $(".inner_pgs.job_size_cuts .parent_w").html( parent_width )
    
    let parent_height = $($("#inputs_rows tr")[0]).find(".height").val()
    parent_height = padStart( parent_height, 5, '0', 2)
    $(".inner_pgs.job_size_cuts .parent_h").html( parent_height )
    
    let machine_width = $(".job_size_inputs .machine_size_w").val()
    machine_width = padStart( machine_width, 5, '0', 2)
    $(".inner_pgs.job_size_cuts .machine_w").html( machine_width )
    
    let machine_height = $(".job_size_inputs .machine_size_h").val()
    machine_height = padStart( machine_height, 5, '0', 2)
    $(".inner_pgs.job_size_cuts .machine_h").html( machine_height )
    
    let job_width = $(".job_size_inputs .closed_job_size_w").val()
    job_width = padStart( job_width, 5, '0', 2)
    $(".inner_pgs.job_size_cuts .job_w").html( job_width )
    
    let job_height = $(".job_size_inputs .closed_job_size_h").val()
    job_height = padStart( job_height, 5, '0', 2)
    $(".inner_pgs.job_size_cuts .job_h").html( job_height )
    
    if(_this.module == "book"){
      let title_parent_width = $($("#book_title tr")[0]).find(".width").val()
      title_parent_width = padStart( title_parent_width, 5, '0', 2)
      $(".title_pgs.job_size_cuts .parent_w").html( title_parent_width )
      
      let title_parent_height = $($("#book_title tr")[0]).find(".height").val()
      title_parent_height = padStart( title_parent_height, 5, '0', 2)
      $(".title_pgs.job_size_cuts .parent_h").html( title_parent_height )
      
      let title_machine_width = $(".job_size_inputs .title_machine_size_w").val()
      title_machine_width = padStart( title_machine_width, 5, '0', 2)
      $(".title_pgs.job_size_cuts .machine_w").html( title_machine_width )
      
      let title_machine_height = $(".job_size_inputs .title_machine_size_h").val()
      title_machine_height = padStart( title_machine_height, 5, '0', 2)
      $(".title_pgs.job_size_cuts .machine_h").html( title_machine_height )
      
      let title_job_width = $(".job_size_inputs .open_job_size_w").val()
      title_job_width = padStart( title_job_width, 5, '0', 2)
      $(".title_pgs.job_size_cuts .job_w").html( title_job_width )
      
      let title_job_height = $(".job_size_inputs .open_job_size_h").val()
      title_job_height = padStart( title_job_height, 5, '0', 2)
      $(".title_pgs.job_size_cuts .job_h").html( title_job_height )
    }
  }
  
  /*
   * Enables Job size calculations 
   * 
   * Enables Job size calculations 
   */
  enableJobSize(){
    var _this = this;
    $("#cuts_preview").click(function(e){
      _this.generateCuts()
      $("#jobSizeModal").show();
    });
    $(".job_size_inputs input").change(function(e){
      //get the class for the changed input
      var css_class = $(this).attr("class");
      //get the value in inches
      var inch = $(this).val();
      //set it to 2 digits with a leading 0 and 2 decimal places
      inch = (Math.round(inch * 100) / 100).toFixed(2).padStart(5,'0');
      //replace the input with the formatted input
      $("." + css_class ).val(inch);
      //get all the inputs
      var job_size_inputs ={
        closed_job_size_w : $(".job_size_inputs .closed_job_size_w").val(),
        closed_job_size_h : $(".job_size_inputs .closed_job_size_h").val(),
        machine_size_w    : $(".job_size_inputs .machine_size_w").val(),
        machine_size_h    : $(".job_size_inputs .machine_size_h").val()
      };
      //check if required inputs are valid
      if( parseFloat(job_size_inputs.closed_job_size_w)  == 0  ||
          isNaN(parseFloat(job_size_inputs.closed_job_size_w)) ||
          parseFloat(job_size_inputs.closed_job_size_h)  == 0  ||
          isNaN(parseFloat(job_size_inputs.closed_job_size_h)) ){
        return;
      }
      //calculate open size  from closed size given
      if( css_class == "closed_job_size_w" || css_class == "closed_job_size_h" ){
        //if it is book then calculate the book size
        if( _this.module == "book" ){
          var closed_size = {
            width: job_size_inputs.closed_job_size_w,
            height: job_size_inputs.closed_job_size_h
          }
          var book_cover = window.binding.calculateBookCover(closed_size);
          $(".open_job_size_w").val(book_cover.width);
          $(".open_job_size_h").val(book_cover.height);
        }
        else{
          //set closed size to be same as open size
          $(".open_job_size_w").val(job_size_inputs.closed_job_size_w);
          $(".open_job_size_h").val(job_size_inputs.closed_job_size_h);
        }
      }
      if(!$("#jobSizeModal").hasClass("hide")){
        $("#cuts_preview").click()
      }
      else{
        _this.generateCuts()
      }
    });
  }
  
  generateSvgCuts(){
    let _this = this
    const parent_size_w = $($("#inputs_rows tr")[0]).find(".width").val() 
    const parent_size_h = $($("#inputs_rows tr")[0]).find(".height").val() 
    var job_size_inputs ={
      closed_job_size_w : $(".job_size_inputs .closed_job_size_w").val(),
      closed_job_size_h : $(".job_size_inputs .closed_job_size_h").val(),
      parent_size_w     : parent_size_w,
      parent_size_h     : parent_size_h,
      machine_size_w    : $(".job_size_inputs .machine_size_w").val(),
      machine_size_h    : $(".job_size_inputs .machine_size_h").val()
    };
    if( parseFloat(job_size_inputs.closed_job_size_w)  == 0  ||
        isNaN(parseFloat(job_size_inputs.closed_job_size_w)) ||
        parseFloat(job_size_inputs.closed_job_size_h)  == 0  ||
        isNaN(parseFloat(job_size_inputs.closed_job_size_h)) ||
        parseFloat(job_size_inputs.parent_size_h)  == 0      ||
        isNaN(parseFloat(job_size_inputs.parent_size_h))     ){
      return;
    }
    //set the open job size details in the job_size_inputs object
    job_size_inputs.open_job_size_w = $(".job_size_inputs .open_job_size_w").val();
    job_size_inputs.open_job_size_h  = $(".job_size_inputs .open_job_size_h").val();
    //check if parent size has been set
    if( parseFloat(job_size_inputs.parent_size_w)  == 0  ||
        isNaN(parseFloat(job_size_inputs.parent_size_w)) ||
        parseFloat(job_size_inputs.parent_size_h)  == 0  ||
        isNaN(parseFloat(job_size_inputs.parent_size_h)) ){
      return;
    }
    var temp = "";
    if(job_size_inputs.parent_size_w > job_size_inputs.parent_size_h){
      temp = job_size_inputs.parent_size_w;
      job_size_inputs.parent_size_w = job_size_inputs.parent_size_h;
      job_size_inputs.parent_size_h = temp;
    }
    var cuts = _this.calculateCuts(job_size_inputs, 
                  "#job_size_svg",
                  $("#job_size_svg").parent().find(".cuts"),
                  $("#job_size_svg").parent().find(".wastage"));
    const wstg = cuts.cuts.cut.cut.wastage
    window.calc.calculateAll();
    if(window.module == "book"){
      var title_job_size_inputs = JSON.parse(JSON.stringify(job_size_inputs));
      title_job_size_inputs.parent_size_w = $($("#book_title tr")[0]).find(".width").val() 
      title_job_size_inputs.parent_size_h = $($("#book_title tr")[0]).find(".height").val() 
      title_job_size_inputs.machine_size_w = $(".job_size_inputs .title_machine_size_w").val()
      title_job_size_inputs.machine_size_h = $(".job_size_inputs .title_machine_size_h").val()
      if( parseFloat(title_job_size_inputs.parent_size_w)  == 0  ||
          isNaN(parseFloat(title_job_size_inputs.parent_size_w)) ||
          parseFloat(title_job_size_inputs.parent_size_h)  == 0  ||
          isNaN(parseFloat(title_job_size_inputs.parent_size_h)) ){
        return;
      }
      _this.calculateCuts(title_job_size_inputs, 
                    "#title_svg",
                    $("#title_svg").parent().find(".cuts"),
                    $("#title_svg").parent().find(".wastage"),
                    "title");
    }
  }


/*
 * Enables dragging the modals to move them
 *
 * Enables dragging the modals to move them
 */
  enableModalMove(){
    $(".modal").on("onshow", function(e){
      var modal_content = $(this).find(".modal-content")[0];
      $(modal_content).removeAttr("style");
    });
    $(".modal-content").ondragstart(function(e, modal){
      var offset = $(modal).offset();
      var start = {x : e.screenX, y : e.screenY };
      $(modal).ondragend(function(e,modal){
        var end = {x : e.screenX, y : e.screenY };
        offset.left = end.x - start.x + offset.left;
        offset.top = end.y - start.y + offset.top;
        $(modal).offset(offset);
      });
    });
  }
  
/*
 * Function setCustomCalendarInputs
 *
 * Hides quantity B and C for calendar
 * 
 * Hides quantity B and C for calendar and adds calendar class to quantity a
 * to set it visually
 */
  setCustomCalendarInputs(){
    if(this.module == "calendar"){
      $(".quantity_a, #quantity_c, .quantity_c, #quantity_b, .quantity_b").hide()
      $("#quantity_a, .quantity_a").addClass("calendar")
      $("#overprint_qty, .overprint_qty").show()
      $("#overprint_qty").change(function(){
        const op_qty = $(this).val()
        $("#inputs_rows .over_print_qty input").val(op_qty)
        $("#inputs_rows .over_print_qty input").change()
      })
      $(".pdf_qty_row").hide()
      $("#PDF_Options_Quotation .calendar").show()
      $("#PDF_Options_Quotation .quotation-table .table-header .quantity-a")
        .html("Blank Print Qty")
      $("#PDF_Options_Quotation .quantity-b").hide()
      $("#PDF_Options_Quotation .quantity-c").hide()
      $($("#PDF_Options_Quotation select.quotation_from option")[1]).hide()
      $("#paperRequirementModal .qty_b").hide()
      $("#paperRequirementModal .qty_c").hide()
      $("#paperRequirementModal .wstg_gain_b").hide()
      $("#paperRequirementModal .wstg_gain_c").hide()
      $($("#PDF_Options_Delivery select.invoice_from option")[1]).hide()
      $($("#PDF_Options_Delivery select.invoice_from option")[2]).hide()
      $($("#PDF_Options_Delivery .quotation-table select.quantity option")[1])
        .text("Blank Print Qty")
      $($("#PDF_Options_Delivery .quotation-table select.quantity option")[2]).hide()
      $($("#PDF_Options_Delivery .quotation-table select.quantity option")[3]).hide()
      $($("#PDF_Options_Delivery .quotation-table select.quantity option")[4]).show()
      
      $($("#PDF_Options_Invoice select.invoice_from option")[1]).hide()
      $($("#PDF_Options_Invoice select.invoice_from option")[2]).hide()
      $($("#PDF_Options_Invoice .quotation-table select.quantity option")[1])
        .text("Blank Print Qty")
      $($("#PDF_Options_Invoice .quotation-table select.quantity option")[2]).hide()
      $($("#PDF_Options_Invoice .quotation-table select.quantity option")[3]).hide()
      $($("#PDF_Options_Invoice .quotation-table select.quantity option")[4]).show()
    }
  }


/*
 * Function enableActions
 * 
 * Enables user interaction actions
 *
 * Enables user interaction actions
 */
  enableActions(){
    this.enableNone();
    this.enableAddRemoveInputRows();
    this.enableTabs();
    this.enableExtraPgsAlert();
    this.enableTotalPgsChangeAlert();
    this.enableBindingSelect();
    this.enableSavePreferences();
  }

  /*
   * Changes Staple Binding
   * 
   * Changes Staple Binding Cost Per Book/Set for Multi-Sheet on change of the
   * selection of Side, Saddle or Loop
   */
  enableBindingSelect(){
    var _this = this;
    //on change of the selection
    $(".staple_select").change(function(e){
      
      //get current selected value
      var staple_select = $(this).val();
      
      //if selection is empty clear the value and return
      if(staple_select == ""){
        $(".inp_staple").val("");
        return;
      }
      
      //get the value from preferences
      var staple_each = $("#" + staple_select + "_each").val();
      
      //set new value
      $(".inp_staple").val(staple_each);
      
      //trigger change to run the calculations
      $(".inp_staple").change();
    });
  }

/*
 * Function enableNone
 * 
 * Enables the changes required when select is None
 *
 * Enables the changes required when select is None
 */
  enableNone(){
    var _this = this;
    //changes for dtp
    $(".dtp_select").change(function(e){
      _this.noneChanged(this);
    });
    //changes for over printing (calendar only)
    $(".over_print_dtp_select").change(function(e){
      _this.noneChanged(this);
    });
    //changes for Binding Type and Cost per Book (Stationery only)
    $(".binding_type select").change(function(e){
      _this.noneChanged(this);
    });
    //changes for wastage of paper
    $(".wastage select").change(function(e){
      _this.noneChanged(this);
    });
  }

/*
 * Function noneChanged
 * 
 * Adds red X for none
 *
 * Adds red X to the input next to the None input and disables it
 * this function is for those selects that require X only on the input next to
 * it.
 *
 * @param _this the action element i.e. the this that is provided when the
 * change happens
 */
  noneChanged(_this){
    if($(_this).val()=='None'){
      $(_this).next("input").attr("readonly",true);
      //put in the x 
      $(_this).next("input").val("x");
      //add class to make the x red
      $(_this).next("input").addClass("js-disabled");
    }
    else{
      if($(_this).next("input").val() == "x"){
        //value was x before but not anymore so undo previous changes 
        $(_this).next("input").val("");
        $(_this).next("input").attr("readonly",false);
        $(_this).next("input").removeClass("js-disabled");
      }
    }
  }

/*
 * Function AddRemoveInputRows
 *
 * Adds and removes rows
 *
 * Adds and removes rows
 */
  AddRemoveInputRows(){
    var _this = this;
    
    //delete a row
    $(".delete-row").click(function(e){
      //remove the row
      $(_this.add_row_clicked).remove();
      //do the changes from removing row
      _this.rows_changed();
    });
    
    //adding a blank row
    $(".add-blank-row").click(function(e){
      //get html of the sample row 
      var html = $("#sample_row").html();
      //insert it below (after) the row that was clicked
      $(html).insertAfter($(_this.add_row_clicked));
      //run changes from adding row
      _this.rows_changed();
      
      //enable recalculation on change of any of the inputs in the new row
      $(_this.add_row_clicked).next("tr").find('input').change(function(e){
        window.calc.calculateAll();
      });
      //enable recalculation on change of any of the selects in the new row
      $(_this.add_row_clicked).next("tr").find('select').change(function(e){
        window.calc.calculateAll();
      });
    });
    
    //duplicate row clicked
    $(".duplicate-row").click(function(e){
      //get the html from the sample row
      var html = $("#sample_row").html();
      //insert it below (after) the row that was clicked
      $(html).insertAfter($(_this.add_row_clicked));
      
      //copy all values from select boxes to the new row
      $($(_this.add_row_clicked).find("select")).each(function(i,d){
        var css_class = $(d).attr("class");
        var value = $(d).val();
        css_class = css_class.replace("screen_default","").trim();
        $(_this.add_row_clicked).next("tr").find('.'+css_class).val(value);
      });
      
      //copy all values from the inputs to the new row
      $($(_this.add_row_clicked).find("input")).each(function(i,d){
        var css_class = $(d).attr("class");
        var value = $(d).val();
        css_class = css_class.replace("screen_default","").trim();
        $(_this.add_row_clicked).next("tr").find('.'+css_class).val(value);
      });
      
      //run changes from adding row
      _this.rows_changed();
      
      //if multisheet thun check if we need to duplicate process cost
      if(_this.module == "multi_sheet"){
        //get the process data as a string
        var process = $(_this.add_row_clicked).find('.process_cost').attr("process");
        var json_process = JSON.parse(process);
        
        //check if any process cost has been defined
        //it has been defined if any of the checkboxes have been selected
        //assume no process has been defined
        var process_defined = false;
        
        //check if any of the post process checkbox has been checked
        //a checkbox is checked if for any of the process objects checked is
        //true, using array.some here shortcircuts when the first true is
        //returned and returns true. If none are checked process_defined remains
        //false
        process_defined = json_process.some(function(d){
          return(d.checked);
        });
        
        if( process_defined == true)
        {
          //process cost is defined
          //show dialoge box to ask if process data should be copied
          $("#duplicatePostProcess").show();
          
          $(".duplicate-yes").click(function(e){
            //yes clicked
            //copy process data to new row
            $(_this.add_row_clicked).next("tr").find('.process_cost')
              .attr("process",process);
            
            //run all the calculations
            window.calc.calculateAll();
            //hide the dialouge box
            $("#duplicatePostProcess").hide();
          });
          
          $(".duplicate-no").click(function(e){
            //no clicked
            //hide the dialouge box
            $("#duplicatePostProcess").hide();
          });
        }
      }
      
      //enable recalculation on change of any of the inputs in the new row
      $(_this.add_row_clicked).next("tr").find('input').change(function(e){
        window.calc.calculateAll();
      });
      //enable recalculation on change of any of the selects in the new row
      $(_this.add_row_clicked).next("tr").find('select').change(function(e){
        window.calc.calculateAll();
      });
    });
  }

  enableProcessCost(){
    $("#inputsModal .rate_per select").attr("disabled","disabled");
    $("#inputsModal .rate input").attr("disabled","disabled");
    $("#inputsModal .amount input").attr("disabled","disabled");
    if(this.module == "book"){
      $(".staple-cost-saddle").hide();
      $(".staple-cost-loop").hide();
      $(".stripping").hide();
      $(".glueing").hide();
      $(".folding-hand-mc").hide();
      $(".met-pet").hide();
      $(".blister").hide();
      $(".blanket-uv, .zinc-block").css("padding-left","3.15rem")
      $(".module-name").html("Book-Magazine");
    }
    else if(this.module == "multi_sheet"){
      $(".creasing-die-punch .process").html("Punching (For Creasing/Perfo./Window)");
      $(".creasing-scoring .process").html("Scoring (For Creasing/Perfo.)");
      $(".blanket-uv, .zinc-block").css("padding-left","2.8rem")
      $(".stripping").hide();
      $(".glueing").hide();
      $(".met-pet").hide();
      $(".blister").hide();
      $(".module-name").html("Multi-Sheet");
    }
    else if(this.module == "single_sheet"){
      $(".creasing-die-punch .process").html("Punching (For Creasing/Perfo./Window)");
      $(".creasing-scoring .process").html("Scoring (For Creasing/Perfo.)");
      $(".blanket-uv, .zinc-block").css("padding-left","3.15rem")
      $(".staple-cost-saddle").hide();
      $(".staple-cost-loop").hide();
      $(".stripping").hide();
      $(".glueing").hide();
      $(".folding-hand-mc").hide();
      $(".pgs_to_process").hide();
      $(".pgs_in_sheet").hide();
      $(".met-pet").hide();
      $(".blister").hide();
      $(".rate").addClass("single_box");
      $(".direct-cost .rate").removeClass("single_box");
      $(".rate_per").addClass("single_box");
      $(".module-name").html("Single-Sheet");
      $("#inputsModal .numbing").show()
    }
    else if(this.module == "box"){
      $(".creasing-die-punch .process").html("Punching Charges");
      $(".job-work-sample .creasing-die-punch .name").html("Punching")
      $(".creasing-scoring").hide();
      $(".folding-hand-mc").hide();
      $(".staple-cost-saddle").hide();
      $(".staple-cost-loop").hide();
      $(".pgs_to_process").hide();
      $(".pgs_in_sheet").hide();
      $(".rate").addClass("single_box");
      $(".rate_per").addClass("single_box");
      $(".direct-cost .rate").removeClass("single_box");
      $(".module-name").html("Box Packaging");
    }
    $("#inputsModal .select input").change(function(e){
      var changed_row = $(this).parent().parent();
      var select = $(changed_row).children(".rate_per").children("select");
      var rate_input = $(changed_row).children(".rate").children("input");
      var pgs_to_process = $(changed_row).children(".pgs_to_process").children("input");
      var pgs_in_sheet = $(changed_row).children(".pgs_in_sheet").children("input");
      var row_class = $(changed_row).attr("class").replace("row","").trim();
      row_class = row_class.replace("div","").trim();
      if($(this).is(":checked")){
        $(select).removeAttr("disabled");
        $(rate_input).removeAttr("disabled");
        $(pgs_to_process).removeAttr("disabled");
        $(pgs_in_sheet).removeAttr("disabled");
        $(pgs_to_process).addClass("animate-pgs_to_process");
        $(pgs_in_sheet).addClass("animate-pgs_to_process");
        var value = $($(select).children("option")[1]).val();
      }
      else{
        $(select).attr("disabled","disabled");
        $(rate_input).attr("disabled","disabled");
        $(pgs_to_process).attr("disabled","disabled");
        $(pgs_in_sheet).attr("disabled","disabled");
        $(pgs_to_process).val("");
        $(pgs_in_sheet).val("");
        $(pgs_to_process).removeClass("animate-pgs_to_process");
        $(pgs_in_sheet).removeClass("animate-pgs_to_process");
        var value = $($(select).children("option")[0]).val();
      }
      $(this).parent().parent().children(".rate").children("input").val("");
      if(row_class == "punch-die" || row_class == "blanket-uv" || row_class == "zinc-block"){
        window.calc.calculatePostProcessCost(changed_row);
      }
      else{
        $(select).val(value);
        $(select).change();
      }
    });
    $("#inputsModal .rate_per select").change(function(e){
      var changed_row = $(this).parent().parent();
      var rate_input = $(changed_row).children(".rate").children("input");
      var row_class = $(changed_row).attr("class").replace("row","").trim();
      var value = $(this).val();
      var rate = "";
      var min = "";
      if(value == "100 Sq Inches"){
        rate = $("#"+row_class+"_100").val();
      }
      else if(value == "1000"){
        rate = $("#"+row_class+"_1000").val();
      }
      else if(value == "Set"){
        rate = $("#"+row_class+"_each").val();
      }
      else if(value == "" || value == null){
        $(changed_row).children(".amount").children("input").val("");
        $(changed_row).children(".rate").children("input").val("");
      }
      else if(value == "Lot"){
        var msg = 'Please apply cost in column \'Rate\',  which will reflect '
          + 'in Cell \'Qty A\', whereas the cost calculation of \'Qty B\' and '
          + '\'Qty C\' will be in proportion to \'Rate\' and quantity furnished'
          + 'in respective Cells.';
        alert(msg);
      }
      $(rate_input).val(rate);
      window.calc.calculatePostProcessCost(changed_row);
    });
    $("#inputsModal .rate input").change(function(e){
      var changed_row = $(this).parent().parent();
      window.calc.calculatePostProcessCost(changed_row);
    });
    $("#inputsModal .pgs_to_process input").change(function(e){
      $(this).removeClass("animate-pgs_to_process");
      var changed_row = $(this).parent().parent();
      window.calc.calculatePostProcessCost(changed_row);
    });
    $("#inputsModal .pgs_in_sheet input").change(function(e){
      $(this).removeClass("animate-pgs_to_process");
      var changed_row = $(this).parent().parent();
      window.calc.calculatePostProcessCost(changed_row);
    });
  }

/*
 * Function enableAddRemoveInputs
 *
 * Enables adding and removing of input rows
 *
 * Enables adding and removing of input rows using #add_row
 */
  enableAddRemoveInputRows(){
    var _this = this;
    const WIDTH = 200;
    $("body").click(function(e){
      $("#add-row-dropdown").hide();
    });
    $(".add-row-arrow").click(function(e){
      if( $("#quote_locked").length == 1 ){
        window.xpress.modalAlert("alert","Quotation is locked",
          `This quotation has been locked, and cannot be edited. 
           To edit this quotation please copy it first.`, "failure");
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      $(".duplicate-row").show();
      $(".delete-row").show();
      _this.add_row_clicked = $(this).parent().parent();
      if(_this.module == "stationery"){
        var row_num = $($(_this.add_row_clicked).find(".row-number")[0]).html();
        $(".duplicate-row").hide();
        if(row_num == 1){
          $(".delete-row").hide();
        }
      }
      else if(_this.module == "multi_sheet"){
        var row_num = $($(_this.add_row_clicked).find(".row-number")[0]).html();
        if(row_num == 1){
          $(".delete-row").hide();
        }
      }
      else if(_this.module == "book"){
        var rows = $(_this.add_row_clicked).parent().children("tr").length;
        if(rows == 1){
          $(".delete-row").hide();
        }
      }
      $("#add-row-dropdown").show();
      var height = $("#add-row-dropdown").height()
      var offset_top = height + $(this).offset().top+$(this).parent().height();
      $("#add-row-dropdown").css("top",offset_top);
      var left = $(this).offset().left + $(this).width();
      $("#add-row-dropdown").css("left",left);
    });
  }

/*
 * Function enableTabs
 *
 * Enables tabs for tabbed content
 * 
 * Enables tabs for tabbed content
 */
  enableTabs(){
    $(".tab").click(function(e){
      //get the id of the target tab-body 
      var target = $(this).attr("data-target")
      
      //show paper library and close Libraries Modal return if user clicks on 
      //paper library
      if(target == 'selectPaperModal'){
        //hide the library Modal
        $("#libraryModal").hide()
        //hide the Apply Paper to Job button
        $("#choosePaper").hide()
        //show Paper Library
        $("#" + target).show()
        return
      }

      //remove active class from all tabs
      $(this).parent().children(".tab").removeClass("active")
      //add active class to this tab
      $(this).addClass("active")
      //hide all tab-boy
      $(this).parent().parent().children(".tab-body").hide()
      //show the target tab-body
      $("#" + target).show()
    })
  }

  /*
   * enable Selecting paper 
   * 
   * enable Selecting paper by Clicking on Paper input
   */
  enableSelectPaper(){
    $(".selectPaper").click(function(e){
      //show the Apply Paper to Job Button as it may have been hidden before
      $("#choosePaper").show()
      //remove paper_to_select class from any that was previously added
      $(".paper_to_select").removeClass("paper_to_select");
      //add paper_to_select class to keep track of which input row to add the
      //paper to 
      $(this).addClass("paper_to_select");
      //show the paper selection Modal
      $("#selectPaperModal").show();
      
      //clear all inputs from the paper search inputs
      $("#paper_details input").val("");
      $("#paper_details select").val("");
      
      //remove animation from the inputs
      $(".animate-bg").removeClass("animate-bg");
      
      //remove the highlighted quote
      $("#paper_table .quote_highlight").removeClass("quote_highlight");
      
      //trigger a change of any of the blanked paper search inputs to trigger
      //refresh of the paper list
      $("#paper_details .width").change();
    });
  }

/*
 * Function rows_changed
 *
 * Runs the required functions on change of the number of rows of inputs
 *
 * Runs the required functions on change of the number of rows of inputs
 */
  rows_changed(){
    var _this = this;
    //fix the line numbers for the input rows
    _this.renumber();
    
    //set the "No. Of Copies in Each Set" for stationery 
    if(_this.module == "stationery"){
      var rows = $("#inputs_rows tr").length;
      $("#copies_set").val(rows);
    }
    
    //enable Post Process Printing Cost for multi sheet
    if(_this.module == "multi_sheet"){
      $(".process_cost").click(function(e){
        //get the input line number
        var line_number = $(this).parent().parent().find(".row-number").html();
        //subtract 1 for zero index
        line_number = parseInt(line_number) - 1;
        //set the line number for which the Post Printing Process Cost datais to
        //be loaded
        $("#process_cost_line").val(line_number);
        //load Post Printing Process data
        window.calc.loadRowToProcess();
        //Show the Post Printing Process Window
        $("#inputsModal").show();
      });
    }
    
    //enable additional actions for the added row
    _this.enableNone();
    _this.enableAddRemoveInputRows();
    _this.enableSelectPaper();
    _this.enablemmHovering();
    if(_this.module == "book"){
      //set Book Binding Cost to update on change of Total Pages
      window.binding.enableBindingCostUpdate();
      //Update Book Binding Cost
      window.binding.updateBindingCost();
    }
    window.binding.enableCustomColorRates();
    //run the calculation
    window.calc.calculateAll();
    
    $(".process_cost").click(function(e){
      const paper_name = $(this).parent().parent().find(".selectPaper").val()
      $("#inputsModal .paper_name").html(paper_name)
      $("#inputsModal").show()
    }) 
  }

/*
 * Function to enable hovering for mm
 *
 * Function to enable hovering for inch to mm
 */
  enablemmHovering(){
    const TOOLTIP_WIDTH = 300
    const mm_hover_class = 'mm_hover_class'
    $(".selectPaper").off("hover")
    $(".selectPaper").hover(function(){
      const show_hide_mm = $("#show_hide_mm").val()
      if(show_hide_mm == 'hide'){
        return
      }
      const paper_size = $($(this).parent().parent().find(".paper_size")[0])
      const width = $($(paper_size).find(".width")[0]).val() * _mm_inch_conv_
      const height = $($(paper_size).find(".height")[0]).val() * _mm_inch_conv_
      if(isNaN(width) || isNaN(height) || width == 0 || height == 0){
        return;
      }
      const html = fixed(width,1) + " mm x " + fixed(height,1) + " mm"
      $("#tooltip").html( html )
      $("#tooltip").addClass(mm_hover_class)
      $("#tooltip").css("top",$(this).offset().top )
      const left = $(this).offset().left + $(this).width()/2 - TOOLTIP_WIDTH/2
      $("#tooltip").css("left",left)
      $("#tooltip").show()
    })
    $(".selectPaper").off("mouseleave")
    $(".selectPaper").mouseleave(function(){
      $("#tooltip").html('')
      $("#tooltip").removeClass(mm_hover_class)
      $("#tooltip").hide()
    })
    $(".job_size_inputs").off("hover")
    $(".job_size_inputs").hover(function(){
      const show_hide_mm = $("#show_hide_mm").val()
      if(show_hide_mm == 'hide'){
        return
      }
      const paper_size = $(this).find("input")
      const width = $($(paper_size)[0]).val() * _mm_inch_conv_
      const height = $($(paper_size)[1]).val() * _mm_inch_conv_
      if(isNaN(width) || isNaN(height) || width == 0 || height == 0){
        return;
      }
      const html = fixed(width,1) + " mm x " + fixed(height,1) + " mm"
      $("#tooltip").html( html )
      $("#tooltip").addClass(mm_hover_class)
      $("#tooltip").css("top",$(this).offset().top  )
      const left = $(this).offset().left + $(this).width()/2 - TOOLTIP_WIDTH/2
      $("#tooltip").css("left",left)
      $("#tooltip").show()
    })
    $(".job_size_inputs").off("mouseleave")
    $(".job_size_inputs").mouseleave(function(){
      $("#tooltip").html('')
      $("#tooltip").removeClass(mm_hover_class)
      $("#tooltip").hide()
    })
    $("#paper_table .data-row .name").off("hover")
    $("#paper_table .data-row .name").hover(function(){
      const show_hide_mm = $("#show_hide_mm").val()
      if(show_hide_mm == 'hide'){
        return
      }
      const paper_size = $(this)
      const width = $($(paper_size).parent().find(".width")[0]).html() * _mm_inch_conv_
      const height = $($(paper_size).parent().find(".height")[0]).html() * _mm_inch_conv_
      if(isNaN(width) || isNaN(height) || width == 0 || height == 0){
        return;
      }
      const html = fixed(width,1) + " mm x " + fixed(height,1) + " mm"
      $("#tooltip").html( html )
      $("#tooltip").addClass(mm_hover_class)
      $("#tooltip").css("top",$(this).offset().top  )
      const left = $(this).offset().left + 20 
      $("#tooltip").css("left",left)
      $("#tooltip").show()
    })
    $("#paper_table .data-row .name").off("mouseleave")
    $("#paper_table .data-row .name").mouseleave(function(){
      $("#tooltip").html('')
      $("#tooltip").removeClass(mm_hover_class)
      $("#tooltip").hide()
    })
  }

/*
 * Function renumber
 *
 * Renumbers the input rows
 * 
 * Renumbers the input rows
 */
  renumber(){
    var _this = this;
    //go through each input row 
    $(".row-number").each(function(i,row_num){
      //set the row number
      $(row_num).html(i+1);
    });
  }

/*
 * Function addInputRows
 *
 * Adds input rows on change of the number of rows
 * 
 * Adds input rows on change of the number of rows
 */
  addInputRows(rows, current_rows){
    var _this = this;
    
    //sample row
    var html = $("#sample_row").html();	
    
    //add the rows to the input rows
    while(rows > current_rows){
      $("#inputs_rows").append(html);
      
      current_rows++;
      
      //add the remove to the option column
      if($("#inputs_rows tr").length > 1){
        var option_html = '<div class="row_num">' + $("#inputs_rows tr").length
          + '</div>' + '<div class="remove-row hide">'
          + '<span class="material-icons">remove</span></div>';
      }
      else{
        var option_html = $("#inputs_rows tr").length; 
      }
      var options = $(".option");
      if(_this.module == "book"){
        $($(".option")[options.length-3]).html(option_html);
      }
      else{
        $($(".option")[options.length-2]).html(option_html);
      }
    }
    
    //enable None for the added rows
    _this.enableNone();
    
    $("input").change(function(e){
      window.calc.calculateAll();
    });
    $("select").change(function(e){
      window.calc.calculateAll();
    });
    $("#inputs_rows .disabled").attr("readonly",true);
  }

/*
 * Function setModule
 *
 * Sets the current module in use
 * 
 * Sets the current module in use
 * TODO:remove window.module after removing all references
 */
  setModule(){
    var url = window.location.href;
    var url_split = url.split('/');
    var module = url_split[url_split.length - 1].split('.');
    window.module = module[0];
    this.module = module[0];
  }

/* Function enableExtraPgsAlert
 * 
 * Enables alert for when the number of pages to be processed are greater than
 * total pages
 * 
 * Enables alert for when the number of pages to be processed in Post Printing 
 * Process Cost is greater than total pages in the relevant row
 */
  enableExtraPgsAlert(){
    var _this = this;
    //return if module is not multi sheet or book
    if(!( _this.module == "multi_sheet" || _this.module == "book" )){
      return;
    }
    
    //pages to process has been changed
    $("#inputsModal .pgs_to_process input").change(function(e){
      var changed_input = this;
      //get the total pages from the relevant row
      if(_this.module == "multi_sheet"){
        var line = parseInt($("#process_cost_line").val()) + 1;
        var total_pgs = window.calc.getInput(line, "inp_total_pgs");
      }
      if(_this.module == "book"){
        var total_pgs = window.calc.getInput(1, "inp_total_pgs");
      }
      
      //Get the pages to process
      var pgs_to_process = $(this).val();
      if(total_pgs == 0 || pgs_to_process == ""){
        //if total pages is 0 or blank return
        return;
      }
      if(total_pgs < pgs_to_process){
        //set the alert text
        var alert_text = "Total Pages <b>(" + total_pgs + ")</b> is less than<br/>"
          + "Pages to be Processed <b>(" + pgs_to_process + ")</b><br/>"
          + "Do you want to continue?";
        
        window.xpress.modalAlert("confirm", "Confirm Pages to Process",
          alert_text,"info", 
          ['I want to change the number of "Pages to be Processed"',
            "I want to continue"])
        .then(
          function(data){
            //resolved
            $(changed_input).val("");
            $(changed_input).focus();
          });
      }
    });
  }

/*
 * enables alerts for change of total pages in multi sheet and bookwork
 *
 * enables alerts for change of total pages in multi sheet and bookwork
 */
  enableTotalPgsChangeAlert(){
    var _this = this;
    //return if module is not multi sheet or book
    if(!( _this.module == "multi_sheet" || _this.module == "book" )){
      return;
    }
    
    //total pages changed
    $(".total_pgs input").change(function(e){
      if(_this.module == "book"){
        //if total pages has been changed for anything other than title then
        //return
        if($(this).parent().parent().find(".row-number").length != 0){
          return;
        }
      }
      else{
        //multi sheet
        //get the line number for which total pages was changed
        var line_number = $(this).parent().parent().find(".row-number").html();
        //subtract 1 to make it fit with zero index array
        line_number = parseInt(line_number) - 1;
        //set the line number to the form
        $("#process_cost_line").val(line_number);
        //load post process data to the form
        window.calc.loadRowToProcess();
      }
      
      //check if any of the items which may be affected by the change is cheked
      //or not
      if( $("#inputsModal .lamination-matt .select input").is(":checked")  ||
          $("#inputsModal .lamination-gloss .select input").is(":checked") ||
          $("#inputsModal .uv-coating-flood .select input").is(":checked") ||
          $("#inputsModal .lamination-gloss .select input").is(":checked") ||
          $("#inputsModal .drip-off .select input").is(":checked")         ||
          $("#inputsModal .varnishing .select input").is(":checked")       ||
          $("#inputsModal .aqueous-coating .select input").is(":checked")  ){
          //it is checked so show the alert 
          $("#changePostProcess").show();
          //animate the title for Number of pages to be processed
          $($(".pgs_to_process")[0]).addClass("animate-pgs_to_process_title");
        //click on relevant process cost button to bring up the Post Printing
        //Process Modal
        $(this).parent().parent().find(".process_cost").click();
      }
    });
    
    //user clicked yes to change post process details
    //hide the alert dialouge box
    $(".change-post-process-yes").click(function(e){
      $("#changePostProcess").hide();
    });
    
    //user clicked no to change post process details
    //remove Number of Pages to Process animation
    //hide alert dialouge box
    //hide Post Printing Process Cost Modal
    $(".change-post-process-no").click(function(e){
      $($(".pgs_to_process")[0]).removeClass("animate-pgs_to_process_title");
      $("#inputsModal").hide();
      $("#changePostProcess").hide();
    });
    
    //remove Number of Pages to Process animation
    $("#inputsModal .close").click(function(e){
      $($(".pgs_to_process")[0]).removeClass("animate-pgs_to_process_title");
    });
  }

  /*
   * saves quotation for main (templates) and user library
   *
   * saves quotation for main (templates) and user library
   *
   * @param library The library to save to one of "user_library" (manage
   * quotations and "main_library" (templates)
   * 
   * @return promise returns a promise that resolves when the saving is complete 
   */
  saveQuotation(library = "user_library"){
    if( $("#quote_locked").length == 1 ){
      window.xpress.modalAlert("alert","Quotation is locked",
        `This quotation has been locked, and cannot be edited. 
         To edit this quotation please copy it first.`, "failure");
      return;
    }
    //get the inputs
    var inputs = getInputs();
    
    //get rest of the data
    var customer = $("#customer").attr("data-id");
    
    //the quote number here is relevant to the user only 
    //saved as quote_number in the database 
    var quote_no = $("#quote_no").val();
    var job_ref = $("#job_ref").val();
    var pdf_desc = $("#pdf_desc").val();
    var qty_a = $("#quantity_a").val();
    var qty_b = $("#quantity_b").val();
    var qty_c = $("#quantity_c").val();
    
    //total quotes
    var total_quote_a = parseResult("total-quote-a");
    var total_quote_b = parseResult("total-quote-b");
    if(window.module != "calendar"){
      var total_quote_c = parseResult("total-quote-c");
    }
    else{
      var total_quote_c = 0;
    }
    //set overprinting qty to 0 as default
    var qty_op = 0;
    
    //calender details
    if(window.module == "calendar"){
      //set overprint qty for calendar
      var qty_op = $(".inp_over_print_qty").val();
    }
    
    var date = getDate();
    if(library == "user_library"){
      //save to user manage quotation
      //if quote number is not set then save quotation else update quotation
      if(quote_no == ""){
        var action = "save_quotation";
      }
      else{
        var action = "update_quotation";
      }
    }
    else{
      //save to templates
      //only avaliable to admin
      if(quote_no == ""){
        var action = "save_quotation_library";
      }
      else{
        //get the id of the quote to use as the quote number
        var url = window.location.href.split('#');
        var quote = url[1].split('_');
        quote_no = parseInt(quote[1]);
        var action = "update_quotation_library";
      }
    }
    //data to post
    var post_data = {
      action: action,
      inputs: inputs,
      customer: customer,
      quote_no: quote_no,
      job_ref: job_ref,
      pdf_desc: pdf_desc,
      date: date,
      qty_a: qty_a,
      qty_b: qty_b,
      qty_c: qty_c,
      qty_op: qty_op,
      total_quote_a: total_quote_a,
      total_quote_b: total_quote_b,
      total_quote_c: total_quote_c,
      module: window.module
    };
    //create a promise for saving quotation
    const promise = new Promise((resolve,reject) => {
      $.post("ajax_api.php", post_data, function(data){
        if(action == "save_quotation" && data.status == "success"){
          //quotation saved (to manage quotations)
          //set the quote number
          $("#quote_no").val(data.resp.quote_no);
          //disable change of customer
          $("#customer").attr("disabled","disabled");
          //set the date
          $("#quote_date").val(formatDate(date));
          getQuotes();
          resolve(1);
        }
        else if(action == "save_quotation_library" && data.status == "success"){
          //quotation saved to templates
          //update quote_number
          $("#quote_no").val(data.resp.quote_no);
          //disable changing of customer
          $("#customer").attr("disabled","disabled");
          //add the date
          $("#quote_date").val(formatDate(date));
          //reload templates
          getQuotesLibrary();
          resolve(1);
        }
        else if(action == "update_quotation" && data.status == "success"){
          //quotation updated
          resolve(1);
        }
        else if(action == "update_quotation_library" && data.status == "success"){
          //quotation successfully updated to templates
          resolve(1);
          getQuotesLibrary();
        }
        else{
          //something went wrong
          reject(1)
        }
      }).fail(function(error){
        //failed to save quotation
        //Most likely due to internet connectivity issue
        reject(error);
      });
    });
    return(promise);
  }

  /*
   * generates PDF Quotation
   *
   * generates PDF Quotation
   */
  generateQuotation(){
    //quote number
    var quote_num = $("#quote_no").val();
    
    //quote for email or print
    var quote_for = $("#quote_for").val();
    
    //if quote_for is null or blank set it to email 
    if( quote_for == null || quote_for == "" ){
      quote_for = "email";
    }
    
    // set the quantities to generate the quote for
    var qty = Array();
    if($("#pdf_qty_a").is(":checked")){
      qty.push("qty_a");
    }
    if($("#pdf_qty_b").is(":checked")){
      qty.push("qty_b");
    }
    if($("#pdf_qty_c").is(":checked")){
      qty.push("qty_c");
    }
    
    //if no quantity is selected give alert and return
    if( qty.length == 0 ){
      window.xpress.modalAlert("alert","Select Quantity",
        "Please Select the quantity that you want to create PDF for", "failure");
      return;
    }
    
    //generate the url for downloading the pdf
    qty = encodeURIComponent(JSON.stringify(qty));
    var url = "ajax_api.php?action=generate_pdf&pdf_type=quotation&"
      +"quote_num="+quote_num +"&quote_for="+quote_for+"&qty="+qty;
    
    //hide the pdf options
    $("#PDF_Options").hide();
    
    //download the pdf
    window.location.href=url;
  }
  
  /*
   * Removes deleted customers from the list to show in the table
   *
   * Removes deleted customers from the list to show in the table
   */
  removeDeletedCustomers(){
    var customers = [];
    window.customers.forEach(function(d){
      if( ! d.deleted ){
        customers.push(d);
      }
    });
    return(customers);
  }
  
  /* Loads customers for the user
   *
   * Loads customers for the user
   */
  loadCustomers(){
    var _this = this;
    //get the post_data
    var post_data = {action: "get_customers"};
    
    //create a promise resolves when customers are loaded
    const promise = new Promise((resolve,reject) => {
      //send request to server
      $.post("ajax_api.php", post_data, function(data){
        //get the data from the response
        var cust_data = data.resp;
        
        //get the id of the customer set in the customer field
        var cust_id = $("#customer").attr("data-id");
        
        //id of 0 means new customer  had been selected which means that a new
        //customer has just been added
        if( cust_id == 0 ){
          $("#customer").attr("data-id",cust_data[cust_data.length -1].id);
          $("#customer").val(cust_data[cust_data.length -1].company_name);
        }
        
        //sort the customer data
        cust_data.sort(function(a,b){
          if( a.company_name < b.company_name ){
            return -1;
          }
          else if( a.company_name > b.company_name ){
            return 1;
          }
          else{
            return 0;
          }
        });
        
        //set the window.custmors array for reference
        window.customers = cust_data;
        cust_data = _this.removeDeletedCustomers();
        window.xpress.loadData($("#customer_table"),cust_data);
        
        var quote_customers =  JSON.parse(JSON.stringify(cust_data));
        var QuoteCustomersDataList = new DATALIST();
        var q_cust_input = $("#PDF_Options_Quotation input.quote_customer");
        QuoteCustomersDataList.loadDataList(q_cust_input, quote_customers,"company_name");
        QuoteCustomersDataList.afterDataSelect(function(){
          $("#PDF_Options_Quotation .quotation-table .table .table-row.data-row").remove()
        })
        var InvoiceCustomersDataList = new DATALIST();
        var invoice_cust_input = $("#PDF_Options_Invoice input.quote_customer");
        InvoiceCustomersDataList.loadDataList(invoice_cust_input, quote_customers,"company_name");
        InvoiceCustomersDataList.afterDataSelect(function(){
          $("#PDF_Options_Invoice .quotation-table .table .table-row.data-row").remove()
        })
        var DeliveryMemoCustomersDataList = new DATALIST();
        var delivery_memo_cust_input = $("#PDF_Options_Delivery input.quote_customer");
        DeliveryMemoCustomersDataList.loadDataList(delivery_memo_cust_input, quote_customers,"company_name");
        DeliveryMemoCustomersDataList.afterDataSelect(function(){
          $("#PDF_Options_Delivery .quotation-table .table .table-row.data-row").remove()
        })
        
        var po_cust_input = $("input.po_customer_sel");
        QuoteCustomersDataList.loadDataList(po_cust_input, quote_customers,"company_name");
        
        //Create a  datalist for manage Quotations
        var quote_cust_data =  JSON.parse(JSON.stringify(cust_data));
        quote_cust_data.unshift({id:"", company_name: "All Customers", no_filter:true});
        var QuoteCustDataList = new DATALIST();
        QuoteCustDataList.loadDataList($("#quote_customer"), quote_cust_data,"company_name");
        QuoteCustDataList.afterDataSelect(function(){
          getQuotes();
        });
        if(_this.module == "dashboard"){
          _this.custDataList = new DATALIST()
          const customer_input = "#main-content .main-header .customer_sel"
          _this.custDataList.loadDataList($(customer_input), quote_cust_data,"company_name")
          _this.custDataList.afterDataSelect(function(){
            $(customer_input).change()
          })
        }
        
        //insert "New Customer" into data set 
        cust_data.unshift({id:0, company_name: "New Customer", no_filter:true});
        
        //create a new datalist
        var customerDataList = new DATALIST();
        //load the datalist with the customer data
        customerDataList.loadDataList($("#customer"), cust_data,"company_name");
        
        //set function to be called after customer is selected
        customerDataList.afterDataSelect(function(){
          //get the id of the customer
          var cust_id = $("#customer").attr("data-id");
          if( cust_id == "0" ){
            //new customer is selected, so clear the add customer modal and show
            //the modal
            $("#addCustomerModal input").val("");
            $("#addCustomerModal textarea").val("");
            $("#addCustomerModal").show();
          }
          else if( _this.module == "binding" ){
            let customer = filterCustomer( cust_id )[0]
            const cust_div = ".settings_top.customer_details "
            const contact = customer.email 
              + "     "
              + customer.contact_number
            $(cust_div + ".address").html(customer.address)
            $(cust_div + ".email_phone").val(contact)
            $(cust_div + ".gstin").val(customer.gstin)
            $(cust_div + ".state").val(customer.state)
            $(cust_div + ".code").val(customer.state_code)
          }
        });
        
        //customers loaded so resolve
        resolve(1);
        
        $("#lib_customer").keyup(function(){
          //get the search string and change it to lowercase
          var search = $(this).val().toLowerCase(); 
          $("#customer_table .table .data-row").each(function(i,d){
            //get the company name and change it to lowercase 
            var company_name = $($(d).find(".company_name")[0]).html().toLowerCase();
            if( company_name.indexOf(search) == -1 ){
              $(d).hide();
            }
            else{
              $(d).show();
            }
          });
        });
      });
    });
    //return the promise
    return(promise);
  }
  
  /*
   * Selects the customer on click
   * 
   * Selects the customer on click
   */
  selectCustomer(element){
    $(element).parent().find(".quote_highlight").removeClass("quote_highlight");
    $(element).addClass("quote_highlight");
  }
  
  /*
   * Deletes customer 
   * 
   * Deletes customer 
   */
  deleteCustomer(){
    var _this = this;
    //get the highlighted customer
    var customer = $("#customer_table .table .quote_highlight");
    
    //if customer is not selected warn the user and return
    if(customer.length == 0){
      window.xpress.modalAlert("alert","Select Customer",
        "Please Select the customer that you wast to delete", "failure");
      return;
    }
    
    //get the company name
    var company_name = $($(customer).find(".company_name")[0]).html();
    //set the alert text
    var alert_text = "Do you really want to delete the customer " 
      + company_name + "?. <br/> This cannot be undone.";
    
    //ask the user if they really want to delete the customer
    window.xpress.modalAlert("confirm", "Really Delete Customer?",
      alert_text,"failure", 
      ['Yes, Delete Customer',
        "No, Do Not Delete"])
      .then(function(){
        //the user has confirmed deletion
        //get the customer id
        var cust_id = $($(customer).find(".count")[0]).attr("data_id");
        //send the delete request
        $.post("ajax_api.php",{action:"delete_customer", cust_id:cust_id},
          function(data){
            //clear the customer search
            $("#lib_customer").val("");
            //load new customers
            _this.loadCustomers();
            //inform the user that the customer was deleted
            window.xpress.modalAlert("info","Customer Deleted",
              "Customer " + company_name + " deleted successfully.");
        });
      });
  }
  
  /*
   * Function called when edit customer is clicked
   * 
   * Function called when edit customer is clicked
   */
  editCustomer(){
    var _this = this;
    //get the customer that was clicked
    var customer = $("#customer_table .table .quote_highlight");
    //if no customer is selected then alert customer and return
    if(customer.length == 0){
      window.xpress.modalAlert("alert","Select Customer",
        "Please Select the customer that you wast to edit", "failure");
      return;
    }
    //get the customer id
    var cust_id = $($(customer).find(".count")[0]).attr("data_id");
    //get all the customer details
    var company_name = $($(customer).find(".company_name")[0]).html();
    var contact_person = $($(customer).find(".contact_person")[0]).html();
    var contact_number = $($(customer).find(".contact_number")[0]).html();
    var email = $($(customer).find(".email")[0]).html();
    var address = $($(customer).find(".address")[0]).html();
    var shipping_address = $($(customer).find(".shipping_address")[0]).html();
    var gstin = $($(customer).find(".gstin")[0]).html();
    var state = $($(customer).find(".state")[0]).html();
    var shipping_state = $($(customer).find(".shipping_state")[0]).html();
    //set the edit customer form with the customer details
    $("#edit_customer_id").val(cust_id);
    $("#cust_company_name").val(company_name);
    $("#cust_contact_person").val(contact_person);
    $("#cust_contact_number").val(contact_number);
    $("#cust_email").val(email);
    $("#cust_gstin").val(gstin);
    $("#cust_address").val(address);
    $("#cust_shipping_address").val(shipping_address);
    $("#cust_shipping_state").val(shipping_state);
    $("#cust_state").val(state);
    //change the title of the form to Edit Customer Details
    $("#edit_customer_header").html("Edit Customer Details");
    //show the customer edit form
    $("#addCustomerModal").show();
  }
  
  /*
   * Sets the top set of inputs
   * 
   * Sets the top set of inputs
   */
  setTopInputs(){
    var _this = this;
    
    //get the inputs for the top section
    var top_inputs = _this.quote_data.inputs[0];
    
    //remove disabled from customer and clear it
    $("#customer").removeAttr("disabled");
    $("#customer").val("");
    $("#customer").removeAttr("data-id");
    
    //set the quantities
    $("#quantity_a").val(top_inputs.quantity_a);
    $("#quantity_b").val(top_inputs.quantity_b);
    $("#quantity_c").val(top_inputs.quantity_c);
    
    //set the job ref
    $("#job_ref").val(top_inputs.job_ref);
    
    //set the description for pdf
    $("#pdf_desc").val(top_inputs.pdf_desc);
    
    //set print calculation every
    $("#print_calculation_every").val(top_inputs.print_calculation_every);
    
    //set the print_run length
    if(typeof(top_inputs.print_run) != "undefined"){
      window.calc.print_run_length = top_inputs.print_run;
    }
    
    //set the book binding results if it exists 
    if(window.module == "book"){
      if(typeof(top_inputs.bind_res) != "undefined"){
        window.bind_res = top_inputs.bind_res;
      }
      else if(typeof(window.bind_res) != "undefined"){
        delete(window.bind_res);
      }
    }
    
    //edit quote
    if(_this.quote_actions.action == "edit"){
      //set the date
      var quote_date = formatDate(_this.quote_data.date);
      $("#quote_date").val(quote_date);
      //set the quote number
      $("#quote_no").val(_this.quote_data.quote_number);
      //set the customer
      _this.setCustomer(_this.quote_data.customer_id);
    }
    else{
      //copy quote, so clear the quote date and number
      $("#quote_date").val("");
      $("#quote_no").val("");
      //clear customer
      $("#customer").val("");
      $("#customer").removeAttr("data-id");
      $("#customer").removeAttr("disabled");
    }
    if( typeof(top_inputs.job_size) != "undefined" ){
      var job_size_keys = Object.keys(top_inputs.job_size);
      job_size_keys.forEach(function(d){
        $("."+d).val(top_inputs.job_size[d]);
      });
      $(".settings_top .open_job_size_w").change();
    }
  }
  
  /*
   * Sets the customer, quote id and date
   * 
   * Sets the customer, quote id and date
   */
  setCustomer(customer_id){
    var _this = this;
    if( typeof( window.customers ) == "undefined" ){
      setTimeout(function(){
        _this.setCustomer(customer_id);
      },500);
      return;
    }
    var customer = filterCustomer(customer_id)[0];
    $("#customer").attr("data-id",customer_id);
    $("#customer").val(customer.company_name);
    $("#customer").attr("disabled","disabled");
  }
  
  /*
   * Loads the quotation data
   * 
   * Loads the quotation data
   */
  loadQuote(data){
    var _this = this;
    if( typeof(  window.screen_defaults_loaded ) == "undefined" ||
        screen_defaults_loaded == false ){
      setTimeout(function(){
        _this.loadQuote(data);
      },500);
      return;
    }
    //remove readonly and js-disabled
    $(".js-disabled").removeAttr("readonly");
    $(".js-disabled").removeClass("js-disabled");
    $(".input-locked").removeAttr("readonly");
    $(".input-locked").removeAttr("disabled");
    $(".input-locked").removeClass("input-locked");
    $("#quote_locked").remove();
    $(".quote_no_input input").attr("disabled","disabled");
    $(".date_input input").attr("disabled","disabled");
    $(".job_size_inputs input").val("00.00");
    $("#cuts_preview .job_size_cuts").html("");
    $("#cuts_preview svg").remove();
    $("#jobSizeModal .job_size_cuts span").html("");
    $("#jobSizeModal svg").remove();
    
    //set the data to quote_data so other methods can access it
    _this.quote_data = data.resp;
    //parse tthe inputs
    _this.quote_data.inputs = JSON.parse(data.resp.inputs);
    
    _this.setTopInputs();
    
    var inputs = _this.quote_data.inputs
    
    inputs.shift();
    if(window.module == "book"){
      var titles = inputs.shift();
      var title_keys = Object.keys(titles);
      title_keys.forEach(function(key){
        if(titles[key] !==""){
          $("#book_title ." + key).val(titles[key]);
        }
      });
      const inner_pgs_printed = $("#book_title .inner_pgs_printed").val() - 1
      $("#book_title .inner_pgs_printed_div div").removeClass("selected")
      $($("#book_title .inner_pgs_printed_div div")[inner_pgs_printed])
        .addClass("selected")
      if(typeof(titles["process_data"] != "undefined")){
        $("#book_title .process_cost").attr("process",titles["process_data"]);
      }
      else{
        $("#book_title .process_cost").removeAttr("process");
      }
      var binding = inputs.shift();
      var binding_keys = Object.keys(binding);
      binding_keys.forEach(function(key){
        if(binding[key] !==""){
          $("#binding_inputs ." + key).val(binding[key]);
        }
      });
    }
    if( window.module == "stationery"   ||
        window.module == "multi_sheet"  ||
        window.module == "book"         ){
      $("#inputs_rows tr").each(function(i,d){
        if(i == 0){
          return;
        }
        $(d).remove();
      });
      var sample_html = $("#sample_row").html();
      for(var i = 1; i < inputs.length; i++){
        $("#inputs_rows").append(sample_html);
      }
      $("#inputs_rows select, #inputs_rows input").change(function(e){
        window.calc.calculateAll();
      });
    }
    var input_table_rows = $("#inputs_rows tr");
    inputs.forEach(function(row,row_id){
      var keys = Object.keys(row);
      keys.forEach(function(key){
        if(row[key] !== ""){
          var inp = $(input_table_rows[row_id]).find('.' + key);
          $(inp).val(row[key]);
        }
      });
      if( window.module == "calendar" ){
        const op_qty = $("#inputs_rows .over_print_qty input").val()
        $("#overprint_qty").val(op_qty)
      }
      if( window.module == "box"          || 
          window.module == "single_sheet" ||
          window.module == "multi_sheet"  ){
        if(typeof(inputs[row_id]["process_data"] != "undefined")){
          $(input_table_rows[row_id]).find(".process_cost")
            .attr("process",inputs[row_id].process_data);
        }
        else if(window.module == "book"){
        }
        else{
          $("#inputs_rows .process_cost").removeAttr("process");
        }
      }
    });
    if( window.module == "book"         ||
        window.module == "box"          ||
        window.module == "single_sheet" ){
      window.calc.loadRowToProcess();
    }
    $("#inputs_rows select").each(function(i,d){
      if($(d).val() == "None"){
        $(d).change();
      }
    }); 
    $("#book_title select").each(function(i,d){
      if($(d).val() == "None"){
        $(d).change();
      }
    }); 
    $("#inputs_rows input").each(function(i,d){
      if($(this).val()=="X"){
        $(this).addClass("js-disabled");
        $(this).attr("readonly","readonly");
      }
    });
    _this.rows_changed();
    window.binding.enableBindingCostUpdate();
    window.binding.updateBindingCost();
    window.calc.calculateAll();
    
    if( _this.quote_data.quote_lock == true  &&
        _this.quote_actions.action == "edit" ){
      $("#main-page input").attr("readonly","readonly");
      $("#main-page input").addClass("input-locked");
      $("#main-page select").attr("disabled","disabled");
      $("#main-page select").addClass("input-locked");
      $("#main-page textarea").attr("readonly","readonly");
      $("#main-page textarea").addClass("input-locked");
      $("#inputsModal input").attr("disabled","disabled");
      $("#inputsModal input").addClass("input-locked");
      $("#BindingModal input").attr("disabled","disabled");
      $("#BindingModal input").addClass("input-locked");
      $("#BindingModal select").attr("disabled","disabled");
      $("#BindingModal select").addClass("input-locked");
      $(".quote_no").append('<span id="quote_locked"><i class="fa-solid fa-lock"></i></span>');
    }
  }
  
  /*
   * Gets the quotation based on the url
   * 
   * Gets the quotation based on the url
   */
  getQuote(){
    var _this = this;
    //check if we need to get a quote, if not then return
    if( typeof( _this.quote_actions) == "undefined" ){
      return;
    }
    
    //get the quote number
    var quote_num = _this.quote_actions.num;
    //check if quote is to be got from the templates library or from manage
    //quotations
    if( _this.quote_actions.lib == "library" ){
      var action = "get_quote_library";
    }
    else{
      var action = "get_quote";
    }
    
    //send request to server
    $.post("ajax_api.php", {action: action, quote_id: quote_num},
      function(data){
        if(data.status == 'failed'){
          //getting the quotation failed for some reason, maybe it has been
          //deleted or something
          return;
        }
        _this.loadQuote(data);
      },"json");
  }
  
  /*
   * sets the values for the options provided using # 
   * 
   * sets the values for the options provided using # 
   */
  setHashOptions(){
    var _this = this;
    
    //get the url
    var url = window.location.href;
    //split the url into parts
    var url_parts = url.split('#');
    
    //since the url_parts.length is 1 that means that there was no '#' character
    //provided, thus no edit, copy quotation is set and no tour guide is set, so
    //we have nothing to do
    if( url_parts.length == 1 ){
      return;
    }
    
    //for each of the url parts
    url_parts.forEach(function(d){
      //plit the parts using an underscore
      var hash_parts = d.split('_');
      //if the first part is edit then we know we need to edit quote
      if( hash_parts[0] == "edit" ){
        //specify that we need to edit the quote and specify the quote number
        //and whether its from library or users manage quotations
        _this.quote_actions = { action: "edit", num: hash_parts[1] }
        if( hash_parts.length == 3 ){
          _this.quote_actions.lib = "library";
        }
        else{
          _this.quote_actions.lib = "user";
        }
      }
      //if the first part is copy then we know we need to copy quote
      else if( hash_parts[0] == "copy" ){
        //specify that we need to copy the quote and specify the quote number
        //and whether its from library or users manage quotations
        _this.quote_actions = { action: "copy", num: hash_parts[1] }
        if( hash_parts.length == 3 ){
          _this.quote_actions.lib = "library";
        }
        else{
          _this.quote_actions.lib = "user";
        }
      }
      //if the first part is tour then we know we need to start the tour
      else if( hash_parts[0] == "tour" ){
        //set the tour that we need to start and the point where we need to
        //start it
        _this.tour_actions = { action: "tour" , tour: hash_parts[1], 
          num : hash_parts[2] };
      }
    });
  }
  
  /*
   * Enables saving of preferences
   * 
   * Enables saving of preferences
   */
  enableSavePreferences(){
    var _this = this;
    $("#save_process_rates").click(function(){
      _this.saveProcessRates();
    }); 
    $("#save_pdf_options_quotation").click(function(){
      _this.savePdfOptionsQuotation();
    }); 
    $("#save_general_preferences").click(function(){
      _this.saveGeneralPreferences();
    }); 
    $("#save_pdf_invoice_preferences").click(function(){
      _this.saveInvoicePrefences();
    });
  }
  
  /*
   * Saves the Process Rates
   *
   * Saves the Process Rates
   */
  saveProcessRates(){
    var _this = this;
    var minimums = {};
    $("#preferences-minimums-tab input").each(function(i,d){
      var id = $(d).attr("id");
      var value = $(d).val();
      minimums[id] = value;
    });
    _this.preferences.minimums = minimums;
    _this.savePreferences();
  }
  
  /*
   * Saves PDF Options for Quotation 
   * 
   * Saves PDF Options for Quotation 
   */
  savePdfOptionsQuotation(){
    var _this = this;
    _this.preferences.pdf_top_text = $("#pdf_top_text").val();
    _this.preferences.pdf_bottom_text = $("#pdf_bottom_text").val();
    _this.preferences.pdf_terms = $("#pdf_terms").val();
    _this.savePreferences();
  }
  
  /*
   * Saves general preferences
   * 
   * Saves general preferences
   */
  saveGeneralPreferences(){
    var _this = this;
    _this.preferences.cost_summary_show = $("#cost_summary_show").val();
    _this.preferences.paper_size_units = $("#paper_size_units").val();
    _this.preferences.popup_language = $("#popup_language").val();
    _this.preferences.print_run_length = $("#print_run_length").val();
    _this.preferences.print_master_run_length = $("#print_master_run_length").val();
    _this.preferences.print_calculation_every = $("#print_calculation_every").val();
    _this.preferences.paper_wastage_gain_rs = $("#paper_wastage_gain_rs").val();
    _this.preferences.show_hide_mm = $("#show_hide_mm").val();
    _this.savePreferences();
  }
  
  /*
   * Saves the prefences to the database
   * 
   * Saves the prefences to the database
   */
  savePreferences( show_alert = true){
    var preferences = this.preferences;
    var post_data = {action:"save_preferences",preferences:preferences};
    $.post("ajax_api.php", post_data,function(data){
      if(show_alert){
        alert("Preferences Saved");
      }
      $("#preferencesModal .close").click();
      window.calc = new calculator();
      showHideCostDetails();
      loadTooltips();
    });
  }
  
  /**
   * Allows the user to lock an estimate
   * 
   * Allows the user to lock an estimate
   */
  lockEstimate(){
    //estimate to lock has not been selected
    if($(".quote_highlight").length == 0){
      window.xpress.modalAlert("alert","Please Select Estimate",
        "Please select estimate to lock.", "failure")
      return
    }
    
    //check if estimate is already locked
    if( $(".quote_highlight .fa-lock").length == 1 ){
      window.xpress.modalAlert("alert","Estimate is already locked",
        `This estimate has been locked already.`, "failure")
      return
    }
    
    //get the estimate number
    const estimate_num = parseInt($(".quote_highlight .quote_number").html())
    //generate the confirmation text
    const confirm_text = "Do you want to lock estimate " + estimate_num + " ?<br/>"
      + `<span class="danger">Once locked the estimate can not be unlocked or 
         edited.</span><br/> But you can copy the estimate, and view the 
         estimate.`
    //ask user for confirmation to lock estimate
    window.xpress.modalAlert("confirm", "Lock Estimate?",
      confirm_text,"failure", 
      ['Yes, Lock Estimate',
        "No, Do Not Lock"])
      .then(function(){
        //user has confirmed so send request to lock estimate
        $.post("ajax_api.php",{action: "lock_quote", quote_id: estimate_num},
          function(data){
            //reload the estimates after locking
            getQuotes()
        })
      })
  }
  
  /**
   * Lets the user delete an Estimate from their own library
   * 
   * Lets the user delete an Estimate from their own library
   */
  deleteEstimate(){
    //no estimate has been selected, so alert user and return
    if($(".quote_highlight").length == 0){
      window.xpress.modalAlert("alert","Please Select Estimate",
        "Please select estimate to delete.", "failure")
      return
    }
    
    //check if quotation is locked
    if( $(".quote_highlight .fa-lock").length == 1 ){
      window.xpress.modalAlert("alert","Quotation is locked",
        `This quotation has been locked, and cannot be deleted.`, "failure")
      return
    }
    
    //get the estimate number
    const estimate_num = parseInt($(".quote_highlight .quote_number").html())
    //generate the corfirmation text
    const confirm_text = "Do you really want to delete estimate #" + estimate_num + " ?"
    //ask the user to confirm deletion
    window.xpress.modalAlert("confirm", "Delete Estimate?",
      confirm_text,"failure", 
      ['Yes, Delete Estimate',
        "No, Do Not Delete"])
      .then(function(){
        //user has confirmed deletion, send request to server
        $.post("ajax_api.php",{action: "delete_quote", quote_id: estimate_num},
          function(data){
            //load the estimates
            getQuotes()
        })
      })
    }
  
  /**
   * Lets admin delete estimate from Estimate templates library
   *
   * Lets admin delete estimate from Estimate templates library
   */
  deleteEstimateLibrary(){
    //no estimate is selected so warn and return
    if($(".quote_library_highlight").length == 0){
      window.xpress.modalAlert("alert","Please Select Quotation",
        "Please select quotation to delete.", "failure")
      return
    }
    //get the estimate number
    const estimate_num = parseInt($(".quote_library_highlight .quote_number").attr("quote_id"))
    //create the text for confirmation
    const confirm_text = "Do you really want to delete estimate #" + estimate_num + " ?"
    //ask the user to confirm deletion
    window.xpress.modalAlert("confirm", "Delete Estimate?",
      confirm_text,"failure", 
      ['Yes, Delete Estimate',
        "No, Do Not Delete"])
      .then(function(){
        //user has confirmed deletion, send request to server
        $.post("ajax_api.php",{action: "delete_quote_library", quote_id: estimate_num},
          function(data){
            //load the Estimates templates
            getQuotesLibrary()
        })
      })
  }
  
  /**
   * Adds or edits the vendor
   * 
   * Adds or edits the vendor
   **/
  addEditVendor(){
    let _this = this;
    const company_name = $("#AddEditVendor .company_name").val()
    const contact_person = $("#AddEditVendor .contact_person").val()
    const contact_number = $("#AddEditVendor .contact_number").val()
    const email = $("#AddEditVendor .email").val()
    const address = $("#AddEditVendor .address").val()
    const gstin = $("#AddEditVendor .gstin").val()
    const vendor_id = $("#AddEditVendor .id").val()
    const state = $("#AddEditVendor .state").val()
    const state_code = $("#AddEditVendor .state option:selected").attr("state_code")
    let action = ""
    if(vendor_id == ""){
      action = "add_vendor"
    }
    else{
      action = "edit_vendor"
    }
    const post_data = {action: action,
                    company_name: company_name,
                    contact_person: contact_person,
                    contact_number: contact_number,
                    email: email,
                    gstin: gstin,
                    address: address,
                    vendor_id: vendor_id,
                    state: state,
                    state_code: state_code}
    $.post("ajax_api.php", post_data, function(data){
      $("#AddEditVendor").find("input, select, textarea").val("")
      $("#AddEditVendor").hide()
      window.xpress.modalAlert("info","Vendor Saved",
        "Vendor saved successfully.")
      _this.loadVendors()
    })
  }

  /**
   * Adds or edits the vendor
   * 
   * Adds or edits the vendor
   **/
  editVendor(){
    let _this = this
    const vendor = "#vendor_table .quote_highlight "
    const company_name = $(vendor + ".company_name").html()
    const contact_person = $(vendor + ".contact_person").html()
    const contact_number = $(vendor + ".contact_number").html()
    const email = $(vendor + ".email").html()
    const address = $(vendor + ".address").html()
    const gstin = $(vendor + ".gstin").html()
    const vendor_id = $(vendor + ".count").attr("data_id")
    const state = $(vendor + ".state").html()
    $("#AddEditVendor .company_name").val(company_name)
    $("#AddEditVendor .contact_person").val(contact_person)
    $("#AddEditVendor .contact_number").val(contact_number)
    $("#AddEditVendor .email").val(email)
    $("#AddEditVendor .address").val(address)
    $("#AddEditVendor .gstin").val(gstin)
    $("#AddEditVendor .id").val(vendor_id)
    $("#AddEditVendor .state").val(state)
    $("#AddEditVendor").show()
  }

  /*
   * Deletes Vendor
   * 
   * Deletes Vendor 
   */
  deleteVendor(){
    var _this = this
    //get the highlighted customer
    var vendor = $("#vendor_table .quote_highlight")
    
    //if customer is not selected warn the user and return
    if(vendor.length == 0){
      window.xpress.modalAlert("alert","Select Vendor",
        "Please Select the vendor that you wast to delete", "failure");
      return;
    }
    
    //get the company name
    var vendor_name = $($(vendor).find(".company_name")[0]).html();
    //set the alert text
    var alert_text = "Do you really want to delete the vendor " 
      + vendor_name + "?. <br/> This cannot be undone.";
    
    //ask the user if they really want to delete the customer
    window.xpress.modalAlert("confirm", "Really Delete Vendor?",
      alert_text,"failure", 
      ['Yes, Delete Vendor',
        "No, Do Not Delete"])
      .then(function(){
        //the user has confirmed deletion
        //get the customer id
        var vendor_id = $($(vendor).find(".count")[0]).attr("data_id")
        //send the delete request
        $.post("ajax_api.php",{action:"delete_vendor", vendor_id},
          function(data){
            //load new vendors
            _this.loadVendors()
            //inform the user that the customer was deleted
            window.xpress.modalAlert("info","Vendor Deleted",
              "Vendor " + vendor_name + " deleted successfully.")
        })
      })
  }

  /**
   * Loads the Vendors
   * 
   * Loads the Vendors
   **/
  loadVendors(){
    let _this = this
    //get the post_data
    const post_data = {action: "get_vendors"}
    
    //send request to server
    $.post("ajax_api.php", post_data, function(data){
      //get the data from the response
      const vendor_data = data.resp
      
      //sort the customer data
      vendor_data.sort(function(a,b){
        if( a.company_name < b.company_name ){
          return -1
        }
        else if( a.company_name > b.company_name ){
          return 1
        }
        else{
          return 0
        }
      })
      
      _this.vendors = vendor_data;
      window.xpress.loadData($("#vendor_table"),vendor_data);
      $("#vendor_table .data-row").click(function(){
        $(this).addClass("quote_highlight")
      })
      window.xpress.loadSelectData($("select.vendors"),vendor_data);
      /*
      var VendorDataList = new DATALIST();
      VendorDataList.loadDataList($("#quote_customer"), vendor_data,"company_name");
      QuoteCustDataList.afterDataSelect(function(){
        getQuotes();
      });
      
      //insert "New Customer" into data set 
      cust_data.unshift({id:0, company_name: "New Customer", no_filter:true});
      
      //create a new datalist
      var customerDataList = new DATALIST();
      //load the datalist with the customer data
      customerDataList.loadDataList($("#customer"), cust_data,"company_name");
      
      //set function to be called after customer is selected
      customerDataList.afterDataSelect(function(){
        //get the id of the customer
        var cust_id = $("#customer").attr("data-id");
        if( cust_id == "0" ){
          //new customer is selected, so clear the add customer modal and show
          //the modal
          $("#addCustomerModal input").val("");
          $("#addCustomerModal textarea").val("");
          $("#addCustomerModal").show();
        }
      })
      */
    })
  }
}
