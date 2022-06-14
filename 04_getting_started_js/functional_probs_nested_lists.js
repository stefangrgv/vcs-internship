var ul = function (items) {
  var result = items.reduce(function (ul_str, item){
    ul_str += `\t<li>${item["label"]}</li>\n`
    if (item.hasOwnProperty("children")){
      var children_str = item["children"].reduce(function (ch_str, child){
        ch_str += `\t\t\t<li>${child["label"]}</li>\n`;

        return ch_str;
      }, "\t\t<ul>\n");

      children_str += "\t\t</ul>\n";
      children_str += "\t</li>\n";

      ul_str += children_str;
    }
    return ul_str;
  }, "<ul>\n");

  result += "</ul>";

  return result;
};


var ol = function (items) {
  var result = items.reduce(function (ol_str, item){
    ol_str += `\t<li>${item["label"]}</li>\n`
    if (item.hasOwnProperty("children")){
      var children_str = item["children"].reduce(function (ch_str, child){
        ch_str += `\t\t\t<li>${child["label"]}</li>\n`;

        return ch_str;
      }, "\t\t<ol>\n");

      children_str += "\t\t</ol>\n";
      children_str += "\t</li>\n";

      ol_str += children_str;
    }
    return ol_str;
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
