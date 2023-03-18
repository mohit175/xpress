<div class="add_paper" id="add_paper_brand">
  <label>Paper Brand</label>
  <input id="paper_brand" class="paper_brand"/>
  <input class="data_id hide"/>
  <button id="paper_brand_add" func="addPaperBrand" class="button add">Add</button>
  <button class="save hide">Save</button>
  <button class="cancel hide">Cancel</button>
</div>
<div id="paper_brand_table">
  <div class="table data-table" 
       data-action="get_paper_brand"
       data-edit="edit_paper_brand"
       data-delete="delete_paper_brand"
       data-edit-type="row"
       data-edit-id="add_paper_brand">
  </div>
  <div class="sample-row hide">
    <div class="table-row">
      <div class="count"> </div>
      <div class="paper_brand editable human_name" name="paper_brand"></div>
      <div class="data_id edit">Edit</div>
      <div class="data_id delete" func="deletePaperType">Delete</div>
    </div>
  </div>
</div>
