let zip = function (){
  let args = Array.from(arguments);

  return args[0].map(function (_, i){
    return args.reduce(function (zipElement, currentArg){
      zipElement = zipElement.concat(currentArg[i]);
      return zipElement;
    }, []);
  });
}

console.log("zipping [1,2,3], [4,5,6]");
console.log(zip([1, 2, 3], [4, 5, 6]));
// [ [1, 4], [2, 4], [3, 6] ]

console.log("zipping [1,2,3], [4,5,6], [7,8,9]");
console.log(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]));
// [ [1, 4, 7], [2, 4, 8], [3, 6, 9] ]
