// String prototypes
String.prototype.capitalize = function () {
  return this.toUpperCase();
};

String.prototype.dasherize = function () {
  return this.replace(/_/g, '-');
};

String.prototype.times = function (x) {
  return (this + ' ').repeat(x).slice(0, -1);
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
  if (from === to) {
    return to;
  }
  return [from].concat(this.range(from+1, to))
};

Array.prototype.sum = function () {
  return this.reduce(function (a,b) {
    return a+b;
  },0)
};

Array.prototype.average = function () {
  return this.sum()/this.length;
};

// Number prototype
Number.prototype.times = function (action) {
  for(let i = 0; i < this; i++) {
    action();
  }
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

var a=5;
a.times(function () {
  console.log('OMG');
});
