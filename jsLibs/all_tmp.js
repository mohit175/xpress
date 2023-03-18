/*
 * File for class templaates
 *
 * @ver 1.0
 * @author Anil Desai <anil.h.desai@gmail.com>
 * */

/*
 *  Class templates
 *
 *  Class to handle all the templating actions
 * */
class TEMPLATES{
  enableActions(){
    var _this = this;
    $(".submenu").click(function(e){
      $(this).children("ul").toggleClass("hide");
    });
    $(".submenu ul li").click(function(e){
      e.stopPropagation();
    });
    $("li").click(function(e){
      $(".active").removeClass("active");
      $(this).addClass("active");
      var template_name = _this.getAttr(this, "template");
      if(template_name){
        _this.getTemplate(template_name);
      }
    });
  }

  enableTemplateActions(item = null){
    var _this = this;
    if(item == null){
      var item = _this.getAttr(".active","item");
      if(item === false){
        item = _this.getAttr($(".active").parent().parent(),"item");
      }
    }
    $(".button").click(function(e){
      var func = $(this).attr("func");
      if(item == "xpress"){
        var fn = _this[func];
      }
      else{
        var fn = _this[item][func];
      }
      if(typeof(fn) != 'function'){
        return;
      }
      fn();
    });
    $(".showForm").click(function(e){
      var target = $(this).attr("data-target");
      $("#"+target).removeClass("hide");
    })
    $(".cancel").click(function(e){
      $(this).addClass("hide");
      $(this).parent().children(".save").addClass("hide");
      $(this).parent().children(".save").addClass("hide");
      $(this).parent().children(".add").removeClass("hide");
      $(this).parent().children("input").val("");
      $(this).parent().children("select").val("");
    });
    $(".clear").click(function(e){
      var target = '#' + $(this).attr("data-target");
      $(target).find("input").val("");
      $(target).find("select").val("");
    });
    $(".change").off("change")
    $(".change").change(function(e){
      let element = this
      let current_item = _this.getAttr(element,"item")
      if(current_item){
        item = current_item
      }
      let func = $(this).attr("changefunc")
      let fn = ""
      if(item == "xpress"){
        fn = _this[func]
      }
      else{
        fn = _this[item][func]
      }
      fn(element)
    })
    $(".keyup").keyup(function(e){
      var func = $(this).attr("keyupfunc");
      if(item == "xpress"){
        var fn = _this[func];
      }
      else{
        var fn = _this[item][func];
      }
      fn();
    });
  }

  loadData(table, data, elem_class=".table"){
    var _this = this;
    var sample = $(table).find(".sample-row").html();
    $(table).find(elem_class + " .data-row").remove();
    var data_table = $(table).find(elem_class);
    data.forEach(function(d,i){
      $(data_table).append(sample);
      var last_row = $(data_table).find(".data-row").last();
      var keys = Object.keys(d);
      $(last_row).children(".count").html(i+1);
      $(last_row).children(".data_id").attr("data_id",d.id);
      keys.forEach(function(k){
        $(last_row).find("." + k).html(d[k]);
        });
    });
    $(data_table).find(".click").click(function(e){
      var func = $(this).attr("clickfunc");
      var item = $(this).attr("item");
      var fn = _this[item][func];
      fn(this);
    });
    $(data_table).find(".dblclick").dblclick(function(e){
      var func = $(this).attr("dblclickfunc");
      var item = $(this).attr("item");
      var fn = _this[item][func];
      fn(this);
    });
    $(data_table).find(".edit").click(function(e){
      var edit_type = $(data_table).attr("data-edit-type");
      var edit_id = $(data_table).attr("data-edit-id");
      var data_id = $(this).attr("data_id");
      $(this).parent().children(".editable").each(function(i,d){
        var name = $(d).attr("name");
        var value = $(d).html();
        $("#" + edit_id + " ." + name).val(value);
        $("#" + edit_id + " .data_id").val(data_id);
        $("#" + edit_id + " .save").removeClass("hide");
        $("#" + edit_id + " .cancel").removeClass("hide");
        $("#" + edit_id + " .add").addClass("hide");
      }); 
    });
    $(data_table).find(".delete").click(function(e){
      var human_name = $($(this).parent().children(".human_name")[0]).html();
      var data_id = $(this).attr("data_id");
      if(confirm("Do you want to delete " + human_name)){
      var item = _this.getAttr(".active","item");
      if(item === false){
        item = _this.getAttr($(".active").parent().parent(),"item");
      }
      var func = $(this).attr("func");
      if(item == "xpress"){
        var fn = _this[func];
      }
      else{
        var fn = _this[item][func];
      }
        fn(data_id);
      }
    });
  }

  getTemplate(template_name){
    var _this = this;
    $.get("inc/templates/"+template_name+".php",function(data){
      $("main").html(data);
      _this.enableTemplateActions();
      _this.loadTemplateData();
    });
  }

  loadTemplateData(item = null){
    var _this = this;
    if(item == null){
      var item = _this.getAttr(".active","item");
      if(item === false){
        item = _this.getAttr($(".active").parent().parent(),"item");
      }
    }
    $(".data-table").each(function(i,d){
      var action = $(this).attr("data-action");
      var table = $(this).parent();
      var data_store = _this.getAttr(this,"data-store");
      var callback = _this.getAttr(this, "data-callback");
      $.post("ajax_api.php", {action:action}, function(data){
        if(data_store){
          _this[item][data_store]=data.resp;
        }
        _this.loadData(table, data.resp);
        if(callback){
          var fn = _this[item][callback];
          fn();
        }
      });
    });
    $(".data-select").each(function(i,d){
      var action = $(this).attr("data-action");
      var select = this;
      $.post("ajax_api.php", {action:action}, function(data){
        _this.loadSelectData(select, data.resp);
      });
    });
  }
  

  loadSelectData(select, data){
    var view_key = $(select).attr("data-view_key");
    var id_key = $(select).attr("data-id_key");
    $(select).find(".data-select").remove();
    data.forEach(function(d){
      var html = '<option value="' + d[id_key] + '" class="data-select">' + d[view_key] + '</option>';
      $(select).append(html);
    });
  }
  
  loadSelectDataSimple(select, data){
    $(select).find(".data-option").remove();
    data.forEach(function(d){
      var html = '<option value="' + d + '" class="data-option">' + d + '</option>';
      $(select).append(html);
    });
  }

  getAttr(elem, attr){
    var attr_value = $(elem).attr(attr);
    if(typeof(attr_value) == "undefined" || attr_value === false){
      return(false);
    }
    return(attr_value);
  }
}
class DATALIST{

  constructor(){}
  /*
   * Loads data into a data list 
   *
   * Loads data into a data list. A data list is similar to a select box but in
   * that it can be searched by typing.
   *
   * @param input The input element to activate for the datalist
   * @param data The data to load. the data can be an array of objects or just a
   *  simple array. If its an array of objects each object should have property
   *  "value" which will be the value shown to the user and also filled into the
   *  input element. The object may also have a property "id" or property
   *  "data_id" which will be set as the "data_id" attribute of the input field
   *  when the relevant data is chosen in the datalist. If both "id" and
   *  "data_id" are given "id" will be used.
   * @param css_class optional An array of css classes to add, mainly for styling. Class
   *  "data_list" applies by default.
   * @param searh_pos optional the search position to use. One of start or any. 
   *  in start the entered string should appear at the start of the value of the
   *  data for that data to be considered part of the list, and for any it can
   *  appear anywhere in the value.
   * @param id optional an id for the datalist element
   */
  loadDataList(input, data, display_key, css_class=["data_list"], search_pos="any" ,id=""){
    var _this = this;
    //if data is empty return
    if( data.length == 0 ){
      return;
    }
    
    //start building the html
    //create the css attr
    var css = css_class.join(" ");
    //set the id string
    if( id != "" ){
      id = 'id="' + id + '"';
    }
    var html = '<ul class="hide ' + css + '" ' + id + ' >';
    
    //get the position to put the datalist
    //check if data is simple array or array of objects
    if( typeof(data[0]) == "object" ){
      var data_type = "object";
      var li_html = _this.generateDataList(data, display_key);
    }
    else{
      var data_type = "simple";
      var li_html = _this.generateDataListSimple(data);
    }
    html = html + li_html + "</ul>";
    $(html).insertAfter(input);
    $(input).focus(function(){
      $(this).next("ul").removeClass("hide");
      $(this).next("ul li").removeClass("hide");
    });
    $(input).keyup(function(){
      var input_val = $(this).val().toLowerCase();
      $(input).next("ul").children("li").each(function(i,d){
        var li_val = $(d).html().toLowerCase();
        if( $(d).attr("no_filter") == "true"){
          return;
        }
        if( search_pos == "any"  && li_val.indexOf(input_val) !== -1 ){
          $(d).removeClass("hide");
        }
        else if( search_pos == "start"  && li_val.indexOf(input_val) === 0 ){
          $(d).removeClass("hide");
        }
        else{
          $(d).addClass("hide");
        }
      });
    });
    $(input).next("ul").children("li").click(function(){
      var li_val = $(this).html();
      var data_id = $(this).attr("data_id");
      $(input).val(li_val);
      $(input).attr("data-id",data_id);
      $(input).next("ul").addClass("hide");
      if( typeof( _this._afterDataSelect ) == "function" ){
        _this._afterDataSelect();
      }
    });
    $(input).focusout(function(){
      setTimeout(function(){
        $(input).next("ul").addClass("hide");
      },500);
      if( typeof( _this._afterInputFocusOut ) == "function" ){
        _this._afterInputFocusOut();
      }
    });
  }

  afterDataSelect(fn){
    if( typeof( fn ) == "function" ){
      this._afterDataSelect = fn;
    }
  }

  afterInputFocusOut(fn){
    if( typeof( fn ) == "function" ){
      this._afterInputFocusOut = fn;
    }
  }

  generateDataListSimple(){}

  generateDataList(data, display_key){
    //check if id or data_id is set for the first item in the data array
    //assume no ids are set
    var id_type = "none";
    //check if id is set or data_id is set
    if( typeof(data[0].id) != "undefined" ){
      var id_type = "id";
    }
    else if( typeof(data[0].data_id) != "undefined" ){
      var id_type = "data_id";
    }
    var html = "";
    data.forEach(function(d){
      var no_filter = "";
      if(typeof( d.no_filter != "undefined") && d.no_filter == true){
        no_filter = 'no_filter="true"';
      }
      //set the data_id string
      var data_id = "";
      if( id_type == "id" ){
        data_id = ' data_id="' + d.id + '" ';
      }
      else if( id_type == "data_id" ){
        data_id = ' data_id="' + d.data_id + '" ';
      }
      //generate html for this data item
      html += '<li ' + data_id + no_filter + '>' + d[display_key] + '</li>';
    });
    return(html);
  }
}
jQuery.fn.extend({
  ondragstart : function(fn){
    return this.each(function(i, element){
      element.addEventListener("dragstart", function(event){
        fn(event,element);
      });
    });
  },
  ondragend : function(fn){
    return this.each(function(i, element){
      element.addEventListener("dragend", function(event){
        fn(event,element);
      });
    });
  },
  hide : function(fn){
    return this.each(function(i, element){
      if(typeof(fn) == "function"){
        fn();
      }
      $(element).trigger("beforehide");
      $(element).addClass("hide");
    });
  },
  show : function(fn){
    return this.each(function(i, element){
      if(typeof(fn) == "function"){
        fn();
      }
      $(element).removeClass("hide");
      $(element).trigger("onshow");
    });
  }
});
/*
 * File for CUTS class 
 * 
 * File for CUTS class 
 * @package xpress
 */

/*
 * CUTS class generates the cuts/pieces that would be created
 * 
 * CUTS class generates the cuts/pieces that would be created given a parent
 * paper size and / or machine paper size and closed job size.
 * This class uses units, that is just using numbers and not specifying inches 
 * or centimeters, as all caluations will be done without any conversions and
 * thus will work exactly the same as long as the units used are consistent. 
 * The units inches or centimeters set will be used to generate the text, and if
 * needed to convert for putting converted value for viwing by the user.
 */
class CUTS{

  /*
   * constructor for cuts class
   */
  constructor(){
    var _this = this;
    _this.threshold = 1;
    _this.mm_inch_conv = 25.4;
    _this.font_size_factor = 30;
    _this.font_size = 100;
    _this.outer_margin = 400;
    _this.outer_margin_factor = 8;
    _this.trim_width = 3;
    _this.trim_view_factor = 0.01;
    _this.trim_view = 50;
    _this.setUnits("in");
    _this.setGripper(12,"disable");
    _this.spine_width = 75
    _this.module = window.module
  }
  
  /*
   * Sets the units used
   * 
   * Sets the units used either inch(in) or centimeter(cm) no other units are
   * accepted
   *
   * @param string units The units to set one of inch, in, centimeter, cm
   */
  setUnits(units){
    var _this = this;
    if( units == "in" || units == "inch" ){
      _this.units = "in"; 
    }
    else if( units == "cm" || units == "centimeter" ){
      _this.units = "cm";
    }
  }
  
  /*
   * Sets the machine size used for printing
   * 
   * Sets the machine size used for printing in units
   * 
   * @param width of the paper used in machine in units 
   * @param height of the paper used in machine in units 
   */
  setMachineSize( width, height ){
    var _this = this;
    _this.machine_size = {
      width  : parseFloat(width)*100,
      height : parseFloat(height)*100
    }
  }
  
  /*
   * Sets the parent papaer size
   * 
   * Sets the parent papaer size
   * 
   * @param width of the parent paper 
   * @param height of the parent paper
   */
  setParentSize( width, height ){
    var _this = this;
    _this.parent_size = {
      width  : parseFloat(width)*100,
      height : parseFloat(height)*100
    };
    _this.trimmed_parent_size = {
      width : _this.parent_size.width - ((_this.trim_width * 2) / _this.mm_inch_conv)*100,
      height : _this.parent_size.height - ((_this.trim_width * 2) / _this.mm_inch_conv)*100
    };
    if(width < height){
      _this.font_size = (height / _this.font_size_factor)*100;
      _this.trim_view = _this.parent_size.height * _this.trim_view_factor;
      _this.outer_margin = _this.parent_size.height / _this.outer_margin_factor;
    }
    else{
      _this.font_size = (width / _this.font_size_factor)*100;
      _this.trim_view = _this.parent_size.width * _this.trim_view_factor;
      _this.outer_margin = _this.parent_size.width / _this.outer_margin_factor;
    }
  }
  
  /*
   * Sets the closed job size
   * 
   * Sets the closed job size
   * 
   * @param width of the closed job size 
   * @param height of the closed job size
   */
  setClosedJobSize( width, height ){
    var _this = this;
    _this.closed_job_size = {
      width  : parseFloat(width)*100,
      height : parseFloat(height)*100
    }
  }
  
  /*
   * Sets the open job size
   * 
   * Sets the open job size
   * 
   * @param width of the open job size 
   * @param height of the open job size
   */
  setOpenJobSize( width, height ){
    var _this = this;
    _this.open_job_size = {
      width  : parseFloat(width)*100,
      height : parseFloat(height)*100
    }
  }
  
  /*
   * generates cuts according to machine paper size
   * 
   * generates cuts according to machine paper size
   */
  generateMachineCuts( cuts ){
    var _this = this;
    var cut = _this.generateCut( cuts.parent_size, _this.closed_job_size ); 
    _this.cuts = {
      cut : {
        cut : cut, 
        parent_size : _this.parent_size,
        machine_size : cuts.machine_size, 
        closed_job_size : _this.closed_job_size,
        open_job_size : _this.open_job_size
      }
    };
  }
  
  setGripper(gripper_width, gripper_side ="top"){
    var _this = this;
    gripper_width = gripper_width / _this.mm_inch_conv;
    _this.gripper = {
      width : gripper_width,
      side  : gripper_side
    }; 
  }
  
  createGripper(svg){
    var _this = this;
    if(_this.gripper.side == "disable"){
      return;
    }
    var rect = _this.createRect({
      x : _this.outer_margin,
      y : _this.outer_margin,
      width : _this.parent_size.width,
      height : _this.gripper.width,
      fill : "red",
      stroke : "red"
    });
    $(rect).addClass("top_gripper");
    $(rect).addClass("gripper");
    $(svg).append(rect);
    if( _this.gripper.side != "top" ){
      $(svg).find(".top_gripper").hide();
    }
    var rect = _this.createRect({
      x : _this.outer_margin,
      y : _this.outer_margin,
      width : _this.parent_size.width,
      height : "20%",
      fill : "transparent",
      stroke : "transparent"
    });
    $(rect).addClass("top_gripper_target");
    $(svg).append(rect);
    $(svg).find(".top_gripper_target").click(function(e){
      e.preventDefault();
      e.stopPropagation();
      $(svg).find(".gripper").hide();
      $(svg).find(".top_gripper").show();
    });
    var rect = _this.createRect({
      x : _this.outer_margin + _this.parent_size.width,
      y : _this.outer_margin,
      height : _this.parent_size.height,
      width : _this.gripper.width,
      fill : "red",
      stroke : "red"
    });
    $(rect).addClass("right_gripper");
    $(rect).addClass("gripper");
    $(svg).append(rect);
    if( _this.gripper.side != "right" ){
      $(svg).find(".right_gripper").hide();
    }
    var rect = _this.createRect({
      x : _this.outer_margin + _this.parent_size.width * 0.8,
      y : _this.outer_margin,
      height : _this.parent_size.height,
      width : "20%",
      fill : "transparent",
      stroke : "transparent"
    });
    $(rect).addClass("right_gripper_target");
    $(svg).append(rect);
    $(svg).find(".right_gripper_target").click(function(e){
      e.preventDefault();
      e.stopPropagation();
      $(svg).find(".gripper").hide();
      $(svg).find(".right_gripper").show();
    });
  }
  
  generateSvg( element , cuts , job_size){
    var _this = this;
    const parent_stroke_color = '#000'
    const parent_text_color = '#000'
    const parent_fill_color = '#fff'
    const cuts_stroke_color = '#000'
    const cuts_fill_color = '#eddf9c'
    const cuts_text_color = '#000'
    $(element).find("svg").remove();
    var svg_width = _this.parent_size.width  + _this.outer_margin * 2;
    var svg_height = _this.parent_size.height  + _this.outer_margin * 2;
    var html = '<svg xmlns="http://www.w3.org/2000/svg" width="' 
      + svg_width + '" height="' + svg_height 
      + ' " viewBox="0 0 ' + svg_width + " " + svg_height + '">';
    $(element).append(html);

    var view_trim
    var svg = $(element).find("svg");
    var rect = _this.createRect({
      x : _this.outer_margin - _this.trim_view,
      y : _this.outer_margin - _this.trim_view,
      width : _this.parent_size.width + _this.trim_view * 2,
      height : _this.parent_size.height + _this.trim_view * 2,
      fill : parent_fill_color,
      stroke : parent_stroke_color,
      stroke_width: "0.6%"
    });
    $(svg).append(rect);
    var rect = _this.createRect({
      x : _this.outer_margin,
      y : _this.outer_margin,
      width : job_size.width * cuts.w_cuts,
      height : job_size.height * cuts.h_cuts,
      fill : cuts_fill_color,
      stroke : cuts_stroke_color,
    });
    $(svg).append(rect);
    _this.createGripper(svg);
    //top corners
    //left h
    $(svg).append(_this.createLine({
      color : "#f09423",
      y1 : _this.outer_margin - _this.trim_view ,
      y2 : _this.outer_margin - _this.trim_view ,
      x1 : 0,
      x2 : _this.outer_margin - _this.trim_view * 2
    }));
    //right h
    $(svg).append(_this.createLine({
      color : parent_stroke_color,
      y1 : _this.outer_margin - _this.trim_view ,
      y2 : _this.outer_margin - _this.trim_view ,
      x1 : _this.outer_margin  + _this.parent_size.width + _this.trim_view*2,
      x2 : _this.outer_margin * 2 + _this.parent_size.width
    }));
    //left v
    $(svg).append(_this.createLine({
      color : parent_stroke_color,
      y1 : 0 ,
      y2 : _this.outer_margin - _this.trim_view * 2,
      x1 : _this.outer_margin - _this.trim_view,
      x2 : _this.outer_margin - _this.trim_view
    }));
    //right v
    $(svg).append(_this.createLine({
      color : parent_stroke_color,
      y1 : 0,
      y2 : _this.outer_margin - _this.trim_view * 2,
      x1 : _this.outer_margin  + _this.parent_size.width + _this.trim_view,
      x2 : _this.outer_margin  + _this.parent_size.width + _this.trim_view,
    }));
    //bottom corners
    //left h
    $(svg).append(_this.createLine({
      color : "#f09423",
      y1 : _this.outer_margin  + job_size.height * cuts.h_cuts,
      y2 : _this.outer_margin  + job_size.height * cuts.h_cuts,
      x1 : 0,
      x2 : _this.outer_margin - _this.trim_view * 2
    }));
    //right h
    $(svg).append(_this.createLine({
      color : parent_stroke_color,
      y1 : _this.outer_margin  + _this.parent_size.height + _this.trim_view,
      y2 : _this.outer_margin  + _this.parent_size.height + _this.trim_view,
      x1 : _this.outer_margin  + _this.parent_size.width + _this.trim_view*2,
      x2 : _this.outer_margin * 2 + _this.parent_size.width
    }));
    //left v
    $(svg).append(_this.createLine({
      color : "#f09423",
      y1 : _this.outer_margin  + _this.parent_size.height + _this.trim_view*2,
      y2 : _this.outer_margin * 2  + _this.parent_size.height ,
      x1 : _this.outer_margin - _this.trim_view,
      x2 : _this.outer_margin - _this.trim_view
    }));
    //right v
    $(svg).append(_this.createLine({
      color : "#f09423",
      y1 : _this.outer_margin  + _this.parent_size.height + _this.trim_view*2,
      y2 : _this.outer_margin * 2  + _this.parent_size.height ,
      x1 : _this.outer_margin  + job_size.width * cuts.w_cuts,
      x2 : _this.outer_margin  + job_size.width * cuts.w_cuts,
    }));
    let text = ''
    let size_in = 0
    let size_mm = 0
    const show_hide_mm = $("#show_hide_mm").val() 
    size_in = _this.parent_size.height/100
    size_mm = size_in * _mm_inch_conv_
    //right text
    let mm_text = fixed( size_in, 1 ) + ' ( ' + fixed( size_mm, 1 ) + 'mm )' 
    let in_text = fixed( size_in, 1 )
    if( show_hide_mm == 'show'){
      text = mm_text
    }
    else{
      text = in_text
    }
    let right_text = _this.createText({
      x : _this.outer_margin * 1.5 + _this.parent_size.width + _this.trim_view*2,
      y : _this.outer_margin + (_this.parent_size.height/2),
      text : text,
      font_size : _this.font_size * 1.5,
      color : parent_text_color,
      font_weight : 900,
      transform : "rotate(90)"
    })
    $(right_text).addClass("outer_text")
    $(right_text).attr('mm_text',mm_text)
    $(right_text).attr('in_text',in_text)
    $(svg).append(right_text)
    //left text
    size_in = job_size.height/100 * cuts.h_cuts
    size_mm = size_in * _mm_inch_conv_
    mm_text = fixed( size_in, 1 ) + ' ( ' + fixed( size_mm, 1 ) + 'mm )' 
    in_text = fixed( size_in, 1 )
    if( show_hide_mm == 'show'){
      text = mm_text
    }
    else{
      text = in_text
    }
    let left_text = _this.createText({
      x : _this.outer_margin/2 - _this.trim_view,
      y : _this.outer_margin + (job_size.height * cuts.h_cuts/2),
      text : text,
      font_size : _this.font_size * 1.5,
      color : "#f09423",
      font_weight : 900,
      transform : "rotate(-90)"
    })
    $(left_text).addClass("outer_text")
    $(left_text).attr('mm_text',mm_text)
    $(left_text).attr('in_text',in_text)
    $(svg).append(left_text)
    //bottom text
    size_in = job_size.width/100 * cuts.w_cuts
    size_mm = size_in * _mm_inch_conv_
    mm_text = fixed( size_in, 1 ) + ' ( ' + fixed( size_mm, 1 ) + 'mm )' 
    in_text = fixed( size_in, 1 )
    if( show_hide_mm == 'show'){
      text = mm_text
    }
    else{
      text = in_text
    }
    let bottom_text = _this.createText({
      y : _this.outer_margin*1.5 + _this.trim_view*2 + _this.parent_size.height 
        + _this.font_size ,
      x : _this.outer_margin + (job_size.width * cuts.w_cuts/2),
      text : text,
      font_size : _this.font_size * 1.5,
      color : "#f09423",
      font_weight : 900,
    })
    $(bottom_text).addClass("outer_text")
    $(bottom_text).attr('mm_text',mm_text)
    $(bottom_text).attr('in_text',in_text)
    $(svg).append(bottom_text)
    //left text
    //top text
    size_in = _this.parent_size.width/100
    size_mm = size_in * _mm_inch_conv_
    mm_text = fixed( size_in, 1 ) + ' ( ' + fixed( size_mm, 1 ) + 'mm )' 
    in_text = fixed( size_in, 1 )
    if( show_hide_mm == 'show'){
      text = mm_text
    }
    else{
      text = in_text
    }
    let top_text = _this.createText({
      color : parent_text_color,
      y : _this.outer_margin /2 - _this.trim_view *2,
      x : _this.outer_margin + _this.parent_size.width/2,
      text : text,
      font_size : _this.font_size * 1.5,
      font_weight : 900,
    })
    $(top_text).addClass("outer_text")
    $(top_text).attr('mm_text',mm_text)
    $(top_text).attr('in_text',in_text)
    $(svg).append(top_text)
    //joiners
    //top
    $(svg).append(_this.createLine({
      color : parent_stroke_color,
      y1 : _this.outer_margin/2 - _this.trim_view,
      y2 : _this.outer_margin/2 - _this.trim_view,
      x1 : _this.outer_margin - _this.trim_view,
      x2 : _this.outer_margin +_this.parent_size.width + _this.trim_view
    }));
    //bottom
    $(svg).append(_this.createLine({
      color : "#f09423",
      y1 : _this.outer_margin * 1.5 + _this.parent_size.height + _this.trim_view,
      y2 : _this.outer_margin * 1.5 + _this.parent_size.height + _this.trim_view,
      x1 : _this.outer_margin - _this.trim_view,
      x1 : _this.outer_margin - _this.trim_view,
      x2 : _this.outer_margin  + job_size.width * cuts.w_cuts,
    }));
    //right
    $(svg).append(_this.createLine({
      color : parent_stroke_color,
      y1 : _this.outer_margin - _this.trim_view,
      y2 : _this.outer_margin  + _this.parent_size.height + _this.trim_view,
      x1 : _this.outer_margin * 1.5 + _this.parent_size.width + _this.trim_view,
      x2 : _this.outer_margin * 1.5 + _this.parent_size.width + _this.trim_view,
    }));
    //left
    $(svg).append(_this.createLine({
      color : "#f09423",
      y1 : _this.outer_margin - _this.trim_view,
      y2 : _this.outer_margin  + job_size.height * cuts.h_cuts,
      x1 : _this.outer_margin/2,
      x2 : _this.outer_margin/2,
    }));
    
    var y1 = _this.outer_margin;
    var x2 = _this.outer_margin + job_size.width  * cuts.w_cuts;
    for( var i = 0; i <= cuts.h_cuts; i++ ){
      if( i > 0 ){ 
        if(_this.create_spine == true){
          let x_spine = 0
          let y_spine = 0
          let spine_width = 0
          let spine_height = 0
          if( job_size.height > job_size.width ){
            x_spine = _this.outer_margin
            y_spine = _this.outer_margin + job_size.height/2 + job_size.height * 
              (i - 1) - 75/2
            spine_width = job_size.width * cuts.w_cuts
            spine_height = _this.spine_width
            var rect = _this.createRect({
              x : x_spine,
              y : y_spine,
              width : spine_width,
              height : spine_height,
              fill : "#fff",
              stroke : "#fff",
            });
            $(svg).append(rect);
          }
        }
        y1 = y1 + job_size.height;
        size_in = job_size.height/100
        size_mm = fixed( size_in * _mm_inch_conv_, 1 ) + ' mm'
        $(svg).append(_this.createText({
          color : cuts_text_color,
          y : _this.outer_margin + _this.font_size + ((job_size.height/2) + job_size.height * (i-1) ),
          x : _this.outer_margin - _this.font_size*2 + (job_size.width * cuts.w_cuts),
          text : job_size.height/100,
          hidden_text: size_mm,
          transform: "rotate(90,"+_this.font_size+",0)"
        }));
      }
      $(svg).append(_this.createLine({
        color : cuts_stroke_color,
        x1 : _this.outer_margin,
        x2 : x2,
        y1 : y1,
        y2 : y1,
        stroke_width:"0.1%"
      }));
      if( cuts.h_cuts == 3 && cuts.pieces == 5 && i == cuts.h_cuts ){
        var rect = _this.createRect({
          x : x2,
          y : _this.outer_margin,
          width : job_size.height,
          height : job_size.width * 2,
          fill : cuts_fill_color,
          stroke : cuts_stroke_color,
        });
        $(svg).append(rect);
        $(svg).append(_this.createLine({
          color : cuts_stroke_color,
          x1 : x2 + job_size.height,
          x2 : x2 + job_size.height,
          y1 : _this.outer_margin,
          y2 : _this.outer_margin + job_size.width * 2,
          stroke_width:"0.1%"
        }));
        for( let j = 0; j < 3; j++ ){
          if( j > 0 ){
            size_in = job_size.width/100
            size_mm = fixed( size_in * _mm_inch_conv_, 1 ) + ' mm'
            $(svg).append(_this.createText({
              color : cuts_text_color,
              y : _this.outer_margin + _this.font_size + ((job_size.width/2) + job_size.width * (j-1) ),
              x : _this.outer_margin - _this.font_size*2 + job_size.height + job_size.width,
              text : size_in,
              hidden_text: size_mm,
              transform: "rotate(90,"+_this.font_size+",0)"
            }));
            size_in = job_size.height/100
            size_mm = fixed( size_in * _mm_inch_conv_, 1 ) + ' mm'
            $(svg).append(_this.createText({
              color : cuts_text_color,
              y : _this.outer_margin + _this.font_size + ( job_size.width * (j-1) ),
              x : _this.outer_margin + job_size.height/2 + job_size.width,
              text : size_in,
              hidden_text: size_mm,
            }));
          }
          y1 = _this.outer_margin + j * job_size.width
          $(svg).append(_this.createLine({
            color : cuts_stroke_color,
            x1 : x2,
            x2 : x2 + job_size.height,
            y1 : y1,
            y2 : y1,
            stroke_width:"0.1%"
          }));
        }
      }
      if( window.module == "stationery" && cuts.pieces == 10 ){
        var rect = _this.createRect({
          x : _this.outer_margin + job_size.width * 2,
          y : _this.outer_margin,
          width : job_size.height,
          height : job_size.width * 4,
          fill : cuts_fill_color,
          stroke : cuts_stroke_color,
        });
        $(svg).append(rect);
        $(svg).append(_this.createLine({
          color : cuts_stroke_color,
          x1 : x2 + job_size.height,
          x2 : x2 + job_size.height,
          y1 : _this.outer_margin,
          y2 : _this.outer_margin + job_size.width * 4,
          stroke_width:"0.1%"
        }));
        for( let j = 0; j < 5; j++ ){
          if( j > 0 ){
            size_in = job_size.width/100
            size_mm = fixed( size_in * _mm_inch_conv_, 1 ) + ' mm'
            $(svg).append(_this.createText({
              color : cuts_text_color,
              y : _this.outer_margin + _this.font_size + ((job_size.width/2) + job_size.width * (j-1) ),
              x : _this.outer_margin - _this.font_size*2 + job_size.height + job_size.width * 2,
              text : size_in,
              hidden_text: size_mm,
              transform: "rotate(90,"+_this.font_size+",0)"
            }));
            size_in = job_size.height/100
            size_mm = fixed( size_in * _mm_inch_conv_, 1 ) + ' mm'
            $(svg).append(_this.createText({
              color : cuts_text_color,
              y : _this.outer_margin + _this.font_size + ( job_size.width * (j-1) ),
              x : _this.outer_margin + job_size.height/2 + job_size.width * 2,
              text : size_in,
              hidden_text: size_mm,
            }));
          }
          let y3 = _this.outer_margin + j * job_size.width
          $(svg).append(_this.createLine({
            color : cuts_stroke_color,
            x1 : x2,
            x2 : x2 + job_size.height,
            y1 : y3,
            y2 : y3,
            stroke_width:"0.1%"
          }));
        }
      }
    }
    var x1 = _this.outer_margin;
    var y2 = _this.outer_margin + job_size.height  * cuts.h_cuts;
    for( var i = 0; i <= cuts.w_cuts; i++ ){
      if( i > 0 ){ 
        if(_this.create_spine == true){
          let x_spine = 0
          let y_spine = 0
          let spine_width = 0
          let spine_height = 0
          if( job_size.width > job_size.height ){
            x_spine = _this.outer_margin + job_size.width/2 + job_size.width * 
              (i - 1) - 75/2
            y_spine = _this.outer_margin
            spine_height = job_size.height * cuts.h_cuts
            spine_width = _this.spine_width
            var rect = _this.createRect({
              x : x_spine,
              y : y_spine,
              width : spine_width,
              height : spine_height,
              fill : "#fff",
              stroke : "#fff",
            });
            $(svg).append(rect);
          }
        }
        x1 = x1 + job_size.width;
        size_in = job_size.width/100
        size_mm = fixed( size_in * _mm_inch_conv_, 1 ) + ' mm'
        $(svg).append(_this.createText({
          color : cuts_text_color,
          y : _this.outer_margin + _this.font_size,
          x : _this.outer_margin + ((job_size.width/2) + job_size.width * (i-1) ),
          text : job_size.width/100,
          hidden_text : size_mm
        }));
      }
      $(svg).append(_this.createLine({
        color : cuts_stroke_color,
        y1 : _this.outer_margin,
        y2 : y2,
        x1 : x1,
        x2 : x1,
        stroke_width:"0.1%"
      }));
    }
    _this.enablemmHovering(svg)
    _this.createMachineSize( svg )
    let mc_swap = $(element).parent().find(".swap_mc_size")
    $(mc_swap).off("click")
    $(mc_swap).click(function(){
      _this.swapMachineSize(element)
    })
    _this.enableUpdateOuterMM()
  }
  enableUpdateOuterMM(){
    $("#show_hide_mm").change(function(){
      let show_hide_mm = $(this).val()
      $(".outer_text").each(function(){
        let in_text = $(this).attr("in_text")
        let mm_text = $(this).attr("mm_text")
        if(show_hide_mm == 'show'){
          $(this).find("text").html(mm_text)
        }
        else{
          $(this).find("text").html(in_text)
        }
      })
    })
  }
  swapMachineSize(element){
    let _this = this
    $(element).find(".machine_rect").each(function(){
      const width = parseInt($(this).attr("height"))
      const height = parseInt($(this).attr("width"))
      const stroke_width = parseInt($(this).attr("stroke-width"))
      const rect_top = parseInt($(this).attr('y'))
      $(this).attr("width", width)
      $(this).attr("height", height)
      let gripper = $(this).parent().find(".gripper")[0]
      const gripper_stroke_width = parseInt($(gripper).attr('stroke-width'))
      const x1 = parseInt($(gripper).attr('x1'))
      const x2 = width - stroke_width + x1
      const y = rect_top + height - stroke_width/2 - gripper_stroke_width/2
      $(gripper).attr('x2',x2)
      $(gripper).attr('y1',y)
      $(gripper).attr('y2',y)
      let svg = $(element).find("svg")
      _this.createDiagonals(svg, width, height)
    })
  }
  createMachineSize( svg ){
    let _this = this
    let width = _this.machine_size.width
    let height = _this.machine_size.height
    const stroke_width = width * 0.015
    let rect = _this.createRect({
      x : _this.outer_margin-stroke_width /2,
      y : _this.outer_margin - stroke_width/2,
      width : width + stroke_width,
      height : height + stroke_width,
      fill : "rgba(135,171,49,0.3)",
      stroke : "rgb(135,175,49)",
      stroke_width : stroke_width
    })
    $(rect).addClass("machine_rect")
    $(svg).append(rect);
    let gripper = (20/25.4)*100
    let line = _this.createLine({
      x1 : _this.outer_margin,
      x2 : _this.outer_margin + width,
      y1 : _this.outer_margin + height - gripper/2,
      y2 : _this.outer_margin + height - gripper/2,
      stroke_width:gripper,
      color:"rgba(135,171,49,0.8)"
    })
    $(line).addClass("gripper")
    $(svg).append(line)
    _this.createDiagonals(svg, width, height)
    let pgs = $(svg).find(".diagonal").length/2
    let element = $(svg).parent()
    _this.swapMachineSize(element)
    let r_pgs = $(svg).find(".diagonal").length/2
    if( _this.module == "book" ){
      if(!isPowerOfTwo(pgs)){
        pgs = 0
      }
      if(!isPowerOfTwo(r_pgs)){
        r_pgs = 0
      }
    }
    else if( _this.module == "multisheet" ){
      if(!(pgs == 2 || pgs == 4 || pgs == 8)){
        pgs = 0
      }
      if(!(r_pgs == 2 || r_pgs == 4 || r_pgs == 8)){
        r_pgs = 0
      }
    }
    if( r_pgs == 0 && pgs == 0 ){
      window.xpress.modalAlert("alert","Invalid Press Size",
        `The Press Size is invalid. Please Check the Press Size`, "failure");
    }
    if( pgs > r_pgs ){
      _this.swapMachineSize(element)
    }
  }
  createDiagonals(svg, width, height){
    let _this = this
    $(svg).find(".diagonal").remove()
    $(svg).find(".page_num").remove()
    const w_cuts = _this.cuts.cut.cut.w_cuts
    const h_cuts = _this.cuts.cut.cut.h_cuts
    const pieces = _this.cuts.cut.cut.pieces
    const job_width = _this.closed_job_size.width
    const job_height = _this.closed_job_size.height
    const machine_width = _this.machine_size.width
    const machine_height = _this.machine_size.height
    let print_page = 1
    let page = 1
    let title_page_num = 1
    let title_circle = ''
    let title_text = ''
    let title_circle_2 = ''
    let title_text_2 = ''
    for( let j = 1; j <= h_cuts; j++){
      for( let i = 1; i <= w_cuts; i++ ){
        let x1 = ( i - 1 ) * job_width + _this.outer_margin
        let x2 = x1 + job_width
        let y1 = ( j - 1 ) * job_height + _this.outer_margin
        let y2 = y1 + job_height
        if( i * job_width <= width && j * job_height <= height ){
          let line_x1 = 0
          let line_x2 = 0
          let line_y1 = 0
          let line_y2 = 0
          let page_x = 0
          let page_y = 0
          let page2_x = 0
          let page2_y = 0
          //creating the diagonals
          if( _this.create_spine == true ){
            //it is title cover book
            
            //set first set of lines, and page numbers
            if( job_width > job_height ){
              //spine is vertical
              line_x1 = x1
              line_x2 = x1 + (job_width - _this.spine_width)/2
              line_y1 = y1
              //from top of page to just before spine
              line_y2 = y2
              page_x = x1 + job_width / 4
              page_y = y1 + job_height / 2
            }
            else{
              //spine is horizantal
              line_x1 = x1
              line_x2 = x2
              line_y1 = y1
              //from top of page to just before spine
              line_y2 = y1 + (job_height - _this.spine_width)/2
              page_x = x1 + job_width / 2
              page_y = y1 + job_height / 4
            }
            let line = _this.createLine({
              x1:line_x1, x2:line_x2, y1:line_y1, y2:line_y2
            })
            $(line).addClass("diagonal")
            $(svg).append(line)

            //swap y coordinates to create other line 
            let tmp = line_y1
            line_y1 = line_y2
            line_y2 = tmp
            
            //create second line
            line = _this.createLine({
              x1:line_x1, x2:line_x2, y1:line_y1, y2:line_y2
            })
            $(line).addClass("diagonal")
            $(svg).append(line)
            
            //add circle for page 1
            title_circle = _this.createCircle({
              x:page_x, 
              y:page_y, 
              r: _this.font_size / 1.5
            })
            $(title_circle).addClass("page_num")
            $(svg).append(title_circle)
            
            //add text within circle
            title_text = _this.createText({
              x:page_x, 
              y:page_y + _this.font_size/3, 
              text: title_page_num
            })
            $(title_text).addClass("page_num")
            $(svg).append(title_text)
            title_page_num += 1
            
            //second set of lines and page numbers
            if( job_width > job_height ){
              //spine is vertical
              line_x1 = x1 + (job_width - _this.spine_width)/2 + _this.spine_width
              line_x2 = x1 + job_width
              line_y1 = y1
              //from top of page to just before spine
              line_y2 = y2
              page_x = line_x1 + job_width / 4
              page_y = y1 + job_height / 2
            }
            else{
              //spine is horizantal
              line_y1 = y1 + (job_height - _this.spine_width)/2 + _this.spine_width
              line_y2 = line_y1 + (job_height - _this.spine_width)/2
              page_x = x1 + job_width / 2
              page_y = y1 + job_height / 4 + job_height / 2 
            }

            //create diagonal line
            line = _this.createLine({
              x1:line_x1, x2:line_x2, y1:line_y1, y2:line_y2
            })
            $(line).addClass("diagonal")
            $(svg).append(line)
            
            //swap y coordinates to create other line 
            tmp = line_y1
            line_y1 = line_y2
            line_y2 = tmp
            
            //create second line
            line = _this.createLine({
              x1:line_x1, x2:line_x2, y1:line_y1, y2:line_y2
            })
            $(line).addClass("diagonal")
            $(svg).append(line)
            
            //add circle for page 2
            title_circle = _this.createCircle({
              x:page_x, 
              y:page_y, 
              r: _this.font_size / 1.5
            })
            $(title_circle).addClass("page_num")
            $(svg).append(title_circle)
            
            //add text within circle
            title_text = _this.createText({
              x:page_x, 
              y:page_y + _this.font_size/3, 
              text: title_page_num
            })
            $(title_text).addClass("page_num")
            $(svg).append(title_text)
            title_page_num += 1
          }
          else{
            let line = _this.createLine({
              x1, x2, y1, y2
            })
            $(line).addClass("diagonal")
            $(svg).append(line)
            let text = _this.createText({
              x:x1 + job_width / 2, 
              y:y1 + job_height / 2 + _this.font_size / 3, 
              text: print_page
            })
            $(text).addClass("page_num")
            let circle = _this.createCircle({
              x:x1 + job_width / 2, 
              y:y1 + job_height / 2, 
              r: _this.font_size / 1.5
            })
            $(circle).addClass("page_num")
            print_page = print_page + 1
            let tmp = y1
            y1 = y2
            y2 = tmp
            line = _this.createLine({
              x1, x2, y1, y2
            })
            $(line).addClass("diagonal")
            $(svg).append(line)
            $(svg).append(circle)
            $(svg).append(text)
            const x = i * job_width + _this.outer_margin - job_width/2
            const y = j * job_height + _this.outer_margin - _this.font_size/2
          }
        }
        //create page numbers at bottom of page
        let text = ""
        //title cover
        if( _this.create_spine == true ){
          //vertical spine
          if( job_width > job_height ){
            text = _this.createText({
              x: _this.outer_margin + job_width * (i-1) + 
                (job_width - _this.spine_width) / 4,
              y: _this.outer_margin + job_height * j - _this.font_size / 3,
              text: page
            })
            $(text).addClass("page_num")
            $(text).addClass("page_num")
            $(svg).append(text)
            page = page + 1
            text = _this.createText({
              x: _this.outer_margin + job_width * i -
                (job_width - _this.spine_width) / 4,
              y: _this.outer_margin + job_height * j - _this.font_size / 3,
              text: page
            })
            $(text).addClass("page_num")
            $(text).addClass("page_num")
            $(svg).append(text)
            page = page + 1
          }
          //horizontal spine
          else{
            text = _this.createText({
              x: x1 + job_width / 2,
              y: y1 + (job_height - _this.spine_width)/2 - _this.font_size / 3,
              text: page
            })
            $(text).addClass("page_num")
            $(svg).append(text)
            page = page + 1
            text = _this.createText({
              x: x1 + job_width / 2,
              y: y1 + job_height - _this.font_size / 3,
              text: page
            })
            $(text).addClass("page_num")
            $(svg).append(text)
            page = page + 1
          }
        }
        else{
          text = _this.createText({
            x:_this.outer_margin + job_width * (i - 1) + job_width / 2, 
            y:_this.outer_margin + job_height * j - _this.font_size / 3, 
            text: page
          })
          $(text).addClass("page_num")
          $(svg).append(text)
          page = page + 1
        }
      }
    }
    if( h_cuts == 3 && pieces == 5 ){
      let text = _this.createText({
        x:job_width + _this.outer_margin + job_height/2,
        y:_this.outer_margin + job_width - _this.font_size/2, 
        text: 4
      })
      $(svg).append(text)
      text = _this.createText({
        x:job_width + _this.outer_margin + job_height/2,
        y:_this.outer_margin + job_width * 2 - _this.font_size/2, 
        text: 5
      })
      $(svg).append(text)
      if( machine_width >= job_width + job_height ){
        if( machine_height >= job_width  ){
          let x1 = _this.outer_margin + job_width 
          let x2 = _this.outer_margin + job_width + job_height
          let y1 = _this.outer_margin
          let y2 = _this.outer_margin + job_width
          let line = _this.createLine({
            x1, x2, y1, y2
          })
          $(svg).append(line)
          let tmp = y1
          y1 = y2
          y2 = tmp
          line = _this.createLine({
            x1, x2, y1, y2
          })
          $(svg).append(line)
          let circle = _this.createCircle({
            x:_this.outer_margin + job_width + job_height / 2, 
            y:_this.outer_margin + job_width / 2 , 
            r: _this.font_size / 1.5
          })
          $(circle).addClass("page_num")
          $(svg).append(circle)
          let text = _this.createText({
            x:_this.outer_margin + job_width + job_height / 2, 
            y:_this.outer_margin + job_width / 2 + _this.font_size / 3, 
            text: 4
          })
          $(text).addClass("page_num")
          $(svg).append(text)
        }
        if( machine_height >= job_width * 2 ){
          let x1 = _this.outer_margin + job_width 
          let x2 = _this.outer_margin + job_width + job_height 
          let y1 = _this.outer_margin + job_width * 2
          let y2 = _this.outer_margin + job_width
          let line = _this.createLine({
            x1, x2, y1, y2
          })
          $(line).addClass("diagonal")
          $(svg).append(line)
          let tmp = y1
          y1 = y2
          y2 = tmp
          line = _this.createLine({
            x1, x2, y1, y2
          })
          $(line).addClass("diagonal")
          $(svg).append(line)
          let circle = _this.createCircle({
            x:_this.outer_margin + job_width + job_height / 2, 
            y:_this.outer_margin + job_width * 1.5 , 
            r: _this.font_size / 1.5
          })
          $(circle).addClass("page_num")
          $(svg).append(circle)
          let text = _this.createText({
            x:_this.outer_margin + job_width + job_height / 2, 
            y:_this.outer_margin + job_width * 1.5 + _this.font_size / 3, 
            text: 5
          })
          $(text).addClass("page_num")
          $(svg).append(text)
        }
      }
    }
    if( window.module == "stationery" && pieces == 10 ){
      for( let i = 0; i < 4; i++ ){
        let x1 = _this.outer_margin + job_width * 2
        let x2 = _this.outer_margin + job_width * 2 + job_height
        let y1 = _this.outer_margin + job_width * i
        let y2 = _this.outer_margin + job_width * (i + 1)
        let line = _this.createLine({
          x1, x2, y1, y2
        })
        $(line).addClass("diagonal")
        $(svg).append(line)
        let tmp = y1
        y1 = y2
        y2 = tmp
        line = _this.createLine({
          x1, x2, y1, y2
        })
        $(line).addClass("diagonal")
        $(svg).append(line)
        let circle = _this.createCircle({
          x:job_width * 2 + _this.outer_margin + job_height/2,
          y:_this.outer_margin + job_width * (i + 0.5) , 
          r: _this.font_size / 1.5
        })
        $(circle).addClass("page_num")
        $(svg).append(circle)
        let text = _this.createText({
          x:job_width * 2 + _this.outer_margin + job_height/2,
          y:_this.outer_margin + job_width * (i + 0.5) + _this.font_size / 3, 
          text: 6 + i + 1
        })
        $(text).addClass("page_num")
        $(svg).append(text)
        text = _this.createText({
          x:job_width * 2 + _this.outer_margin + job_height/2,
          y:_this.outer_margin + job_width * (i + 1) - _this.font_size/2, 
          text: 6 + i + 1
        })
        $(svg).append(text)
      }
    }
    const pgs = $(svg).find(".diagonal").length/2
    let element = $(svg).parent()
    $(element).parent().find(".pgs").html(pgs)
  }
  enablemmHovering(svg){
    $(svg).find('.hover-text').off('hover')
    $(svg).find('.hover-text').hover(function(){
      const show_hide_mm = $("#show_hide_mm").val()
      if(show_hide_mm == 'hide'){
        return
      }
      $(this).parent().find('.hidden-text').show()
    })
    $(svg).find('.hover-text').parent().off('mouseleave')
    $(svg).find('.hover-text').parent().mouseleave(function(){
      $(this).find('.hidden-text').hide()
    })
  }
  createCircle(circle){
    let _this = this
    const svgNS = 'http://www.w3.org/2000/svg'
    let svg_circle = document.createElementNS(svgNS, 'circle')
    svg_circle.setAttributeNS(null, 'cx', circle.x)
    svg_circle.setAttributeNS(null, 'cy', circle.y)
    svg_circle.setAttributeNS(null, 'r',  circle.r)
    svg_circle.setAttributeNS(null, 'style', 'fill: white; stroke: black; stroke-width: 1px;' );
    return(svg_circle)
  }

  createText(text){
    var _this = this;
    var svgNS = "http://www.w3.org/2000/svg";
    var newText = document.createElementNS(svgNS,"text");
    var G = document.createElementNS(svgNS, "g");
    var font_size = "100";
    if(typeof(text.font_size) != "undefined"){
      font_size = text.font_size;
    }
    else{
      font_size = _this.font_size;
    }
    G.setAttributeNS(null,"transform","translate("+text.x+","+text.y+")");     
    newText.setAttributeNS(null,"font-size",font_size);
    newText.setAttributeNS(null,"text-anchor","middle");
    if(typeof(text.transform) != "undefined")
    {
      newText.setAttributeNS(null,"transform",text.transform);
    }
    if(typeof(text.color) != "undefined")
    {
      newText.setAttributeNS(null,"fill",text.color);
    }
    if(typeof(text.font_weight) != "undefined")
    {
      newText.setAttributeNS(null,"font-weight",text.font_weight);
    }
    if(typeof( text.hidden_text ) != "undefined" && text.hidden_text != ''){
      
      var hiddenText = document.createElementNS(svgNS,"text");
      newText.setAttributeNS(null, "class", "hover-text")
      hiddenText.setAttributeNS(null, "class", "hidden-text hide")
      hiddenText.setAttributeNS(null,"font-size",font_size);
      hiddenText.setAttributeNS(null,"text-anchor","middle");
      let transform = "translate(0,"+font_size+")"
      if(typeof(text.transform) != "undefined")
      {
        transform = text.transform + transform
      }
      if(typeof(text.color) != "undefined")
      {
        hiddenText.setAttributeNS(null,"fill",text.color);
      }
      hiddenText.setAttributeNS(null,"transform",transform);
      var hiddenTextNode = document.createTextNode(text.hidden_text)
      hiddenText.appendChild(hiddenTextNode)
      $(G).append(hiddenText)
    }
    var textNode = document.createTextNode(text.text);
    newText.appendChild(textNode);
    $(G).append(newText);
    return(G);
  }
  createLine(line){
    var svg_line = document.createElementNS('http://www.w3.org/2000/svg','line');
    svg_line.setAttribute('x1',line.x1);
    svg_line.setAttribute('y1',line.y1);
    svg_line.setAttribute('x2',line.x2);
    svg_line.setAttribute('y2',line.y2);
    if(typeof(line.color) != "undefined"){
      svg_line.setAttribute("stroke", line.color);
    }
    else{
      svg_line.setAttribute("stroke", "black");
    }
    if(typeof(line.stroke_width) != "undefined"){
      svg_line.setAttribute("stroke-width", line.stroke_width);
    }
    else{
      svg_line.setAttribute("stroke-width", "0.2%");
    }
    return(svg_line);
  }
  createRect(rect){
    const svgns = "http://www.w3.org/2000/svg";
    var svg_rect = document.createElementNS(svgns, "rect");
    svg_rect.setAttribute("x", rect.x);
    svg_rect.setAttribute("y", rect.y);
    svg_rect.setAttribute("width", rect.width);
    svg_rect.setAttribute("height", rect.height);
    svg_rect.setAttribute("fill", rect.fill);
    svg_rect.setAttribute("stroke", rect.stroke);
    if(typeof(rect.stroke_width) != "undefined"){
      svg_rect.setAttribute("stroke-width", rect.stroke_width);
    }
    return(svg_rect);
  }
  rotatePaper( paper ){
    var r_paper = { 
      width  : paper.height,
      height : paper.width
    };
    return(r_paper);
  }
  
  /*
   * Generates the cuts for the paper
   *
   * Generates the cuts for the paper based on the job size
   * 
   * @param object paper_size with properties width and height
   * @param object job_size with properties width and height
   * @return object returns object with wastage, pieces, cuts against width and
   * cuts against height
   */
  generateCut( paper_size, job_size ){
    var _this = this;
    //cuts against width 
    var w_cuts = paper_size.width / job_size.width;
    
    //Round down the cuts as partial cuts are not possible
    var w_cuts_f = Math.floor(w_cuts);
    
    //if the cuts are very close for example a mm or so less than the next cut
    //increase it by one as the paper is always a little bigger. The amuont is
    //set as the threshold
    if( w_cuts - w_cuts_f > _this.threshold ){
      w_cuts = w_cuts_f + 1;
    }
    else{
      w_cuts = w_cuts_f;
    }
    
    //generate cuts against height
    var h_cuts = paper_size.height / job_size.height;
    
    //Round down the cuts as partial cuts are not possible
    var h_cuts_f = Math.floor(h_cuts);
    
    //if the cuts are very close for example a mm or so less than the next cut
    //increase it by one as the paper is always a little bigger. The amuont is
    //set as the threshold
    if( h_cuts - h_cuts_f > _this.threshold ){
      h_cuts = h_cuts_f + 1;
    }
    else{
      h_cuts = h_cuts_f;
    }
    
    //calculate the pieces created
    var pieces = w_cuts * h_cuts;
    
    if( window.module == "stationery" ){
      const book_format = window.calc.getInput(1,"inp_finish_size_format")
      if( book_format == 5 && 
          pieces == 3 && 
          paper_size.width > job_size.width + job_size.height &&
          paper_size.height > job_size.height * 2 ){
        pieces = 5
      }
      if( book_format == 10 && 
          pieces == 9 && 
          paper_size.width > job_size.width * 2 + job_size.height &&
          paper_size.height > job_size.height * 3 ){
        pieces = 10
        w_cuts = 2
      }
    }
    
    //get the area of the paper
    var paper_area = _this.parent_size.width * _this.parent_size.height;
    
    //calculate the area of all the cuts combined
    var job_area = job_size.height * job_size.width * pieces;
    
    //calculate the wastage
    var wastage = ( paper_area - job_area ) / paper_area;
    return({ wastage, pieces, w_cuts, h_cuts });
  }
  
  generateAllCuts(){
    var _this = this;
    if( typeof( _this.machine_size ) == "undefined" ){
      _this.machine_size = {
        width  : _this.parent_size.width,
        height : _this.parent_size.height
      };
    }
    _this.generateCuts();
  }
  
  generateCuts(){
    var _this = this;
    var cuts = {
      parent_size : {
        width  : _this.trimmed_parent_size.width,
        height : _this.trimmed_parent_size.height
      },
      machine_size : {
        width  : _this.machine_size.width,
        height : _this.machine_size.height
      },
      parent_cuts : [],
      cuts : []
    }
    _this.generateParentCuts();
    _this.generateMachineCuts(cuts);
  }
  
  /*
   * generates cuts according to parent paper size
   * 
   * generates cuts according to parent paper size
   */
  generateParentCuts(){
    var _this = this;
  }
}
