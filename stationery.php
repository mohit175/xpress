<?php
$module = 'STATIONERY';
require_once("login_required.php");
require_once("user_top.php");
?>
<div class="row middle-row">
	<div class="middle_container stationery">
		<div class="inputs">
			<table class="input_table" id="stationery_input">
				<thead>
					<tr>
						<th class="option">
              Media &<br/>
              Print <br/>
							Options<br/>
						</th>
						<th class="paper_desc" colspan="2">
							Paper  Type, Size (Parent) & GSM<br/>
							with Cost Per Each Sheet
						</th>
						<th colspan ="2" class="paper_size">
							Paper Sheet Size<br/>
							<span class="pull-left">Width</span>
							<span class="pull-right">Height</span>
						</th>
						<th class="wastage">
              Expected Wastage
						</th>
						<th class="copies_set">
							No. Of<br/>
							Copies<br/>
							In<br/>
							Each<br/>
							Set
						</th>
						<th class="sets_book">
							No. Of<br/>
							Sets<br/>
							In<br/>
							Each<br/>
							Book
						</th>
						<th class="finish_cut_format">
							Finish <br>
							Book<br/>
							Size<br/>
							Format
						</th>
						<th class="dtp">
							Design <br/>
							DTP Cost <br/>
							Per
						</th>
						<th class="ups_in_plate">
							UP-s In <br/> Plate<br/>Signa-<br/>ture
						</th>
						<th class="plate_master">
							Plate/<br/>
							Master<br/>
							Mounted<br/>
							On M/c
						</th>
						<th class="num_colors">
							Number of Colors 
						</th>
						<th class="plate_master_cost_each">
							Plate/<br/>
							Master<br/>
							Cost<br/>
							Per<br/>
							Each
						</th>
						<th class="print_rate">
							Print<br/>
							Rate
						</th>
						<th class="binding_type" colspan="2">
							Binding Type &amp;<br/>
							Cost Per<br/>
							Book
						</th>
						<th class="numbing">
							Numb'ng/<br/>
							Perfora'n<br/>
							cost Per<br/>
							1000
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
						<td class="paper_desc">
							<input class="selectPaper" placeholder="Select" readonly=readonly>
							</input>
							<input type="text" class="paper_desc_amount"> 
						</td>
						<td colspan ="2" class="paper_size">
							<input class="width" readonly="readonly"></input>
							<input class="height" readonly="readonly"></input>
						</td>
						<td class="paper_gsm">
							<input readonly="readonly"></input>
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
						<td class="copies_set">
							<input id="copies_set" disabled="disabled"></input>
						</td>
						<td class="sets_book">
							<input></input>
						</td>
						<td class="finish_cut_format">
							<select class="inp_finish_size_format">
								<option value="">Select</option>
								<option value="16">1/16</option>
								<option value="12">1/12</option>
								<option value="10">1/10</option>
								<option value="9">1/9</option>
								<option value="8">1/8</option>
								<option value="6">1/6</option>
								<option value="5">1/5</option>
								<option value="4">1/4</option>
								<option value="3">1/3</option>
							</select>
						</td>
						<td class="dtp">
							<select class="dtp_select">
								<option value="">Select</option>
								<option value="None">None</option>
								<option value="Lot">Lot</option>
							</select>
							<input ></input>
						</td>
						<td class="ups_in_plate">
							<input></input>
						</td>
						<td class="plate_master">
							<select>
								<option value="">Select</option>
								<option value="1">Single</option>
								<option value="2">Double</option>
							</select>
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
							</select>
						</td>
						<td class="plate_master_cost_each">
							<input></input>
						</td>
						<td class="print_rate">
							<input></input>
						</td>
						<td class="binding_type">
							<select>
								<option value="">Select</option>
								<option value="None">None</option>
								<option value="Pad Bound">Pad Binding</option>
								<option value="Top Cover Paper">Top Cover (Kachcha) Binding</option>
								<option value="Hard Bound">Hard (Pakka) Binding</option>
								<option value="Cloth Bound">Full Cloth Binding</option>
							</select>
							<input class="inp_staple"></input>
						</td>
						<td class="numbing">
              <select>
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Hand">Hand</option>
                <option value="M/c">M/c</option>
                <option value="Digital">Digital</option>
              </select>
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
				</tbody>
				<tbody class="hide" id="sample_row">
					<tr>
						<td class="option">
              <span class="row-number"></span>
              <i class="fa-solid fa-caret-down add-row-arrow"></i>
						</td>
						<td class="paper_desc">
							<input class="selectPaper"  readonly="readonly" placeholder="Select">
							</input>
							<input type="text" class="paper_desc_amount"> 
						</td>
						<td colspan ="2" class="paper_size">
							<input class="width" readonly="readonly"></input>
							<input class="height" readonly="readonly"></input>
						</td>
						<td class="paper_gsm">
							<input readonly="readonly"></input>
						</td>
          </tr>
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
					PLATE/MASTER
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
					 BINDING	
				</div>
				<div class="book-binding-a res-1">
				</div>
				<div class="book-binding-b res-2">
				</div>
				<div class="book-binding-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					NUMBERING
				</div>
				<div class="numbering-a res-1">
				</div>
				<div class="numbering-b res-2">
				</div>
				<div class="numbering-c res-3">
				</div>
			</div>
			<div class="row">
				<div class="title">
					HIDDEN EXP
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
