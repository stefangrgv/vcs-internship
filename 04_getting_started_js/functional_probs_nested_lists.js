var ul = function (items) {
  var result = items.reduce(function (ulStr, item){
    ulStr += `\t<li>${item["label"]}</li>\n`
    if ("children" in item){
      var childrenStr = item["children"].reduce(function (chStr, child){
        chStr += `\t\t\t<li>${child["label"]}</li>\n`;

        return chStr;
      }, "\t\t<ul>\n");

      childrenStr += "\t\t</ul>\n";
      childrenStr += "\t</li>\n";

      ulStr += childrenStr;
    }
    return ulStr;
  }, "<ul>\n");

  result += "</ul>";

  return result;
};


var ol = function (items) {
  var result = items.reduce(function (olStr, item){
    olStr += `\t<li>${item["label"]}</li>\n`
    if ("children" in item){
      var childrenStr = item["children"].reduce(function (chStr, child){
        chStr += `\t\t\t<li>${child["label"]}</li>\n`;

        return chStr;
      }, "\t\t<ol>\n");

      childrenStr += "\t\t</ol>\n";
      childrenStr += "\t</li>\n";

      olStr += childrenStr;
    }
    return olStr;
  }, "<ol>\n");

  result += "</ol>";

  return result;
};


var items = [{ "label" : "Item 1"},
             { "label" : "Item 2", "children" : [
                {
                    "label" : "Level 2 of Item 2"
                },
                {
                    "label" : "Another level 2"
                }
             ]}];


var htmlul = ul(items);
console.log(htmlul);

var htmlol = ol(items);
console.log(htmlol);
