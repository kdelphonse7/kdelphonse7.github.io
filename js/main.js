$(function(){

  var $flySubMenus = $('ul.fly-out');
  $flySubMenus.addClass('sub-level');

  var $mainMenu = $('#main-nav-outer');

  function createFlyoutMenu() { $mainMenu.menu(); }
  
  createFlyoutMenu();   

  var innerWidth,
    $document = $(document),
    $theWindow = $(window),
    lastWindowWidth = $theWindow.width(),
    lastWindowHeight = $theWindow.height(),
    $ulNav = $('ul.main-nav-ul'),
    breakPoint = 600,
    largerThanBreak = breakPoint + 1,
    vertBreakPoint = 250,
    greaterVertBreakPoint = vertBreakPoint + 1,
    clickStatus = false,
    $navButton = $( "#nav-button" ),
    flyOutMenuPresent = true;

  function checkBreakPoint(dim, lastdim, breakPoint, status ,elem) {
   if( (dim <= lastdim) && (dim <= breakPoint)) {
      if(!status) {
        elem.hide();
      }
    }
  }
  
  $theWindow.on("resize.kdSite", function() {    
   innerWidth = $theWindow.width();
   innerHeight = $theWindow.height();

   //Nav button is not hidden
    if(!$navButton.is( ":hidden" )) {
      //Have to remove flyout menu if nav button present
      if(flyOutMenuPresent) {
        $mainMenu.menu('destroy');        
        $mainMenu
          .children()
          .children("ul.sub-nav-ul")
          .removeClass( "sub-level" );
        
        flyOutMenuPresent = false; 
      }      
      
      //Less than width breakpoint or less than height breakpoint
      //Also make sure the nav button was not clicked before
      //Hide the menus            
      checkBreakPoint(innerWidth, lastWindowWidth, breakPoint, clickStatus, $ulNav);
      checkBreakPoint(innerHeight, lastWindowHeight, breakPoint, clickStatus, $ulNav);

    } else {
      //Restore the flyout if it is not present
      if(!flyOutMenuPresent) {
        $flySubMenus.addClass('sub-level');
        //Bring the flyout menu back
        createFlyoutMenu();
        flyOutMenuPresent = true;                
      }      
      if($ulNav.is( ":hidden" )) {
        $ulNav.show();
      }
    }
    
    //Current width/height is now the last window width/height
    lastWindowWidth = innerWidth;    
    lastWindowHeight = innerHeight;
  });
  
  //Trigger for performing adjustments on browser load
  $theWindow.trigger('resize.kdSite'); 
  
  //For the menu button click action  
  $navButton.on('click.kdSite', function() {
    if ( $ulNav.is( ":hidden" ) ) {
      $ulNav.slideDown();
      clickStatus = true;
    } else {
      $ulNav.slideUp();
      clickStatus = false;
    }
  });  
  
  //Use svg logo if supported
  if (Modernizr.svg) {
    $("#main-logo").attr("src", "img/KdLogo.svg");
  }
 
});