Object.assign2 = function() {
  if (arguments.length < 1) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var argKeys;
  var argType;
  var isArray;
  var arg;
  var args = arguments;

  for (arg in args) {
    arg = args[arg];
    argType = typeof(arg);
    isArray = Array.isArray(arg);

    if (argType !== 'object' || isArray) {
      argType = Array.isArray(arg) ? 'array' : argType;
      throw new TypeError('Connot convert ' + argType + ' to object');
    }
  }

  var merge = function(base, update) {
    Object.keys(update).forEach(function(updateKey) {
      base[updateKey] = update[updateKey];
    });

    return base;
  };

  return Object.keys(args).reduce(function(baseValue, currentKey) {
    return merge(baseValue, args[currentKey]);
  }, {});
};

var result = Object.assign2({a:1}, {a:2, b:2, c: 3}, {c: 4}, {d: 5});
console.log(result);
