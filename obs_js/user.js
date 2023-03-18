/**
 * File for the user javascript functions
 * 
 * File containing the javascript functions for users
 *
 * @package xpress
 * @author Anil Desai
 * @copyright ExpressTech www.expressquote.in
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
