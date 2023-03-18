$(document).ready(function(e){
  loadUsers();
  loadMessages();
});
$("#save_config").click(function(e){
  var demo_days    = $(".demo .days").val();
  var basic_12     = $(".basic .12month").val();
  var estimator_3  = $(".estimator .3month").val();
  var estimator_6  = $(".estimator .6month").val();
  var estimator_12 = $(".estimator .12month").val();
  var erp_3        = $(".erp .3month").val();
  var erp_6        = $(".erp .6month").val();
  var erp_12       = $(".erp .12month").val();
  var params = {
    action         : 'update_site_config',
    demo_days      : demo_days      ,
    basic_12       : basic_12       ,
    estimator_3    : estimator_3    ,
    estimator_6    : estimator_6    ,
    estimator_12   : estimator_12   ,
    erp_3          : erp_3          ,
    erp_6          : erp_6          ,
    erp_12         : erp_12         
  };
  $.post("ajax_api.php", params, 
    function(data){
      alert("Config saved");
  });
});
$(".tab").click(function(e){
  var target = $(this).attr("data-target");
  $(".tab-body").addClass("hide");
  $("#"+target).removeClass("hide");
});
function loadMessages(){
  $.post("ajax_api.php",{action: "get_messages"},
    function(data){
      var html = '';
      if(typeof(data.resp) == "boolean"){
        html = '<h1>No Messages</h1>';
        $("#messages").html(html);
        return;
      }
      data.resp.forEach(function(d,i){
        html += '<div class="row">'
          + '<div class="name">' + d.name + '</div>'
          + '<div class="email">' + d.email + '</div>'
          + '<div class="phone">' + d.phone + '</div>'
          + '<div class="message">' + d.message + '</div>'
          + '<div class="delete_msg" data-id="' + d.id + '"> '
            +'<i class="fa-solid fa-trash"></i>'
          +'</div>'
          + '</div>';
      });
      $("#messages").html(html);
      $(".delete_msg").click(function(e){
        var id = $(this).attr("data-id");
        var name = $($(this).parent().children(".name")[0]).html();
        var row = $(this).parent();
        if(confirm("Do you want to delete message from "+ name +"?")){
          $.post("ajax_api.php", {action: "delete_msg",id:id},
            function(data){
              $(row).remove();
            });
        }
      });
    });
}

function loadUsers(){
  $.post("ajax_api.php", {action: "get_users"},
    function(data){
      var html = '';
      data.forEach(function(d,i){
        var cust_num = i + 1;
        if(d.status == 0){
          var lock = 'fa-lock';
        }
        else{
          var lock = 'fa-unlock';
        }
        if(d.account_status == 'confirmed'){
          var user_status = "fa-circle-check";
        }
        else{
          var user_status = "fa-circle-xmark";
        }
        html += '<div class="row">'
          + '<div class="cust_num">' + d.id + '</div>'
          + '<div class="firstname" user_id="'+ d.id +
            '"' + 'contact="' + d.contact + '">' + d.name + '</div>'
          + '<div class="lastname">' + d.lastname + '</div>'
          + '<div class="email">' + d.email + '</div>'
          + '<div class="contact">' + d.contact + '</div>'
          + '<div class="actions" user_id="'+ d.id +'" contact="'+d.contact+'">'
          + '<i class="fa-solid fa-pen edit"></i>'
          + '<i class="fa-solid ' + lock + '"></i>'
          + '<i class="fa-solid ' + user_status + '"></i>'
          + '<i class="fa-solid fa-trash delete"></i>'
          + '<i class="fa-solid fa-key password"></i>'
          + '</div></div>';
      });
      $("#users").html(html);
      $(".fa-lock").click(function(e){
        var user_id = $(this).parent().attr("user_id");
        $.post("ajax_api.php", {action: 'unlock_user', user_id: user_id},
          function(data){
            loadUsers();
          },"json");
      });
      $(".fa-unlock").click(function(e){
        var user_id = $(this).parent().attr("user_id");
        $.post("ajax_api.php", {action: 'lock_user', user_id: user_id},
          function(data){
            loadUsers();
          },"json");
      });
      $(".delete").click(function(e){
        var user_id = $(this).parent().attr("user_id");
        var contact = $(this).parent().attr("contact");
        var confirm_text ="Do you really want to delete\n"
          +"User with contact " + contact;
        if(confirm(confirm_text)){
          $.post("ajax_api.php",{action: "delete_user", user_id:user_id},
          function(data){
            loadUsers();
          },"json");
        }
      });
      $(".firstname").click(function(e){
        var user_id = $(this).attr("user_id");
        var contact = $(this).attr("contact");
        $.post("ajax_api.php", {action: 'emulate_user', emulated_contact: contact,
            emulated_user_id: user_id},
          function(data){
            window.location.href = "home.php";
          },"json");
      });
      $(".fa-circle-xmark").click(function(e){
        var user_id = $(this).parent().attr("user_id");
        $.post("ajax_api.php", {action: 'confirm_user', user_id: user_id},
          function(data){
            loadUsers();
          },"json");
      });
      $(".fa-circle-check").click(function(e){
        var user_id = $(this).parent().attr("user_id");
        $.post("ajax_api.php", {action: 'unconfirm_user', user_id: user_id},
          function(data){
            loadUsers();
          },"json");
      });
      $(".password").click(function(e){
        var user_id = $(this).parent().attr("user_id");
        var contact = $(this).parent().attr("contact");
        $("#password_contact").html(contact);
        $("#password_user_id").val(user_id);
        $("#changePass").removeClass("hide");
      });
      $(".edit").click(function(e){
        var user_id = $(this).parent().attr("user_id");
        var post_data = {action:"get_user_detail", user_id:user_id};
        $.post("ajax_api.php",post_data,function(data){
          $("#name").val(data.name);
          $("#last_name").val(data.lastname);
          $("#company_name").val(data.company_name);
          $("#address-1").val(data.address1);
          $("#address-2").val(data.address2);
          $("#city").val(data.city);
          $("#email").val(data.email);
          $("#contact").val(data.contact);
          $("#editUser").removeClass("hide");
          $("#edit_user_id").val(data.id);
          $("#plan").val(data.plan);
          $("#demo_expiry").val(data.demo_expire);
          $("#plan_expiry").val(data.plan_expire);
          $("#plan_lifetime").prop("checked",data.lifetime_plan);
          $("#company_gstin").val(data.company_gstin);
          $("#company_pan").val(data.company_pan);
          $("#jurisdiction").val(data.jurisdiction);
          $("#bank_beneficiary_name").val(data.bank_beneficiary_name);
          $("#bank_name").val(data.bank_name);
          $("#bank_branch_name").val(data.bank_branch_name);
          $("#bank_ac_type").val(data.bank_ac_type);
          $("#bank_ac_num").val(data.bank_ac_num);
          $("#bank_ifsc").val(data.bank_ifsc);
        });
      });
  },"json");    
}

$("#update_user").click(function(e){
  var name = $("#name").val();
  var lastname = $("#last_name").val();
  var company_name = $("#company_name").val();
  var address1 = $("#address-1").val();
  var address2 = $("#address-2").val();
  var city = $("#city").val();
  var email = $("#email").val();
  var contact = $("#contact").val();
  var user_id = $("#edit_user_id").val();
  var plan = $("#plan").val();
  var demo_expiry = $("#demo_expiry").val();
  var plan_expiry = $("#plan_expiry").val();
  var lifetime_plan = $("#plan_lifetime").prop("checked");
  var company_gstin         = $("#company_gstin").val();
  var company_pan           = $("#company_pan").val();
  var jurisdiction          = $("#jurisdiction").val();
  var bank_beneficiary_name = $("#bank_beneficiary_name").val();
  var bank_name             = $("#bank_name").val();
  var bank_branch_name      = $("#bank_branch_name").val();
  var bank_ac_type          = $("#bank_ac_type").val();
  var bank_ac_num           = $("#bank_ac_num").val();
  var bank_ifsc             = $("#bank_ifsc").val();
  var post_data = { action: 'update_user',
                    name: name,
    company_gstin        : company_gstin        ,
    company_pan          : company_pan          ,
    jurisdiction         : jurisdiction         ,
    bank_beneficiary_name: bank_beneficiary_name,
    bank_name            : bank_name            ,
    bank_branch_name     : bank_branch_name     ,
    bank_ac_type         : bank_ac_type         ,
    bank_ac_num          : bank_ac_num          ,
    bank_ifsc            : bank_ifsc            ,
                    lastname: lastname,
                    company_name: company_name,
                    address1: address1,
                    address2: address2,
                    city: city,
                    email: email,
                    contact: contact,
                    plan: plan,
                    plan_expiry: plan_expiry,
                    lifetime_plan: lifetime_plan,
                    demo_expiry : demo_expiry,
                    user_id: user_id};
  $.post("ajax_api.php", post_data, function(e){
    $("#name").val("");
    $("#last_name").val("");
    $("#company_name").val("");
    $("#address-1").val("");
    $("#address-2").val("");
    $("#city").val("");
    $("#email").val("");
    $("#contact").val("");
    $("#editUser").addClass("hide");
    $("#edit_user_id").val("");
    $("#plan").val('');
    $("#demo_expiry").val('');
    loadUsers();
  });
});

$("#editUser .close").click(function(e){
  $("#editUser").addClass("hide");
});

$("#change_pass_submit").click(function(e){
  var user_id = $("#password_user_id").val();
  var password = $("#new_password").val();
  var confirm_password = $("#confirm_password").val();
  if(password != confirm_password){
    alert("passwords do not match");
    return(false);
  } 
  var post_data ={action: "change_pass_admin",
    user_id: user_id,
    password: password}
  $.post("ajax_api.php", post_data, function(data){
    $("#password_user_id").val('');
    $("#new_password").val('');
    $("#confirm_password").val('');
    $("#changePass").addClass("hide");
    alert('password changed');
  },"json");
});
$("#changePass .close").click(function(e){
  $("#changePass").addClass("hide");
});
$("#user_home").click(function(e){
  window.location.href = "home.php";
});
$("#logout-button").click(function(e){
	var post_data = {action : 'logout'};
	$.post('ajax_api.php', post_data,
		function(data){
			window.location.href = "index.php";
		});
});
