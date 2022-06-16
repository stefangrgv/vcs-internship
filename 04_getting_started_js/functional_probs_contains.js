var contains = function (element, arr) {
  return arr.includes(element);
}

console.assert(contains(3, [1,2,3]))
console.assert(!(contains(4, [1,2,3])))
