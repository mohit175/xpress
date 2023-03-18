//multiplier for per 1000 calculations
const _per_1000_ = 1000

//conversion factor for mm to inches
const _mm_inch_conv_ = 25.4

//conversion factor for cm to inches
const _cm_inch_conv_ = 2.54

//module
const url = window.location.href;
const url_split = url.split('/');
const _module_ = url_split[url_split.length - 1].split('.')[0]
/*
 * File for Class Binding
 *
 * This file contains the class and other code to use this class 
 * 
 * @package xpress
 * @author Kaleshwar Chand kaleshwar@utech.com.fj
 * @copy Xpress Tech
 * @ver 0.1
 */

/*
 * Class Binding
 *
 * This class does calculations and functions for binding
 */
class BINDING{
  
  /*
   * The constructor for the binding class
   * 
   * The constructor for the binding class
   */
  constructor(module){
    
    //per_set for Numb'ng Perfora'n cost Per
    this.per_set = 1000;
    //set the module
    this.module = module;
    //run the calculation
    this.calculate();
    //binding library for book
    this.binding_lib = [
      {manual:"2.00", perfect:"6.00", hard:"30.00"},
      {manual:"1.25", perfect:"4.00", hard:"20.00"},
      {manual:"1.00", perfect:"3.50", hard:"12.00"},
      {manual:"1.75", perfect:"5.00", hard:"25.00"},
      {manual:"1.00", perfect:"3.50", hard:"15.00"}
    ];
    
    //standard paper sizes for stationery job size details
    this.stationery_job_size = {
      "3": {width: '07.35', height: '17.50'},
      "4": {width: '08.50', height: '11.00'},
      "5": {width: '07.35', height: '10.00'},
      "6": {width: '08.50', height: '07.40'},
      "8": {width: '05.50', height: '08.50'},
      "9": {width: '05.65', height: '07.30'},
      "10":{width: '05.00', height: '07.35'},
      "12":{width: '04.25', height: '07.50'},
      "16":{width: '04.25', height: '05.50'}
    };
    
    //binding library for stationery
    this.stationery_binding_lib = {
      "Pad Bound":{
        "3":"17.00", "4":"15.00", "5":"10.00", "6":"10.00", "8":"10.00",
        "9":"8.00", "10":"8.00", "12": "8.00", "16":"8.00"
      },
      "Top Cover Paper":{
        "3":"22.00", "4":"18.00", "5":"15.00", "6":"15.00", "8":"12.00",
        "9":"11.00", "10":"10.00", "12": "9.00", "16":"8.00"
      },
      "Hard Bound":{
        "3":"25.00", "4":"20.00", "5":"17.00", "6":"17.00", "8":"14.00",
        "9":"13.00", "10":"12.00", "12": "12.00", "16":"12.00"
      },
      "Cloth Bound":{
        "3":"70.00", "4":"60.00", "5":"45.00", "6":"45.00", "8":"30.00",
        "9":"30.00", "10":"30.00", "12": "25.00", "16":"25.00"
      },
    };
    this.Binding_Charges = {
      "Binding_Charges_Hand":"20",
      "Binding_Charges_MC":"50",
      "Binding_Charges_Digital":"120"
    }
    
    this.color_lib = {
      base1000:[
        {
          plate_cost:300,
          min_impressions:300
        }
      ],
      base3000:[
        {
          plate_cost:300,
          min_impressions:150
        }
      ]
    }
    
    //update the values in Book Binding Library and stationery Library
    this.updateLibInputs();
    
    //get custom Library values
    this.getLibs();
    
    //enable Binding related actions
    this.enableActions();
    if(module == "book"){
      this.enableBindingCostUpdate()
    }
    if(module == "binding"){
      this.loadBindingScreenDefaults()
      $("#binding_table .profit").show()
    }
  }
  
  /*
   * Method to calculate for calculating Book binding 
   *
   * Method to calculate for calculating Book binding
   */
  calculate(){
    if(this.module != "book" && this.module != "binding"){
      //this is only relevant to book binding so return if in another module
      return;
    }
    //Get the inputs for book binding
    this.book_manual = parseFloat($("input.book_manual").val());
    this.book_perfect = parseFloat($("input.book_perfect").val());
    this.book_case = parseFloat($("input.book_case").val());
    this.total_pgs = parseFloat($("input.bind_total_pgs").val());
    this.sheet_sig = parseFloat($("input.bind_sheet_sig").val());
    this.folding = parseFloat($("input.bind_folding").val());
    this.collating = parseFloat($("input.bind_collating").val());
    this.stapling = parseFloat($("input.bind_stapling").val());
    this.sewing = parseFloat($("input.bind_sewing").val());
    
    //calculate Book binding costs
    this.calculateManual();
    this.calculateManualStapling();
    this.calculateManualSewing();
    this.calculatePerfect();
    this.calculatePerfectStapling();
    this.calculatePerfectSewing();
    this.calculateHardStapling();
    this.calculateHardSewing();
  }


  /*
   * Updates input values in Library for both Book Binding and Stationery
   *
   * Updates input values in Library for both Book Binding and Stationery
   */
  updateLibInputs(){
    var _this = this;
    //update the input values for Book Binding Library with relevant values
    _this.binding_lib.forEach(function(d,i){
      $($("#bookBinding .manual input")[i]).val(d.manual);
      $($("#bookBinding .perfect input")[i]).val(d.perfect);
      $($("#bookBinding .hard input")[i]).val(d.hard);
    });
    
    //update the input value for Stationery Binding Library with relevant values 
    _this.updateStationeryInputs("Top Cover Paper")
    _this.updateStationeryInputs("Hard Bound")
    _this.updateStationeryInputs("Pad Bound")
    _this.updateStationeryInputs("Cloth Bound")
    _this.updateStationeryCharges()
  }

  updateStationeryCharges(){
    let _this = this
    let Binding_Charges = {}
    if( typeof(_this.stationery_binding_lib.Binding_Charges) == "undefined"){
      Binding_Charges = _this.Binding_Charges
    }
    else{
      Binding_Charges = _this.stationery_binding_lib.Binding_Charges
    }
    let keys = Object.keys(Binding_Charges)
    keys.forEach(function(d){
      const value = Binding_Charges[d]
      $("#stationeryBinding ." + d + " input").val(value)
    })
  }

  /*
   * Updates Stationery Binding Library inputs
   *
   * Updates Stationery Binding Library Inputs with the relevant values
   *
   * @param binding_type the type of binding to update the inputs for. One of
   * "Top Cover Paper", "Hard Bound", "Pad Bound", "Cloth Bound".
   */
  updateStationeryInputs(binding_type){
    var _this = this;
    //sanitize the binding type to get the relevant css class
    var css_binding_type = binding_type.replaceAll(" ","_");
    
    //Get the sizes for the relevant binding type. Stored as keys for the
    //relevant binding type
    var keys = Object.keys(_this.stationery_binding_lib[binding_type]);
    //go through each of the keys
    keys.forEach(function(d){
      //get the relevant value from the stationery binding object
      var value = _this.stationery_binding_lib[binding_type][d];
      //update the stationery Binding library with the relevant value
      $(".size_"+ d + " ."+ css_binding_type +" input").val(value);
    });
  }

  /*
   * Gets the Libraries from the Database
   *
   * Gets the Libraries from the Database
   */
  getLibs(){
    var _this = this;
    $.post("ajax_api.php",{action:"getLibs"},function(data){
      if(data.status != "success"){
        //Custom Libraries have not been saved so return
        return;
      }
      data.resp.forEach(function(d){
        if(d.type == "book"){
          //set the libraries for Book Binding Libraries
          _this.binding_lib = JSON.parse(d.library);
        }
        else if(d.type == "stationery"){
          //Set the libraries for Stationery Binding
          _this.stationery_binding_lib = JSON.parse(d.library);
        }
        else if(d.type == "color"){
          _this.color_lib = JSON.parse(d.library);
        }
      });
      //update the Library input values
      _this.updateLibInputs();
    },"json");
  }

  /*
   * Save Book Binding Library 
   *
   * Saves the Book Binding Library to the binding_lib object then calls
   * saveLibs to save it to database
   */
  saveBindingLib(){
    var _this = this;
    //Go through the Book Binding Library
    $("#bookBinding .row").each(function(i,d){
      if(i == 0){
        //this is the title row, no inputs here, so return
        return;
      }
      
      //save input values to binding_lib object
      var manual = $(d).find(".manual input").val();
      _this.binding_lib[i-1]["manual"] = manual;
      var perfect = $(d).find(".perfect input").val();
      _this.binding_lib[i-1]["perfect"] = perfect;
      var hard = $(d).find(".hard input").val();
      _this.binding_lib[i-1]["hard"] = hard;
    });
    
    //save Library to database
    _this.saveLibs("book");
  }

  /*
   * Save Stationery Binding Library 
   *
   * Saves the Stationery Binding Library to the stationery_binding_lib object 
   * then calls saveLibs to save it to database
   */
  saveStationeryBindingLib(){
    var _this = this;
    //Go through the Book Binding Library
    $("#stationeryBinding .modal-body .row").each(function(i,d){
      if(i == 0){
        //this is the title row, no inputs here, so return
        return;
      }
      
      //save input values to stationery_binding_lib object
      var size = $(d).attr("class").split("_")[1];
      var pad_bound = $(d).find(".Pad_Bound input").val();
      _this.stationery_binding_lib["Pad Bound"][size] = pad_bound;
      var top_cover_paper = $(d).find(".Top_Cover_Paper input").val();
      _this.stationery_binding_lib["Top Cover Paper"][size] = top_cover_paper;
      var hard_bound = $(d).find(".Hard_Bound input").val();
      _this.stationery_binding_lib["Hard Bound"][size] = hard_bound;
      var cloth_bound = $(d).find(".Cloth_Bound input").val();
      _this.stationery_binding_lib["Cloth Bound"][size] = cloth_bound;
    });

    let Binding_Charges = {
      "Binding_Charges_Hand":$("#stationeryBinding .Binding_Charges_Hand input").val(),
      "Binding_Charges_MC":$("#stationeryBinding .Binding_Charges_MC input").val(),
      "Binding_Charges_Digital":$("#stationeryBinding .Binding_Charges_Digital input").val(),
    }

    _this.stationery_binding_lib.Binding_Charges = Binding_Charges
    //save Library to database
    _this.saveLibs("stationery");
  }

  /*
   * Saves the Library data to the database
   *
   * Saves the Library data to the database
   * 
   * @param type The type of library to save to the database one of book or
   *  stationery
   */
  saveLibs(type, silent = false){
    var _this = this;
    //generate library text to save to the database
    if(type == "book"){
      var library = JSON.stringify(_this.binding_lib);
    }
    else if(type == "stationery"){
      var library = JSON.stringify(_this.stationery_binding_lib);
    }
    else if(type == "color"){
      var library = JSON.stringify(_this.color_lib);
    }
    var post_params = {
      action: 'save_binding_lib',
      type: type,
      library: library
    };
    //save to the database
    $.post("ajax_api.php",post_params,function(e){
      if(silent == false){
        window.xpress.modalAlert("alert","","Library saved successfully");
      }
    });
  }

  /*
   * Enables updating of the binding cost 
   * 
   * Enables updating of the binding cost on change of input of total pages
   */
  enableBindingCostUpdate(){
    var _this = this;
    $(".inp_total_pgs").change(function(e){
      $(".closed_job_size_w").change();
      _this.updateBindingCost();
    });
  }

  /*
   * Updates Book Binding Cost 
   * 
   * Updates Book Binding Cost 
   */
  updateBindingCost(){
    var _this = this;
    //refresh the inputs 
    window.calc.inputs = getInputs();
    if(typeof(window.calc.inputs[0]["bind_res"]) == "undefined" ||
       window.calc.inputs[0]["bind_res"] == ""){
      //no book binding result, so return. this means that the user has not yet
      //picked a result for the book binding cost so we cannot automatically
      //update the cost
      return;
    }
    const bind_res = window.calc.inputs[0]["bind_res"] 
    //make selected binding cost orange
    
    //get the total pages for the book (total of all input rows
    var totalpgs = _this.getTotalPgsForBook();
    //update the total pages input in binding Modal
    $(".bind_total_pgs").val(totalpgs);
    //run the calculation
    _this.calculate();
    //simulate a click of the book binding result that the user chose to update
    //the cost in inputs and run the calculation
    $("." + bind_res).click();
  }

  /*
   * Gets the total pages for the book
   * 
   * Gets the total pages for the book for all rows
   *
   * @return int returns the total pages
   */
  getTotalPgsForBook(){
    var pages;
    var totalpgs = 0;
    //Go through the inputs array, starting at index 2
    //for books the start is 2 but for multi sheet the start is 1
    let start = 2
    if(window.module == "multi_sheet"){
      start = 1
    }
    for(var i = start; i < window.calc.inputs.length; i++){
      //get pages for this row
      pages = parseInt(window.calc.inputs[i].inp_total_pgs);
      //add it to total pages if it is a valid number
      if(!isNaN(pages)){
        totalpgs += pages;
      }
    }
    return(totalpgs);
  }

  /*
   * Enables the actions for Binding 
   * 
   * Enables the actions for Binding for both Book and Stationery
   */
  enableActions(){
    var _this = this;
      if( _this.module == "binding" ){
        $(".bind.row").click(function(e){
          $(".bind.row").removeClass("quote_highlight")
          $(this).addClass("quote_highlight")
          $("select.book_size").change()
          return
        })
      }
    
    //actions for Book Binding
    if(this.module == "book"){
      
      //on click of the plus sign for book binding
      $("#book_binding").click(function(e){
        //get the total pages in the book
        var totalpgs = _this.getTotalPgsForBook();
        //set the value for Total Pages (Both Sides)
        $(".bind_total_pgs").val(totalpgs);
        //run the calculation
        _this.calculate();
        //show the Book Binding Modal
        $("#BindingModal").removeClass("hide");
      });
      
      //Result of Binding Calculation clicked
      $(".bind.row").click(function(e){
        $(".bind.row").removeClass("quote_highlight")
        $(this).addClass("quote_highlight")
        if( _this.module == "binding" ){
          return
        }
        if( $("#quote_locked").length == 1 ){
          window.xpress.modalAlert("alert","Quotation is locked",
            `This quotation has been locked, and cannot be edited. 
             To edit this quotation please copy it first.`, "failure");
          return;
        }
        //get the calculated cost as shown
        var book_cost = $($(this).find(".bind-res")[0]).text();
        //update the title row of inputs with the cost
        $("#book_title .inp_staple").val(book_cost);
        
        //get the relevant class of the result
        var css_class = $($(this).find(".bind-res")[0]).attr("class")
          .replace("bind-res","").trim();
        //set it as the binding result class
        window.bind_res = css_class;
        
        //trigger change of Book Binding cost it input rows to run all the
        //calculations
        $("#book_title .inp_staple").change();
        //hide the Book Binding Modal
        $("#BindingModal").addClass("hide");
      });
    }
    
    $("input.bind_total_pgs").change(function(){
      const total_pgs = $(this).val()
      $("#binding_pdf_desc_div .total_pgs").val(total_pgs)
    })
    $("input.bind_sheet_sig").change(function(){
      const fold_sig = $(this).val()
      $("#binding_pdf_desc_div .fold_sig").val(fold_sig)
    })
    
    //change of Book Size in the Book Binding Module
    $("select.book_size").change(function(e){
      if( _this.module == "binding" ){
        let book_size = $(this).find("option:selected").text().trim()
        let selected_book_size = $(".quote_highlight .title-res")
        let book_size_details = ""
        if( $(selected_book_size).length == 1 ){
          book_size_details = '<br/>- ' + $(selected_book_size).parent().parent()
            .find(".title-res").first().html().replace("<br>"," ").trim()
          book_size_details += "<br/>- " + $(selected_book_size).html().trim()
        }
        book_size = '- ' + book_size + book_size_details
        $("#binding_pdf_desc_div .book_size").html(book_size)
      }
      //get the current value
      var size = $(this).val();
      if(size == ""){
        //Selection is on Select so clear the values for Manual Perfect and Case
        //Binding
        $(".book_binding_type input").val("");
      }
      else{
        //get the relevant values from the Book Binding Library
        var values = _this.binding_lib[size-1];
        //update the values for Manual, Perfect and case Binding
        $("#binding_inputs .book_manual").val(values.manual);
        $("#binding_inputs .book_perfect").val(values.perfect);
        $("#binding_inputs .book_case").val(values.hard);
      }
      //run the calculation
      _this.calculate();
    });
    
    //run the calculation on change of any of the inputs of the Book Binding
    //Modal
    $("#binding_inputs input").change(function(e){
      _this.calculate();
    });
    
    //update the Book Binding Library on click of the "Update Library" button in
    //Book Binding Library
    $("#update_book_binding_lib").click(function(e){
      _this.saveBindingLib();
    });
    
    //Apply Factory Defaults in Book Binding Modal Clicked
    $("#apply_binding_defaults").click(function(e){
      //remove screen default from any inputs where it was applied
      $("#binding_inputs select, #binding_inputs input").removeClass("screen_default");
      //clear out all inputs
      $("#binding_inputs input, #binding_inputs select").val("");
      //save Blank Screen Defaults to the database
      _this.saveBindingScreenDefaults();
    });
    
    //Save Screen Defaults in Book Binding Modal clicked
    $("#save_binding_default").click(function(e){
      //save Screen defaults to database
      _this.saveBindingScreenDefaults();
    });
    
    //Refresh Screen clicked in Book Binding Modal
    $("#binding_refresh_screen").click(function(e){
      if( $("#quote_locked").length == 1 ){
        window.xpress.modalAlert("alert","Quotation is locked",
          `This quotation has been locked, and cannot be edited. 
           To edit this quotation please copy it first.`, "failure");
        return;
      }
      //remove screen default from any inputs where it was applied
      $("#binding_inputs select, #binding_inputs input").removeClass("screen_default");
      //clear out all inputs
      $("#binding_inputs input, #binding_inputs select").val("");
      //load Screen Defaults
      _this.loadBindingScreenDefaults();
    });
    
    //Stationery Module
    if(this.module == "stationery"){
      //on change of "Binding Type & Cost Per Book" or "Finish Book Size Format"
      $(".binding_type select, .finish_cut_format select").change(function(e){
        //Get the finish cut format size and binding type
        var format = $(".finish_cut_format select").val();
        var binding_type = $(".binding_type select").val();
        //check that selection is not empty or None
        if(format != "" && binding_type != "" && binding_type != "None"){
          //get the cost from the stationery binding library
          var cost = _this.stationery_binding_lib[binding_type][format];
          //Apply the cost to Binding Type & Cost Per Book
          $($(".binding_type input")[0]).val(cost);
          //trigger change to run the calculations
          $($(".binding_type input")[0]).change();
        }
      });
      $(".finish_cut_format select").change(function(e){
        const parent_width = "18.00";
        const parent_height = "23.00";
        var size = $(this).val();
        var width = _this.stationery_job_size[size].width;
        var height = _this.stationery_job_size[size].height;
        $(".closed_job_size_w").val(width);
        $(".closed_job_size_h").val(height);
        $(".parent_paper_size_w").val(parent_width);
        $(".parent_paper_size_h").val(parent_height);
        $(".closed_job_size_w").change();
      });
      $("#inputs_rows .numbing select").change(function(){
        let binding_cost_input = $("#inputs_rows .numbing input")
        const binding_type = $(this).val()
        let binding_cost = ""
        if( binding_type == "Hand" ){
          binding_cost = $("#stationeryBinding .Binding_Charges_Hand input").val()
        }
        else if( binding_type == "M/c" ){
          binding_cost = $("#stationeryBinding .Binding_Charges_MC input").val()
        }
        else if( binding_type == "Digital" ){
          binding_cost = $("#stationeryBinding .Binding_Charges_Digital input").val()
        }
        $( binding_cost_input ).val( binding_cost )
      })
    }
    
    //Update Library clicked in stationery binding Library
    $("#update_stationery_binding_lib").click(function(e){
      //save the library to the database
      _this.saveStationeryBindingLib();
    });
    
    //Enable Custom color rates
    this.enableCustomColorRates();
  }
  
  editPlateCost(){
    var _this = this;
    var selected = $("#customColorRateModal").find(".quote_highlight");
    var rate_col = $(selected).find(".plate_cost");
    var rate = $(rate_col).html();
    $(rate_col).html("<input/>");
    var rate_input = $(rate_col).find("input");
    $(rate_input).val(rate);
    $(rate_input).change(function(e){
      var value = $(this).val();
      var base = $(rate_col).parent().parent().attr("base");
      _this.color_lib[base].forEach(function(i,d){
        _this.color_lib.base1000[i]["plate_cost"] = value;
      });
      _this.loadColorRate(colors);
    });
  }
  
  loadColorRate(colors){
    var _this = this;
    var base1000 = [];
    _this.color_lib.base1000.forEach(function(d){
      var plate_impressions = d.plate_cost * colors + d.min_impressions * colors;
      var rate = {
        plate_impressions: plate_impressions,
        plate_cost: d.plate_cost,
        min_impressions: d.min_impressions,
        colors:colors,
        plate_cost_total:d.plate_cost * colors,
        min_impressions_total: d.min_impressions * colors
      }
      base1000.push(rate);
    });
    window.xpress.loadData("#color_rate_1000_base",base1000);
    var base3000 = [];
    _this.color_lib.base3000.forEach(function(d){
      var plate_impressions = d.plate_cost * colors + d.min_impressions * colors *3;
      var rate = {
        plate_impressions: plate_impressions,
        plate_cost: d.plate_cost,
        min_impressions: d.min_impressions,
        colors:colors,
        plate_cost_total:d.plate_cost * colors,
        min_impressions_total: d.min_impressions * colors * 3
      }
      base3000.push(rate);
    });
    window.xpress.loadData("#color_rate_3000_base",base3000);
    if(typeof(_this.color_lib.selected_base) != "undefined"){
      if(_this.color_lib.selected_base == 1000){
        $("#color_rate_1000_base .table-row").addClass("quote_highlight");
      }
      if(_this.color_lib.selected_base == 3000){
        $("#color_rate_3000_base .table-row").addClass("quote_highlight");
      }
    }
    $("#color_rate_1000_base .table-row, #color_rate_3000_base .table-row")
      .click(function(e){
        $("#customColorRateModal .table-row").removeClass("quote_highlight");
        $(this).addClass("quote_highlight");
        var base = $(this).parent().attr("base");
        _this.color_lib.selected_base = base;
        window.binding.saveLibs("color",true);
    });
  }
  enableCustomColorRates(){
    var _this = this;
    //not required in stationery module
    if(_this.module == "stationery"){
      return;
    }
    //remove previouly attached change event listners
    const color_selects = ".num_colors select, .num_colors_front select," + 
      " .num_colors_back select, .over_print_colors select"
    $(color_selects).off("change")
    //add on change event
    $(color_selects).change(function(e){
      const colors = $(this).val()
      if( colors == 0 ){
        $(this).parent().parent().find(".inp_min_print_rate").val("")
        $(this).parent().parent().find(".inp_plate_cost").val("")
        $(this).parent().parent().find(".inp_balance_qty").val("")
        $(this).parent().parent().find(".min_print_charges").val("1000")
        $(this).parent().parent().find(".inp_plate_cost").change()
        return;
      }
      const div_id = "#plate_cost_min_pref"
      const print_base = $(div_id + " .print_base").val()
      let base = ""
      if(print_base == "1000"){
        base = " .base_1000"
      }
      else if(print_base == "3000"){
        base = " .base_3000"
      }
      const table_row = div_id + base + " ." + colors + "-color"
      const plate_cost = $(table_row + " input.plate_cost").val()
      const min_print = $(table_row + " input.min_print").val()
      const after_print = $(table_row + " input.after_print").val()
      const balance_qty = $(table_row + " input.balance_qty").val()
      $(this).parent().parent().find(".inp_min_print_rate").val(min_print)
      $(this).parent().parent().find(".inp_plate_cost").val(plate_cost)
      $(this).parent().parent().find(".inp_balance_qty").val(balance_qty)
      $(this).parent().parent().find(".min_print_charges").val(print_base)
      $(this).parent().parent().find(".inp_plate_cost").change()
    })
    $("#save_printing_rates").off("click")
    $("#save_printing_rates").click(function(){
      let rates = {
        base_1000: _this.getMinRatesForBase(" .base_1000"),
        base_3000: _this.getMinRatesForBase(" .base_3000"),
        print_base: $("#plate_cost_min_pref .print_base").val()
      }
      window.xpress.user.preferences.min_print_rates = rates
      window.xpress.user.savePreferences(false)
      window.xpress.modalAlert("alert","Rates Saved",
        "These Changed Rates will be applied to the Current and Future Jobs only", 
        "success");
      $(color_selects).change()
    })
  }
  /*
   * Gets the minimum print rates as an object
   *
   * Gets the minimum print rates for one table (base) as an object
   */
  getMinRatesForBase(base){
      const div_id = "#plate_cost_min_pref"
      let plate_rates = []
      let min_rates = []
      let bal_qty_rates = []
      for(let i = 0; i <= 7; i++){
        let plate_rate = $($(div_id + base + " .table-row")[i])
          .find(" input.plate_cost").val()
        let min_rate = $($(div_id + base + " .table-row")[i])
          .find(" input.min_print").val()
        let bal_qty_rate = $($(div_id + base + " .table-row")[i])
          .find(" input.balance_qty").val()
        plate_rates.push(plate_rate)
        min_rates.push(min_rate)
        bal_qty_rates.push(bal_qty_rate)
      }
    return({plate_rates, min_rates, bal_qty_rates})
  }

  /*
   * Loads Book Binding Screen Defaults
   *
   * Loads Book Binding Screen Defaults
   */
  loadBindingScreenDefaults(){
    $.post("ajax_api.php",{action: "load_screen_defaults", module: "binding"},
      function(data){
        if(data.status == 'failed'){
          //no screen defaults saved
          return;
        }
        //get the binding screen defaults data
        var binding = data.inputs;
        //extract the keys from the binding object
        var binding_keys = Object.keys(binding);
        
        //remove screen default from Book Binding inputs
        $("#binding_inputs select, #binding_inputs input").removeClass("screen_default");
        //go through the binding keys (same as input classes
        binding_keys.forEach(function(key){
          if(binding[key] !==""){
            //if screen default is set for the key
            //set the volue of the Book Binding input to the screen default
            $("#binding_inputs ." + key).val(binding[key]);
            //add the screen default class
            $("#binding_inputs input." + key).addClass("screen_default");
            $("#binding_inputs select." + key).addClass("screen_default");
          }
        });
      },"json");
    
  }
  
  /*
   * Saves Book Binding Screen Defaults
   * 
   * Saves Book Binding Screen Defaults to database
   */
  saveBindingScreenDefaults(){
    var binding_inputs = {};
    //update the binding_inputs with the relevant inputs
    //remove screen_default from all inputs and select
    $("#binding_inputs input, #binding_inputs select").removeClass("screen_default");
    $("#binding_inputs input, #binding_inputs select").each(function(inp_id,inp){
      //get the relevant class from the input and the value
      var inp_class = $(inp).attr("class");
      var inp_value = $(inp).val();
      
      //update the binding_inputs object with the relevant value
      binding_inputs[inp_class] = inp_value;
      
      //if value is set then add screen_default class
      if(inp_value != ""){
        $(inp).addClass("screen_default");
      }
    });
    $.post("ajax_api.php",{action: "save_screen_defaults", module: 'binding',
    inputs: binding_inputs},
      function(data){
        console.log("screen defaults saved");
      },"json");
  }
  
  /*
   * Shows the result for the Book Binding Cost Calculation
   *
   * Shows the result for the Book Binding Cost Calculation
   */
  showResult(class_name, result){
    if(typeof(result) == "undefined" || isNaN(result)){
      //if result is not availiable (undefined or NaN) set result to 0;
      result = 0;
    }
    //format the value to INR
    var currency_format = { style: 'currency', currency: 'INR' };
    var format = new Intl.NumberFormat('en-IN', currency_format);
    //remove the Rupee symbol from the result
    var res = format.format(result).substring(1);
    //show the result
    $("." + class_name).html(res);
  }
  
  /*
   * Calculates Manual Binding Cost for Book Work
   *
   * Calculates Manual Binding Cost for Book Work
   */
  calculateManual(){
    this.manual = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + (this.stapling/this.per_set);
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.manual = this.manual + this.manual * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.manual = this.manual + profit_inp
      }
    }
    this.showResult("manual-staple-cost", this.manual);
  }
  
  /*
   * Calculates Manual Stapling Cost for Book Work
   *
   * Calculates Manual Stapling Cost for Book Work
   */
  calculateManualStapling(){
    this.manual_staple = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + (this.stapling/this.per_set) + this.book_manual;
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.manual_staple = this.manual_staple + this.manual_staple * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.manual_staple = this.manual_staple + profit_inp
      }
    }
    this.showResult("manual-paste-cost", this.manual_staple);
  }
  

  /*
   * Calculates Manual Sewing Cost for Book Work
   *
   * Calculates Manual Sewing Cost for Book Work
   */
  calculateManualSewing(){
    this.manual_sewing = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) 
      + (this.total_pgs / 16 * this.sewing / this.per_set) + this.book_manual;
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.manual_sewing = this.manual_sewing + this.manual_sewing * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.manual_sewing = this.manual_sewing + profit_inp
      }
    }
    this.showResult("manual-sewing-cost", this.manual_sewing);
  }
  
  /*
   * Calculates Perfect Binding Cost for Book Work
   *
   * Calculates Perfect Binding Cost for Book Work
   */
  calculatePerfect(){
    this.perfect = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + this.book_perfect; 
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.perfect = this.perfect + this.perfect * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.perfect = this.perfect + profit_inp
      }
    }
    this.showResult("perfect-cost", this.perfect);
  }
  
  /*
   * Calculates Perfect Stapling Cost for Book Work
   *
   * Calculates Perfect Stapling Cost for Book Work
   */
  calculatePerfectStapling(){
    this.perfect_staple = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + this.stapling/this.per_set + this.book_perfect; 
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.perfect_staple = this.perfect_staple + this.perfect_staple * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.perfect_staple = this.perfect_staple + profit_inp
      }
    }
    this.showResult("perfect-staple-cost", this.perfect_staple);
  }
  
  /*
   * Calculates Perfect Sewing Cost for Book Work
   *
   * Calculates Perfect Sewing Cost for Book Work
   */
  calculatePerfectSewing(){
    this.perfect_sewing = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) 
      + (this.total_pgs / 16 * this.sewing / this.per_set) + this.book_perfect;
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.perfect_sewing = this.perfect_sewing + this.perfect_sewing * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.perfect_sewing = this.perfect_sewing + profit_inp
      }
    }
    this.showResult("perfect-sewing-cost", this.perfect_sewing);
  }
  
  /*
   * Calculates Hard Stapling Cost for Book Work
   *
   * Calculates Hard Stapling Cost for Book Work
   */
  calculateHardStapling(){
    this.hard_staple = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + (this.stapling/this.per_set) + this.book_case;
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.hard_staple = this.hard_staple + this.hard_staple * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.hard_staple = this.hard_staple + profit_inp
      }
    }
    this.showResult("hard-staple-cost", this.hard_staple);
  }
  
  /*
   * Calculates Hard Sewing Cost for Book Work
   *
   * Calculates Hard Sewing Cost for Book Work
   */
  calculateHardSewing(){
    this.hard_sewing = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) 
      + (this.total_pgs / 16 * this.sewing / this.per_set) + this.book_case;
    const profit_type = $(".profit_type").val()
    const profit_inp = parseFloat($(".profit_inp").val())
    if(profit_type != "" && !isNaN(profit_inp)){
      if(profit_type == "percernt"){
        this.hard_sewing = this.hard_sewing + this.hard_sewing * (profit_inp/100)
      }
      else if(profit_type == "amt"){
        this.hard_sewing = this.hard_sewing + profit_inp
      }
    }
    this.showResult("hard-sew-cost", this.hard_sewing);
  }
  

  /*
   * Calculates the cover size for book
   *
   * Calculates the cover size for the book (open job size)
   * 
   * @param object closed_size with properties width and height
   */
  calculateBookCover(closed_size){
    let _this = this
    //minimum spine width in inches
    const min_spine_width = 4 / _mm_inch_conv_
    //precision of the width and height
    const precision = 2
    //minimum length of the fixed string size for width and height
    const min_str_length = 5
    //thickness of a leave in mm
    const leave_thickness = 0.135
    //minimum number of pages in book over which to calculate spine width
    const min_pages = 150
    
    //set the minimum spine width
    let spine_width = min_spine_width
    
    //get the total pages for the book 
    let total_pgs = _this.getTotalPgsForBook()
    
    //calculate spine width if pages are greater than 150
    if( total_pgs > min_pages ){
      //calculate the number of leaves in the book
      let leaves = total_pgs/2
      //calculate spine width
      spine_width = leaves * leave_thickness / _mm_inch_conv_
    } 
    //calculate width of book
    let width = closed_size.width * 2 + spine_width
    
    //round the width to 2 decimal places
    width = round( width, precision );
    
    //convert the width to string with leading zeros and precision of 2
    let s_width = padStart( width, min_str_length, '0', precision );
    
    //make sure the length is greater than the width
    if( width < closed_size.height ){
      var open_size = {
        width:s_width,
        height: closed_size.height
      }
    }
    else{
      var open_size = {
        width: closed_size.height,
        height: s_width
      }
    }
    return(open_size);
  }
}

/*
 * File for calculations class
 *
 * File for Calculations Class for all calculations
 *
 * @package xpress
 * @version 0.1
 * @since 0.1
 * @author Kaleshwar Chand <kalesh@cyberpacificfj.com>
 * @copy XpressTech  www.xpressquote.in
 */

/*
 * Class calculator
 *
 * Class for all calculations
 */
class calculator{

/*
 * constructor for calculator class
 *
 * constructor for calculator class
 */
  constructor(){
    var _this = this;
    _this.module = window.module;
    var paper_size_units = $("#paper_size_units").val();
    if(paper_size_units == "inches"){
      _this.paper_conv_factor = 2540003;
    }
    else{
      //centimeters
      _this.paper_conv_factor = 10000000;
    }
  }

/*
 * Function to show results
 *
 * Function to show results in the results section at the bottom
 */
  showResult(class_name, result, left = "", right = ""){
    var _this = this;
    result = _this.validateResult(result);
    var res = _this.formatResult(class_name, result);
    $("." + class_name + "-a").html(left + res.a + right);
    $("." + class_name + "-b").html(left + res.b + right);
    $("." + class_name + "-c").html(left + res.c + right);
  }

/*
 * Function to format result
 *
 * formats the results to be displayed in INR currency format
 * Rounds all results except quote-per-unit rosults
 */
  formatResult(class_name, result){
    var _this = this;
    const currency_format = { style: 'currency', currency: 'INR' };
    var format = new Intl.NumberFormat('en-IN', currency_format);
    var res = {};
    if(class_name != "quote-per-unit" && class_name != "quote-over-print"){
      result.a = Math.round(result.a);
      result.b = Math.round(result.b);
      result.c = Math.round(result.c);
      res.a = format.format(result.a).substring(1).split(".")[0];
      res.b = format.format(result.b).substring(1).split(".")[0];
      res.c = format.format(result.c).substring(1).split(".")[0];
    }
    else{
      res.a = format.format(result.a).substring(1);
      res.b = format.format(result.b).substring(1);
      res.c = format.format(result.c).substring(1);
    }
    return(res);
  }

/*
 * Validates Results
 *
 * Validates the results to be displayed
 */
  validateResult(result){
    var _this = this;
    if(typeof(result) == "number"){
      var temp_res = result;
      result = {a:temp_res, b:temp_res, c:temp_res};
    }
    if(typeof(result) == "undefined"){
      result = {a:0, b:0, c:0};
    }
    result.a = _this.validateSingleResult(result.a);
    result.b = _this.validateSingleResult(result.b);
    result.c = _this.validateSingleResult(result.c);
    return(result);
  }

/*
 * validates a single result
 * validates a single result for one qty
 */
  validateSingleResult(res){
    var _this = this;
    if(typeof(res) === "undefined" || !isFinite(res)){
      res = 0;
    }
    return res;
  }

/*
 * Calculates all the required results
 *
 * Calculates all the required results
 */
  calculateAll(){
    var _this = this;
    if(window.module == "binding"){
      return;
    }
    _this.inputs = getInputs();
    if(window.module == "book"){
      //remove book binding inputs from inputs
      _this.inputs.splice(2,1);
    }
    _this.calculateDTP();
    _this.calculatePrinting();
    _this.calculatePlateCost();
    _this.calculatePaper();
    if(window.module == "book" || window.module == "multi_sheet"){
      _this.calculateBinding();
    }
    if(window.module == "stationery"){
      _this.calculateBinding();
      _this.calculateNumbering();
    }
    if(window.module == "calendar"){
      _this.calculateCalendarBinding();
    }
    _this.calculateAllPostProcessCost();
    _this.calculateHiddenExpense();
    _this.calculateBasicCostWithHiddenExp();
    _this.calculateProfit();
    _this.calculateTotalQuote();
    _this.calculateQuotePerUnit();
  }

/*
 * calculates Numbering
 *
 * Calculates Numbering for stationery
 */
  calculateNumbering(){
    var _this = this;
    this.inputs = getInputs();
    var qty_a   =   _this.getInput(0,"quantity_a");
    var qty_b   =   _this.getInput(0,"quantity_b");
    var qty_c   =   _this.getInput(0,"quantity_c");
    var copies  =   _this.getInput(1,"inp_copies_set");
    var sets    =   _this.getInput(1,"inp_sets_book");
    var rate    =   _this.getInput(1,"inp_numbing");
    var numb_a  =   Math.ceil((qty_a * copies * sets)/_per_1000_) * rate;
    var numb_b  =   Math.ceil((qty_b * copies * sets)/_per_1000_) * rate;
    var numb_c  =   Math.ceil((qty_c * copies * sets)/_per_1000_) * rate;
    _this.numb  =   {a:numb_a, b:numb_b, c:numb_c};
    _this.showResult("numbering", _this.numb);
  }

/*
 * Calculates Pasting
 *
 * Finalizes and shows Glueing Pasting charges
 */
  calculatePasting(){
    var _this = this;
    _this.inputs = getInputs();
    _this.pasting = {};
    var res_a = parseFloat($("#inputsModal .glueing .amount .qty-a").val());
    var res_b = parseFloat($("#inputsModal .glueing .amount .qty-b").val());
    var res_c = parseFloat($("#inputsModal .glueing .amount .qty-c").val());
    _this.pasting = {a:res_a, b:res_b, c:res_c};
    _this.pasting = _this.validateResult(_this.pasting)
  }

/*
 * Calculates Stripping/Sorting
 *
 * Finalizes and shows Stripping/Sorting charges
 */
  
  calculateStrip(){
    var _this = this;
    _this.inputs = getInputs();
    _this.sorting = {};
    var res_a = parseFloat($("#inputsModal .stripping .amount .qty-a").val());
    var res_b = parseFloat($("#inputsModal .stripping .amount .qty-b").val());
    var res_c = parseFloat($("#inputsModal .stripping .amount .qty-c").val());
    _this.sorting = {a:res_a, b:res_b, c:res_c};
    _this.sorting = _this.validateResult(_this.sorting)
  }

/*
 * calculates PF for Box
 *
 * calculates PF (Hidden Expense) for Box Packaging
 */
  calculatePF(){
    var _this = this;
    _this.inputs = getInputs();
    var qty_a   =   _this.getInput(0,"quantity_a");
    var qty_b   =   _this.getInput(0,"quantity_b");
    var qty_c   =   _this.getInput(0,"quantity_c");
    var width   =   _this.getInput(1,"width");
    var height  =   _this.getInput(1,"height");
    var gsm     =   _this.getInput(1,"inp_paper_gsm");
    var format  =   _this.getInput(1,"inp_finish_size_format");
    var rate    =   _this.getInput(1,"inp_p_f");
    _this.p_f_exp = {
      a: qty_a * width * height * gsm / format / _this.paper_conv_factor * rate,
      b: qty_b * width * height * gsm / format / _this.paper_conv_factor * rate,
      c: qty_c * width * height * gsm / format / _this.paper_conv_factor * rate,
    };
    _this.showResult("p-f-exp", _this.p_f_exp);
  }

/*
 * calculates Total Quote
 *
 * calculates Total Quote (Basic Cost + Hidden Exp)
 */
  calculateTotalQuote(){
    var _this = this;
    _this.inputs = getInputs();
    _this.total_quote = _this.Add(_this.profit,_this.basic_cost_with_exp);
    _this.showResult("total-quote",_this.total_quote);
  }

/*
 * Calculates per unit cost
 *
 * Calculates per unit cost
 */
  calculateQuotePerUnit(){
    var _this = this;
    _this.inputs = getInputs();
    _this.unit_quote = {
      a: _this.total_quote.a / _this.getInput(0,"quantity_a"),
      b: _this.total_quote.b / _this.getInput(0,"quantity_b"),
      c: _this.total_quote.c / _this.getInput(0,"quantity_c"),
    }
    _this.unit_quote = _this.validateResult(_this.unit_quote);
    _this.showResult("quote-per-unit",_this.unit_quote);
    if(window.module == "calendar"){
      _this.unit_quote.b = _this.total_quote.b / _this.getInput(1,"inp_over_print_qty");
      _this.showResult("quote-per-unit",_this.unit_quote);
      var over_print = _this.unit_quote.a + _this.unit_quote.b;
      over_print = _this.validateResult(over_print);
      _this.showResult("quote-over-print",over_print);
    }
  }

/*
 * Calculates Profit
 *
 * Calculates Profit
 */
  calculateProfit(){
    var _this = this;
    _this.inputs = getInputs();
    var profit = _this.getInput(1,"profit_inp");
    var profit_type = _this.getInput(1,"profit_type","string");
    if(profit_type == "amt"){
      _this.profit = {
        a: profit,
        b: profit,
        c: profit
      }
    }
    else{
      _this.profit = {
        a: _this.basic_cost_with_exp.a * profit/100,
        b: _this.basic_cost_with_exp.b * profit/100,
        c: _this.basic_cost_with_exp.c * profit/100
      }
    }
    _this.showResult("profit",_this.profit);
  }

/*
 * Calculates Basic cost with hidden expense
 *
 * Calculates Basic cost with hidden expense
 */
  calculateBasicCostWithHiddenExp(){
    var _this = this;
    _this.basic_cost_with_exp = _this.Add(_this.basic_cost,_this.hidden_exp);
    _this.showResult("basic-cost", _this.basic_cost_with_exp);
  }

/*
 * Calculates per sheet cost
 *
 * Calculates per sheet cost
 * 
 * @param int i the line for which to do the calculation
 */
  calculatePerSheetCost(i){
    var _this = this;
    var paper_cost_type = _this.getInput(i, "paper_cost_sel", "string");
    
    //cost type is always per sheet for stationery
    if(_this.module == "stationery"){
      var cost = _this.getInput(i, "paper_desc_amount");
      return(cost);
    }
    var cost = _this.getInput(i, "inp_paper_cost");
    
    //per sheet cost
    if(paper_cost_type == "Sheet"){
      return(cost);
    }
    
    //per kg cost
    var width = _this.getInput(i, "width");
    var height = _this.getInput(i, "height");
    var gsm = _this.getInput(i, "inp_paper_gsm");
    var sheet_cost = (width * height * gsm * cost) / _this.paper_conv_factor;
    return(sheet_cost);
  }

  calculateHiddenExpense(){
    if(window.module == "box"){
      this.calculatePF();
    }
    this.calculateBasicCost();
    this.hidden_exp = {a:0,b:0,c:0};
    var hidden_exp = 0;
    for(var i = 1; i < this.inputs.length; i++){
      const hidden_exp_type = this.getInput(i,"sel_hidden_expense","string")
      if(hidden_exp_type == "percent"){
        hidden_exp = this.getInput(i,"inp_hidden_expense")/100;
        this.hidden_exp.a += this.basic_cost.a * hidden_exp;
        this.hidden_exp.b += this.basic_cost.b * hidden_exp;
        this.hidden_exp.c += this.basic_cost.c * hidden_exp;
      }
      else{
        hidden_exp = this.getInput(i,"inp_hidden_expense");
        this.hidden_exp.a += hidden_exp;
        this.hidden_exp.b += hidden_exp;
        this.hidden_exp.c += hidden_exp;
      }
    }
    if(window.module == "calendar"){
      this.hidden_exp.b = 0;
    }
    this.showResult("hidden-exp", this.hidden_exp);
  }

  calculateBasicCost(){
    this.basic_cost = {};
    this.basic_cost.a = this.DTP.a + this.plate_cost.a + this.printing.a 
      + this.paper.a + this.paper_wastage.a;
    this.basic_cost.b = this.DTP.b + this.plate_cost.b + this.printing.b 
      + this.paper.b + this.paper_wastage.b;
    this.basic_cost.c = this.DTP.c + this.plate_cost.c + this.printing.c 
      + this.paper.c + this.paper_wastage.c;
    if(window.module == "multi_sheet"){
      this.basic_cost.a += this.spot_uv.a + this.die_cost.a + this.staple.a 
        + this.lami.a + this.crease.a + this.folding.a; 
      this.basic_cost.b += this.spot_uv.b + this.die_cost.b + this.staple.b 
        + this.lami.b + this.crease.b + this.folding.b; 
      this.basic_cost.c += this.spot_uv.c + this.die_cost.c + this.staple.c 
        + this.lami.c + this.crease.c + this.folding.c; 
    }
    if(window.module == "book"){
      this.basic_cost.a += this.spot_uv.a + this.die_cost.a + this.binding.a
        + this.lami.a + this.crease.a + this.folding.a; 
      this.basic_cost.b += this.spot_uv.b + this.die_cost.b + this.binding.b
        + this.lami.b + this.crease.b + this.folding.b; 
      this.basic_cost.c += this.spot_uv.c + this.die_cost.c + this.binding.c
        + this.lami.c + this.crease.c + this.folding.c; 
    }
    if(window.module == "single_sheet"){
      this.basic_cost.a += this.spot_uv.a + this.die_cost.a  
        + this.lami.a + this.crease.a; 
      this.basic_cost.b += this.spot_uv.b + this.die_cost.b 
        + this.lami.b + this.crease.b; 
      this.basic_cost.c += this.spot_uv.c + this.die_cost.c 
        + this.lami.c + this.crease.c; 
    }
    if(window.module == "book"){
      this.basic_cost.a += this.title_paper_total.a + this.title_DTP.a 
        + this.title_plate_cost.a + this.title_printing.a; 
      this.basic_cost.b += this.title_paper_total.b + this.title_DTP.b
        + this.title_plate_cost.b + this.title_printing.b;
      this.basic_cost.c += this.title_paper_total.c + this.title_DTP.c
        + this.title_plate_cost.c + this.title_printing.c;
    }
    if(window.module == "stationery"){
      this.basic_cost.a += this.binding.a + this.numb.a;
      this.basic_cost.b += this.binding.b + this.numb.b;
      this.basic_cost.c += this.binding.c + this.numb.c;
    }
    if(window.module == "box"){
      this.basic_cost.a += this.spot_uv.a + this.lami.a  + this.die_cost.a 
        + this.pasting.a + this.crease.a + this.sorting.a + this.met.a 
        + this.p_f_exp.a;
      this.basic_cost.b += this.spot_uv.b + this.lami.b  + this.die_cost.b 
        + this.pasting.b + this.crease.b + this.sorting.b + this.met.b
        + this.p_f_exp.b;
      this.basic_cost.c += this.spot_uv.c + this.lami.c  + this.die_cost.c 
        + this.pasting.c + this.crease.c + this.sorting.c +  this.met.c
        + this.p_f_exp.c;
    }
    if(window.module == "calendar"){
      this.basic_cost.a += this.tinning;
      this.basic_cost.b = this.DTP_OP + this.plate_cost_OP + this.printing_OP;
    }
  }

/*
 * gets the Total Pages required
 *
 * gets the Total Pages required
 * 
 * @param int i the line for which to do the calculation
 */
  getTotalPgs(i){
    var _this = this;
    switch(window.module){
      case 'single_sheet':
        return(_this.getInput(1,"sel_print_sides"));
      break;
      case 'multi_sheet':
        return(_this.getInput(i,"inp_total_pgs"));
      break;
      case 'book':
        return(_this.getInput(i,"inp_total_pgs"));
      break;
      case 'stationery':
        return(_this.getInput(1,"inp_sets_book"));
      break;
      case 'box':
        return(_this.getInput(1,"sel_print_sides"));
      break;
      case 'calendar':
        return(_this.getInput(1,"sel_sheets_in_calendar"));
      break;
    }
  }

  calculateBinding(){
    var _this = this;
    var qty_a = _this.getInput(0,"quantity_a");
    var qty_b = _this.getInput(0,"quantity_b");
    var qty_c = _this.getInput(0,"quantity_c");
    var staple = _this.getInput(1,"inp_staple");
    _this.binding = {
      a: qty_a * staple,
      b: qty_b * staple,
      c: qty_c * staple
    };
    _this.binding = _this.validateResult(_this.binding);
    if(_this.module == "book" || _this.module == "stationery"){
      _this.showResult("book-binding",_this.binding);
      return;
    }
    //multi sheet
    var staple_select = _this.getInput(0, "staple_select");
    var min = parseInt($("#"+staple_select+"_min"));
    if(!isFinite(min)){
      min = 0;
    }
    if(_this.binding.a < min){
      _this.binding.a = min;
    }
    if(_this.binding.b < min){
      _this.binding.b = min;
    }
    if(_this.binding.c < min){
      _this.binding.c = min;
    }
    _this.staple = _this.binding;
    _this.showResult("binding",_this.binding);
  }

  calculatePaper(){
    var _this = this;
    this.paper = {a:0, b:0, c:0};
    this.paper_wastage = {a:0, b:0, c:0};
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var cut_size = 0;
    var wastage = 0;
    var sheet_cost = 0;
    var total_pgs = 1;
    var i = 1;
    $("#paperRequirementModal .modal-body .data_row").remove();
    this.paper_req = Array();
    if(window.module == "book"){ 
      i = 2;
      total_pgs = this.getTotalPgs(1);
      sheet_cost = this.calculatePerSheetCost(1);
      cut_size = this.getInput(1,"inp_finish_size_format");
      wastage = this.getInput(1,"inp_wastage");
      total_pgs = total_pgs/2;
      this.title_paper = {};
      this.title_paper_wastage = {};
      this.title_paper.a = qty_a * total_pgs / cut_size * sheet_cost;
      this.title_paper.b = qty_b * total_pgs / cut_size * sheet_cost;
      this.title_paper.c = qty_c * total_pgs / cut_size * sheet_cost;
      this.title_paper_wastage = this.calculateWastage(1, this.title_paper, wastage, sheet_cost);
      _this.calculatePaperRequirement(1,this.title_paper,this.title_paper_wastage,wastage,total_pgs,cut_size)
      this.title_paper_total = this.Add(this.title_paper,this.title_paper_wastage);
      this.showResult("title-paper", this.title_paper_total);
    }
    var paper_req = {};
    var paper = {a:0,b:0,c:0};
    var cost_per_kg = 0;
    for(i; i < this.inputs.length; i++){
      if(window.module == "stationery"){
        cut_size = this.getInput(1,"inp_finish_size_format");
        wastage = this.getInput(1,"inp_wastage");
        total_pgs = this.getTotalPgs(1);
      }
      else{
        cut_size = this.getInput(i,"inp_finish_size_format");
        wastage = this.getInput(i,"inp_wastage");
        total_pgs = this.getTotalPgs(i);
      }
      sheet_cost = this.calculatePerSheetCost(i);
      if( this.module == "single_sheet" ||
          this.module == "box"          ){
        total_pgs = 1
      }
      if(window.module == "multi_sheet" || window.module == "book"){
        total_pgs = total_pgs/2;
      }
      paper.a = qty_a * total_pgs / cut_size * sheet_cost;
      paper.b = qty_b * total_pgs / cut_size * sheet_cost;
      paper.c = qty_c * total_pgs / cut_size * sheet_cost;
      var paper_wastage = this.calculateWastage(i, paper, wastage, sheet_cost);
      _this.calculatePaperRequirement(i,paper,paper_wastage,wastage,total_pgs,cut_size)
      this.paper_wastage = this.Add(this.paper_wastage,paper_wastage);
      this.paper = this.Add(this.paper,paper);
    }
    if(window.module == "book"){
      var title_req = this.paper_req.shift();
      this.paper_req.push(title_req);
    }
    var paper_req_html = $("#paper_req_sample").html();
    var wstg_gain = {a:0,b:0,c:0};
    this.paper_req.forEach(function(d,i){
      $("#paperRequirementModal .modal-body").append(paper_req_html);
      var sheets_row = $("#paperRequirementModal .modal-body .data_row.sheets")[i];
      var cost_row = $("#paperRequirementModal .modal-body .data_row.cost")[i];
      var kgs_row = $("#paperRequirementModal .modal-body .data_row.kgs")[i];
      var wstg_gain_row = $("#paperRequirementModal .modal-body .data_row.wstg_gain")[i];
      d.cost    = _this.formatResult("",d.cost);
      d.sheets  = _this.formatResult("",d.sheets);
      $(sheets_row).find(".option").html(d.paper_name);
      $(cost_row).find(".qty_a").html(d.cost.a);
      $(cost_row).find(".qty_b").html(d.cost.b);
      $(cost_row).find(".qty_c").html(d.cost.c);
      $(kgs_row).find(".qty_a").html(d.kgs.a);
      $(kgs_row).find(".qty_b").html(d.kgs.b);
      $(kgs_row).find(".qty_c").html(d.kgs.c);
      $(wstg_gain_row).find(".wstg_gain_a").html(d.wstg_gain_kg.a);
      $(wstg_gain_row).find(".wstg_gain_b").html(d.wstg_gain_kg.b);
      $(wstg_gain_row).find(".wstg_gain_c").html(d.wstg_gain_kg.c);
      $(sheets_row).find(".qty_a").html(d.sheets.a);
      $(sheets_row).find(".qty_b").html(d.sheets.b);
      $(sheets_row).find(".qty_c").html(d.sheets.c);
      wstg_gain.a = wstg_gain.a + d.wstg_gain.a;
      wstg_gain.b = wstg_gain.b + d.wstg_gain.b;
      wstg_gain.c = wstg_gain.c + d.wstg_gain.c;
    });
    if(this.module =="calendar"){
      $("#paperRequirementModal .header_row .qty_a").html("Quantity");
    }
    this.paper_total = this.Add(this.paper,this.paper_wastage);
    this.showResult("paper", this.paper_total);
    this.showResult("wstg-gain", wstg_gain,"(",")");
  }

  calculatePaperRequirement(i, paper,paper_wastage,wastage,total_pgs,cut_size){
    var _this = this;
    var paper_req = {cost:{},sheets:{},kgs:{}}; 
    var cost_per_kg = 0;
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    if(this.module == "calendar"){
      qty_b = this.getInput(1,"inp_over_print_qty");
    }
    paper_req.cost.a = paper.a + paper_wastage.a;
    paper_req.cost.b = paper.b + paper_wastage.b;
    paper_req.cost.c = paper.c + paper_wastage.c;
    paper_req.paper_name = this.getInput(i,"selectPaper","string");
    var line = i;
    let paper_cost_sel = ""
    if(this.module == "stationery"){
      var sel_wastage = this.getInput(1,"sel_wastage","string");
    }
    else{
      paper_cost_sel = this.getInput(i,"paper_cost_sel","string"); 
      var sel_wastage = this.getInput(i,"sel_wastage","string");
    }
    if( this.module == "single_sheet" ||
        this.module == "calendar"     ||
        this.module == "box"          ){
      total_pgs = 1
    }
    if( paper_cost_sel == "Sheet" || this.module == "stationery"){
      if( sel_wastage == "Sheet"){
        paper_req.sheets.a = Math.ceil((qty_a * total_pgs/cut_size))+wastage;
        paper_req.sheets.b = Math.ceil((qty_b * total_pgs/cut_size))+wastage;
        paper_req.sheets.c = Math.ceil((qty_c * total_pgs/cut_size))+wastage;
      }
      else if( sel_wastage == "Percent"){
        paper_req.sheets.a = Math.ceil((qty_a * total_pgs/cut_size)*(100+wastage)/100);
        paper_req.sheets.b = Math.ceil((qty_b * total_pgs/cut_size)*(100+wastage)/100);
        paper_req.sheets.c = Math.ceil((qty_c * total_pgs/cut_size)*(100+wastage)/100);
      }
      else if( sel_wastage == "None"){
        paper_req.sheets.a = Math.ceil((qty_a * total_pgs/cut_size));
        paper_req.sheets.b = Math.ceil((qty_b * total_pgs/cut_size));
        paper_req.sheets.c = Math.ceil((qty_c * total_pgs/cut_size));
      }
      else{
        paper_req.sheets.a = 0;
        paper_req.sheets.b = 0;
        paper_req.sheets.c = 0;
      }
      let sheet_cost = 0
      if(this.module == "stationery"){
        sheet_cost = this.getInput(i, "paper_desc_amount")
      }
      else{
        sheet_cost = this.getInput(i, "inp_paper_cost");
      }
      var width = this.getInput(i, "width");
      var height = this.getInput(i, "height");
      var gsm = this.getInput(i, "inp_paper_gsm");
      var kg_cost = (sheet_cost * _this.paper_conv_factor)/(width * height * gsm);
      paper_req.kgs.a = Math.round((paper_req.cost.a/kg_cost)*1000)/1000;
      paper_req.kgs.b = Math.round((paper_req.cost.b/kg_cost)*1000)/1000;
      paper_req.kgs.c = Math.round((paper_req.cost.c/kg_cost)*1000)/1000;
    }
    else if(this.getInput(i,"paper_cost_sel","string") == "kg"){
      cost_per_kg = this.getInput(i,"inp_paper_cost");
      paper_req.kgs.a = Math.round((paper_req.cost.a/cost_per_kg)*1000)/1000
      paper_req.kgs.b = Math.round((paper_req.cost.b/cost_per_kg)*1000)/1000
      paper_req.kgs.c = Math.round((paper_req.cost.c/cost_per_kg)*1000)/1000
      if(this.getInput(i,"sel_wastage","string") == "Sheet"){
        paper_req.sheets.a = Math.ceil((qty_a * total_pgs/cut_size))+wastage;
        paper_req.sheets.b = Math.ceil((qty_b * total_pgs/cut_size))+wastage;
        paper_req.sheets.c = Math.ceil((qty_c * total_pgs/cut_size))+wastage;
      }
      else if(this.getInput(i,"sel_wastage","string") == "Percent"){
        paper_req.sheets.a = Math.ceil((qty_a * total_pgs/cut_size)*(100+wastage)/100);
        paper_req.sheets.b = Math.ceil((qty_b * total_pgs/cut_size)*(100+wastage)/100);
        paper_req.sheets.c = Math.ceil((qty_c * total_pgs/cut_size)*(100+wastage)/100);
      }
      else if( sel_wastage == "None"){
        paper_req.sheets.a = Math.ceil((qty_a * total_pgs/cut_size));
        paper_req.sheets.b = Math.ceil((qty_b * total_pgs/cut_size));
        paper_req.sheets.c = Math.ceil((qty_c * total_pgs/cut_size));
      }
      else{
        paper_req.sheets.a = 0;
        paper_req.sheets.b = 0;
        paper_req.sheets.c = 0;
      }
    }
    else{
      paper_req.kgs.a = 0;
      paper_req.kgs.b = 0;
      paper_req.kgs.c = 0;
      paper_req.cost.a = 0;
      paper_req.cost.b = 0;
      paper_req.cost.c = 0;
      paper_req.sheets.a = 0;
      paper_req.sheets.b = 0;
      paper_req.sheets.c = 0;
    }
    //get the wstg gain price in rupees from settings
    let wstg_gain = parseInt($("#paper_wastage_gain_rs").val())
    //check if it is a valid number, if not set it to 1
    wstg_gain = (!isNaN( wstg_gain )) ?  wstg_gain : 1
    
    //get the wstg gain percentage point for selected job size
    let wstg_cut = parseFloat($(".settings_top .selected_job_size_wstg").val())
    //check if it is a valid number, if not set it to 0
    wstg_cut = (!isNaN( wstg_cut )) ?  wstg_cut : 0
    //round wstg_cut to 4 decimals so that it stays consistent with what the
    //user calculates

    //wastage gain in rupees
    paper_req.wstg_gain = {
      a:floor(paper_req.kgs.a * wstg_cut * wstg_gain, 0),
      b:floor(paper_req.kgs.b * wstg_cut * wstg_gain, 0),
      c:floor(paper_req.kgs.c * wstg_cut * wstg_gain, 0)
    }
    //wastage gain in KG
    paper_req.wstg_gain_kg = {
      a:round( paper_req.kgs.a * wstg_cut , 3 ).toFixed(3),
      b:round( paper_req.kgs.b * wstg_cut , 3 ).toFixed(3),
      c:round( paper_req.kgs.c * wstg_cut , 3 ).toFixed(3)
    }
    this.paper_req.push(JSON.parse(JSON.stringify(paper_req)))
  }

  calculateWastage(i, paper, wastage, sheet_cost){
    if(this.module == "stationery"){
      var wastage_type = this.getInput(1,"sel_wastage", "string");
    }
    else{
      var wastage_type = this.getInput(i,"sel_wastage", "string");
    }
    if(wastage_type == "" || wastage_type == "None"){
      return({a:0,b:0,c:0});
    }
    var paper_wastage = {a:0,b:0,c:0};
    if(wastage_type == "Percent"){
      paper_wastage.a = paper.a * wastage / 100;
      paper_wastage.b = paper.b * wastage / 100;
      paper_wastage.c = paper.c * wastage / 100;
    }
    else if(wastage_type == "Sheet"){
      paper_wastage.a = sheet_cost * wastage;
      paper_wastage.b = sheet_cost * wastage;
      paper_wastage.c = sheet_cost * wastage;
    }
    return(paper_wastage);
  }

  calculateDieCost(){
    var _this = this;
    var res = [];
    var temp = {};
    var die_punch = parseInt($(".punch-die .rate input").val());
    var blanket = parseInt($(".blanket-uv .rate input").val());
    var zinc_block = parseInt($(".zinc-block .rate input").val());
    if(!isFinite(die_punch)){
      die_punch = 0;
    }
    if(!isFinite(blanket)){
      blanket = 0;
    }
    if(!isFinite(zinc_block)){
      zinc_block = 0;
    }
    var total_die_cost = die_punch + blanket + zinc_block;
    var die_cost = {a:total_die_cost,b:total_die_cost,c:total_die_cost};
    if(this.module == "multi_sheet"){
      var line = $("#process_cost_line").val();
      if(typeof(this.temp_die_cost) == "undefined"){
        _this.temp_die_cost = [];
      }
      _this.temp_die_cost[line] = die_cost;
      _this.die_cost = {a:0,b:0,c:0};
      _this.temp_die_cost.forEach(function(d){
        _this.die_cost.a = _this.die_cost.a + d.a;
        _this.die_cost.b = _this.die_cost.b + d.b;
        _this.die_cost.c = _this.die_cost.c + d.c;
      });
      _this.die_cost = _this.validateResult(die_cost);
    }
    else{
      _this.die_cost = _this.validateResult(die_cost);
    }
  }

/*
 * Calculates folding 
 *
 * Calculates Folding
 */
  calculateFolding(){
    var _this = this;
    var temp_folding = {a:0,b:0,c:0};
    temp_folding.a = parseInt($(".folding-hand-mc").find(".amount .qty-a").val());
    temp_folding.b = parseInt($(".folding-hand-mc").find(".amount .qty-b").val());
    temp_folding.c = parseInt($(".folding-hand-mc").find(".amount .qty-c").val());
    if(!isFinite(temp_folding.a)){
      temp_folding.a = 0;
    }
    if(!isFinite(temp_folding.b)){
      temp_folding.b = 0;
    }
    if(!isFinite(temp_folding.c)){
      temp_folding.c = 0;
    }
    if(this.module == "multi_sheet"){
      var line = $("#process_cost_line").val();
      if(typeof(this.temp_folding) == "undefined"){
        _this.temp_folding = [];
      }
      _this.temp_folding[line] = temp_folding;
      _this.folding = {a:0,b:0,c:0};
      _this.temp_folding.forEach(function(d){
        _this.folding.a = _this.folding.a + d.a;
        _this.folding.b = _this.folding.b + d.b;
        _this.folding.c = _this.folding.c + d.c;
      });
    }
    else{
      _this.folding = temp_folding;
    }
    _this.folding = _this.validateResult(_this.folding)
  }
  
  calculateSingleSheetNumbering(){
    let _this = this
    _this.single_sheet_numbing = {a:0,b:0,c:0}
    _this.single_sheet_numbing.a = parseInt($("#inputsModal .numbing .qty-a").val())
    _this.single_sheet_numbing.b = parseInt($("#inputsModal .numbing .qty-a").val())
    _this.single_sheet_numbing.c = parseInt($("#inputsModal .numbing .qty-a").val())
    _this.single_sheet_numbing = _this.validateResult(_this.single_sheet_numbing)
  }

  calculateCrease(){
    var _this = this;
    var res = [];
    var temp = {};
    var temp_crease = {a:0,b:0,c:0};
    temp.a = parseInt($(".creasing-die-punch").find(".amount .qty-a").val());
    temp.b = parseInt($(".creasing-die-punch").find(".amount .qty-b").val());
    temp.c = parseInt($(".creasing-die-punch").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".creasing-scoring").find(".amount .qty-a").val());
    temp.b = parseInt($(".creasing-scoring").find(".amount .qty-b").val());
    temp.c = parseInt($(".creasing-scoring").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    res.forEach(function(d){
      if(!isFinite(d.a)){
        d.a = 0;
      }
      if(!isFinite(d.b)){
        d.b = 0;
      }
      if(!isFinite(d.c)){
        d.c = 0;
      }
      temp_crease.a = temp_crease.a + d.a;
      temp_crease.b = temp_crease.b + d.b;
      temp_crease.c = temp_crease.c + d.c;
    });
    if(this.module == "multi_sheet"){
      var line = $("#process_cost_line").val();
      if(typeof(this.temp_spot == "undefined")){
        _this.temp_crease = [];
      }
      _this.temp_crease[line] = temp_crease;
      _this.crease = {a:0,b:0,c:0};
      _this.temp_crease.forEach(function(d){
        _this.crease.a = _this.crease.a + d.a;
        _this.crease.b = _this.crease.b + d.b;
        _this.crease.c = _this.crease.c + d.c;
      });
    }
    else{
      _this.crease = temp_crease;
    }
    _this.crease = _this.validateResult(_this.crease)
  }

  calculateBlanket(){
    var blanket_type = this.getInput(1,"blanket_sel");
    var blanket_rate = this.getInput(1,"blanket_inp");
    if(blanket_type == "None"){
      this.blanket = {a:0,b:0,c:0};
    }
    else{
      this.blanket = {a:blanket_rate,b:blanket_rate,c:blanket_rate};
    }
    this.showResult("blanket-cost",this.blanket);
  }

  calculateAq(){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var rate_type = "";
    var rate = 0;
    var pages = 0;
    var lami_type = "";
    var width = 0;
    var height = 0;
    var format = 0;
    var aq = {a:0,b:0,c:0};
    var aq_type = this.getInput(1,"coating_item","string");
    if(aq_type != "None"){
      rate_type = this.getInput(1,"coating_rate_per","string");
      rate = this.getInput(1,"coating_rate");
      if(rate_type == "lot"){
        aq.a = rate;
        aq.b = rate;
        aq.c = rate;
      }
      else if(rate_type == "set"){
        aq.a = rate * qty_a;
        aq.b = rate * qty_b;
        aq.c = rate * qty_c;
      }
      else if(rate_type == "inch_sq"){
        width = this.getInput(1,"width");
        height = this.getInput(1,"height");
        rate = this.getInput(1,"coating_rate");
        format = this.getInput(1,"inp_finish_size_format");
        aq.a = (qty_a * width * height  * rate)/(format*100);
        aq.b = (qty_b * width * height  * rate)/(format*100);
        aq.c = (qty_c * width * height  * rate)/(format*100);
      }
    }
    this.aq = aq;
    this.showResult("uviaqeous-coat", this.aq);
  }

  calculateLami(row_class){
    if((row_class == "lamination-matt" || row_class == "lamination-gloss") &&
      this.module == "box" ){
        this.calculateMet();
        return;
    }
    var _this = this;
    var res = [];
    var temp = {};
    var temp_lami = {a:0,b:0,c:0};
    if(this.module != "box")
    {
      temp.a = parseInt($(".lamination-matt").find(".amount .qty-a").val());
      temp.b = parseInt($(".lamination-matt").find(".amount .qty-b").val());
      temp.c = parseInt($(".lamination-matt").find(".amount .qty-c").val());
      res.push(JSON.parse(JSON.stringify(temp)));
      temp.a = parseInt($(".lamination-gloss").find(".amount .qty-a").val());
      temp.b = parseInt($(".lamination-gloss").find(".amount .qty-b").val());
      temp.c = parseInt($(".lamination-gloss").find(".amount .qty-c").val());
      res.push(JSON.parse(JSON.stringify(temp)));
    }
    temp.a = parseInt($(".uv-coating-flood").find(".amount .qty-a").val());
    temp.b = parseInt($(".uv-coating-flood").find(".amount .qty-b").val());
    temp.c = parseInt($(".uv-coating-flood").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".drip-off").find(".amount .qty-a").val());
    temp.b = parseInt($(".drip-off").find(".amount .qty-b").val());
    temp.c = parseInt($(".drip-off").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".varnishing").find(".amount .qty-a").val());
    temp.b = parseInt($(".varnishing").find(".amount .qty-b").val());
    temp.c = parseInt($(".varnishing").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".aqueous-coating").find(".amount .qty-a").val());
    temp.b = parseInt($(".aqueous-coating").find(".amount .qty-b").val());
    temp.c = parseInt($(".aqueous-coating").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    res.forEach(function(d){
      if(!isFinite(d.a)){
        d.a = 0;
      }
      if(!isFinite(d.b)){
        d.b = 0;
      }
      if(!isFinite(d.c)){
        d.c = 0;
      }
      temp_lami.a = temp_lami.a + d.a;
      temp_lami.b = temp_lami.b + d.b;
      temp_lami.c = temp_lami.c + d.c;
    });
    if(this.module == "multi_sheet"){
      var line = $("#process_cost_line").val();
      if(typeof(this.temp_lami) == "undefined"){
        _this.temp_lami = [];
      }
      _this.temp_lami[line] = temp_lami;
      _this.lami = {a:0,b:0,c:0};
      _this.temp_lami.forEach(function(d){
        _this.lami.a = _this.lami.a + d.a;
        _this.lami.b = _this.lami.b + d.b;
        _this.lami.c = _this.lami.c + d.c;
      });
      _this.lami = _this.validateResult(_this.lami)
    }
    else{
      _this.lami = temp_lami;
      _this.lami = _this.validateResult(_this.lami)
    }
  }

  calculatePrinting(){
    this.printing = {a:0, b:0, c:0};
    var min_printing = {a:0, b:0, c:0};
    var after_printing = {a:0, b:0, c:0};
    var i = 1;
    if(window.module =="stationery"){
      var qty_a = this.getInput(0,"quantity_a");
      var qty_b = this.getInput(0,"quantity_b");
      var qty_c = this.getInput(0,"quantity_c");
      var copies = this.getInput(1,"inp_copies_set");
      var sets = this.getInput(1,"inp_sets_book");
      var ups = this.getInput(1,"inp_ups_in_plate");
      var sets = this.getInput(1,"inp_sets_book");
      var plate = this.getInput(1,"sel_plate_master");
      var rate = this.getInput(1,"inp_print_rate");
      var colors = this.getInput(1,"sel_num_colors");
      var print_a = Math.ceil((qty_a * copies * sets / ups / plate)/1000)
        * rate * colors;
      var print_b = Math.ceil((qty_b * copies * sets / ups / plate)/1000)
        * rate * colors;
      var print_c = Math.ceil((qty_c * copies * sets / ups / plate)/1000)
        * rate * colors;
      this.printing = {a:print_a, b:print_b, c:print_c};
      this.showResult("printing", this.printing);
      return;
    }
    if(window.module == "book"){
      this.title_min_printing = this.calculateMinPrinting(1);
      var title_after_printing = this.calculateAfterPrinting(1);
      this.title_printing = title_after_printing;
      this.showResult("title-print", this.title_printing);
      i = 2;
    }
    for(i; i < this.inputs.length; i++){
      min_printing = this.Add(min_printing, this.calculateMinPrinting(i));
      after_printing = this.Add(after_printing, this.calculateAfterPrinting(i));
    }
    this.printing = after_printing;
    this.min_printing = min_printing;
    this.showResult("printing", this.printing);
    if(window.module == "calendar"){
      this.calculateOverPrinting();
    }
  }

  calculatePrintQty(i){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var plate_sig = this.getInput(i, "inp_pages_in_plate_sig");
    var print_every = this.getInput(0,"print_calculation_every");
    var print_sides = this.getTotalPgs(i);
    if(window.module == "box"){
      var plate_sig = this.getInput(i, "inp_ups_in_plate");
    }
    var print_qty = {};
    if(window.module == "multi_sheet" || window.module == "book"){
      var plate_sig = this.getInput(i, "inp_ups_in_plate");
      print_qty.a = Math.ceil(qty_a / plate_sig / print_every) * print_every;
      print_qty.b = Math.ceil(qty_b / plate_sig / print_every) * print_every;
      print_qty.c = Math.ceil(qty_c / plate_sig / print_every) * print_every;
      return(print_qty);
    }
    if(window.module == "calendar"){
      plate_sig = 12/this.getInput(1,"inp_months_in_plat");
    }
    print_qty.a = Math.ceil(qty_a * print_sides / plate_sig / print_every) * print_every;
    print_qty.b = Math.ceil(qty_b * print_sides / plate_sig / print_every) * print_every;
    print_qty.c = Math.ceil(qty_c * print_sides / plate_sig / print_every) * print_every;
    return(print_qty);
  }

  calculateMinPrinting(i){
    var plates = this.getPlates(i);
    var min_print = this.getInput(i,"min_print_charges");
    var min_print_rate = this.getInput(i,"inp_min_print_rate");
    var min_printing = min_print / 1000 * min_print_rate * plates;
    return({a:min_printing,b:min_printing,c:min_printing});
  }

  calculateAfterPrinting(i){
    var min_print_qty = this.getInput(i,"min_print_charges");
    var total_print_qty = this.calculatePrintQty(i);
    var rate = this.getInput(i,"inp_balance_qty");
    if(window.module == "calendar"){
      var rate = this.getInput(i,"inp_bal_print_rate");
    }
    var plates = this.getPlates(i);
    var cost = {};
    var after_print_qty = {
      a:total_print_qty.a - min_print_qty,
      b:total_print_qty.b - min_print_qty,
      c:total_print_qty.c - min_print_qty
    };
    if(after_print_qty.a < 0){after_print_qty.a =0;}
    if(after_print_qty.b < 0){after_print_qty.b =0;}
    if(after_print_qty.c < 0){after_print_qty.c =0;}
    cost.a = (after_print_qty.a)/1000 * rate * plates;
    cost.b = (after_print_qty.b)/1000 * rate * plates;
    cost.c = (after_print_qty.c)/1000 * rate * plates;
    return(cost);
  }

  calculateOverPrinting(){
    var qty = this.getInput(1,"inp_over_print_qty");
    var min_rate = this.getInput(1,"inp_min_print_rate");
    var after_rate = this.getInput(1,"inp_bal_print_rate");
    var months_in_plate = this.getInput(1,"inp_months_in_plat");
    var print_every = this.getInput(0,"print_calculation_every");
    var min_print = this.getInput(1,"min_print_charges");
    var total_qty = Math.ceil((12 / months_in_plate * qty / print_every)) * print_every;
    var colors = this.getInput(1,"sel_over_print_colors");
    var min_print_cost =  min_rate * min_print * colors /1000;
    var after_print = total_qty - min_print;
    if(after_print < 0){
      after_print = 0;
    }
    var after_print_cost = after_print * after_rate * colors /1000;
    this.printing_OP = min_print_cost + after_print_cost;
    var currency_format = { style: 'currency', currency: 'INR' };
    var format = new Intl.NumberFormat('en-IN', currency_format);
    var res = format.format(this.printing_OP).substring(1).split(".")[0];
    $(".printing-b").html(res);
  }

  calculateSpot(){
    var _this = this;
    var res = [];
    var temp = {};
    var temp_spot = {a:0,b:0,c:0};
    temp.a = parseInt($(".spotuv").find(".amount .qty-a").val());
    temp.b = parseInt($(".spotuv").find(".amount .qty-b").val());
    temp.c = parseInt($(".spotuv").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".foil-stamping").find(".amount .qty-a").val());
    temp.b = parseInt($(".foil-stamping").find(".amount .qty-b").val());
    temp.c = parseInt($(".foil-stamping").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".embossing").find(".amount .qty-a").val());
    temp.b = parseInt($(".embossing").find(".amount .qty-b").val());
    temp.c = parseInt($(".embossing").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    res.forEach(function(d){
      if(!isFinite(d.a)){
        d.a = 0;
      }
      if(!isFinite(d.b)){
        d.b = 0;
      }
      if(!isFinite(d.c)){
        d.c = 0;
      }
      temp_spot.a = temp_spot.a + d.a;
      temp_spot.b = temp_spot.b + d.b;
      temp_spot.c = temp_spot.c + d.c;
    });
    if(this.module == "multi_sheet"){
      var line = $("#process_cost_line").val();
      if(typeof(this.temp_spot) == "undefined"){
        _this.temp_spot = [];
      }
      _this.temp_spot[line] = temp_spot;
      _this.spot_uv = {a:0,b:0,c:0};
      _this.temp_spot.forEach(function(d){
        _this.spot_uv.a = _this.spot_uv.a + d.a;
        _this.spot_uv.b = _this.spot_uv.b + d.b;
        _this.spot_uv.c = _this.spot_uv.c + d.c;
      });
    }
    else{
      _this.spot_uv = temp_spot;
    }
    _this.spot_uv = _this.validateResult(_this.spot_uv)
  }

  calculatePunchDie(){
    var punch_die = this.getInput(1,"inp_punch_die_cost");
    this.punch_die = {a:punch_die,b:punch_die,c:punch_die};
    this.showResult("punch",this.punch_die);
  }

  calculatePunch(){
    var punch_inp = 0;
    if(window.module == "box"){
      var punch_type = this.getInput(1,"punch_sel","string");
      var punch_inp = this.getInput(1,"punch_inp");
      if(punch_type == "None"){
        this.punch = {a:0,b:0,c:0};
      }
      else if(punch_type == "set"){
        this.punch = {a:punch_inp,b:punch_inp,c:punch_inp};
      }
      else{
        var qty_a = this.getInput(0,"quantity_a");
        var qty_b = this.getInput(0,"quantity_b");
        var qty_c = this.getInput(0,"quantity_c");
        var sides = this.getTotalPgs(1);
        var ups = this.getInput(1,"inp_ups_in_plate");
        this.punch = {
          a: Math.ceil((qty_a * sides / ups) / 1000) * punch_inp,
          b: Math.ceil((qty_b * sides / ups) / 1000) * punch_inp,
          c: Math.ceil((qty_c * sides / ups) / 1000) * punch_inp
        }
      }
      this.showResult("punch-die", this.punch);
      return;
    }
    for(var i = 1; i < this.inputs.length; i++){
      punch_inp += this.getInput(i,"punch_inp");
    }
    this.punch = {a:punch_inp,b:punch_inp,c:punch_inp};
    this.showResult("punch-die", this.punch);
  }

  calculateMet(){
    var _this = this;
    var res = [];
    var temp = {};
    var temp_met = {a:0,b:0,c:0};
    if(this.module == "box")
    {
      temp.a = parseInt($(".lamination-matt").find(".amount .qty-a").val());
      temp.b = parseInt($(".lamination-matt").find(".amount .qty-b").val());
      temp.c = parseInt($(".lamination-matt").find(".amount .qty-c").val());
      res.push(JSON.parse(JSON.stringify(temp)));
      temp.a = parseInt($(".lamination-gloss").find(".amount .qty-a").val());
      temp.b = parseInt($(".lamination-gloss").find(".amount .qty-b").val());
      temp.c = parseInt($(".lamination-gloss").find(".amount .qty-c").val());
      res.push(JSON.parse(JSON.stringify(temp)));
    }
    temp.a = parseInt($(".met-pet").find(".amount .qty-a").val());
    temp.b = parseInt($(".met-pet").find(".amount .qty-b").val());
    temp.c = parseInt($(".met-pet").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".blister").find(".amount .qty-a").val());
    temp.b = parseInt($(".blister").find(".amount .qty-b").val());
    temp.c = parseInt($(".blister").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    res.forEach(function(d){
      if(!isFinite(d.a)){
        d.a = 0;
      }
      if(!isFinite(d.b)){
        d.b = 0;
      }
      if(!isFinite(d.c)){
        d.c = 0;
      }
      temp_met.a = temp_met.a + d.a;
      temp_met.b = temp_met.b + d.b;
      temp_met.c = temp_met.c + d.c;
    });
    if(this.module == "multi_sheet"){
      var line = $("#process_cost_line").val();
      if(typeof(this.temp_met) == "undefined"){
        _this.temp_met = [];
      }
      _this.temp_met[line] = temp_met;
      _this.met = {a:0,b:0,c:0};
      _this.temp_met.forEach(function(d){
        _this.met.a = _this.met.a + d.a;
        _this.met.b = _this.met.b + d.b;
        _this.met.c = _this.met.c + d.c;
      });
    }
    else{
      _this.met = temp_met;
    }
    _this.met = _this.validateResult(_this.met)
  }

  calculateStaple(){
    var _this = this;
    var res = [];
    var temp = {};
    var temp_staple = {a:0,b:0,c:0};
    temp.a = parseInt($(".staple-cost-saddle").find(".amount .qty-a").val());
    temp.b = parseInt($(".staple-cost-saddle").find(".amount .qty-b").val());
    temp.c = parseInt($(".staple-cost-saddle").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    temp.a = parseInt($(".staple-cost-loop").find(".amount .qty-a").val());
    temp.b = parseInt($(".staple-cost-loop").find(".amount .qty-b").val());
    temp.c = parseInt($(".staple-cost-loop").find(".amount .qty-c").val());
    res.push(JSON.parse(JSON.stringify(temp)));
    res.forEach(function(d){
      if(!isFinite(d.a)){
        d.a = 0;
      }
      if(!isFinite(d.b)){
        d.b = 0;
      }
      if(!isFinite(d.c)){
        d.c = 0;
      }
      temp_staple.a = temp_staple.a + d.a;
      temp_staple.b = temp_staple.b + d.b;
      temp_staple.c = temp_staple.c + d.c;
    });
    if(this.module == "multi_sheet"){
      var line = $("#process_cost_line").val();
      if(typeof(this.temp_staple) == "undefined"){
        _this.temp_staple = [];
      }
      _this.temp_staple[line] = temp_staple;
      _this.staple = {a:0,b:0,c:0};
      _this.temp_staple.forEach(function(d){
        _this.staple.a = _this.staple.a + d.a;
        _this.staple.b = _this.staple.b + d.b;
        _this.staple.c = _this.staple.c + d.c;
      });
    }
    else{
      _this.staple = temp_staple;
    }
    this.showResult("binding", this.staple);
  }

  Subtract(x,y){
    var res = {};
    if(typeof(y) == "number"){
      res.a = x.a + y;
      res.b = x.b + y;
      res.c = x.c + y;
    }
    else{
      res.a = x.a + y.a;
      res.b = x.b + y.b;
      res.c = x.c + y.c;
    }
    return(res);
  }

  Add(x,y){
    var res = {};
    res.a = x.a + y.a;
    res.b = x.b + y.b;
    res.c = x.c + y.c;
    return(res);
  }

  calculateDTP(){
    this.DTP = 0;
    this.title_DTP = 0;
    var inputs = this.inputs;
    var i = 1;
    if(window.module == "book"){ 
      i = 2;
      if(inputs[1].dtp_select == "Lot"){
        this.title_DTP = parseFloat(inputs[1].inp_dtp);
      }
      else if(inputs[1].dtp_select == "Page"){
        this.title_DTP = parseFloat(inputs[1].inp_dtp) * this.getTotalPgs(1);
      }
      this.title_DTP = this.validateResult(this.title_DTP);
      this.showResult("title-design",this.title_DTP);
    }
    for(i; i < inputs.length; i++){
      if(inputs[i].dtp_select == "Lot"){
        this.DTP = this.DTP + parseFloat(inputs[i].inp_dtp);
      }
      else if(inputs[i].dtp_select == "Page"){
        this.DTP = this.DTP  + parseFloat(inputs[i].inp_dtp) * this.getTotalPgs(i);
      }
    } 
    this.DTP = this.validateResult(this.DTP);
    this.showResult("design", this.DTP);
    if(window.module == "calendar"){
      var op_dtp_type = this.getInput(1,"over_print_dtp_select","string");
      if(op_dtp_type == "Lot"){
        this.DTP_OP = this.getInput(1, "over_print_dtp_val");
      }
      else if(op_dtp_type == "Page"){
        this.DTP_OP = this.getInput(1, "over_print_dtp_val") * this.getTotalPgs(1);
      }
      var currency_format = { style: 'currency', currency: 'INR' };
      var format = new Intl.NumberFormat('en-IN', currency_format);
      var res = format.format(this.DTP_OP).substring(1).split(".")[0];
      $(".design-b").html(res);
    }
  }

  getInput(i, inp_name, type = "float"){
    var inp = this.inputs[i][inp_name];
    switch(type){
      case "float":
        inp = parseFloat(inp);
        return(isNaN(inp) ? 0 : inp);
      break;
      case "int":
        return(isNaN(inp) ? 0 : inp);
      break;
      default:
        return(inp);
      break;
    }
  }

  calculateCalendarBinding(){
    var qty = this.getInput(0,"quantity_a");
    var rate = this.getInput(1,"inp_tinning");
    this.tinning = qty * rate;
    var currency_format = { style: 'currency', currency: 'INR' };
    var format = new Intl.NumberFormat('en-IN', currency_format);
    var res = format.format(this.tinning).substring(1).split(".")[0];
    $(".binding-labour-a").html(res);
  }

  getUPS(i){
    var _this = this;
    switch(_this.module){
      case 'stationery':
        var ups = _this.getInput(i,"inp_ups_in_plate");
      break;
      case 'single_sheet':
        var ups = _this.getInput(i,"inp_pages_in_plate_sig");
      break;
      case 'multi_sheet':
        var ups = _this.getInput(i,"inp_pages_in_plate_sig");
      break;
      case 'book':
        var ups = _this.getInput(i,"inp_ups_in_plate");
      break;
      case 'box':
        var ups = _this.getInput(i,"inp_ups_in_plate");
      break;
      case 'calendar':
        var ups = 1;
      break;
    }
    if(ups == 0){
      ups = 1;
    }
    return(ups);
  }

  calculatePrintRun(i){
    var _this = this;
    if(typeof(_this.plate_runs) == "undefined"){
      _this.plate_runs = {};
    }
    var qty_a = _this.getInput(0,"quantity_a");
    var qty_b = _this.getInput(0,"quantity_b");
    var qty_c = _this.getInput(0,"quantity_c");
    var ups = _this.getUPS(i);
    var total_pgs = 1;
    if( window.module == "single_sheet" || 
        window.module == "box" ){
      total_pgs = _this.getTotalPgs(i);
    }
    else if(window.module == "stationery"){
      var sets = _this.getInput(1, "inp_sets_book");
      var copies = _this.getInput(1,"inp_copies_set");
      total_pgs = copies * sets;
    }
    if(typeof(_this.print_run_length) == "undefined"){
      if(window.module == "stationery"){
        _this.print_run_length = parseInt($("#print_master_run_length").val().replace(",",""));
        if(isNaN(_this.print_run_length)){
          _this.print_run_length = 10000
        } 
      }
      else{
        _this.print_run_length = parseInt($("#print_run_length").val().replace(",",""));
        if(isNaN(_this.print_run_length)){
          _this.print_run_length = 25000
        } 
      }
    }
    var run_length = _this.print_run_length;
    if(window.module == "calendar"){
      var qty_op = _this.getInput(1,"inp_over_print_qty");
      var mnths_in_plate = _this.getInput(1,"inp_months_in_plat");
      var plate_runs = {
        a:Math.ceil( qty_a / run_length),
        b:0,
        c:0,
        op:Math.ceil( (qty_op * 12 / mnths_in_plate) / run_length)
      }
      if(typeof(_this.plate_runs[i]) == "undefined"){
        _this.plate_runs[i] = {a:1,b:1,c:1,op:1};
      }
      if( (plate_runs.a > _this.plate_runs[i]['a']) ||
          (plate_runs.op > _this.plate_runs[i]['op'])){
        $(".print_run_length").val(_this.print_run_length);
        $("#change_print_run").removeClass("animate-bg");
        $("#printRunLengthChange").show();
        _this.plate_runs[i]['a'] = plate_runs.a; 
        _this.plate_runs[i]['op'] = plate_runs.op; 
      }
    }
    else{
      var plate_runs = {
        a:Math.ceil( (qty_a * total_pgs / ups) / run_length),
        b:Math.ceil( (qty_b * total_pgs / ups) / run_length),
        c:Math.ceil( (qty_c * total_pgs / ups) / run_length)
      }
      if(typeof(_this.plate_runs[i]) == "undefined"){
        _this.plate_runs[i] = {a:1,b:1,c:1};
      }
      if( (plate_runs.a > _this.plate_runs[i]['a']) ||
          (plate_runs.b > _this.plate_runs[i]['b']) ||
          (plate_runs.c > _this.plate_runs[i]['c']) ){
        if(window.module !== "stationery"){
          $(".print_run_length").val(_this.print_run_length);
          $("#printRunLengthChange").show();
        }
        _this.plate_runs[i]['a'] = plate_runs.a; 
        _this.plate_runs[i]['b'] = plate_runs.b; 
        _this.plate_runs[i]['c'] = plate_runs.c; 
      }
    }
    return(plate_runs);
  }

  calculatePlateCost(){
    var _this = this;
    _this.plate_cost = {a:0,b:0,c:0};
    var plates = 0;
    var plate_runs = {};
    var plate_rate = 0;
    var i = 1;
    if(window.module == "book"){
      i = 2;
      var title_plates = _this.getPlates(1);
      var title_plate_rate = _this.getInput(1,"inp_plate_cost"); 
      if(title_plates == 0 || title_plate_rate == 0){
        _this.title_plate_cost = _this.title_min_printing;
        _this.title_plate_cost = _this.validateResult(_this.title_plate_cost);
        _this.showResult("title-plate", _this.title_plate_cost);
      }
      else{
        plate_runs = _this.calculatePrintRun(1);
        _this.title_plate_cost = {};
        _this.title_plate_cost.a = title_plates * title_plate_rate * plate_runs.a;
        _this.title_plate_cost.b = title_plates * title_plate_rate * plate_runs.b;
        _this.title_plate_cost.c = title_plates * title_plate_rate * plate_runs.c;
        _this.title_plate_cost = _this.Add(_this.title_plate_cost,_this.title_min_printing);
        _this.title_plate_cost = _this.validateResult(_this.title_plate_cost);
        _this.showResult("title-plate", _this.title_plate_cost);
      }
    }
    if(window.module == "stationery"){
      plates = _this.getPlates(1);
      var plate_rate = _this.getInput(1,"inp_plate_master_cost_each"); 
      if(plates == 0 || plate_rate == 0){
        _this.plate_cost = 0;
        _this.plate_cost = _this.validateResult(_this.plate_cost);
        _this.showResult("plate", _this.plate_cost);
        return;
      }
      plate_runs = _this.calculatePrintRun(1);
      _this.plate_cost.a = _this.plate_cost.a + plates * plate_rate * plate_runs.a;
      _this.plate_cost.b = _this.plate_cost.b + plates * plate_rate * plate_runs.b;
      _this.plate_cost.c = _this.plate_cost.c + plates * plate_rate * plate_runs.c;
      _this.plate_cost = _this.validateResult(_this.plate_cost);
      _this.showResult("plate", _this.plate_cost);
      return;
    }
    for(i; i < this.inputs.length; i++){
      plates = this.getPlates(i);
      var plate_rate = _this.getInput(i,"inp_plate_cost"); 
      if(plates == 0 || plate_rate == 0){
        continue;
      }
      plate_runs = _this.calculatePrintRun(i);
      _this.plate_cost.a = _this.plate_cost.a + plates * plate_rate *plate_runs.a;
      _this.plate_cost.b = _this.plate_cost.b + plates * plate_rate *plate_runs.b;
      _this.plate_cost.c = _this.plate_cost.c + plates * plate_rate *plate_runs.c;
    }
    _this.plate_cost = _this.validateResult(_this.plate_cost);
    _this.plate_cost = _this.Add(_this.plate_cost, _this.min_printing)
    _this.showResult("plate", _this.plate_cost);
    if(window.module == "calendar"){
      var op_colors = _this.getInput(1,"sel_over_print_colors");
      _this.plate_cost_OP = plate_rate * op_colors * plate_runs.op;
      var currency_format = { style: 'currency', currency: 'INR' };
      var format = new Intl.NumberFormat('en-IN', currency_format);
      var res = format.format(_this.plate_cost_OP).substring(1).split(".")[0];
      $(".plate-b").html(res);
    }
  }

  getPlates(i){
    switch(this.module){
      case 'single_sheet':
        var pgs_in_plate = this.getInput(i, "inp_pages_in_plate_sig");
        var print_sides = this.getInput(i, "sel_print_sides");
        var colors = this.getInput(i, "sel_num_colors")
        //test update for calculation of min print qty and balance qty
        //var plates = Math.ceil( print_sides / pgs_in_plate) * colors;
        var plates = colors;
      break;
      case 'multi_sheet':
        var pgs_in_plate = this.getInput(i, "inp_pages_in_plate_sig");
        var print_sides = this.getInput(i, "inp_total_pgs");
        var colors = this.getInput(i, "sel_num_colors")
        var plates = Math.ceil( print_sides / pgs_in_plate) * colors;
      break;
      case 'stationery':
        var print_sides = this.getInput(1, "sel_plate_master");
        var colors = this.getInput(1, "sel_num_colors")
        var plates = print_sides * colors;
      break;
      case 'book':
        var pgs_in_plate = this.getInput(i, "inp_pages_in_plate_sig");
        var print_sides = this.getInput(i, "inp_total_pgs");
        var colors = this.getInput(i, "sel_num_colors")
        let raw_plates = print_sides / pgs_in_plate
        var plates = 0
        if(pgs_in_plate <= 8){
          plates = Math.ceil( raw_plates )
          if((plates - raw_plates) == 0.25){
            plates = plates + 1
          }
        }
        else if(pgs_in_plate == 16){
          plates = Math.floor( raw_plates )
          const extra = raw_plates - plates
          if( extra == 0.125 || extra == 0.250 || extra == 0.500 ){
            plates = plates + 1
          }
          else if( extra == 0.375 || extra == 0.625 || extra == 0.750 ){
            plates = plates + 2
          }
          else if( extra == 0.875 ){
            plates = plates + 3
          }
        }
        plates = plates * colors
      break;
      case 'box':
        var pgs_in_plate = this.getInput(i, "inp_finish_size_format");
        var print_sides = this.getTotalPgs(1);
        var colors = this.getInput(i, "sel_num_colors");
        var plates = Math.ceil( print_sides / pgs_in_plate) * colors;
      break;
      case 'calendar':
        var months_in_plate = this.getInput(i, "inp_months_in_plat");
        var colors = this.getInput(i, "sel_num_colors_front")
        + this.getInput(i, "sel_num_colors_back");
        var plates = Math.ceil( 12 / months_in_plate) * colors;
      break;
    }
    if(!isFinite(plates)){
      plates = 0;
    }
    return(plates);
  }
  updateAmounts(changed_row, res_a, res_b, res_c, min){
    min = parseInt(min);
    if(isNaN(min)){
      min = 0;
    }
    if(!isFinite(res_a)){
      res_a = 0;
    } 
    if(!isFinite(res_b)){
      res_b = 0;
    } 
    if(!isFinite(res_c)){
      res_b = 0;
    } 
    if(res_a < min && res_a != 0){
      res_a = min;
    }
    if(res_b < min && res_b != 0){
      res_b = min;
    }
    if(res_c < min && res_c != 0){
      res_c = min;
    }
    $(changed_row).children(".amount").children(".qty-a").val(res_a);
    $(changed_row).children(".amount").children(".qty-b").val(res_b);
    $(changed_row).children(".amount").children(".qty-c").val(res_c);
  }

  calculateAllPostProcessCost(){
    var _this = this;
    if( _this.module == "multi_sheet" && $("#inputsModal").css("display") == "none"){
      _this.clearPostProcessTemps();
      for(var i = 0; i < $("#inputs_rows tr").length; i++){
        $("#process_cost_line").val(i);
        _this.loadRowToProcess();
        _this.calculateAllProcessCostForRow();
      }
    }
    else{
      _this.calculateAllProcessCostForRow();
    }
  }

/*
 * clears Post Process Temp results
 * 
 * clears Post Process Temp results
 */
  clearPostProcessTemps(){
    var _this = this;
    _this.temp_crease = Array();
    _this.temp_die_cost = Array();
    _this.temp_folding = Array();
    _this.temp_lami = Array();
    _this.temp_met = Array();
    _this.temp_spot = Array();
    _this.temp_staple = Array();
  }

  calculateAllProcessCostForRow(){
    var _this = this;
    var rows = $("#inputsModal .modal-body .row");
    rows.each(function(i,d){
      var row_class = $(d).attr("class").replace("row","").trim();
      row_class = row_class.replace("row","").trim();
      if(row_class == ""){
        return;
      }
      if(row_class == "direct-cost"){
        return;
      }
      _this.calculatePostProcessCost(d,false);
    });
    _this.updateResults("all");
  }

  calculatePostProcessCost(changed_row, update = true){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var select = $(changed_row).children(".rate_per").children("select");
    var select_value = $(select).val();
    var row_class = $(changed_row).attr("class").replace("row","").trim();
    row_class = row_class.replace("div","").trim();
    var rate = $($(changed_row).children(".rate").children("input")[0]).val();
    var min = $("#"+row_class+"_min").val();
    $(changed_row).children(".amount").children(".qty-a").val("");
    $(changed_row).children(".amount").children(".qty-b").val("");
    $(changed_row).children(".amount").children(".qty-c").val("");
    if(select_value == "Lot"){
      $(changed_row).find(".pgs_in_sheet input").val("");
      $(changed_row).find(".pgs_in_sheet input").attr("disabled","disabled");
      var rate_each = rate / qty_a;
      var res_a = rate;
      var res_b = Math.round(qty_b * rate_each);
      var res_c = Math.round(qty_c * rate_each);
    }
    else if(select_value == "Set"){
      $(changed_row).find(".pgs_in_sheet input").val("");
      $(changed_row).find(".pgs_in_sheet input").attr("disabled","disabled");
      var res_a = Math.round(qty_a * rate);
      var res_b = Math.round(qty_b * rate);
      var res_c = Math.round(qty_c * rate);
    }
    else if(select_value == "1000"){
      $(changed_row).find(".pgs_in_sheet input").removeAttr("disabled");
      var total_pgs = this.getTotalPgs(1);
      if(this.module == "box"){
        var pgs_in_sheet = this.getInput(1,"inp_ups_in_plate");
      }
      else if(this.module == "single_sheet"){
        var pgs_in_sheet = this.getInput(1,"inp_pages_in_plate_sig");
        total_pgs = 1;
      }
      else if(this.module == "multi_sheet"){
        //for multi sheet its row by row so total pages should be pages in row
        //process_cost_line is indexed from 0 while getInput function for inputs
        //is from 1 so add 1
        const input_row = parseInt($("#process_cost_line").val()) + 1
        //get the pages for this row
        total_pgs = this.getInput(input_row,"inp_total_pgs")
        //pages in sheet signature layout
        var pgs_in_sheet = $(changed_row).find(".pgs_in_sheet input").val()
        //get pages in plate 
        const pages_in_plate = this.getInput(input_row,"inp_pages_in_plate_sig")
        //if it is work and turn then total_pages should be doubled. If the
        //total pages is less than pages in plate (x2) (Front plate and back plate)
        //then we assume wark and turn
        if(row_class == "folding-hand-mc" && total_pgs < pages_in_plate * 2 ){
          total_pgs = total_pgs * 2
        }
      }
      else{
        var pgs_in_sheet = $(changed_row).find(".pgs_in_sheet input").val();
      }
      if(row_class == "stripping" || row_class == "glueing"){
        pgs_in_sheet = 1;
      }
      var res_a = Math.ceil((qty_a * total_pgs / pgs_in_sheet)/1000) * rate;
      var res_b = Math.ceil((qty_b * total_pgs / pgs_in_sheet)/1000) * rate;
      var res_c = Math.ceil((qty_c * total_pgs / pgs_in_sheet)/1000) * rate;
    }
    else if(select_value == "100 Sq Inches"){
      if(window.module == "box" || window.module == "single_sheet"){
        var pages = 1;
      }
      else{
        var pages = $(changed_row).find(".pgs_to_process input").val();
      }
      var format = this.getInput(1,"inp_finish_size_format");
      var width = this.getInput(1,"width");
      var height = this.getInput(1,"height");
      var area = width * height;
      var res_a = Math.round((qty_a * width * height * pages * rate)/(format*100));
      var res_b = Math.round((qty_b * width * height * pages * rate)/(format*100));
      var res_c = Math.round((qty_c * width * height * pages * rate)/(format*100));
    }
    this.updateAmounts(changed_row, res_a, res_b, res_c, min);
    if(update == true){
      this.updateResults(row_class);
    }
  }

  updateResults(row_class){
    let _this = this;
    if( row_class == "punch-die"  ||
        row_class == "blanket-uv" ||
        row_class == "zinc-block" ){
        this.calculateDieCost();
    }
    else if(row_class == "glueing"){
      this.calculatePasting();
    }
    else if(row_class == "stripping"){
      this.calculateStrip();
    }
    else if( row_class == "lamination-matt"  ||
             row_class == "lamination-gloss" ||
             row_class == "uv-coating-flood" ||
             row_class == "drip-off"         ||
             row_class == "varnishing"       ||
             row_class == "aqueous-coating"  ){
      this.calculateLami(row_class);
    }
    else if( row_class == "spotuv"         ||
             row_class == "foil-stamping"  ||
             row_class == "embossing"      ){
      this.calculateSpot();
    }
    else if( row_class == "folding-hand-mc" ){
      this.calculateFolding();
    }
    else if( row_class == "creasing-die-punch"  ||
             row_class == "creasing-scoring"    ){
      this.calculateCrease();
    }
    else if( row_class == "met-pet" ||
             row_class == "blister" ){
      this.calculateMet();
    }
    else if( row_class == "numbing" ){
      this.calculateSingleSheetNumbering()
    }
    else if( row_class == "all"){
      this.calculateDieCost();
      this.calculatePasting();
      this.calculateStrip();
      this.calculateLami("");
      this.calculateSpot();
      this.calculateFolding();
      this.calculateCrease();
      this.calculateMet();
      this.calculateSingleSheetNumbering()
    }
    if( row_class != "all"){
      this.calculateHiddenExpense();
      this.calculateBasicCostWithHiddenExp();
      this.calculateProfit();
      this.calculateTotalQuote();
      this.calculateQuotePerUnit();
    }
    if(typeof(_this.die_cost) == "undefined"){
      _this.die_cost ={a:0,b:0,c:0}
    }
    if(typeof(_this.pasting) == "undefined"){
      _this.pasting ={a:0,b:0,c:0}
    }
    if(typeof(_this.sorting) == "undefined"){
      _this.sorting ={a:0,b:0,c:0}
    }
    if(typeof(_this.lami) == "undefined"){
      _this.lami ={a:0,b:0,c:0}
    }
    if(typeof(_this.met) == "undefined"){
      _this.met ={a:0,b:0,c:0}
    }
    if(typeof(_this.spot_uv) == "undefined"){
      _this.spot_uv ={a:0,b:0,c:0}
    }
    if(typeof(_this.folding) == "undefined"){
      _this.folding ={a:0,b:0,c:0}
    }
    if(typeof(_this.crease) == "undefined"){
      _this.crease ={a:0,b:0,c:0}
    }
    if(typeof(_this.single_sheet_numbing) == "undefined"){
      _this.single_sheet_numbing ={a:0,b:0,c:0}
    }
    _this.process_cost ={a:0,b:0,c:0}
    _this.process_cost = _this.Add(_this.process_cost, _this.die_cost)
    _this.process_cost = _this.Add(_this.process_cost, _this.pasting )
    _this.process_cost = _this.Add(_this.process_cost, _this.sorting )
    _this.process_cost = _this.Add(_this.process_cost, _this.lami )
    _this.process_cost = _this.Add(_this.process_cost, _this.met )
    _this.process_cost = _this.Add(_this.process_cost, _this.spot_uv )
    _this.process_cost = _this.Add(_this.process_cost, _this.folding )
    _this.process_cost = _this.Add(_this.process_cost, _this.crease )
    _this.process_cost = _this.Add(_this.process_cost, _this.single_sheet_numbing )
    _this.showResult("post_process_cost",_this.process_cost)
    this.saveProcessToRow();
  }

  saveProcessToRow(){
    var rows = $("#inputsModal .modal-body .row");
    var data = [];
    $(rows).each(function(i,d){
      var row_class = $(d).attr("class").replace("row","").trim();
      var row = {};
      if( row_class == ""){
        return;
      }
      if( row_class == "direct-cost" ){
        row.row_class = "punch-die";
        row.checked = $("#inputsModal .punch-die .select input").is(":checked");
        row.rate = $("#inputsModal .punch-die .rate input").val();
        data.push(JSON.parse(JSON.stringify(row)));
        row.row_class = "blanket-uv";
        row.checked = $("#inputsModal .blanket-uv .select input").is(":checked");
        row.rate = $("#inputsModal .blanket-uv .rate input").val();
        data.push(JSON.parse(JSON.stringify(row)));
        row.row_class = "zinc-block";
        row.checked = $("#inputsModal .zinc-block .select input").is(":checked");
        row.rate = $("#inputsModal .zinc-block .rate input").val();
        data.push(JSON.parse(JSON.stringify(row)));
        return;
      }
      row.row_class = row_class;
      if($(d).find(".select input").is(":checked")){
        row.checked = true;
      }
      else{
        row.checked = false;
      }
      row.rate_per = $(d).find(".rate_per select").val();
      row.rate = $(d).find(".rate input").val();
      if($(d).find(".pgs_to_process input").length == 1){
        row.pgs_to_process = $(d).find(".pgs_to_process input").val();
      }
      else{
        row.pgs_in_sheet = $(d).find(".pgs_in_sheet input").val();
      }
      row.qty_a = $(d).find(".amount .qty-a").val();
      row.qty_b = $(d).find(".amount .qty-b").val();
      row.qty_c = $(d).find(".amount .qty-c").val();
      data.push(row);
    });
    if(this.module == "book"){
      $("#book_title .process_cost").attr("process",JSON.stringify(data));
    }
    else if( this.module == "box" || this.module == "single_sheet"){
      $("#inputs_rows .process_cost").attr("process",JSON.stringify(data));
    }
    else if( this.module == "multi_sheet" ){
      var line_number = parseInt($("#process_cost_line").val());
      $($("#inputs_rows tr .process_cost")[line_number])
        .attr("process",JSON.stringify(data));
    }
  }

  loadRowToProcess(){
    if( this.module == "book" ){
      var process = $("#book_title .process_cost").attr("process");
    }
    else if( this.module == "box" || this.module == "single_sheet"){
      var process = $("#inputs_rows .process_cost").attr("process");
    }
    else if( this.module == "multi_sheet" ){
      var line_number = parseInt($("#process_cost_line").val());
      var process = $($("#inputs_rows tr .process_cost")[line_number]).attr("process");
    }
    $("#inputsModal .row input").val("");
    $("#inputsModal .select input").prop("checked",false);
    $("#inputsModal select").val("");
    if(typeof(process) == "undefined"){
      return;
    }
    process = JSON.parse(process);
    process.forEach(function(d){
      if(d.row_class == "punch-die" && d.checked == true){
        $("#inputsModal .punch-die .select input").prop("checked",true);
        $("#inputsModal .punch-die .rate input").val(d.rate);
      }
      if(d.row_class == "blanket-uv" && d.checked == true){
        $("#inputsModal .blanket-uv .select input").prop("checked",true);
        $("#inputsModal .blanket-uv .rate input").val(d.rate);
      }
      if(d.row_class == "zinc-block" && d.checked == true){
        $("#inputsModal .zinc-block .select input").prop("checked",true);
        $("#inputsModal .zinc-block .rate input").val(d.rate);
      }
      var row_class = "#inputsModal ." + d.row_class;
      if(d.checked == true){
        $(row_class + " .select input").prop("checked",true);
        $(row_class + " .rate_per select").val(d.rate_per);
        $(row_class + " .rate input").val(d.rate);
        $(row_class + " .rate input").removeAttr("disabled");
        $(row_class + " .pgs_to_process input").removeAttr("disabled");
        $(row_class + " .pgs_in_sheet input").removeAttr("disabled");
        if(typeof(d.pgs_to_process) != "undefined"){
          $(row_class + " .pgs_to_process input").val(d.pgs_to_process);
        }
        else{
          $(row_class + " .pgs_in_sheet input").val(d.pgs_in_sheet);
        }
        $(row_class + " .amount .qty-a").val(d.qty_a);
        $(row_class + " .amount .qty-b").val(d.qty_b);
        $(row_class + " .amount .qty-c").val(d.qty_c);
      }
      else{
        $(row_class + " .rate_per select").attr("disabled","disabled");
        $(row_class + " .rate input").attr("disabled","disabled");
        $(row_class + " .pgs_to_process input").attr("disabled","disabled");
        $(row_class + " .pgs_in_sheet input").attr("disabled","disabled");
      }
    });
  }
}
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
/**
 * File for the paper javascript functions
 * 
 * File containing the javascript functions for paper management
 *
 * @package xpress
 * @copyright ExpressTech
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
/*
 * File for Class xpress 
 *
 * @ver 1.0
 * @author Kaleshwar Chand
 * @copy xPressTech 2022
 */

/*
 * Class xpress
 *
 * This class handles the generic functions of the xPressQuote software
 *
 * Over time all the functions will be migrated to be used through this class
 *
 * @requires paper class
 * @requires templates class
 */
class XPRESS extends TEMPLATES{

  /*
   * Constructor for xpress class
   * 
   * Sets up the class for use
   * @param string module the module that is in use
   */
  constructor( module ){
    super()
    let _this = this;
    _this.module = module
    _this.paper = new PAPER()
    _this.binding = new BINDING( module )
    window.binding = _this.binding
    _this.enableActions()
  }
  
  /*
   * Custom alert type
   * 
   * Custom alert type to use in place of the default browser alert and confirm
   * dialogs as we can provide much more customization
   *
   * @param type The type of alert (one of alert or confirm)
   * @param header The title of the alert (full html)
   * @param body The text of the alert (full html)
   * @param width The width of the alert
   * @param alert_status The status to convey to the user (one of info, success 
   *  and failure)
   * @param button_text The button text for "alert" type alerts, for confirm
   *  type alerts the button text will be an array of length 2 with the first
   *  for resolve and second for reject
   * @param buttons An array of buttons to be used with "confirm" type alerts,
   *  these buttons (if provided) will override the default buttons and the
   *  button_text
   *   the buttons are objects as such
   *   { text: 'the button text',
   *     button_type: one of confirm or cancel to use for resolve/reject,
   *      multiple buttons can be of any of the types.
   *     callback: function to run when button is clicked, if no callback is
   *     provided clicking the button will close the alert, and resolve, reject
   *     according to button type
   *     cssClass: cssClass to add to the button (if any)
   *   }
   * @param modal The modal to use for the alert
   *
   * @return returns a promise for confirm type alert which resolves when the
   *  "sucess" button is clicked and rejects when the "failure" button is
   *  clicked
   */
  modalAlert(type, header, body,
    alert_status = "info",
    button_text = "OK", 
    width = "max-content",
    buttons = [], 
    modal = "#alertModal"){
    
    //make a failure alert easy to spot
    if(alert_status == "failure"){
      //show the hand
      $(modal).find(".modal-body .hand_stop").removeClass("hide");
    }
    else{
      //hide the hand
      $(modal).find(".modal-body .hand_stop").addClass("hide");
    }
    
    //set the width
    $(modal).find(".modal-content").css("width", width);
    
    //set the header text
    $(modal).find(".header-text").html(header);
    
    //set the body
    $(modal).find(".modal-body .message").html(body);
    
    //remove hide class from x button in case it has been added before
    $(modal).find(".close").removeClass("hide");
    
    //set the ok button for "alert" type of alerts
    //the ok button appears in the footer
    //the ok button has class close so that it will close the alert
    if( type == "alert"  || type == "info" ){
      var footer_html = '<button class="quote_buttons close">' + button_text 
        + '</button>';
      $(modal).find(".modal-footer").html(footer_html);
    }
    
    else if( type == "confirm" ){
      //alert type is confirm
      //hide the close x button so the user has to choose one of the provided
      //actions
      $(modal).find(".close").addClass("hide");
      
      if(buttons.length == 0 ){
        //custom buttons not provided
        if(typeof(button_text) == "string"){
          //custom text for buttons not provided
          var confirm_text = "OK";
          var cancel_text = "Cancel";
        }
        else{
          //custom text has been provided for the buttons
          var confirm_text = button_text[0];
          var cancel_text = button_text[1];
        }
        var footer_html = '<button class="quote_buttons  close confirm">' 
          + confirm_text + '</button>' 
          + '<button class="quote_buttons close cancel">'
          + cancel_text + '</button>';
        $(modal).find(".modal-footer").html(footer_html);
      }
      
      //create a promise to return 
      const promise = new Promise((resolve,reject) => {
        $(modal).find(".modal-footer").find(".confirm").click(function(e){
          resolve(1);
        });
        $(modal).find(".modal-footer").find(".cancel").click(function(e){
          reject(1);
        });
      });
      //show the alert
      $(modal).removeClass("hide");
      
      //let the ok and x button close the alert
      $(modal).find(".close").click(function(e){
        $(modal).addClass("hide");
      });
      return(promise);
    }
    
    //show the alert
    $(modal).removeClass("hide");
    
    //let the ok and x button close the alert
    $(modal).find(".close").click(function(e){
      $(modal).addClass("hide");
    });
  }
}
/*
 * File for the tour function 
 *
 * This file will have the tour function and uses the guides script from 
 * http://ejulianova.github.io/guides/
 * This script also use jquery
 *
 * @package xpress
 * @ver 1.0
 * @copy xPressTech 2022
 */

/*
 * function that runs the tour
 *
 * This function runs the tour.
 * The guides variable is inside this function so that by the time the variable
 * is created all the required data has been loaded.
 */
function runTour(){

  var guides = $.guides({
    guides:[
      /***********************************************************************/
      /* DO NOT EDIT ABOVE THIS LINE******************************************/
      /***********************************************************************/

      //the guides that will be shown
      //every guide starts with {
      {
        html:'Click2Learn में आपका स्वागत है। यहां हम एक-एक करके एक्सप्रेस कोट सॉफ्टवेयर के कार्यों को समझेंगे '
                  +'और सीखेंगे। आपको बस स्क्रीन पर दी गई समझ को पढ़ना है, समझना है और माउस से उस पर क्लिक करना है।',
        actions:[{
          element: $("#log_out"),
          type: "click"
        }]
      },{
        html: 'एक्सप्रेस कोट सॉफ्टवेयर में लॉग इन करने पर, पहला मॉड्यूल सिलेक्शन पेज खुल जाएगा। यहां सॉफ्टवेयर के '
                  +'विभिन्न मॉड्यूल के आइकॉन दिए गए हैं। यह आइकन इस बात का विवरण देता है कि किस मॉड्यूल में किस तरह के '
                  +'प्रिन्टिंग के काम का एस्टिमेट बनाया जा सकता है।'
      },{
        html : '﻿Click2Learn માં આપનું સ્વાગત છે. અહીં આપણે Xpress Quote સોફ્ટવેરના ફંક્શન્સ એક '
                   +'પછી એક સમજીશું અને શીખીશું. આપે ફક્ત સ્ક્રીન પર આપેલી સમજણ વાંચી, સમજીને માઉસથી ક્લિક કરતા જવાનું છે.'
      },{
        html : 'Xpress Quote સોફ્ટવેરમાં લૉગિન કરતા, સૌ પ્રથમ ‘મોડ્યુલ સિલેક્શન પેજ’ ખુલશે. અહીં '
                  +'સોફ્ટવેર ના અલગ અલગ મોડ્યુલ્સ ના આઈકોન આપેલ છે. આ આઈકોન માં કયા મોડ્યુલ માં કયા પ્રકારનું '
                  +'કામ થઈ શકે છે તેની વિગતો આપેલી છે. '
      }],
    
      /***********************************************************************/
      /* DO NOT EDIT BELOW THIS LINE******************************************/
      /***********************************************************************/
    render: function(d){
      var current = d.sender._current;
      var guides = d.sender.options.guides;
      var actions = guides[current].actions;
      if(typeof(actions) == "undefined"){
        return;
      }
      actions.forEach(function(action){
        var element = action.element;
        if(action.type == 'val'){
          var text = action.text;
          $(element).val(text);
        }
        else if(action.type == 'click'){
          $(element).click();
        }
        else if(action.type == 'change'){
          $(element).change();
        }
      });
    }
  });
  
  guides.start();
}
$(document).ready(function(){
  $("#tour_button").click(function(e){
    runTour();
  });
});
/**
 * File for initializing javascript functionality
 *
 * File for initializing javascript functionality and the classes required
 *
 * @package xpress
 * @copy ExpressTech
 * @version 0.1
 */

/**
 * function to initialize js functionality
 *
 * Function to initialize js functionality so all the required items work as
 * expected
 */
$(function(){
  //initialize xpress
  window.xpress = new XPRESS( _module_ )
});
/**
 * File for the user javascript functions
 * 
 * File containing the javascript functions for users
 *
 * @package xpress
 * @author Kaleshwar Chand
 * @copyright ExpressTech
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
