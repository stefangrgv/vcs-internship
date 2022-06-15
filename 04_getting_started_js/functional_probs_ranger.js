let range = function (from, to) {
  if (from === to){
    return [to];
  }
  
  return range(from, to-1).concat(to);
};

console.log(range(1,10))
