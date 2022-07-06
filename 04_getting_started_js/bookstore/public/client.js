class Bookstore {
    constructor (cart, books) {
        this.cart = cart;
        this.books = books;
    }

    renderBookstore () {
        $('#bookPanel').html(this.books.reduce((str, book, ind) => {
            if (ind % 3 === 0) {
                str += '<div class="row">';
            }
            
            str += `
                <div class="col-4 border"><center><img class="img-thumbnail w-75" src="${book.image_url}"></center>
                    <center><button class="btn btn-info descriptionButton" id=desc_${book.isbn} data-toggle="modal" data-target="#descriptionModal">Read description</button></center>
                    <center><button class="btn btn-dark addButton" id="add_${book.isbn}">Add to cart</button></center>
                </div>`;
            
            if ((ind + 1) % 3 === 0) {
                str += '</div>';
            }
            
            return str;
        }, ''));
       
        this.initializeButtons();
        
        $('#cartButton').click(this.cart.render.bind(this.cart));
        this.cart.render();
    }

    showDescription (book) {
        $('#descriptionModalTitle').html(book.title);
        $('#descriptionModalText').html(book.description);
    }

    initializeButtons () {
        let self = this;
        
        this.books.map(function (book) {
            $(`#add_${book.isbn}`).click(() => self.cart.add(book));
            $(`#desc_${book.isbn}`).click(() => self.showDescription(book));
        });
    }
}

class Cart {
    constructor (cartItems) {
        this.orders = (JSON.parse(cartItems) || []);
    }

    add (book) {
        this.orders.push(book);
        localStorage.setItem('bookstoreCartItems', JSON.stringify(this.orders));
        this.render();
    }

    remove (ind) {
        this.orders.splice(ind, 1);
        localStorage.setItem('bookstoreCartItems', JSON.stringify(this.orders));
        this.render();
    }

    initializeButtons () {
        let self = this;
        this.orders.map((order, ind) => $(`#cartRemove_${ind}`).click(() => self.remove(ind)));
    }

    render () {
        let pages = this.orders.reduce((pg, order) => pg += order.num_pages, 0);
        $('#labelCartItems').html(`${this.orders.length} item(s) , ${pages} pages total`);

        if (this.orders.length === 0) {
            $('#cartModalText').html('<p>Cart is empty</p>');
        } else {
            $('#cartModalText').html(this.orders.reduce((str, item, ind) => {
                str += `
                    <div class="row">
                        <div class="col-9">
                            <div>${item.title}</div>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-info" id="cartRemove_${ind}")">Remove</button>
                        </div>
                    </div>`;
                return str;
            }, ''));
        
            this.initializeButtons();
        }
    }
}

function renderPage (books) {
    $(document).ready(() => {
        let cart = new Cart(localStorage.getItem('bookstoreCartItems'));
        let bookstore = new Bookstore(cart, books);
    
        bookstore.renderBookstore();
    });
}

function drawBooks () {
    $.get('http://127.0.0.1:3000/books/', (books) => renderPage(books));
}

drawBooks();