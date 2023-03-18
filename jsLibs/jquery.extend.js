jQuery.fn.extend({
  ondragstart : function(fn){
    return this.each(function(i, element){
      element.addEventListener("dragstart", function(event){
        fn(event,element);
      });
    });
  },
  ondragend : function(fn){
    return this.each(function(i, element){
      element.addEventListener("dragend", function(event){
        fn(event,element);
      });
    });
  },
  hide : function(fn){
    return this.each(function(i, element){
      if(typeof(fn) == "function"){
        fn();
      }
      $(element).trigger("beforehide");
      $(element).addClass("hide");
    });
  },
  show : function(fn){
    return this.each(function(i, element){
      if(typeof(fn) == "function"){
        fn();
      }
      $(element).removeClass("hide");
      $(element).trigger("onshow");
    });
  }
});
