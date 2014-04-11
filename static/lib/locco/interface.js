// Generated by CoffeeScript 1.7.1
(function() {
  var Chocokup, Interface, _, _module, _ref,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('../../general/chocodash');

  Chocokup = require('../../general/chocokup');

  Interface = _.prototype({
    constructor: function(service) {
      if (typeof service === 'function') {
        service = {
          action: service
        };
      }
      if ((service != null ? service.rules : void 0) != null) {
        this.rules = _.defaults(this.rules, service.rules);
      }
      if ((service != null ? service.action : void 0) != null) {
        this.action = service.action;
      }
    },
    review: function(bin, reaction, next) {
      var check, check_services, review_result, _ref, _ref1, _ref2;
      check = {
        defaults: function(object, defaults) {
          var set;
          set = function(o, d) {
            var dk, dv;
            for (dk in d) {
              if (!__hasProp.call(d, dk)) continue;
              dv = d[dk];
              if (_.type(o[dk]) === _.Type.Object && _.type(dv) === _.Type.Object && !dv instanceof Interface) {
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
        },
        locks: function(keys, locks) {
          var lock, _i, _len;
          if (locks == null) {
            return true;
          }
          for (_i = 0, _len = locks.length; _i < _len; _i++) {
            lock = locks[_i];
            if (__indexOf.call(keys, lock) < 0) {
              return false;
            }
          }
          return true;
        },
        values: function(bin, controller) {
          return controller.call(bin);
        }
      };
      check_services = function() {
        var check_services_result;
        check_services_result = null;
        _.serialize(function(defer) {
          var check_service;
          check_service = function(service_bin) {
            var name, service, _fn, _results;
            _fn = function(_bin, _name, _service) {
              return defer(function(next_service) {
                var service_result, _base;
                if ((_base = _bin[_name]).bin == null) {
                  _base.bin = {
                    __: _bin.__
                  };
                }
                service_result = _service.review(_bin[_name].bin, reaction, next_service);
                if (service_result === next_service) {
                  check_services_result = next;
                } else {
                  next_service();
                }
                return service_result;
              });
            };
            _results = [];
            for (name in service_bin) {
              service = service_bin[name];
              if (!(service instanceof Interface)) {
                continue;
              }
              _fn(service_bin, name, service);
              _results.push(check_service(service_bin[name]));
            }
            return _results;
          };
          check_service(bin);
          return defer(false, function() {
            return next();
          });
        });
        return check_services_result;
      };
      if (reaction.certified == null) {
        reaction.certified = true;
      }
      if (this.rules != null) {
        if (this.rules.defaults != null) {
          check.defaults(bin, this.rules.defaults);
        }
        if (this.rules.locks != null) {
          reaction.certified = check.locks((_ref = bin.__) != null ? (_ref1 = _ref.session) != null ? _ref1.keys : void 0 : void 0, this.rules.locks);
        }
        if (this.rules.values != null) {
          reaction.certified = check.values(bin, this.rules.values);
        }
        if (reaction.certified && (((_ref2 = this.rules) != null ? _ref2.steps : void 0) != null)) {
          review_result = this.rules.steps.call({
            bin: bin,
            reaction: reaction
          }, {
            bin: bin,
            reaction: reaction,
            next: check_services
          });
        }
        switch (review_result) {
          case check_services:
            return next;
          case void 0:
            return check_services();
          default:
            return null;
        }
      }
      return check_services();
    },
    submit: function(bin) {
      var publisher, reaction;
      publisher = new _.Publisher;
      reaction = new Interface.Reaction;
      _.serialize(this, function(step) {
        step(function(next) {
          var result;
          result = this.review(bin, reaction, next);
          if (result !== next) {
            return next();
          }
        });
        step(function(next) {
          var result;
          if (reaction.certified && (this.action != null)) {
            result = this.action.call({
              bin: bin,
              reaction: reaction
            }, {
              bin: bin,
              reaction: reaction,
              next: next
            });
          }
          if (!((reaction.bin != null) || result === next)) {
            reaction.bin = result;
          }
          if (result !== next) {
            return next();
          }
        });
        return step(false, function() {
          return publisher.notify(reaction);
        });
      });
      return publisher;
    }
  });

  Interface.Reaction = _.prototype({
    constructor: function(bin, certified) {
      this.bin = bin;
      this.certified = certified;
    }
  });

  Interface.Web = _.prototype({
    inherit: Interface,
    use: function() {
      this.type = 'App';
      this.review = function(bin, reaction, next) {
        _.serialize(this, function(step) {
          step(function(next) {
            var result;
            result = _["super"](Interface.Web.prototype.review, this, bin, reaction, next);
            if (result !== next) {
              return next();
            }
          });
          return step(false, function() {
            var name, service, _base, _ref, _ref1;
            reaction.bin = '';
            for (name in bin) {
              service = bin[name];
              if (!(service instanceof Interface.Web)) {
                continue;
              }
              if (reaction.kups == null) {
                reaction.kups = {};
              }
              if ((_base = reaction.kups)[name] == null) {
                _base[name] = (_ref = (_ref1 = service.action) != null ? _ref1.overriden : void 0) != null ? _ref : service.action;
              }
            }
            return next();
          });
        });
        return next;
      };
      return this.submit = function(bin) {
        var chocokup_code, _ref, _ref1;
        if (!((_ref = this.action) != null ? _ref.overriden : void 0)) {
          chocokup_code = (_ref1 = this.action) != null ? _ref1 : function() {};
          this.action = (function(_this) {
            return function(params) {
              var kups, reaction;
              bin = params.bin, reaction = params.reaction;
              kups = reaction.kups;
              delete reaction.kups;
              return reaction.bin = (function() {
                var _ref2;
                switch (this.type) {
                  case 'Panel':
                    return new Chocokup.Panel({
                      bin: bin,
                      kups: kups
                    }, chocokup_code);
                  default:
                    return new Chocokup[this.type]((_ref2 = bin != null ? bin.name : void 0) != null ? _ref2 : '', {
                      bin: bin,
                      kups: kups
                    }, chocokup_code);
                }
              }).call(_this);
            };
          })(this);
          this.action.overriden = chocokup_code;
        }
        return _["super"](this, bin);
      };
    }
  });

  Interface.Web.App = Interface.Web;

  Interface.Web.Document = _.prototype({
    inherit: Interface.Web,
    use: function() {
      return this.type = 'Document';
    }
  });

  Interface.Web.Panel = _.prototype({
    inherit: Interface.Web,
    use: function() {
      return this.type = 'Panel';
    }
  });

  _module = typeof window !== "undefined" && window !== null ? window : module;

  if (_module.exports != null) {
    _module.exports = Interface;
  } else {
    if ((_ref = window.Locco) != null) {
      _ref.Interface = Interface;
    }
  }

}).call(this);