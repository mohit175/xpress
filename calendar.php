<?php
$module = 'CALENDAR';
require_once("login_required.php");
require_once("user_top.php");
?>
<div class="row middle-row">
	<div class="middle_container calendar">
		<div class="inputs">
			<table class="input_table" id="calendar_input">
				<thead>
					<tr>
						<th class="option hide">
              Media &<br/>
              Print <br/>
							Options
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
							Finish Size Format
						</th>
						<th class="sheets_in_calendar"/>
							Sheets<br/>
							In each<br/>
							Cal'dar
						</th>
						<th class="dtp">
							Design DTP Cost Per
						</th>
						<th class="num_colors_front">
							Nos. of<br/>
							Colors On<br/>
							Day-Date<br/>
							Side
						</th>
						<th class="months_in_plat">
							Months<br/>
							In Plate<br/>
							Signa-<br/>
							ture
						</th>
						<th class="num_colors_back">
							Colors On<br/>
							Backside<br/>
							Printing<br/>
							12 Sheets
						</th>
						<th class="plate_cost_per_plate">
							Plate<br/>
							Cost<br/>
							Per<br/>
							Plate
						</th>
						<th class="min_print_rate">
							Minimum<br/>
							Print Rate<br/>
							Per Color<br/>
							Per 1000
						</th>
						<th class="bal_print_rate">
							Balance Qty<br/>
							Print rate<br/>
							Per Color<br/>
							Per 1000
						</th>
						<th class="tinning">
							Cal'dar<br/>
							Tinning<br/>
							Lacing<br/>
							Binding
						</th>
						<th class="hidden_expense">
							Hidden <br/>
							Exp.
						</th>
						<th class="profit" colspan="2">
							Profit
						</th>
						<th class="over_print_qty hide">
							Over<br/>
							Printing<br/>
							Qty.
						</th>
						<th class="over_print_colors">
							Nos. of<br/>
							Colors<br/>
							Over-<br/>
							Printing
						</th>
						<th class="over_print_dtp" colspan="2">
							Design<br/>
							DTP Cost<br/>
							Over-<br/>
							Printing
						</th>
					</tr>
				</thead>
				<tbody id="inputs_rows">
					<tr>
						<td class="option hide">
							1
						</td>
						<td class="paper">
							<input class="selectPaper" placeholder="Select" readonly="readonly">
							</input>
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
						<td class="finish_size_format">
							<input></input>
						</td>
						<td class="sheets_in_calendar">
							<select>
								<option value="">Select</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
								<option value="4">Four</option>
								<option value="6">Six</option>
								<option value="12">Twelve</option>
							</select>
						</td>
						<td class="dtp">
							<select class="dtp_select">
								<option value="">Select</option>
								<option value="None">None</option>
								<option value="Page">/Page</option>
								<option value="Lot">Lot</option>
							</select>
							<input></input>
						</td>
						<td class="num_colors_front">
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
							</select>
						</td>
						<td class="months_in_plat">
							<input></input>
						</td>
						<td class="num_colors_back">
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
							</select>
						</td>
						<td class="plate_cost">
							<input></input>
						</td>
						<td class="min_print_rate">
							<input></input>
						</td>
						<td class="bal_print_rate">
							<input></input>
						</td>
						<td class="tinning">
							<input></input>
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
						<td class="over_print_qty hide">
							<input></input>
						</td>
						<td class="over_print_colors">
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
							</select>
						</td>
						<td class="over_print_dtp">
							<select class="over_print_dtp_select">
								<option value="">Select</option>
								<option value="None">None</option>
								<option value="Page">/Page</option>
								<option value="Lot">Lot</option>
							</select>
							<input class="over_print_dtp_val"></input>
						</td>
				</tbody>
			</table>
      <div class="calculation_page">Cost Calculation Page</div>
		</div>
	</div>
	<div class="results hide calendar">
		<div class="div-3 result_div">
			<div class="row">
				<div class="title">
					DETAILS
				</div>
				<div class="res-1">
					COST
				</div>
				<div class="res-2">
					O.P COST
				</div>
			</div>
			<div class="row paper-wstg">
				<div class="title">
					PAPER + WSTG
          <img src="images/arrow_drop_down.svg">
				</div>
				<div class="paper-a res-1">
				</div>
				<div class="res-2">
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
			</div>
			<div class="row">
				<div class="title">
					PLATE + MINIMUM PRINTING
				</div>
				<div class="plate-a res-1">
				</div>
				<div class="plate-b res-2">
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
			</div>
		</div>
		<div class="div-3 result_div">
			<div class="row">
				<div class="title">
					DETAILS
				</div>
				<div class="res-1">
					COST
				</div>
				<div class="res-2">
					O.P COST
				</div>
			</div>
			<div class="row">
				<div class="title">
					 BINDING LABOUR COST
				</div>
				<div class="binding-labour-a res-1">
				</div>
				<div class="binding-labour-b res-2">
				</div>
			</div>
			<div class="row">
				<div class="title">
					HIDDEN EXP
				</div>
				<div class="hidden-exp-a res-1">
				</div>
				<div class="res-2">
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
			</div>
			<div class="row">
				<div class="title">
					PROFIT
				</div>
				<div class="profit-a res-1">
				</div>
				<div class="profit-b res-2">
				</div>
			</div>
		</div>
		<div class="div-3 result_div">
			<div class="row">
				<div class="title">
					DETAILS
				</div>
				<div class="res-1">
					COST
				</div>
				<div class="res-2">
					O.P COST
				</div>
			</div>
			<div class="row">
				<div class="title">
					TOTAL COST
				</div>
				<div class="total-quote-a res-1">
				</div>
				<div class="total-quote-b res-2">
				</div>
			</div>
			<div class="row">
				<div class="title">
					QUOTE PER CALENDAR
				</div>
				<div class="quote-per-unit-a res-1">
				</div>
				<div class="quote-per-unit-b res-2">
				</div>
			</div>
			<div class="row">
				<div class="title">
					QUOTE PER CALENDAR				
				</div>
				<div class="quote-over-print-a res-1">
				</div>
				<div class="res-2">
				</div>
			</div>
			<div class="row">
				<div class="title">
				 WITH OVER-PRINTING
				</div>
				<div class=" res-1">
				</div>
				<div class=" res-2">
				</div>
			</div>
		</div>
	</div>
</div>
<?php
require_once("user_bottom.php");
