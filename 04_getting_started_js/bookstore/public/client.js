class Bookstore {
    constructor (cart, books) {
        this.cart = cart
        this.books = books
    }

    renderBookstore () {
        $('#bookPanel').html(this.books.reduce(function (str, book, ind) {
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
        }, ''))
       
        this.initializeButtons()
        
        $('#cartButton').click(this.cart.render.bind(this.cart))
        this.cart.render()
    }

    showDescription (book) {
        $('#descriptionModalTitle').html(book.title)
        $('#descriptionModalText').html(book.description)
    }

    initializeButtons () {
        let self = this
        
        this.books.map(function (book) {
            $(`#add_${book.isbn}`).click(() => self.cart.add(book))
            $(`#desc_${book.isbn}`).click(() => self.showDescription(book))
        })
    }
}

class Cart {
    constructor () {
        this.orders = []
    }

    add (book) {
        this.orders.push(book)
        this.render()        
    }

    remove (ind) {
        this.orders.splice(ind, 1)
        this.render()
    }

    initializeButtons () {
        let self = this
        this.orders.map((order, ind) => $(`#cartRemove_${ind}`).click(() => self.remove(ind)))
    }

    render () {
        let pages = this.orders.reduce((pg, order) => pg += order.num_pages, 0)
        $('#labelCartItems').html(`${this.orders.length} item(s) , ${pages} pages total`)

        if (this.orders.length === 0) {
            $('#cartModalText').html('<p>Cart is empty</p>')
        } else {
            $('#cartModalText').html(this.orders.reduce(function (str, item, ind) {
                str += `
                    <div class="row">
                        <div class="col-9">
                            <div>${item.title}</div>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-info" id="cartRemove_${ind}")">Remove</button>
                        </div>
                    </div>`
                return str
            }, ''))
        
            this.initializeButtons()
        }
    }
}

function renderPage (books) {
    $(document).ready(function () {
        let cart = new Cart()
        let bookstore = new Bookstore(cart, books)
    
        bookstore.renderBookstore()
    })
}

function runClient () {
    const getBooksRequest = new XMLHttpRequest()
    getBooksRequest.open('get', 'http://127.0.0.1:3000/books/')
    getBooksRequest.responseType = 'json'
    getBooksRequest.onload = () => renderPage(getBooksRequest.response)
    getBooksRequest.send()
}

runClient()