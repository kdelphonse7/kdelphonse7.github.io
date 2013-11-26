$(function(){

  var innerWidth,
    innerHeight,
    adjImgHeight,        
    res = (16/9),
    bg = $('#bg'),
    $theWindow = $(window);
    
  $theWindow.resize(function() {
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    adjImgHeight = innerWidth/res,
    adjImgHeightMult = innerHeight * res;
    //Width is way larger or equal to the height
    //Resize image to fit the width
    if(innerWidth >= innerHeight) {
      //When the adjusted image height is less
      //than the window height, fill the adjusted
      //image to the height of the window
      if(adjImgHeight <= innerHeight) {
        bg.css('height', (innerHeight + 'px'));
        bg.css('width', (adjImgHeightMult + 'px'));
      } else {
        bg.css('width', '100%');
        bg.css('height', (adjImgHeight + 'px'));
      }
    } else if(innerWidth < innerHeight) {
      //Length is way larger than the width
      //Adjust the image to fit height
      bg.css('height', (innerHeight + 'px'));
      bg.css('width', (adjImgHeightMult + 'px'));
    }        
  });
  
  $theWindow.trigger('resize');
});