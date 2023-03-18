<div class="paper_table" id="paper_table">
  <div>
  </div>
  <div class="table data-table"
      data-action="get_paper_with_stock"
      data-edit="edit_paper_new"
      data-edit-type="row"
      data-edit-id="add_paper_new"
      data-store="paper_data"
      data-callback="generatePaperBrandTypeSelection">
    <div class="table-header">
      <div>
        #
      </div>
      <div>
        Paper Name
      </div>
      <div>
        Width
      </div>
      <div>
        Height
      </div>
      <div>
        GSM
      </div>
      <div class="st_price">
        Paper Price<br/>Per Sheet For<br/>Stationery
      </div>
      <div class="hide">
        Godown
      </div>
      <div>
        Stock
      </div>
      <div class="hide">
        Total Stock
      </div>
    </div>
    <div class="table-row" id="paper_details">
      <div>
        <input class="data_id hide"></input>
      </div>
      <div>
        <select class="type change" 
          id="paperType" 
          changefunc="paperFilter">
          <option value="">PAPER TYPE</option>
          <option value="new">NEW</option>
        </select>
        <input class="new_type change hide" 
          changefunc="addNewType">
        </input>
        <select class="brand change" 
          id="paperBrand" 
          changefunc="paperFilter">
          <option value="" selected>PAPER BRAND</option>
          <option value="new">NEW</option>
        </select>
        <input class="new_brand change hide" 
          changefunc="addNewBrand">
        </input>
      </div>
      <div>
        <input class="width change" 
          changefunc="paperFilter">
      </div>
      <div>
        <input class="height change" 
          changefunc="paperFilter">
      </div>
      <div>
        <input class="gsm change" 
          changefunc="paperFilter">
      </div>
      <div>
        <input class="st_price change"
          changefunc="applyStationeryPrice">
      </div>
      <div>
      </div>
    </div>
  </div>
  <div class="sample-row hide">
    <div class="table-row data-row click dblclick"
      clickfunc="selectPaper"
      item="paper">
      <div class="count data_id"></div>
      <div class="name editable"></div>
      <div class="type editable hide"></div>
      <div class="width editable"></div>
      <div class="height editable"></div>
      <div class="gsm editable"></div>
      <div class="brand editable hide"></div>
      <div class="st_price editable"></div>
      <div class="warehouse_name hide"></div>
      <div class="stock"></div>
      <div class="total_stock hide"></div>
    </div>
  </div>
</div>
<div id="paperAddModal" class="modal hide">
  <div class="modal-content">
    <div class="modal-header">
      <div class="header">
        <span class="">Add New Paper</span>
        <span class="close">&times;</span>
      </div>
    </div>
    <div class="modal-body">
      <div class="table">
        <div class="table-header">
          <div>
            Paper Name
          </div>
          <div>
            Type
          </div>
          <div>
            Width
          </div>
          <div>
            Height
          </div>
          <div>
            GSM
          </div>
          <div>
            Brand
          </div>
          <div class="sheet_cost hide">
            Paper Price<br/>Per Sheet
          </div>
          <div>
            Paper Category
          </div>
          <div>
            <select class="category change" 
              func="changePaperCategory">
              <option value="general" selected>General</option>
              <option value="stationery">Stationery</option>
            </select>
          </div>
        </div>
        <div class="table-row" id="add_paper_details">
          <div>
            <input class="paper_name name" disabled>
          </div>
          <div>
            <input class="type keyup" 
              func="paperName">
            </input>
          </div>
          <div>
            <input class="width keyup" func="paperName">
          </div>
          <div>
            <input class="height keyup" func="paperName">
          </div>
          <div>
            <input class="gsm keyup" func="paperName">
          </div>
          <div>
            <input class="brand keyup" 
              func="paperName" value="REGULAR">
            </input>
          </div>
          <div class="sheet_cost hide">
            <input></input>
          </div>
          <div>
            <button id="add_new_paper" func="addNewPaper" class="button add">
              Add New Paper
            </button>
            <button id="add_new_paper" class="clear" data-target="paper_details">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
