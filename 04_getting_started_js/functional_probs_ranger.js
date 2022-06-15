let range = function (from, to) {
  if (from === to){
    return [to];
  }
  var result = range(from, to-1);
  result = result.concat(to);

  return result;
};

console.log(range(1,10))
