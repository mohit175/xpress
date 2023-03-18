/**
 * File for the user javascript functions
 * 
 * File containing the javascript functions for users
 *
 * @package xpress
 * @author Anil Desai
 * @copyright Express Tech
 * @version 0.1
 */

/**
 * setup function for user
 * 
 * setup the page for the user by doing the following things
 * -> sets the width of tables
 * -> sets the heartbeat
 * -> sets the window.module
 * -> loads the paper
 *
 */
$(document).ready(function(){
  //detect mobile
  const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)
  if(isMobile){
    $("#main-page").addClass("mobile")
    $(".bottom-row.dashboard").addClass("mobile")
  }
  
  //heart beat set at 5 minutes
	const heart_beat_interval = 1000 * 60 * 5;
  
  //create the user object
  window.xpress.user = new USER
  
  //enable changing the Quote Total
  enableTotalChange();
  
	//set heartbeat to keep connected to server
  setInterval(function(){
    heartBeat();
  }, heart_beat_interval);
  
  //add css classes to those inputs that do not have it
	addClasses();
	
  //set the calculator class
  if(window.module != "dashboard"){
    window.calc = new calculator();
  }
  
  //get user details from the server
  getUserDetails();
	
  //load the quotation if required
  window.xpress.user.getQuote();
  
  //load custommers
  window.xpress.user.loadCustomers();
  
  getQuotes();
  window.screen_defaults_loaded = false;
  loadScreenDefaults();
  
  getQuotesLibrary();
  
  if(window.module == "stationery"){
    $($("#min_print_charges option")[1]).css("display","none")
    $($("#min_print_charges option")[2]).css("display","none")
  }
  if(window.module == "stationery"){
    $("#libraryModal .general").hide();
    $("#paperModal").hide();
    $("#stationeryPaperModal").show();
  }
  else{
    $("#libraryModal .stationery").hide();
    $(".st_price").hide();
    $("#paper_details .st_price").parent().hide();
  }
  if(window.module == "book"){
    $("#libraryModal .book_binding").show();
  }
  if(window.module == "binding"){
    $("#libraryModal .book_binding").show();
    $("#libraryModal .Preferences_Minimums").hide();
    $("#libraryModal .HSN_Codes").hide();
    $("#libraryModal .Spot_color").hide();
    $("#libraryModal .Paper_library").hide();
    $("#libraryModal .Paper_library").hide();
    $("#libraryModal .vendors").hide();
    $("#libraryModal .warehouse").hide();
    $("#libraryModal .stationery").hide();
  }
  window.xpress.loadTemplateData("paper");
  window.xpress.enableTemplateActions("paper");
  $(".selectPaper").click(function(e){
    $(".paper_to_select").removeClass("paper_to_select");
    $(this).addClass("paper_to_select");
    $("#selectPaperModal").show();
    $("#paper_details input").val("");
    $(".animate-bg").removeClass("animate-bg");
    $("#paper_table .quote_highlight").removeClass("quote_highlight");
    $("#paper_details .width").change();
  });
  $(".change_print_run").click(function(e){
    $("#change_print_run").addClass("animate-bg");
  });
  enableBasicActions()
});

//close modal on pressing Escape
$(document).keyup(function(e) {
    if (e.key === "Escape") {
      $(".modal").hide();
      $("#pdf_div").hide();
      $("#logout_div").hide();
    }
});
function enableTotalChange(){
  $(".total-quote-a").click(function(e){
  if($("#edit_total_quote").length >0){
    return;
  }
  var quote = $(this).html();
  $(this).html('<input value="'+quote+'" id="edit_total_quote">');
  $("#edit_total_quote").focus();
  $("#edit_total_quote").blur(function(e){
    $(this).change();
  });
  $("#edit_total_quote").change(function(e){
    var new_quote = $(this).val();
    if(new_quote == quote){
      $(".total-quote-a").html(quote);
      return;
    }
    var new_quote = parseInt(new_quote.replaceAll(',',''));
    if(isNaN(new_quote)){
      window.xpress.modalAlert("alert","Please enter a number",
        "Please enter a number", "failure");
      $(".total-quote-a").html(quote);
      return;
    }
    if(new_quote < window.calc.basic_cost_with_exp.a){
      window.xpress.modalAlert("alert","Total Quote cannot be less than Basic Cost",
        "Total Quote cannot be less than Basic Cost.", "failure");
      $(".total-quote-a").html(quote);
      return;
    }
    var basic_cost = Math.round(window.calc.basic_cost_with_exp.a);
    profit = new_quote - basic_cost;
    var order = new_quote.toString().length;
    profit_in_percent = Math.round((profit/basic_cost)*Math.pow(10,order))/Math.pow(10,order-2);
    $(".profit_type").val("percernt");
    $(".profit_inp").val(profit_in_percent);
    window.calc.calculateAll();
  });
});
}

function addClasses(){
$(".input_table select").each(function(i,d){
  if(typeof($(d).attr("class")) == "undefined" || $(d).attr("class") == ""){
    $(d).attr("class", "sel_" + $(d).parent().attr("class"));
  }
});
$(".input_table input").each(function(i,d){
  if(typeof($(d).attr("class")) == "undefined" || $(d).attr("class") == ""){
    $(d).attr("class", "inp_" + $(d).parent().attr("class"));
  }
});
}

async function getNewBindingNumber(){
  await $.post("ajax_api.php",{action:"get_new_binding_num"},function(data){
    const binding_num = data.resp
    const binding_id = binding_num.quote_num_year
    $("#quote_no").val(binding_id)
    $("#quote_date").val("")
    const mysql_date = getDate()
    const date = formatDate(mysql_date)
    $("#quote_date").val(date)
  })
}

async function getScreenShot(){
  $("#pdf_div").hide()
  $("#loadingModal").show();
  $("#pdf_desc_div").append('<div id="temp_desc_pdf"></div>');
  $("#pdf_desc").hide();
  $("#temp_desc_pdf").html($("#pdf_desc").val());
  $("body").append('<div id="screenshot"></div>');
  $("body").append('<div id="final_screenshot"></div>');
  var date = new Date;
  var day = date.getDate();
  if(day < 10){
    day = '0' + day;
  }
  var month = date.getMonth() + 1;
  if(month < 10){
    month = '0' + month;
  }
  var year = getIndiaYear(date);
  var quote_num = $("#quote_no").val();
  if(quote_num != ""){
    quote_num = "_" + quote_num;
  }
  var filename = year + "_" + month + "_" + day + quote_num + ".pdf";
  if(window.module != "binding"){
    $(".job_size_inputs").each(function(i,d){
      var inputs = [];
      $(this).find("input").each(function(inp_i,inp_d){
        inputs.push($(this).val());
      });
      var input = inputs.join(' x ');
      $(this).find(".middle-x").html(input);
      $(this).find("input").addClass("hide");
    });
  }
  else{
    await getNewBindingNumber()
  }
  await html2canvas(document.querySelector(".settings_top_row")).then(canvas => {
    document.querySelector("#screenshot").appendChild(canvas)
  });
  $("#pdf_desc").show();
  $("#temp_desc_pdf").remove();
  if(window.module != "binding"){
    await html2canvas(document.querySelector(".input_table")).then(canvas => {
      document.querySelector("#screenshot").appendChild(canvas)
    });
    await html2canvas(document.querySelector(".middle-row .results")).then(canvas => {
      document.querySelector("#screenshot").appendChild(canvas)
    });
  }
  else{
    await html2canvas(document.querySelector("#BindingModal")).then(canvas => {
      document.querySelector("#screenshot").appendChild(canvas)
    });
  }
  await html2canvas(document.querySelector("#screenshot")).then(canvas => {
    document.querySelector("#final_screenshot").appendChild(canvas)
  });
  var width = $("#final_screenshot canvas").width();
  var height = $("#final_screenshot canvas").height();
  var max_width = width;
  var max_height = height;
  var screen_shots = [];
  var canvas = document.querySelector("#final_screenshot canvas");
  var imgData = canvas.toDataURL("image/jpeg", 1.0);
  screen_shots.push({imgData:imgData,width:width,height:height});
  $("#final_screenshot").remove();
  $("#screenshot").remove();
  if(window.module != "binding"){
    $("#jobSizeModal").show();
    $("body").append('<div id="screenshot"></div>');
    await html2canvas(document.querySelector("#jobSizeModal .modal-content")).then(canvas => {
      document.querySelector("#screenshot").appendChild(canvas)
    });
    $(".job_size_inputs input").removeClass("hide");
    $(".middle-x").html("x");
    canvas = document.querySelector("#screenshot canvas");
    imgData = canvas.toDataURL("image/jpeg", 1.0);
    width = $("#screenshot canvas").width();
    height = $("#screenshot canvas").height();
    if(height > max_height){
      max_height = height; 
    }
    screen_shots.push({imgData:imgData,width:width,height:height});
    $("#screenshot").remove();
    $(".middle-x").html("x");
    $("#jobSizeModal").hide();
    $("#paperRequirementModal").show();
    $("body").append('<div id="screenshot"></div>');
    await html2canvas(document.querySelector("#paperRequirementModal .modal-content")).then(canvas => {
      document.querySelector("#screenshot").appendChild(canvas)
    });
    canvas = document.querySelector("#screenshot canvas");
    imgData = canvas.toDataURL("image/jpeg", 1.0);
    width = $("#screenshot canvas").width();
    height = $("#screenshot canvas").height();
    if(height > max_height){
      max_height = height; 
    }
    screen_shots.push({imgData:imgData,width:width,height:height});
    $("#screenshot").remove();
    $("#paperRequirementModal").hide();
  }
  if(window.module == "book"){
    $("#book_binding").click();
    $("body").append('<div id="screenshot"></div>');
    await html2canvas(document.querySelector("#BindingModal .modal-content")).then(canvas => {
      document.querySelector("#screenshot").appendChild(canvas)
    });
    canvas = document.querySelector("#screenshot canvas");
    imgData = canvas.toDataURL("image/jpeg", 1.0);
    width = $("#screenshot canvas").width();
    height = $("#screenshot canvas").height();
    if(height > max_height){
      max_height = height; 
    }
    screen_shots.push({imgData:imgData,width:width,height:height});
    $("#screenshot").remove();
    $("#BindingModal").hide();
  }
  const promise = new Promise((resolve,reject) => {
    if( window.module == "binding" ){
      resolve(1);
    }
    if( window.module == "calendar" ||
        window.module == "stationery"){
      resolve(1);
    }
    if(window.module == "book"){
      var process_cost = ".process_cost";
    }
    else{
      var process_cost = "#inputs_rows .process_cost";
    }
    var rows = $(process_cost).length;
    $(process_cost).each(async function(i,d){
      $(d).click();
      $("body").append('<div id="screenshot"></div>');
      await html2canvas(document.querySelector("#inputsModal .modal-content")).then(canvas => {
        document.querySelector("#screenshot").appendChild(canvas)
      });
      canvas = document.querySelector("#screenshot canvas");
      imgData = canvas.toDataURL("image/jpeg", 1.0);
      width = $("#screenshot canvas").width();
      height = $("#screenshot canvas").height();
      if(height > max_height){
        max_height = height; 
      }
      screen_shots.push({imgData:imgData,width:width,height:height});
      $("#screenshot").remove();
      if(i == rows-1){
        $("#inputsModal").hide();
        resolve(1);
      }
    });
  });
  promise.then(function(v){
    var pdf = new jspdf.jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [max_width+20, max_height+20]
    });
    screen_shots.forEach(function(d,i){
      if(i > 0){
        pdf.addPage({
          orientation: "landscape",
          unit: "px",
          format: [max_width+20, max_height+20]
        });
      }
      var x = (max_width - d.width + 20)/2;
      var y = (max_height - d.height + 20)/2;
      pdf.addImage(d.imgData, 'JPEG', x, y, d.width, d.height);
    });
    $("#loadingModal").hide();
    pdf.save(filename);
    $("#final_screenshot").remove();
    $("#screenshot").remove();
  });
}

function getIndiaYear(date){
var month = date.getMonth();
var year = date.getFullYear();
if(month < 3){
  var year2 = year - 1;
  var india_year = year2.toString().slice(2) + year.toString().slice(2);
}
else{
  var year2 = year + 1;
  var india_year = year.toString().slice(2) + year2.toString().slice(2);
}
return(india_year);
}

function getInputs(){
var inputs = [];
var quantity_a = $("#quantity_a").val();
var quantity_b = $("#quantity_b").val();
var quantity_c = $("#quantity_c").val();
var job_ref = $("#job_ref").val();
var pdf_desc = $("#pdf_desc").val();
var min_print_charges = $("#min_print_charges").val();
var print_calculation_every = $("#print_calculation_every").val();
if( typeof(window.calc) == "undefined" ||
    typeof(window.calc.print_run_length) == "undefined"){
  if(window.module == "stationery"){
    var print_run = $("#print_master_run_length").val().replace(",","");
  }
  else{
    var print_run = $("#print_run_length").val().replace(",","");
  }
}
else{
  var print_run = window.calc.print_run_length;
}
var bind_res = "";
if(window.module == "book" &&
  typeof(window.bind_res) != "undefined"){
  bind_res = window.bind_res;
}
var job_size = {};
$(".settings_top .job_size_inputs input").each(function(){
  var css_class = $ (this).attr("class");
  var value = $(this).val();
  job_size[css_class] = value;
});
inputs[0] = {
  quantity_a,
  quantity_b,
  quantity_c,
  job_ref,
  pdf_desc,
  bind_res,
  print_run,
  min_print_charges,
  print_calculation_every,
  job_size
};
if(window.module == "book"){ 
  var title_inputs = {};
  $("#book_title input, #book_title select").each(function(inp_id,inp){
    var inp_class = $(inp).attr("class");
    var inp_value = $(inp).val();
    inp_class = inp_class.replace("hide","");
    inp_class = inp_class.replace("input-locked","");
    inp_class = inp_class.trim();
    if($(inp).hasClass("screen_default")){
      inp_class = inp_class.replace("screen_default","");
      inp_class = inp_class.replace("js-disabled","");
      inp_class = inp_class.trim();
    }
    title_inputs[inp_class] = inp_value;
  });
  var process = $("#book_title .process_cost").attr("process");
  if(typeof(process) != "undefined"){
    title_inputs["process_data"] = process;
  }
  inputs[1] = title_inputs;
  var binding_inputs = {};
  $("#binding_inputs input, #binding_inputs select").each(function(inp_id,inp){
    var inp_class = $(inp).attr("class");
    var inp_value = $(inp).val();
    if($(inp).hasClass("screen_default")){
      inp_class = inp_class.replace("screen_default","");
      inp_class = inp_class.trim();
    }
    binding_inputs[inp_class] = inp_value;
  });
  inputs[2] = binding_inputs;
}
var input_table_rows = $("#inputs_rows tr");
input_table_rows.each(function(row_id,row){
  var row_inputs = {};
  $(row).children("td").each(function(column_id,column){
    $(column).children("input").each(function(inp_id,inp){
      var inp_class = $(inp).attr("class");
      var inp_value = $(inp).val();
      inp_class = inp_class.replace("screen_default","");
      inp_class = inp_class.replace("js-disabled","");
      inp_class = inp_class.replace("input-locked","");
      inp_class = inp_class.replace("hide","");
      inp_class = inp_class.trim();
      row_inputs[inp_class] = inp_value;
    });
    $(column).children("select").each(function(inp_id,inp){
      var inp_class = $(inp).attr("class");
      var inp_value = $(inp).val();
      inp_class = inp_class.replace("screen_default","");
      inp_class = inp_class.replace("js-disabled","");
      inp_class = inp_class.replace("input-locked","");
      inp_class = inp_class.replace("hide","");
      inp_class = inp_class.trim();
      row_inputs[inp_class] = inp_value;
    });
  });
  if( window.module == "box"          ||
      window.module == "single_sheet" ){
    var process = $("#inputs_rows .process_cost").attr("process");
    if(typeof(process) != "undefined"){
      row_inputs["process_data"] = process;
    }
  }
  else if( window.module == "multi_sheet" ){
    var process = $($("#inputs_rows .process_cost")[row_id]).attr("process");
    if(typeof(process) != "undefined"){
      row_inputs["process_data"] = process;
    }
  }
  inputs.push(row_inputs);
});
return(inputs);
}

function applyBasicDefaults(){
  if(window.module == "dashboard"){
    return
  }
  if(window.module == "book"){
    $("#book_title .inp_total_pgs").val(4);
    $("#book_title .inp_total_pgs").addClass("screen_default");
    $("#inputs_rows .inp_ups_in_plate").val("1");
  }
  $(".process_cost").val('+');
  window.calc.calculateAll();
}

function loadScreenDefaults(){
  /*
   * screen defaults for binding should be loaded through binding.js
   */
  if(window.module == "binding"){
    return;
  }
if(window.paper_loaded == false){
  setTimeout(function(){
    loadScreenDefaults();
  },500);
  return;
}
$.post("ajax_api.php",{action: "load_screen_defaults", module: window.module},
  function(data){
    if(data.status == 'failed'){
      window.screen_defaults_loaded = true;
      applyBasicDefaults();
      return;
    }
    $(".js-disabled").removeAttr("readonly");
    $(".js-disabled").removeClass("js-disabled");
    $("#customer").removeAttr("disabled");
    var inputs = data.inputs;
    var top_inputs = inputs.shift();
    if(window.module == "book"){
      var titles = inputs.shift();
      var title_keys = Object.keys(titles);
      title_keys.forEach(function(key){
        if(titles[key] !==""){
          $("#book_title ." + key).val(titles[key]);
          $("#book_title ." + key).addClass("screen_default");
        }
      });
    }
    $("#quantity_a").val(top_inputs.quantity_a);
    $("#quantity_b").val(top_inputs.quantity_b);
    $("#quantity_c").val(top_inputs.quantity_c);
    $("#job_ref").val(top_inputs.job_ref);
    $("#pdf_desc").val(top_inputs.pdf_desc);
    if($("#add_row").length == 1){
      $("#add_row").val(inputs.length);
      $("#add_row").change();
    }
    var input_table_rows = $("#inputs_rows tr");
    inputs.forEach(function(row,row_id){
      var keys = Object.keys(row);
      keys.forEach(function(key){
        if(row[key] !== ""){
          var inp = $(input_table_rows[row_id]).find('.' + key);
          $(inp).val(row[key]);
          $(inp).addClass("screen_default");
        }
      });
    });
    $("#inputs_rows input").each(function(i,d){
      if($(this).val()=="X"){
        $(this).addClass("js-disabled");
        $(this).attr("readonly","readonly");
      }
    });
    window.screen_defaults_loaded = true;
    if( window.module == "book" || window.module == "binding" ){
      window.binding.loadBindingScreenDefaults();
    }
    window.calc.calculateAll();
  },"json");
}

function saveScreenDefaults(){
var inputs = getInputs();
if(window.module == "book"){
  inputs.splice(2,1);
}
$.post("ajax_api.php",{action: "save_screen_defaults", module: window.module,
inputs: inputs},
  function(data){
    loadScreenDefaults();
  },"json");
}


function applyFactoryDefaults(){
var rows = $("#inputs_rows tr");
for(var i = 1; i < rows.length; i++){
  $(rows[i]).remove();
}
$("select").val('');
$("input").val('');
$("textarea").val('');
$("#add_row").val('+');
$(".minus.remove").hide();
$(".screen_default").removeClass("screen_default");
$(".js-disabled").removeAttr("readonly");
$(".js-disabled").removeClass("js-disabled");
$("#customer").removeAttr("disabled");
$(".min_print_charges").val("1000");
if(window.module == "book"){
  $("#inputs_rows .inp_ups_in_plate").val("1");
  $("#book_title .process_cost").val("+");
  $("#book_title .inp_total_pgs").val("4");
}
else if(window.module == "single_sheet" ||
        window.module == "multi_sheet"  ||
        window.module == "box"          ){
  $("#inputs_rows .process_cost").val("+");
}
$("#save_screen_defaults").click();
}

function getUserDetails(){
$.post("ajax_api.php",{action: "get_user_details"},
  function(data){
    window.user_details = data;
    setUserDetails(data);
  },"json");
}

function enableMinRates(){
  const div_id = "#plate_cost_min_pref "
  const inputs =  div_id + ' .table input'
  $(inputs).change(function(){
    const row = $(this).parent().parent()
    const base_class = $(row).parent().attr("class")
    const base = parseInt(base_class.split("_")[1].replace("000",""))
    const css_class = $(row).attr("class")
    const colors = parseInt(css_class.replace('table-row ','')
      .replace('-color',''))
    const plate_rate = parseInt($(row).find("input.plate_cost").val())
    const min_print_rate = parseInt($(row).find("input.min_print").val())
    const plate_cost = colors * plate_rate
    const print_cost = colors * base * min_print_rate
    const total_cost = plate_cost + print_cost
    $(row).find(".plate_total").html(plate_cost)
    $(row).find(".min_print_total").html(print_cost)
    $(row).find(".min_plate_print").html(total_cost)
  })
  $(".radio_print_base").change(function(){
    const sel_base = $(".radio_print_base:checked").val()
    $(div_id + " .print_base").val(sel_base)
    let base = div_id + " .base_" + sel_base
    $(base).css("opacity","1")
    $(base).parent().find("h3").css("opacity","1")
    if(sel_base == "1000"){
      base = div_id + " .base_3000"
      $(base).css("opacity","0.5")
      $(base).parent().find("h3").css("opacity","0.4")
      
    }
    else if(sel_base == "3000"){
      base = div_id + " .base_1000"
      $(base).css("opacity","0.5")
      $(base).parent().find("h3").css("opacity","0.4")
      
    }
  })
}
function updatePrintAndPlateRates(int_base){
  const div_id = "#plate_cost_min_pref"
  const base = " .base_" + int_base + "000"
  plate_rate = parseInt($(div_id + base + " input.min_plate").val())
  print_rate = parseInt($(div_id + base + " input.min_print").val())
    
  const rows = $(div_id + base + " .table-row")
  for(let i = 4; i<= 8; i++){
    const row_num = i - 3
    let row = rows[row_num]
    let plate_total = 0
    let print_total = 0
    if( !isNaN(plate_rate) ){
      plate_total = i * plate_rate
      $(row).find(".plate_cost").html(plate_rate)
      $(row).find(".plate_total").html(plate_total)
    }
    if( !isNaN(print_rate) ){
      print_total = i * print_rate * int_base
      $(row).find(".min_print").html(print_rate)
      $(row).find(".min_print_total").html(print_total)
    }
    if( !(isNaN(print_rate) || isNaN(plate_rate)) ){
      const total = plate_total + print_total
      $(row).find(".min_plate_print").html(total)
    }
  }
}

function setUserDetails(data){
  $("#logout_div .name").html(data.name + ' ' + data.lastname);
  $("#logout_div .contact").html(data.contact);
  if(data.preferences != null){
    var preferences = JSON.parse(data.preferences);
    window.xpress.user.preferences = preferences;
    $("#cost_summary_show").val(preferences.cost_summary_show);
    $("#paper_size_units").val(preferences.paper_size_units);
    $("#popup_language").val(preferences.popup_language);
    $("#pdf_top_text").val(preferences.pdf_top_text);
    $("#pdf_bottom_text").val(preferences.pdf_bottom_text);
    $("#pdf_terms").val(preferences.pdf_terms);
    $("#bank_beneficiary_name").val(preferences.bank_benefeciary_name);
    $("#bank_name").val(preferences.bank_name );
    $("#bank_branch_name").val(preferences.bank_branch_name );
    $("#bank_acc_type").val(preferences.bank_acc_type );
    $("#bank_acc_no").val(preferences.bank_acc_no );
    $("#company_isfc").val(preferences.company_isfc );
    $("#company_gstin").val(preferences.company_gstin );
    $("#company_pan").val(preferences.company_pan );
    $("#company_jurisdiction").val(preferences.company_jurisdiction );
    $("#invoice_terms").val(preferences.invoice_terms );
    if(typeof(preferences.show_hide_mm) == "undefined"){
      $("#show_hide_mm").val("show")
    }
    else{
      $("#show_hide_mm").val(preferences.show_hide_mm)
    }
    if(typeof(preferences.print_run_length) == "undefined"){
      $("#print_run_length").val("25000");
    }
    else{
      $("#print_run_length").val(preferences.print_run_length);
    }
    if(typeof(preferences.print_master_run_length) == "undefined"){
      $("#print_master_run_length").val("10000");
    }
    else{
      $("#print_master_run_length").val(preferences.print_master_run_length);
    }
    if(typeof(preferences.print_calculation_every) == "undefined"){
      $("#print_calculation_every").val("1000");
    }
    else{
      $("#print_calculation_every").val(preferences.print_calculation_every);
    }
    if(typeof(preferences.paper_wastage_gain_rs) != "undefined"){
      $("#paper_wastage_gain_rs").val(preferences.paper_wastage_gain_rs);
    }
    if(typeof(preferences.min_print_rates) != "undefined"){
      const min_print_rates = preferences.min_print_rates
      const print_base = min_print_rates.print_base
      const div_id = "#plate_cost_min_pref"
      for(let i = 0; i <= 7; i++){
        const colors = i + 1
        let full_div = div_id + " .base_1000 ." + colors + "-color "
        let plate_cost = min_print_rates.base_1000.plate_rates[i]
        let min_print = min_print_rates.base_1000.min_rates[i]
        let balance_qty = min_print_rates.base_1000.bal_qty_rates[i]
        $(full_div + " input.plate_cost").val(plate_cost)
        $(full_div + " input.min_print").val(min_print)
        $(full_div + " input.balance_qty").val(balance_qty)
        
        full_div = div_id + " .base_3000 ." + colors + "-color "
        plate_cost = min_print_rates.base_3000.plate_rates[i]
        min_print = min_print_rates.base_3000.min_rates[i]
        balance_qty = min_print_rates.base_1000.bal_qty_rates[i]
        $(full_div + " input.plate_cost").val(plate_cost)
        $(full_div + " input.min_print").val(min_print)
        $(full_div + " input.balance_qty").val(balance_qty)
        $(div_id + " .table input").change()
      } 
      let base = " .base_1000"
      $(div_id + " .print_base").val(print_base)
      if(print_base == "1000"){
        $($(div_id + ' .radio_print_base')[0]).prop("checked",true)
        base = div_id + " .base_3000"
        $(base).css("opacity","0.5")
        $(base).parent().find("h3").css("opacity","0.4")
        
      }
      else if(print_base == "3000"){
        $($(div_id + ' .radio_print_base')[1]).prop("checked",true)
        base = div_id + " .base_1000"
        $(base).css("opacity","0.5")
        $(base).parent().find("h3").css("opacity","0.4")
      }
    }
    else{
      const div_id = "#plate_cost_min_pref"
      $($(div_id + ' .radio_print_base')[0]).prop("checked",true)
      base = div_id + " .base_3000"
      $(base).css("opacity","0.5")
      $(base).parent().find("h3").css("opacity","0.4")
      $(div_id + " .table input.plate_cost").val("300")
      $(div_id + " .table input.balance_qty").val("125")
      for(let i = 0; i<= 2; i++){
        $($(div_id + " .base_1000 input.min_print")[i]).val("125")
        $($(div_id + " .base_3000 input.min_print")[i]).val("125")
      }
      for(let i = 3; i<= 7; i++){
        $($(div_id + " .base_1000 input.min_print")[i]).val("250")
        $($(div_id + " .base_3000 input.min_print")[i]).val("250")
      }
      $(div_id + " .table input").change()
    }
    if(typeof preferences.minimums != "undefined"){
      var minimums = preferences.minimums;
      var keys = Object.keys(minimums);
      keys.forEach(function(key){
        $("#" + key).val(minimums[key]);
      });
    }
    showHideCostDetails();
  }
  loadTooltips();
}

function showHideCostDetails(){
  var show = $("#cost_summary_show").val();
  if(show == "hide"){
    $(".middle-row .results .row div").hide();
    $(".middle-row .results .row .title").show();
    $(".profit").hide();
    $(".quote-per-unit-a").parent().children("div").show();
    $(".total-quote-a").parent().children("div").show();
  }
  else{
    $(".middle-row .results .row div").show();
    $(".profit").show();
  }
}


function setTableSize(){
	//fix the width of the input table
	$("tbody tr td").each(function(i,td){
		var td_class = $(td).attr("class");
		var width = $("thead tr th." + td_class).width();
		$(this).width(width);
	});
}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function loadTooltips(){
  var popup_language = $("#popup_language").val();
  window.tooltips = "";
  if(popup_language == "none"){
    return;
  }
  var url = "tooltips/" + window.module + ".csv";
  $.get(url, function(data){
    var csv_data = $.csv.toObjects(data);
    popup_language = capitalize(popup_language);
    window.tooltips = {};
    csv_data.forEach(function(d){
      window.tooltips[d.code] = d[popup_language];
    });
  });
}
$(".input_table thead th, .binding_table thead th").hover(function(e){
  var popup_language = $("#popup_language").val();
  if(popup_language == "none"){
    return;
  }
  const TOOLTIP_WIDTH = 200;
  var name = $(this).attr("class");
  if(typeof(window.tooltips[name]) != "undefined"){
    $("#tooltip").html(window.tooltips[name]);
    $("#tooltip").css("top",$(this).offset().top - 16 );
    var left = $(this).offset().left + $(this).width()/2 - TOOLTIP_WIDTH/2;
    if(left < 5){
      var arrow_offset = $(this).width()/2;
      $("#tooltip").addClass("left-tooltip");
      left = 10;
    }
    $("#tooltip").css("left",left);
    $("#tooltip").show();
  }
});
$(".input_table thead th, .binding_table thead th").mouseleave(function(e){
  $("#tooltip").removeClass("left-tooltip");
  $("#tooltip").hide();
  $("#tooltip").html("");
});
$("#switch-to-admin-button").click(function(e){
		var post_data = {action:"switch_to_admin"};
		$.post("ajax_api.php", post_data, function(data){
      window.location.href = "admin.php";
    },"json");
});
$("#confirm-password").click(function(e){
	var new_password = $("#new-password").val();
	var confirm_new_password = $("#confirm-new-password").val();
	if(new_password == confirm_new_password){
		var post_data = {action:"update_password",
										 password:new_password};
		$.post("ajax_api.php", post_data, function(data){
			alert("password changed succesfully");
			$("#new-password").val("");
			$("#confirm-new-password").val("");
			$("#changePasswordModal .close").click();
		});
	}
	else{
		alert("passwords do not match");
	}
});
$("#logout-button").click(function(e){
	var post_data = {action : 'logout'};
	$.post('ajax_api.php', post_data,
		function(data){
			window.location.href = "index.php";
		});
});
$("#change-password-button").click(function(e){
	$("#changePasswordModal").show();
	$("#logout_div").hide();
});
$("#change_module").click(function(e){
	$("#homeModal").show();
});
$("#refresh_screen").click(function(e){
  var rows = $("#inputs_rows tr");
  for(var i = 1; i < rows.length; i++){
    $(rows[i]).remove();
  }
  $("select").val('');
  $("input").val('');
  $("textarea").val('');
  $("#add_row").val('+');
  $(".input-locked").removeAttr("readonly");
  $(".input-locked").removeAttr("disabled");
  $(".input-locked").removeClass("input-locked");
  $(".quote_no_input input").attr("disabled","disabled");
  $(".date_input input").attr("disabled","disabled");
  $("#quote_locked").remove();
  delete(window.calc.print_run_length);
  $(".minus.remove").hide();
  $(".job_size_inputs input").val("00.00");
  $("#cuts_preview .job_size_cuts").html("");
  $("#cuts_preview svg").remove();
  $("#jobSizeModal .job_size_cuts span").html("");
  $("#jobSizeModal svg").remove();
  $(".min_print_charges").val("1000");
  setUserDetails(window.user_details);
  window.calc.clearPostProcessTemps();
  loadScreenDefaults();
});
$("#homeModal").click(function(e){
	$("#homeModal").hide();
});

$("#save_screen_defaults").click(function(e){
  saveScreenDefaults();
});

$("#apply_factory_defaults").click(function(e){
  applyFactoryDefaults();
});


$(".remove").click(function(e){
	$(".row_num").hide();
	$(".remove-row").show();
});
$(".modal-header .header .close").click(function(e){
  $(this).parent().parent().parent().parent().hide();
});
$("#paper_library").click(function(e){
	if(window.module == "stationery"){
		$("#stationeryPaperModal").show();
	}
	else{
		$("#paperModal").show(); 
	}
});
$("#preferences").click(function(e){
	$("#preferencesModal").show();
});


function heartBeat(){
	var post_data = {action : 'heartbeat'};
	$.post("ajax_api.php", post_data,
		function(data){
			if(data.status == 'failed'){
				window.location.href = 'index.php';
			}
		},"json");
}

/*
 * Function to filter Vendor from list of vendors
 *
 * Function to filter vendor from list of vendors
 */
function filterVendor(id){
  let vendor = window.xpress.user.vendors.filter(function(d){
    if(d.id == id){
      return(true);
    }
    return(false);
  });
  return(vendor[0]);
}


function filterCustomer(id){
  var customer = window.customers.filter(function(d){
    if(d.id == id){
      return(true);
    }
    return(false);
  });
  return(customer);
}
function loadCustomers(){
  window.xpress.user.loadCustomers();
  return;
}
$("#new_customer_button").click(function(e){
  $("#cust_company_name").val("")
  $("#cust_contact_person").val("");
  $("#cust_contact_number").val("");
  $("#cust_email").val("");
  $("#cust_address").val("");
  $("#cust_state").val("");
  $("#cust_shipping_address").val("");
  $("#cust_shipping_state").val("");
  $("#edit_customer_id").val("");
  $("#edit_customer_header").html("Add Customer Details");
  $("#addCustomerModal").show();
});

//delete customer button
$("#delete_customer_button").click(function(){
  window.xpress.user.deleteCustomer();
});

//edit customer button
$("#edit_customer_button").click(function(){
  window.xpress.user.editCustomer();
});

//add New Vendor button clicked
$("#new_vendor").click(function(){
  $("#AddEditVendor").show()
})

//Save Vendor button clicked
$("#save_vendor").click(function(){
  window.xpress.user.addEditVendor()
})

//Delete Vendor button clicked
$("#delete_vendor").click(function(){
  window.xpress.user.deleteVendor()
})

//Edit Vendor button clicked
$("#edit_vendor").click(function(){
  window.xpress.user.editVendor()
})

$("#add_customer_button").click(function(e){
  var company_name = $("#cust_company_name").val();
  var contact_person = $("#cust_contact_person").val();
  var contact_number = $("#cust_contact_number").val();
  var email = $("#cust_email").val();
  var address = $("#cust_address").val();
  var shipping_address = $("#cust_shipping_address").val();
  var gstin = $("#cust_gstin").val();
  var cust_id = $("#edit_customer_id").val();
  var shipping_state = $("#cust_shipping_state").val();
  var state = $("#cust_state").val();
  var state_code = $("#cust_state option:selected").attr("state_code");
  if(cust_id == ""){
    var action = "add_customer";
  }
  else{
    var action = "edit_customer";
  }
  var post_data = {action: action,
                  company_name: company_name,
                  contact_person: contact_person,
                  contact_number: contact_number,
                  email: email,
                  gstin: gstin,
                  address: address,
                  shipping_address: shipping_address,
                  cust_id: cust_id,
                  shipping_state: shipping_state,
                  state: state,
                  state_code: state_code};
  $.post("ajax_api.php", post_data, function(data){
    $("#cust_company_name").val("");
    $("#cust_contact_person").val("");
    $("#cust_contact_number").val("");
    $("#cust_email").val("");
    $("#cust_gstin").val("");
    $("#cust_address").val("");
    $("#cust_shipping_address").val("");
    $("#add_customer_button").html("Add");
    $("#edit_customer_id").val("");
    $("#edit_customer_header").html("Add Customer Details");
    $("#cust_shipping_state").val("");
    $("#cust_state").val("");
    $("#addCustomerModal").hide();
    window.xpress.modalAlert("info","Customer Saved",
      "Customer saved successfully.");
    loadCustomers();
  });
});

function parseResult(result_class){
  var result = $("." + result_class).html().replaceAll(',','');
  result = parseFloat(result);
  if(isNaN(result)){
    return(0);
  }
  return(result);
}

function getQuotesLibrary(){
  var post_data = {
    action: "get_quotes_library",
  };
  $.post("ajax_api.php", post_data, function(data){
    window.quote_data = data.resp;
    var html = '<div class="row table_header">' 
      + '<div class="quote_number">#</div>'
      + '<div class="quote_module">module</div>'
      + '<div class="quote_job_ref">Job Ref</div>'
      + '<div class="quote_desc">Description</div>'
      + '</div>';
    data.resp.data.forEach(function(d,i){
      var module = "";
      switch(d.type){
        case "single_sheet":
          module = "Single Sheet";
        break;
        case "multi_sheet":
          module = "Multi Sheet";
        break;
        case "book":
          module = "Book-Magazine";
        break;
        case "stationery":
          module = "Stationery";
        break;
        case "calendar":
          module = "Calendar";
        break;
        case "box":
          module = "Box-Packaging";
        break;
      }
    var date = formatDate(d.date);
    var quote_number = i+1;
    html = html + '<div class="row table_row ' + d.type + '">' 
      + '<div class="quote_number" quote_id="'+d.id+'">'+ quote_number +'</div>'
      + '<div class="quote_module">'+ module +'</div>'
      + '<div class="quote_job_ref">'+ d.job_ref +'</div>'
      + '<div class="quote_desc">'+ d.description +'</div>'
      + '</div>';
      
    });
    $("#quote_library_body").html(html);
    $("#quote_library_body .table_row").click(function(e){
      $("#quote_library_body .table_row").removeClass("quote_library_highlight");
      $(this).addClass("quote_library_highlight");
    });
  },"json");
}

function getQuotes(page = 1){
  if(typeof(window.customers) == "undefined"){
    setTimeout(function(){
      getQuotes(page);
    },500);
    return;
  }
  if(typeof(page) != "number"){
    page = parseInt(page);
  }
  var post_data = {
    action: "get_quotes",
    month: $("#quote_month").val(),
    year: $("#quote_year").val(),
    module: $("#quote_module").val(),
    customer_id: $("#quote_customer").attr("data-id"),
    page: page
  };
  $.post("ajax_api.php", post_data, function(data){
    window.quote_data = data.resp;
    const page_length = 10;
    var html = '<div class="row table_header">' 
      + '<div class="quote_lock"></div>'
      + '<div class="quote_number">Estimate #</div>'
      + '<div class="quote_customer">Customer</div>'
      + '<div class="quote_module">Module</div>'
      + '<div class="quote_job_ref">Job Ref</div>'
      + '<div class="quote_date">Date</div>'
      + '<div class="quote_desc">Description</div>'
      + '</div>';
    data.resp.data.forEach(function(d){
      var quote_lock = "";
      if(d.quote_lock == 1){
        quote_lock = '<i class="fa-solid fa-lock"></i>';
      }
      var customer_obj = filterCustomer(d.customer_id);
      if(typeof customer_obj[0] == "undefined"){
        var customer = "";
      }
      else{
        var customer = customer_obj[0].company_name;
      }
      var module = "";
      switch(d.type){
        case "single_sheet":
          module = "Single Sheet";
        break;
        case "multi_sheet":
          module = "Multi Sheet";
        break;
        case "book":
          module = "Book-Magazine";
        break;
        case "stationery":
          module = "Stationery";
        break;
        case "calendar":
          module = "Calendar";
        break;
        case "box":
          module = "Box-Packaging";
        break;
      }
    var date = formatDate(d.date);
    html = html + '<div class="row table_row">' 
      + '<div class="quote_lock">'+ quote_lock +'</div>'
      + '<div class="quote_number">'+ d.quote_number +'</div>'
      + '<div class="quote_customer">'+ customer +'</div>'
      + '<div class="quote_module">'+ module +'</div>'
      + '<div class="quote_job_ref">'+ d.job_ref +'</div>'
      + '<div class="quote_date">'+ date +'</div>'
      + '<div class="quote_desc">'+ d.description +'</div>'
      + '</div>';
      
    });
    html2 = '<div class="pagination">';
    if(page != 1){
      html += '<div class="prev">Prev</div>';
    }
    var pages = Math.ceil(data.resp.rows/page_length);
    for(i = 1; i <= pages; i++){
      html2 = html2 + '<div class="page">' + i + '</div>';
    } 
    if(page != pages){
      html += '<div class="next">Next</div>';
    }
    html2 = html2 + "</div>";
    $("#quote_body").html(html);
    $("#quote_page").html(html2);
    $("#quote_page .prev").click(function(e){
    });
    $("#quote_page .page").click(function(e){
      var page = $(this).html();
      getQuotes(page);
    });
    $("#quote_body .table_row").click(function(e){
      $("#quote_body .table_row").removeClass("quote_highlight");
      $(this).addClass("quote_highlight");
    });
  },"json");
}

$("#edit_quote").click(function(e){
  editQuote("edit");
});

$("#copy_quote").click(function(e){
  editQuote("copy");
});

$("#copy_desc").click(function(e){
  if($(".quote_highlight").length == 0){
    window.xpress.modalAlert("alert","Please Select Quotation",
      "Please select quotation to copy description from.", "failure");
    return;
  }
  $("#pdf_desc").val($(".quote_highlight .quote_desc").text());
  $("#quotationModal .close").click();
});

$("#edit_quote_library").click(function(e){
  editQuote("edit","main_library");
});

$("#copy_quote_library").click(function(e){
  editQuote("copy","main_library");
});
function editQuote(type, library = "user_library"){
  if((library == "user_library" && $(".quote_highlight").length == 0) ||
     (library == "main_library" && $(".quote_library_highlight").length == 0)){
    window.xpress.modalAlert("alert","Please Select Quotation",
      "Please select quotation to edit.", "failure");
    return;
  }
  if(library == "user_library"){
    var quote_num = "#" +type + "_" + $(".quote_highlight .quote_number").html();
    var module = $(".quote_highlight .quote_module").html();
    var url = window.location.href;
    url = url.split("/");
    
    switch(module){
      case "Single Sheet":
        url[url.length-1] = 'single_sheet.php' + quote_num;
      break;
      case "Multi Sheet":
        url[url.length-1] = 'multi_sheet.php' + quote_num;
      break;
      case "Book-Magazine":
        url[url.length-1] = 'book.php' + quote_num;
      break;
      case "Stationery":
        url[url.length-1] = 'stationery.php' + quote_num;
      break;
      case "Calendar":
        url[url.length-1] = 'calendar.php' + quote_num;
      break;
      case "Box-Packaging":
        url[url.length-1] = 'box.php' + quote_num;
      break;
    }
    var new_module = url[url.length - 1].split('.');
    url = url.join("/");
  }
  else{
    var quote_num = "#" +type + "_" + 
      $(".quote_library_highlight .quote_number").attr("quote_id") + "_lib";
    var module = $(".quote_library_highlight .quote_module").html();
    var url = window.location.href;
    url = url.split("/");
    
    switch(module){
      case "Single Sheet":
        url[url.length-1] = 'single_sheet.php' + quote_num;
      break;
      case "Multi Sheet":
        url[url.length-1] = 'multi_sheet.php' + quote_num;
      break;
      case "Book-Magazine":
        url[url.length-1] = 'book.php' + quote_num;
      break;
      case "Stationery":
        url[url.length-1] = 'stationery.php' + quote_num;
      break;
      case "Calendar":
        url[url.length-1] = 'calendar.php' + quote_num;
      break;
      case "Box-Packaging":
        url[url.length-1] = 'box.php' + quote_num;
      break;
    }
    var new_module = url[url.length - 1].split('.');
    url = url.join("/");
  }
  window.location.href = url;
  if(new_module[0] == window.module){
    window.xpress.user.setHashOptions();
    window.xpress.user.getQuote();
    $("#quotationModal .close").click();
    $("#quotationLibraryModal .close").click();
  }
}


//click of the save quotation button
$("#save_quotation").click(function(e){
  //customer is not selected
  if($("#customer").val() == ""){
    window.xpress.modalAlert("alert","Please Select Customer",
      "Please select customer before saving quotation", "failure");
    return;
  }
  
  //customer is selected, save quotation
  window.xpress.user.saveQuotation().then(
    //resolve (saved successfully)
    function(){
      window.xpress.modalAlert("alert","Success",
        "Estimate saved successfully");
    },
    
    //reject (something went wrong)
    function(){
      window.xpress.modalAlert("alert","Could not save quotation",
        "Something went wrong saving estimate, please try again later", 
        "failure");
    }
  );
});

//saving quotation to templates
$("#save_quote_library").click(function(e){
  user.saveQuotation("main_library").then(
    //resolve (saved successfully)
    function(){
      window.xpress.modalAlert("alert","Success",
        "Quotation saved successfully to templates");
    },
    
    //reject (something went wrong)
    function(){
      window.xpress.modalAlert("alert","Could not save quotation",
        "Something went wrong saving quotation, please try again later", 
        "failure");
    }
  );
});

$("#screenshot-pdf-button").click(function(e){
  getScreenShot();
});
$("#generate_quote").click(function(e){
  window.xpress.user.generateQuotation();
})
$(".cancel_print_run").click(function(e){
  $("#printRunLength").hide();
  $("#printRunLengthChange").hide();
});
$("#change_print_run").change(function(e){
  $("#printRunLength").hide();
  $("#printRunLengthChange").hide();
  window.calc.print_run_length = $(this).val();
  window.calc.calculateAll();
});

/**
 * enables basic actions for the user
 * 
 * enables basic actions for the user, the rest of the actions are enabled by
 * user.class
 */
function enableBasicActions(){
  const inner_pgs_trigger = "#book_title .finish_size_format input, " + 
    " #book_title .pages_in_plate_sig input, " +
    " #book_title .ups_in_plate input"
  $(inner_pgs_trigger).change(function(){
    const inner_pgs = $("#book_title .inner_pgs_printed").val()
    const pgs_in_plate = $("#book_title .pages_in_plate_sig input").val()
    const total_pgs = $("#book_title .total_pgs input").val()
    const ups = Math.ceil(pgs_in_plate / total_pgs * inner_pgs)
    $("#book_title .ups_in_plate input").val(ups)
  })
  $(inner_pgs_trigger).click(function(){
    const inner_pgs = $("#book_title .inner_pgs_printed").val()
    const pgs_in_plate = $("#book_title .pages_in_plate_sig input").val()
    const total_pgs = $("#book_title .total_pgs input").val()
    const ups = Math.ceil(pgs_in_plate / total_pgs * inner_pgs)
    $("#book_title .ups_in_plate input").val(ups)
  })
  $("#book_title .inner_pgs_printed").change(function(){
    $("#book_title .inner_pgs_printed").hide()
    const inner_pgs = $("#book_title .inner_pgs_printed").val()
    const pgs_in_plate = $("#book_title .pages_in_plate_sig input").val()
    const total_pgs = $("#book_title .total_pgs input").val()
    const ups = Math.ceil(pgs_in_plate / total_pgs * inner_pgs)
    $("#book_title .ups_in_plate input").val(ups)
  })
  $("#book_title .inner_pgs_printed_div div").click(function(){
    $("#book_title .inner_pgs_printed_div div").removeClass("selected")
    $(this).addClass("selected")
    const value = $(this).attr("value")
    $("#book_title .inner_pgs_printed").val(value)
    $("#book_title .inner_pgs_printed").change()
  })
  //enable showing process cost modal on click 
  $(".process_cost").click(function(e){
    const paper_name = $(this).parent().parent().find(".selectPaper").val()
    $("#inputsModal .paper_name").html(paper_name)
    $("#inputsModal").show()
  }) 
  
  //enable locking of estimates
  $("#lock_quote").click(function(e){
    window.xpress.user.lockEstimate()
  })
  
  //enable deleting of estimates library (templates)
  $("#delete_quote_library").click(function(e){
    window.xpress.user.deleteEstimateLibrary()
  })
  
  //enable deleting of estimate
  $("#delete_quote").click(function(e){
    window.xpress.user.deleteEstimate()
  })
  
  //enable closing of Estimate Modal on click of back button
  $("#back_quote").click(function(e){
    $("#quotationModal .close").click()
  })
  
  //enable closing of Estimate template Library Modal on click of back button
  $("#back_quote_library").click(function(e){
    $("#quotationLibraryModal .close").click()
  })
  
  //enable opening of the Estimate templates library
  $("#quote_library_button").click(function(e){
    $("#quotationLibraryModal").show()
  })
  
  //enable loading of estimates on change of any of the user selectable selects
  //in estimates modal
  $("#quotationModal select").change(function(e){
    getQuotes()
  })
  
  //enable toggle of logout div 
  $("#log_out").click(function(e){
    $("#logout_div").toggleClass("hide")
  })
  
  //enable toggle of generate pdf div
  $("#save_pdf").click(function(e){
    $("#pdf_div").toggleClass("hide")
  })
  $("#pdf_reports").click(function(e){
    $("#pdf_reports_div").toggleClass("hide")
  })
  
  //enable recalculation on change of any input or select
  let update_inputs = ".input_table input, .input_table select, "
    + ".settings_top input, .job_size_inputs input, "
    + "#preferences-minimums-tab input, #bookBinding input"
  $(update_inputs).change(function(e){
    if(window.module != "dashboard"){
      window.calc.calculateAll()
    }
  })
  
  //enable showing of Estimate library on click of templates button
  $("#main_library").click(function(e){
    $("#libraryModal").show()
  })
  
  //enable showing of the estimates Modal 
  $("#manage_quotation").click(function(e){
    $("#quotationModal .quote_buttons").show()
    $("#quotationModal .add_estimate").hide()
    $("#quote_customer").removeAttr("disabled")
    $("#quotationModal").show()
  })
  
  //enable showing of paper requirements
  $(".paper-a, .title-paper-a").parent().click(function(e){
    $("#paperRequirementModal").show()
  })
  
  $("#toggle_cost_calculation").click(function(){
    $("#main-page .middle-row .results").toggleClass("hide")
  })
  
  //enable making modals draggable on click of modal-header
  enableModalDrag()
  
  //enable updating of print amounts 
  enableMinRates()
  
  //get list of invoices
  $("#list_invoice").click(function(){
    window.xpress.user.getInvoices()
  })
  
  //get list of quotations
  $("#list_pdf_quotes").click(function(){
    window.xpress.user.getQuotations()
  })
  
  //get list of delivery memo
  $("#list_delivery_memo").click(function(){
    window.xpress.user.getDeliveryMemo()
  })
  
  //get list of purchase orders
  $("#list_po").click(function(){
    window.xpress.user.getPurchaseOrders()
  })
  
  //save job ticket
  $("#save_job_ticket").click(function(){
    window.xpress.user.confirmSaveJobTicket()
  })
}

/**
 * enables drogging of modal
 *
 * Enables dragging of modal by clicking on modal header
 */
function enableModalDrag(){
  $(".modal-header").mouseenter(function(){
    $(this).parent().attr("draggable","true")
  })
  $(".modal-header").mouseleave(function(){
    $(this).parent().removeAttr("draggable")
  })
}

/**
 * Update estimate library module on change of module
 */
$("#quote_library_module").change(function(e){
  //the module thats been selected
  const module = $(this).val()
  
  //module is blank so show all estimates
  if($(this).val() == ""){
    $("#quote_library_body .table_row").show()
    return
  }
  
  //hide all estimates
  $("#quote_library_body .table_row").hide()
  //show estimates of selected module
  $("#quote_library_body ." + module ).show()
})
