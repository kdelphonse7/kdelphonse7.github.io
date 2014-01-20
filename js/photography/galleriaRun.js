 $(function () {
   // Load the classic theme
   Galleria.loadTheme('js/photography/galleria.classic.js');

   function calculateGalleriaHeight() {
     windowHeight = $window.height();
     windowHeight = determineHeight(windowHeight);
     $galleria.css("height", (windowHeight * factor + "px"));
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
     windowHeight;

   //Run and calculate height of Galleria
   $window.ready(function () {
     //windowHeight = $(this).height();
     calculateGalleriaHeight();
     // Initialize Galleria
     Galleria.run('#galleria');
     //Set height of Galleria on load
     $('head').append('<style id="js-gen-galleria">#galleria {height:' +
       windowHeight * factor + 'px}</style>');

   }).on('resize.kdPhotography', function () {
     //Resize the Galleria height on resize
     calculateGalleriaHeight();
   });

 });
