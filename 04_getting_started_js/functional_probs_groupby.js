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


var groupBy = function(groupingFunction, arr) {
  var groupArr = {};
  arr.forEach(function(element){
    const currentKey = groupingFunction(element).toString();
    !(currentKey in groupArr) ? groupArr[currentKey] = [element] : groupArr[currentKey].push(element);
  });

  return groupArr;
};


console.log(groupBy(function(student) {
  return student.course;
}, students));
