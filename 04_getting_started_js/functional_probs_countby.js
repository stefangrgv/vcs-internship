var students = [{
  'name' : 'Daniel Taskoff',
  'course' : 'Frontend JavaScript'
}, {
  'name' : 'Elena Jeleva',
  'course' : 'Programming 101'
}, {
  'name' : 'Luboslava Dimitrova',
  'course' : 'Frontend JavaScript'
}, {
  'name' : 'Anton Antonov',
  'course' : 'Core Java'
}, {
  'name' : 'Nikola Dichev',
  'course' : 'Core Java'
}];


var countBy = function (countingFunction, arr) {
  return arr.reduce(function (countedArr, element) {
    var countedElement = countingFunction(element);
    countedArr[countedElement] = (countedArr[countedElement] || 0) + 1;

    return countedArr;
  },{});
};


console.log(countBy(function (student) {
  return student.course;
}, students));
