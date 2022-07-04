var find = function (predicate, arr) {
  return arr.find(predicate);
};

var p = function (x) {
  return x > 3;
};

var arr1 = [0,10,12];
var arr2 = [1,2,3];
console.assert(find(p, arr1) === 10);
console.assert(find(p, arr2) === undefined);
