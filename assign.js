module.exports.assign = function() {
  var argType, isArray, arg, merge;
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
};
