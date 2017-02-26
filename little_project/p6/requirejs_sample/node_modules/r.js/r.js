//
// r.js
// Ruby core methods written as javascript functions
// The MIT License (MIT) Copyright (c) 2015 Step1Profit
//

;(function() {
  "use strict";
  var root = this;
  var previous_R = root.R;

  var R = root.R = (function(){
    var instance;

    function init(){
      // http://stackoverflow.com/a/18560314
      if (!Object.keys) {
        Object.keys = function (obj) {
          var arr = [], key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
               arr.push(key);
            }
          }
          return arr;
        };
      }

      // http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
      // Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
      // returns obj3 a new object based on obj1 and obj2
      function _merge(obj1, obj2){
        var obj3 = {};
        for (var attrname in obj1) {obj3[attrname] = obj1[attrname];}
        for (var attrname in obj2) {obj3[attrname] = obj2[attrname];}
        return obj3;
      }

      function _isHash(o) {
        if (typeof o!=='object') return false;
        if (o===null) return false;
        if (Array.isArray(o)) return false;
        return true;
      }

      // http://stackoverflow.com/a/25120770
      function _uniq(a) {
        var ret = [];
        var len = a.length;
        while (len--) {
          var itm = a[len];
          if (ret.indexOf(itm) === -1) {
            ret.unshift(itm);
          }
        }
        return ret;
      }

      // http://stackoverflow.com/questions/7880704/all-purpose-is-blank-in-javascript
      // http://stackoverflow.com/questions/885414/a-concise-explanation-of-nil-v-empty-v-blank-in-ruby-on-rails
      function _blank(obj) {
        var cache;

        if((cache = typeof obj) !== 'boolean' && (cache !== 'number' || isNaN(obj)) && !obj) return true;
        if(cache == 'string' && obj.replace(/\s/g, '').length === 0) return true;
        if(cache == 'object') {
          if((cache = toString.call(obj)) == '[object Array]' && obj.length === 0) return true;
          if(cache == '[object Object]') {
            for(cache in obj) {
              return false;
            }
            return true;
          }
        }
        return false;
      }

      // any: The method returns true if the block ever returns a value other than false or nil
      function _any(o) {
        if (typeof o!=='object') throw new Error('Invalid Arg: not an object');
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
        if (Object.keys(o).length===0) return false;
        for (var x in o) {
          if (o[x]!==null && !/undefined|boolean/.test(typeof o[x]) || typeof o[x]==='boolean' && o[x].toString()!=='false') {
            return true;
          }
        }
        return false;
      }

      // all: The method returns true if the block never returns false or nil
      // http://stackoverflow.com/a/13249942
      // https://coderwall.com/p/zwgjkq/javascript-analogue-of-ruby-s-any
      function _all(o) {
        var a = [];
        if (typeof o!=='object') throw new Error('Invalid Arg: not an object');
        // return true if o is hash
        if (_isHash(o)) return true;
        for (var x in o) {
          a.push((typeof o[x]==='string' && /^$/.test(o[x])) ? true : o[x]);
        }
        return a.every(Boolean);
      }

      // http://stackoverflow.com/a/25921504
      function _clone(o) {
        if (o===null || /undefined|string|number|function/.test(typeof o)) return o;
        var returnObj, v, key;
        returnObj = Array.isArray(o) ? [] : {};
        for (var key in o) {
          v = o[key];
          returnObj[key] = (typeof v === "object") ? _clone(v) : v;
        }
        return returnObj;
      }

      function _slice(o, keys){
        if (!_isHash(o)) throw new Error('Invalid Arg: not a hash');
        var is_a = Array.isArray(keys);
        if (!/string|number/.test(typeof keys) && !is_a) throw new Error('Invalid Arg: not an array, string or number');
        if (!is_a) keys = [keys];
        var returnObj = {};
        for(var i = 0, j = keys.length; i < j; i++){
          if (o.hasOwnProperty(keys[i])) {
            returnObj[keys[i]] = o[keys[i]];
          }
        }
        return returnObj;
      }

      function _except(o, keys){
        if (!_isHash(o)) throw new Error('Invalid Arg: not a hash');
        var is_a = Array.isArray(keys);
        if (!/string|number/.test(typeof keys) && !is_a) throw new Error('Invalid Arg: not an array, string or number');
        if (!is_a) keys = [keys];
        var returnObj = _clone(o);
        for(var i = 0, j = keys.length; i < j; i++){
          if(o.hasOwnProperty(keys[i])){
            delete returnObj[keys[i]];
          }
        }
        return returnObj;
      }

      return {
        // Object
        isHash: function(o){return _isHash(o);},
        clone: function(o){return _clone(o);},
        blank: function(o){return _blank(o);},

        // Array
        uniq: function(a){return _uniq(a);},

        // Array or Hash
        any: function(o){return _any(o);},
        all: function(o){return _all(o);},

        // Hash
        slice: function(o, keys){return _slice(o, keys);},
        except: function(o, keys){return _except(o, keys);},
        merge: function(h1, h2){return _merge(h1, h2);},
      }
    };

    function getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }

    return instance || getInstance();
  })();

  R.noConflict = function() {
    root.R = previous_R;
    return R;
  }

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = R;
    }
    exports.R = R;
  } else {
    root.R = R;
  }

}).call(this);
