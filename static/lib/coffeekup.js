// Generated by CoffeeScript 1.12.6
(function() {
  var cache, coffee, coffeekup, coffeescript_helpers, elements, merge_elements, skeleton, stringify,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    hasProp = {}.hasOwnProperty,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof window !== "undefined" && window !== null) {
    coffeekup = window[window.exports != null ? "exports" : "Coffeekup"] = {};
    coffee = typeof CoffeeScript !== "undefined" && CoffeeScript !== null ? CoffeeScript : null;
  } else {
    coffeekup = exports;
    coffee = require('coffee-script');
  }

  coffeekup.version = '0.3.1edge';

  coffeekup.doctypes = {
    'default': '<!DOCTYPE html>',
    '5': '<!DOCTYPE html>',
    'xml': '<?xml version="1.0" encoding="utf-8" ?>',
    'transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
    'strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
    'frameset': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
    '1.1': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
    'basic': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">',
    'mobile': '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">',
    'ce': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "ce-html-1.0-transitional.dtd">'
  };

  coffeescript_helpers = "var __slice = slice = Array.prototype.slice;\nvar __hasProp = hasProp = Object.prototype.hasOwnProperty;\nvar __bind = bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };\nvar __extends = extend = function(child, parent) {\n  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }\n  function ctor() { this.constructor = child; }\n  ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype;\n  return child; };\nvar __indexOf = indexOf = Array.prototype.indexOf || function(item) {\n  for (var i = 0, l = this.length; i < l; i++) {\n    if (this[i] === item) return i;\n  } return -1; };".replace(/\n/g, '');

  elements = {
    regular: 'a abbr address article aside audio b bdi bdo blockquote body button canvas caption cite code colgroup datalist dd del details dfn div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd label legend li main map mark menu meter nav noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small span strong style sub summary sup table tbody td textarea tfoot th thead time title tr u ul video',
    "void": 'area base br col command embed hr img input keygen link meta param source track wbr',
    obsolete: 'applet acronym bgsound dir frameset noframes isindex listing nextid noembed plaintext rb strike xmp big blink center font marquee multicol nobr spacer tt',
    obsolete_void: 'basefont frame'
  };

  merge_elements = function() {
    var a, args, element, i1, len, len1, ref, result, z;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    result = [];
    for (z = 0, len = args.length; z < len; z++) {
      a = args[z];
      ref = elements[a].split(' ');
      for (i1 = 0, len1 = ref.length; i1 < len1; i1++) {
        element = ref[i1];
        if (indexOf.call(result, element) < 0) {
          result.push(element);
        }
      }
    }
    return result;
  };

  coffeekup.tags = merge_elements('regular', 'obsolete', 'void', 'obsolete_void');

  coffeekup.self_closing = merge_elements('void', 'obsolete_void');

  skeleton = function(__data) {
    var __ck, _coffeescript_ids_done, _global_ids, _modules_ids, coffeescript, comment, doctype, h, id, ie, tag, text, totext;
    if (__data == null) {
      __data = {};
    }
    if (__data.format == null) {
      __data.format = false;
    }
    if (__data.autoescape == null) {
      __data.autoescape = false;
    }
    if (__data.module_path == null) {
      __data.module_path = 'global';
    }
    if (__data.local_ids == null) {
      __data.local_ids = {};
    }
    __ck = {
      buffer: [],
      ids: null,
      esc: function(txt) {
        if (__data.autoescape) {
          return h(txt);
        } else {
          return String(txt);
        }
      },
      tabs: 0,
      repeat: function(string, count) {
        return Array(count + 1).join(string);
      },
      indent: function() {
        if (__data.format) {
          return text(this.repeat('  ', this.tabs));
        }
      },
      tag: function(name, args) {
        var combo, i, len, z;
        combo = [name];
        for (z = 0, len = args.length; z < len; z++) {
          i = args[z];
          combo.push(i);
        }
        return tag.apply(__data, combo);
      },
      render_idclass: function(str) {
        var c, classes, i, i1, id, len, len1, ref, z;
        classes = [];
        ref = str.split('.');
        for (z = 0, len = ref.length; z < len; z++) {
          i = ref[z];
          if (indexOf.call(i, '#') >= 0) {
            id = i.replace('#', '');
          } else {
            if (i !== '') {
              classes.push(i);
            }
          }
        }
        if (id) {
          text(" id=\"" + id + "\"");
        }
        if (classes.length > 0) {
          text(" class=\"");
          for (i1 = 0, len1 = classes.length; i1 < len1; i1++) {
            c = classes[i1];
            if (c !== classes[0]) {
              text(' ');
            }
            text(c);
          }
          return text('"');
        }
      },
      render_attrs: function(obj, prefix) {
        var k, results, v;
        if (prefix == null) {
          prefix = '';
        }
        results = [];
        for (k in obj) {
          v = obj[k];
          if (typeof v === 'boolean' && v) {
            v = k;
          }
          if (typeof v === 'function') {
            v = "(" + v + ").call(this);";
          }
          if ((v != null) && typeof v === 'object' && !(v instanceof Array)) {
            results.push(this.render_attrs(v, prefix + k + '-'));
          } else if ((v != null) && v !== false) {
            results.push(text(" " + (prefix + k) + "=\"" + (this.esc(v)) + "\""));
          } else {
            results.push(void 0);
          }
        }
        return results;
      },
      render_contents: function(contents) {
        var result;
        switch (typeof contents) {
          case 'string':
          case 'number':
          case 'boolean':
            return text(this.esc(contents));
          case 'function':
            if (__data.format) {
              text('\n');
            }
            this.tabs++;
            result = contents.call(__data);
            if (typeof result === 'string') {
              this.indent();
              text(this.esc(result));
              if (__data.format) {
                text('\n');
              }
            }
            this.tabs--;
            return this.indent();
        }
      },
      render_tag: function(name, idclass, attrs, contents) {
        if (__ck.buffer[__ck.buffer.length - 1] === "\n") {
          this.indent();
        }
        text("<" + name);
        if (idclass) {
          this.render_idclass(idclass);
        }
        if (attrs) {
          this.render_attrs(attrs);
        }
        if (indexOf.call(this.self_closing, name) >= 0) {
          text(' />');
          if (__data.format) {
            text('\n');
          }
        } else {
          text('>');
          this.render_contents(contents);
          text("</" + name + ">");
          if (__data.format) {
            text('\n');
          }
        }
        return null;
      }
    };
    tag = function() {
      var a, args, attrs, contents, idclass, len, name, z;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      for (z = 0, len = args.length; z < len; z++) {
        a = args[z];
        switch (typeof a) {
          case 'function':
            contents = a;
            break;
          case 'object':
            attrs = a;
            break;
          case 'number':
          case 'boolean':
            contents = a;
            break;
          case 'string':
            if (args.length === 1) {
              if (args[0][0] !== '.' || args[0].indexOf(' ') >= 0) {
                contents = a;
              } else {
                idclass = a;
                contents = null;
              }
            } else {
              if (a === args[0]) {
                idclass = a;
              } else {
                contents = a;
              }
            }
        }
      }
      return __ck.render_tag(name, idclass, attrs, contents);
    };
    _global_ids = {};
    _modules_ids = {};
    _coffeescript_ids_done = {
      global: null,
      module: {}
    };
    id = function(db, value) {
      var ids, key, len, prefix, ref, z;
      if (typeof db === 'string') {
        value = db;
        db = null;
      }
      if (typeof value === 'string') {
        ids = (ref = db != null ? db : __data.local_ids) != null ? ref : {};
        prefix = value ? value.replace(/[\.\#]/g, '-') : '';
        for (z = 0, len = arguments.length; z < len; z++) {
          key = arguments[z];
          if (key !== db) {
            if (ids[key] == null) {
              ids[key] = prefix + id();
            }
          }
        }
        if (arguments.length <= 2) {
          return ids[value] != null ? ids[value] : ids[value] = prefix + id();
        } else {
          return ids;
        }
      }
      if ((value != null) && typeof value === "number") {
        __data.id(parseInt(value));
      }
      return '_' + __data.id();
    };
    id.local = function(value) {
      return id(__data.local_ids, value);
    };
    id.module = function(value) {
      var name1;
      return id((_modules_ids[name1 = __data.module_path] != null ? _modules_ids[name1] : _modules_ids[name1] = {}), value);
    };
    id.global = function(value) {
      return id(_global_ids, value);
    };
    id.ids = function(db) {
      var _ids, ids, ref;
      _ids = (ref = db != null ? db : __data.local_ids) != null ? ref : {};
      ids = function(value) {
        var ref1;
        if (value == null) {
          return _ids;
        }
        return (ref1 = _ids[value]) != null ? ref1 : _ids[value] = id(value);
      };
      ids.toJSONString = function(var_name) {
        var func, k, v;
        func = "(function (key) {";
        func += "var _id = " + (function() {
          switch (var_name) {
            case 'id.module':
              return "document.querySelector(\"script[data-coffeekup-ids-module-" + (__data.hash(__data.module_path)) + "-\" + key.replace(/[\.\#]/g, '-') + \"]\" ).getAttribute(\"data-coffeekup-ids-module-" + (__data.hash(__data.module_path)) + "-\" + key.replace(/[\.\#]/g, '-'));";
            case 'id.general':
              return "document.querySelector(\"script[data-coffeekup-ids-general-\" + key.replace(/[\.\#]/g, '-') + \"]\").getAttribute(\"data-coffeekup-ids-general-\" + key.replace(/[\.\#]/g, '-'));";
            default:
              return "(" + (JSON.stringify(_ids)) + ")[key];";
          }
        })();
        if (var_name === 'id') {
          func += "if (_id == null && id.module != null) _id = id.module(key);";
        }
        if (var_name === 'id' || var_name === 'id.module') {
          func += "if (_id == null && id.global != null) _id = id.global(key);";
        }
        func += "    return (_id != null ? _id : '');\n})";
        return "" + func + (((function() {
          var ref1, results;
          ref1 = this;
          results = [];
          for (k in ref1) {
            if (!hasProp.call(ref1, k)) continue;
            v = ref1[k];
            if (k !== 'toJSONString') {
              results.push(";" + var_name + "." + k + "=" + (v.toJSONString ? v.toJSONString(var_name + '.' + k) : v.toString()));
            }
          }
          return results;
        }).call(this)).join(''));
      };
      return ids;
    };
    id.ids.local = function() {
      return id.ids(__data.local_ids);
    };
    id.ids.module = function() {
      var name1;
      return id.ids((_modules_ids[name1 = __data.module_path] != null ? _modules_ids[name1] : _modules_ids[name1] = {}));
    };
    id.ids.global = function() {
      return id.ids(_global_ids);
    };
    id.classes = id.ids;
    totext = function(func) {
      var old_buffer, temp_buffer;
      temp_buffer = [];
      old_buffer = __ck.buffer;
      __ck.buffer = temp_buffer;
      func();
      __ck.buffer = old_buffer;
      return temp_buffer.join('');
    };
    h = function(txt) {
      return String(txt).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };
    doctype = function(type) {
      if (type == null) {
        type = 'default';
      }
      text(__ck.doctypes[type]);
      if (__data.format) {
        return text('\n');
      }
    };
    text = function(txt) {
      __ck.buffer.push(String(txt));
      return null;
    };
    comment = function(cmt) {
      text("<!--" + cmt + "-->");
      if (__data.format) {
        return text('\n');
      }
    };
    coffeescript = function(param, func) {
      var base1, base2, has_local, has_module, ids_global, ids_module, idx, k, key, module_hash, ref, ref1, ref2, ref3, script_data, v, value;
      has_local = false;
      for (k in __data.local_ids) {
        has_local = true;
        break;
      }
      has_module = _modules_ids[__data.module_path] != null;
      if (has_local || has_module) {
        if (func == null) {
          func = param;
          param = null;
        }
        func = func != null ? func.toString() : void 0;
        if (!(((param != null ? param.id : void 0) != null) || (func == null))) {
          if ((idx = func.indexOf('id')) >= 0) {
            (param != null ? param : param = {}).id = (ref = id.ids.local()) != null ? ref : {};
          }
          if (idx > 0) {
            ids_module = id.ids.module();
            if (func.indexOf('module') >= 0) {
              param.id.module = ids_module != null ? ids_module : {};
            } else if (ids_module != null) {
              param.id.module = ids_module;
            }
            ids_global = id.ids.global();
            if (func.indexOf('global') >= 0) {
              param.id.global = ids_global != null ? ids_global : {};
            } else if (ids_global != null) {
              param.id.global = ids_global;
            }
            script_data = null;
            if ((((ref1 = param.id) != null ? ref1.module : void 0) != null) && _coffeescript_ids_done.module[__data.module_path] !== true) {
              module_hash = __data.hash(__data.module_path);
              ref2 = _modules_ids[__data.module_path];
              for (key in ref2) {
                value = ref2[key];
                if (script_data == null) {
                  script_data = {
                    data: {
                      coffeekup: {
                        ids: {
                          module: {}
                        }
                      }
                    }
                  };
                }
                if ((base1 = script_data.data.coffeekup.ids.module)[module_hash] == null) {
                  base1[module_hash] = {};
                }
                script_data.data.coffeekup.ids.module[module_hash][key.replace(/[\.\#]/g, '-')] = value;
                _coffeescript_ids_done.module[__data.module_path] = true;
              }
            }
            if ((((ref3 = param.id) != null ? ref3.global : void 0) != null) && _coffeescript_ids_done.global !== true) {
              for (key in _global_ids) {
                value = _global_ids[key];
                if (script_data == null) {
                  script_data = {
                    data: {
                      coffeekup: {
                        ids: {}
                      }
                    }
                  };
                }
                if ((base2 = script_data.data.coffeekup.ids).global == null) {
                  base2.global = {};
                }
                script_data.data.coffeekup.ids.global[key.replace(/[\.\#]/g, '-')] = value;
                _coffeescript_ids_done.global = true;
              }
            }
          }
        }
      }
      if (func) {
        script(script_data, ("" + __ck.coffeescript_helpers) + (param != null ? "\n(function() {var " + ((function() {
          var results;
          results = [];
          for (k in param) {
            v = param[k];
            results.push((k + "=") + (typeof v === 'function' ? (v.toJSONString != null ? v.toJSONString(k) : "" + (v.toString())) : JSON.stringify(v)));
          }
          return results;
        })()).join(',') + ";\n" : '') + ("(" + func + ").call(this)") + (param != null ? "}).call(this);" : ";"));
        return __ck.coffeescript_helpers = "";
      } else {
        switch (typeof param) {
          case 'function':
            script(__ck.coffeescript_helpers + "(" + param + ").call(this);");
            return __ck.coffeescript_helpers = "";
          case 'string':
            return script({
              type: 'text/coffeescript'
            }, function() {
              return param;
            });
          case 'object':
            (param != null ? param : param = {}).type = 'text/coffeescript';
            return script(param);
        }
      }
    };
    ie = function(condition, contents) {
      __ck.indent();
      text("<!--[if " + condition + "]>");
      __ck.render_contents(contents);
      text("<![endif]-->");
      if (__data.format) {
        return text('\n');
      }
    };
    return null;
  };

  skeleton = String(skeleton).replace(/function\s*\(.*\)\s*\{/, '').replace(/return null;\s*\}$/, '');

  skeleton = coffeescript_helpers + skeleton;

  stringify = function() {
    var doit;
    doit = function(o) {
      var k, result, v;
      result = [];
      result.push((function() {
        switch (Object.prototype.toString.apply(o)) {
          case '[object Object]':
            return "{" + (((function() {
              var results;
              results = [];
              for (k in o) {
                if (!hasProp.call(o, k)) continue;
                v = o[k];
                results.push("'" + k + "':" + doit(v));
              }
              return results;
            })()).join(',')) + "}";
          case '[object Array]':
            return "function () {var a = []; var o = {" + (((function() {
              var results;
              results = [];
              for (k in o) {
                if (!hasProp.call(o, k)) continue;
                v = o[k];
                results.push(k + ':' + doit(v));
              }
              return results;
            })()).join(',')) + "};for (var k in o) {a[k] = o[k];} return a; }()";
          case '[object Boolean]':
            return o;
          case '[object Number]':
            return o;
          case '[object Date]':
            return "new Date(" + (o.valueOf()) + ")";
          case '[object Function]':
            return "function(){return (" + (o.toString()) + ").apply(__data, arguments);}";
          case '[object Math]':
            return 'Math';
          case '[object String]':
            return "'" + (o.replace(/\'/g, '\\\'')) + "'";
          case '[object Undefined]':
            return 'void 0';
          case '[object Null]':
            return 'null';
        }
      })());
      return result;
    };
    return doit(arguments[0]).join(', ');
  };

  coffeekup.compile = function(template, options) {
    var code, hardcoded_locals, i1, k, len, len1, ref, ref1, t, tag_functions, tags_used, v, z;
    if (options == null) {
      options = {};
    }
    if (typeof template === 'function') {
      template = String(template);
    } else if (typeof template === 'string' && (coffee != null)) {
      template = coffee.compile(template, {
        bare: true
      });
      template = "function(){" + template + "}";
    }
    hardcoded_locals = '';
    if (options.hardcode) {
      ref = options.hardcode;
      for (k in ref) {
        v = ref[k];
        if (!(options.document && typeof v === 'function')) {
          hardcoded_locals += "var " + k + " = " + (stringify(v)) + ";";
        } else {
          hardcoded_locals += "var " + k + " = function() { return (" + (stringify(v)) + ").apply(this.bin ? this : __data.document, arguments) };";
        }
      }
    }
    tag_functions = '';
    tags_used = [];
    ref1 = coffeekup.tags;
    for (z = 0, len = ref1.length; z < len; z++) {
      t = ref1[z];
      if (options.all_tags || template.indexOf(t) > -1 || hardcoded_locals.indexOf(t) > -1) {
        tags_used.push(t);
      }
    }
    tag_functions += "var " + (tags_used.join(',')) + ";";
    for (i1 = 0, len1 = tags_used.length; i1 < len1; i1++) {
      t = tags_used[i1];
      tag_functions += t + " = function(){return __ck.tag('" + t + "', arguments);};";
    }
    code = tag_functions + hardcoded_locals + skeleton;
    code += "__ck.doctypes = " + (JSON.stringify(coffeekup.doctypes)) + ";";
    code += "__ck.coffeescript_helpers = " + (JSON.stringify(coffeescript_helpers)) + ";";
    code += "__ck.self_closing = " + (JSON.stringify(coffeekup.self_closing)) + ";";
    if (options.locals) {
      code += 'with(__data.locals){';
    }
    code += ("(" + template + ").call(__data") + (options.bin != null ? ", __data.bin" : '') + ");";
    if (options.locals) {
      code += '}';
    }
    code += "return __ck.buffer.join('');";
    return new Function('__data', code);
  };

  cache = {};

  coffeekup.render = function(template, data, options) {
    var k, tpl, v;
    if (data == null) {
      data = {};
    }
    if (options == null) {
      options = {};
    }
    for (k in options) {
      v = options[k];
      data[k] = v;
    }
    if (data.cache == null) {
      data.cache = false;
    }
    data.hash = function(b) {
      var c, d, e, f, g, h, i, j, l, m, n, o, p, q, r, s, t, u, w, x, y;
      c = function(a, b) {
        return a >>> b | a << 32 - b;
      };
      d = void 0;
      e = void 0;
      f = Math.pow;
      g = f(2, 32);
      h = 'length';
      i = '';
      j = [];
      k = 8 * b[h];
      l = [];
      m = [];
      n = m[h];
      o = {};
      p = 2;
      while (64 > n) {
        if (!o[p]) {
          d = 0;
          while (313 > d) {
            o[d] = p;
            d += p;
          }
          l[n] = f(p, .5) * g | 0;
          m[n++] = f(p, 1 / 3) * g | 0;
        }
        p++;
      }
      b += '\x80';
      while (b[h] % 64 - 56) {
        b += '\x00';
      }
      d = 0;
      while (d < b[h]) {
        if ((e = b.charCodeAt(d), e >> 8)) {
          return;
        }
        j[d >> 2] |= e << (3 - d) % 4 * 8;
        d++;
      }
      j[j[h]] = k / g | 0;
      j[j[h]] = k;
      e = 0;
      while (e < j[h]) {
        q = j.slice(e, e += 16);
        r = l;
        l = l.slice(0, 8);
        d = 0;
        while (64 > d) {
          s = q[d - 15];
          t = q[d - 2];
          u = l[0];
          v = l[4];
          w = l[7] + (c(v, 6) ^ c(v, 11) ^ c(v, 25)) + (v & l[5] ^ ~v & l[6]) + m[d] + (q[d] = 16 > d ? q[d] : q[d - 16] + (c(s, 7) ^ c(s, 18) ^ s >>> 3) + q[d - 7] + (c(t, 17) ^ c(t, 19) ^ t >>> 10) | 0);
          x = (c(u, 2) ^ c(u, 13) ^ c(u, 22)) + (u & l[1] ^ u & l[2] ^ l[1] & l[2]);
          l = [w + x | 0].concat(l);
          l[4] = l[4] + w | 0;
          d++;
        }
        d = 0;
        while (8 > d) {
          l[d] = l[d] + r[d] | 0;
          d++;
        }
      }
      d = 0;
      while (8 > d) {
        e = 3;
        while (e + 1) {
          y = l[d] >> 8 * e & 255;
          i += (16 > y ? 0 : '') + y.toString(16);
          e--;
        }
        d++;
      }
      return i;
    };
    data.id = (function() {
      var api, base, blockSize, c, discreteValues, pad, randomBlock, safeCounter;
      c = 0;
      blockSize = 4;
      base = 36;
      discreteValues = Math.pow(base, blockSize);
      pad = function(num, size) {
        var s;
        s = '000000000' + num;
        return s.substr(s.length - size);
      };
      randomBlock = function() {
        return pad((Math.random() * discreteValues << 0).toString(base), blockSize);
      };
      safeCounter = function() {
        c = c < discreteValues ? c : 0;
        c++;
        return c - 1;
      };
      api = function() {
        var counter, fingerprint, letter, random, timestamp;
        letter = 'c';
        timestamp = (new Date).getTime().toString(base);
        counter = void 0;
        fingerprint = api.fingerprint();
        random = randomBlock() + randomBlock();
        counter = pad(safeCounter().toString(base), blockSize);
        return letter + timestamp + counter + fingerprint + random;
      };
      api.slug = function() {
        var counter, date, print, random;
        date = (new Date).getTime().toString(36);
        counter = void 0;
        print = api.fingerprint().slice(0, 1) + api.fingerprint().slice(-1);
        random = randomBlock().slice(-2);
        counter = safeCounter().toString(36).slice(-4);
        return date.slice(-2) + counter + print + random;
      };
      api.globalCount = typeof window === "undefined" || window === null ? void 0 : function() {
        cache = (function() {
          var count, i;
          i = void 0;
          count = 0;
          for (i in window) {
            count++;
          }
          return count;
        })();
        api.globalCount = function() {
          return cache;
        };
        return cache;
      };
      api.fingerprint = typeof window !== "undefined" && window !== null ? function() {
        return pad((navigator.mimeTypes.length + navigator.userAgent.length).toString(36) + api.globalCount().toString(36), 4);
      } : function() {
        var hostId, hostname, length, os, padding, pid;
        os = require('os');
        padding = 2;
        pid = pad(process.pid.toString(36), padding);
        hostname = os.hostname();
        length = hostname.length;
        hostId = pad(hostname.split('').reduce((function(prev, char) {
          return +prev + char.charCodeAt(0);
        }), +length + 36).toString(36), padding);
        return pid + hostId;
      };
      return api;
    })();
    if (data.cache && (cache[template] != null)) {
      tpl = cache[template];
    } else if (data.cache) {
      tpl = cache[template] = coffeekup.compile(template, data);
    } else {
      tpl = coffeekup.compile(template, data);
    }
    return tpl(data);
  };

  if (typeof window === "undefined" || window === null) {
    coffeekup.adapters = {
      simple: coffeekup.render,
      meryl: coffeekup.render,
      express: {
        TemplateError: (function(superClass) {
          extend(_Class, superClass);

          function _Class(message) {
            this.message = message;
            Error.call(this, this.message);
            Error.captureStackTrace(this, arguments.callee);
          }

          _Class.prototype.name = 'TemplateError';

          return _Class;

        })(Error),
        compile: function(template, data) {
          var TemplateError, e, tpl;
          if (data.hardcode == null) {
            data.hardcode = {};
          }
          data.hardcode.partial = function() {
            return text(this.partial.apply(this, arguments));
          };
          TemplateError = this.TemplateError;
          try {
            tpl = coffeekup.compile(template, data);
          } catch (error) {
            e = error;
            throw new TemplateError("Error compiling " + data.filename + ": " + e.message);
          }
          return function() {
            try {
              return tpl.apply(null, arguments);
            } catch (error) {
              e = error;
              throw new TemplateError("Error rendering " + data.filename + ": " + e.message);
            }
          };
        }
      }
    };
  }

}).call(this);
