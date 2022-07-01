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
                str += '<div class="row">'
            }

            str += `
                <div class="col-4 border"><center><img class="img-thumbnail w-75" src="${book.image_url}"></center>
                    <center><button class="btn btn-info descriptionButton" id=desc_${book.isbn} data-toggle="modal" data-target="#descriptionModal">Read description</button></center>
                    <center><button class="btn btn-dark addButton" id="add_${book.isbn}">Add to cart</button></center>
                </div>`

            if ((ind + 1) % 3 === 0) {
                str += '</div>'
            }

            return str
        }, '<div class="table" id="bookPanel">') + '</div>'
       
        $('#bookPanel').html(result);

        this.initializeButtons();
    }

    showDescription (book) {
        $('#descriptionModalTitle').html(book.title);
        $('#descriptionModalText').html(book.description);
    }

    initializeButtons () {
        let self = this;
        let cart = this.cart;
        
        this.books.map(function (book) {
            $(`#add_${book.isbn}`).click(() => cart.add(book));
            $(`#desc_${book.isbn}`).click(() => self.showDescription(book));
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
        let pages = this.orders.reduce((pg, order) => pg += order.num_pages, 0);
        $('#labelCartItems').html(`${this.orders.length} item(s) , ${pages} pages total`)
    }

    initializeButtons () {
        let self = this;
        this.orders.map((order, ind) => $(`#cartRemove_${ind}`).click(() => self.remove(ind)));

        $('#buttonEmptyCart').click(() => self.empty());
    }
    
    cartRemove (ind) {
        this.remove(ind);
        this.cartButton();
    }

    cartButton() {
        self = this;

        if (this.orders.length === 0) {
            $('#cartModalText').html('<p>Cart is empty</p>')
        } else {
            $('#cartModalText').html(this.orders.reduce(function (str, item, ind) {
                str += `
                    <div class="row">\n
                        <div class="col-9">
                            <div>${item.title}</div>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-info" onClick="self.cartRemove(${ind})">Remove</button>
                        </div>
                    </div>`
                return str;
            }, ''));
        }
    }
}


let cart = new Cart();
let bookstore = new Bookstore(cart, [book1, book2, book3])

$(document).ready( function () {
    bookstore.updateBookstoreHTML();
    $('#cartButton').click(cart.cartButton.bind(cart));
})
