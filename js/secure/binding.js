/*
 * File for Class Binding
 *
 * This file contains the class and other code to use this class 
 * 
 * @package xpress
 * @author Anil Desai <anil.h.desai@gmail.com>
 * @copy Express Tech www.expressquote.in
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

