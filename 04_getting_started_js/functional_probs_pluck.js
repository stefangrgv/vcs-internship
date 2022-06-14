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


var pluck = function (property, arr) {
  var result = arr.reduce(function (total, currentElement){
    if (currentElement.hasOwnProperty(property)){
      total = total.concat(currentElement[property]);
    }

    return total;
  }, []);

  return result;
};

console.log(pluck("name", students));
