<?php
$module = 'MULTI-SHEET';
require_once("login_required.php");
require_once("user_top.php");
?>
<div class="row middle-row">
	<div class="multi_sheet middle_container">
		<div class="inputs">
			<table class="input_table" id="multi_sheet_input">
				<thead>
					<tr>
						<th class="option">
              Media &<br/>
              Print <br/>
							Options<br/>
						</th>
						<th class="paper">
							Paper Type, Size (Parent) & GSM
						</th>
						<th colspan ="2" class="paper_size">
							Paper Sheet Size<br/>
							<span class="pull-left">Width</span>
							<span class="pull-right">Height</span>
						</th>
						<th class="paper_gsm">
							Paper/ Card GSM
						</th>
						<th class="paper_cost">
							Paper/ Card Cost Per
						</th>
						<th class="wastage">
              Expected Wastage
						</th>
						<th class="finish_size_format">
              Finish Size <br/>(Cut Fold)<br/>Format
						</th>
						<th class="total_pgs">
							Total Pages (Both Sides)
						</th>
						<th class="dtp">
							Design DTP Cost Per
						</th>
						<th class="pages_in_plate_sig">
							Pages <br/> In Plate <br/>Signa- </br/>ture
						</th>
						<th class="ups_in_plate">
							UP-s In <br/> Plate<br/>Signa-<br/>ture
						</th>
						<th class="num_colors">
							Number of Colors 
						</th>
						<th class="plate_cost">
							Plate Cost Per Plate
						</th>
						<th class="min_print_rate">
							Minimum Print Rate Per Color Per 1000
						</th>
						<th class="balance_qty">
							Balance Qty Print Rate Per Color Per 1000
						</th>
						<th class="process">
              Post<br/>
              Printing<br/>
							Process<br/>
							Cost
						</th>
						<th class="staple-multi">
              Staple<br/>
              Binding<br/>
							Cost Per<br/>
							Book/Set
						</th>
						<th class="hidden_expense">
							Hidden <br/>
							Exp.
						</th>
						<th class="profit" colspan="2">
							Profit
						</th>
					</tr>
				</thead>
				<tbody id="inputs_rows">
					<tr>
						<td class="option">
              <span class="row-number">1</span>
              <i class="fa-solid fa-caret-down add-row-arrow"></i>
						</td>
						<td class="paper">
              <input class="selectPaper" placeholder="Select" readonly="readonly"></input>
						</td>
						<td colspan ="2" class="paper_size">
							<input class="width" readonly="readonly"></input>
							<input class="height" readonly="readonly"></input>
						</td>
						<td class="paper_gsm">
							<input readonly="readonly"></input>
						</td>
						<td class="paper_cost">
							<select class="paper_cost_sel">
								<option value="">Select</option>
								<option value="kg">Kg</option>
								<option value="Sheet">Sheet</opton>
							</select>
							<input></input>
						</td>
						<td class="wastage">
              <select>
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Sheet">Sheets</option>
                <option value="Percent">In %</option>
              </select>
							<input></input>
						</td>
						<td class="min_print hide">
              <select class="min_print_charges">
                <option value="1000">1000 Impressions</option>
                <option value="2000">2000 Impressions</option>
                <option value="3000">3000 Impressions</option>
              </select>
						</td>
						<td class="finish_size_format">
							<input></input>
						</td>
						<td class="total_pgs">
							<input></input>
						</td>
						<td class="dtp">
							<select class="dtp_select">
								<option value="">Select</option>
								<option value="None">None</option>
								<option value="Page">/Page</option>
								<option value="Lot">/Lot</option>
							</select>
							<input></input>
						</td>
						<td class="pages_in_plate_sig">
							<input></input>
						</td>
						<td class="ups_in_plate">
							<input></input>
						</td>
						<td class="num_colors">
							<select>
								<option value="">Select</option>
								<option value="0">None</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
								<option value="4">Four</option>
								<option value="5">Five</option>
								<option value="6">Six</option>
								<option value="7">Seven</option>
								<option value="8">Eight</option>
						</td>
						<td class="plate_cost">
							<input></input>
						</td>
						<td class="min_print_rate">
							<input></input>
						</td>
						<td class="balance_qty">
							<input></input>
						</td>
						<td class="process">
              <input readonly value="+" class="process_cost"></input>
						</td>
            <td class="staple-multi">
              <select class="staple_select">
                <option value="">Select</option>
                <option value="staple-cost-side">Side</option>
                <option value="staple-cost-saddle">Saddle</option>
                <option value="staple-cost-loop">Loop</option>
              </select>
              <input class="inp_staple"></input>
            </td>
						<td class="hidden_expense">
              <select>
                <option value="percent" selected="selected">In %</option>
                <option value="amount">In Amt</option>
              </select>
							<input></input>
						</td>
						<td class="profit" colspan="2">
							<select class="profit_type">
								<option value="">Select</option>
								<option value="percernt">In %</option>
								<option value="amt">In Amt</option>
							</select>
							<input class="profit_inp"></input>
						</td>
				</tbody>
				<tbody class="hide" id="sample_row">
					<tr>
						<td class="option">
              <span class="row-number">1</span>
              <i class="fa-solid fa-caret-down add-row-arrow"></i>
						</td>
						<td class="paper">
              <input class="selectPaper" placeholder="Select" readonly="readonly"></input>
						</td>
						<td colspan ="2" class="paper_size">
							<input class="width" readonly="readonly"></input>
							<input class="height" readonly="readonly"></input>
						</td>
						<td class="paper_gsm">
							<input readonly="readonly"></input>
						</td>
						<td class="paper_cost">
							<select class="paper_cost_sel">
								<option value="">Select</option>
								<option value="kg">Kg</option>
								<option value="Sheet">Sheet</opton>
							</select>
							<input></input>
						</td>
						<td class="wastage">
              <select>
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Sheet">Sheets</option>
                <option value="Percent">In %</option>
              </select>
							<input></input>
						</td>
						<td class="min_print hide">
              <select class="min_print_charges">
                <option value="1000">1000 Impressions</option>
                <option value="2000">2000 Impressions</option>
                <option value="3000">3000 Impressions</option>
              </select>
						</td>
						<td class="finish_size_format">
							<input></input>
						</td>
						<td class="total_pgs">
							<input></input>
						</td>
						<td class="dtp">
							<select class="dtp_select">
								<option value="">Select</option>
								<option value="None">None</option>
								<option value="Page">/Page</option>
								<option value="Lot">/Lot</option>
							</select>
							<input></input>
						</td>
						<td class="pages_in_plate_sig">
							<input></input>
						</td>
						<td class="ups_in_plate">
							<input></input>
						</td>
						<td class="num_colors">
							<select>
								<option value="">Select</option>
								<option value="0">None</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
								<option value="4">Four</option>
								<option value="5">Five</option>
								<option value="6">Six</option>
								<option value="7">Seven</option>
								<option value="8">Eight</option>
						</td>
						<td class="plate_cost">
							<input></input>
						</td>
						<td class="min_print_rate">
							<input></input>
						</td>
						<td class="balance_qty">
							<input></input>
						</td>
						<td class="process">
              <input readonly value="+" class="process_cost"></input>
						</td>
				</tbody>
			</table>
      <div class="calculation_page">Cost Calculation Page</div>
		</div>
	</div>
	<div class="results hide">
		<div class="div-3 result_div">
			<div class="row">
				<div class="title">
					DETAILS
				</div>
				<div class="res-1">
					QTY A
				</div>
				<div class="res-2">
					QTY B
				</div>
				<div class="res-3">
					QTY C
				</div>
			</div>
			<div class="row paper-wstg">
				<div class="title">
					PAPER + WSTG
          <img src="images/arrow_drop_down.svg">
				</div>
				<div class="paper-a res-1">
				</div>
				<div class="paper-b res-2">
				</div>
				<div class="paper-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					DESIGN/DTP
				</div>
				<div class="design-a res-1">
				</div>
				<div class="design-b res-2">
				</div>
				<div class="design-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					PLATE + MIN. PRTNG.
				</div>
				<div class="plate-a res-1">
				</div>
				<div class="plate-b res-2">
				</div>
				<div class="plate-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					BALANCE QTY PRINTING
				</div>
				<div class="printing-a res-1">
				</div>
				<div class="printing-b res-2">
				</div>
				<div class="printing-c res-3">
				</div>
			</div>
		</div>
		<div class="div-3 result_div">
			<div class="row">
				<div class="title">
					DETAILS
				</div>
				<div class="res-1">
					QTY A
				</div>
				<div class="res-2">
					QTY B
				</div>
				<div class="res-3">
					QTY C
				</div>
			</div>
			<div class="row">
				<div class="title">
          POST PRTNG. PROC'S COST
				</div>
				<div class="post_process_cost-a res-1">
				</div>
				<div class="post_process_cost-b res-2">
				</div>
				<div class="post_process_cost-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					STAPLE COST SIDE/SAD'LE/LOOP
				</div>
				<div class="binding-a res-1">
				</div>
				<div class="binding-b res-2">
				</div>
				<div class="binding-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					HIDDEN EXP.
				</div>
				<div class="hidden-exp-a res-1">
				</div>
				<div class="hidden-exp-b res-2">
				</div>
				<div class="hidden-exp-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					BASIC COST
				</div>
				<div class="basic-cost-a res-1">
				</div>
				<div class="basic-cost-b res-2">
				</div>
				<div class="basic-cost-c res-3">
				</div>
			</div>
		</div>
		<div class="div-3 result_div">
			<div class="row">
				<div class="title">
					DETAILS
				</div>
				<div class="res-1">
					QTY A
				</div>
				<div class="res-2">
					QTY B
				</div>
				<div class="res-3">
					QTY C
				</div>
			</div>
			<div class="row">
				<div class="title">
					PROFIT
				</div>
        <div class="res">
          <div class="wstg-gain-a res-1">
          </div>
          <div class="profit-a res-1">
          </div>
        </div>
        <div class="res">
          <div class="wstg-gain-b res-2">
          </div>
          <div class="profit-b res-2">
          </div>
        </div>
        <div class="res">
          <div class="wstg-gain-c res-3">
          </div>
          <div class="profit-c res-3">
          </div>
        </div>
			</div>
			<div class="row">
				<div class="title">
					TOTAL QUOTE
				</div>
				<div class="total-quote-a res-1">
				</div>
				<div class="total-quote-b res-2">
				</div>
				<div class="total-quote-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
				QUOTE PER UNIT	
				</div>
				<div class="quote-per-unit-a res-1">
				</div>
				<div class="quote-per-unit-b res-2">
				</div>
				<div class="quote-per-unit-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
				</div>
				<div class="res-1">
				</div>
				<div class="res-2">
				</div>
				<div class="res-3">
				</div>
			</div>
		</div>
	</div>
</div>
<?php
require_once("user_bottom.php");
require_once("process_cost.php");
