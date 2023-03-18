/*
 * File for class templaates
 *
 * @ver 1.0
 * @author Anil Desai
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
