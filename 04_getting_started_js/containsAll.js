var containsAll = function (elements, arr) {
  return elements.every(function (e) {
    return arr.includes(e);
  });
}

console.assert(!(containsAll([1, 4], [1, 2, 3])));
console.assert(containsAll([1, 3], [1, 2, 3]));
