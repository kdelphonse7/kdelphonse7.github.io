$(function() {
  var $window = $(window),
    $header = $('header');

  var $topVisual = $('#top-visual'),
    imgWidthFactor = 9,
    imgHeightFactor = 6,
    imgAspectRatio = imgWidthFactor / imgHeightFactor,
    wHeight,
    wWidth,
    marginLeft,
    maxWidth;

  var scaledImgWidth;

  $window.on('resize.img', function() {
    wHeight = $window.height();
    wWidth = $window.width();
    //Available height for image
    //Window height - header menu height
    wHeight -= $header.height();
    //Aspect ratio times height
    //is the scaled image width
    scaledImgWidth = imgAspectRatio * wHeight;

    //Window width - scaled image width
    //is the available margin
    //Available margin gets divided by 2
    marginLeft = (wWidth - scaledImgWidth) / 2;

    //Image resize decisions
    if ((scaledImgWidth / wWidth) <= 0.7 ||
      scaledImgWidth >= wWidth ||
      wWidth >= maxWidth) {
      //Scaled image is greater than max win width
      //Too much margins or 
      //scaled image is greater than window width
      //Allow image to fill width
      $topVisual.css({
        width: '100%',
        height: 'auto',
        marginLeft: 0
      });
    } else {
      //Image will fill available height
      $topVisual.css({
        marginLeft: marginLeft,
        width: scaledImgWidth,
        height: wHeight
      });
    }

  });

  $window.trigger('resize.img');
});