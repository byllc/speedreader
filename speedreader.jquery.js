function displayPanelAndWait(targetContainer,panelArray,waitPeriod,index){
  targetContainer.html(panelArray[index]);
  console.log(index)
  if(Number(index) < panelArray.length){
    setTimeout( function(){ displayPanelAndWait(targetContainer,panelArray,waitPeriod,++index) }, waitPeriod )
  }
}

( function( $ ) { 
  
  // Initialize a container for speed reading .
  $.fn.speedReadable = function(options){
    var container = $(this);
    
    //all options initialized for reference
    options = $.extend({
      wordsPerPanel :  2      , //how many words will display in each frame
      wordsPerMinute :  100    , //how many words will display in a minute
      toggleId : container    , //the jquery object,id,class or elment that toggles speedreading
      toggleEvent : 'click'   , //which event to bind the speedreading effect to
      targetId : container      //where to put the speedreading effect
    }, options || {})
      
    var toggle = $(options.toggleId); //ensure the toggle is a jquery object
    var target = $(options.targetId);
    
    //lets bind to the onclick event
    toggle.bind(options.toggleEvent, function(e){
      //simple split on spaces should be good enough
      var words = container.html().split(" ");
      var panels = [];
      
      var panelIndex = 0;
      var waitPeriod = 300 //(60.0 / options.wordsPerMinute) * 1000;
      
      //we could do collection and output in a single pass but for now I find it cleaner to handle them separately
      //if we find we have issues on large text blobs we can combine these for efficiency
      $.each(words, function(index,value){
        
        if(value != null){
          if(panels[panelIndex] == null){
            panels[panelIndex] = value;    
          }else{
            panels[panelIndex] = panels[panelIndex] + " " + value;  
          }
        }
        
        if( (index % options.wordsPerPanel) == 0){
          panelIndex++;
        }
      });
      
      console.log(panels);
      displayPanelAndWait(target,panels,waitPeriod,0);
    })
    
  }

  
})( jQuery );