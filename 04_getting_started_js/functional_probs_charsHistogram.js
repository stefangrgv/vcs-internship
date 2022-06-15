var charsHistogram = function (str){
  const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  const regex_punctuation = new RegExp('[' + punctuation + ']', 'g');

  str = str.replace(regex_punctuation, "");
  str = str.replace(/\s/g, "");
  str = str.toLowerCase();
  const strArray = Array.from(str);

  var histogram = strArray.reduce(function (hist, currentChar){
    !hist.hasOwnProperty(currentChar) ? hist[currentChar] = 1 : hist[currentChar] += 1;

    return hist;
  }, {});

  return histogram;
};

var str = "Count the characters in this very profound sentence";
console.log(charsHistogram(str));
