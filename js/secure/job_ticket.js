class JOB_TICKET{
  constructor(){
    let _this = this
    _this.module = window.module
    _this.qty_selected = 'a'
  }
  createJobTicket(quantity){
    let _this = this
    const qty = $("#"+quantity).val()
    $("#PDF_Options_Job_Ticket .quantity").html(qty)
    _this.setCustomer()
    _this.job_ref = $("#job_ref").val()
    _this.estimate_no = $("#quote_no").val()
    _this.estimate_date = $("#quote_date").val()
    const job_size = $(".job_size").first()
    _this.closed_job_size = $(job_size).find(".closed_job_size_w").first().val()
      + ' x ' + $(job_size).find(".closed_job_size_h").first().val()
    _this.open_job_size = $(job_size).find(".open_job_size_w").first().val()
      + ' x ' + $(job_size).find(".open_job_size_h").first().val()
    _this.parent_size = $(job_size).find(".parent_paper_size_w").first().val()
      + ' x ' + $(job_size).find(".parent_paper_size_h").first().val()
    _this.machine_size = $(job_size).find(".machine_size_w").first().val()
      + ' x ' + $(job_size).find(".machine_size_h").first().val()
    
    _this.job_desc = $("#pdf_desc").val().replaceAll("\n","<br/>")
    
    _this.createPostProcessDetails()
    if(_this.module == "single_sheet" || _this.module == "box")
    {
      const print_sides = window.calc.getInput(1,"sel_print_sides")
      if(print_sides == 1){
        _this.print_sides = "Single"
      }
      else{
        _this.print_sides = "Both"
      }
    }
    _this.paper_details = _this.getPaperStockNeeded(quantity)
    if(_this.module == "stationery"){
      _this.createStationeryDetails()
    }
    else if(_this.module == 'book' || _this.module == "multi_sheet"){
      _this.createBookDetails()
    }
  }
  
  createBookDetails(){
    let _this = this
    const qty = '#quantity_' + _this.qty_selected
    _this.book_quantity = $(qty).val()
    _this.total_pgs = window.binding.getTotalPgsForBook()
    const book_size = window.calc.getInput(2,"book_size")
    $("#binding_inputs .book_size").val(book_size)
    _this.book_size_format = $("#binding_inputs .book_size option:selected").text()
  }
  createStationeryDetails(){
    let _this = this
    const qty_name = 'quantity_' + _this.qty_selected
    _this.books = window.calc.getInput(0, qty_name)
    _this.sets_in_book = window.calc.getInput(1,"inp_sets_book")
    _this.copies_in_set = window.calc.getInput(1,"inp_copies_set")
    const master_on_mc = window.calc.getInput(1,"sel_plate_master")
    if(master_on_mc == 1){
      _this.plate_master = "Single"
    }
    else if(master_on_mc == 2){
      _this.plate_master = "Double"
    }
    else{
      _this.plate_master = ""
    }
    _this.ups_in_master = window.calc.getInput(1,"inp_ups_in_plate")
    _this.job_size_format = window.calc.getInput(1,"inp_finish_size_format")
    _this.binding_type = $(".sel_binding_type option:selected").text()
  }
  
  renderStationery(element){
    let _this = this
    $(element).find(".printing_sides").hide()
    $(element).find(".stationery.hide").show()
    $(element).find(".books").html(_this.books)
    $(element).find(".sets_in_book").html(_this.sets_in_book)
    $(element).find(".copies_in_set").html(_this.copies_in_set)
    $(element).find(".plate_master").html(_this.plate_master)
    $(element).find(".ups_in_master").html(_this.ups_in_master)
    $(element).find(".binding_type").html(_this.binding_type)
    $(element).find(".job_size_format").html(_this.job_size_format)
    $(element).find(".pre-press .plates_per_forme").hide()
    $(element).find(".pre-press .forme_per_sig").hide()
    $(element).find(".pre-press .sig_plates").hide()
    $(element).find(".page-4").hide()
    $(element).find(".page-5").hide()
  }
   
  renderBook(element){
    let _this = this
    $(element).find(".outs_pieces").hide()
    $(element).find(".ups").hide()
    $(element).find(".ups_pieces").hide()
    $(element).find(".book").show()
    $(element).find(".book_quantity").html(_this.book_quantity)
    $(element).find(".total_pgs").html(_this.total_pgs)
    $(element).find(".book_size_format").html(_this.book_size_format)
    $(element).find(".printing_sides").hide()
    $(element).find(".inks-row").hide()
    if( _this.module == "multi_sheet" ){
      $(element).find(".multi_sheet").show()
    }
    const paper = _this.paper_details.stock
    const worktype_html = $(element).find(".worktype_sample").html()
    $(element).find(".pre-press-table .table .data-row").each(function(i,d){
      if(_this.pre_loaded == true){
        return
      }
      const part_sig_mod = paper[i].part_sig_mod
      const part_sig = paper[i].part_sig
      const outs_pieces_per_sig = paper[i].outs_pieces_per_sig
      const pages_in_each_sig = paper[i].pages_in_each_sig
      const pages_in_row = paper[i].pages_in_row
      const plate_runs = paper[i].plate_runs
      const total_plates = paper[i].plates
      let plates = Math.floor(part_sig)
      if(plates == 0){
        plates = 1
      }
      const colors = paper[i].colors
      let sig_plates = plates * 2 * colors
      let sig_plates_html = '<div class="color_plates">' + sig_plates + '</div>'
      let plates_forme_html = '<div class="forme_plates">' + plates + '</div>'
      let outs_html = outs_pieces_per_sig
      $(d).find(".outs_pieces_per_sig").html(outs_html)
      $(d).find(".plates_per_forme").html(plates_forme_html)
      $(d).find(".sig_plates").html(sig_plates_html)
      $(d).find(".forme_per_sig").append('<div class="forme">2</div>')
      let pages_left = (part_sig - Math.floor(part_sig)) * (pages_in_each_sig *2)
      let work_and_turn_only = false
      if(pages_in_row == pages_left){
        work_and_turn_only = true
      }
      let divisor = 1
      let p = 0
      if(part_sig < 1 && paper[i].inner_pgs_printed != 2 ){
        $(d).find(".pages_in_each_sig_div").html('')
        $(d).find(".outs_pieces_per_sig").html('')
      }
      let pgs = 2
      if( paper[i].inner_pgs_printed == 2 && pages_left == 0 ){
        $(d).find(".worktype").parent().append(worktype_html)
        $(d).find(".pgs").html(pgs)
        $(d).find(".pages_ups").html(1)
      }
      while( pages_left > 0 ){
        if(pages_left >= 32){
          pages_left = pages_left - 32
          divisor = ( pages_in_each_sig * 2 ) / 32
          pgs = 32
        }
        if(pages_left >= 16){
          pages_left = pages_left - 16
          divisor = ( pages_in_each_sig * 2 ) / 16
          pgs = 16
        }
        else if(pages_left >= 8){
          pages_left = pages_left - 8
          divisor = ( pages_in_each_sig * 2 ) / 8
          pgs = 8
        }
        else if(pages_left >= 4){
          pages_left = pages_left - 4
          divisor = ( pages_in_each_sig * 2 ) / 4
          pgs = 4
        }
        else if(pages_left >= 2){
          pages_left = pages_left - 2
          divisor = ( pages_in_each_sig * 2 ) / 2
          pgs = 2
        }
        p = Math.floor(outs_pieces_per_sig/divisor)
        if(paper[i].inner_pgs_printed != 0 ){
          p = outs_pieces_per_sig
        }
        else if( work_and_turn_only ){
          p = outs_pieces_per_sig
        }
        p = p
        const p_html = '<div class="outs_pieces_per_sig">'+p+'</div>'
        let pages_ups = paper[i].pages_in_each_sig/pgs
        if( paper[i].inner_pgs_printed == 2 ){
          pgs = pgs/2
          pages_ups = pages_ups * 2
        }
        sig_plates_html = '<div class="color_plates">' + colors + '</div>'
        plates_forme_html = '<div class="forme_plates">1</div>'
        $(d).find(".outs_pieces_per_sig").parent().append(p_html)
        $(d).find(".plates_per_forme").append(plates_forme_html)
        $(d).find(".sig_plates").append(sig_plates_html)
        $(d).find(".forme_per_sig").append('<div class="forme">1</div>')
        $(d).find(".worktype").parent().append(worktype_html)
        $(d).find(".pgs").last().html(pgs)
        $(d).find(".pages_ups").last().html(pages_ups)
      }
      if( paper[i].inner_pgs_printed == 2 ){
        $(d).find(".worktype_row").first().hide()
        let w_row = $(d).find(".worktype_row")[1]
        $(w_row).find("select").remove()
        $(w_row).html("Cut & Stack "+ $(w_row).html())
      }
      if( work_and_turn_only ){
        $(d).find(".forme").first().hide()
        $(d).find(".color_plates").first().hide()
        $(d).find(".worktype_row").first().hide()
        $(d).find(".outs_pieces_per_sig").first().hide()
        $(d).find(".plates_per_forme .forme_plates").first().hide()
      }
      else{
        $(d).find(".worktype_row").first().show()
      }
      //$(d)
      /*const forme_count = $(d).find(".worktype_row:not(.hide)").length
      $(d).find(".forme_plates").each(function(j,forme_div){
        const forme_num = $(forme_div).html() + "/" + forme_count
        $(forme_div).html(forme_num)
      })*/
    })
    const signature = paper[0].pages_in_each_sig
    const sig_element = element + " .signatures"
    const binding_type_select = $(element).find(" select.binding_type")
    let binding_type = $(binding_type_select).val()
    _this.validateBindingType($(binding_type_select))
    _this.renderBindingSignature(sig_element, _this.total_pgs, signature, 
      binding_type)
    $(binding_type_select).change(function(){
      _this.validateBindingType($(this))
      binding_type = $(this).val()
      _this.renderBindingSignature(sig_element, _this.total_pgs, signature, 
        binding_type)
    })
  }
  
  /*
   * Validates binding type
   *
   * Validates binding type in that in saddle binding type a the total pages
   * of a row should be a multiple of 4.
   *
   * @binding_type_select jquery reference to the select input for binding type
   */
    validateBindingType( binding_type_select ){
      let _this = this

      const binding_type = $( binding_type_select ).val()
      
      if( binding_type == "saddle"){
        //get paper details for row
        let paper = _this.paper_details.stock
        
        //use every instead of forEach to break out of loop easily
        paper.every(function(d){

          //pages in row
          const pages = d.pages_in_row
          //is not multiple of 4
          if( pages % 4 ){
            //give error and change selection to perfect
            window.xpress.modalAlert("alert",
              "Minimum 4 pages are required in EACH Signature",
              "Minimum 4 pages are required in EACH Signature", "failure")
            $( binding_type_select ).val("perfect")
            
            //There is no need to check more rows as warning is given and
            //binding type is now perfect so break out of every by returning
            //false
            return( false )
          }
        })
      }
    }

  renderBindingSignature(element, total_pgs, signature, binding_type){
    let _this = this
    _this.binding_type = binding_type
    if(binding_type =="perfect"){
      _this.renderPerfectSignature(element, total_pgs, signature, binding_type)
    }
    if(binding_type =="saddle"){
      _this.renderSaddleSignature(element, total_pgs, signature)
    }
  } 
  renderSaddleSignature(element, total_pgs, signature){
    let _this = this
    if(typeof(_this.renderSaddleSignature.offset_y) == "undefined"){
      _this.renderSaddleSignature.offset_y = 0
    }
    let offsets = 5
    let v_offset = 20
    let impose = new IMPOSE
    if(signature == 8 ){
      v_offset = 20
    }
    else if(signature == 16 ){
      v_offset = 40
    }
    else if(signature == 32 ){
      v_offset = 60
    }
    else if(signature > 32){
      v_offset = 80
    }
    const h_offset = 5
    const page_width = 30
    const page_details = {
      page_width : page_width,
      page_height : 100,
      y_page_dist : offsets,
      x_page_dist : offsets,
      offset_x : 10,
      bottom_offset : 5
    }
    //remove any previous signatures and imposing
    $(element).find("svg").remove();
    $(element).find(".impose_div").remove();

    //create the imposing section
    const impose_html = $("#impose_div_sample").html()
    $(element).append(impose_html)
    let impose_svg = $(element).find(".impose_div").find("svg");
    
    let first_page = 1
    let last_page = total_pgs
    const h_margin = (signature/2 * page_details.x_page_dist) + h_offset
    let signatures = Math.ceil(total_pgs/( signature * 2 ))
    const gutter = 0
    let svg_width = 800
    let svg_height = 800
    svg_width = page_details.page_width * 2 + gutter
    const html = '<svg xmlns="http://www.w3.org/2000/svg" class="sig_svg saddle_sig" width="' 
      + svg_width + '" height="' + svg_height 
      + ' " viewBox="0 0 ' + svg_width + " " + svg_height + '">';
    $(element).append(html);
    let svg = $(element).find(".sig_svg");
    let count = 1
    _this.paper_details.stock.forEach(function(d,j){
      total_pgs = d.pages_in_row
      page_details.offset_x = 10
      let w = 0
      let signatures = Math.ceil(total_pgs/( signature * 2 ))
      _this.renderSaddleSignature.offset_y = _this.renderSaddleSignature.offset_y 
        + 80 + page_details.page_height + 
        (signature * page_details.y_page_dist + v_offset) * 
        signatures
      page_details.offset_y = _this.renderSaddleSignature.offset_y + 40
      page_details.page_width = page_width + 
        h_margin * signatures
      if(_this.module == "book" && j == _this.paper_details.stock.length -1){
        page_details.offset_y = 40 + page_details.page_height + page_details.y_page_dist
        let title_row_num = _this.paper_details.stock.length -1
        let title_row = _this.paper_details.stock[title_row_num]
        count = _this.renderSaddleSigForRow(1,4,2,page_details, svg, impose_svg, 
          count, title_row,title_row_num, 1,v_offset,h_margin, true)
        return
      }
      if(_this.module == "book" && j == 0){
        //page_details.offset_y = page_details.offset_y + 100
      }
      let pages_left = total_pgs/2
      
      count = _this.renderSaddleSigForRow(signatures,signature,pages_left,page_details,
        svg, impose_svg, count, d,j, first_page,v_offset,h_margin)
      if( svg_width < page_details.offset_x * 2 + 100 ){
        svg_width = page_details.offset_x * 2 + 100
      }
    })
    $(svg).attr("width",svg_width)
    $(svg).attr("viewBox","0 0 " + svg_width + " " + svg_height)
  }
  renderSaddleSigForRow(signatures,signature,pages_left,page_details,svg,
    impose_svg,count,d,j,first_page,v_offset,h_margin, is_title=false){
    let _this = this
    let impose = new IMPOSE
    for( let i = 0; i < signatures; i++){
      let t_sig = signature
      let sig_row = 0
      let type = 'sheet'
      if(pages_left < signature){
        t_sig = pages_left
        sig_row = sig_row + 1
        let table_row = $("#PDF_Options_Job_Ticket .pre-press .data-row")[j]
        let worktypes = $(table_row).find(".worktype_row")
        let worktype = worktypes[sig_row]
        type = $(worktype).find("select").val()
      }
      let farma = i
      let total_pgs = d.pages_in_row
      let row_sig_count = 1
      let w = 0
      page_details.bottom_offset = 5 * ( i + 1 )
      _this.createSignature(page_details, signature, t_sig, svg, impose_svg, 
        count, farma, d, j, type, first_page, is_title, sig_row, signatures)
      page_details.offset_y = page_details.offset_y - v_offset
      page_details.page_width = page_details.page_width - h_margin
      page_details.offset_x = page_details.offset_x + h_margin
      let last_page = d.pages_in_row - first_page + 1
      let impose_sig = impose.createSaddleSig(signature, t_sig * 2, type, first_page, 
         last_page)
      impose.renderSig(signature, impose_sig, type, impose_svg, count, is_title, d)
      first_page = first_page + signature
      count = count + 1
      pages_left = pages_left - signature
    }
    return(count)
  }
  renderPerfectSignature(element, total_pgs, signature, binding_type){
    let _this = this
    //set the offsets for x page distance and y page distance
    let offsets = 5
    if(signature == 4){
      offsets = 12
    }
    if(signature == 8){
      offsets = 8
    }
    if(signature == 16){
      offsets = 5
    }
    if(signature == 32){
      offsets = 2
    }
    //set top margin
    const top_margin = 10
    //page details for the signature
    const page_details = {
      page_width : 50,
      page_height : 100,
      y_page_dist : offsets,
      x_page_dist : offsets,
      offset_x : 10,
      bottom_offset : 30
    }
    
    //max number of signatures in a row
    const sigs_in_row = 7
    
    //left margin for signatures
    const left_margin = 20
    
    //spacing between signatures
    const gutter = 75

    //spacing between seperate rows
    const row_gutter = 100
    //calculate height for signature
    const sig_height = page_details.page_height + 
      signature/2 * page_details.y_page_dist
    
    //calculate y posititon
    page_details.offset_y = top_margin + sig_height
    
    //starting svg height
    let svg_height = 10
    //calculate svg width
    let svg_width = (page_details.page_width * 2 + gutter) * sigs_in_row
    
    //remove any previous signatures and imposing
    $(element).find("svg").remove();
    $(element).find(".impose_div").remove();

    //create the imposing section
    const impose_html = $("#impose_div_sample").html()
    $(element).append(impose_html)
    let impose_svg = $(element).find(".impose_div").find("svg");
    
    //create and add svg for signatures
    const html = '<svg xmlns="http://www.w3.org/2000/svg" class="sig_svg" width="' 
      + svg_width + '" height="' + svg_height 
      + ' " viewBox="0 0 ' + svg_width + " " + svg_height + '">';
    $(element).append(html);
    let svg = $(element).find(".sig_svg");

    let impose = new IMPOSE
    //set counter to 0 will be used to count each sig sequentially
    let count = 0
    //go through the paper
    _this.paper_details.stock.forEach(function(d,j){
      let i = 0
      let first_page = 1
      let t_sig = d.ups
      signature = d.ups
      let row_sig_count = 1
      let is_title = false
      if( j == _this.paper_details.stock.length -1 && _this.module == 'book'){
        is_title = true
      }
      //set x and y position for signature
      page_details.offset_x = left_margin
      //leave space for title 
      if(_this.module == "book" && j == 0){
        page_details.offset_y = page_details.offset_y + sig_height + row_gutter
      }
      else if(j > 0){
        page_details.offset_y = page_details.offset_y + sig_height + row_gutter
      }

      let w = 0
      //default type of sheetwise
      let type = 'sheet'
      let total_pgs = d.pages_in_row
      
      //calculate new svg height
      svg_height = svg_height + (sig_height + row_gutter) * 
        Math.ceil(total_pgs/(t_sig*2 *sigs_in_row))
      
      //go through the pages and create the signatures
      while( i < total_pgs ){
        let type_select = ""
        while( (total_pgs - i < t_sig * 2 ) && (total_pgs != i) )
        {
          t_sig = t_sig / 2
          if(total_pgs - i >= t_sig * 2 && (total_pgs != i)){
            type_select = $($($("#PDF_Options_Job_Ticket").find(".pre-press").find(".table-row")[j])
              .find(".worktype_select")[w])
            type = $(type_select).val()
            w = w + 1
          }
        }
        i = i + t_sig * 2
        if(row_sig_count > 1)
        {
          if( row_sig_count  % (sigs_in_row + 1) == 0 ){
            page_details.offset_x = left_margin
            page_details.offset_y = page_details.offset_y + sig_height 
              + row_gutter
            svg_height = svg_height + sig_height + row_gutter
          }
          else{
            page_details.offset_x = page_details.offset_x + 
              ( page_details.page_width * 2 + gutter )
          }
        }
        //reset title to 1st position
        if(is_title){
          page_details.offset_y = top_margin + sig_height
          page_details.offset_x = left_margin
        }
        if(d.inner_pgs_printed == 2){
          type = 'cut_stack'
          w = 1
        }
        _this.createSignature(page_details, signature, t_sig, svg, impose_svg, 
          count,row_sig_count, d, j, type, first_page, is_title, w)
        let impose_sig = impose.createPerfectSig(signature, t_sig, type, first_page, 
           d, is_title)
        impose.renderSig(signature, impose_sig, type, impose_svg, count, is_title, d)
        if( type_select != ""){
          let fp = first_page
          let c = count
          $(type_select).change(function(){
            let type = $(this).val()
            $(".impose_"+(c+1)).remove()
            $(".signature_"+(c+1)).attr("type",type)
            $(".impose_sig").hide()
            let impose_sig = impose.createPerfectSig(signature, type, fp, d)
            impose.renderSig(signature, impose_sig, type, impose_svg, c, is_title)
            $(".signature_"+(c+1)).click()
          })
        }
        first_page = first_page + t_sig * 2
        count = count + 1
        row_sig_count += 1
      }
      $(".text_sig_num_"+j).each(function(){
        let text = $(this).find("text").text()
        text = text + "/" + (row_sig_count - 1)
        $(this).find("text").text(text)
      })
    })
    $(svg).attr("width",svg_width)
    $(svg).attr("height",svg_height)
    $(svg).attr("viewBox","0 0 " +svg_width + " "+svg_height)
  }
  createSignature(page_details, ini_sig, signature, svg, impose_svg, count, 
      farma, row, row_num, type, first_page, is_title, sig_row, signatures=0){
    let _this = this
    let binding_type = _this.binding_type
    if(is_title == true){
      binding_type = "perfect"
    }
    const offset_left = page_details.offset_x + page_details.page_width
    const bottom_offset = page_details.bottom_offset
    //const bottom_offset = 5
    const offset_top = page_details.offset_y + bottom_offset 
    const svgNS = "http://www.w3.org/2000/svg";
    let G = document.createElementNS(svgNS, "g");
    let y = page_details.offset_y - page_details.page_height - 
      page_details.y_page_dist * signature/2 - 5
    let rect = {
      x:page_details.offset_x,
      y:y,
      width: page_details.page_width * 2,
      fill: '#ddd',
      stroke: '#000'
    }
    let text = {
      x:page_details.offset_x + page_details.page_width,
      y:page_details.offset_y + bottom_offset + 15,
      text: farma
    }
    if( is_title == true ){
      text.text = 'Title (Cover)'
      text.font_weight = '600'
    }
    if(binding_type == "perfect"){
      let text_sig_num = _this.createText(text) 
      if( !is_title ){
        $(text_sig_num).addClass("text_sig_num_"+row_num)
        $(text_sig_num).addClass("text_sig_num")
      }
      $(G).append(text_sig_num)
    }
    if( is_title == true ){
      text.text = farma
    }
    text.font_size = 100
    text.color = "#f09423"
    text.y = text.y - 50
    let large_text = _this.createText(text)
    $(large_text).addClass("sig_highlight")
    $(large_text).addClass("hide")
    let limit = signature/2
    if(signature == 1){
      limit = 1
    }
    for(let i = 1; i <= limit; i++){
      let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
      let d = "M" + offset_left + " " + offset_top 
      //go to top
      let x = 0
      let y = page_details.page_height * -1
      if(binding_type == "perfect"){
        d = d + " l" + x  + " " + y
      }
      else if(binding_type == "saddle"){
        d = "M" + (offset_left + x)  + " " + (offset_top + y)
      }
      //go left
      x = (page_details.page_width * -1)  + page_details.x_page_dist * i
      y = (page_details.y_page_dist * -1) * i - bottom_offset
      d = d + " l" + x  + " " + y
      if(i == 1 ){
        const pg_num = {
          x: offset_left + x -5,
          y: offset_top + page_details.page_height * -1 + y +12,
          text:first_page,
          anchor:"end"
        }
        if(binding_type == "perfect"){
          $(G).append(_this.createText(pg_num))
        }
        pg_num.text = first_page + signature * 2 -1
        pg_num.x = offset_left + x + page_details.page_width *2 
          - page_details.x_page_dist * i -3
        pg_num.anchor = "start"
        
        if(signature > 1  && binding_type=="perfect"){
          $(G).append(_this.createText(pg_num))
        }
        
        pg_num.text = first_page + signature -1
        pg_num.x = offset_left + x -5 + page_details.x_page_dist * signature/2
        pg_num.y = offset_top + page_details.page_height * -1  -3 
          -page_details.y_page_dist * signature/2 - bottom_offset
        pg_num.anchor = "end"
        let pg_num_text = ""
        if(signature == 1 ){
          pg_num.text = pg_num.text + 1
          pg_num.anchor = "start"
          pg_num.x = pg_num.x + 12
          pg_num.y = pg_num.y + 10
        }
        if(binding_type == "saddle"){
          pg_num.transform = "rotate(270)"
          pg_num.anchor = "start"
          pg_num.text = first_page + " - " + pg_num.text 
              + "   (" + (farma+1) + "/" + signatures + ")"
          pg_num_text = _this.createText(pg_num) 
          if( !is_title ){
            $(pg_num_text).addClass("text_sig_num_"+row_num)
            $(pg_num_text).addClass("text_sig_num")
          }
        }
        else{
          pg_num_text = _this.createText(pg_num) 
        }
        $(G).append(pg_num_text)
        
        pg_num.text = pg_num.text + 1
        pg_num.x = offset_left - pg_num.x + offset_left
        pg_num.anchor = "start"
        if(signature > 1 ){
          let pg_num_text = ""
          if(binding_type == "saddle"){
            let last_page = row.pages_in_row - first_page + 1
            pg_num.transform = "rotate(270)"
            pg_num.anchor = "start"
            pg_num.text = (last_page - signature + 1 ) + ' - ' + last_page  
              + "   (" + (farma+1) + "/" + signatures + ")"
            pg_num_text = _this.createText(pg_num) 
            if( !is_title ){
              $(pg_num_text).addClass("text_sig_num_"+row_num)
              $(pg_num_text).addClass("text_sig_num")
            }
          }
          else{
            pg_num_text = _this.createText(pg_num) 
          }
          $(G).append(pg_num_text)
        }
      }
      //go down
      x = 0
      y = page_details.page_height
      d = d + " l" + x  + " " + y
      //go to center
      x = page_details.page_width  - page_details.x_page_dist * i
      y = page_details.y_page_dist * i + bottom_offset
      d = d + " l" + x  + " " + y  
      if(signature > 1 ){
        //go right
        x = page_details.page_width - page_details.x_page_dist * i
        y = (page_details.y_page_dist * -1) * i - bottom_offset
        d = d + " l" + x  + " " + y
        //go up
        x = 0
        y = page_details.page_height * -1
        d = d + " l" + x  + " " + y
        //go to center
        x = (page_details.page_width  - page_details.x_page_dist * i)*-1
        y = page_details.y_page_dist * i + bottom_offset 
        d = d + " l" + x  + " " + y  
      }
      path.setAttribute("d", d)
      path.setAttribute("stroke", "black");
      path.setAttribute("fill", "#fff");
      G.append(path)
      $(G).attr("sig_row",sig_row)
    }
    if(binding_type == "perfect"){
      $(G).append(large_text)
      }
      if(binding_type == "saddle"){
        let fb_text = {
          x: page_details.offset_x + 20 + (limit -1) * page_details.x_page_dist,
          y: page_details.offset_y - 5 - (limit - 1)* page_details.y_page_dist
            - page_details.page_height/2,
          text: 'FB ' + (farma + 1),
          transform: "rotate(270)",
          anchor: "middle",
          font_weight: 600
        }
        //$(G).append(_this.createText(fb_text))
      }
    $(G).addClass("click_signature")
    $(G).attr("type", type)
    $(G).addClass("signature_"+(count+1))
    $(G).attr("count", count + 1 )
    svg.append(G)
    $(G).click(function(){
      const type = $(this).attr('type') 
      let pgs = row.pages_in_each_sig
      let ups_in_plate = row.ups_in_plate
      let tmp_sig = ini_sig
      let table_row = $("#PDF_Options_Job_Ticket .pre-press .data-row")[row_num]
      let width = $(table_row).find(".run_width").html()
      let height = $(table_row).find(".run_height").html()
      let worktypes = $(table_row).find(".worktype_row")
      let pieces_per_sig = $(table_row).find(".outs_pieces_per_sig")
      let worktype_count = $(this).attr("sig_row")
      let worktype = worktypes[worktype_count]
      let sheets_per_forme = $(pieces_per_sig[worktype_count]).html()
      let front_colors = []
      let back_colors = ""
      const full_sig_num = $(this).find(".text_sig_num text").text()
      const paper_name_and_sig_num = row.stock_paper_name 
        + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" + full_sig_num + ")"
      if(_this.module == "book" || _this.module == "multi_sheet"){
        $(table_row).find(".plate_inks .selected_colors .color:not(.hide)")
          .each(function(i,d){
            front_colors.push($(d).text())
          })
        front_colors = front_colors.join(", ")
        back_colors = front_colors
      }
      const cut_size = width +'"' + 'x'+height+'" (Untrimmed)'
      $(".impose_div .worktype").html($(worktype).html())
      if(pgs == 16 && type == "sheet"){
        const cut_html = $(".impose_div .worktype").html().replace("<br>","") 
          + '<span>&nbsp;&nbsp;Cut into Two, for 3 Fold Signatures</span>'
        $(".impose_div .worktype").html(cut_html)
      }
      let worktype_select = $(".impose_div select")
      if(worktype_select.length != 0){
        let wtype = $(worktype_select).val()
        if(wtype == 'turn'){
          $(worktype_select).replaceWith('Work & Turn')
        }
        else if(wtype == 'tumble'){
          $(worktype_select).replaceWith('Work & Tumble')
        }
      }
      $(".impose_div .impose_colors_front").html(front_colors)
      $(".impose_div .impose_colors_back").html(back_colors)
      $(".impose_div .cut_size").html(cut_size)
      $(".impose_div .sheets_per_forme").html(sheets_per_forme)
      $(".impose_div .pages_in_row").html(row.pages_in_row)
      $(".impose_div .stock_paper_name").html(paper_name_and_sig_num)
      $(".impose_div .pages").html(pgs)
      $(".impose_div .ups_in_plate").html(row.ups_in_plate)
      $(".impose_div .pages_in_each_sig_div").hide()
      $(".impose_div .turn_tumble").hide()
      const colors = $($(".pre-press .data-row .plate_inks")[row_num])
        .find(".selected_colors").clone()
      $(".impose_div .impose_colors").html("")
      $(".impose_div .impose_colors").append(colors)
      if(ini_sig == signature){
        $(".impose_div .outs_pieces_per_sig").html(row.outs_pieces_per_sig)
      }
      else{
        const divisor = ini_sig/signature
        $(".impose_div .outs_pieces_per_sig").html(row.outs_pieces_per_sig/divisor)
      }
      $(impose_svg).find(".impose_sig").hide()
      $(svg).find(".sig_highlight").hide()
      $(this).find(".sig_highlight").show()
      $(impose_svg).find(".impose_" + (count+1)).show()
    })
  }
  
  renderProcessDetails(element){
    let _this = this
    _this.renderPostProcessDetails(element, ".in-house-select","in_house_process")
  }
  
  renderPostProcessDetails(element,job_class,process_set){
    let _this = this
    let process_samples = $(element).find(".job-work-sample")
    let process_table = $(element).find(".table.pre-press .table-row")
    $(element).find(".job-work .data-row").remove()
    _this.post_process.forEach(function(row,i){
      row.forEach(function(d){
        let sample = $( process_samples ).find( '.' + d.css_class )
        let sample_html = '<div class="table-row data-row ' + d.css_class + '">' 
          + $(sample).html() + '</div>'
        let process_row = process_table[i]
        if(window.module == "book"){
          process_row = process_table[process_table.length - 1]
        }
        const paper_name = $(process_row).find(".stock_paper_name").html()
        const cut_sheet_size = $(process_row).find(".run_width").html() + '"x' 
          + $(process_row).find(".run_height").html()
        const outs = $(process_row).find(".outs_pieces").html()
        $(element).find('.job-work .table').append(sample_html)
        let added_row = $(element).find(".job-work .data-row").last()
        $(added_row).find(".paper_details").html(paper_name)
        $(added_row).find(".name").attr("process_type",d.css_class)
        $(added_row).find(".cut_sheet_size").html(cut_sheet_size)
        $(added_row).find(".total_outs").html(outs)
        _this.enablePostProcessTableActions(added_row)
      })
    })
  }
  
  /*
   * enables actions for post process table
   *
   * enables actions for post process table including creating notes, and
   * creating of purchase order.
   *
   * @param row the row in tthe table to enable the actions for
   */
  enablePostProcessTableActions(row){
    let _this = this

    //enabling adding of notes

    //get reference to the notes div
    const notes_div = $(row).find(".notes")
    
    //get reference to the PO div
    const po_div = $(row).find(".po_num")

    $(notes_div).click(function(){
      //get current notes
      let notes = $(notes_div).html().trim()

      const textarea_html = '<textarea></textarea>'

      //create the textarea
      $(notes_div).html(textarea_html)
      
      //get reference to the textarea
      const textarea = $(notes_div).find("textarea")

      //add notes to the textarea
      $(textarea).val(notes)

      //focus on textarea so user can start typing
      $(textarea).focus()
      
      //put notes into div on blur
      $(textarea).blur(function(){
        //get the edited notes
        notes = $(textarea).val()

        //put the notes into the notes div
        $(notes_div).html(notes)
      })
    })
    
    //enable Process PO
    let po = new PO(row)
  }


  /*
   * creates post process details
   *
   * creates post process details
   * _this.post_process is an array of arrays. for multi sheet it has one array
   * for each row. For the rest of modules it has an array of length one. 
   */
  createPostProcessDetails(){
    let _this = this;

    //initialize ttthe post process array
    _this.post_process = []
    
    //default number of rows for modules other than multi sheet
    let rows = 1

    //get number of rows for multi sheet
    if( _this.module == "multi_sheet" ){
      rows = $("#inputs_rows tr").length
    }

    //go through the rows
    for( i = 1; i <= rows; i++ ){
      //post process for this row
      let post_process = []

      //set dtp post process if dtp is selected
      const dtp_type = window.calc.getInput(i, "dtp_select", "string")
      if( dtp_type != 'None' ){
        let process = {notes:'', css_class:'dtp-design', vendor:'self'}
        post_process.push(process)
      }
      
      //set plate making process if plate cost is not zero
      const plate_cost = window.calc.getInput(i,"inp_plate_cost")
      if( plate_cost != 0 ){
        let process = {notes:'', css_class:'plate-making', vendor:'self'}
        post_process.push(process)
      }
      
      //set printing process if colors is not None
      /*const colors = window.calc.getInput(i, "sel_num_colors", "string")
      if( colors != 'None' ){
        let process = {notes:'', css_class:'printing', vendor:'self'}
        post_process.push(process)
      }*/
      
      //Stationery and calendar do not have any post process so return
      if( _this.module == "stationery" ||
          _this.module == "calendar"   ){
            return
      }
      
      //load the process details if it is multi sheet
      if( _this.module == "multi_sheet" ){
        $("#process_cost_line").val(i-1)
        window.calc.loadRowToProcess()
      }
      
      //go through the inputs Modal to get all the post processes
      $("#inputsModal").find(".select input").each(function(d){
        if($(this).is(":checked")){
          const css_class = $(this).parent().parent().attr("class")
            .replace("row","").replace("div","").trim()
          if( css_class == "stripping" ){
            return
          }
          let process = {notes:'', css_class:css_class, vendor:'self'}
          post_process.push(process)
        }
      })
      //push the processes for this row into _this.post_process
      _this.post_process.push(post_process)
    }
  }
  
  renderJobTicket(element, pre_loaded = false){
    let _this = this
    _this.pre_loaded = pre_loaded
    const paper = _this.paper_details.stock
    //window.xpress.loadData(element + ' .stock-table', paper) 
    if(pre_loaded == false){
      window.xpress.loadData(element + ' .pre-press-table', paper) 
    }
    $(element).find("input[type=text], input[type=date], select")
      .addClass("back-red").change(function(){
        if($(this).val() == ""){
          $(this).addClass("back-red")
        }
        else{
          $(this).removeClass("back-red")
        }
      })
    $(element).find(".customer").html(_this.company_name)
    $(element).find(".person_name").html(_this.company_contact)
    $(element).find(".contact_number").html(_this.contact_number)
    $(element).find(".address").html(_this.address)
    $(element).find(".customer_email").html(_this.customer_email)
    $(element).find(".job_ref").html(_this.job_ref)
    $(element).find(".estimate_number").html(_this.estimate_no)
    $(element).find(".estimate_date").html(_this.estimate_date)
    $(element).find(".closed_job_size").html(_this.closed_job_size)
    $(element).find(".open_job_size").html(_this.open_job_size)
    $(element).find(".parent_paper_size").html(_this.parent_size)
    $(element).find(".machine_size").html(_this.machine_size)
    $(element).find(".total_plates").html(_this.total_plates)
    if(window.module == "single_sheet" || window.module == "box")
    {
      $(element).find(".print_sides").html(_this.print_sides)
    }
    else if( _this.module == "stationery" ){
      _this.renderStationery(element)
    }
    else if(_this.module == "book" || _this.module == "multi_sheet"){
      _this.renderBook(element)
    }
    $(element).find(".job_description").html(_this.job_desc)
    _this.renderProcessDetails(element)
    if(pre_loaded == false){
      _this.enableJobTicketActions(element)
      _this.renderInks(element)
    }
    _this.loadPurchaseOrders()
  }
  async generatePDF(element){
    let _this = this
    $("#loadingModal").show()
    const pdf = "#PDF_Options_Job_Ticket"
    $(pdf).find("select").each(function(i,d){
      $(d).find("option").removeAttr("selected")
      $(d).find("option:selected").attr("selected","selected")
    })
    $(pdf).find("input").each(function(i,d){
      const type = $(d).attr("type")
      if(type == "checkbox"){
        if( $(d).is(":checked") ){
          $(d).attr("checked","checked")
        }
        else{
          $(d).removeAttr("checked")
        }
      }
      else{
        let value = $(d).val()
        $(d).removeAttr("value")
        $(d).attr("value",value)
      }
    })
    let pages = []
    let html = ""
    html = $(pdf).find("section.page-section.page-1").html()
    pages.push(html)
    html = $(pdf).find("section.page-section.page-2").html()
    pages.push(html)
    
    $(pdf).find("section.page-section.page-3 h4")
      .html("Imposed Signatures' Pagination Diagram")
    $(pdf).find("section.page-section.page-3 .impose_div").addClass("impose_div_back")
    $(pdf).find("section.page-section.page-3 .impose_div").hide()
    $(pdf).find("section.page-section.page-3 .impose_div").removeClass("impose_div")
    html = $(pdf).find("section.page-section.page-3").html()
    pages.push(html)
    $(pdf).find("section.page-section.page-3 .impose_div_back").addClass("impose_div")
    $(pdf).find("section.page-section.page-3 .impose_div_back").removeClass("impose_div_back")
    $(pdf).find("section.page-section.page-3 .impose_div").show()
    $(pdf).find("section.page-section.page-3 h4")
      .html("Imposed Signatures' Pagination")
    
    html = $(pdf).find("section.page-section.page-4").html()
    pages.push(html)
    $(pdf).find("section.page-section.page-5 .po").each(function(i,d){
      pages.push($(d).html())
    })
    html = $(pdf).find("section.page-section.page-6").html()
    pages.push(html)
    let params = {action:'generateJobTicketPDFDirect',pages}
    $.post("ajax_api.php",params,function(data){
      $("#loadingModal").hide()
      const url = "ajax_api.php?action=getPDF&pdf_type=job_ticket"
      window.location.href = url
    })
  }
  renderInks(element){
    let _this = this
    if(_this.module == "single_sheet"){
      const sides = window.calc.getInput(1,"sel_print_sides")
      if(sides == 1){
        $("#PDF_Options_Job_Ticket .back-inks .instruction").hide()
        $("#PDF_Options_Job_Ticket .no-backside").show()
        $("#PDF_Options_Job_Ticket .back-inks .plate_inks").addClass("disabled")
      }
      else if(sides == 2){
        $("#PDF_Options_Job_Ticket .back-inks .instruction").show()
        $("#PDF_Options_Job_Ticket .no-backside").hide()
        $("#PDF_Options_Job_Ticket .back-inks .plate_inks").removeClass("disabled")
      }
    }
    return
    if(typeof(_this.id) != "undefined"){
      return
    }
    $(element + " .inks-row").html("")
    if(_this.module != "book" && _this.module != "multi_sheet" ){
      $(element + " .inks-row").html($(element + " .inks-sample").html())
      $(element + " .inks-row .cmyk").change(function(){
        if($(this).is(":checked")){
          $(this).parent().parent().parent().find(".color-group")
            .find("input").prop('checked',true)
        }
        else{
          $(this).parent().parent().parent().find(".color-group")
            .find("input").prop('checked',false)
        }
      })
    }
    
  }
  enableJobTicketActions(element){
    this.addColorsFromLib(element)
    this.enableColorSelection(element)
  }
  addColorsFromLib(element){
    const spot_color = $(element).find(".spot_color")
    let html = "";
    window.xpress.user.spot_color.forEach(function(d,i){
      const color_class ='sp_' + d.spot_color_name.replace(/[\W_]+/g,"_")
      html = html + '<div class="color"><input type="checkbox" class="'+
        color_class+'"></input>'+d.spot_color_name+'</div>'
    })
    $(spot_color).html(html)
    $(element).find(".selected_colors .spot_color .color").addClass("hide")
  }
  enableColorSelection(element){
    $(element).find(".pre-press .plate_inks").on("mouseenter",function(){
      //$(this).find(".pre-press .plate_inks .instruction").hide()
      if($(this).hasClass("disabled")){
        return
      }
      $(this).find(".unselected_colors").show()
      $(this).find(".instruction").hide()
    })
    $(element).find(".pre-press .unselected_colors input").change(function(){
      const color_class = $(this).attr("class")
      $(this).parent().hide()
      const selected_color = $(this).parent().parent().parent().parent()
        .find(".selected_colors ."+color_class)
      $(selected_color).parent().show()
      $(selected_color).prop("checked",true)
    })
    $(element).find(".pre-press .selected_colors input").change(function(){
      const color_class = $(this).attr("class")
      $(this).parent().hide()
      const unselected_color = $(this).parent().parent().parent().parent()
        .find(".unselected_colors ."+color_class)
      $(unselected_color).parent().show()
      $(unselected_color).prop("checked",false)
    })
    $(element).find(".pre-press .plate_inks").mouseleave(function(){
      if($(this).hasClass("disabled")){
        return
      }
      $(this).find(".unselected_colors").hide()
      if($(this).find(".selected_colors input:checked").length == 0){
        $(this).find(".instruction").show()
      }
      else{
        $(this).find(".instruction").hide()
      }
    })
  }
  
  
  /*
   * gets the paper stock required for the current estimate
   *
   * gets the paper stock required for the current estimate
   */
  getPaperStockNeeded(selected_qty){
    let _this = this
    let stock = []
    let papers = {}
    const qty = parseInt($('#'+selected_qty).val())
    let stationery_qty = 0
    let total_plates = 0
    $("#inputs_rows tr").each(function(i,d){
      let count = i
      if(_this.module == "stationery"){
        let stock_for_row = _this.getStockForRow(qty, count, d)
        if(i > 0){
          stock_for_row.req_quantity = stock[0].req_quantity
          stock_for_row.outs_pieces = stock[0].outs_pieces
          stock_for_row.outs = stock[0].outs
          stock_for_row.ups_pieces = stock[0].ups_pieces
          stock_for_row.ups = stock[0].ups
          total_plates = total_plates + stock[0].plates
        }
        total_plates = stock_for_row.plates
        stock.push(stock_for_row)
      }
      else{
        let stock_for_row = _this.getStockForRow(qty, count, d)
        total_plates = total_plates + stock_for_row.plates
        stock.push(stock_for_row)
      }
    })
    if( _this.module == 'book' ){
      let title = $("#book_title tr")
      let stock_for_row = _this.getStockForRow(qty, -2, title)
      total_plates = total_plates + stock_for_row.plates
      stock.push(stock_for_row)
      
    }
    stock.forEach(function(d){
      let paper_name = d.stock_paper_name
      if(typeof(papers[paper_name]) == 'undefined'){
        papers[paper_name] = d.req_quantity
      }
      else{
        papers[paper_name] = papers[paper_name] + d.req_quantity
      }
    })
    let papers_array = []
    const paper_names = Object.keys(papers)
    paper_names.forEach(function(d){
      papers_array.push({stock_paper_name: d, req_quantity: papers[d]})
    })
    _this.total_plates = total_plates
    return({papers_array,papers,stock})
  }
  
  getStockForRow(qty, count, element){
    let _this = this;
    let i = count + 1
    if(_this.module == 'book'){
      i = count + 3
    }
    const stock_paper_name = window.calc.getInput(i ,"selectPaper","string")
    const cuts = window.calc.getInput(i ,"inp_finish_size_format")
    const stock_width = window.calc.getInput(i, "width")
    const stock_height = window.calc.getInput(i, "height")
    let pages = window.calc.getTotalPgs(i)
    if( _this.module == "single_sheet" || 
        _this.module == "box"          ){
      pages = 1
    }
    else if( _this.module == "book" ){
      pages = pages / 2
    }
    let ups = 0
    let pages_in_each_sig = 0
    let outs_pieces_per_sig = 0
    let pages_in_row = 0
    let part_sig = 0
    let part_sig_mod = 0
    let ups_in_plate = 0
    if(_this.module == 'single_sheet'){
      ups = window.calc.getInput(1,"inp_pages_in_plate_sig")
    }
    else if(_this.module == 'box' || _this.module == "stationery"){
      ups = window.calc.getInput(1,"inp_ups_in_plate")
    }
    else if(_this.module == 'book' || _this.module=="multi_sheet"){
      ups = window.calc.getInput(i,"inp_pages_in_plate_sig")
      ups_in_plate = window.calc.getInput(i,"inp_ups_in_plate")
      pages_in_each_sig = window.calc.getInput(i, 'inp_pages_in_plate_sig')
      pages_in_row = window.calc.getInput(i, 'inp_total_pgs')
      part_sig_mod = pages_in_row % ( pages_in_each_sig * 2 )
      part_sig = pages_in_row / ( pages_in_each_sig * 2 )
    }
    let inner_pgs_printed = 0
    if(_this.module == "book" && i == 1){
      inner_pgs_printed = window.calc.getInput(i ,"inner_pgs_printed")
    }
    const outs = cuts / ups
    let c = 0
    if( count < 0 ){
      c = window.calc.paper_req.length -1
    }
    else{
      c = count
    }

    let req_quantity = window.calc.paper_req[c].sheets.a.replaceAll(',','')
    req_quantity = parseInt(req_quantity)
    const outs_pieces = req_quantity * outs
    const ups_pieces = outs_pieces * ups
    const plate_runs = window.calc.plate_runs[1].a
    const colors = window.calc.getInput(i,"sel_num_colors")
    let plates = 0
    if(_this.module == "book" || _this.module == "multi_sheet"){
      plates = window.calc.getPlates(i) * plate_runs
    }
    else{
      plates = window.calc.getPlates(1) * plate_runs
    }
    if(_this.module == "book" || _this.module=="multi_sheet"){
      if(part_sig > 1){
        outs_pieces_per_sig = Math.floor(outs_pieces / part_sig)
      }
      else{
        outs_pieces_per_sig = outs_pieces 
      }
    }
    let run_width = stock_width
    let run_height = stock_height
    for( i = 1; i < outs; i=i+2){
      run_height = run_height / 2
      if( run_height < run_width ){
        let tmp = run_width
        run_width = run_height
        run_height = tmp
      }
    }
    return({stock_paper_name, req_quantity, part_sig_mod, 
      ups, outs, cuts, outs_pieces, ups_pieces, plates, pages_in_each_sig,
      outs_pieces_per_sig, pages_in_row, part_sig, inner_pgs_printed,
      ups_in_plate, run_width, run_height, stock_width, stock_height, 
      plate_runs, colors})
  }
  
  setCustomer(){
    let _this = this;
    const customer_id = $("#customer").attr("data-id")
    const customer = filterCustomer(customer_id)[0]
    _this.address = ""
    if(typeof(customer.shipping_address) == "null" ||
              customer.shipping_address  == "null" ||
              customer.shipping_address  == ""     ){
      _this.address = customer.address.replaceAll("\n","<br/>")
    }
    else{
      _this.address = customer.shipping_address.replaceAll("\n","<br/>")
    }
    _this.company_name = customer.company_name
    _this.company_contact = customer.person_name
    _this.contact_number = customer.contact_number
    _this.customer_email = customer.email
  }
  createRect(rect){
    const svgns = "http://www.w3.org/2000/svg";
    var svg_rect = document.createElementNS(svgns, "rect");
    svg_rect.setAttribute("x", rect.x);
    svg_rect.setAttribute("y", rect.y);
    svg_rect.setAttribute("width", rect.width);
    svg_rect.setAttribute("height", rect.height);
    svg_rect.setAttribute("fill", rect.fill);
    svg_rect.setAttribute("stroke", rect.stroke);
    if(typeof(rect.stroke_width) != "undefined"){
      svg_rect.setAttribute("stroke-width", rect.stroke_width);
    }
    return(svg_rect);
  }
  createText(text){
    var _this = this;
    var svgNS = "http://www.w3.org/2000/svg";
    var newText = document.createElementNS(svgNS,"text");
    var G = document.createElementNS(svgNS, "g");
    var font_size = "100";
    if(typeof(text.font_size) != "undefined"){
      font_size = text.font_size;
    }
    else{
      font_size = _this.font_size;
    }
    G.setAttributeNS(null,"transform","translate("+text.x+","+text.y+")");     
    newText.setAttributeNS(null,"font-size",font_size);
    if(typeof(text.anchor) =="undefined"){
      newText.setAttributeNS(null,"text-anchor","middle");
    }
    else{
      newText.setAttributeNS(null,"text-anchor",text.anchor);
    }
    if(typeof(text.transform) != "undefined")
    {
      newText.setAttributeNS(null,"transform",text.transform);
    }
    if(typeof(text.color) != "undefined")
    {
      newText.setAttributeNS(null,"fill",text.color);
    }
    if(typeof(text.font_weight) != "undefined")
    {
      newText.setAttributeNS(null,"font-weight",text.font_weight);
    }
    var textNode = document.createTextNode(text.text);
    newText.appendChild(textNode);
    $(G).append(newText);
    return(G);
  }
  
  loadPurchaseOrders(){
    let _this = this
    const estimate_num = $("#quote_no").val()
    const job_ticket = "#PDF_Options_Job_Ticket"
    $(job_ticket + " .purchase-orders").html()
    const params = {
      action:'get_purchase_orders',
      estimate_num
    }
    $.post("ajax_api.php", params, function(data){
      let rows = data.resp.rows
      if(!rows){
        return
      }
      let user_details = window.user_details
      $(job_ticket + " .purchase-orders").html("")
      const job_ref = $("#job_ref").val()
      rows.forEach(function(d){
        let pdf_modal = "#Process_PO_PDF_Modal"
        const row = job_ticket + " .job-work ." + d.po_type
        if( d.vendor_id == 0 ){
          pdf_modal = "#Process_PO_PDF_Modal_in_house"
          $(row + " select.job_source").val("in-house")
          $(row + " select.job_source").removeClass("bg-green")
          $(row + " select.job_source").addClass("bg-white")
        }
        else{
          const vendor = filterVendor(d.vendor_id)
          $(row + " select.job_source").addClass("bg-green")
          $(row + " select.job_source").removeClass("bg-white")
          $(row + " select.job_source").val("out-source")
          $(row + " .vendor_name").html(vendor.company_name)
          $(row + " .vendor_email").html(vendor.email)
          $(row + " .vendor_id").html(vendor.id)
          $(pdf_modal + " .vendor_name").html(vendor.company_name)
          $(pdf_modal + " .vendor_address").html(vendor.address)
          $(pdf_modal + " .vendor_email").html(vendor.email)
          $(pdf_modal + " .vendor_phone").html(vendor.contact_number)
          $(pdf_modal + " .company_name").html(user_details.company_name)
          const company_address = user_details.address1 + " " 
            + user_details.address2 + " " + user_details.city
          $(pdf_modal + " .company_address").html(company_address)
          $(pdf_modal + " .company_email").html(user_details.email)
        }
        const date = formatDate(d.created_date)
        let po_num = d.po_num_year.split("/")
        po_num.splice(1,0,estimate_num)
        po_num = po_num.join("/")
        $(row + " .po_num").html(d.po_num_year)
        $(row + " .po_id").html(d.id)
        $(row + " .notes").html(d.notes)
        $(pdf_modal + " .po_date").html(date)
        $(pdf_modal + " .company_contact").html(user_details.name)
        $(pdf_modal + " .company_phone").html(user_details.contact)
        $(pdf_modal + " .po_num").html(po_num)
        $(pdf_modal + " .job_ref").html(job_ref)
        $(pdf_modal + " .po_num").attr("po_num_year",d.po_num_year)
        $(pdf_modal + " .po_num").attr("po_num",d.po_num)
        $(pdf_modal + " .process_name").html(d.po_name)
        $(pdf_modal + " .process_details").html(d.service)
        $(pdf_modal + " .notes").html(d.notes)
        const html = '<div class="po ' + d.po_type + '">' 
          + $(pdf_modal + " .modal-content").html() + '</div>'
        $(job_ticket + " .purchase-orders").append(html)
        $(job_ticket + " .purchase-orders ." + d.po_type + " .edit-po")
          .click(function(){
            $(row + " select.job_source").change()
          })
        $(job_ticket + " .purchase-orders ." + d.po_type + " .download-po")
          .click(function(){
            $("#loadingModal").show()
            const pdf_modal = job_ticket + " .purchase-orders ." + d.po_type
            const po_num = $(pdf_modal).find(".po_num").attr("po_num")
            const url = "ajax_api.php?action=getPDF&pdf_type=po&po_num=" + po_num
            window.location.href = url
            $("#loadingModal").hide()
          })
      })
    })
  }
  
}

class IMPOSE{
  constructor(){
    this.sigs= {
      perfect : 
      { p_1_sheet : {
          front :[null,1],
          back  :[null,2]
        },
        p_1_turn : {
          front :[null,1],
        },
        p_1_tumble : {
          front :[null,1],
        },
        p_2_sheet : {
          front :[null,2,1],
          back  :[null,4,3]
        },
        p_2_turn : {
          front :[null,2,1],
        },
        p_2_tumble : {
          front :[null,2,1],
        },
        p_2_title_blank : {
          front :[null,4,1],
        },
        p_4_sheet : {
          front :[null,5,4,8,1],
          back  :[null,3,6,2,7]
        },
        p_4_turn : {
          front :[null,1,4,2,3],
        },
        p_4_tumble : {
          front :[null,2,3,4,1],
        },
        p_4_turn_2 : {
          front :[null,1,1,2,2],
        },
        p_4_tumble_2 : {
          front :[null,1,2,1,2],
        },
        p_4_title_blank : {
          front :[null,1,4,4,1],
        },
        p_8_sheet : {
          front :[null,5,12,9,8,4,13,16,1],
          back  :[null,7,10,11,6,2,15,14,3]
        },
        p_8_turn : {
          front :[null,3,6,5,4,2,7,8,1],
        },
        p_8_tumble : {
          front :[null,3,6,5,4,2,7,8,1],
        },
        p_8_title_blank : {
          front :[null,1,4,1,4,4,1,4,1],
        },
        p_8_turn_4 : {
          title_front :[null,3,2,1,4,2,3,4,1],
          front :[null,2,3,4,1,2,3,4,1],
        },
        p_8_tumble_4 : {
          front :[null,3,2,1,4,2,3,4,1],
        },
        p_8_turn_2 : {
          title_front :[null,1,2,1,2,2,1,2,1],
          front :[null,2,1,2,1,2,1,2,1],
        },
        p_8_tumble_2 : {
          front :[null,1,2,1,2,2,1,2,1],
        },
        p_16_sheet : {
          front :[null,8,9,12,5,1,16,13,4,20,29,32,17,21,28,25,24],
          back  :[null,6,11,10,7,3,14,15,2,18,31,30,19,23,26,27,22]
        },
        p_16_turn : {
          front :[null,8,9,12,5,1,16,13,4,2,15,14,3,7,10,11,6],
        },
        p_16_tumble : {
          front :[null,8,9,12,5,1,16,13,4,20,29,32,17,21,28,25,24],
        },
        p_16_turn_8 : {
          front :[null,4,5,4,5,1,8,1,8,2,7,2,7,3,6,3,6],
        },
        p_16_tumble_8 : {
          front :[null,8,9,12,5,1,16,13,4,20,29,32,17,21,28,25,24],
        },
        p_16_turn_4 : {
          front :[null,2,3,2,3,1,4,1,4,2,3,2,3,1,4,1,4],
        },
        p_16_tumble_4 : {
          front :[null,8,9,12,5,1,16,13,4,20,29,32,17,21,28,25,24],
        },
        p_16_turn_2 : {
          front :[null,2,2,2,2,1,1,1,1,2,2,2,2,1,1,1,1],
        },
        p_16_tumble_2 : {
          front :[null,8,9,12,5,1,16,13,4,20,29,32,17,21,28,25,24],
        },
      }
    }
    this.p_sig_8 = {
      front : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ],
      front : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ]
    }
    this.s_sig_1_2_turn = {
      front : [null,
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ],
      back : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
      ]
    }
    this.s_sig_2_4_sheet = {
      front : [null,
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ],
      back : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
      ]
    }
    this.s_sig_2_4_turn = {
      front : [null,
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ],
      back : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
      ]
    }
    this.s_sig_4_8_sheet = {
      front : [null,
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ],
      back : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
      ]
    }
    this.s_sig_8_16_sheet = {
      front : [null,
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'last' , offset : -6},
        { ref: 'first', offset :  6},
        { ref: 'last' , offset : -4},
        { ref: 'first', offset :  4},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ],
      back : [null,
        { ref: 'first', offset :  7},
        { ref: 'last' , offset : -7},
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
        { ref: 'first', offset :  5},
        { ref: 'last' , offset : -5}
      ]
    }
    this.s_sig_8_8_turn = {
      front : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ]
    }
    this.s_sig_8_4_turn = {
      front : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ]
    }
    this.s_sig_8_8_tumble = {
      front : [null,
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'last' , offset : -2},
        { ref: 'first', offset :  2},
        { ref: 'first', offset :  1},
        { ref: 'last',  offset : -1},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  0}
      ]
    }
    this.s_sig_8_8_tumble = {
      front : [null,
        { ref: 'first', offset :  1},
        { ref: 'last' , offset : -1},
        { ref: 'first', offset :  3},
        { ref: 'last' , offset : -3},
        { ref: 'first', offset :  0},
        { ref: 'last',  offset :  0},
        { ref: 'first', offset :  2},
        { ref: 'last' , offset : -2}
      ]
    }
  }
  renderSig(signature, sig, type, svg, count, is_title, paper_stock){
    const paper_name = paper_stock.stock_paper_name
    let _this = this
    let impose_conf = {
      page_width : 75,
      page_height : 100,
      inside_gutter : 0,
      outside_gutter : 10,
      f_b_gutter : 20,
      x:5,
      y:5
    }
    impose_conf.sig_width = impose_conf.outside_gutter * 2 + 
      impose_conf.page_width * signature/2   
    if( signature == 1 ){
      impose_conf.sig_width = impose_conf.outside_gutter * 2 + 
        impose_conf.page_width     
    }
    else if( signature == 8 ){
     impose_conf.sig_width = impose_conf.sig_width + impose_conf.inside_gutter 
       * signature/4 -1
    }
    else if( signature == 16 ){
      impose_conf.sig_width = impose_conf.inside_gutter * 3 + 
        impose_conf.page_width * signature/4 + impose_conf.outside_gutter * 2  
    }
    if( signature == 1 ){
      impose_conf.sig_height = impose_conf.outside_gutter * 2 + 
        impose_conf.page_height
    }
    else{
      impose_conf.sig_height = impose_conf.outside_gutter * 2 + 
        impose_conf.inside_gutter + impose_conf.page_height * 2
    }
    if( signature == 16 ){
      impose_conf.sig_height = impose_conf.sig_height * 2 
        - impose_conf.outside_gutter * 2
    }
    let rect = {
      x:impose_conf.x,
      y:impose_conf.y,
      width: impose_conf.sig_width,
      height: impose_conf.sig_height,
      fill: '#fff',
      stroke: '#000',
      stroke_width: 5,
    }
    let inner_rect = {
      x:impose_conf.x + impose_conf.outside_gutter,
      y:impose_conf.y + impose_conf.outside_gutter,
      width: impose_conf.sig_width - impose_conf.outside_gutter * 2,
      height: impose_conf.sig_height - impose_conf.outside_gutter * 2,
      fill: 'none',
      stroke: '#000',
      stroke_width: 1.5,
    }
    const page_stroke = '#799a27'
    let page_rect = {
      x:impose_conf.x + impose_conf.outside_gutter,
      y:impose_conf.y + impose_conf.outside_gutter,
      width: impose_conf.page_width,
      height: impose_conf.page_height,
      fill: '#fff',
      stroke: page_stroke,
    }
    const svgNS = "http://www.w3.org/2000/svg";
    let GF = document.createElementNS(svgNS, "g");
    let GB = document.createElementNS(svgNS, "g");
    GF.append(_this.createRect(rect))
    for(let i = 1; i <= signature; i ++){
      if(signature == 16 && i % 4 == 1 ){
        if( i != 1 ){
          page_rect.x = impose_conf.x + impose_conf.outside_gutter
        }
        if(i == 1){
          page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter
            - page_rect.height - impose_conf.outside_gutter / 2 
        }
        else if(i == 5){
          page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter * 2
            - page_rect.height * 2 - impose_conf.outside_gutter / 2 
        }
        else if(i == 9){
          page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter * 3
            - page_rect.height * 3 - impose_conf.outside_gutter / 2
        }
        else if(i == 13){
          page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter * 4
            - page_rect.height * 4 - impose_conf.outside_gutter / 2
        }
      }
      let arrow = {
        width_s : 5,
        width_l : 20,
        x : page_rect.x + page_rect.width/2,
      }
      let text = {
        x : page_rect.x + page_rect.width/2,
        text:sig.front[i],
        font_size: 30,
        font_weight: 600,
        color: '#f09423',
      }
      if( i <= signature/2 && 
          ((signature == 8 && type != "turn") || is_title || signature <= 4)){
        arrow.height = 40
        arrow.s_height = 20
        if( is_title == false){
          text.y = page_rect.y + page_rect.height/3 - 20
          arrow.y = page_rect.y + page_rect.height/3 + 5
        }
        else{
          text.y = page_rect.y + page_rect.height - arrow.height - 30
          arrow.y = page_rect.y + page_rect.height - arrow.height - 5
        }
        text.transform = "rotate(180)"
      }
      else if(signature == 16){
        if( i <= 4 || (i >= 9 && i <= 12)){
          arrow.height = -40
          arrow.s_height = -20
          arrow.y = page_rect.y + page_rect.height/3  * 2 - 5
          text.y = page_rect.y + page_rect.height/3 * 2 + 20
        }
        else{
          arrow.height = 40
          arrow.s_height = 20
          text.y = page_rect.y + page_rect.height/3 - 20
          arrow.y = page_rect.y + page_rect.height/3 + 5
          text.transform = "rotate(180)"
        }
      }
      else{
        arrow.height = -40
        arrow.s_height = -20
        if( is_title == false){
          arrow.y = page_rect.y + page_rect.height/3  * 2 - 5
          text.y = page_rect.y + page_rect.height/3 * 2 + 20
        }
        else{
          arrow.y = page_rect.y - arrow.height + 5
          text.y = page_rect.y - arrow.height + 30
        }
      }
      GF.append(_this.createRect(page_rect))
      GF.append(_this.createText(text))
      GF.append(_this.createArrow(arrow))
      if( is_title == true){
        let title_text = {
          x: text.x,
          y: text.y - 10,
          font_weight: 600,
          font_size:10,
          text: 'Title (Cover)',
        }
        if(i <= signature/2){
          title_text.transform = "rotate(180)"
        }
        else{
          title_text.y = text.y + 10
        }
        GF.append(_this.createText(title_text))
        if(sig.front[i] == 1 || sig.front[i] == 4){
          title_text.text = 'Outer'
        }
        else{
          title_text.text = 'Inner'
        }
        if(i <= signature/2){
          title_text.y = title_text.y -10
        }
        else{
          title_text.y = title_text.y +10
        }
        GF.append(_this.createText(title_text))
      }
      if( i == signature/2 ){
        page_rect.x = impose_conf.x + impose_conf.outside_gutter
        page_rect.y = page_rect.y + impose_conf.inside_gutter + page_rect.height
      }
      else{
        page_rect.x = page_rect.x + page_rect.width
      }
      if( i % 2 == 0  && i != signature/2){
        page_rect.x = page_rect.x + impose_conf.inside_gutter
      }
    }
    GF.append(_this.createRect(inner_rect))
    if(type == 'sheet'){
      rect.x = rect.x + impose_conf.sig_width + impose_conf.f_b_gutter
      page_rect = {
        x:rect.x + impose_conf.outside_gutter,
        y:impose_conf.y + impose_conf.outside_gutter,
        width: impose_conf.page_width,
        height: impose_conf.page_height,
        fill: '#fff',
        stroke: page_stroke
      }
      inner_rect.x = inner_rect.x + impose_conf.sig_width + impose_conf.f_b_gutter
      GB.append(_this.createRect(rect))
      for(let i = 1; i <= signature; i ++){
        if(signature == 16 && i % 4 == 1 ){
          if( i != 1 ){
            page_rect.x = rect.x + impose_conf.outside_gutter
          }
          if(i == 1){
            page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter
              - page_rect.height - impose_conf.outside_gutter / 2
          }
          else if(i == 5){
            page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter * 2
              - page_rect.height * 2 - impose_conf.outside_gutter / 2
          }
          else if(i == 9){
            page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter * 3
              - page_rect.height * 3 - impose_conf.outside_gutter / 2
          }
          else if(i == 13){
            page_rect.y = impose_conf.sig_height - impose_conf.inside_gutter * 4
              - page_rect.height * 4 - impose_conf.outside_gutter / 2
          }
        }
        let arrow = {
          width_s : 5,
          width_l : 20,
          x : page_rect.x + page_rect.width/2,
        }
        let text = {
          x : page_rect.x + page_rect.width/2,
          text:sig.back[i],
          font_size: 30,
          font_weight: 600,
          color: '#f09423',
        }
        if( i <= signature/2 && 
            ((signature == 8 && type != "turn") || is_title || signature <= 4)){
          arrow.height = 40
          arrow.s_height = 20
          text.transform = "rotate(180)"
          if( is_title == false){
            text.y = page_rect.y + page_rect.height/3 - 20
            arrow.y = page_rect.y + page_rect.height/3 + 5
          }
          else{
            text.y = page_rect.y + page_rect.height - arrow.height - 30
            arrow.y = page_rect.y + page_rect.height - arrow.height - 5
          }
        }
        else if(signature == 16){
          if( i <= 4 || (i >= 9 && i <= 12)){
            arrow.height = -40
            arrow.s_height = -20
            arrow.y = page_rect.y + page_rect.height/3  * 2 - 5
            text.y = page_rect.y + page_rect.height/3 * 2 + 20
          }
          else{
            arrow.height = 40
            arrow.s_height = 20
            text.y = page_rect.y + page_rect.height/3 - 20
            arrow.y = page_rect.y + page_rect.height/3 + 5
            text.transform = "rotate(180)"
          }
        }
        else{
          arrow.height = -40
          arrow.s_height = -20
          if( is_title == false){
            arrow.y = page_rect.y + page_rect.height/3  * 2 - 5
            text.y = page_rect.y + page_rect.height/3 * 2 + 20
          }
          else{
            arrow.y = page_rect.y - arrow.height + 5
            text.y = page_rect.y - arrow.height + 30
          }
        }
        GB.append(_this.createRect(page_rect))
        GB.append(_this.createText(text))
        GB.append(_this.createArrow(arrow))
        if( is_title == true){
          let title_text = {
            x: text.x,
            y: text.y - 10,
            font_weight: 600,
            font_size:10,
            text: 'Title (Cover)',
          }
          if(i <= signature/2){
            title_text.transform = "rotate(180)"
          }
          else{
            title_text.y = text.y + 10
          }
          GB.append(_this.createText(title_text))
          if(sig.front[i] == 1 || sig.front[i] == 4){
            title_text.text = 'Inner'
          }
          else{
            title_text.text = 'Outer'
          }
          if(i <= signature/2){
            title_text.y = title_text.y -10
          }
          else{
            title_text.y = title_text.y +10
          }
          GB.append(_this.createText(title_text))
        }
        if( i == signature/2 ){
          page_rect.x = rect.x + impose_conf.outside_gutter
          page_rect.y = page_rect.y + impose_conf.inside_gutter + page_rect.height
        }
        else{
          page_rect.x = page_rect.x + page_rect.width
        }
        if( i % 2 == 0  && i != signature/2){
          page_rect.x = page_rect.x + impose_conf.inside_gutter
        }
      }
      let left_text={
        x: impose_conf.x,
        y: impose_conf.y + impose_conf.sig_height + 15,
        text: 'Front',
        anchor: 'start',
        font_weight: 600,
        color:'#000'
      }
      if(signature == 16){
        let cut_text={
          x: impose_conf.x + impose_conf.sig_width + 15,
          y: impose_conf.y + impose_conf.sig_height - impose_conf.page_height 
            - impose_conf.outside_gutter,
          text: 'Cut From Center To Make 3 Folds Signature For Interleaving',
          anchor: 'start',
          font_weight: 600,
          color:'#000',
          transform:"rotate(270)",
          anchor:"start",
        }
        $(GF).append(_this.createText(cut_text))
      }
      let right_text={
        x: impose_conf.x + impose_conf.sig_width * 2 + impose_conf.f_b_gutter,
        y: impose_conf.y + impose_conf.sig_height + 15,
        text: 'Back',
        font_weight: 600,
        anchor: 'end',
        color:'#000'
      }
      if(signature <= 4 || signature == 16){
        left_text.x = impose_conf.x + impose_conf.sig_width + 15
        left_text.y = impose_conf.y + impose_conf.sig_height 
        left_text.transform= "rotate(270)"
        right_text.x = impose_conf.x + impose_conf.sig_width + impose_conf.f_b_gutter - 15
        right_text.y = impose_conf.y + impose_conf.sig_height 
        right_text.transform= "rotate(90)"
      }
      $(GF).append(_this.createText(left_text))
      $(GB).append(_this.createText(right_text))
      GB.append(_this.createRect(inner_rect))
    }
    else{
      let bottom_text = {
        x: impose_conf.x + impose_conf.sig_width/2,
        y: impose_conf.y + impose_conf.sig_height + 15,
        font_weight: 600,
        color:'#000'
      }
      if(signature != 8){
        bottom_text.x = impose_conf.x + impose_conf.sig_width + 15
        bottom_text.y = impose_conf.y + impose_conf.sig_height/2
        bottom_text.transform = "rotate(270)"
      }
      if(type=="turn"){
        bottom_text.text = 'Work & Turn'
      }
      else if(type=="tumble"){
        bottom_text.text = 'Work & Tumble'
      }
      else{
        bottom_text.text = 'Cut & Stack - Front Only'
      }
      $(GF).append(_this.createText(bottom_text))
    }
    count = count+1
    $(GF).addClass("impose_"+count)
    $(GF).addClass("impose_sig")

    if(signature == 16){
      $(GF).attr("transform","rotate(90) translate(-90,-440)")
      $(GB).attr("transform","rotate(-90) translate(-580,460)")
      $(svg).attr("width", "900")
      $(svg).attr("height", "300")
      $(svg).attr("viewBox", "0 0 900 200")
    }
    if(signature == 4){
      $(GF).attr("transform","rotate(90) translate(0,-230)")
      $(GB).attr("transform","rotate(-90) translate(-370,240)")
    }
    if(signature == 2){
      $(GF).attr("transform","rotate(90) translate(0,-230)")
      $(GB).attr("transform","rotate(-90) translate(-220,240)")
    }
    if(signature == 1){
      $(GF).attr("transform","rotate(90) translate(0,-130)")
      $(GB).attr("transform","rotate(-90) translate(-220,140)")
    }
    $(GB).addClass("impose_"+count)
    $(GB).addClass("impose_sig")
    if(count != 1)
    {
      $(GF).addClass("hide")
      $(GB).addClass("hide")
    }
    svg.append(GF)
    svg.append(GB)
  }
  createArrow(arrow){
    const offset_left = arrow.x - arrow.width_s/2
    const offset_top = arrow.y 
    let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    let d = "M" + offset_left + " " + offset_top + " l"+arrow.width_s + " 0" +
      " l0 " + arrow.s_height + " l"+ ((arrow.width_l - arrow.width_s)/2) + " 0"
      + " l"+((arrow.width_l/2)*-1) + " " + (arrow.height - arrow.s_height) +
      " l"+((arrow.width_l/2)*-1) + " " + ((arrow.height - arrow.s_height)*-1)+
      " l"+((arrow.width_l - arrow.width_s)/2) + " 0 Z"

    path.setAttribute("d", d)
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "white");
    return(path)
  }
  createRect(rect){
    const svgns = "http://www.w3.org/2000/svg";
    var svg_rect = document.createElementNS(svgns, "rect");
    svg_rect.setAttribute("x", rect.x);
    svg_rect.setAttribute("y", rect.y);
    svg_rect.setAttribute("width", rect.width);
    svg_rect.setAttribute("height", rect.height);
    svg_rect.setAttribute("fill", rect.fill);
    svg_rect.setAttribute("stroke", rect.stroke);
    if(typeof(rect.stroke_width) != "undefined"){
      svg_rect.setAttribute("stroke-width", rect.stroke_width);
    }
    if(typeof(rect.stroke_dasharray) != "undefined"){
      svg_rect.setAttribute("stroke-dasharray",rect.stroke_dasharray)
    }
    return(svg_rect);
  }
  createText(text){
    var _this = this;
    var svgNS = "http://www.w3.org/2000/svg";
    var newText = document.createElementNS(svgNS,"text");
    var G = document.createElementNS(svgNS, "g");
    var font_size = "100";
    if(typeof(text.font_size) != "undefined"){
      font_size = text.font_size;
    }
    else{
      font_size = _this.font_size;
    }
    G.setAttributeNS(null,"transform","translate("+text.x+","+text.y+")");     
    newText.setAttributeNS(null,"font-size",font_size);
    if(typeof(text.anchor) =="undefined"){
      newText.setAttributeNS(null,"text-anchor","middle");
    }
    else{
      newText.setAttributeNS(null,"text-anchor",text.anchor);
    }
    if(typeof(text.transform) != "undefined")
    {
      newText.setAttributeNS(null,"transform",text.transform);
    }
    if(typeof(text.color) != "undefined")
    {
      newText.setAttributeNS(null,"fill",text.color);
    }
    if(typeof(text.font_weight) != "undefined")
    {
      newText.setAttributeNS(null,"font-weight",text.font_weight);
    }
    var textNode = document.createTextNode(text.text);
    newText.appendChild(textNode);
    $(G).append(newText);
    return(G);
  }
  createPerfectSig(signature, t_sig, type, first_page, row, is_title = false){
    let _this = this
    let sig = { front:[null],
            back :[null]
    }
    let pages_in_row = row.pages_in_row
    if(typeof(row.inner_pgs_printed) != "undefined" && row.inner_pgs_printed == 2){
      pages_in_row = 2
      let sample_sig = _this.sigs.perfect['p_' + signature + '_title_blank' ] 
      return(sample_sig)
    }
    let pages_left = pages_in_row - first_page + 1
    if(pages_left < signature){
      pages_left = t_sig * 2
    }
    let sample_sig = _this.sigs.perfect['p_' + signature + '_' + type] 
    if(pages_left < signature){
      sample_sig = _this.sigs.perfect['p_' + signature + '_' + type + '_' + pages_left] 
    }
    for(let i = 1; i <= signature; i++){
      if(signature == 8 && type == "turn" && is_title == true){
        sig.front[i] = sample_sig.title_front[i] + first_page - 1
      }
      else{
        sig.front[i] = sample_sig.front[i] + first_page - 1
      }
      if( type == 'sheet' ){
        sig.back[i] = sample_sig.back[i] + first_page - 1
      }
    }
    return(sig)
  }
  createSaddleSig(signature, pages, type, first_page, last_page){
    let _this = this
    let sample_sig = _this['s_sig_' + signature + '_' + pages + '_' + type]
    let sig = {front:[null],
               back :[null]}
    for(let i = 1; i <= signature; i++){
      if(sample_sig.front[i].ref == 'first'){
        sig.front[i] = first_page + sample_sig.front[i].offset
      }
      else if(sample_sig.front[i].ref == 'last'){
        sig.front[i] = last_page + sample_sig.front[i].offset
      }
      if(typeof(sample_sig.back) != 'undefined'){
        if(sample_sig.back[i].ref == 'first'){
          sig.back[i] = first_page + sample_sig.back[i].offset
        }
        else if(sample_sig.back[i].ref == 'last'){
          sig.back[i] = last_page + sample_sig.back[i].offset
        }
      }
    }
    return(sig)
  }
}

class PO{
  constructor(row){
    let _this = this
    //the row that was changed
    _this.row = row
    
    //the select box for the job source
    _this.job_source = $(row).find("select.job_source")
    
    //get the process name
    _this.process_name = $(_this.row).find(".name").html()

    //get the process type 
    _this.process_type = $(_this.row).find(".name").attr("process_type")
    
    //the job ticket modal id
    _this.job_ticket_modal = "#PDF_Options_Job_Ticket"
    
    //tthe PO form modal
    _this.po_modal = "#Process_PO_Modal"

    _this.enablePOActions()
  }
  
  enablePOActions(){
    let _this = this

    //process location changed
    $(_this.job_source).change(function(){
      
      _this.clearProcessRow() 
      
      _this.processLocationChanged()
    })
  }

  processLocationChanged(){
    let _this = this
    
    const po_modal = "#Process_PO_Modal"

    //job source location one of "", "in-house", and "out-source"
    _this.job_location = $(_this.job_source).val()
    
    $(_this.job_ticket_modal + " .purchase-orders")
      .find(".po." + _this.process_type).remove()
    if(_this.job_location == "in-house"){
      //process is in-house
      
      //make the back ground white
      $(_this.job_source).addClass("bg-white")
      
      $(po_modal + " .po_header").html("Process Order")
      
      $(po_modal + " .vendor_div").hide()
    }
    else if(_this.job_location == "out-source"){
      //process is out-source
      
      //make the back ground green
      $(_this.job_source).addClass("bg-green")
      
      $(po_modal + " .po_header").html("Purchase Order")
      
      $(po_modal + " .vendor_div").show()
    }
    else{
      return
    }
    
    //add the details for the process to the form 
    _this.addDetailsToPOForm(_this.process_type)

    $(po_modal).show()
    _this.enableSaveUpdatePO(_this.row)
  }
  
  clearProcessRow(){
    let _this = this
    
    //get reference to the notes div
    const notes_div = $(_this.row).find(".notes")
    
    //get reference to the PO div
    const po_divs = $(_this.row).find(".po_div div")
    
    //remove background colors
    $(_this.job_source).removeClass("bg-white")
    $(_this.job_source).removeClass("bg-green")
    
    //clear notes and PO
    $(po_divs).html("")
    $(notes_div).html("")
  }
  
  addPagesCountToPOForm(){
    let _this = this
    let pages = 1
    if( window.module == "book" || window.module == "multi_sheet" ){
      pages = $(_this.job_ticket_modal + " .total_pgs").html()
    }
    const html = `<div class="table-row data">
      <label>Pages' Count</label>
      <div class="pages_count data">` + pages + '</div></div>'
    $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
  }
  addPageSizeToPOForm(){
    let _this = this
    const page_size = $(".job_size_inputs .closed_job_size_w").val() + '" x '
      + $(".job_size_inputs .closed_job_size_h").val() + '"'
    const html = `<div class="table-row data">
      <label>Page Size</label>
      <div class="pages_size data">` + page_size + '</div></div>'
    $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
  }
  
  addTitleDesignOptionToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Title Designing</label>
      <div class="title-designing">
        <select class="title-designing">
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addPlateTypeToPOForm(){
    let _this = this
    const plate_type = $(_this.job_ticket_modal + " .plate_type").val()
    //user has not selected plate type
    if(plate_type == ""){
      window.xpress.modalAlert("alert",
        "Please Select Plate Type",
        "Please Select Plate Type In Job Ticket First", "failure")
      throw 'User did not select plate type'
    }
    const html = `<div class="table-row data">
      <label>Plate Type</label>
      <div class="plate_type data">` + plate_type + '</div></div>'
    $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
  }
  
  addNumberOfPlatesToPOForm(){
    let _this = this
    const plates = $(_this.job_ticket_modal + " .total_plates").html()
    const html = `<div class="table-row data">
      <label>Number of Plates</label>
      <div class="plate_type data">` + plates + '</div></div>'
    $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
  }
  addPlatePressSizeToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Plate (Press) Size</label>
      <div class="plate-press-size">
        <input class="plate-press-size"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  addImpositionFileSelectToPOForm(){
    let _this = this
    let html =  `<div class="table-row data">
      <label>File Preparation</label>
      <div class="attached-file">
        <select class="attached-file">
          <option value="">Select</option>
          <option value="Ready File (Only Exposing)">
            Ready File (Only Exposing)
          </option>
          <option value="To Be Prepared By You">
            To Be Prepared By You
          </option>
        </select>
      </div>
    </div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addPaperNameToPOForm(){
    let _this = this
    const paper_name = $(_this.row).find(".paper_details").html()
    const html = `<div class="table-row data">
      <label>Paper</label>
      <div class="paper-details">` + paper_name + '</div></div>'
    $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
  }
  
  addCutSheetSizeToPOForm(){
    let _this = this
    const sheet_size = $(_this.row).find(".cut_sheet_size").html()
    const html = `<div class="table-row data">
      <label>Cut Sheet Size</label>
      <div class="sheet_size">` + sheet_size + '</div></div>'
    $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
  }
  
  addNumCutSheetsToPOForm(){
    let _this = this
    const sheets = $(_this.row).find(".total_outs").html()
    const html = `<div class="table-row data">
      <label>Number of Cut Sheets</label>
      <div class="num-sheets">` + sheets + '</div></div>'
    $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
  }
  
  addProcessSideToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Process Side/s</label>
      <div class="process-side">
        <select class="process-side">
          <option value="">Select</option>
          <option value="Single Side">Single Side</option>
          <option value="Both Sides">Both Sides</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addNumFoldsToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Number of Folds</label>
      <div class="num-folds">
        <select class="num-folds">
          <option value="">Select</option>
          <option value="One">One</option>
          <option value="Two">Two</option>
          <option value="Three">Three</option>
          <option value="Four">Four</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addBlanketSelect(process_type){
    let _this = this
    let label = "Blanket"
    if( process_type == "uv-coating-flood" ){
      label = "Blanket (For 'SPOT-NOT' UV Cut Out)"
    }
    const html = `<div class="table-row data">
      <label>` + label + `</label>
      <div class="blanket-for-uv">
        <select class="blanket-for-uv">
          <option value="">Select</option>
          <option value="Not Applicable">Not Applicable</option>
          <option value="By Us">By Us</option>
          <option value="To Be Used By You">To Be Used By You</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addPunchingMCToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Punching M/c Type/Size</label>
      <div class="punching-mc-type">
        <select class="punching-mc-type">
          <option value="">Select</option>
          <option value="Treadle M/c">Treadle M/c</option>
          <option value="Foot / Hand Operated M/c">Foot / Hand Operated M/c</option>
          <option value="Manual Platen M/c">Manual Platen M/c</option>
          <option value="Automatic Flatbed M/c">Automatic Flatbet M/c</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addPunchDieNumberToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Punch Die Number or Ref</label>
      <div class="punch-die-num">
        <input type="text" class="punch-die-num"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)

  }
  
  addPunchDieFileSelectToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Artwork / Drawing File:</label>
      <div class="die-block">
        <select class="die-block">
          <option value="">Select</option>
          <option value="Attached">Attached</option>
          <option value="To be processed by you">To be processed by you</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addDieSupplyToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Artwork / Drawing File:</label>
      <div class="die-block">
        <select class="die-block">
          <option value="">Select</option>
          <option value="Attached">Attached</option>
          <option value="To be processed by you">To be processed by you</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addFilmTypeAndThicknessToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Film Type & Thickness in Micron</label>
      <div class="film-type-and-thickness">
        <input class="film-type-and-thickness"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }

  addCoatingTypeToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Coating Type</label>
      <div class="coating-type">
        <select class="coating-type">
          <option value="">Select</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Matte Gold">Matte Gold</option>
          <option value="Matte Silver">Matte Silver</option>
          <option value="Copper">Copper</option>
          <option value="Metallic">Metallic</option>
          <option value="Other">Other (Specify)</option>
        </select>
        <input class="coating-type-other hide"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
    $(_this.po_modal + " select.coating-type").change(function(){
      if($(this).val() == "Other"){
        $(_this.po_modal + " div.coating-type").addClass("other-selected")
        $(_this.po_modal + " .coating-type-other").show()
        $(_this.po_modal + " .coating-type-other").focus()
      }
      else{
        $(_this.po_modal + " div.coating-type").removeClass("other-selected")
        $(_this.po_modal + " .coating-type-other").hide()
      }
    })
  }
  
  addUVCoatingTypeToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Coating Type</label>
      <div class="coating-type">
        <select class="coating-type">
          <option value="">Select</option>
          <option value="High Gloss Finish">High Gloss Finish</option>
          <option value="Matte Finish">Matte Finish</option>
          <option value="Satin Finish">Satin Finish</option>
          <option value="Textured Finish">Textured Finish</option>
          <option value="Other">Other (Specify)</option>
        </select>
        <input class="coating-type-other hide"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
    $(_this.po_modal + " select.coating-type").change(function(){
      if($(this).val() == "Other"){
        $(_this.po_modal + " div.coating-type").addClass("other-selected")
        $(_this.po_modal + " .coating-type-other").show()
        $(_this.po_modal + " .coating-type-other").focus()
      }
      else{
        $(_this.po_modal + " div.coating-type").removeClass("other-selected")
        $(_this.po_modal + " .coating-type-other").hide()
      }
    })
  }

  addPunchingTypeToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Punching M/c Type/Size</label>
      <div class="punching-mc-type">
        <select class="punching-mc-type">
          <option value="">Select</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="Other">Other</option>
        </select>
        <input class="punching-mc-type-other"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
    $(_this.po_modal + " select.punching-mc-type").change(function(){
      if($(this).val() == "Other"){
        $(_this.po_modal + " div.punching-mc-type").addClass("other-selected")
        $(_this.po_modal + " .punching-mc-type-other").show()
        $(_this.po_modal + " .punching-mc-type-other").focus()
      }
      else{
        $(_this.po_modal + " div.punching-mc-type").removeClass("other-selected")
        $(_this.po_modal + " .punching-mc-type-other").hide()
      }
    })
  }
  
  addNumbingProcessToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Process By</label>
      <div class="process-by">
        <select class="process-by">
          <option value ="">Select</option>
          <option value ="Hand Numbering">Hand Numbering</option>
          <option value ="Machine Numbering">Machine Numbering</option>
          <option value ="Digital Numbering">Digital Numbering</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  addNumbingStartToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Start Numbering From</label>
      <div class="start-numbering">
        <input class="start-numbering"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }
  
  addWoodenDieNumRefPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Wooden Die Number or Ref</label>
      <div class="wooden-die-num-ref">
        <input class="wooden-die-nem-ref"></input>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }

  addSPDieSupplyToPOForm(){
    let _this = this
    const html = `<div class="table-row data">
      <label>Die/Block</label>
      <div class="die-block">
        <select class="die-block">
          <option value ="">Select</option>
          <option value ="Supplied By Us">Supplied By Us</option>
          <option value ="To Be Prepared By You">To Be Prepared By You</option>
        </select>
      </div></div>`
    $(_this.po_modal + " .process_details").append(html)
  }

  addDetailsofSidesToPOForm(){
    let _this = this
    const sides = window.calc.getInput(1,"sel_print_sides")
    if( sides == 1 ){
      const html = `<div class="table-row data">
        <label>Details of Sides</label>
        <div class="sides-details">
          One Front/Back Same
        </div></div>`
      $(html).insertBefore(_this.po_modal + " .process_details .vendor_div")
    }
    else if( sides == 2 ){
      const html = `<div class="table-row data">
        <label>Details of Sides</label>
        <div class="sides-details">
          <select class="sides-details">
            <option value ="">Select</option>
            <option value ="One Front/Back Same">One Front/Back Same</option>
            <option value ="Two Front/Back Different">Two Front/Back Different</option>
          </select>
        </div></div>`
      $(_this.po_modal + " .process_details").append(html)
    }
  }

  async downloadPO(){
    let _this = this
    $("#loadingModal").show()
    const pdf_modal = _this.job_ticket_modal + " .purchase-orders ." + _this.process_type
    const po_num = $(pdf_modal).find(".po_num").attr("po_num")
    const url = "ajax_api.php?action=getPDF&pdf_type=po&po_num=" + po_num
    window.location.href = url
    $("#loadingModal").hide()
  }

  //adds Details to the Purchase Order Form 
  addDetailsToPOForm(process_type){
    let _this = this
    //add the process name
    $(_this.po_modal).find(".process_name").html(_this.process_name)
    //remove all previous details
    $(_this.po_modal + " .process_details .data").remove()
    if(process_type == "dtp-design"){
      _this.addPagesCountToPOForm()
      _this.addPageSizeToPOForm()
      if( window.module == "book"){
        _this.addTitleDesignOptionToPOForm()
      }
      else if( window.module == "single_sheet" ||
        window.module == "box"){
        _this.addDetailsofSidesToPOForm()
      }
    }
    else if(process_type == "plate-making"){
      _this.addPlateTypeToPOForm()
      _this.addNumberOfPlatesToPOForm()
      _this.addPlatePressSizeToPOForm()
      _this.addImpositionFileSelectToPOForm()
    }
    else if(process_type == "lamination-matt"  ||
            process_type == "lamination-gloss" ||
            process_type == "met-pet"          ){

      _this.addPaperNameToPOForm()
      _this.addCutSheetSizeToPOForm()
      _this.addNumCutSheetsToPOForm()
      _this.addProcessSideToPOForm()
      _this.addFilmTypeAndThicknessToPOForm()
      _this.addCoatingTypeToPOForm()
    }
    else if(process_type == "blister"          ){
      _this.addPaperNameToPOForm()
      _this.addCutSheetSizeToPOForm()
      _this.addNumCutSheetsToPOForm()
      _this.addProcessSideToPOForm()
      _this.addDieSupplyToPOForm()
    }
    else if(process_type == "spotuv"          ||
            process_type == "foil-stamping"    ||
            process_type == "embossing"        ){
      _this.addPaperNameToPOForm()
      _this.addCutSheetSizeToPOForm()
      _this.addNumCutSheetsToPOForm()
      _this.addProcessSideToPOForm()
      _this.addSPDieSupplyToPOForm()
    }
    else if(process_type == "uv-coating-flood" ||
            process_type == "varnishing"       ||
            process_type == "drip-off"         ||
            process_type == "aqueous-coating"  ){
      _this.addPaperNameToPOForm()
      _this.addCutSheetSizeToPOForm()
      _this.addNumCutSheetsToPOForm()
      _this.addProcessSideToPOForm()
      _this.addUVCoatingTypeToPOForm()
      _this.addBlanketSelect(process_type)
    }
    else if(process_type == "creasing-scoring"   ||
            process_type == "creasing-die-punch" ){
      _this.addPaperNameToPOForm()
      _this.addCutSheetSizeToPOForm()
      _this.addNumCutSheetsToPOForm()
      _this.addPunchingMCToPOForm()
      _this.addPunchDieNumberToPOForm()
    }
    else if(process_type == "numbing"            ){
      _this.addPaperNameToPOForm()
      _this.addCutSheetSizeToPOForm()
      _this.addNumCutSheetsToPOForm()
      _this.addNumbingProcessToPOForm()
      _this.addNumbingStartToPOForm()
    }
    else if(process_type == "punch-die"  ||
            process_type == "blanket-uv" ||
            process_type == "zinc-block" ){
      _this.addPunchDieFileSelectToPOForm()
    }
    else if(process_type == "folding-hand-mc"){
      _this.addPaperNameToPOForm()
      _this.addCutSheetSizeToPOForm()
      _this.addNumCutSheetsToPOForm()
      _this.addNumFoldsToPOForm()
    }
    $(_this.po_modal + " select, " + _this.po_modal + " input")
      .change(function(){
        if($(this).val() == ""){
          $(this).removeClass("bg-white")
        }
        else{
          $(this).addClass("bg-white")
        }
      })
  }
  enableSaveUpdatePO(row){
    let _this = this
    const modal = "#Process_PO_Modal"
    const save_button = modal + " .create-po"
    $(save_button).off("click")
    $(save_button).click(function(){
      const process_name = $(modal + " .process_name").html().trim()
      const notes = $(modal + " textarea.notes").val()
      let vendor_id = 0
      let vendor = []
      if(_this.job_location == "out-source"){
        vendor_id = $(modal + " .vendors").val()
        vendor = filterVendor(vendor_id)
      }
      
      const action  = "create_po"
      $("#temp_div").remove()
      $("body").append('<div id="temp_div"></div>')
      let temp_div = "#temp_div"
      let process_details = $(modal + " .process_details").html()
      $(temp_div).html(process_details)
      let details_inputs = []
      let service_data = []
      $(modal + " .process_details .table-row").each(function(i,d){
        const label = $(d).find("label").html()
        const name = $(d).find("div").attr("class")
        const num_inputs = $(d).find("div").find("select, input").length
        let value = ""
        if(num_inputs == 0){
          value = $(d).find("div").html()
        }
        else if(num_inputs == 1){
          value = $(d).find("div").find("select, input").val()
        }
        service_data.push({label, name, value})
      })
      $(modal + " .process_details").find("select, input")
        .each(function(i,d){
          details_inputs.push($(d).val())
      })
      $(temp_div).find("select, input")
        .each(function(i,d){
          $(this).replaceWith('<span>'+ details_inputs[i]+'</span>')
      })
      const notes_html = `<div class="table-row">
        <label>Specific Instructions (if Any)</label>
        <div class="notes">` + notes + '</div></div>'
      $(temp_div).append(notes_html)
      const service = $(temp_div).html()
      const estimate_num = $("#quote_no").val()
      const customer_id = $("#customer").attr("data-id")
      const job_ref = $("#job_ref").val()
      $("#temp_div").remove()
      let params = {
        action,
        vendor_id,
        service,
        service_data,
        notes,
        module: window.module,
        estimate_num,
        customer_id,
        po_name: process_name,
        po_type: _this.process_type,
      }
      $.post("ajax_api.php",params,function(data){
        let date = getDate("")
        date = formatDate(date)
        date = date.split(" ")
        date = date[0]
        let pdf_modal = "#Process_PO_PDF_Modal"
        if(_this.job_location == "in-house"){
          pdf_modal = "#Process_PO_PDF_Modal_in_house"
        }
        let user_details = window.user_details
        const company_address = user_details.address1 + " " + user_details.address2
          + " " + user_details.city
        let po_num = data.resp.po_num_year.split("/")
        po_num.splice(1,0,estimate_num)
        po_num = po_num.join("/")
        $(pdf_modal + " .po_num").html(po_num)
        $(pdf_modal + " .job_ref").html(job_ref)
        $(pdf_modal + " .po_date").html(date)
        $(pdf_modal + " .po_num").attr("po_num", data.resp.po_num)
        if(_this.job_location == "out-source"){
          $(pdf_modal + " .vendor_name").html(vendor.company_name)
          $(pdf_modal + " .vendor_email").html(vendor.email)
          $(pdf_modal + " .vendor_address").html(vendor.address)
          $(pdf_modal + " .vendor_phone").html(vendor.contact_number)
          $(row).find(".vendor_id").html(vendor_id)
          $(row).find(".vendor_name").html(vendor.company_name)
          $(row).find(".vendor_email").html(vendor.email)
        }
        $(pdf_modal + " .company_phone").html(user_details.contact)
        $(pdf_modal + " .company_address").html(company_address)
        $(pdf_modal + " .company_name").html(user_details.company_name)
        $(pdf_modal + " .company_email").html(user_details.email)
        $(pdf_modal + " .company_contact").html(user_details.name)
        $(pdf_modal + " .process_details").html(service)
        $(pdf_modal + " .process_name").html(process_name)
        $(pdf_modal + " .process_details .vendor_div").remove()
        $(row).find(".po_num").html(data.resp.po_num_year)
        $(row).find(".po_id").html(data.resp.po_num)
        $(row).find(".notes").html(notes)
        const po_content = '<div class="po ' + _this.process_type + '">' 
          + $(pdf_modal + " .modal-content").html() + '</div>'
        $(_this.job_ticket_modal + " .purchase-orders")
          .find(".po." + _this.process_type).remove()
        $(_this.job_ticket_modal + " .purchase-orders").append(po_content)
        $(modal).hide()
        $(pdf_modal + " .download-po").off("clicked")
        $(pdf_modal + " .download-po").click(function(){
            _this.downloadPO()
        })
        $(_this.job_ticket_modal + " .purchase-orders ." + _this.process_type)
          .find(".edit-po").click(function(){
          $(_this.row).find("select.job_source").change() 
        })
        $(_this.job_ticket_modal + " .purchase-orders ." + _this.process_type)
          .find(".download-po").click(function(){
            _this.downloadPO()
        })
      })
    })
  }
}
