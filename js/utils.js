var u = util = {};
u.ss = util.stylesheet = {};

//+++++++++++++++++++++++++++++++++++++++++++++++++++
//Stylesheet Manipulation  

u.ss = {
  mainStyles: {},
  mainStylesHtml: {},
  mainRules: {},
  getS: function () {
    if (this.mainStylesHtml.sheet) {
      this.mainStyles = this.mainStylesHtml.sheet;
    } else if (this.mainStylesHtml.styleSheet) {
      this.mainStyles = this.mainStylesHtml.styleSheet;
    }
    return this.mainStyles;
  },
  getSS: function (id) {
    this.mainStylesHtml = $(id)[0];

    this.getS();

    if (this.mainStyles.cssRules)
      this.mainRules = this.mainStyles.cssRules;
    else if (this.mainStyles.rules)
      this.mainRules = this.mainStyles.rules;

    return this.mainRules;
  },
  getSSRule: function (mainRules, rule) {
    for (var key in mainRules) {
      if (typeof this.mainRules[key].selectorText != 'undefined') {
        if (rule == (mainRules[key].selectorText)) {
          return key * 1;
        }
      }
    }
  },
  deleteRule: function (number) {
    if (this.mainStyles.deleteRule)
      this.mainStyles.deleteRule(number);
    else
      this.mainStyles.removeRule(number);
  },
  addRule: function (selector, rule) {
    if (this.mainStyles.insertRule) {
      this.mainStyles.insertRule(selector + rule, 0);
    } else {
      if (this.mainStyles.addRule) {
        this.mainStyles.addRule(selector, rule, 0);
      }
    }
  }
};
