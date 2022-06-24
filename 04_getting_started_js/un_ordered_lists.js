var ul = function (items) {
  return '<ul>\n'+ items
                      .map(item => `\t<li>${item['label']}</li>\n`)
                      .join('')
                    + '</ul>'
};


var ol = function (items) {
  return '<ol>\n'+ items
                      .map(item => `\t<li>${item['label']}</li>\n`)
                      .join('')
                    + '</ol>'
};


var items = [{ 'label' : 'Item 1'},
             { 'label' : 'Item 2', 'children' : [
                {
                    'label' : 'Level 2 of Item 2'
                },
                {
                    'label' : 'Another level 2'
                }
             ]}];


var htmlul = ul(items);
console.log(htmlul);

var htmlol = ol(items);
console.log(htmlol);
