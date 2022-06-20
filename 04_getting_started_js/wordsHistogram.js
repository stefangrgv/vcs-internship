var wordsHistogram = function (str) {
  var processedStr = str.replace(/[^a-z0-9\s]/gi, '').toLowerCase();
  var words = processedStr.split(' ');
  var histogram = words.reduce(function (hist, currentWord) {
    hist[currentWord] = (hist[currentWord] || 0) + 1;

    return hist;
  }, {});

  return histogram;
};

var str = 'A function is a function with a very functional function!';
console.log(wordsHistogram(str));
