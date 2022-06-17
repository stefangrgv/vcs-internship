function sum (a, b) {
  if ((typeof a === 'number') && (typeof b === 'number')) {
    return a + b;
  } else {
    throw new TypeError('Both arguments must be numbers!');
  }
}

function concat (a, b) {
  if ((typeof a === 'string') && (typeof b === 'string')) {
    return a + b;
  } else {
    throw new TypeError('Both arguments must be strings!');
  }
}

console.assert(sum(1, 2) === 3);
console.assert(concat('one', 'two') === 'onetwo');
//will throw a TypeError
//console.log(sum('one', 2))
//console.log(concat('one', 2))
