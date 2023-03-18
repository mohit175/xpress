/*
 * File for general functions used througout the site
 *
 * File used to keep generic functions used throughout the site
 * 
 * @copy CyberPacific 
 * @package cpjs
 * @version 1.0
 */

/*
 * Function to floor a number
 * 
 * Function to floor a number
 * 
 * @param number num The number to floor
 * @param number(int) precision The precision to floor to.(Number of digits after
 * decimal point.
 */
function floor(num, precision){
  //parseInt to convert precision to integer if the given value is not an
  //integer
  precision = parseInt( precision )
  //parseFloat the number if the given value is not a number
  num = parseFloat( num )
  
  //return false if provided values are not valid
  if( isNaN( precision ) || isNaN( num ) ){
    return( false )
  }
  
  //calculate the multiplier 
  const multiplier = Math.pow( 10 , precision )
  
  //round the number
  const floored = Math.round( num * multiplier ) / multiplier
  
  return( floored )
}

function isPowerOfTwo(n){
  var x = Math.pow(2, Math.round(Math.log(n) / Math.log(2)));
  return x == n;
}

/*
 * Function to round a number
 * 
 * Function to round a number
 * 
 * @param number num The number to round
 * @param number(int) precision The precision to round to.(Number of digits after
 * decimal point.
 */
function round(num, precision){
  //parseInt to convert precision to integer if the given value is not an
  //integer
  precision = parseInt( precision )
  //parseFloat the number if the given value is not a number
  num = parseFloat( num )
  
  //return 0 if provided values are not valid
  if( isNaN( precision ) || isNaN( num ) ){
    return( 0 )
  }
  
  //calculate the multiplier 
  let multiplier = Math.pow( 10 , precision )
  
  //round the number
  let rounded = Math.round( num * multiplier ) / multiplier
  
  return( rounded )
}

/*
 * Function to pad a string or number on the left
 * 
 * Function to pad a string or number on the left
 * 
 * @param number | string to_pad The number or string to pad
 * @param int length The length to pad to.
 * @param string pad_string The string to pad with
 * @param int precision the precision to round the to_pad to
 */
function padStart( to_pad, length, pad_string = ' ', precision = null){
  //validate the precision if set
  if( precision != null ){
    precision = parseInt( precision )
    if( isNaN( precision ) ){
      precision = null
    }
  }
  
  //if presicion is set round to_pad to the precision
  if( precision != null ){
    to_pad = fixed( to_pad, precision )
  }
  
  //validate the length
  length = parseInt( length )
  if( typeof( length ) == "undefined" ){
    return( to_pad )
  }
  
  //convert to_pad to string
  to_pad = to_pad.toString()
  //pad the string
  let padded = to_pad.padStart( length, pad_string )
  return( padded )
}

/**
 * Gets the estimate date and time in mysql date format
 *
 * Gets the estimate date and time (or current date and time if estimate date 
 * is not set in mysql date format
 */
function getDate(date_to_convert = $("#quote_date").val()){
  //get the estimate date
  let date = new Date(date_to_convert)
  if(date.toString() == 'Invalid Date'){
    //invalid date so set todays date
    date = new Date()
  }
  
  //get the parts of date 
  const day_of_month = date.getDate()
  const month = date.getMonth() + 1
  const fullyear = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  //generate mysql date
  const mysql_date = fullyear + '-' + month + '-' + day_of_month + ' ' + hours 
    + ':' + minutes + ':00'
  return(mysql_date)
}

/**
 * Formats mysql date into user viewable date 
 *
 * Formats mysql date format into user viewable date (dd/mm/yyyy hh:mm)
 *
 * @param string date the mysql date formatted string
 */
function formatDate(date){
  let date_time = date.split(" ");
  date_parts = date_time[0].split('-');
  time_parts = date_time[1].split(':');
  const format_date = date_parts[2] + '/' + date_parts[1] + '/' + date_parts[0]
    + ' ' + time_parts[0] + ':' + time_parts[1];
  return(format_date);
}

function fixed(num, precision, type='round'){
  let rounded = 0;
  switch(type){
    case 'round':
      rounded = round(num, precision).toFixed(precision)
      break
  }
  return(rounded)
}

function sheetToKG(width, height, gsm, sheets){
  //inch to meter conversion factor
  const in_to_meter = 0.0254
  
  //convert width and height to m
  width = width * in_to_meter
  height = height * in_to_meter
  
  //calculate grams per sheet
  const gram_per_sheet = gsm * width * height
  //calculate total grams for all sheets
  const total_grams = Math.floor( gram_per_sheet * sheets )
  const kg = total_grams/1000
  return(kg)
}
