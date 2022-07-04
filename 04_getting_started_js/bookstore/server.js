const express = require('express');
const app = express();

let book1 = {
    'isbn': 60853980,
    'title': 'Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch',
    'image_url': 'https://d.gr-assets.com/books/1392528568m/12067.jpg',
    'small_image_url': 'https://d.gr-assets.com/books/1392528568s/12067.jpg',
    'num_pages': 413,
    'description': '&amp;lt;p&amp;gt;According to&amp;lt;em&amp;gt;The Nice and Accurate Prophecies of Agnes Nutter&amp;lt;/em&amp;gt;,&amp;lt;em&amp;gt;Witch&amp;lt;/em&amp;gt;&amp;&#35;40;the world&apos;s only&amp;lt;em&amp;gt;completely&amp;lt;/em&amp;gt;accurate book of prophecies, written in 1655, before she exploded&amp;&#35;41;, the world will end on a Saturday. Next Saturday, in fact. Just before dinner.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;So the armies of Good and Evil are amassing, Atlantis is rising, frogs are falling, tempers are flaring. Everything appears to be going according to Divine Plan. Except a somewhat fussy angel and a fast-living demon—both of whom have lived amongst Earth&apos;s mortals since The Beginning and have grown rather fond of the lifestyle—are not actually looking forward to the coming Rapture.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;And someone seems to have misplaced the Antichrist . . .&amp;lt;/p&amp;gt;',
    'average_rating': 4.27
};

let book2 = {
    'isbn': 9780553290998,
    'title': 'Nightfall',
    'image_url': 'https://images-na.ssl-images-amazon.com/images/I/91cDmjjuiQL.jpg',
    'small_image_url': 'https://images-na.ssl-images-amazon.com/images/I/91cDmjjuiQL.jpg',
    'num_pages': 339,
    'description': '&amp;lt;p&amp;gt;According to&amp;lt;em&amp;gt;The Nice and Accurate Prophecies of Agnes Nutter&amp;lt;/em&amp;gt;,&amp;lt;em&amp;gt;Witch&amp;lt;/em&amp;gt;&amp;&#35;40;the world&apos;s only&amp;lt;em&amp;gt;completely&amp;lt;/em&amp;gt;accurate book of prophecies, written in 1655, before she exploded&amp;&#35;41;, the world will end on a Saturday. Next Saturday, in fact. Just before dinner.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;So the armies of Good and Evil are amassing, Atlantis is rising, frogs are falling, tempers are flaring. Everything appears to be going according to Divine Plan. Except a somewhat fussy angel and a fast-living demon—both of whom have lived amongst Earth&apos;s mortals since The Beginning and have grown rather fond of the lifestyle—are not actually looking forward to the coming Rapture.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;And someone seems to have misplaced the Antichrist . . .&amp;lt;/p&amp;gt;',
    'average_rating': 6.50
};

let book3 = {
    'isbn': 553212419,
    'title': 'Sherlock Holmes: The Complete Novels and Stories, Vol. 1',
    'image_url': 'https://m.media-amazon.com/images/P/0553212419.01._SCLZZZZZZZ_SX500_.jpg',
    'small_image_url': 'https://m.media-amazon.com/images/P/0553212419.01._SCLZZZZZZZ_SX500_.jpg',
    'num_pages': 1088,
    'description': '&amp;lt;p&amp;gt;According to&amp;lt;em&amp;gt;The Nice and Accurate Prophecies of Agnes Nutter&amp;lt;/em&amp;gt;,&amp;lt;em&amp;gt;Witch&amp;lt;/em&amp;gt;&amp;&#35;40;the world&apos;s only&amp;lt;em&amp;gt;completely&amp;lt;/em&amp;gt;accurate book of prophecies, written in 1655, before she exploded&amp;&#35;41;, the world will end on a Saturday. Next Saturday, in fact. Just before dinner.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;So the armies of Good and Evil are amassing, Atlantis is rising, frogs are falling, tempers are flaring. Everything appears to be going according to Divine Plan. Except a somewhat fussy angel and a fast-living demon—both of whom have lived amongst Earth&apos;s mortals since The Beginning and have grown rather fond of the lifestyle—are not actually looking forward to the coming Rapture.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;And someone seems to have misplaced the Antichrist . . .&amp;lt;/p&amp;gt;',
    'average_rating': 7.27
};

app.use(express.static('public/'));

app.get('/books/', (req, res) => {
    res.json([book1, book2, book3]);
});

app.listen(3000);