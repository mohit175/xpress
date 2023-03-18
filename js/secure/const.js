//multiplier for per 1000 calculations
const _per_1000_ = 1000

//conversion factor for mm to inches
const _mm_inch_conv_ = 25.4

//conversion factor for cm to inches
const _cm_inch_conv_ = 2.54

//module
const url = window.location.href;
const url_split = url.split('/');
const _module_ = url_split[url_split.length - 1].split('.')[0]
