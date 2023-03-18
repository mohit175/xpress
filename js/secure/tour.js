/*
 * File for the tour function 
 *
 * This file will have the tour function and uses the guides script from 
 * http://ejulianova.github.io/guides/
 * This script also use jquery
 *
 * @package xpress
 * @ver 1.0
 * @copy xPressTech 2022
 */

/*
 * function that runs the tour
 *
 * This function runs the tour.
 * The guides variable is inside this function so that by the time the variable
 * is created all the required data has been loaded.
 */
function runTour(){

  var guides = $.guides({
    guides:[
      /***********************************************************************/
      /* DO NOT EDIT ABOVE THIS LINE******************************************/
      /***********************************************************************/

      //the guides that will be shown
      //every guide starts with {
      {
        html:'Click2Learn में आपका स्वागत है। यहां हम एक-एक करके एक्सप्रेस कोट सॉफ्टवेयर के कार्यों को समझेंगे '
                  +'और सीखेंगे। आपको बस स्क्रीन पर दी गई समझ को पढ़ना है, समझना है और माउस से उस पर क्लिक करना है।',
        actions:[{
          element: $("#log_out"),
          type: "click"
        }]
      },{
        html: 'एक्सप्रेस कोट सॉफ्टवेयर में लॉग इन करने पर, सब से पहले मॉड्यूल सिलेक्शन पेज खुलेगा। यहां सॉफ्टवेयर के '
                  +'विभिन्न मॉड्यूल के आइकॉन दिए गए हैं। यह आइकन इस बात का विवरण देता है कि किस मॉड्यूल में किस तरह के '
                  +'प्रिन्टिंग के काम का एस्टिमेट बनाया जा सकता है।'
      },{
        html : '﻿Click2Learn માં આપનું સ્વાગત છે. અહીં આપણે Xpress Quote સોફ્ટવેરના ફંક્શન્સ એક '
                   +'પછી એક સમજીશું અને શીખીશું. આપે ફક્ત સ્ક્રીન પર આપેલી સમજણ વાંચી, સમજીને માઉસથી ક્લિક કરતા જવાનું છે.'
      },{
        html : 'Xpress Quote સોફ્ટવેરમાં લૉગિન કરતા, સૌ પ્રથમ ‘મોડ્યુલ સિલેક્શન પેજ’ ખુલશે. અહીં '
                  +'સોફ્ટવેર ના અલગ અલગ મોડ્યુલ્સ ના આઈકોન આપેલ છે. આ આઈકોન માં કયા મોડ્યુલ માં કયા પ્રકારનું '
                  +'કામ થઈ શકે છે તેની વિગતો આપેલી છે. '
      }],
    
      /***********************************************************************/
      /* DO NOT EDIT BELOW THIS LINE******************************************/
      /***********************************************************************/
    render: function(d){
      var current = d.sender._current;
      var guides = d.sender.options.guides;
      var actions = guides[current].actions;
      if(typeof(actions) == "undefined"){
        return;
      }
      actions.forEach(function(action){
        var element = action.element;
        if(action.type == 'val'){
          var text = action.text;
          $(element).val(text);
        }
        else if(action.type == 'click'){
          $(element).click();
        }
        else if(action.type == 'change'){
          $(element).change();
        }
      });
    }
  });
  
  guides.start();
}
$(document).ready(function(){
  $("#tour_button").click(function(e){
    runTour();
  });
});
