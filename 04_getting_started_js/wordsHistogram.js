var wordsHistogram = function (str) {
  var processedStr = str.replace(/[^a-z0-9\s]/gi, '').toLowerCase();
  var words = processedStr.split(' ');
  var histogram = words.reduce(function (hist, currentWord) {
    currentWord in hist ? hist[currentWord] += 1 : hist[currentWord] = 1;

    return hist;
  }, {});

  return histogram;
};

var str = 'A function is a function with a very functional function!';
console.log(wordsHistogram(str));
