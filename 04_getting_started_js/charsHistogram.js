var charsHistogram = function (str) {
  var processedStr = str.replace(/[^a-z0-9]/gi, '').replace(/\s/g, '').toLowerCase();
  var strArray = Array.from(processedStr);

  var histogram = strArray.reduce(function (hist, currentChar) {
    currentChar in hist ? hist[currentChar] += 1 : hist[currentChar] = 1;

    return hist;
  }, {});

  return histogram;
};

var str = 'Count the characters in this very profound sentence';

var correctResult = { c: 4,
  o: 3,
  u: 2,
  n: 5,
  t: 5,
  h: 3,
  e: 6,
  a: 2,
  r: 4,
  s: 3,
  i: 2,
  v: 1,
  y: 1,
  p: 1,
  f: 1,
  d: 1 }

console.log(charsHistogram(str))
console.assert(Object.entries(charsHistogram(str)).toString() === Object.entries(correctResult).toString());
