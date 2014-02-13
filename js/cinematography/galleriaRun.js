 $(function () {

   // Load the classic theme
   Galleria.loadTheme('js/photography/galleria.classic.js');

   function calculateGalleriaHeight() {
     windowHeight = $window.height();
     windowWidth = $window.width();
     windowHeight = determineHeight(windowHeight);
     if(windowWidth <= 1280) {
       $galleria.css("height", (windowHeight * factor + "px"));
     } else {
       $galleria.css({
         width: '100%'
       });
     }
   }
   
   function determineHeight(windowHeight) {
     if(windowHeight <= 250) {
       return 250;
     } else {
       return windowHeight;
     }
   }

   var $window = $(window),
     $galleria = $('#galleria'),
     factor = 0.90,
     windowHeight,
     windowWidth,
     $galUl = $('#galleria-unordered-list'),
     $da = $('#description-area'),
     galLiData = [],
     descElem, $descElem,
     descAll = [];

   //Get data from ul for new description below videos
   $galUl.children().each(function() {
     //Data from the li element
     galLiData = $(this).data('videoInfo');
     //Create the description element from data from li
     descElem = '<div class="text-area"><h1>' +
       galLiData[1] + ' - ' + galLiData[2] +
       '</h1><p>' + galLiData[3] + '</p></div>';
     $descElem = $(descElem);
     //Need to reference descriptions later
     descAll.push($descElem);
     //Append the description element into description area div
     $da.append($descElem);
   });

   //Hide siblings that are not the first
   var $daChildren = $da.children()
   $daChildren.first().siblings().hide();

   //Track which description is showing for video
   var indexShowing = 0;
   
   function resizeThumbsArea() {
     //console.log($galleriaThumbnails);
     //$galleriaThumbnails.removeAttr('style');
    $galleriaThumbnails.css('width', '100%');
    console.log($galleriaThumbnails.css('width'));
   }
   
   var $galleriaThumbnails;

   //Run and calculate height of Galleria
   $window.ready(function () {
     calculateGalleriaHeight();
     // Initialize Galleria
     Galleria.run('#galleria', {thumbCrop: false});
     //Set height of Galleria on load
     $('head').append('<style id="js-gen-galleria">#galleria {height:' +
       windowHeight * factor + 'px}</style>');
       

   }).on('resize.kdPhotography', function () {
     //Resize the Galleria height on resize
     calculateGalleriaHeight();
     resizeThumbsArea();
   });

   Galleria.ready(function() {
     
      this.bind("image", function(e) {
        //Hide previous and show current
        descAll[indexShowing].hide();
        descAll[e.index].show();
        //Track the currently show
        indexShowing = e.index;
    });
    $galleriaThumbnails = $('.galleria-thumbnails');
       
  });

 });
