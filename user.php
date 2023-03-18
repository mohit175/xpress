<?php
require_once("login_required.php");
?>
<!DOCTYPE html>
<html>
  <head>
    <!-- Required -->
    <meta charset = "utf-8" >
    <meta name = "viewport" content = "width=device-width, initial-scale=1.0" >
    
    <title>xPressTech</title>
    
    <!-- Style Sheets will go here -->
    <link rel = "stylesheet" href = "css/style.css" />
    
    <!-- Fonts -->
    <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
    <!-- Scripts go right after the fonts -->
    <!-- All scripts will have a defer tag -->
    
    <!-- jQuery -->
    <script src = "jsLibs/jquery.min.js" defer ></script>
    
    <!-- Custom Scripts -->
    <script src = "js/paper.js" defer ></script>
    <script src = "js/xpress.js" defer ></script>
    <script src = "js/script.js" defer ></script>
  </head>
  <body>
    <header>
      <div class="logo-container">
        <img class="logo" src="images/logo.png">
      </div>
    </header>
    <section class="main-container">
      <section class="left-container">
        <nav>
          <ul>
            <li>
              Dashboard
            </li>
            <li>
              Estimator
            </li>
            <li class="submenu" item="paper">
              Paper Library
              <ul class="hide">
                <li template="paper_main" item="paper">
                  Paper Library
                </li>
                <li>
                  Paper Ledger
                </li>
                <li template="warehouse" item="paper">
                  Godowm
                </li>
                <li template="paper_supplier" item="paper">
                  Paper Supplier Library
                </li>
              </ul>
            </li>
        </nav>
      </section>
      <section class="right-container">
        <main>
          <b>content</b>
          (fills remaining space)
        </main>
      </section>
    </section>
    <footer>
    </footer>
  </body>
</html>
