$(function() {

    var $va = $('#video-area').children(),
    $vidHeaders = $('<div id="video-headers"></div>'),
    $vidArea = $('<div id="video-area"></div>'),
    $vidDesc = $('<div id="video-descriptions"></div>'),
    $vidThumbsHeader = $('<h1>Videos</h1>'),
    $vidThumbs = $('<ul id="video-thumbs" class="ym-clearfix""></ul>'),
    $videoInfo = $('<div id="videoInfo"></div>'),
    videosObj = {},
    pos = 0;

    //Ajax variables
    var ajaxReqs = [];
    var videoList = [72301519, 63953198],
    videoListLen = videoList.length,
    vidObj = {};
    vidObj.videos = {};

    var cine = {
      appendMain : function () {

        var $fvC;
        //Change the layout of the page
        $va.each(function (i, v) {
          pos++;
          var current = videosObj[i] = {};
          var $this = $(this);
          if (pos == 1) {
            $vidHeaders.append($this.find('h1'));

            $fvC = $this.find('.FitMyVideo-container');
            vidObj.videos[videoList[i]] = $fvC.find('iframe');
            $vidArea.append($fvC);

            $vidDesc.append($this.find('p'));
          } else {
            $vidHeaders.append($this.find('h1').hide());

            $fvC = $this.find('.FitMyVideo-container');
            vidObj.videos[videoList[i]] = $fvC.find('iframe');
            $vidArea.append($fvC);

            $vidArea.append($fvC.hide());
            $vidDesc.append($this.find('p').hide());
          }
        });

        $videoInfo.append($vidHeaders, $vidArea, $vidDesc,
          $vidThumbsHeader, $vidThumbs)
        .appendTo($('#video-area'));
      },
      ajaxRequest : function () {

        var aR = this.ajaxRequest;

        this.ajaxRequest.processThumbsNails = function (data) {
          //Use 150 for the img size because of image cropping
          var video = data[0],
          newSrcEnd = video.thumbnail_small.length - 7,
          srcLn = video.thumbnail_small.slice(0, newSrcEnd) + '150.jpg',
          $img = $('<img>').attr('src', srcLn);
          //Store image object into vidObj
          vidObj[video.id] = $img;
        }

        //Perform ajax request for each thumbnail
        for (var i = 0; i < videoListLen; i++) {
          var xhr = $.ajax({
              type : 'GET',
              url : 'http://vimeo.com/api/v2/video/' + videoList[i] + '.json',
              jsonp : 'callback',
              dataType : 'jsonp'
            })
            .done(function (data) {
              aR.processThumbsNails(data);
            });
          ajaxReqs.push(xhr);
        }
      },
      when : function () {
        var when = this.when,
        _this = this;

        this.when.insertThumbs = function () {
          //Loop over image object to insert into element
          for (var j = 0; j < videoListLen; j++) {
            var $li = $('<li></li>');
            $li.append(vidObj[videoList[j]]);
            $vidThumbs.append($li);
          }
        }

        $.when.apply($, ajaxReqs).then(function () {
          when.insertThumbs();
          _this.attachListeners();
        });
      },
      attachListeners : function () {
        //Make first img thumbnail have a border
        $vidThumbs.children().first().find('img').addClass('active');

        var aL = this.attachListeners;
        aL.clickVidThumbs = function () {
          function pauseOtherVideos() {}

          
          var lastClicked = {};
          $vidThumbs.on('click', 'img', function () {
            //Index starts with 0 for index, but nth starts with index 1
            //Adjustment is needed
            var _this = $(this);
            var index = _this.parent().index();
            var adj = index + 1;

            //Add active border on clicked img
            _this.addClass('active');
            //Remove the active border from siblings
            _this.parents().siblings().find('img').attr('class', '');
            
            //There is a lasted clicked item
            if(typeof lastClicked.jElement != 'undefined') {
              //console.log('last clicked item is ', lastClicked.jElement);
            }

            var vidStuff = vidObj.videos[72301519];
            //console.log(vidStuff);
            //$f(vidStuff[0]).api('pause');
            //vidObj.videos[]
            
            //Hiding all sibling elements
            var $shownVh = $("#video-headers h1:nth-child(" + adj + ")").show();
            $shownVh.siblings().hide();

            var $shownV = $("#video-area div.FitMyVideo-container:nth-child(" + adj + ")").show();
            $shownV.siblings().hide();

            var $shownD = $("#video-descriptions p:nth-child(" + adj + ")").show();
            $shownD.siblings().hide();
            
            //Make note of last clicked
            lastClicked.jElement = _this;
            lastClicked.index = index;
            lastClicked.adj= adj;
          });

        }

        aL.resize = function () {
          //Adjust the overflow for the description
          var vidDescDomElem = $vidDesc[0];
          $(window).on('resize.kdDrama', function () {
            if ((vidDescDomElem.offsetHeight < vidDescDomElem.scrollHeight)
               || (vidDescDomElem.offsetWidth < vidDescDomElem.scrollWidth)) {
              //Hidden overflow present
              $vidDesc.css("overflow-y", "scroll");
            } else {
              //No overflow
              $vidDesc.css("overflow", "auto");
            }
          });
          $(window).trigger('resize.kdDrama');
        }

        aL.clickVidThumbs();
        aL.resize();
      }
    }

    //Main operation calls
    cine.appendMain();
    cine.ajaxRequest();
    cine.when();
});
