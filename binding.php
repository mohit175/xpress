<?php
$module = 'BINDING';
require_once("login_required.php");
if(!isset($module)){
	die();
}
require_once("config.php");
require_once("top.php");
?>
		<div class="top row">
			<button class="top button" id="change_module"><?=$module;?></button><!--
			--><button class="top button" id="main_library">LIBRARIES</button><!--
			--><button class="top button" id="preferences">PREFERENCES</button><!--
			--><button class="top button" id="home_button">&nbsp;</button><!--
			--><button class="top button" id="quote_library_button">TEMPLATES</button><!--
			--><button class="top button" id="save_pdf">SAVE AS PDF</button><!--
			--><button class="top button" id="log_out">LOG OUT</button>
		</div>
    <?php
    require_once("binding_top_settings.php");
    ?>
    <div id="main-content">
      <div class="blank_content_binding">
        Book-Binding Cost Calculation Page
      </div>
    </div>
		<div class="row dashboard modal-footer">
			<button class="modal-btn" id="manage_quotation">
        MANAGE ESTIMATES
      </button>
		</div>
<?php
require_once("bottom.php");
