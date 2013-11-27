$(function(){

  var innerWidth,
    innerHeight,
    adjImgHeight,        
    res = (16/9),
    bg = $('#bg'),
    $theWindow = $(window),
    lastWindowWidth = window.innerWidth,
    $ulNav = $('ul.main-nav-ul'),
    breakPoint = 600,
    largerThanBreak = breakPoint + 1,
    clickStatus;
  
  
  $theWindow.resize(function() {
  
    //For background image resizing
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
    
    //For the menu restoration
    //If hidden by click and the window is getting larger
    if ( $ulNav.is( ":hidden" ) ) {
      if(innerWidth > lastWindowWidth) {
        if(innerWidth >= largerThanBreak) {
          console.log('show');
          //Restore if hidden        
          $ulNav.show(); 
        }
      }
    } else {
      //Menu was visible before when larger
      //Now window width is smaller, now hide the menu
      if(innerWidth <= breakPoint && lastWindowWidth >= largerThanBreak) {
        //Also check if menu was already visible due to click of button
        //If that was the case do not hide the menu
        if(clickStatus === false) {
          $ulNav.hide(); 
        }
      }
    }
    
    //Current width is not the last window width
    lastWindowWidth = innerWidth;
  });
  
  //Trigger for performing adjustments on browser load
  $theWindow.trigger('resize'); 

  //For the menu button click action  
  $( "#nav-button" ).on('click', function() {
    if ( $ulNav.is( ":hidden" ) ) {
      $ulNav.slideDown();
      clickStatus = true;
    } else {
      $ulNav.slideUp();
      clickStatus = false;
    }
  });  
  
});