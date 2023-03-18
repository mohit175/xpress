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
