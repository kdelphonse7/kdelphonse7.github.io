$(function () {
  //Add class on html when javascript is enabled
  var $html = $('html');
  $html.removeClass('no-js').addClass('js');

  //Alias the elements for the nav menu
  var $flySubMenus = $('ul.fly-out');
  var subLevelStr = 'sub-level';
  $flySubMenus.addClass(subLevelStr);

  var $mainMenu = $('#main-nav-outer');

  function createFlyoutMenu() {
    $mainMenu.menu();
  }

  //Create the flyout menu
  //Assuming the page is viewed on a large screen initially
  createFlyoutMenu();

  var innerWidth,
    $document = $(document),
    $window = $(window),
    lastWindowWidth = $window.width(),
    lastWindowHeight = $window.height(),
    $ulNav = $('ul.main-nav-ul'),
    breakPoint = 600,
    largerThanBreak = breakPoint + 1,
    vertBreakPoint = 250,
    greaterVertBreakPoint = vertBreakPoint + 1,
    clickStatus = false,
    $navButton = $('#nav-button'),
    flyOutMenuPresent = true,
    subMenuPresent = false,
    hasClickedSubMenus = false,
    subMenuPhotographyClickedShowing = false,
    subMenuCinematographyClickedShowing = false,
    $navPhotography = $('#nav-a-photography'),
    $navCinematography = $('#nav-a-cinematography'),
    $navPhotographyUl = $navPhotography.siblings(':hidden'),
    $navCinematographyUl = $navCinematography.siblings(':hidden');

  function checkBreakPoint(dim, lastdim, breakPoint, status, elem, hasClickedSubMenus) {
    if ((dim <= lastdim) && (dim <= breakPoint)) {
      if (!status && !hasClickedSubMenus) {
        elem.hide();
      }
    }
  }

  $window.on("resize.kdSite", function () {
    innerWidth = $window.width();
    innerHeight = $window.height();

    //Nav button is not hidden
    if (!$navButton.is(":hidden")) {
      //Have to remove flyout menu if nav button present
      if (flyOutMenuPresent) {
        $mainMenu.menu('destroy');
        $mainMenu
          .children()
          .children("ul.sub-nav-ul")
          .removeClass("sub-level");

        if (!status && !hasClickedSubMenus) {
          $flySubMenus.hide();
        } else {
          //Hide both submenus 	
          $navPhotographyUl.hide();
          $navCinematographyUl.hide();
          //Restore the original state of submenus
          if (subMenuPhotographyClickedShowing) {
            $navPhotographyUl.show();
          } else {
            $navPhotographyUl.hide();
          }
          if (subMenuCinematographyClickedShowing) {
            $navCinematographyUl.show();
          } else {
            $navCinematographyUl.hide();
          }
        }

        flyOutMenuPresent = false;
      }

      //Less than width breakpoint or less than height breakpoint
      //Also make sure the nav button was not clicked before
      //Hide the menus            
      checkBreakPoint(innerWidth, lastWindowWidth,
        breakPoint, clickStatus, $ulNav, hasClickedSubMenus);
      checkBreakPoint(innerHeight, lastWindowHeight,
        breakPoint, clickStatus, $ulNav, hasClickedSubMenus);

    } else {
      //Restore the flyout if it is not present
      if (!flyOutMenuPresent) {
        $flySubMenus.addClass('sub-level');
        //Bring the flyout menu back
        createFlyoutMenu();
        flyOutMenuPresent = true;
      }
      if ($ulNav.is(":hidden")) {
        $ulNav.show();
      }
    }

    //Current width/height is now the last window width/height
    lastWindowWidth = innerWidth;
    lastWindowHeight = innerHeight;
  });

  //Trigger for performing adjustments on browser load
  $window.trigger('resize.kdSite');

  //For the menu button click action  
  $navButton.on('click.kdSite', function () {
    if ($ulNav.is(":hidden")) {
      $ulNav.slideDown();
      clickStatus = true;
    } else {
      $ulNav.slideUp();
      clickStatus = false;
    }
  });

  //For submenu hiding and showing
  $mainMenu.on('click.kdSite2', 'a', function (evt) {
    var evtTarget = evt.target,
      evtTargetId = evtTarget.id;

    //Menu items with submenus should not lead anywhere
    if(evtTargetId == "nav-a-photography" || 
      evtTargetId == "nav-a-cinematography") {
      evt.preventDefault();
    }

    //Tracking submenus clicked  
    //Only record keep if menu icon is present  
    if (!$navButton.is(":hidden")) {
      hasClickedSubMenus = true;
      
        var $evtTarget = $(evtTarget),
        $evtTargetSiblingsHidden = $evtTarget.siblings(':hidden');

      //Toggle the state of submenus
      if ($evtTargetSiblingsHidden.length == 1) {
        $evtTargetSiblingsHidden.slideDown();
        subMenuPresent = true;
      } else if ($evtTarget.siblings().length > 0) {
        $evtTarget.siblings().slideUp();
        subMenuPresent = false;
      }

      //Track the state of menu
      
      if (evtTargetId == "nav-a-photography") {
        //console.log('is nav photo');
        if (!subMenuPhotographyClickedShowing) {
          subMenuPhotographyClickedShowing = true;
        } else {
          subMenuPhotographyClickedShowing = false;
        }
      } else if (evtTargetId == "nav-a-cinematography") {
        //console.log('is nav cine');
        if (!subMenuCinematographyClickedShowing) {
          subMenuCinematographyClickedShowing = true;
        } else {
          subMenuCinematographyClickedShowing = false;
        }
      }
    }
  });

  //Use svg logo if supported
  if (Modernizr.svg) {
    $("#main-logo").attr("src", "img/KdLogo.svg");
  }

  //Only use background stretch for newer browsers
  if (!$html.hasClass('oldIE')) {
    //Hide the css background fallback when javascript is enabled
    $('#bg').addClass('hideThisThing');
    //Backstretch plugin
    $.backstretch("./img/Fog.jpg");
  } else {
    //Remove event listeners for old ie
    $window.off('resize.kdSite');
    $navButton.off('click.kdSite');
  }

});