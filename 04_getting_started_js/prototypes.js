// String prototypes
String.prototype.capitalize = function () {
  return this.toUpperCase();
};

String.prototype.dasherize = function () {
  return this.replace(/_/g, '-');
};

String.prototype.times = function (x) {
  return (this + ' ').repeat(x).trim();
};

String.prototype.blank = function () {
  return this.replace(/\s/g, '').length === 0;
};

// Array prototypes
Array.prototype.first = function () {
  if (this.length === 0) {
    throw new Error('Array has no elements!');
  }
  return this[0];
};

Array.prototype.range = function (from, to) {
  if ((typeof from != 'number') || (typeof to != 'number')) {
    throw new Error('Arguments of range() must be numbers!');
  }
  
  return Array(to - from + 1).fill(0).map((value, index) => from + index);
};

Array.prototype.sum = function () {
  return this.reduce( (a, b) => a + b, 0);
};

Array.prototype.average = function () {
  return this.sum() / this.length;
};

// Number prototype
Number.prototype.times = function (action) {
  Array(Number(this)).fill().map(action);
};

console.assert('javascript'.capitalize() === 'JAVASCRIPT');
console.assert('border_bottom_width'.dasherize() === 'border-bottom-width');
console.assert('wasd'.times(3) === 'wasd wasd wasd');
console.assert(''.blank());
console.assert('    '.blank());
console.assert(!('wasd'.blank()));
console.assert([1,2,3].first() === 1);
// will throw an exception
// console.log([].first());
console.log([].range(1, 10));
console.assert([1,2,3].sum() === 6);
console.assert([1,2,3].average() === 2);

var a = 5;
a.times(function () {
  console.log('OMG');
});
