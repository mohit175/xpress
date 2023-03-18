<div class="add_warehouse" id="add_warehouse">
  <label>Warehouse</label>
  <input id="warehouse" class="warehouse"/>
  <input class="data_id hide"/>
  <button func="addWarehouse" class="button add">Add</button>
  <button class="save hide">Save</button>
  <button class="cancel hide">Cancel</button>
</div>
<div id="warehouse_table">
  <div class="table data-table" 
       data-action="get_warehouse"
       data-edit="edit_warehouse"
       data-delete="delete_warehouse"
       data-edit-type="row"
       data-edit-id="add_warehouse">
  </div>
  <div class="sample-row hide">
    <div class="table-row data-row">
      <div class="count"> </div>
      <div class="name editable human_name" name="name"></div>
      <div class="data_id edit">Edit</div>
      <div class="data_id delete" func="deletePaperType">Delete</div>
    </div>
  </div>
</div>
