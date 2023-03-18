<div class="">
  <button class="showForm btn" data-target="add_paper_type">Add Paper Type</button>
</div>
<div class="add_paper hide" id="add_paper_type">
  <label>Paper Type</label>
  <input id="paper_type" class="paper_type"/>
  <input class="data_id hide"/>
  <button id="paper_type_add" func="addPaperType" class="button add">
    Add New Paper Type
  </button>
  <button class="save hide">Save</button>
  <button class="cancel hide">Cancel</button>
</div>
<div id="add_paper_type_progress" class="progress hide">
  Processing... Please Wait
</div>
<div id="add_paper_type_result" class="alert success hide">
  Paper Type Added
</div>
<div id="paper_type_table">
  <div class="table data-table" 
       data-action="get_paper_type"
       data-edit="edit_paper_type"
       data-delete="delete_paper_type"
       data-edit-type="row"
       data-edit-id="add_paper_type">
    <div class="table-row">
      <div class="count">#</div>
      <div class="paper_type" name="paper_type">Paper Type</div>
    </div>
  </div>
  <div class="sample-row hide">
    <div class="table-row data-row">
      <div class="count"> </div>
      <div class="paper_type editable human_name" name="paper_type"></div>
      <div class="data_id edit">Edit</div>
      <div class="data_id delete" func="deletePaperType">Delete</div>
    </div>
  </div>
</div>
