/*
 * File for calculations class
 *
 * File for Calculations Class for all calculations
 *
 * @package xpress
 * @version 0.1
 * @since 0.1
 * @author Anil Desai <anil.h.desai@gmail.com>
 * @copy Express Tech www.expressquote.in
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
