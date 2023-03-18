<?php
$module = 'CALENDAR';
require_once("login_required.php");
require_once("user_top.php");
?>
<div class="row">
	<div class="middle_container">
		<div class="inputs">
			<table class="input_table">
				<thead>
					<tr>
						<th class="option">
							Option
						</th>
						<th class="paper">
							Paper
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
							Wast-<br/> age <br/>In %
						</th>
						<th class="finish_size_format">
							Finish Size Format
						</th>
						<th class="sheets_in_calendar"/>
							Sheets<br/>
							In each<br/>
							Cal'dar
						<th>
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
							Exp.<br/>
							In %
						</th>
						<th class="profit" colspan="2">
							Profit
						</th>
						<th class="over_print_qty">
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
				<tbody>
					<tr>
					</tr>
				</tbody>
			</table>
	<div class="results">
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
					PAPER + WSTG
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
					PLATE
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
					PRINTING
				</div>
				<div class="printing-a res-1">
				</div>
				<div class="printing-b res-2">
				</div>
				<div class="printing-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					LAM./UV/AQS.
				</div>
				<div class="lami-a res-1">
				</div>
				<div class="lami-b res-2">
				</div>
				<div class="lami-c res-3">
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
					SP-UV/FOIL/EMBS
				</div>
				<div class="sp-uv-foil-a res-1">
				</div>
				<div class="sp-uv-foil-b res-2">
				</div>
				<div class="sp-uv-foil-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					CREASE/PERFO.EXP.
				</div>
				<div class="crease-a res-1">
				</div>
				<div class="crease-b res-2">
				</div>
				<div class="crease-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					PUNCH-DIE COST
				</div>
				<div class="punch-die-a res-1">
				</div>
				<div class="punch-die-b res-2">
				</div>
				<div class="punch-die-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					BINDING/ST'PL
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
					BASIC COST
				</div>
				<div class="basic-cost-a res-1">
				</div>
				<div class="basic-cost-b res-2">
				</div>
				<div class="basic-cost-c res-3">
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
				<div class="profit-c res-3">
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
				<div class="unit-quote-a res-1">
				</div>
				<div class="unit-quote-b res-2">
				</div>
				<div class="unit-quote-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
				&nbsp;
				</div>
				<div class=" res-1">
				</div>
				<div class=" res-2">
				</div>
				<div class=" res-3">
				</div>
			</div>
		</div>
	</div>
</div>
<?php
require_once("user_bottom.php");
