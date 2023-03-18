<!DOCTYPE html>
<html>
<head>
    <title>Xpress Quote</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/login.css?v=1Zkm0U">
    <link rel="stylesheet" href="fontawesome/css/all.css">
    <script src="js/libs/jquery-3.6.0.min.js" defer></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="js/login.js?v=1Zkm0U" defer></script>
</head>
<body>
  <nav class="top-nav">
    <ul>
      <li class="tab" data-target="home">
          Home
      </li>
      <li>
        Video Tutorials
      </li>
      <li class="tab" data-target="pricing">
        Pricing
      </li>
      <li class="tab" data-target="contact_us">
        Contact Us
      </li>
      <li class="tab" data-target="privacy">
        Privacy Policy
      </li>
      <li class="tab" data-target="terms">
        Terms And Conditions
      </li>
    </ul>
  </nav>
  <section id="middle">
    <section id="left">
      <?php
        require("inc/templates/register_form.php");
      ?>
    </section><!-- end left -->
    <main>
      <section class="tab-body" id="home">
        <?php
          require("inc/templates/about_us.php");
        ?>
      </section>
      <section class="tab-body hide" id="privacy">
        <?php
          require("inc/templates/privacy.php");
        ?>
      </section>
      <section class="tab-body hide" id="pricing">
        <?php
          require("inc/templates/pricing.php");
        ?>
      </section>
      <section class="tab-body hide" id="terms">
        <?php
          require("inc/templates/terms.php");
        ?>
      </section>
      <section class="tab-body hide" id="contact_us">
        <?php
          require("inc/templates/contact.php");
        ?>
      </section>
    </main>
  </section><!-- end middle -->
  <section class="bottom-badge">
    <div class="badge">
      <img src="images/badge/single-sheet.jpeg"></img>
    </div><!-- end badge -->
    <div class="badge">
      <img src="images/badge/stationery.jpeg"></img>
    </div><!-- end badge -->
    <div class="badge">
      <img src="images/badge/multi-sheet.jpeg"></img>
    </div><!-- end badge -->
    <div class="badge">
      <img src="images/badge/calendar.jpeg"></img>
    </div><!-- end badge -->
    <div class="badge">
      <img src="images/badge/book.jpeg"></img>
    </div><!-- end badge -->
    <div class="badge">
      <img src="images/badge/box.jpeg"></img>
    </div><!-- end badge -->
    <div class="badge">
      <img src="images/badge/binding.jpeg"></img>
    </div><!-- end badge -->
  </section><!-- end bottom-badge -->
  <footer>
    <div class="copy">
      Copyright 2020 - 2023 All Rights Reserved &copy;xPressTech 
    </div>
    <div class="phone">
      <i class="fa-solid fa-phone"></i> +91 8604 8604 12
    </div>
    <div class="phone">
      <i class="fa-solid fa-at"></i> xpressquote.in@gmail.com
    </div>
  </footer>
</body>
</html>
