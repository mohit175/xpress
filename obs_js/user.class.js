class USER{

  /*
   * Function constructor
   *
   * Constructor for user class
   *
   * Sets up the class for use
   */
  constructor(){
    this.heart_beat_interval = 15000;
    this.setModule();
    this.setCustomCalendarInputs();
    this.enableDefaultRates();
    this.enableActions();
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
      $("#quantity_b, .quantity_b, #quantity_c, .quantity_c").addClass("hide");
      $("#quantity_a, .quantity_a").addClass("calendar");
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
    this.restrictCalBackPrint();
    this.enableExtraPgsAlert();
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
    $(".dtp_select").change(function(e){
      _this.noneChanged(this);
    });
    $(".over_print_dtp_select").change(function(e){
      _this.noneChanged(this);
    });
    $(".binding_type select").change(function(e){
      _this.noneChanged(this);
    });
    $(".punch_die select").change(function(e){
      _this.noneChanged(this);
    });
    $(".wastage select").change(function(e){
      _this.noneChanged(this);
    });
    $(".blanket_sel").change(function(e){
      _this.noneChanged(this);
    });
    $(".lami_uv_item").change(function(e){
      _this.noneChangedLami(this);
      _this.setDefaultRate(this, "lami");
    });
    $(".folding_item").change(function(e){
      _this.noneChangedLami(this);
      _this.setDefaultRate(this, "folding");
    });
    $(".met_uv_item").change(function(e){
      _this.noneChangedLami(this);
    });
    $(".coating_item").change(function(e){
      _this.noneChangedLami(this);
    });
  }

/*
 * Function set Default rate
 *
 * Sets the default rate on change of lamination and creasig
 * 
 * Sets the default rate on change of lamination and creasig
 */
  setDefaultRate(_this, field){
    if(field == "lami" && $(_this).val()!="None"){
      $(_this).next().val("inch_sq");
      $(_this).next().change();
    }
    else if(field == "folding" && $(_this).val()!="None"){
      $(_this).next().val("1000");
      $(_this).next().change();
    }
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
      $(_this).next("input").val("x");
      $(_this).next("input").addClass("js-disabled");
    }
    else{
      if($(_this).next("input").val() == "x"){
        $(_this).next("input").val("");
      }
      $(_this).next("input").attr("readonly",false);
      $(_this).next("input").removeClass("js-disabled");
    }
  }

/*
 * Function noneChangedLami
 *
 * Enables required actions when select is changed to from None for Lamination
 * and Lamination type inputs
 * 
 * Enables required actions when select is changed to from None for Lamination
 * and Lamination type inputs i.e. where there is a select and 2 inputs
 * requiring a red X
 * 
 * @param _this the action element i.e. the this that is provided when the
 * change happens
 */
  noneChangedLami(_this){
    if($(_this).val()=='None'){
      $(_this).next("select").val("x");
      $(_this).next("select").attr("readonly",true);
      $(_this).next("select").attr("disabled",true);
      $(_this).next("select").addClass("js-disabled");                                
      $(_this).parent().children("input").addClass("js-disabled");
      $(_this).parent().children("input").val("x");
    }
    else{
      $(_this).next("select").val("");
      $(_this).next("select").attr("readonly",false);
      $(_this).next("select").attr("disabled",false);
      $(_this).next("select").removeClass("js-disabled");
      $(_this).parent().children("input").removeClass("js-disabled");
      $(_this).parent().children("input").val("");
    }
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
    $("#add_row").change(function(e){
      var rows = $(this).val();
      
      if(rows == '+'){
        //if it is '+' no change is needed
        return;
      }
      
      if(window.module == "stationery"){
        //set the No. of Copies in Each Set to the number of rows 
        $("#copies_set").val(rows);
      }
      
      //change the value back to '+' to keep the user seeing '+'
      $("#add_row").val('+');
      
      var current_rows = $("#inputs_rows tr").length;
      if(rows == current_rows){
        //if the number of rows and the new nember of rows is same return
        return;
      }
      else if(rows < current_rows){
        //remove rows starting from the last one if rows are less
        while(rows < current_rows){
          $("#inputs_rows").children().last().remove();
          current_rows--;
        }
      }
      else{
        //rows are greater than the current rows so add rows from the sample row
        _this.addInputRows(rows, current_rows);
      }
      
      //update affected changes
      _this.rows_changed();
      
      //enable removing of rows
      if(rows > 1){
        $(".minus.remove").removeClass("hide");
      }
      else{
        $(".minus.remove").addClass("hide");
      }
      $(".remove-row").addClass("hide");
      $(".row_num").removeClass("hide");
      $(".remove-row").click(function(e){
        $(this).parent().parent().remove();
        _this.rows_changed();
        $(".remove-row").addClass("hide");
        $(".row_num").removeClass("hide");
      });
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
      $(this).parent().children(".tab").removeClass("active");
      $(this).addClass("active");
      $(this).parent().parent().children(".tab-body").addClass("hide");
      var target = $(this).attr("data-target");
      $("#" + target).removeClass("hide");
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
    this.renumber();
    var rows = $("#inputs_rows tr").length;
    if(window.module == "stationery"){
      $("#copies_set").val(rows);
    }
    if($(".row_num").length == 0){
      $(".minus.remove").addClass("hide");
    }
    this.enableNone();
    this.enableDefaultRates();
    window.calc.calculateAll();
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
    $(".row_num").each(function(i,row_num){
      if(_this.module == "book")
      {
        $(row_num).html(i+1);
      }
      else{
        $(row_num).html(i+2);
      }
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
    
    //enable stationery paper cost 
    if(_this.module == "stationery"){
      _this.enableStationeryPaperCost();
    }
    
    $("input").change(function(e){
      window.calc.calculateAll();
    });
    $("select").change(function(e){
      window.calc.calculateAll();
    });
    $("#inputs_rows .disabled").attr("readonly",true);
  }

/*
 * Function restrictCalBackPrint
 *
 * Restricts colors in backside printing to only be selectable if the number of
 * sheets in calendar is 12 otherwise the colors in backside printing are
 * disabled and set to 0
 */
  restrictCalBackPrint(){
    $(".sheets_in_calendar select").change(function(e){
      if($(this).val() == 12){
        $(".sel_num_colors_back").removeAttr("disabled");
      }
      else{
        $(".sel_num_colors_back").attr("disabled","disabled");
        $(".sel_num_colors_back").val("0");
        $(".sel_num_colors_back").change();
      }
    });
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

/*
 * Function enableStationeryPaperCost
 *
 * Enables automatic entry of paper cost into the price on selection of paper
 * 
 * Enables automatic entry of paper cost into the price on selection of paper
 */
  enableStationeryPaperCost(){
    $("#inputs_rows .paper_desc select").change(function(e){
      var paper_cost = $("option:selected",this).attr("paper_cost");
      $(this).next("input").val(paper_cost);
    });
  }

/*
 * Function enableDefaultRates
 *
 * Enables setting of the default rates automatically
 *
 * Enables setting of the defalt rates automatically on changing of Rate/Per
 */
  enableDefaultRates(){
    $(".lami_uv_rate_per").change(function(e){
      var rate_per = $(this).val();
      var lami_type = $($(this).parent().children(".lami_uv_item")[0]).val();
      var rate = "";
      $(this).next().val("");
      $(this).next().next().val("");
      $(this).next().next().removeClass("js-disabled");
      $(this).next().next().removeAttr("readonly");
      if(rate_per == "inch_sq"){
        switch(lami_type){
          case 'Lami.':
            rate = $("#lamination_100").val();
          break;
          case 'Drip-Off':
            rate = $("#drip_off_100").val();
          break;
          case 'Aqeous':
            rate = $("#aqeous_100").val();
          break;
          case 'UV':
            rate = $("#uv_flood_100").val();
          break;
          case 'Varnish':
            rate = $("#varnish_100").val();
          break;
          case 'Met-Pet':
            rate = $("#met_100").val();
          break;
          case 'Blister':
            rate = $("#blister_100").val();
          break;
        }
        $(this).next().val(rate);
      }
      else if(rate_per == ""){
        $(this).next().val("");
        $(this).next().next().val("");
        $(this).next().next().removeClass("js-disabled");
        $(this).next().next().removeAttr("readonly");
      }
      else{
        $(this).next().val("");
        $(this).next().next().val("X");
        $(this).next().next().addClass("js-disabled");
        $(this).next().next().attr("readonly","readonly");
      }
    });
    $(".spot-uv_sel").change(function(e){
      var spot_type = $(this).val();
      var rate = "";
      $(this).next().val("");
      $(this).next().removeClass("js-disabled");
      $(this).next().removeAttr("readonly");
      switch(spot_type){
        case 'Spot UV':
          rate = $("#spot_each").val();
          $(this).next().val(rate);
        break;
        case 'Foil Stamp.':
          rate = $("#foil_each").val();
          $(this).next().val(rate);
        break;
        case 'Embossing':
          rate = $("#embossing_each").val();
          $(this).next().val(rate);
        break;
        case 'None':
          $(this).next().val("X");
          $(this).next().addClass("js-disabled");
          $(this).next().attr("readonly","readonly");
        break;
      }
    });
    $(".folding_rate_per").change(function(e){
      var rate_per = $(this).val();
      var folding_type = $($(this).parent().children(".folding_item")[0]).val();
      var rate = "";
      $(this).next().val("");
      $(this).next().removeClass("js-disabled");
      $(this).next().removeAttr("disabled");
      $(this).next().next().val("");
      $(this).next().next().removeClass("js-disabled");
      $(this).next().next().removeAttr("disabled");
      if(rate_per == "1000"){
        switch(folding_type){
          case 'Folding':
            rate = $("#folding_1000").val();
          break;
          case 'Punch\'g':
            rate = $("#creasing_1000").val();
          break;
          case 'Scoring':
            rate = $("#scoring_1000").val();
          break;
        }
        $(this).next().val(rate);
      }
      else if(rate_per == ""){
        $(this).next().val("");
        $(this).next().next().val("");
        $(this).next().next().removeClass("js-disabled");
        $(this).next().next().removeAttr("disabled");
      }
      else if(rate_per == "None"){
        $(this).next().val("X");
        $(this).next().addClass("js-disabled");
        $(this).next().attr("disabled","disabled");
        $(this).next().next().val("X");
        $(this).next().next().addClass("js-disabled");
        $(this).next().next().attr("disabled","disabled");
      }
      else{
        $(this).next().val("");
        $(this).next().next().val("X");
        $(this).next().next().addClass("js-disabled");
        $(this).next().next().attr("disabled","disabled");
      }
    });
  }

/* Function enableExtraPgsAlert
 * 
 * Enables alert for when the number of pages to be processed are greater than
 * total pages
 * 
 * Enables alert for when the number of pages to be processed are greater than
 * total pages
 */
  enableExtraPgsAlert(){
    if(this.module == "multi_sheet" || this.module == "book"){
      $(".total_pgs input, .lami_uv_pgs").change(function(e){
        var total_pgs = $($(this).parent().parent().find(".inp_total_pgs")[0]).val();
        var uv_pgs = $($(this).parent().parent().find(".lami_uv_pgs")[0]).val();
        total_pgs = parseInt(total_pgs);
        uv_pgs = parseInt(uv_pgs);
        if(total_pgs < uv_pgs){
          if(!confirm("The pages to be processed(" + uv_pgs + ") should not be"
            + "more than total pages (" + uv_pgs + 
            ") \n Do you still want to continue?")){
              $(this).val("");
          }
        }
      });
    }
  }
}
