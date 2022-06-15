var wordsHistogram = function (str){
  const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  const regex_punctuation = new RegExp('[' + punctuation + ']', 'g');

  str = str.replace(regex_punctuation, "");
  str = str.toLowerCase();
  const words = str.split(" ");

  var histogram = words.reduce(function (hist, currentWord){
    !hist.hasOwnProperty(currentWord) ? hist[currentWord] = 1 : hist[currentWord] += 1;

    return hist;
  }, {});

  return histogram;
};

var str = "A function is a function with a very functional function!";
console.log(wordsHistogram(str));
