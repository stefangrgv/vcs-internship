// String prototypes
Object.assign(String.prototype,{
  capitalize () {
    return this.toUpperCase();
  }
});

Object.assign(String.prototype, {
  dasherize () {
    return this.replace(/_/g, '-');
  }
});

Object.assign(String.prototype, {
  times (x) {
    return (this + ' ').repeat(x).slice(0, -1);
  }
});

Object.assign(String.prototype, {
  blank () {
    return this.replace(/\s/g, '').length === 0;
  }
});

// Array prototypes
Object.assign(Array.prototype, {
  first () {
    if (this.length === 0) {
      throw new Error('Array has no elements!');
    }
    return this[0];
  }
});

Object.assign(Array.prototype, {
  range (from, to) {
    if ((typeof from != 'number') || (typeof to != 'number')) {
      throw new Error('Arguments of range() must be numbers!');
    }
    if (from === to) {
      return to;
    }
    return [from].concat(this.range(from+1, to))
  }
});

Object.assign(Array.prototype, {
  sum () {
    return this.reduce(function (a,b) {
      return a+b;
    },0)
  }
});

Object.assign(Array.prototype, {
  average () {
    return this.sum()/this.length;
  }
});

// Number prototype
Object.assign(Number.prototype, {
  times (action) {
    for(let i = 0; i < this; i++) {
      action();
    }
  }
});

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
