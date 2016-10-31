!(function(root, moduleName, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS support
    module.exports = factory(require(moduleName));
  } else if (typeof define === 'function' && define.amd) {
    // AMD support
    define([moduleName], factory);
  } else {
    // Browser support
    root[moduleName] = factory(root[moduleName]);
  }
}(this, 'assign', function assign() {
  return {
    assign: function() {
      var argType;
      var isArray;
      var arg;
      var merge;
      var args = arguments;

      if (args.length < 1) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      for (arg in args) {
        arg = args[arg];
        argType = typeof(arg);
        isArray = Array.isArray(arg);

        if (argType !== 'object' || isArray) {
          argType = isArray ? 'array' : argType;
          throw new TypeError('Cannot convert ' + argType + ' to object');
        }
      }

      merge = function(baseObject, newObject) {
        Object.keys(newObject).forEach(function(updateKey) {
          baseObject[updateKey] = newObject[updateKey];
        });

        return baseObject;
      };

      return Object.keys(args).reduce(function(baseValue, currentKey) {
        return merge(baseValue, args[currentKey]);
      }, {});
    }
  }
}));

