var students = [{
  "name" : "Daniel Taskoff",
  "course" : "Frontend JavaScript"
}, {
  "name" : "Elena Jeleva",
  "course" : "Programming 101"
}, {
  "name" : "Luboslava Dimitrova",
  "course" : "Frontend JavaScript"
}, {
  "name" : "Anton Antonov",
  "course" : "Core Java"
}, {
  "name" : "Nikola Dichev",
  "course" : "Core Java"
}];


var countBy = function (countingFunction, arr) {
  var countArr = {};
  arr.forEach(function (element){
    const countedElement = countingFunction(element);
    countedElement in countArr ? countArr[countedElement] += 1 : countArr[countedElement] = 1;
  });

  return countArr;
};


console.log(countBy(function (student) {
  return student.course;
}, students));
