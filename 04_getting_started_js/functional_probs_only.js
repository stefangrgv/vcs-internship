var only = function (type, arr) {
  return arr.every(e => typeof e === type)
}

var arr = [1,2,3,4];
console.assert(!(only('string', arr)));
console.assert(only('number', arr));
