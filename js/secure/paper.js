/**
 * File for the paper javascript functions
 * 
 * File containing the javascript functions for paper management
 *
 * @package xpress
 * @copyright Express Tech
 * @version 0.1
 */

/**
 * Class for paper
 *
 * Class for managing Paper and related items
 */
class PAPER{
  /**
   * Constructor for Paper Class
   * 
   * Constructor for Paper Class
   */
  constructor(){
  }

  /*
   * Deletes Paper
   *
   * Deletes Paper from database
   */
  deletePaper(){
    //set _this to the paper library
    var _this = window.xpress.paper;
    var paper = $("#paper_table .quote_highlight");
    if(paper.length == 0){
      //if paper is not selected then show alert and return
      window.xpress.modalAlert("alert","Select Paper",
        "Please selected paper to delete", "failure");
      return;
    }
    
    //get the id of the paper
    var data_id = $(paper).find(".count").attr("data_id");
    //get the name of the paper
    var paper_name = $(paper).find(".name").html();
    
    //ask the user if they want to delete the paper
    window.xpress.modalAlert("confirm", "Delete Paper?",
      "Do you want to delete " + paper_name + " ?","info", 
      ['Yes, Delete Paper',
        "No, Cancel"])
    .then(function(data){
      //resolved
      //user clicked on "Yes, Delete Paper"
      
      //get the data to post to backend
      var post_data = {action:'delete_paper_new',
        data_id : data_id};
      
      //send the request to delete the paper, the server returns the list of
      //the papers availiable after deleting.
      $.post("ajax_api.php",post_data,function(data){
        
        //paper has been deleted
        //set the paper data to the response returned from the server
        window.xpress.paper.paper_data = data.resp;
        
        //clear the paper inputs
        $("#paper_details input").val("");
        $("#paper_details select").val("");
        
        //sow the new list of paper
        _this.paperFilter();
        
        //alert the user that paper has been deleted
        window.xpress.modalAlert("alert","Paper Deleted",
          "Paper " + paper_name + "has been deleted");
      }).fail(function(error){
        //failed to delete paper
        //Most likely due to internet connectivity issue
        window.xpress.modalAlert("alert","Error Deleting Paper",
          "There was an error deleting paper " + paper_name 
            + ". <br/>Please check your internet connection and try again","failure");
      });
    });
  }

  /*
   * Function called when Edit Paper is clicked
   *
   * Function called when Edit Paper is clicked
   */
  editPaper(){
    //get the highlighted paper
    var paper = $("#paper_table .quote_highlight");
    if(paper.length == 0){
      //paper han not been selected, so alert user
      window.xpress.modalAlert("alert","Please Select Paper",
        "Please select paper to edit by clciking on the name of the paper","failure");
      return;
    }
    
    //get the paper details
    var width = $(paper).find(".width").html();
    var height = $(paper).find(".height").html();
    var gsm = $(paper).find(".gsm").html();
    var name = $(paper).find(".name").html();
    var type = $(paper).find(".type").html();
    var brand = $(paper).find(".brand").html();
    
    //get the stationery price 
    var st_price = $(paper).find(".st_price").html();
    //get the id for the paper
    var data_id = $(paper).find(".count").attr("data_id");
    
    //set the values in the form for the user to edit
    $("#paper_details .width").val(width);
    $("#paper_details .height").val(height);
    $("#paper_details .gsm").val(gsm);
    $("#paper_details .brand").val(brand);
    $("#paper_details .type").val(type);
    $("#paper_details .data_id").val(data_id);
    $("#paper_details .st_price").val(st_price);
  }

  /*
   * Function called when "Apply PaperTo Job" is clicked 
   * 
   * Function called when "Apply PaperTo Job" is clicked 
   */
  choosePaper(){
    //get the highlighted paper
    var paper = $("#paper_table .quote_highlight");
    if(paper.length == 0){
      //paper han not been selected, so alert user
      window.xpress.modalAlert("alert","Please Select Paper",
        "Please select paper to edit by clciking on the name of the paper","failure");
      return;
    }
    
    //get the required details from the paper, including width, height, gsm,
    //name and stationery price
    var width = $(paper).find(".width").html();
    var height = $(paper).find(".height").html();
    var gsm = $(paper).find(".gsm").html();
    var name = $(paper).find(".name").html();
    var st_price = $(paper).find(".st_price").html();
    $(".paper_to_select").val(name).html();
    
    //find the row to which to apply the paper to
    var row = $(".paper_to_select").parent().parent();
    //set the width, height and gsm
    $(row).find(".width").val(width);
    $(row).find(".height").val(height);
    $(row).find(".paper_gsm input").val(gsm);
    
    //set the stationery price
    $(row).find(".paper_desc_amount").val(st_price);
    
    //remove paper_to_select class
    $(".paper_to_select").removeClass("paper_to_select");
    //hide the Paper Selection Modal
    $("#selectPaperModal").addClass("hide");
    
    //run the calculations
    window.calc.calculateAll();
  }

  /*
   * Function called when a paper row is clicked in Select Paper Modal
   * 
   * Function called when a paper row is clicked in Select Paper Modal
   * 
   * @param paper_row the html element which was clicked (the paper row clicked)
   */ 
  selectPaper(paper_row){
    //turn the html element into jquery object
    var paper = $(paper_row);
    //remove highlight from any row that it was previously added on
    $(".quote_highlight").removeClass("quote_highlight");
    
    //add highlight to the clicked paper
    $(paper).addClass("quote_highlight");
    
    //get the brand and type for the clicked paper
    var brand = $(paper).find(".brand").html();
    var type = $(paper).find(".type").html();
    
    //set the brand and type in paper details 
    $("#paper_details .brand").val(brand);
    $("#paper_details .type").val(type);
    
    //add animation to height, width and gsm
    $("#paper_details .height").addClass("animate-bg");
    $("#paper_details .width").addClass("animate-bg");
    $("#paper_details .gsm").addClass("animate-bg");
    
    //trigger change to filter the paper and show only those with the brand and
    //type
    $("#paper_details .brand").change();
  }
  
  /*
   * Function called when Adjust paper stock is clicked
   * 
   * Function called when Adjust paper stock is clicked
   */
  AdjustPaperStock(){
    let _this = this
    //get the highlighted paper
    var paper = $("#paper_table .quote_highlight")
    if(paper.length == 0){
      //paper han not been selected, so alert user
      window.xpress.modalAlert("alert","Please Select Paper",
        "Please select paper to adjust the stock for by clciking on the name of the paper","failure")
      return
    }
    const div_id = "#adjustPaperStockModal"
    const paper_name = $(paper).find(".name").html()
    const paper_stock = $(paper).find(".stock").html()
    const paper_id = $(paper).find(".data_id").attr("data_id")
    
    //paper stock has not been set so set it to zero
    if( paper_stock == "" ){
      window.xpress.paper.SetInitialStockToZero(paper_id, paper_name)
    }
    $(div_id + " select option").show()
    $(div_id + " button").show()
    if(paper_stock == ""){
      $($(div_id + " .adj_type option")[2]).hide()
      $($(div_id + " .adj_type option")[3]).hide()
      $(div_id + " .adj_type").val("initial_stock")
      $($(div_id + " .adj_reason option")[2]).hide()
      $($(div_id + " .adj_reason option")[3]).hide()
      $($(div_id + " .adj_reason option")[4]).hide()
      $($(div_id + " .adj_reason option")[5]).hide()
      $(div_id + " .adj_reason").val("initial_stock")
      $(div_id + " .adjust_paper_stock").hide()
    }
    else{
      $($(div_id + " .adj_type option")[1]).hide()
      $($(div_id + " .adj_reason option")[1]).hide()
      $(div_id + " .set_initial_paper_stock").hide()
    }
    $(div_id + " .paper_name_stock").html(paper_name)
    $(div_id + " .paper_name_stock").attr("data_id",paper_id)
    $(div_id + " .current_stock").html(paper_stock)
    $(div_id + " .qty_sheets").html("")
    $(div_id).show()
  }
  
  SetInitialStockToZero( paper_id, paper_name ){
    let _this = this
    let params = { action: 'set_initial_stock',
      qty: 0,
      packet: 1,
      notes: '',
      paper_id,
      paper: paper_name,
      sheets:0
    }
    $.post("ajax_api.php",params, function(data){
    })
  }

  /*
   * Function to set Ininila Paper Stock
   * 
   * Function to set Ininila Paper Stock
   */
  setInitialPaperStock(){
    let _this = this
    const div_id = "#adjustPaperStockModal"
    const qty = parseInt($(div_id + " .add_qty").val())
    const packet = parseInt($(div_id + " .packet").val())
    const notes = $(div_id + " .stock_notes").val()
    const paper = $(div_id + " .paper_name_stock").html()
    const paper_id = $(div_id + " .paper_name_stock").attr("data_id")
    const sheets = $(div_id + " .qty_sheets").html()
    if(isNaN(qty) || isNaN(packet)){
      window.xpress.modalAlert("alert","Enter quantity and select packet type",
        `Please enter quantity and select packet`, "failure")
      return
    }
    const action = "set_initial_stock"
    const params = {action, qty, packet, notes, paper, paper_id, sheets}
    $.post("ajax_api.php",params, function(data){
      window.xpress.paper.paper_data = data.resp
      window.xpress.paper.paperFilter()
      window.xpress.modalAlert("alert","Initial Stock Added",
        `Initial Stock added Successfully`, "success")
      $(div_id + " input").val("")
      $(div_id + " select").val("")
      $(div_id + " .qty_sheets").html("")
      $(div_id).hide()
    })
  }

  setAdjustPaperStock(){
    let _this = this
    const div_id = "#adjustPaperStockModal"
    const qty = parseInt($(div_id + " .add_qty").val())
    const packet = parseInt($(div_id + " .packet").val())
    const notes = $(div_id + " .stock_notes").val()
    const paper = $(div_id + " .paper_name_stock").html()
    const paper_id = $(div_id + " .paper_name_stock").attr("data_id")
    const sheets = $(div_id + " .qty_sheets").html()
    const adj_type = $(div_id + " .adj_type").val()
    const adj_reason = $(div_id + " .adj_reason").val()
    if(isNaN(qty) || isNaN(packet)){
      window.xpress.modalAlert("alert","Enter quantity and select packet type",
        `Please enter quantity and select packet`, "failure")
      return
    }
    if(adj_type == ""){
      window.xpress.modalAlert("alert","Select Adjustment Type",
        `Please select adjustment type`, "failure")
      return
    }
    const action = "adjust_paper_stock"
    const params = {action, qty, packet, notes, paper, paper_id, sheets, 
      adj_type, adj_reason}
    $.post("ajax_api.php",params, function(data){
      window.xpress.paper.paper_data = data.resp
      window.xpress.paper.paperFilter()
      window.xpress.modalAlert("alert","Initial Stock Added",
        `Initial Stock added Successfully`, "success")
      $(div_id + " input").val("")
      $(div_id + " select").val("")
      $(div_id + " .qty_sheets").html("")
      $(div_id).hide()
    })
  }

  AddPaperStock(){
    //get the highlighted paper
    var paper = $("#paper_table .quote_highlight")
    if(paper.length == 0){
      //paper han not been selected, so alert user
      window.xpress.modalAlert("alert","Please Select Paper",
        "Please select paper to adjust the stock for by clciking on the name of the paper","failure")
      return
    }
    const div_id = "#addPaperStockModal"

    //get paper name, paper id, and stock
    const paper_name = $(paper).find(".name").html()
    const width = $(paper).find(".width").html()
    const height = $(paper).find(".height").html()
    const gsm = $(paper).find(".gsm").html()
    const paper_stock = $(paper).find(".stock").html()
    const paper_id = $(paper).find(".data_id").attr("data_id")
    
    //initiial stock needs to be set before stock can be added
    if(paper_stock == ""){
      window.xpress.modalAlert("alert","Please Set Initial Paper Stock First",
        `Please Set Initial Paper Stock by clicking on "Adjust Paper Stock"`,"failure")
      return
    }
    
    //create the select drop down for the paper names
    let paper_name_select = $(div_id + " .sample-row .paper_name_stock select")
    $(paper_name_select).html('<option value="">Select</option>')
    
    //add papers with initial stock set to the select box
    window.xpress.paper.paper_data.forEach(function(d){
      if(d.stock != null){
        let html = '<option value="'+d.id + '" stock="' + d.stock + '" ' +
          'width="' + width + '" height="' + height + '" gsm="' + gsm + '">'
          + d.name + '</option>'
        $(paper_name_select).append(html)
      }
    })
    let sample = $(div_id + " .sample-row").html()
    //remove previous rows from table
    $(div_id + " .table .data-row").remove()
    //add the new row
    $(div_id + " .table").append(sample)
    $(div_id + " .table .table-row .paper_name_stock select").val(paper_id) 
    $(div_id + " .createPOforPaper").hide()
    let last_row = $(div_id + " .table .table-row").last()
    $(last_row).find(".add_qty, .packet, input.cost").change(function(){
      window.xpress.paper.calcSheets(this)
    })
    $(last_row).click(function(){
      $(div_id + " .quote_highlight").removeClass("quote_highlight")
      $(this).addClass("quote_highlight")
    })
    $(last_row).find(".paper_name_stock select").change(function(){
      const stock = $(this).find("option:selected").attr("stock")
      $(last_row).find(".current_stock").html(stock)
    })
    $(last_row).find(".paper_name_stock select").change()
    $(div_id + " .po_number_div").hide()
    $("#addPaperStockModal").show()
  }

  AddPaperStockReasonChanged(element){
    const add_reason = $(element).val()
    const div_id = "#addPaperStockModal"
    $(div_id + " .po_number_div").hide()
      $(div_id + " .customer_div").hide()
    if(add_reason == "purchase"){
      $(div_id + " .po_number_div").show()
    }
    else if(add_reason == "provided by customer"){
      $(div_id + " .customer_div").show()
    }
  }

  addPaperRowForStock(){
    const div_id = "#addPaperStockModal"
    let sample = $(div_id + " .sample-row").html()
    $(div_id + " .table").append(sample)
    $(div_id + " .table .table-row").last().find(".paper_name_stock select").val("") 
    let last_row = $(div_id + " .table .table-row").last()
    $(last_row).find(".add_qty, .packet").change(function(){
      window.xpress.paper.calcSheets(this)
    })
    $(last_row).find(".paper_name_stock select").change(function(){
      const stock = $(this).find("option:selected").attr("stock")
      $(last_row).find(".current_stock").html(stock)
    })
    $(last_row).click(function(){
      $(div_id + " .quote_highlight").removeClass("quote_highlight")
      $(this).addClass("quote_highlight")
    })
  }

  removePaperRowForStock(){
    const div_id = "#addPaperStockModal"
    $(div_id + " .quote_highlight").remove()
  }

  createGRN(){
    let po_num = ""
    let customer_id = ""
    let vendor_id = ""
    const div_id = "#addPaperStockModal"
    const reason = $(div_id + " select.add_reason").val()
    if(reason == "purchase"){
      vendor_id = $(div_id + " .vendors").val()
      po_num = $(div_id + " .po_number").val()
      if( !vendor_id ){
        window.xpress.modalAlert("alert","Please select vendor",
          'Please select vendor', "failure")
          return
      }
    }
    else if(reason == "provided by customer"){
      customer_id = $(div_id + " .po_customer_sel").attr("data-id")
      if( !customer_id ){
        window.xpress.modalAlert("alert","Please select customer",
          'Please select customer', "failure")
          return
      }
    }
    const notes = $(div_id + " .notes").val()
    let papers = []
    $(div_id + " .table .data-row").each(function(i,d){
      const paper_id = $(d).find(".paper_name_stock select").val()
      const qty = $(d).find(".add_qty").val()
      const packet = $(d).find(".packet").val()
      const qty_sheets = $(d).find(".qty_sheets").html()
      const cost = $(d).find("input.cost").val()
      papers.push({paper_id, qty, packet, qty_sheets, cost})
    })
    const action = "create_grn_paper"
    $.post("ajax_api.php",{action,vendor_id,customer_id,reason,po_num,notes,papers},
      function(data){
      window.xpress.paper.paper_data = data.resp
      window.xpress.paper.paperFilter()
      window.xpress.modalAlert("alert","Paper Added",
        `Paper Stock added Successfully`, "success")
      $(div_id).hide()
    })
  }

  /*
   * calculates sheets 
   *
   * calculates sheets from packet and qty
   */
  calcSheets(element){
    //turn element into jquery element
    element = $(element)
    const row = $(element).parent().parent().parent()
    const qty = $(row).find(".add_qty").val()
    const packet = $(row).find(".packet").val()
    const sheets = qty * packet
    const selected = $(row).find(".paper_name_stock select option:selected")
    const width = $(selected).attr("width")
    const height = $(selected).attr("height")
    const gsm = $(selected).attr("gsm")
    const cost = $(row).find("input.cost").val()
    if(!isNaN(sheets)){
      $(row).find(".qty_sheets").html(sheets)
      const kg = sheetToKG(width, height, gsm, sheets)
      $(row).find(".quantity_kg").html(kg)
      if( cost != "" ){
        const cost_kg = Math.floor(( cost / kg ) * 100) / 100
        const cost_sheets = Math.floor(( cost / sheets ) * 100) / 100
        $(row).find(".cost_kg").html(cost_kg)
        $(row).find(".cost_sheet").html(cost_sheets)
      }
    }
  }

  /*
   * Function that filters paper to show just the paper with the selected
   * details
   * 
   * Function that filters paper to show just the paper with the selected
   * details
   */
  paperFilter(){
    //get the width, height and gsm
    var width = $("#paper_details .width").val();
    var height = $("#paper_details .height").val();
    var gsm = $("#paper_details .gsm").val();
    
    //create width and height combination for the paper name
    var width_height = "";
    if(width != "" && height != ""){
      width_height = width + '" x ' + height + '"';
    }
    
    //get the brand of the paper
    var brand = $("#paper_details .brand").val().toUpperCase();
    if(brand == "NEW"){
      //user wants to add a new paper brand
      //hide the select box for brand
      $("#paper_details .brand").addClass("hide");
      //show the input to add the new brand
      $("#paper_details .new_brand").removeClass("hide");
      //focus the cursor to the input so the user can start typing immediately
      $("#paper_details .new_brand").focus();
    }
    
    //get the type of the paper
    var type = $("#paper_details .type").val().toUpperCase();
    if(type == "NEW"){
      //user wants to add a new paper type
      //hide the select box for paper type
      $("#paper_details .type").addClass("hide");
      //show the input to add the new type
      $("#paper_details .new_type").removeClass("hide");
      //focus the cursor to the input so the user can start typing immediately
      $("#paper_details .new_type").focus();
    }
    
    //set the animation for the inputs which are empty
    if(width != ""){
      //width is not empty so remove animation 
      $("#paper_details .width").removeClass("animate-bg");
    }
    else{
      //width is empty so set animation 
      $("#paper_details .width").addClass("animate-bg");
    }
    if(height != ""){
      //height is not empty so remove animation 
      $("#paper_details .height").removeClass("animate-bg");
    }
    else{
      //height is empty so set animation 
      $("#paper_details .height").addClass("animate-bg");
    }
    if(gsm != ""){
      //gsm is not empty so remove animation 
      $("#paper_details .gsm").removeClass("animate-bg");
    }
    else{
      //gsm is empty so set animation 
      $("#paper_details .gsm").addClass("animate-bg");
    }
    if(type != ""){
      //type is not empty so remove animation 
      $("#paper_details .type").removeClass("animate-bg");
    }
    else{
      //type is empty so add animation 
      $("#paper_details .type").addClass("animate-bg");
    }
    
    //filter the paper 
    var data = window.xpress.paper.paper_data.filter(function(d){
      //if module is stationery and price is not set then return false 
      //this hides all the general paper (those without price)
      if(window.module == "stationery" && 
        ( d.st_price == ""    ||
          d.st_price == null  )){
        return(false);
      }
      
      //check each of the variables and return false if any of the inputs do not
      //match the paper
      if(( type   != "" && type   != d.type   ) ||
         ( brand  != "" && brand  != d.brand  ) ||
         ( width  != "" && width  != d.width  ) ||
         ( height != "" && height != d.height ) ||
         ( gsm    != "" && gsm    != d.gsm    ) ){
        return(false);
      }
      //paper matches the variables, so return true
      return(true);
    });
    
    //get the selected paper
    var selected = $("#paper_table .quote_highlight");
    //if paper is selected
    if(selected.length == 1){
      //get id of the paper
      var data_id = $(selected).find(".count").attr("data_id");
      //load the filtered data into the table
      window.xpress.loadData("#paper_table", data);
      //add the highlight to the selected paper 
      $("#paper_table .data-row .count[data_id|='"+data_id+"']").parent()
        .addClass("quote_highlight");
    }
    else{
      //load the filtered data into the 
      window.xpress.loadData("#paper_table", data);
    }
    window.xpress.user.enablemmHovering();
  }
  
  /*
   * Gets the paper object by paper name
   * 
   * Gets the paper object by paper name
   * 
   * @param string paper name of paper to search for
   * */
  getPaperByName(paper){
    //filter the paper 
    let data = window.xpress.paper.paper_data.filter(function(d){
      if(d.name == paper){
        return(true)
      }
      return(false)
    });
    return(data)
  }

  /*
   * Function called when a new paper type is added
   *
   * Function called when a new paper type is added by entering the name of the
   * paper type
   */
  addNewType(){
    //get the paper type to add
    var type = $("#paper_details .new_type").val().toUpperCase();
    //create the new option for the select dropdown
    var html = '<option value="' + type + '" class="data-option">' + type + '</option>';
    //add the new option to the paper type select dropdown
    $("#paper_details .type").append(html);
    //select the new paper type
    $("#paper_details .type").val(type);
    //empty the new paper type input
    $("#paper_details .new_type").val("");
    //trigger change of the type to filter the paper table
    $("#paper_details .type").change();
    //hide the input for the new paper type
    $("#paper_details .new_type").addClass("hide");
    //show the select dropdown for paper type
    $("#paper_details .type").removeClass("hide");
  }

  /*
   * Function called when a new paper brand is added
   *
   * Function called when a new paper brand is added by entering the name of the
   * paper brand
   */
  addNewBrand(){
    //get the paper brand to add
    var brand = $("#paper_details .new_brand").val().toUpperCase();
    //create the new option for the select dropdown
    var html = '<option value="' + brand + '" class="data-option">' + brand + '</option>';
    //add the new option to the paper brand select dropdown
    $("#paper_details .brand").append(html);
    //select the new paper brand
    $("#paper_details .brand").val(brand);
    //empty the new paper brand input
    $("#paper_details .new_brand").val("");
    //trigger change of the brand to filter the paper table
    $("#paper_details .brand").change();
    //hide the input for the new paper brand
    $("#paper_details .new_brand").addClass("hide");
    //show the select dropdown for paper brand
    $("#paper_details .brand").removeClass("hide");
  }

  /*
   * Function called when clear button is clicked in Select Modal Paper
   *
   * Function called when clear button is clicked in Select Modal Paper
   */
  clearPaper(){
    //clear the paper selection inputs
    $("#paper_details input").val("");
    $("#paper_details select").val("");
    //add the background animation
    $("#paper_details .type").addClass("animate-bg");
    $("#paper_details .width").addClass("animate-bg");
    $("#paper_details .height").addClass("animate-bg");
    $("#paper_details .gsm").addClass("animate-bg");
    //filter and update the paper table
    window.xpress.paper.paperFilter();
  }

  /*
   * Function to add a new paper
   * 
   * Function to add a new paper, this function is called when "Save Paper To
   * Library" is clicked
   */
  addNewPaper(){
    var _this = window.xpress.paper;
    //get the details of the paper to add
    var width = $("#paper_details .width").val();
    var height = $("#paper_details .height").val();
    var gsm = $("#paper_details .gsm").val();
    var st_price = $("#paper_details .st_price").val();
    //get the brand and type and convert to uppercase
    var brand = $("#paper_details .brand").val().toUpperCase();
    var type = $("#paper_details .type").val().toUpperCase();
    
    //get the selected paper
    var selected = $("#paper_table .quote_highlight");
    
    //if brand is empty set brand to regular
    if(brand == ""){
      brand = "REGULAR";
    }
    
    //check if all the required data has been filled
    if( type == "" || width == "" || height == "" || gsm == "" ||
      ( window.module == "stationery" && st_price == "")){
      //at least one of the required data is missing
      if(window.module == "stationery"){
        alert_text = "Please select type of paper and enter paper width, " 
          + "height, gsm and Paper Price Per Sheet to add paper";
      }
      else{
        alert_text = "Please select type of paper and enter paper width, " 
          + "height, and gsm to add paper";
      }
      window.xpress.modalAlert("alert","Paper not Saved",
        alert_text, "failure");
      return;
    }
    
    //create the paper name
    //create the width and height combination
    var width_height = "";
    if(width != "" && height != ""){
      width_height = width + 'x' + height;
    }
    //add gsm to the gsm of the paper
    var gsm_h = "";
    if(gsm != ""){
      gsm_h = gsm+"gsm";
    }
    //create the full paper name
    var paper_name = type  + ' ' + width_height + ' ' + gsm_h + ' ' + brand;
    
    //filter the data to check if the paper has already been added
    var data = window.xpress.paper.paper_data.filter(function(d){
      if(( type   != "" && type   != d.type   ) ||
         ( brand  != "" && brand  != d.brand  ) ||
         ( width  != "" && width  != d.width  ) ||
         ( height != "" && height != d.height ) ||
         ( gsm    != "" && gsm    != d.gsm    ) ){
        return(false);
      }
      return(true);
    });
    
    //get the id of the paper to edit
    var data_id = $("#paper_details .data_id").val();
    
    //paper is already added 
    if( data.length > 0 ){
      if( window.module != "stationery" ){
        //the paper is already added and not in stationery module so alert user
        //and return
        window.xpress.modalAlert("alert","Paper is already added",
          "The paper " + paper_name + " is already availiable. To edit the paper "
          +" click the paper to select it, then click on the EDIT button"
          , "failure");
        return;
      }
      
      //we are in stationery so we may need to change the price
      if( data_id == "" ){
        //data_id is empty which means user did not click Edit before so warn
        //user and return
        window.xpress.modalAlert("alert","Paper is already added",
          "The paper " + paper_name + " is already availiable. To edit the paper "
          +" click the paper to select it, then click on the EDIT button"
          , "failure");
        return;
      }
      if( data_id != data[0].id ){
        //the data_id is not the same as that of the paper which is left after
        //filtering the data, which means that the user has edited the details
        //of the paper into another paper which already exists. So alert the
        //user and return
        window.xpress.modalAlert("alert","Paper is already added",
          "The paper " + paper_name + " is already availiable. To edit the paper "
          +" click the paper to select it, then click on the EDIT button"
          , "failure");
        return;
      }
    }
    
    //set the action to add paper
    var action = 'add_paper_new';
    
    //data id is set so set action to update the paper
    if(data_id != ""){
      action = 'update_paper_new';
    }
    //get the data to post
    var post_data = {action:action,
      width : width,
      data_id : data_id,
      height : height,
      brand : brand,
      type : type,
      gsm : gsm,
      st_price : st_price,
      name : paper_name};
    //send the post to the server
    $.post("ajax_api.php",post_data,function(data){
      //paper added, the erver returns the new list of papers
      ////set the new papers to the paper_data
      window.xpress.paper.paper_data = data.resp;
      //clear out the paper selection inputs
      $("#paper_details input").val("");
      $("#paper_details select").val("");
      
      //run the paper filter to load the new paper list into tthe table
      _this.paperFilter();
      //
      //alert the user that the paper has been added
      window.xpress.modalAlert("alert","Paper Added",
        "Paper " + paper_name + " added successfully.");
    }).fail(function(error){
      //failed to add paper
      //Most likely due to internet connectivity issue
      window.xpress.modalAlert("alert","Error Adding Paper",
        "There was an error Adding paper " + paper_name 
          + ". <br/>Please check your internet connection and try again","failure");
    });
  }

  /*
   * Function to generate Select dropdowns for paper type and paper brand
   * 
   * Function to generate Select dropdowns for paper type and paper brand
   */
  generatePaperBrandTypeSelection(){
    //get the data for the paper
    var data = window.xpress.paper.paper_data;
    
    //get the unique array of paper types sorted alphabetically
    const types = [... new Set(data.map(item => item.type))].sort();
    //get the unique array of paper brands sorted alphabetically
    const brands = [... new Set(data.map(item => item.brand))].sort();
    //load the data to the select boxes for paper type and paper brand
    
    window.xpress.loadSelectDataSimple("#paperType",types);
    window.xpress.loadSelectDataSimple("#paperBrand",brands);
  }


  addWarehouse(){
    var warehouse = $("#warehouse").val();
    if(warehouse == ""){
      alert("Please enter warehouse name to add");
      return;
    }
    var post_params = { action : 'add_warehouse',
      name : warehouse
    };
    $.post("ajax_api.php", post_params, function(data){
      window.xpress.loadData("#warehouse_table",data.resp);
    });
  }

  saveWarehouse(){
    var name = $("#warehouse_name").val();
    var warehouse_id = $("#warehouse_id").val();
    if(paper_brand == ""){
      alert("Please enter warehouse name");
      return;
    }
    var post_params = { action : 'update_warehouse',
      name : name,
      warehouse_id : warehouse_id
    };
    $.post("ajax_api.php", post_params, function(data){
      window.xpress.loadData("#warehouse_table",data.resp);
    });
  }
}
