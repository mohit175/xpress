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
