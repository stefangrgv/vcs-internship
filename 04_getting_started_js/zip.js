var zip = function () {
  var args = Array.from(arguments);

  return args[0].map(function (element, i) {
    var currentArray = [];
    args.forEach(function (arg) {
      currentArray = currentArray.concat(arg[i]);
    });
    return currentArray;
  });
};

console.log(zip([1, 2, 3], [4, 5, 6]));
// [ [1, 4], [2, 4], [3, 6] ]

console.log(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]));
// [ [1, 4, 7], [2, 4, 8], [3, 6, 9] ]
