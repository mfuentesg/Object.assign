define(['../../assign'], function(obj) {
  // {a: 1, b: 5, c: 10}
  console.log(obj.assign({a: 1, b: 2}, {b: 5}, {c: 10}));
});
