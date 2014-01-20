 // Load the classic theme
Galleria.loadTheme('js/photography/galleria.classic.js');

$(window).ready(function() {      
  // Initialize Galleria
  Galleria.run('#galleria');
  
  var styleSelector = '#main-styles';
  //var mainRules = u.ss.getSS(styleSelector);
  
  console.log(u.ss.getS());
  
  var windowHeight = $(this).height();
  u.ss.addRule("#galleria", "{height:" + windowHeight*0.90 + "px}");
  
  
  //console.log(mainRules);
  
  
  //var ruleNumber = u.ss.getSSRule(mainRules, "#main-nav ul li:hover > ul");
  //u.ss.deleteRule(ruleNumber);
});
