<?php
define("CYBER_CLOUD",true);
require_once('phpLibs/mysqli_db.class.php');
require_once('config.php');
$db = new MYSQLI_DB("config.ini");
$sql = "SELECT * FROM `invoice_pdf` WHERE 1";
$rows = $db->fetchAllAssoc($sql);
$insert_sql = "INSERT INTO `estimate_invoice`(`invoice_id`,`estimate_id`) 
  VALUES(?,?)";
foreach($rows as $row){
  $id = $row['id'];
  $data = json_decode($row['data']);
  $estimates = $data->estimates;
  foreach($estimates as $estimate){
    $est_no = $estimate->est_no;
    $db->insert($insert_sql,'ii',Array($id,$est_no));
  }
}
$sql = "SELECT * FROM `delivery_pdf` WHERE 1";
$rows = $db->fetchAllAssoc($sql);
$insert_sql = "INSERT INTO `estimate_delivery`(`delivery_id`,`estimate_id`) 
  VALUES(?,?)";
foreach($rows as $row){
  $id = $row['id'];
  $data = json_decode($row['data']);
  $estimates = $data->estimates;
  foreach($estimates as $estimate){
    $est_no = $estimate->est_no;
    $db->insert($insert_sql,'ii',Array($id,$est_no));
  }
}
