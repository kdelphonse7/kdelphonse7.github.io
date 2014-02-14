$(function () {
  
  
  function adjustMargin() {
    var wWidth = $(window).width(),
  $vBg = $(".video-background"),
  vWidth = $vBg.width(),
  mL = wWidth - vWidth;
    if (mL > 0) {
      $(".video-background").css({
        marginLeft : ((mL / 2) + 'px')
      });
    }
  }
  adjustMargin();
  $(window).on('resize', function() {
    adjustMargin();
  });
  
  
});