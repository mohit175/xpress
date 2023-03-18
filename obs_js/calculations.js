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
