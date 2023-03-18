		<div class="settings_top_row">
			<div class="settings_top">
				<div class="row">
						<div class="quote_no">
							Estimate No:
						</div>
						<div class="quote_no_input">
							<input type="text" disabled id="quote_no" value=""/>
						</div>
						<div class="date">
							Date:
						</div>
						<div class="date_input">
							<input type="text" disabled id="quote_date" />
						</div>
				</div>
				<div class="row">
					<div class="div-4">
						Customer
					</div>
					<div class="div-4-3">
						<input id="customer" class="customer_sel"/>
					</div>
				</div>
				<div class="row">
					<div class="div-4">
						Job Ref
					</div>
					<div class="div-4-3">
						<input type="text" id="job_ref"/>
					</div>
				</div>
				<div class="row">
					<div class="div-4">
						Quantity
            <div class="quantity_a">
              A
            </div>
					</div>
					<div class="div-4-3">
            <input type ="text" id="quantity_a" class="quantity"/>
            <div class="quantity_b">
              B
            </div>
            <input type ="text" id="quantity_b" class="quantity"/>
            <div class="overprint_qty hide">
              Overprint Qty
            </div>
            <input type ="text" id="overprint_qty" class="quantity hide"/>
            <div class="quantity_c">
              C
            </div>
            <input type ="text" id="quantity_c" class="quantity"/>
          </div>
				</div>
			</div><!--
			--><div class="settings_top">
				<div class="row row-1 pdf_desc_div">
					<div class="div-4 row-1 pdf_desc">
						Job <br/>Description <br/>For PDF
					</div>
					<div id="pdf_desc_div" class="div-4-3 row-1">
						<textarea id="pdf_desc" rows="6"></textarea>
					</div>
				</div>
      </div>
          <?php
            $module = basename($_SERVER['PHP_SELF'], '.php');
            if($module == "book"){
          ?>
        <div class="settings_top book">
          <?php
            }
            else{
          ?>
        <div class="settings_top">
          <?php
            }
          ?>
        <div class="job_size">
            <div class=" job_size_inputs">
              <input class="selected_job_size_option"></input>
              <input class="selected_job_size_wstg"></input>
            </div>
          <div class="row">
            <div class="job_size_label">
              Finish Size (Closed)
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="closed_job_size_w" value="00.00">
              <input class="closed_job_size_h" value="00.00">
            </div>
          </div>
          <div class="row">
            <div class="job_size_label">
              Finish Size (Open)
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="open_job_size_w" value="00.00">
              <input class="open_job_size_h" value="00.00">
            </div>
          </div>
          <div class="row">
            <div class="job_size_label">
              Press Size 
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="machine_size_w" value="00.00">
              <input class="machine_size_h" value="00.00">
            </div>
          </div>
          <?php
            if($module == "book"){
          ?>
          <div class="row hide">
            <div class="job_size_label">
              Parent Size (Title)
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="title_parent_size_w" value="00.00">
              <input class="title_parent_size_h" value="00.00">
            </div>
          </div>
          <div class="row">
            <div class="job_size_label">
              Title Press Size 
            </div>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="title_machine_size_w" value="00.00">
              <input class="title_machine_size_h" value="00.00">
            </div>
          </div>
          <?php
            }
          ?>
          <div class="row hide">
          <?php
            if($module == "book"){
          ?>
            <div class="job_size_label">
              Parent Size (Inner pgs.)
            </div>
          <?php
            }
            else{
          ?>
            <div class="job_size_label">
              Parent Size
            </div>
          <?php
            }
          ?>
            <div class=" job_size_inputs">
              <div class="middle-x">
                x
              </div>
              <input class="parent_paper_size_w" value="00.00">
              <input class="parent_paper_size_h" value="00.00">
            </div>
          </div>
        </div>
        <div class="job_size job_size_book">
          <div class="row">
            <div class="cuts_preview" id="cuts_preview">
              <!--<div class="job_size_cuts">
              </div>-->
              <div class="click_to_expand">
                Click To View Diagram
              </div>
            </div>
          </div>
        </div>
			</div>
		</div>
