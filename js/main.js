
$(function () {
  //Add class on html when javascript is enabled
  var $html = $('html');
  $html.removeClass('no-js').addClass('js');

  //+++++++++++++++++++++++++++++++++++++++++++++++++++

  //Use svg logo if supported
  if (Modernizr.svg) {
    $("#main-logo").attr("src", "img/KdLogo.svg");
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++

  //Get Rule from Stylesheet and Remove it
  var styleSelector = '#main-styles',
  u = {};
  u.ss = kdSite.util.stylesheet;
  
  var mainRules = u.ss.getSS(styleSelector),
  ruleNumber = u.ss.getSSRule(mainRules, "#main-nav ul li:hover > ul");
  
  u.ss.deleteRule(ruleNumber);

  //+++++++++++++++++++++++++++++++++++++++++++++++++++

  //Set flyout menu
  //Alias the elements for the nav menu
  var $flySubMenus = $('ul.fly-out');
  var subLevelStr = 'sub-level';
  $flySubMenus.addClass(subLevelStr);

  var $mainMenu = $('#main-nav-outer');
  var $navPhotography = $('#nav-a-photography');

  function getLiHeight() {
    var ulHeight = $navPhotography.parent().height();
    var ulAt = "left, top+" + (ulHeight + 2);
    return ulAt;
  }

  function createFlyoutMenu(liHeight) {
    $mainMenu.menu({
      position : {
        my : "left top",
        at : liHeight
      }
    });
  }

  //Create the flyout menu
  //Assuming the page is viewed on a large screen initially
  createFlyoutMenu(getLiHeight());

  var innerWidth,
  $window = $(window),
  lastWindowWidth = $window.width(),
  $ulNav = $('#main-nav'),
  breakPoint = 850,
  clickStatus = false,
  $navButton = $('#nav-button'),
  flyOutMenuPresent = true,
  subMenuPresent = false,
  hasClickedSubMenus = false,
  subMenuPhotographyClickedShowing = false,
  $navPhotographyUl = $navPhotography.siblings(':hidden');

  function checkBreakPoint(dim, lastdim, breakPoint, status, elem) {
    if ((dim <= lastdim) && (dim <= breakPoint)) {
      if (!status) {
        elem.hide();
      }
    }
  }

  $window.on("resize.kdSite", function () {
    innerWidth = $window.width();

    //Nav button is not hidden
    if (!$navButton.is(":hidden")) {
      //Have to remove flyout menu if nav button present
      if (flyOutMenuPresent) {
        $mainMenu.menu('destroy');
        $mainMenu
        .children()
        .children("ul.sub-nav-ul")
        .removeClass("sub-level")
        .attr("style", "");

        //Menu not clicked and no submenus clicked
        if (!status && !hasClickedSubMenus) {
          $flySubMenus.hide();
        } else {
          //Hide both submenus
          $navPhotographyUl.hide();
          //Restore the original state of submenus
          if (subMenuPhotographyClickedShowing) {
            $navPhotographyUl.show();
          } else {
            $navPhotographyUl.hide();
          }
        }

        flyOutMenuPresent = false;
      }

      //Less than width breakpoint
      //Also make sure the nav button was not clicked before
      //Hide the menus
      checkBreakPoint(innerWidth, lastWindowWidth,
        breakPoint, clickStatus, $ulNav);

    } else {
      if ($ulNav.is(":hidden")) {
        $ulNav.show();
      }
      //Restore the flyout if it is not present
      if (!flyOutMenuPresent) {
        $flySubMenus.addClass('sub-level');
        //Bring the flyout menu back
        createFlyoutMenu(getLiHeight());
        flyOutMenuPresent = true;
      }
    }

    //Current width is now the last window width
    lastWindowWidth = innerWidth;
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

    //Realign the target to the parent link
    var evtTarget = $(evt.target).parent().parent()[0],
    evtTargetId = evtTarget.id;

    //Menu items with submenus should not lead anywhere
    if (evtTargetId == "nav-a-photography") {
      console.log('deafult prevent');
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
        if (!subMenuPhotographyClickedShowing) {
          subMenuPhotographyClickedShowing = true;
        } else {
          subMenuPhotographyClickedShowing = false;
        }
      }
    }
  });

  //+++++++++++++++++++++++++++++++++++++++++++++++++++
  //Backstretch use
  //Remove listeners for Old Ie

  //Only use background stretch for newer browsers
  if (!$html.hasClass('oldIE')) {
    if ($('#bg').length) {
      if($.backstretch) {
        //Hide the css background fallback when javascript is enabled
        $('#bg').addClass('hideThisThing');
        //Backstretch plugin
        $.backstretch("./img/Fog.jpg");
      }
    }
  } else {
    //Remove event listeners for old Ie
    $window.off('resize.kdSite');
    $navButton.off('click.kdSite');
  }
});
