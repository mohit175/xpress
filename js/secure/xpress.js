/*
 * File for Class xpress 
 *
 * @ver 1.0
 * @author Anil Desai
 * @copy xPressTech 2022
 */

/*
 * Class xpress
 *
 * This class handles the generic functions of the xPressQuote software
 *
 * Over time all the functions will be migrated to be used through this class
 *
 * @requires paper class
 * @requires templates class
 */
class XPRESS extends TEMPLATES{

  /*
   * Constructor for xpress class
   * 
   * Sets up the class for use
   * @param string module the module that is in use
   */
  constructor( module ){
    super()
    let _this = this;
    _this.module = module
    _this.paper = new PAPER()
    _this.binding = new BINDING( module )
    window.binding = _this.binding
    _this.enableActions()
  }
  
  /*
   * Custom alert type
   * 
   * Custom alert type to use in place of the default browser alert and confirm
   * dialogs as we can provide much more customization
   *
   * @param type The type of alert (one of alert or confirm)
   * @param header The title of the alert (full html)
   * @param body The text of the alert (full html)
   * @param width The width of the alert
   * @param alert_status The status to convey to the user (one of info, success 
   *  and failure)
   * @param button_text The button text for "alert" type alerts, for confirm
   *  type alerts the button text will be an array of length 2 with the first
   *  for resolve and second for reject
   * @param buttons An array of buttons to be used with "confirm" type alerts,
   *  these buttons (if provided) will override the default buttons and the
   *  button_text
   *   the buttons are objects as such
   *   { text: 'the button text',
   *     button_type: one of confirm or cancel to use for resolve/reject,
   *      multiple buttons can be of any of the types.
   *     callback: function to run when button is clicked, if no callback is
   *     provided clicking the button will close the alert, and resolve, reject
   *     according to button type
   *     cssClass: cssClass to add to the button (if any)
   *   }
   * @param modal The modal to use for the alert
   *
   * @return returns a promise for confirm type alert which resolves when the
   *  "sucess" button is clicked and rejects when the "failure" button is
   *  clicked
   */
  modalAlert(type, header, body,
    alert_status = "info",
    button_text = "OK", 
    width = "max-content",
    buttons = [], 
    modal = "#alertModal"){
    
    //make a failure alert easy to spot
    if(alert_status == "failure"){
      //show the hand
      $(modal).find(".modal-body .hand_stop").removeClass("hide");
    }
    else{
      //hide the hand
      $(modal).find(".modal-body .hand_stop").addClass("hide");
    }
    
    //set the width
    $(modal).find(".modal-content").css("width", width);
    
    //set the header text
    $(modal).find(".header-text").html(header);
    
    //set the body
    $(modal).find(".modal-body .message").html(body);
    
    //remove hide class from x button in case it has been added before
    $(modal).find(".close").removeClass("hide");
    
    //set the ok button for "alert" type of alerts
    //the ok button appears in the footer
    //the ok button has class close so that it will close the alert
    if( type == "alert"  || type == "info" ){
      var footer_html = '<button class="quote_buttons close">' + button_text 
        + '</button>';
      $(modal).find(".modal-footer").html(footer_html);
    }
    
    else if( type == "confirm" ){
      //alert type is confirm
      //hide the close x button so the user has to choose one of the provided
      //actions
      $(modal).find(".close").addClass("hide");
      
      if(buttons.length == 0 ){
        //custom buttons not provided
        if(typeof(button_text) == "string"){
          //custom text for buttons not provided
          var confirm_text = "OK";
          var cancel_text = "Cancel";
        }
        else{
          //custom text has been provided for the buttons
          var confirm_text = button_text[0];
          var cancel_text = button_text[1];
        }
        var footer_html = '<button class="quote_buttons  close confirm">' 
          + confirm_text + '</button>' 
          + '<button class="quote_buttons close cancel">'
          + cancel_text + '</button>';
        $(modal).find(".modal-footer").html(footer_html);
      }
      
      //create a promise to return 
      const promise = new Promise((resolve,reject) => {
        $(modal).find(".modal-footer").find(".confirm").click(function(e){
          resolve(1);
        });
        $(modal).find(".modal-footer").find(".cancel").click(function(e){
          reject(1);
        });
      });
      //show the alert
      $(modal).removeClass("hide");
      
      //let the ok and x button close the alert
      $(modal).find(".close").click(function(e){
        $(modal).addClass("hide");
      });
      return(promise);
    }
    
    //show the alert
    $(modal).removeClass("hide");
    
    //let the ok and x button close the alert
    $(modal).find(".close").click(function(e){
      $(modal).addClass("hide");
    });
  }
}
