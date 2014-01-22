$(function () {
  var $va = $('#video-area').children();
  var $vidHeaders = $('<div id="video-headers"></div>');
  var $vidArea = $('<div id="video-area"></div>');
  var $vidDesc = $('<div id="video-descriptions"></div>');
  var $vidThumbsHeader = $('<h1>Videos</h1>');
  var $vidThumbs = $('<ul id="video-thumbs" class="ym-clearfix""></ul>');
  var videosObj = {};
  var pos = 0;
  $va.each(function (i, v) {
    pos++;
    var current = videosObj[i] = {};
    var $this = $(this);
    if (pos == 1) {
      $vidHeaders.append($this.find('h1'));
      $vidArea.append($this.find('.FitMyVideo-container'));
      $vidDesc.append($this.find('p'));
    } else {
      $vidHeaders.append($this.find('h1').hide());
      $vidArea.append($this.find('.FitMyVideo-container').hide());
      $vidDesc.append($this.find('p').hide());
    }
  });
  var $videoInfo = $('<div id="videoInfo"></div>');
  $videoInfo.append($vidHeaders, $vidArea, $vidDesc, 
    $vidThumbsHeader, $vidThumbs)
    .appendTo($('#video-area'));
  var videoList = [72301519, 63953198],
    videoListLen = videoList.length,
    vidObj = {},
    count = 0;
  for (var i = 0; i < videoListLen; i++) {
    $.ajax({
      type: 'GET',
      url: 'http://vimeo.com/api/v2/video/' + videoList[i] + '.json',
      jsonp: 'callback',
      dataType: 'jsonp',
      complete: function () {
        count++;
        //Start the element creation after finished with last
        if (count == videoListLen) {
          //Loop over image object to insert into element
          for (var j = 0; j < videoListLen; j++) {
            var $li = $('<li></li>');
            $li.append(vidObj[videoList[j]]);
            $vidThumbs.append($li);
          }
          $('#video-thumbs img').on('click', function () {
            //Zero index for index
            var adj = $(this).parent().index() + 1;
            var $shownVh = $("#video-headers h1:nth-child(" + adj + ")").show();
            $shownVh.siblings().hide();
            var $shownV = $("#video-area div.FitMyVideo-container:nth-child(" + adj + ")").show();
            $shownV.siblings().hide();
            var $shownD = $("#video-descriptions p:nth-child(" + adj + ")").show();
            $shownD.siblings().hide();
          });
        }
      }
    })
      .done(function (data) {
        //USe 150 for the img size because of image cropping
        var video = data[0],
          newSrcEnd = video.thumbnail_small.length - 7,
          srcLn = video.thumbnail_small.slice(0, newSrcEnd) + '150.jpg',
          $img = $('<img>').attr('src', srcLn);
        //Store image object into vidObj  
        vidObj[video.id] = $img;
      });
  }
});