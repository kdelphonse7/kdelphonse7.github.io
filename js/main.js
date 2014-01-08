$(function () {
  //Add class on html when javascript is enabled
  var $html = $('html');
  $html.removeClass('no-js').addClass('js');


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
