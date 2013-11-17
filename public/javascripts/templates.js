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
	templates['report-list-item'] = template(
	function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"report-list-item positioned\">\n    <a class=\"cover detail-link\" data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/report/?_id=";
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
    + "/api/report/save\"\n          method=\"post\" name=\"edit-form\">\n        <input type=\"hidden\" value=\"";
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
    + "/api/report/destroy\"\n              method=\"post\" name=\"destroy-form\">\n            <input type=\"hidden\" value=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"_id\"/>\n            <a href=\"javascript:void(0)\" data-role='submit-btn'>\n                <i class=\"icon icon-trash\"></i>\n            </a>\n        </form>\n    </div>\n</li>";
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


  buffer += "<li class=\"team-list-item positioned\">\n    <a class=\"cover detail-link\" data-role=\"detail-link\" href=\"";
  if (stack1 = helpers.ctx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ctx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/team/?_id=";
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


  buffer += "<li class=\"user-list-item positioned\">\n    <a href=\"javascript:void(0)\">\n        <form class=\"inline-form\" action=\"";
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
    + "\"/>\n        </form>\n        <span class=\"detail-arrow float-right\"></span>\n    </a>\n</li>";
  return buffer;
  }
	);
})();