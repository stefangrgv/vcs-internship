class Pair {
  constructor (left, right) {
    this.left = left;
    this.right = right;
  }

  equals (other) {
    if ((this.left === other.left) && (this.right === other.right)) {
      return true;
    }
    return false;
  }

  toString () {
    return `(${this.left}, ${this.right})`;
  }

  toList () {
    return [this.left, this.right];
  }

  combine (f) {
    return f(this.left, this.right);
  }
}

function sum (a, b) {
  return (a + b);
}

var a = new Pair(1,2)
var b = new Pair(2,3)
var c = new Pair(2,3)

console.assert(!(a.equals(b)))
console.assert(c.equals(b))
console.assert(a.toString() === '(1, 2)')
console.assert(a.combine(sum) === 3)
