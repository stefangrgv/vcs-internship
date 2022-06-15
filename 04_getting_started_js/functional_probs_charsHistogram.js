var charsHistogram = function (str){
  const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  const regexPunctuation = new RegExp('[' + punctuation + ']', 'g');

  str = str.replace(regexPunctuation, "");
  str = str.replace(/\s/g, "");
  str = str.toLowerCase();
  const strArray = Array.from(str);

  var histogram = strArray.reduce(function (hist, currentChar){
    !(currentChar in hist) ? hist[currentChar] = 1 : hist[currentChar] += 1;

    return hist;
  }, {});

  return histogram;
};

var str = "Count the characters in this very profound sentence";
console.log(charsHistogram(str));
