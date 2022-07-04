class Pair {
  constructor (left, right) {
    this.left = left;
    this.right = right;
  }
}

Pair.prototype.equals = function (other) {
  return ((this.left === other.left) && (this.right === other.right));
};

Pair.prototype.toString = function () {
  return `(${this.left}, ${this.right})`;
};

Pair.prototype.toList = function () {
  return [this.left, this.right];
};

Pair.prototype.combine = function (f) {
  return f(this.left, this.right);
};

function sum (a, b) {
  return (a + b);
}

var a = new Pair(1,2);
var b = new Pair(2,3);
var c = new Pair(2,3);

console.assert(!(a.equals(b)));
console.assert(c.equals(b));
console.assert(a.toString() === '(1, 2)');
console.assert(a.combine(sum) === 3);
