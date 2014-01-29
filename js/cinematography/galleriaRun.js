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
   
   var headerStuff = ["Lou's Prey - Cameraman", 'The Approach - Cinematographer', "Peek - Cinematographer"];
   
   var textStuff = ["When Troy James decides to steal money from his boss Notorious Crime Boss Fat Reggie he becomes a marked man. Kuroda Red, a hired hitman is hot on his trail. After they finally meet the two men end up in an unexpected situation.", "A man fantasizes about ways to approach a beautiful girl, and in the end, he should've just talked to her. <br><br>An Alex Bretow Film. In association with Midnight Cry Productions. <br>Starring Taylor Fierro and Alex Bretow. <br>Directed, Written, and Edited by Alex Bretow. <br>Cinematographer and Cinematography by Kesslere Delphonse.", ""];
      
   var textStuffLen = textStuff.length;
   
   var videoList = [72301519, 63953198, 85017535];
   
   var pElem = {},
     elem;
   for(var i = 0; i < textStuffLen; i++) {
     elem = '<div class="text-area"><h1>' + headerStuff[i] + '</h1><p>' + textStuff[i] + '</p></div>';
     pElem[videoList[i]] = elem;     
   }
   
   var $da = $('#description-area');
      
   $da.append(pElem[videoList[0]]);     
   
   Galleria.ready(function() {
     
      this.bind("image", function(e) {
        var showElem = pElem[videoList[e.index]];                
        $da.html(showElem);

    });
  });

 });
