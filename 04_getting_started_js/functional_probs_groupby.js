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
  return arr.reduce(function (groupedArr, element){
    const currentKey = groupingFunction(element).toString();
    if (groupedArr.hasOwnProperty(currentKey)){ // eslint-disable-line no-prototype-builtins
      groupedArr[currentKey] = groupedArr[currentKey].concat(element);
    } else {
      groupedArr[currentKey] = [element]
    }

    return groupedArr;
  },{});
};


console.log(groupBy(function(student) {
  return student.course;
}, students));
