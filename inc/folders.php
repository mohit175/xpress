<select id="sel_folder">
  <option value="">Select</option>
  <option value="/var/www/demo/">/var/www/demo/</option>
  <option value="/var/www/xpress/">/var/www/xpress/</option>
<?php
  $folders = Array();
  exec("/usr/local/bin/xpress_updater list_folders", $folders);
  foreach($folders as $folder){
    $folder_parts = explode(" ",$folder);
    $folder = "/var/www/test/" . end($folder_parts) ."/";
    echo('<option value="'.$folder.'">'.$folder.'</option>');
  }
?>
</select>
