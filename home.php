<?php
require_once("login_required.php");
?>
<!DOCTYPE html>
<html>
<head>
	<title>Xpress Quote</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/home.css?v=1Zkm0U">
  <?php
    if($user->isAdmin()){
      ?>
      <link rel="stylesheet" href="css/home_admin.css?v=1Zkm0U">
      <?php
    }
  ?>
	<script src="js/libs/jquery-3.6.0.min.js" defer></script>
	<script src="js/home.js?v=1Zkm0U" defer></script>
</head>
<body>
	<div class="container">
    <?php
      if($user->isAdmin()){
      ?>
      <div class="row" id="admin">
      <?php
        if( $_SERVER["SERVER_NAME"] == "demo.expressquote.in" ){
        ?>
        <div class="pentagon">
          <picture>
            <source srcset="images/main.webp" 
              type="image/webp">
            <source srcset="images/main.png" 
              type="image/png"> 
            <img src="images/main.png">
          </picture>
          <a href="https://expressquote.in/home.php">MAIN</a>
        </div>
        <div class="pentagon">
          <picture>
            <source srcset="images/demo.webp" 
              type="image/webp">
            <source srcset="images/demo.png" 
              type="image/png"> 
            <img src="images/demo.png">
          </picture>
          <a href="https://demo.expressquote.in/home.php">DEMO</a>
        </div>
        <div class="pentagon">
          <picture>
            <source srcset="images/alpha.webp" 
              type="image/webp">
            <source srcset="images/alpha.png" 
              type="image/png"> 
            <img src="images/alpha.png">
          </picture>
          <a href="http://test.expressquote.in/alpha/single_sheet.php">ALPHA</a>
        </div>
        <div class="pentagon">
          <picture>
            <source srcset="images/beta.webp" 
              type="image/webp">
            <source srcset="images/beta.png" 
              type="image/png"> 
            <img src="images/beta.png">
          </picture>
          <a href="http://test.expressquote.in/beta/single_sheet.php">BETA</a>
        </div>
        <div class="pentagon">
          <picture>
            <source srcset="images/stable.webp" 
              type="image/webp">
            <source srcset="images/stable.png" 
              type="image/png"> 
            <img src="images/stable.png">
          </picture>
          <a href="http://test.expressquote.in/stable/single_sheet.php">STABLE</a>
        </div>
        <div class="pentagon">
          <picture>
            <source srcset="images/other.webp" 
              type="image/webp">
            <source srcset="images/other.png" 
              type="image/png"> 
            <img src="images/other.png">
          </picture>
          <a href="#">OTHER</a>
          <select id="folder">
            <option value="">SELECT</option>
          </select>
        </div>
        <?php
          }
        ?>
        <div class="pentagon">
          <picture>
            <source srcset="images/user.webp" 
              type="image/webp">
            <source srcset="images/user.png" 
              type="image/png"> 
            <img src="images/user.png">
          </picture>
          <a href="single_sheet.php">USER</a>
        </div>
        <div class="pentagon">
          <picture>
            <source srcset="images/admin.webp" 
              type="image/webp">
            <source srcset="images/admin.png" 
              type="image/png"> 
            <img src="images/admin.png">
          </picture>
          <a href="admin.php">ADMIN</a>
        </div>
        <?php
        if( $_SERVER["SERVER_NAME"] == "demo.expressquote.in"){
        ?>
        <div class="pentagon" id="update_link">
          <picture>
            <source srcset="images/update.webp" 
              type="image/webp">
            <source srcset="images/update.png" 
              type="image/png"> 
            <img src="images/update.png">
          </picture>
          <a href="#">UPDATE</a>
        </div>
        <?php
          }
        ?>
      </div><!-- end admin -->
    <?php
      }
    ?>
		<div class="row">
			<div class="pentagon first">
				<picture>
					<source srcset="images/singlesheet.webp" 
						type="image/webp">
					<source srcset="images/singlesheet.png" 
						type="image/png"> 
					<img src="images/singlesheet.png">
				</picture>
				<a href="single_sheet.php">SINGLE-SHEET</a>
			</div>
			<div class="pentagon">
				<picture>
					<source srcset="images/stationery.webp" 
						type="image/webp">
					<source srcset="images/stationery.png" 
						type="image/png"> 
					<img src="images/stationery.png">
				</picture>
				<a href="stationery.php">STATIONERY</a>
			</div>
			<div class="pentagon">
				<picture>
					<source srcset="images/multi_sheet.webp" 
						type="image/webp">
					<source srcset="images/multi_sheet.png" 
						type="image/png"> 
					<img src="images/multi_sheet.png">
				</picture>
				<a href="multi_sheet.php">MULTI-SHEET</a>
			</div>
			<div class="pentagon">
				<picture>
					<source srcset="images/calendar.webp" 
						type="image/webp">
					<source srcset="images/calendar.png" 
						type="image/png"> 
					<img src="images/calendar.png">
				</picture>
				<a href="calendar.php">CALENDAR</a>
			</div>
		</div> <!-- end row-->
		<div class="row">
			<div class="pentagon first">
				<picture>
					<source srcset="images/book.webp" 
						type="image/webp">
					<source srcset="images/book.png" 
						type="image/png"> 
					<img src="images/book.png">
				</picture>
				<a href="book.php">BOOK<br/>MAGAZINE</a>
			</div>
			<div class="pentagon">
				<picture>
					<source srcset="images/box.webp" 
						type="image/webp">
					<source srcset="images/box.png" 
						type="image/png"> 
					<img src="images/box.png">
				</picture>
				<a href="box.php">BOX<br/>PACKAGING</a>
			</div>
			<div class="pentagon">
				<picture>
					<source srcset="images/binding.webp" 
						type="image/webp">
					<source srcset="images/binding.png" 
						type="image/png"> 
					<img src="images/binding.png">
				</picture>
				<a href="binding.php">BINDING<br/>BOOK</a>
			</div>
      <div class="pentagon">
        <picture>
          <source srcset="images/dashboard.webp" 
            type="image/webp">
          <source srcset="images/dashboard.png" 
            type="image/png"> 
          <img src="images/dashboard.png">
        </picture>
        <a href="dashboard.php">DASHBOARD</a>
      </div>
		</div> <!-- end row-->
	</div><!-- end container -->
  <?php
    if($user->isAdmin() &&
        ( $_SERVER["SERVER_NAME"] == "localhost" ||
          $_SERVER["SERVER_NAME"] == "demo.expressquote.in")){
  ?>
  <div id="updateModal" class="modal hide">
    <div class="modal-content" draggable="true">
      <div class="modal-header">
        <div class="header">
          <span class="header-text">Update Software</span>
          <span class="close">&times;</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="div-2">
            Git Branch
          </div>
          <div class="div-2">
            <?php
              require("inc/git_branches.php");
            ?>
          </div>
        </div>
        <div class="row">
          <div class="div-2">
            Folder
          </div>
          <div class="div-2">
            <?php
              require("inc/folders.php");
            ?>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="runUpdate">update</button>
      </div>
  </div>
  <?php
    }
  ?>
</body>
