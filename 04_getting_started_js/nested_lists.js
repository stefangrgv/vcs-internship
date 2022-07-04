var constructItem = function (item) {
  if ('children' in item) {
    return `\t<li>${item['label']}</li>\n\t\t<ol>\n`
              + item['children']
                    .map(child => `\t\t\t<li>${child['label']}</li>\n`)
                    .join('')
              + '\t\t</ol>\n\t</li>\n';
    }
  return `\t<li>${item['label']}</li>\n`;
};

var ul = function (items) {
  return '<ul>\n' + items.map(item => constructItem(item))
                        .join('') + '</ul>';
};

var ol = function (items) {
  return '<ol>\n' + items.map(item => constructItem(item))
                        .join('') + '</ol>';
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
