(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates[''] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['chart-filter-select-form'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <li class=\"chart-filter-select-list-item\">\n                <input type=\"checkbox\" name=\"filter_value\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" id=\"chart-filter-value-input-"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"\n                       checked/>\n                <label for=\"chart-filter-value-input-"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\n            </li>\n        ";
  return buffer;
  }

  buffer += "<form id=\"chart-filter-select-form\">\n    <div class=\"margin-box\">\n\n    <a class=\"close-btn stick-right stick-top\" href=\"javascript:void(0)\">&times</a>\n    <h1 class=\"paper-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n    </div>\n    <div class=\"margin-box\">\n        <span>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "lbl.filter", options) : helperMissing.call(depth0, "l", "lbl.filter", options)))
    + "</span>\n        <input type=\"radio\" name=\"filter_active\" value=\"true\" id=\"filter_active-input-true\" checked/>\n        <label for=\"filter_active-input-true\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "lbl.on", options) : helperMissing.call(depth0, "l", "lbl.on", options)))
    + "</label>\n        <input type=\"radio\" name=\"filter_active\" value=\"false\" id=\"filter_active-input-false\"/>\n        <label for=\"filter_active-input-false\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "lbl.off", options) : helperMissing.call(depth0, "l", "lbl.off", options)))
    + "</label>\n    </div>\n    <ul class=\"no-style-list chart-filter-value-list\">\n        <li class=\"chart-filter-select-list-item\">\n            <input type=\"checkbox\" name=\"filter_value\" value=\"__empty__\" id=\"chart-filter-value-input-__empty__\"\n                   checked/>\n            <label for=\"chart-filter-value-input-__empty__\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "lbl.__empty__", options) : helperMissing.call(depth0, "l", "lbl.__empty__", options)))
    + "</label>\n        </li>\n        ";
  stack2 = helpers.each.call(depth0, depth0.values, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <li class=\"stick-bottom stick-right toogle-list-item\">\n            <a class=\"toogle-all-btn\" href=\"javascript:void(0)\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['l'] || depth0['l']),stack1 ? stack1.call(depth0, "btn.toggle_all", options) : helperMissing.call(depth0, "l", "btn.toggle_all", options)))
    + "</a>\n        </li>\n    </ul>\n</form>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['company-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"company-list-item positioned\">\n    <a class=\"cover detail-link\" data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/chart/";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?t=";
  if (stack1 = helpers['t']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['t']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></a>\n    <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/company/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n        <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    </form>\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/company/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['csv-err-preview-sheet'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <th>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</th>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tr>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <td class=\"";
  if (stack1 = helpers.style_class) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.style_class; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"err-mark\">&times;</span>\n                        <div class=\"preview-sheet-content\">\n                            ";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n                            <div class='err-msg'>"
    + escapeExpression(((stack1 = ((stack1 = depth0.err),stack1 == null || stack1 === false ? stack1 : stack1.msg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                        </div>\n                </td>\n                ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n                    <td></td>\n                ";
  }

  buffer += "<table class=\"wide-table\">\n    <thead>\n    <tr>\n        ";
  stack1 = helpers.each.call(depth0, depth0.headers, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, depth0.rows, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>\n";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['csv-submit-preview-sheet'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <th>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</th>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tr>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <td class=\"";
  if (stack1 = helpers.style_class) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.style_class; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <div class=\"preview-sheet-content\">\n                        "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n                    </div>\n                </td>\n                ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n                    <td></td>\n                ";
  }

  buffer += "<table class=\"wide-table\">\n    <thead>\n    <tr>\n        ";
  stack1 = helpers.each.call(depth0, depth0.headers, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, depth0.rows, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>\n";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['input-err-msg'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"input-err-msg err-msg\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['issue-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"issue-list-item positioned paper editable-list-item-fixed\" data-priority=\"";
  if (stack1 = helpers.priority) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.priority; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"paper-content\">\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/issue/save\"\n              method=\"post\" name=\"edit-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"status\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n\n\n            <div class=\"title-text\">\n                <textarea name=\"title\" id=\"\"\n                          data-role=\"editable-text\"\n                          placeholder=\"request for improvement\"\n                          cols=\"30\" rows=\"10\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n            </div>\n            <div style=\"display: none !important;\">\n                <label for=\"priority-select-";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">priority : </label>\n                <select name=\"priority\" id=\"priority-select-";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-value=\"";
  if (stack1 = helpers.priority) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.priority; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <option value=\"high\">high</option>\n                    <option value=\"middle\">middle</option>\n                    <option value=\"low\">low</option>\n                </select>\n            </div>\n\n            <input class=\"btn wide-btn save-btn\" type=\"submit\" value=\"save\"/>\n        </form>\n        <div class=\"stick-right stick-top block-list-item-control\">\n            <a href=\"javascript:void(0)\" data-role='edit-btn'>\n                <i class=\"icon icon-pencil\"></i>\n            </a>\n\n            <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/issue/destroy\"\n                  method=\"post\" name=\"destroy-form\">\n                <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n                <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                    <i class=\"icon icon-trash\"></i>\n                </a>\n            </form>\n        </div>\n    </div>\n</li>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['person-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"person-list-item positioned\">\n    <a class=\"cover detail-link\" data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/person/?_id=";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "&t=";
  if (stack1 = helpers['t']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['t']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></a>\n    <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/person/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n        <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    </form>\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/person/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['pie-chart-labels'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n        <label>\n            <span style=\"background-color: ";
  if (stack1 = helpers.color) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.color; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"pye-chart-label-color\"></span>\n            <span style=\"\">";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </label>\n    ";
  return buffer;
  }

  buffer += "<div class=\"pie-chart-labels\">\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['score-report-table-body-row'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n    <th>";
  if (stack1 = helpers.rank) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</th>\n    <td>";
  if (stack1 = helpers.real_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.real_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " (";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ")</td>\n    <td class=\"text-right\">";
  if (stack1 = helpers.total) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.total; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n    <td>";
  if (stack1 = helpers.team_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.team_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n</tr>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['team-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"team-list-item positioned\">\n    <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/team/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n        <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n        <input type=\"text\" data-role=\"editable-text\" name=\"name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    </form>\n    <div class=\"stick-right stick-top block-list-item-control\">\n        <a href=\"javascript:void(0)\" data-role='edit-btn'>\n            <i class=\"icon icon-pencil\"></i>\n        </a>\n\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/team/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
  return buffer;
  }
	);
})();(function() {
	var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
	templates['user-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"user-list-item positioned selectable-list-item\">\n    <a href=\"javascript:void(0)\">\n        <form class=\"inline-form\" action=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/api/user/save\"\n              method=\"post\" name=\"edit-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._vr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._vr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_vr\"/>\n            <input type=\"text\" data-role=\"editable-text\" name=\"username\" value=\"";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n            <input type=\"text\" data-role=\"editable-text\" name=\"real_name\" value=\"";
  if (stack1 = helpers.real_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.real_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n        </form>\n        <span class=\"detail-arrow float-right\"></span>\n    </a>\n</li>";
  return buffer;
  }
	);
})();