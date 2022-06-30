let book3 = {
    'isbn': 60853980,
    'title': 'Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch',
    'image_url': 'https://d.gr-assets.com/books/1392528568m/12067.jpg',
    'small_image_url': 'https://d.gr-assets.com/books/1392528568s/12067.jpg',
    'num_pages': 413,
    'description': '&amp;lt;p&amp;gt;According to&amp;lt;em&amp;gt;The Nice and Accurate Prophecies of Agnes Nutter&amp;lt;/em&amp;gt;,&amp;lt;em&amp;gt;Witch&amp;lt;/em&amp;gt;&amp;&#35;40;the world&apos;s only&amp;lt;em&amp;gt;completely&amp;lt;/em&amp;gt;accurate book of prophecies, written in 1655, before she exploded&amp;&#35;41;, the world will end on a Saturday. Next Saturday, in fact. Just before dinner.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;So the armies of Good and Evil are amassing, Atlantis is rising, frogs are falling, tempers are flaring. Everything appears to be going according to Divine Plan. Except a somewhat fussy angel and a fast-living demon—both of whom have lived amongst Earth&apos;s mortals since The Beginning and have grown rather fond of the lifestyle—are not actually looking forward to the coming Rapture.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;And someone seems to have misplaced the Antichrist . . .&amp;lt;/p&amp;gt;',
    'average_rating': 4.27
}

let book2 = {
    'isbn': 9780553290998,
    'title': 'Nightfall',
    'image_url': 'https://images-na.ssl-images-amazon.com/images/I/91cDmjjuiQL.jpg',
    'small_image_url': 'https://images-na.ssl-images-amazon.com/images/I/91cDmjjuiQL.jpg',
    'num_pages': 339,
    'description': '&amp;lt;p&amp;gt;According to&amp;lt;em&amp;gt;The Nice and Accurate Prophecies of Agnes Nutter&amp;lt;/em&amp;gt;,&amp;lt;em&amp;gt;Witch&amp;lt;/em&amp;gt;&amp;&#35;40;the world&apos;s only&amp;lt;em&amp;gt;completely&amp;lt;/em&amp;gt;accurate book of prophecies, written in 1655, before she exploded&amp;&#35;41;, the world will end on a Saturday. Next Saturday, in fact. Just before dinner.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;So the armies of Good and Evil are amassing, Atlantis is rising, frogs are falling, tempers are flaring. Everything appears to be going according to Divine Plan. Except a somewhat fussy angel and a fast-living demon—both of whom have lived amongst Earth&apos;s mortals since The Beginning and have grown rather fond of the lifestyle—are not actually looking forward to the coming Rapture.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;And someone seems to have misplaced the Antichrist . . .&amp;lt;/p&amp;gt;',
    'average_rating': 6.50
}

let book1 = {
    'isbn': 553212419,
    'title': 'Sherlock Holmes: The Complete Novels and Stories, Vol. 1',
    'image_url': 'https://m.media-amazon.com/images/P/0553212419.01._SCLZZZZZZZ_SX500_.jpg',
    'small_image_url': 'https://m.media-amazon.com/images/P/0553212419.01._SCLZZZZZZZ_SX500_.jpg',
    'num_pages': 1088,
    'description': '&amp;lt;p&amp;gt;According to&amp;lt;em&amp;gt;The Nice and Accurate Prophecies of Agnes Nutter&amp;lt;/em&amp;gt;,&amp;lt;em&amp;gt;Witch&amp;lt;/em&amp;gt;&amp;&#35;40;the world&apos;s only&amp;lt;em&amp;gt;completely&amp;lt;/em&amp;gt;accurate book of prophecies, written in 1655, before she exploded&amp;&#35;41;, the world will end on a Saturday. Next Saturday, in fact. Just before dinner.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;So the armies of Good and Evil are amassing, Atlantis is rising, frogs are falling, tempers are flaring. Everything appears to be going according to Divine Plan. Except a somewhat fussy angel and a fast-living demon—both of whom have lived amongst Earth&apos;s mortals since The Beginning and have grown rather fond of the lifestyle—are not actually looking forward to the coming Rapture.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;And someone seems to have misplaced the Antichrist . . .&amp;lt;/p&amp;gt;',
    'average_rating': 7.27
}

/*
book1 = loadBook('books/book1.json')
book2 = loadBook('books/book2.json')
book3 = loadBook('books/book3.json')

function loadBook (bookJSON) {
    return $.getJSON(bookJSON);
}
*/
class Bookstore {
    constructor (cart, books) {
        this.cart = cart;
        this.books = books;
    }

    updateBookstoreHTML () {
        let result = this.books.reduce(function (str, book, ind) {
            if (ind % 3 === 0) {
                str += '<tr>'
            }

            str += `<th class="thBookstore">${book.title}<br><img src="${book.image_url}" width=120px title="Cover of ${book.title}">
            <br><button type="button" class="descriptionButton">Read description</button>
            <br><button type="button" class="addButton" id="add_${book.isbn}">Add to cart</button>
            </th>`

            if ((ind + 1) % 3 === 0) {
                str += '</tr>'
            }

            return str
        }, '<table id="tableBooks">') + '</table>'
       
        $('#tableBooks').html(result);
    }

    initializeButtons () {
        let cart = this.cart;
        
        this.books.map(function (book) {
            document.getElementById(`add_${book.isbn}`).onclick = () => cart.add(book);
        });
    }
}

class Cart {
    constructor () {
        this.orders = [];
        this.updateCartHTML();
    }

    add (book) {
        this.orders.push(book)
        this.updateCartHTML();
    }

    remove (ind) {
        this.orders.splice(ind, 1);
        this.updateCartHTML();
    }

    empty () {
        this.orders = [];
        this.updateCartHTML();
    }

    log () {
        console.log(this.orders);
    }

    updateCartHTML () {
        // list the cart contents and create buttons
        $('#tableCart').html(this.orders.reduce(function (str, order, ind) {
            str += `<tr><th class="thCartTitle">${order.title}</th> <th class="thCartButton"><button id="cartRemove_${ind}">Remove</button></th></tr>`;
            return str
        }, ''));

        this.initializeButtons();
        
        // update cart info: number of items and total pages
        let pages = this.orders.reduce((pg, order) => pg += order.num_pages, 0);
        switch (this.orders.length) {
            case 0:
                $('#thCartItems').html('(empty)');
                $('#buttonEmptyCart').prop('disabled', true);
                break;
            case 1:
                $('#thCartItems').html(`(1 item, ${pages} pages)`)
                $('#buttonEmptyCart').prop('disabled', false);
                break;
            default:
                $('#thCartItems').html(`(${this.orders.length} items, ${pages} pages total)`);
                $('#buttonEmptyCart').prop('disabled', false);
                break;
        }
    }

    initializeButtons () {
        let self = this;
        this.orders.map(function (order, ind) {
            document.getElementById(`cartRemove_${ind}`).onclick = () => self.remove(ind);
        });

        document.getElementById('buttonEmptyCart').onclick = () => self.empty();
    }
}


let cart = new Cart();
let bookstore = new Bookstore(cart, [book1, book2, book3])

$(document).ready( function () {
    bookstore.updateBookstoreHTML();
    bookstore.initializeButtons();
    //cart.initialize();
})
