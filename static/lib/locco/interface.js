// Generated by CoffeeScript 1.12.6
(function() {
  var Chocokup, Interface, _, _module,
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('../../general/chocodash');

  Chocokup = require('../../general/chocokup');

  Interface = _.prototype({
    constructor: function(defaults, use, service) {
      var item, name;
      if (service == null) {
        service = use;
        use = void 0;
      }
      if (service == null) {
        service = defaults;
        defaults = void 0;
      }
      if (typeof service === 'function') {
        service = {
          render: service
        };
      }
      if ((service != null) && (defaults != null)) {
        service.defaults = defaults;
      }
      if ((service != null) && (use != null)) {
        service.use = use;
      }
      if (service != null) {
        if (service.defaults != null) {
          if (typeof service.defaults === 'function') {
            this.defaults = service.defaults;
          } else {
            this.defaults = _.defaults(this.defaults, service.defaults);
          }
        }
        if (service.locks != null) {
          if (typeof service.locks === 'function') {
            this.locks = service.locks;
          } else {
            this.locks = (this.locks != null ? this.locks : this.locks = []).concat(service.locks);
          }
        }
        if (service.use != null) {
          if (typeof service.use === 'function') {
            this.use = service.use;
          } else {
            this.use = _.defaults(this.use, service.use);
          }
        }
        if (service.check != null) {
          this.check = service.check;
        }
        if (service.steps != null) {
          this.steps = service.steps;
        }
        if (service.action != null) {
          this.render = service.action;
        }
        for (name in service) {
          item = service[name];
          if (name !== 'defaults' && name !== 'use' && name !== 'locks' && name !== 'check' && name !== 'steps') {
            this[name] = item;
          }
        }
        if (this.embedded == null) {
          this.embedded = void 0;
        }
        this.module_path = (function() {
          var files_stack, found, i, j, len, len1, line, oldPST, stack;
          files_stack = [];
          if (Error.prepareStackTrace != null) {
            oldPST = Error.prepareStackTrace;
            Error.prepareStackTrace = function(err, stack) {
              return stack;
            };
            stack = (new Error).stack;
            Error.prepareStackTrace = oldPST;
            if (typeof stack === 'string') {
              files_stack = stack.split('\n');
            } else {
              for (i = 0, len = stack.length; i < len; i++) {
                line = stack[i];
                files_stack.push(line.getFileName());
              }
            }
          } else {
            stack = (new Error).stack;
            files_stack = stack.toString().split('\n');
          }
          found = false;
          for (j = 0, len1 = files_stack.length; j < len1; j++) {
            line = files_stack[j];
            if (line.indexOf('/chocodash.') >= 0) {
              found = true;
            } else if (line.indexOf('\\chocodash.') >= 0) {
              found = true;
            } else if (found) {
              return line;
            }
          }
          return 'global';
        })();
      }
    },
    bind: function(actor, document, name1) {
      this.name = name1;
      if (!((this.actor != null) && (this.document != null))) {
        this.actor = actor;
        this.document = document;
        switch (_.type(this.update)) {
          case _.Type.Function:
            return this.observe(this.update);
          case _.Type.String:
            return this.observe((function(_this) {
              return function(html) {
                $(_this.update).html(html);
              };
            })(this));
        }
      }
    },
    review: function(bin, reaction) {
      var check, ref, ref1, ref2, self;
      if (reaction.certified == null) {
        reaction.certified = true;
      }
      if (this.embedded != null) {
        this.embedded.review(bin, reaction);
      }
      if (reaction.certified) {
        self = {
          bin: bin,
          props: bin,
          space: bin != null ? (ref = bin.__) != null ? ref.space : void 0 : void 0,
          document: this.document,
          'interface': this,
          actor: this.actor
        };
        check = {
          defaults: (function(_this) {
            return function(object, defaults) {
              var set;
              if (typeof defaults === 'function') {
                defaults = defaults.call(self, object);
              }
              set = function(o, d) {
                var dk, dv;
                for (dk in d) {
                  if (!hasProp.call(d, dk)) continue;
                  dv = d[dk];
                  if ((_.isBasicObject(o[dk]) || o[dk] instanceof Interface.Web.Global) && (_.isBasicObject(dv) || dv instanceof Interface.Web.Global)) {
                    set(o[dk], dv);
                  } else {
                    if (o[dk] == null) {
                      o[dk] = dv;
                    }
                  }
                }
                return o;
              };
              return set(object, defaults);
            };
          })(this),
          use: (function(_this) {
            return function(object, required) {
              var set;
              if (typeof required === 'function') {
                required = required.call(self, object);
              }
              set = function(o, d) {
                var dk, dv;
                for (dk in d) {
                  if (!hasProp.call(d, dk)) continue;
                  dv = d[dk];
                  if ((_.isBasicObject(o[dk]) || o[dk] instanceof Interface.Web.Global) && (_.isBasicObject(dv) || dv instanceof Interface.Web.Global)) {
                    set(o[dk], dv);
                  } else {
                    o[dk] = dv;
                  }
                }
                return o;
              };
              return set(object, required);
            };
          })(this),
          locks: (function(_this) {
            return function(keys, locks) {
              var i, len, lock, ref1;
              if (locks == null) {
                return true;
              }
              if (typeof locks === 'function') {
                locks = locks.call(self);
              }
              for (i = 0, len = locks.length; i < len; i++) {
                lock = locks[i];
                if (!(((ref1 = lock.key) != null ? ref1 : lock) in keys)) {
                  return false;
                }
              }
              return true;
            };
          })(this),
          values: (function(_this) {
            return function(bin, controller) {
              return controller.call(self, bin);
            };
          })(this)
        };
        if (this.defaults != null) {
          check.defaults(bin, this.defaults);
        }
        if (this.use != null) {
          check.use(bin, this.use);
        }
        if (reaction.certified) {
          if (this.locks != null) {
            reaction.certified = check.locks((ref1 = bin.__) != null ? (ref2 = ref1.session) != null ? ref2.keys : void 0 : void 0, this.locks);
          }
        }
        if (reaction.certified) {
          if (this.check != null) {
            reaction.certified = check.values(bin, this.check);
          }
        }
      }
    },
    submit: function(bin) {
      var publisher, reaction;
      if (bin == null) {
        bin = {};
      }
      publisher = new _.Publisher;
      reaction = new Interface.Reaction;
      _.flow({
        self: this
      }, function(run) {
        var getSelf;
        getSelf = function(end) {
          var ref, respond, transmit;
          respond = function(o) {
            reaction.props = reaction.bin = o;
            return end();
          };
          respond.later = end.later;
          transmit = function(actor, service, bin) {
            var interface_;
            if (bin == null) {
              bin = {};
            }
            if (typeof service !== 'string') {
              interface_ = actor;
              bin = service;
              service = '';
            } else {
              interface_ = actor[service];
            }
            interface_.submit(_.extend(this.bin, bin)).subscribe((function(_this) {
              return function(reaction) {
                return _this.respond(reaction.bin);
              };
            })(this));
            return respond.later;
          };
          return {
            bin: bin,
            props: bin,
            space: bin != null ? (ref = bin.__) != null ? ref.space : void 0 : void 0,
            document: this.document,
            'interface': this,
            actor: this.actor,
            reaction: reaction,
            respond: respond,
            transmit: transmit
          };
        };
        run(function(end) {
          var ref, result, self;
          this.review(bin, reaction);
          if (reaction.certified && ((ref = this.embedded) != null ? ref.steps : void 0)) {
            self = getSelf.call(this.embedded, end);
            result = this.embedded.steps.call(self, bin);
          }
          return end["with"](result);
        });
        run(function(end) {
          var result, self;
          if (reaction.certified && (this.steps != null)) {
            self = getSelf.call(this, end);
            result = this.steps.call(self, bin);
          }
          return end["with"](result);
        });
        run(function(end) {
          var redirect, result, self;
          if (reaction.certified) {
            if (this.render != null) {
              self = getSelf.call(this, end);
              result = this.render.call(self, bin);
              if (!((reaction.bin != null) || result === end.later)) {
                reaction.props = reaction.bin = result;
              }
            }
          } else {
            redirect = this.embedded != null ? this.embedded.redirect : this.redirect;
            if (redirect != null) {
              self = getSelf.call(this, end);
              reaction.redirect = typeof redirect === 'function' ? redirect.call(self) : redirect;
            }
          }
          return end["with"](result);
        });
        return run(function() {
          return publisher.notify(reaction);
        });
      });
      return publisher;
    },
    observe: function(render) {
      return new _.Observer((function(_this) {
        return function() {
          var ref;
          if ((ref = _this.document.signal) != null) {
            ref.value();
          }
          return _this.submit().subscribe(function(arg) {
            var bin;
            bin = arg.bin;
            return render(typeof bin.render === 'function' ? bin.render() : bin);
          });
        };
      })(this));
    }
  });

  Interface.Reaction = _.prototype({
    constructor: function(bin1, certified) {
      this.bin = bin1;
      this.certified = certified;
      this.props = this.bin;
    }
  });

  Interface.Remote = _.prototype({
    inherit: Interface,
    use: function() {
      return this.submit = function(bin) {
        if (bin == null) {
          bin = {};
        }
        if ('__' in bin) {
          return _["super"](this, bin);
        } else {
          return this.actor.submit(this.name, bin);
        }
      };
    }
  });

  Interface.Web = _.prototype({
    inherit: Interface,
    use: function() {
      var get_declare_kups;
      get_declare_kups = function(kups) {
        var declare_kups, declare_path, i, j, kup, len, len1, path, ref, step;
        declare_kups = [];
        declare_path = {};
        for (i = 0, len = kups.length; i < len; i++) {
          kup = kups[i];
          path = "this.locals";
          ref = kup.scope;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            step = ref[j];
            path += "." + step;
            if (declare_path[path] == null) {
              declare_path[path] = path + " = " + path + " ? " + path + " : {}";
              declare_kups.push(declare_path[path]);
            }
          }
          declare_kups.push("this.locals" + (kup.scope.length > 0 ? '.' + kup.scope.join('.') : '') + "." + kup.name + " = _kup_" + kup.id);
        }
        return declare_kups;
      };
      this.type = 'App';
      this.review = function(bin, reaction) {
        var check_interfaces, checked, checked_kups, scope;
        _["super"](Interface.Web.prototype.review, this, bin, reaction);
        if (reaction.certified) {
          reaction.props = reaction.bin = '';
          if (reaction.kups === false) {
            return;
          }
          scope = [];
          checked = [];
          checked_kups = {};
          check_interfaces = function(bin) {
            var base, declare_kups, defaults, kups, local_kups, name, name1, ref, ref1, ref2, ref3, ref4, scope_, self, service, service_id, service_kup, use;
            local_kups = [];
            for (name in bin) {
              service = bin[name];
              if (service instanceof Interface.Web) {
                if ((service.defaults != null) && indexOf.call(checked, service) < 0) {
                  checked.push(service);
                  defaults = service.defaults;
                  self = {
                    bin: bin,
                    props: bin,
                    space: bin != null ? (ref = bin.__) != null ? ref.space : void 0 : void 0,
                    document: this.document,
                    'interface': this,
                    actor: this.actor
                  };
                  if (typeof defaults === 'function') {
                    defaults = defaults.call(self, bin);
                  }
                  scope_ = scope;
                  scope = [];
                  kups = checked_kups[service] = check_interfaces.call(this, defaults);
                  scope = scope_;
                } else {

                }
                if ((service.use != null) && indexOf.call(checked, service) < 0) {
                  checked.push(service);
                  use = service.use;
                  self = {
                    bin: bin,
                    props: bin,
                    space: bin != null ? (ref1 = bin.__) != null ? ref1.space : void 0 : void 0,
                    document: this.document,
                    'interface': this,
                    actor: this.actor
                  };
                  if (typeof use === 'function') {
                    use = use.call(self, bin);
                  }
                  scope_ = scope;
                  scope = [];
                  kups = checked_kups[service] = check_interfaces.call(this, use);
                  scope = scope_;
                } else {
                  kups = (ref2 = checked_kups[service]) != null ? ref2 : [];
                }
                declare_kups = get_declare_kups(kups);
                service_id = _.Uuid().replace(/\-/g, '_');
                service_kup = new Function('args', "var interface = this.interface, bin = this.bin, props = this.props, keys = this.keys, actor = this.actor, space = this.space, module_path = this.module_path, local_ids = this.local_ids, __hasProp = {}.hasOwnProperty, Interface = this.params.Interface;\ntry {this.interface = bin" + (scope.length > 0 ? '.' + scope.join('.') : '') + "." + name + ";} \ncatch (error) { try {this.interface = bin." + name + ";} catch (error) {}; };\nthis.actor = this.interface != null ? (this.interface.actor != null ? this.interface.actor : actor) : actor;\nthis.keys = [];\nthis.props = this.bin = {__:bin.__};\nthis.space = this.bin != null && this.bin.__ != null ? this.bin.__.space : {};\nthis.module_path = '" + service.module_path + "';\nthis.local_ids = {};\nbin_cp = function(b_, _b) {\n  var done = false, k, v;\n  for (k in _b) {\n    if (!hasProp.call(_b, k) || (k === '__')) continue; \n    if (((v = _b[k]) != null ? v.constructor : void 0) === {}.constructor) { b_[k] = {}; if (!(done = bin_cp(b_[k], v))) { delete b_[k]; } } \n    else if ((v instanceof Interface.Web) || (v instanceof Interface.Web.Global)) { b_[k] = v; done = true; }\n  }\n  return done;\n};\nbin_cp(this.bin, bin);\nif (args != null) {for (k in args) {if (__hasProp.call(args, k)) { this.bin[k] = args[k]; this.keys.push(k); }}}\nreaction = {kups:false};\nif (this.interface != null)\n    this.interface.review(this.bin, reaction);\nif (reaction.certified) {\n    " + (declare_kups.join(';\n')) + ";\n    with (this.locals) {(" + (((ref3 = (ref4 = service.render) != null ? ref4.overriden : void 0) != null ? ref3 : service.render).toString()) + ").call(this, this.bin);}\n}\nthis.bin = bin; this.props = props; this.keys = keys; this.interface = interface; this.actor = actor; this.space = space; this.module_path = module_path; this.local_ids = local_ids;\nreturn reaction.certified;");
                if (reaction.kups == null) {
                  reaction.kups = {};
                }
                if ((base = reaction.kups)[name1 = "_kup_" + service_id] == null) {
                  base[name1] = service_kup;
                }
                local_kups.push({
                  name: name,
                  scope: [].concat(scope),
                  id: service_id
                });
              } else {
                if (name !== '__' && (_.isBasicObject(service) || service instanceof Interface.Web.Global)) {
                  scope.push(name);
                  checked.push(service);
                  local_kups = local_kups.concat(check_interfaces.call(this, service));
                  scope.pop();
                }
              }
            }
            return local_kups;
          };
          checked.push(bin);
          return reaction.local_kups = check_interfaces.call(this, bin);
        }
      };
      return this.submit = function(bin) {
        var callback, chocokup_code, ref, ref1, render_code, result;
        if (!((ref = this.render) != null ? ref.overriden : void 0)) {
          render_code = (ref1 = this.render) != null ? ref1 : function() {};
          chocokup_code = null;
          this.render = function(bin) {
            var declare_kups, kups, local_kups, options, ref2, transmit;
            if (bin == null) {
              bin = {};
            }
            kups = this.reaction.kups;
            delete this.reaction.kups;
            local_kups = this.reaction.local_kups;
            delete this.reaction.local_kups;
            declare_kups = get_declare_kups(local_kups);
            chocokup_code = declare_kups.length > 0 ? new Function('args', "this.self.keys = [];\nthis.module_path = this.self.module_path = '" + this["interface"].module_path + "';\nthis.local_ids = {};\nif (args != null) {for (k in args) {if ({}.hasOwnProperty.call(args, k)) { this.self.bin[k] = args[k]; this.self.keys.push(k); }}}\n" + (declare_kups.join(';\n')) + ";\nwith (this.locals) {return (" + (render_code.toString()) + ").apply(this.self, arguments);}") : new Function('args', "this.module_path = this.self.module_path = '" + this["interface"].module_path + "';\nthis.local_ids = {};\nreturn (" + (render_code.toString()) + ").apply(this.self, arguments);");
            transmit = function(actor, service, bin_) {
              var interface_;
              if (bin_ == null) {
                bin_ = {};
              }
              if (typeof service !== 'string') {
                interface_ = actor;
                bin_ = service;
                service = '';
              } else {
                interface_ = actor[service];
              }
              return interface_.call(options, _.extend(bin, bin_));
            };
            if (this.transmit != null) {
              this.transmit = transmit;
            }
            options = {
              bin: bin,
              props: bin,
              space: bin != null ? (ref2 = bin.__) != null ? ref2.space : void 0 : void 0,
              document: this.document,
              Interface: Interface,
              'self': this,
              actor: this.actor,
              kups: kups,
              transmit: transmit
            };
            if (bin.theme != null) {
              options.theme = bin.theme;
            }
            if (bin.with_coffee != null) {
              options.with_coffee = bin.with_coffee;
            }
            if (bin.manifest != null) {
              options.manifest = bin.manifest;
            }
            return this.reaction.props = this.reaction.bin = (function() {
              var ref3;
              switch (this["interface"].type) {
                case 'Panel':
                  return new Chocokup.Panel(options, chocokup_code);
                default:
                  return new Chocokup[this["interface"].type]((ref3 = bin != null ? bin.name : void 0) != null ? ref3 : '', options, chocokup_code);
              }
            }).call(this);
          };
          this.render.overriden = chocokup_code != null ? chocokup_code : render_code;
        }
        if (typeof bin === 'function') {
          callback = bin;
          bin = {};
        }
        result = _["super"](this, bin);
        if (callback != null) {
          result.subscribe(function(reaction) {
            return callback(reaction.bin.render());
          });
        }
        return result;
      };
    }
  });

  Interface.Web.Global = _.prototype({
    constructor: function(o) {
      var k, results, v;
      results = [];
      for (k in o) {
        if (!hasProp.call(o, k)) continue;
        v = o[k];
        results.push(this[k] = v);
      }
      return results;
    }
  });

  Interface.Web.App = Interface.Web;

  Interface.Web.Document = _.prototype({
    inherit: Interface.Web,
    use: function() {
      return this.type = 'Document';
    }
  });

  Interface.Web.Panel = Interface.Web.Html = _.prototype({
    inherit: Interface.Web,
    use: function() {
      return this.type = 'Panel';
    }
  });

  _module = typeof window !== "undefined" && window !== null ? window : module;

  if (_module.exports != null) {
    _module.exports = Interface;
  } else {
    if (window.Locco == null) {
      window.Locco = {};
    }
    window.Locco.Interface = Interface;
  }

}).call(this);
