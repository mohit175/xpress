$(".pentagon").click(function(e){
	var href= $(this).find("a").attr("href");
	window.location.href = href;
});

$("#user_login").click(function(e){
  $("#admin").addClass("hide");
});

$("#admin_login").click(function(e){
  window.location.href='admin.php';
});
$("#update_link").click(function(e){
  $("#updateModal").removeClass("hide");
});
$("#updateModal .close").click(function(e){
  $("#updateModal").addClass("hide");
});
$("#runUpdate").click(function(e){
  var branch = $("#branch").val();
  var folder = $("#sel_folder").val();
  $.post("ajax_api.php", 
    { action : "update_software",
      folder : folder,
      branch : branch},function(e){
    alert("software updated");
  });
});
