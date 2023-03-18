<select id="branch">
  <option value="">Select</option>
<?php
  $branches = Array();
  exec("/usr/local/bin/xpress_updater list_branches", $branches);
  foreach($branches as $branch){
    $branch_parts = explode("/", $branch);
    $branch = end($branch_parts);
    echo('<option value="'.$branch.'">'.$branch.'</option>');
  }
?>
</select>
