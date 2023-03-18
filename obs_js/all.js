/*
 * File for Class Binding
 *
 * This file contains the class and other code to use this class 
 * 
 * @package xpress
 * @author Anil Desai <anil.h.desai@gmail.com>
 * @copy eXpress Tech www.expresserp.in
 * @ver 0.1
 */

/*
 * Class Binding
 *
 * This class does calculations and functions for binding
 */
class Binding{
  
  /*
   * The constructor for the binding class
   * 
   * The constructor for the binding class
   */
  constructor(module){
    this.per_set = 1000;
    this.module = module;
    this.calculate();
    this.binding_lib = [
      {manual:"2.00", perfect:"6.00", hard:"30.00"},
      {manual:"1.25", perfect:"4.00", hard:"20.00"},
      {manual:"1.00", perfect:"3.50", hard:"12.00"},
      {manual:"1.75", perfect:"5.00", hard:"25.00"},
      {manual:"1.00", perfect:"3.50", hard:"15.00"}
    ];
    this.stationery_binding_lib = {
      "Top Cover Paper":{
        "3":"17.00", "4":"15.00", "5":"10.00", "6":"10.00", "8":"10.00",
        "9":"8.00", "10":"8.00", "12": "8.00", "16":"8.00"
      },
      "Hard Bound":{
        "3":"22.00", "4":"18.00", "5":"15.00", "6":"15.00", "8":"12.00",
        "9":"11.00", "10":"10.00", "12": "9.00", "16":"8.00"
      },
      "Pad Bound":{
        "3":"25.00", "4":"20.00", "5":"17.00", "6":"17.00", "8":"14.00",
        "9":"13.00", "10":"12.00", "12": "12.00", "16":"12.00"
      },
      "Cloth Bound":{
        "3":"70.00", "4":"60.00", "5":"45.00", "6":"45.00", "8":"30.00",
        "9":"30.00", "10":"30.00", "12": "25.00", "16":"25.00"
      }
    };
    this.enableActions();
  }
  
  /*
   * Method calculate for calculating the binding
   *
   * Method calculate for calculating the binding
   */
  calculate(){
    this.book_manual = parseFloat($("input.book_manual").val());
    this.book_perfect = parseFloat($("input.book_perfect").val());
    this.book_case = parseFloat($("input.book_case").val());
    this.total_pgs = parseFloat($("input.bind_total_pgs").val());
    this.sheet_sig = parseFloat($("input.bind_sheet_sig").val());
    this.folding = parseFloat($("input.bind_folding").val());
    this.collating = parseFloat($("input.bind_collating").val());
    this.stapling = parseFloat($("input.bind_stapling").val());
    this.sewing = parseFloat($("input.bind_sewing").val());
    this.calculateManual();
    this.calculateManualStapling();
    this.calculateManualSewing();
    this.calculatePerfect();
    this.calculatePerfectStapling();
    this.calculatePerfectSewing();
    this.calculateHardStapling();
    this.calculateHardSewing();
  }
  
  enableActions(){
    var _this = this;
    if(this.module == "book"){
      $("#book_binding").click(function(e){
        var pages;
        var totalpgs = 0;
        for(var i = 2; i < window.calc.inputs.length; i++){
          pages = parseInt(window.calc.inputs[i].inp_total_pgs);
          if(!isNaN(pages)){
            totalpgs += pages;
          }
        }
        $(".bind_total_pgs").val(totalpgs);
        $("#BindingModal").removeClass("hide");
      });
      $(".bind-res").click(function(e){
        var book_cost = $(this).text();
        $("#book_title .inp_staple").val(book_cost);
        $("#BindingModal").addClass("hide");
      });
    }
    if(this.module == "stationery"){
      $(".binding_type select, .finish_cut_format select").change(function(e){
        var format = $(".finish_cut_format select").val();
        var binding_type = $(".binding_type select").val();
        if(format != "" && binding_type != "" && binding_type != "None"){
          var cost = _this.stationery_binding_lib[binding_type][format];
          $($(".binding_type input")[0]).val(cost);
        }
      });
    }
    $(".book_size").change(function(e){
      var size = $(this).val();
      if(size == ""){
        $(".book_binding_type input").val("");
      }
      else if(size <= 5){
        var values = _this.binding_lib[size-1];
        $("#binding_inputs .book_manual").val(values.manual);
        $("#binding_inputs .book_perfect").val(values.perfect);
        $("#binding_inputs .book_case").val(values.hard);
      }
      else if(size == 6){
        $(".book_binding_type input").val("");
      }
      _this.calculate();
    });
    $("#binding_inputs input").change(function(e){
      _this.calculate();
    });
  }
  
  showResult(class_name, result){
    if(typeof(result) == "undefined" || isNaN(result)){
      result = 0;
    }
    var currency_format = { style: 'currency', currency: 'INR' };
    var format = new Intl.NumberFormat('en-IN', currency_format);
    var res = format.format(result).substring(1);
    $("." + class_name).html(res);
  }
  
  calculateManual(){
    this.manual = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + (this.stapling/this.per_set);
    this.showResult("manual-staple-cost", this.manual);
  }
  
  calculateManualStapling(){
    this.manual_staple = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + (this.stapling/this.per_set) + this.book_manual;
    this.showResult("manual-paste-cost", this.manual_staple);
  }
  
  calculateManualSewing(){
    this.manual_sewing = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) 
      + (this.total_pgs / 16 * this.sewing / this.per_set) + this.book_manual;
    this.showResult("manual-sewing-cost", this.manual_sewing);
  }
  
  calculatePerfect(){
    this.perfect = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + this.book_perfect; 
    this.showResult("perfect-cost", this.perfect);
  }
  
  calculatePerfectStapling(){
    this.perfect_staple = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + this.stapling/this.per_set + this.book_perfect; 
    this.showResult("perfect-staple-cost", this.perfect_staple);
  }
  
  calculatePerfectSewing(){
    this.perfect_sewing = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) 
      + (this.total_pgs / 16 * this.sewing / this.per_set) + this.book_perfect;
    this.showResult("perfect-sewing-cost", this.perfect_sewing);
  }
  
  calculateHardStapling(){
    this.hard_staple = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) + (this.stapling/this.per_set) + this.book_case;
    this.showResult("hard-staple-cost", this.hard_staple);
  }
  
  calculateHardSewing(){
    this.hard_sewing = (this.total_pgs/this.sheet_sig/this.per_set)
      * (this.folding + this.collating) 
      + (this.total_pgs / 16 * this.sewing / this.per_set) + this.book_case;
    this.showResult("hard-sew-cost", this.hard_sewing);
  }
}

$(document).ready(function(){
	var url = window.location.href;
	var url_split = url.split('/');
	var module = url_split[url_split.length - 1].split('.')[0];
  if(module == "binding" || module == "book" || module == "stationery"){
    window.binding = new Binding(module);
  }
});

class calculator{
  constructor(){
    this.module = window.module;
    var paper_size_units = $("#paper_size_units").val();
    if(paper_size_units == "inches"){
      this.paper_conv_factor = 2540003;
    }
    else{
      //centimeters
      this.paper_conv_factor = 10000000;
    }
    this.calculateAll();
  }

  showResult(class_name, result){
    if(typeof(result) == "number"){
      var temp_res = result;
      result = {a:temp_res, b:temp_res, c:temp_res};
    }
    if(typeof(result) == "undefined"){
      result = {a:0, b:0, c:0};
    }
    if(class_name != "quote-per-unit" && class_name != "quote-over-print"){
      result.a = Math.round(result.a);
      result.b = Math.round(result.b);
      result.c = Math.round(result.c);
    }
    var currency_format = { style: 'currency', currency: 'INR' };
    var format = new Intl.NumberFormat('en-IN', currency_format);
    if(class_name != "quote-per-unit" && class_name != "quote-over-print"){
      var res_a = format.format(result.a).substring(1).split(".")[0];
      var res_b = format.format(result.b).substring(1).split(".")[0];
      var res_c = format.format(result.c).substring(1).split(".")[0];
    }
    else{
      var res_a = format.format(result.a).substring(1);
      var res_b = format.format(result.b).substring(1);
      var res_c = format.format(result.c).substring(1);
    }
    $("." + class_name + "-a").html(res_a);
    $("." + class_name + "-b").html(res_b);
    $("." + class_name + "-c").html(res_c);
  }

  calculateAll(){
    this.inputs = getInputs();
    if(window.module == "book"){
      this.inputs.splice(2,1);
    }
    this.calculateDTP();
    this.calculatePlateCost();
    this.calculatePrinting();
    this.calculatePaper();
    if(window.module == "book" || window.module == "multi_sheet"){
      this.calculateSpot();
      this.calculatePunch();
      this.calculateStaple();
      this.calculateLami();
      this.calculateCrease();
    }
    if(window.module == "book"){
      this.calculateBinding();
    }
    if(window.module == "stationery"){
      this.calculateBinding();
      this.calculateNumbering();
    }
    if(window.module == "box"){
      this.calculateLami();
      this.calculateAq();
      this.calculateBlanket();
      this.calculateSpot();
      this.calculatePunch();
      this.calculatePunchDie();
      this.calculateStrip();
    }
    if(window.module == "calendar"){
      this.calculateCalendarBinding();
    }
    this.calculateHiddenExpense();
    this.calculateBasicCostWithHiddenExp();
    this.calculateProfit();
    this.calculateTotalQuote();
    this.calculateQuotePerUnit();
  }

  calculateNumbering(){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var copies = this.getInput(1,"inp_copies_set");
    var sets = this.getInput(1,"inp_sets_book");
    var rate = this.getInput(1,"inp_numbing");
    var numb_a = Math.ceil((qty_a * copies * sets)/1000) * rate;
    var numb_b = Math.ceil((qty_b * copies * sets)/1000) * rate;
    var numb_c = Math.ceil((qty_c * copies * sets)/1000) * rate;
    this.numb = {a:numb_a, b:numb_b, c:numb_c};
    this.showResult("numbering", this.numb);
  }

  calculateStrip(){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var sort_rate = this.getInput(1,"inp_sorting");
    var paste_rate = this.getInput(1,"inp_pasting");
    this.sorting = {
      a:qty_a * sort_rate /1000,
      b:qty_b * sort_rate /1000,
      c:qty_c * sort_rate /1000
    };
    this.pasting = {
      a:qty_a * paste_rate /1000,
      b:qty_b * paste_rate /1000,
      c:qty_c * paste_rate /1000
    }; 
    this.showResult("stipg-sort", this.sorting);
    this.showResult("pasting-exp", this.pasting);
  }

  calculatePF(){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var width = this.getInput(1,"width");
    var height = this.getInput(1,"height");
    var gsm = this.getInput(1,"inp_paper_gsm");
    var format = this.getInput(1,"inp_finish_size_format");
    var rate = this.getInput(1,"inp_hidden_expense");
    this.hidden_exp = {
      a: qty_a * width * height * gsm / format / this.paper_conv_factor * rate,
      b: qty_b * width * height * gsm / format / this.paper_conv_factor * rate,
      c: qty_c * width * height * gsm / format / this.paper_conv_factor * rate,
    };
    this.showResult("p-f-exp", this.hidden_exp);
  }

  calculateTotalQuote(){
    this.total_quote = this.Add(this.profit,this.basic_cost_with_exp);
    this.showResult("total-quote",this.total_quote);
  }

  calculateQuotePerUnit(){
    this.unit_quote = {
      a: this.total_quote.a / this.getInput(0,"quantity_a"),
      b: this.total_quote.b / this.getInput(0,"quantity_b"),
      c: this.total_quote.c / this.getInput(0,"quantity_c"),
    }
    this.showResult("quote-per-unit",this.unit_quote);
    if(window.module == "calendar"){
      this.unit_quote.b = this.total_quote.b / this.getInput(1,"inp_over_print_qty");
      this.showResult("quote-per-unit",this.unit_quote);
      var over_print = this.unit_quote.a + this.unit_quote.b;
      this.showResult("quote-over-print",over_print);
    }
  }

  calculateProfit(){
    var profit = this.getInput(1,"profit_inp");
    var profit_type = this.getInput(1,"profit_type","string");
    if(profit_type == "amt"){
      this.profit = {
        a: profit,
        b: profit,
        c: profit
      }
    }
    else{
      this.profit = {
        a: this.basic_cost_with_exp.a * profit/100,
        b: this.basic_cost_with_exp.b * profit/100,
        c: this.basic_cost_with_exp.c * profit/100
      }
    }
    this.showResult("profit",this.profit);
  }

  calculateBasicCostWithHiddenExp(){
    this.basic_cost_with_exp = this.Add(this.basic_cost,this.hidden_exp);
    this.showResult("basic-cost", this.basic_cost_with_exp);
  }

  calculatePerSheetCost(i){
    var paper_cost_type = this.getInput(i, "paper_cost_sel", "string");
    if(window.module == "stationery"){
      var cost = this.getInput(i, "paper_desc_amount");
      return(cost);
    }
    var cost = this.getInput(i, "inp_paper_cost");
    if(paper_cost_type == "Sheet"){
      return(cost);
    }
    var width = this.getInput(i, "width");
    var height = this.getInput(i, "height");
    var gsm = this.getInput(i, "inp_paper_gsm");
    var sheet_cost = (width * height * gsm * cost) / this.paper_conv_factor;
    return(sheet_cost);
  }

  calculateHiddenExpense(){
    if(window.module == "box"){
      this.calculatePF();
      this.calculateBasicCost();
      return;
    }
    this.calculateBasicCost();
    this.hidden_exp = {a:0,b:0,c:0};
    var hidden_exp = 0;
    for(var i = 1; i < this.inputs.length; i++){
      hidden_exp = this.getInput(i,"inp_hidden_expense")/100;
      this.hidden_exp.a += this.basic_cost.a * hidden_exp;
      this.hidden_exp.b += this.basic_cost.b * hidden_exp;
      this.hidden_exp.c += this.basic_cost.c * hidden_exp;
    }
    if(window.module == "calendar"){
      this.hidden_exp.b = 0;
    }
    this.showResult("hidden-exp", this.hidden_exp);
  }

  calculateBasicCost(){
    this.basic_cost = {};
    this.basic_cost.a = this.DTP + this.plate_cost + this.printing.a 
      + this.paper.a + this.paper_wastage.a;
    this.basic_cost.b = this.DTP + this.plate_cost + this.printing.b 
      + this.paper.b + this.paper_wastage.b;
    this.basic_cost.c = this.DTP + this.plate_cost + this.printing.c 
      + this.paper.c + this.paper_wastage.c;
    if(window.module == "multi_sheet" || window.module == "book"){
      this.basic_cost.a += this.spot_uv.a + this.punch.a + this.staple.a 
        + this.lami.a + this.crease.a; 
      this.basic_cost.b += this.spot_uv.b + this.punch.b + this.staple.b 
        + this.lami.b + this.crease.b; 
      this.basic_cost.c += this.spot_uv.c + this.punch.c + this.staple.c 
        + this.lami.c + this.crease.c; 
    }
    if(window.module == "book"){
      this.basic_cost.a += this.title_paper_total.a + this.title_DTP 
        + this.title_plate_cost + this.title_printing.a; 
      this.basic_cost.b += this.title_paper_total.b + this.title_DTP 
        + this.title_plate_cost + this.title_printing.b;
      this.basic_cost.c += this.title_paper_total.c + this.title_DTP 
        + this.title_plate_cost + this.title_printing.c;
    }
    if(window.module == "stationery"){
      this.basic_cost.a += this.binding.a + this.numb.a;
      this.basic_cost.b += this.binding.b + this.numb.b;
      this.basic_cost.c += this.binding.c + this.numb.c;
    }
    if(window.module == "box"){
      this.basic_cost.a += this.spot_uv.a + this.lami.a + this.aq.a 
        + this.blanket.a + this.pasting.a + this.punch.a + this.punch_die.a 
        + this.sorting.a;
      this.basic_cost.b += this.spot_uv.b + this.lami.b + this.aq.b 
        + this.blanket.b + this.pasting.b + this.punch.b + this.punch_die.b 
        + this.sorting.b;
      this.basic_cost.c += this.spot_uv.c + this.lami.c + this.aq.c 
        + this.blanket.c + this.pasting.c + this.punch.c + this.punch_die.c 
        + this.sorting.c;
    }
    if(window.module == "calendar"){
      this.basic_cost.a += this.tinning;
      this.basic_cost.b = this.DTP_OP + this.plate_cost_OP + this.printing_OP;
    }
  }

  getTotalPgs(i){
    switch(window.module){
      case 'single_sheet':
        return(this.getInput(i,"sel_print_sides"));
      break;
      case 'multi_sheet':
        return(this.getInput(i,"inp_total_pgs"));
      break;
      case 'book':
        return(this.getInput(i,"inp_total_pgs"));
      break;
      case 'stationery':
        return(this.getInput(1,"inp_sets_book"));
      break;
      case 'box':
        return(1);
      break;
      case 'calendar':
        return(this.getInput(1,"sel_sheets_in_calendar"));
      break;
    }
  }

  calculateBinding(){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var staple = this.getInput(1,"inp_staple");
    this.binding = {
      a: qty_a * staple,
      b: qty_b * staple,
      c: qty_c * staple
    };
    this.showResult("book-binding",this.binding);
  }

  calculatePaper(){
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
      this.title_paper_total = this.Add(this.title_paper,this.title_paper_wastage);
      this.showResult("title-paper", this.title_paper_total);
    }
    var paper = {a:0,b:0,c:0};
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
      if(window.module == "single_sheet"){
        total_pgs = 1;
      }
      if(window.module == "multi_sheet" || window.module == "book"){
        total_pgs = total_pgs/2;
      }
      paper.a = qty_a * total_pgs / cut_size * sheet_cost;
      paper.b = qty_b * total_pgs / cut_size * sheet_cost;
      paper.c = qty_c * total_pgs / cut_size * sheet_cost;
      var paper_wastage = this.calculateWastage(i, paper, wastage, sheet_cost);
      this.paper_wastage = this.Add(this.paper_wastage,paper_wastage);
      this.paper = this.Add(this.paper,paper);
    }
    this.paper_total = this.Add(this.paper,this.paper_wastage);
    this.showResult("paper", this.paper_total);
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

  calculateCrease(){
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    var rate_type = "";
    var crease_type = "";
    var rate = 0;
    var pages_in_sig = 0;
    var total_pgs = 0;
    var crease = {a:0,b:0,c:0};
    var crease_temp = {a:0,b:0,c:0};
    var min_rate = "";
    for(var i = 1; i < this.inputs.length; i++){
      crease_type = this.getInput(i,"folding_item","string");
      min_rate = "";
      switch(crease_type){
        case 'Folding':
          min_rate = $("#folding_min").val();
        break;
        case 'Punch\'g':
          min_rate = $("#creasing_min").val();
        break;
        case 'Scoring':
          min_rate = $("#scoring_min").val();
        break;
      }
      crease_temp = {a:0,b:0,c:0};
      if(crease_type != "None"){
        rate_type = this.getInput(i,"folding_rate_per","string");
        rate = this.getInput(i,"folding_rate");
        if(rate_type == "lot"){
          crease_temp.a = rate;
          crease_temp.b = rate;
          crease_temp.c = rate;
        }
        else if(rate_type == "set"){
          crease_temp.a = rate * qty_a;
          crease_temp.b = rate * qty_b;
          crease_temp.c = rate * qty_c;
        }
        else if(rate_type == "1000"){
          total_pgs = this.getInput(i,"inp_total_pgs");
          pages_in_sig = this.getInput(i,"folding_pgs");
          rate = this.getInput(i,"folding_rate");
          crease_temp.a =
            (Math.ceil((qty_a * total_pgs / pages_in_sig)/1000) * 1000 
            *rate/1000);
          crease_temp.b =
            (Math.ceil((qty_b * total_pgs / pages_in_sig)/1000) * 1000 
            *rate/1000);
          crease_temp.c =
            (Math.ceil((qty_c * total_pgs / pages_in_sig)/1000) * 1000 
            *rate/1000);
        }
      }
      if(min_rate != ""){
        min_rate = parseInt(min_rate.replace(',',''));
        if(!isNaN(min_rate)){
          if(!isNaN(crease_temp.a) && crease_temp.a != 0 && crease_temp.a < min_rate){
            crease_temp.a = min_rate;
          }
          if(!isNaN(crease_temp.b) && crease_temp.b != 0 && crease_temp.b < min_rate){
            crease_temp.b = min_rate;
          }
          if(!isNaN(crease_temp.c) && crease_temp.c != 0 && crease_temp.c < min_rate){
            crease_temp.c = min_rate;
          }
        }
      }
      crease.a = crease.a + crease_temp.a
      crease.b = crease.b + crease_temp.b
      crease.c = crease.c + crease_temp.c
    }
    this.crease = crease;
    this.showResult("crease", this.crease);
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

  calculateLami(){
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
    var lami = {a:0,b:0,c:0};
    var lami_temp = {a:0,b:0,c:0};
    var min_rate = "";
    for(var i = 1; i < this.inputs.length; i++){
      lami_temp = {a:0,b:0,c:0};
      lami_type = this.getInput(i,"lami_uv_item","string");
      min_rate = "";
      if(lami_type != "None"){
        switch(lami_type){
          case 'Lami.':
            min_rate = $("#lamination_min").val();
          break;
          case 'Drip-Off':
            min_rate = $("#drip_off_min").val();
          break;
          case 'Aqeous':
            min_rate = $("#aqeous_min").val();
          break;
          case 'UV':
            min_rate = $("#uv_flood_min").val();
          break;
          case 'Varnish':
            min_rate = $("#varnish_min").val();
          break;
          case 'Met-Pet':
            min_rate = $("#met_min").val();
          break;
          case 'Blister':
            min_rate = $("#blister_min").val();
          break;
        }
        rate_type = this.getInput(i,"lami_uv_rate_per","string");
        rate = this.getInput(i,"lami_uv_rate");
        if(rate_type == "lot"){
          lami_temp.a = rate;
          lami_temp.b = rate;
          lami_temp.c = rate;
        }
        else if(rate_type == "set"){
          lami_temp.a = rate * qty_a;
          lami_temp.b = rate * qty_b;
          lami_temp.c = rate * qty_c;
        }
        else if(rate_type == "inch_sq"){
          width = this.getInput(i,"width");
          height = this.getInput(i,"height");
          rate = this.getInput(i,"lami_uv_rate");
          pages = this.getInput(i,"lami_uv_pgs");
          if(window.module == "box"){
            pages = 1;
          }
          format = this.getInput(i,"inp_finish_size_format");
          lami_temp.a = (qty_a * width * height * pages * rate)/(format*100);
          lami_temp.b = (qty_b * width * height * pages * rate)/(format*100);
          lami_temp.c = (qty_c * width * height * pages * rate)/(format*100);
        }
        if(min_rate != ""){
          min_rate = parseInt(min_rate.replace(',',''));
          if(!isNaN(min_rate)){
            if(!isNaN(lami_temp.a) && lami_temp.a != 0 && lami_temp.a < min_rate){
              lami_temp.a = min_rate;
            }
            if(!isNaN(lami_temp.b) && lami_temp.b != 0 && lami_temp.b < min_rate){
              lami_temp.b = min_rate;
            }
            if(!isNaN(lami_temp.c) && lami_temp.c != 0 && lami_temp.c < min_rate){
              lami_temp.c = min_rate;
            }
          }
        }
        lami.a = lami.a + lami_temp.a
        lami.b = lami.b + lami_temp.b
        lami.c = lami.c + lami_temp.c
      }
    }
    this.lami = lami;
    this.showResult("lami", this.lami);
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
      var title_min_printing = this.calculateMinPrinting(1);
      var title_after_printing = this.calculateAfterPrinting(1);
      this.title_printing = this.Add(title_min_printing, title_after_printing);
      this.showResult("title-print", this.title_printing);
      i = 2;
    }
    for(i; i < this.inputs.length; i++){
      min_printing = this.Add(min_printing, this.calculateMinPrinting(i));
      after_printing = this.Add(after_printing, this.calculateAfterPrinting(i));
      this.printing = this.Add(min_printing, after_printing);
    }
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
    var min_print = this.getInput(0,"min_print_charges");
    var min_print_rate = this.getInput(i,"inp_min_print_rate");
    var min_printing = min_print / 1000 * min_print_rate * plates;
    return({a:min_printing,b:min_printing,c:min_printing});
  }

  calculateAfterPrinting(i){
    var min_print_qty = this.getInput(0,"min_print_charges");
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
    var min_print = this.getInput(0,"min_print_charges");
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
    var spot_uv_inp = 0;
    var spot_uv_type = "";
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    this.spot_uv = {a:0,b:0,c:0};
    var min_rate = "";
    var spot_temp = {a:0,b:0,c:0};
    for(var i = 1; i < this.inputs.length; i++){
      min_rate = "";
      spot_temp = {a:0,b:0,c:0};
      spot_uv_inp = this.getInput(i,"spot-uv_inp");
      spot_uv_type = this.getInput(i,"spot-uv_sel","string");
      switch(spot_uv_type){
        case 'Spot UV':
          min_rate = $("#spot_min").val();
        break;
        case 'Foil Stamp.':
          min_rate = $("#foil_min").val();
        break;
        case 'Embossing':
          min_rate = $("#embossing_min").val();
        break;
      }
      if(spot_uv_type != "None"){
        spot_temp.a = spot_uv_inp * qty_a;
        spot_temp.b = spot_uv_inp * qty_b;
        spot_temp.c = spot_uv_inp * qty_c;
      }
      if(min_rate != ""){
        min_rate = parseInt(min_rate.replace(',',''));
        if(!isNaN(min_rate)){
          if(!isNaN(spot_temp.a) && spot_temp.a != 0 && spot_temp.a < min_rate){
            spot_temp.a = min_rate;
          }
          if(!isNaN(spot_temp.b) && spot_temp.b != 0 && spot_temp.b < min_rate){
            spot_temp.b = min_rate;
          }
          if(!isNaN(spot_temp.c) && spot_temp.c != 0 && spot_temp.c < min_rate){
            spot_temp.c = min_rate;
          }
        }
      }
      this.spot_uv.a = this.spot_uv.a + spot_temp.a
      this.spot_uv.b = this.spot_uv.b + spot_temp.b
      this.spot_uv.c = this.spot_uv.c + spot_temp.c
    }
    this.showResult("sp-uv-foil", this.spot_uv);
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

  calculateStaple(){
    var staple = this.getInput(1,"inp_staple");
    var qty_a = this.getInput(0,"quantity_a");
    var qty_b = this.getInput(0,"quantity_b");
    var qty_c = this.getInput(0,"quantity_c");
    this.staple = {
      a: staple * qty_a,
      b: staple * qty_b,
      c: staple * qty_c
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

  calculatePlateCost(){
    this.plate_cost = 0;
    var plates = 0;
    var plate_cost_per_plate = 0;
    var i = 1;
    if(window.module == "book"){
      i = 2;
      var title_plates = this.getPlates(1);
      var title_plate_cost_per_plate = this.getInput(1,"inp_plate_cost"); 
      this.title_plate_cost = title_plates * title_plate_cost_per_plate;
      this.showResult("title-plate", this.title_plate_cost);
    }
    if(window.module == "stationery"){
      plates = this.getPlates(1);
      var plate_cost_per_plate = this.getInput(1,"inp_plate_master_cost_each"); 
      this.plate_cost = this.plate_cost + plates * plate_cost_per_plate;
      this.showResult("plate", this.plate_cost);
      return;
    }
    for(i; i < this.inputs.length; i++){
      plates = this.getPlates(i);
      var plate_cost_per_plate = this.getInput(i,"inp_plate_cost"); 
      this.plate_cost = this.plate_cost + plates * plate_cost_per_plate;
    }
    this.showResult("plate", this.plate_cost);
    if(window.module == "calendar"){
      var op_colors = this.getInput(1,"sel_over_print_colors");
      this.plate_cost_OP = plate_cost_per_plate * op_colors;
      var currency_format = { style: 'currency', currency: 'INR' };
      var format = new Intl.NumberFormat('en-IN', currency_format);
      var res = format.format(this.plate_cost_OP).substring(1).split(".")[0];
      $(".plate-b").html(res);
    }
  }

  getPlates(i){
    switch(this.module){
      case 'single_sheet':
        var pgs_in_plate = this.getInput(i, "inp_pages_in_plate_sig");
        var print_sides = this.getInput(i, "sel_print_sides");
        var colors = this.getInput(i, "sel_num_colors")
        var plates = Math.ceil( print_sides / pgs_in_plate) * colors;
        return(plates);
      break;
      case 'multi_sheet':
        var pgs_in_plate = this.getInput(i, "inp_pages_in_plate_sig");
        var print_sides = this.getInput(i, "inp_total_pgs");
        var colors = this.getInput(i, "sel_num_colors")
        var plates = Math.ceil( print_sides / pgs_in_plate) * colors;
        return(plates);
      break;
      case 'stationery':
        var print_sides = this.getInput(1, "sel_plate_master");
        var colors = this.getInput(1, "sel_num_colors")
        var plates = print_sides * colors;
        return(plates);
      break;
      case 'book':
        var pgs_in_plate = this.getInput(i, "inp_pages_in_plate_sig");
        var print_sides = this.getInput(i, "inp_total_pgs");
        var colors = this.getInput(i, "sel_num_colors")
        var plates = Math.ceil( print_sides / pgs_in_plate) * colors;
        return(plates);
      break;
      case 'box':
        var pgs_in_plate = this.getInput(i, "inp_finish_size_format");
        var print_sides = this.getTotalPgs(1);
        var colors = this.getInput(i, "sel_num_colors");
        var plates = Math.ceil( print_sides / pgs_in_plate) * colors;
        return(plates);
      break;
      case 'calendar':
        var months_in_plate = this.getInput(i, "inp_months_in_plat");
        var colors = this.getInput(i, "sel_num_colors_front")
        + this.getInput(i, "sel_num_colors_back");
        var plates = Math.ceil( 12 / months_in_plate) * colors;
        return(plates);
      break;
    }
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
	const heart_beat_interval = 15000;
  
  //create the user object
  window.user = new USER
  
  //enable changing the Quote Total
  enableTotalChange();
  
	//set heartbeat to keep connected to server
  //do not set heartbeat if on localhost
  if(window.location.hostname != "localhost"){
    setInterval(function(){
      heartBeat();
    }, heart_beat_interval);
  }
  
	addClasses();
	
  window.calc = new calculator();
  
  getUserDetails();
	
  setClasses();
  
  window.customers_loaded = false;
  loadCustomers();
  
  loadTooltips();
  
  window.paper_loaded = false;
	loadPaper();
  
  window.screen_defaults_loaded = false;
  loadScreenDefaults();
  
  getQuotes();
  
  getQuote();
  getQuotesLibrary();
  if(window.module == "stationery"){
    $($("#min_print_charges option")[1]).css("display","none")
    $($("#min_print_charges option")[2]).css("display","none")
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
        alert("Plese enter a number");
        $(".total-quote-a").html(quote);
        return;
      }
      if(new_quote < window.calc.basic_cost_with_exp.a){
        alert("Total Quote can not be less than Basic Cost");
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
  $(".total-quote-b").click(function(e){
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
        $(".total-quote-b").html(quote);
        return;
      }
      var new_quote = parseFloat(new_quote.replaceAll(',',''));
      if(isNaN(new_quote)){
        alert("Plese enter a number");
        $(".total-quote-b").html(quote);
        return;
      }
      if(new_quote < window.calc.basic_cost_with_exp.b){
        alert("Total Quote can not be less than Basic Cost");
        $(".total-quote-b").html(quote);
        return;
      }
      var basic_cost = Math.round(window.calc.basic_cost_with_exp.b);
      profit = new_quote - basic_cost;
      var order = new_quote.toString().length;
      profit_in_percent = Math.round((profit/basic_cost)*Math.pow(10,order))/Math.pow(10,order-2);
      $(".profit_type").val("percernt");
      $(".profit_inp").val(profit_in_percent);
      window.calc.calculateAll();
    });
  });
  $(".total-quote-c").click(function(e){
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
        $(".total-quote-c").html(quote);
        return;
      }
      var new_quote = parseFloat(new_quote.replaceAll(',',''));
      if(isNaN(new_quote)){
        alert("Plese enter a number");
        $(".total-quote-c").html(quote);
        return;
      }
      if(new_quote < window.calc.basic_cost_with_exp.c){
        alert("Total Quote can not be less than Basic Cost");
        $(".total-quote-c").html(quote);
        return;
      }
      var basic_cost = Math.round(window.calc.basic_cost_with_exp.c);
      profit = new_quote - basic_cost;
      var order = new_quote.toString().length;
      profit_in_percent = Math.round((profit/basic_cost)*Math.pow(10,order))/Math.pow(10,order-2);
      $(".profit_type").val("percernt");
      $(".profit_inp").val(profit_in_percent);
      window.calc.calculateAll();
    });
  });
}

function setClasses(){
  var input_table_rows = $("#inputs_rows tr");
  input_table_rows.each(function(row_id,row){
    $(row).children("td").each(function(column_id,column){
      column_class = $(column).attr("class");
      $(column).children("input").each(function(inp_id,inp){
        if(typeof $(inp).attr("class") == 'undefined' || $(inp).attr("class")==""){
          if(!$(inp).prop('disabled')){
            $(inp).attr("class",'inp_'+column_class);
          }
        }
      });
      $(column).children("select").each(function(inp_id,inp){
        if(typeof $(inp).attr("class") == 'undefined' || $(inp).attr("class")==""){
          if(!$(inp).prop('disabled')){
            $(inp).attr("class",'sel_'+column_class);
          }
        }
      });
    });
  });
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
  inputs[0] = {quantity_a: quantity_a,
    quantity_b: quantity_b,
    quantity_c: quantity_c,
    job_ref: job_ref,
    pdf_desc: pdf_desc,
    min_print_charges: min_print_charges,
    print_calculation_every: print_calculation_every
  };
  if(window.module == "book"){ 
    var title_inputs = {};
    $("#book_title input, #book_title select").each(function(inp_id,inp){
      var inp_class = $(inp).attr("class");
      var inp_value = $(inp).val();
      if($(inp).hasClass("screen_default")){
        inp_class = inp_class.replace("screen_default","");
        inp_class = inp_class.trim();
      }
      title_inputs[inp_class] = inp_value;
    });
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
        if($(inp).hasClass("screen_default")){
          inp_class = inp_class.replace("screen_default","");
          inp_class = inp_class.trim();
        }
        row_inputs[inp_class] = inp_value;
      });
      $(column).children("select").each(function(inp_id,inp){
        var inp_class = $(inp).attr("class");
        var inp_value = $(inp).val();
        if($(inp).hasClass("screen_default")){
          inp_class = inp_class.replace("screen_default","");
          inp_class = inp_class.trim();
        }
        row_inputs[inp_class] = inp_value;
      });
    });
    inputs.push(row_inputs);
  });
  return(inputs);
}

function applyBasicDefaults(){
  if(window.module == "book"){
    $("#book_title .inp_total_pgs").val(4);
    $("#book_title .inp_total_pgs").addClass("screen_default");
  }
}

function loadScreenDefaults(){
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
      $("#min_print_charges").val(top_inputs.min_print_charges);
      $("#print_calculation_every").val(top_inputs.print_calculation_every);
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
      if(window.module == "book"){
        loadBindingScreenDefaults();
      }
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
function loadBindingScreenDefaults(){
  $.post("ajax_api.php",{action: "load_screen_defaults", module: "binding"},
    function(data){
      if(data.status == 'failed'){
        return;
      }
      var binding = data.inputs;
      var binding_keys = Object.keys(binding);
      $("#binding_inputs select, #binding_inputs input").removeClass("screen_default");
      binding_keys.forEach(function(key){
        if(binding[key] !==""){
          $("#binding_inputs ." + key).val(binding[key]);
          $("#binding_inputs input." + key).addClass("screen_default");
          $("#binding_inputs select." + key).addClass("screen_default");
        }
      });
    },"json");
  
}
function saveBindingScreenDefaults(){
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
  $.post("ajax_api.php",{action: "save_screen_defaults", module: 'binding',
  inputs: binding_inputs},
    function(data){
      loadBindingScreenDefaults();
    },"json");
}

$("#save_binding_default").click(function(e){
  saveBindingScreenDefaults();
});
$("#binding_refresh_screen").click(function(e){
  $("#binding_inputs select, #binding_inputs input").removeClass("screen_default");
  $("#binding_inputs input, #binding_inputs select").val("");
  loadBindingScreenDefaults();
});
$("#apply_binding_defaults").click(function(e){
  $("#binding_inputs select, #binding_inputs input").removeClass("screen_default");
  $("#binding_inputs input, #binding_inputs select").val("");
  saveBindingScreenDefaults();
});

function applyFactoryDefaults(){
  var rows = $("#inputs_rows tr");
  for(var i = 1; i < rows.length; i++){
    $(rows[i]).remove();
  }
  $("select").val('');
  $("input").val('');
  $("textarea").val('');
  $("#add_row").val('+');
  $("#min_print_charges").val('1000');
  $("#print_calculation_every").val('1000');
  $(".minus.remove").addClass("hide");
  $(".screen_default").removeClass("screen_default");
  $(".js-disabled").removeAttr("readonly");
  $(".js-disabled").removeClass("js-disabled");
  $("#customer").removeAttr("disabled");
  $("#save_screen_defaults").click();
}

function getUserDetails(){
	$.post("ajax_api.php",{action: "get_user_details"},
		function(data){
			$("#logout_div .name").html(data.name + ' ' + data.lastname);
			$("#logout_div .contact").html(data.contact);
      if(data.preferences != null){
        var preferences = JSON.parse(data.preferences);
        $("#cost_summary_show").val(preferences.cost_summary_show);
        $("#paper_size_units").val(preferences.paper_size_units);
        $("#popup_language").val(preferences.popup_language);
        if(typeof preferences.minimums != "undefined"){
          var minimums = preferences.minimums;
          var keys = Object.keys(minimums);
          keys.forEach(function(key){
            $("#" + key).val(minimums[key]);
          });
        }
      }
		},"json");
}

function savePreferences(){
  var minimums = {};
  $("#preferences-minimums-tab input").each(function(i,d){
    var id = $(d).attr("id");
    var value = $(d).val();
    minimums[id] = value;
  });

  var preferences = {cost_summary_show:$("#cost_summary_show").val(),
      paper_size_units:$("#paper_size_units").val(),
      popup_language:$("#popup_language").val(),
      minimums: minimums};
  var post_data = {action:"save_preferences",preferences:preferences};
  $.post("ajax_api.php", post_data,function(data){
    alert("Preferences Saved");
    $("#preferencesModal .close").click();
    window.calc = new calculator();
  });
}

function setTableSize(){
	//fix the width of the input table
	$("tbody tr td").each(function(i,td){
		var td_class = $(td).attr("class");
		var width = $("thead tr th." + td_class).width();
		$(this).width(width);
	});
}


function loadTooltips(){
  var popup_laguage = $("#popup_language").val();
  window.tooltips = "";
  if(popup_language == "none"){
    return;
  }
  var post_data = {action:"get_tooltips", lang:$("#popup_language").val()};
  $.post("ajax_api.php", post_data, function(data){
    if(data.status != "success"){
      return;
    }
    window.tooltips = data.resp;
  },"json");
}
$(".input_table thead th").hover(function(e){
  const TOOLTIP_WIDTH = 200;
  var name = $(this).attr("class");
  if(typeof(window.tooltips[name]) != "undefined"){
    $("#tooltip").html(window.tooltips[name]);
    $("#tooltip").css("top",$(this).offset().top - 16 );
    var left = $(this).offset().left + $(this).width()/2 - TOOLTIP_WIDTH/2;
    $("#tooltip").css("left",left);
    $("#tooltip").show();
  }
});
$(".input_table thead th").mouseleave(function(e){
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
$("#log_out").click(function(e){
	$("#logout_div").toggleClass("hide");
});
$("#logout-button").click(function(e){
	var post_data = {action : 'logout'};
	$.post('ajax_api.php', post_data,
		function(data){
			window.location.href = "index.php";
		});
});
$("#change-password-button").click(function(e){
	$("#changePasswordModal").removeClass("hide");
	$("#logout_div").addClass("hide");
});
$("#change_module").click(function(e){
	$("#homeModal").removeClass("hide");
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
  $("#min_print_charges").val('1000');
  $("#print_calculation_every").val('1000');
  $(".minus.remove").addClass("hide");
  loadScreenDefaults();
});
$("#homeModal").click(function(e){
	$("#homeModal").addClass("hide");
});

$(".save_preferences_button").click(function(e){
  savePreferences();
});

$("#save_screen_defaults").click(function(e){
  saveScreenDefaults();
});

$("#apply_factory_defaults").click(function(e){
  applyFactoryDefaults();
});


$(".remove").click(function(e){
	$(".row_num").addClass("hide");
	$(".remove-row").removeClass("hide");
});
$(".modal-header .header .close").click(function(e){
  $(this).parent().parent().parent().parent().addClass("hide");
});
$("#paper_library").click(function(e){
	if(window.module == "stationery"){
		$("#stationeryPaperModal").removeClass("hide");
	}
	else{
		$("#paperModal").removeClass("hide"); 
	}
});
$("#customer_library").click(function(e){
	$("#customerModal").removeClass("hide");
  loadCustomers();
});
$("#preferences").click(function(e){
	$("#preferencesModal").removeClass("hide");
});

function loadPaper(){
	if(window.module == "stationery"){
		loadStationeryPaper();
	}
	else{
		loadOtherPaper();
	}
}

$(".add_paper_button").click(function(e){
	var type = $(this).html();
	if(window.module != "stationery"){
		if(type == "Edit"){
			var paper_name = $("#paperModal .add_paper").val();
			var paper_id = $("#paperModal .add_paper").attr("paper_id");
			var post_data = {action: "edit_paper", module: window.module, 
				paper_id: paper_id, paper_name:paper_name};
			$.post("ajax_api.php", post_data, function(e){
				loadPaper();
				$("#paperModal .add_paper").val("");
				$("#paperModal .modal-header .paper-title").html("Paper Library");
				$("#paperModal .add_paper").attr("paper_id",""); 
				$("#paperModal .add_paper_button").html("Add");
			},"json");
		}
		else{
			var paper_name = $("#paperModal .add_paper").val();
			var post_data = {action: "add_paper", module: window.module, 
				paper_name:paper_name};
			$.post("ajax_api.php", post_data, function(e){
				loadPaper();
				$("#paperModal .add_paper").val("");
			},"json");
		}
	}
	else{
		if(type == "Edit"){
			var paper_cost = $("#stationeryPaperModal .add_paper_cost").val();
			var paper_name = $("#stationeryPaperModal .add_paper").val();
			var paper_id = $("#stationeryPaperModal .add_paper").attr("paper_id");
			var post_data = {action: "edit_paper", module: window.module, 
				paper_id: paper_id, paper_name:paper_name, paper_cost:paper_cost};
			$.post("ajax_api.php", post_data, function(e){
				loadPaper();
				$("#stationeryPaperModal .add_paper").val("");
				$("#stationeryPaperModal .add_paper_cost").val("");
				$("#stationeryPaperModal .modal-header .paper-title").html("Paper Library");
				$("#stationeryPaperModal .add_paper").attr("paper_id",""); 
				$("#stationeryPaperModal .add_paper_button").html("Add");
			},"json");
		}
		else{
			var paper_cost = $("#stationeryPaperModal .add_paper_cost").val();
			var paper_name = $("#stationeryPaperModal .add_paper").val();
			var post_data = {action: "add_paper", module: window.module, 
				paper_name:paper_name, paper_cost:paper_cost};
			$.post("ajax_api.php", post_data, function(e){
				loadPaper();
				$("#stationeryPaperModal .add_paper").val("");
				$("#stationeryPaperModal .add_paper_cost").val("");
			});
		}
	}
});
function loadOtherPaper(){
	var post_data = {action : 'get_paper'};
	$.post("ajax_api.php", post_data,
		function(data){
			var html = '<option value="" disabled selected>Select</option>';
			var modal_html = '';
			data.forEach(function(paper, i){
				var paper_num = i + 1;
				html += '<option value="' + paper.id + '">' + paper.paperlibrary + '</option>';
				modal_html += '<div class="paper_row">'
					+ '<div class="paper_num">' + paper_num + '</div>';
				modal_html += '<div class="paper_name">' + paper.paperlibrary + '</div>';
				modal_html += '<div class="paper_edit">' 
					+ '<span class="material-icons edit" paper_id="' + paper.id + '">edit</span>'
					+ '<span class="material-icons delete" paper_id="' + paper.id + '">delete</span>'
					+ '</div></div>'; //close paper_edit & paper_row
			});
			$("#paperModal .modal-body").html(modal_html);
			$("#paperModal .paper_edit .edit").click(function(e){
				var paper_id = $(this).attr("paper_id");
				var paper_name = $(this).parent().parent().children(".paper_name").html();
				$("#paperModal .add_paper").val(paper_name);
				$("#paperModal .modal-header .paper-title").html("Paper Library Edit");
				$("#paperModal .add_paper").attr("paper_id",paper_id); 
				$("#paperModal .add_paper_button").html("Edit");
			});
			$("#paperModal .paper_edit .delete").click(function(e){
				var paper_id = $(this).attr("paper_id");
				var paper_name = $(this).parent().parent().children(".paper_name").html();
				if(confirm("Do you want to delete " + paper_name)){
					var post_data = {action: "delete_paper", 
													 module: window.module,
													 paper_id: paper_id}
					$.post("ajax_api.php",post_data,function(data){
						alert("Successfully deleted");
						loadPaper();
					},"json");
				}
			});
			$(".paper select").each(function(i, select){
				var value = $(this).val();
				$(this).html(html);
				if(value == null){
					$(this).val("");
				}
				else{
					$(this).val(value);
				}
			});	
      window.paper_loaded = true;
		},"json");
}
function loadStationeryPaper(){
	var post_data = {action : 'get_stationery_paper'};
	$.post("ajax_api.php", post_data,
		function(data){
			var html = '<option value="" disabled selected>Select</option>';
			var modal_html = '';
			data.forEach(function(paper, i){
				var paper_num = i + 1;
				html += '<option value="' + paper.id + '" paper_cost='+ paper.paper_cost +'>' + paper.paper_description + '</option>';
				modal_html += '<div class="paper_row"><div class="paper_num">' + paper_num + '</div>';
				modal_html += '<div class="paper_name">' + paper.paper_description + '</div>';
				modal_html += '<div class="paper_cost">' + paper.paper_cost + '</div>';
				modal_html += '<div class="paper_edit">' 
					+ '<span class="material-icons edit" paper_id="' + paper.id + '">edit</span>'
					+ '<span class="material-icons delete" paper_id="' + paper.id + '">delete</span>'
					+'</div></div>';
			});
			$("#stationeryPaperModal .modal-body").html(modal_html);
			$("#stationeryPaperModal .paper_edit .edit").click(function(e){
				var paper_id = $(this).attr("paper_id");
				var paper_name = $(this).parent().parent().children(".paper_name").html();
				var paper_cost = $(this).parent().parent().children(".paper_cost").html();
				$("#stationeryPaperModal .add_paper").val(paper_name);
				$("#stationeryPaperModal .add_paper_cost").val(paper_cost);
				$("#stationeryPaperModal .modal-header .paper-title").html("Paper Library Edit");
				$("#stationeryPaperModal .add_paper").attr("paper_id",paper_id); 
				$("#stationeryPaperModal .add_paper_button").html("Edit");
			});
			$("#stationeryPaperModal .paper_edit .delete").click(function(e){
				var paper_id = $(this).attr("paper_id");
				var paper_name = $(this).parent().parent().children(".paper_name").html();
				if(confirm("Do you want to delete " + paper_name)){
					var post_data = {action: "delete_paper", 
													 module: window.module,
													 paper_id: paper_id}
					$.post("ajax_api.php",post_data,function(data){
						alert("Successfully deleted");
						loadPaper();
					},"json");
				}
			});
			$(".paper_desc select").each(function(i, select){
				var value = $(this).val();
				$(this).html(html);
				if(value == null){
					$(this).val("");
				}
				else{
					$(this).val(value);
				}
			});	
      window.paper_loaded = true;
		},"json");
}
function heartBeat(){
	var post_data = {action : 'heartbeat'};
	$.post("ajax_api.php", post_data,
		function(data){
			if(data.status == 'failed'){
				window.location.href = 'index.php';
			}
		},"json");
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
  var post_data = {action: "get_customers"};
	var html = '<option value="" selected>Select</option>';
  var modal_html = '<div class="customer_table">'
    + '<div class="row table_header">'
      + '<div class="num">#</div>'
      + '<div class="company_name">Company Name</div>'
      + '<div class="contact_person">Contact Person</div>'
      + '<div class="contact_number">Contact Number</div>'
      + '<div class="email">Email</div>'
      + '<div class="address">Address</div>'
      + '<div class="delete_cust">Delete</div>'
    + '</div>';
  $.post("ajax_api.php", post_data, function(data){
    window.customers = data.resp;
    data.resp.forEach(function(d,i){
      var num = i+1;
      html += '<option value="' + d.id +'">' + d.company_name + '</option>';
      modal_html = modal_html + '<div class="row table_row">'
        + '<div class="num">'+num+'</div>'
        + '<div class="company_name">'+d.company_name+'</div>'
        + '<div class="contact_person">'+d.person_name+'</div>'
        + '<div class="contact_number">'+d.contact_number+'</div>'
        + '<div class="email">'+d.email+'</div>'
        + '<div class="address">'+d.address+'</div>'
        + '<div class="delete_cust">'
					+ '<span class="material-icons edit" cust_id="' + d.id + '">edit</span>'
					+ '<span class="material-icons delete" cust_id="' + d.id + '">delete</span>'
        + '</div>'
      + '</div>';
    });
    modal_html += "</div>";
    $("#customerModal .modal-body").html(modal_html);
    var sel_cust = $("#customer").val();
    $(".customer_sel").html(html);
    $("#customer").val(sel_cust);
    $("#customerModal .delete").click(function(e){
      e.preventDefault();
      e.stopPropagation();
      var cust_id = $(this).attr("cust_id");
      var company_name = $(this).parent().parent().children(".company_name").html();
      if(confirm("Do you want to delete " + company_name)){
        var post_data = {action: "delete_customer", 
                         cust_id: cust_id}
        $.post("ajax_api.php",post_data,function(data){
          alert("Successfully deleted");
          loadCustomers();
        },"json");
      } 
    });
    $("#customerModal .edit").click(function(e){
      var company_name = $(this).parent().parent().children(".company_name").html();
      var person_name = $(this).parent().parent().children(".contact_person").html();
      var contact_number = $(this).parent().parent().children(".contact_number").html();
      var email = $(this).parent().parent().children(".email").html();
      var address = $(this).parent().parent().children(".address").html();
      var cust_id = $(this).attr("cust_id");
      $("#cust_company_name").val(company_name);
      $("#cust_contact_person").val(person_name);
      $("#cust_contact_number").val(contact_number);
      $("#cust_email").val(email);
      $("#cust_address").val(address);
      $("#add_customer_button").html("SAVE");
      $("#edit_customer_id").val(cust_id);
      $("#edit_customer_header").html("Edit Customer Details");
      $("#addCustomerModal").removeClass("hide");
    });
    window.customers_loaded = true;
  },"json");
}
$("#new_customer_button").click(function(e){
  $("#cust_company_name").val("")
  $("#cust_contact_person").val("");
  $("#cust_contact_number").val("");
  $("#cust_email").val("");
  $("#cust_address").val("");
  $("#add_customer_button").html("Add");
  $("#edit_customer_id").val("");
  $("#edit_customer_header").html("Add Customer Details");
  $("#addCustomerModal").removeClass("hide");
});
$("#add_customer_button").click(function(e){
  var company_name = $("#cust_company_name").val();
  var contact_person = $("#cust_contact_person").val();
  var contact_number = $("#cust_contact_number").val();
  var email = $("#cust_email").val();
  var address = $("#cust_address").val();
  var cust_id = $("#edit_customer_id").val();
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
                  address: address,
                  cust_id: cust_id };
  $.post("ajax_api.php", post_data, function(data){
    $("#cust_company_name").val("");
    $("#cust_contact_person").val("");
    $("#cust_contact_number").val("");
    $("#cust_email").val("");
    $("#cust_address").val("");
    $("#add_customer_button").html("Add");
    $("#edit_customer_id").val("");
    $("#edit_customer_header").html("Add Customer Details");
    $("#addCustomerModal").addClass("hide");
    alert("Customer Added");
    loadCustomers();
  });
});
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
      + '<div class="quote_number">Quote #</div>'
      + '<div class="quote_module">module</div>'
      + '<div class="quote_job_ref">Job Ref</div>'
      + '<div class="quote_date">Date</div>'
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
          module = "Book";
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
    html = html + '<div class="row table_row">' 
      + '<div class="quote_number" quote_id="'+d.id+'">'+ quote_number +'</div>'
      + '<div class="quote_module">'+ module +'</div>'
      + '<div class="quote_job_ref">'+ d.job_ref +'</div>'
      + '<div class="quote_date">'+ date +'</div>'
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
  if(typeof(page) != "number"){
    page = parseInt(page);
  }
  var post_data = {
    action: "get_quotes",
    month: $("#quote_month").val(),
    year: $("#quote_year").val(),
    module: $("#quote_module").val(),
    customer_id: $("#quote_customer").val(),
    page: page
  };
  $.post("ajax_api.php", post_data, function(data){
    window.quote_data = data.resp;
    const page_length = 2;
    var html = '<div class="row table_header">' 
      + '<div class="quote_lock"></div>'
      + '<div class="quote_number">Quote #</div>'
      + '<div class="quote_customer">Customer</div>'
      + '<div class="quote_module">Module</div>'
      + '<div class="quote_job_ref">Job Ref</div>'
      + '<div class="quote_date">Date</div>'
      + '<div class="quote_desc">Description</div>'
      + '</div>';
    data.resp.data.forEach(function(d){
      var quote_lock = "";
      if(d.quote_lock == 1){
        quote_lock = '<span class="material-icons lock">lock</span>';
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

function getQuote(){
  if(!(window.screen_defaults_loaded && window.customers_loaded)){
    setTimeout(function(){
      getQuote();
    },500);
    return;
  }
  var url = window.location.href.split('#');
  if(url.length == 1){
    return;
  }
  var quote = url[1].split('_');
  var quote_num = parseInt(quote[1]);
  var edit_type = quote[0];
  if(quote.length == 3){
    var action = "get_quote_library";
  }
  else{
    var action = "get_quote";
  }
  $.post("ajax_api.php", {action: action, quote_id: quote_num},
    function(data){
      if(data.status == 'failed'){
        return;
      }
      $(".js-disabled").removeAttr("readonly");
      $(".js-disabled").removeClass("js-disabled");
      $("#customer").removeAttr("disabled");
      $("#customer").val("");
      var inputs = JSON.parse(data.resp.inputs);
      var top_inputs = inputs.shift();
      if(window.module == "book"){
        var titles = inputs.shift();
        var title_keys = Object.keys(titles);
        title_keys.forEach(function(key){
          if(titles[key] !==""){
            $("#book_title ." + key).val(titles[key]);
          }
        });
        var binding = inputs.shift();
        var binding_keys = Object.keys(binding);
        binding_keys.forEach(function(key){
          if(binding[key] !==""){
            $("#binding_inputs ." + key).val(binding[key]);
          }
        });
      }
      $("#quantity_a").val(top_inputs.quantity_a);
      $("#quantity_b").val(top_inputs.quantity_b);
      $("#quantity_c").val(top_inputs.quantity_c);
      $("#job_ref").val(top_inputs.job_ref);
      $("#pdf_desc").val(top_inputs.pdf_desc);
      if(edit_type == "edit"){
        $("#customer").val(data.resp.customer_id);
        $("#customer").attr("disabled","disabled");
        var quote_date = formatDate(data.resp.date);
        $("#quote_date").val(quote_date);
        $("#quote_no").val(data.resp.quote_number);
      }
      else{
        $("#quote_date").val("");
        $("#quote_no").val("");
      }
      $("#min_print_charges").val(top_inputs.min_print_charges);
      $("#print_calculation_every").val(top_inputs.print_calculation_every);
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
          }
        });
      });
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
      window.calc.calculateAll();
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
    alert("Please select Quote first");
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
  if(library == "user_library" && $(".quote_highlight").length == 0){
    alert("Please select Quote first");
    return;
  }
  else if(library == "main_library" && $(".quote_library_highlight").length == 0){
    alert("Please select Quote first");
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
      case "Book":
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
      case "Book":
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
    getQuote();
    $("#quotationModal .close").click();
    $("#quotationLibraryModal .close").click();
  }
}

function getDate(){
  var date = $("#quote_date").val();
  if(date != ""){
    var datetime_parts = date.split(" ");
    var date_parts = datetime_parts[0].split("/");
    var time = datetime_parts[1].split(":");
    var fullyear = date_parts[2];
    var month = date_parts[1];
    var day_of_month = date_parts[0];
    var hours = time[0];
    var minutes = time[1];
  }
  else{
    var today = new Date();
    var day_of_month = today.getDate();
    var month = today.getMonth() + 1;
    var fullyear = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
  }
  date = fullyear + '-' + month + '-' + day_of_month + ' ' + hours + ':' + minutes + ':00';
  console.log(date);
  return(date);
}

function formatDate(date){
  var date_time = date.split(" ");
  date_parts = date_time[0].split('-');
  time_parts = date_time[1].split(':');
  var format_date = date_parts[2] + '/' + date_parts[1] + '/' + date_parts[0]
    + ' ' + time_parts[0] + ':' + time_parts[1];
  return(format_date);
}
function saveQuotation(library = "user_library"){
  var inputs = getInputs();
  if(window.module == "calendar"){
    var total_quote_a = parseResult("total-quote-a");
    var total_quote_b = parseResult("total-quote-b");
    var total_quote_c = 0;
  }
  else{
    var total_quote_a = parseResult("total-quote-a");
    var total_quote_b = parseResult("total-quote-b");
    var total_quote_c = parseResult("total-quote-c");
  }
  var customer = $("#customer").val();
  var quote_no = $("#quote_no").val();
  var job_ref = $("#job_ref").val();
  var pdf_desc = $("#pdf_desc").val();
  var qty_a = $("#quantity_a").val();
  var qty_b = $("#quantity_b").val();
  var qty_c = $("#quantity_c").val();
  var date = getDate();
  if(library == "user_library"){
    if(quote_no == ""){
      var action = "save_quotation";
    }
    else{
      var action = "update_quotation";
    }
  }
  else{
    if(quote_no == ""){
      var action = "save_quotation_library";
    }
    else{
      var action = "update_quotation_library";
    }
  }
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
    total_quote_a: total_quote_a,
    total_quote_b: total_quote_b,
    total_quote_c: total_quote_c,
    module: window.module
  };
  $.post("ajax_api.php", post_data, function(data){
    if(action == "save_quotation" && data.status == "success"){
      $("#quote_no").val(data.resp.quote_no);
      $("#customer").attr("disabled","disabled");
      $("#quote_date").val(formatDate(date));
      getQuotes();
    }
    else if(action == "update_quotation" && data.status == "success"){
      alert("Quotation Saved");
    }
    else{
      alert("Failed to save quotation, Please try again later");
    }
  });
}
$("#save_quotation").click(function(e){
  saveQuotation();
});
$("#save_quote_library").click(function(e){
  saveQuotation("main_library");
});
$("#back_quote").click(function(e){
  $("#quotationModal .close").click();
});
$("#manage_quotation").click(function(e){
  $("#quotationModal").removeClass("hide");
});

$("#quote_library_bottom").click(function(e){
  $("#quotationLibraryModal").removeClass("hide");
});

$("#lock_quote").click(function(e){
  if($(".quote_highlight").length == 0){
    alert("Please select Quote first");
    return;
  }
  var quote_num = parseInt($(".quote_highlight .quote_number").html());
	if(confirm("Do you want to lock quote " + quote_num)){
    $.post("ajax_api.php",{action: "lock_quote", quote_id: quote_num},
      function(data){
        getQuotes();
    });
  }
});

$("#back_quote_library").click(function(e){
  $("#quotationLibraryModal .close").click();
});

$("#delete_quote").click(function(e){
  if($(".quote_highlight").length == 0){
    alert("Please select Quote first");
    return;
  }
  var quote_num = parseInt($(".quote_highlight .quote_number").html());
	if(confirm("Do you want to delete quote " + quote_num)){
    $.post("ajax_api.php",{action: "delete_quote", quote_id: quote_num},
      function(data){
        getQuotes();
    });
  }
});

$("#delete_quote_library").click(function(e){
  if($(".quote_library_highlight").length == 0){
    alert("Please select Quote first");
    return;
  }
  var quote_num = parseInt($(".quote_library_highlight .quote_number").html());
	if(confirm("Do you want to delete quote " + quote_num)){
    $.post("ajax_api.php",{action: "delete_quote_library", quote_id: quote_num},
      function(data){
        getQuotes();
    });
  }
});

$("input").change(function(e){
  window.calc.calculateAll();
});
$("select").change(function(e){
  window.calc.calculateAll();
});
$("#quotationModal select").change(function(e){
  getQuotes();
});

