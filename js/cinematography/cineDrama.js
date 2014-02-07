$(function () {

  var $galContainer = $('<div id="galleria"><ul id="galleria-unordered-list"></ul></div>'),
    $galUl = $galContainer.children();

  var $va = $('#video-area'),
    $vaC = $va.children(),
    $this, str, splitStr, videoList = [];

  //Get info from the html elements
  //Will reformat into Galleria later
  $vaC.each(function() {
    var tArr = [];

    $this = $(this);

    //Get video id from iframe
    str = $this.find('iframe')[0].id;
    var matches = str.match(/\d+$/);

    //Link id
    tArr.push(matches[0]);

    //The title and position must be split
    str = $this.find('h1').text();
    splitStr = str.split(' - ');

    //Title of video and role in film
    tArr.push(splitStr[0], splitStr[1]);

    //Description
    tArr.push($this.find('p').html());

    videoList.push(tArr);
  });

  var videoListLen = videoList.length,
    firstPart = '<li><a href="http://vimeo.com/',
    thirdPart = '"' + '><span class="video">',
    fifthPart = '</span></a></li>',
    i, galElem, $galElem;

  for (i = 0; i < videoListLen; i++) {
    //Create the li elements
    galElem = firstPart + videoList[i][0] +
      thirdPart + videoList[i][1] + fifthPart;
    $galElem = $(galElem);
    //Add data to element for later use
    $galElem.data('videoInfo', videoList[i]);
    $galUl.append($galElem);
  }

  //Remove contents from video area
  $vaC.remove();

  //New reformatted content goes into video area
  $galContainer.appendTo($va);
  
  $va.append('<div id="description-area"></div>');
});
