$(function() {

 var $galContainer = $('<div id="galleria"><ul id="galleria-unordered-list"></ul></div>'),
   $galUl = $galContainer.children();

  var videoList = [[72301519, "Lou's Prey"], [63953198, "The Approach"]],   
    videoListLen = videoList.length;

  var firstPart = '<li><a href="http://vimeo.com/',
    thirdPart = '"' + '><span class="video">',
    fifthPart = '</span></a></li>';
  for(var i = 0; i < videoListLen; i++){
    $galUl.append(firstPart + videoList[i][0] + thirdPart + videoList[i][1] + fifthPart);
  }

    var $va = $('#video-area'),
      $vaC = $va.children();
    
    $vaC.remove();

    $galContainer.appendTo($va);

});
