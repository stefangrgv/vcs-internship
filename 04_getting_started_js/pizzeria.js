var orders = [];

class Pizza {
    constructor (name, cost, timeToMake) {
        if (!((typeof cost  === 'number') && Number.isInteger(cost))) {
            throw Error('Error: cost must be an integer');
        }

        if (!((typeof timeToMake === 'number') && Number.isInteger(timeToMake))) {
            throw Error('Error: timeToMake must be an integer');
        }

        this._name = name;
        this._cost = cost;
        this._timeToMake = timeToMake;
    }
}

class PizzaOrder {
    constructor (pizza) {
        if (!(pizza instanceof Pizza)) {
            throw Error('PizzaOrder requires an argument of type Pizza');
        }

        this._pizza = pizza;

        var lastOrder = orders.at(-1);
        if (typeof lastOrder === 'undefined') {
            this._id = 1;
        } else {
            this._id = lastOrder.id + 1;
        }
        orders.push({'id': this._id, 'pizza': this._pizza, 'status': 'waiting'});
    }

    getId () {
        return this._id;
    }

    start () {
        var currentOrder = orders.find( (o) => o['id'] === this._id );
        currentOrder['status'] = 'being prepared';
    }

    ready = function ( callback ){
        // does something
        var currentOrder = orders.find( (o) => o['id'] === this._id );
        currentOrder['status'] = 'ready';
    }
}

var pizza = new Pizza("Peperoni", 100 /*cost*/, 2000 /*timeToMake in ms = 2 seconds */);

var order1 = new PizzaOrder(pizza);
var order2 = new PizzaOrder(pizza);
var order3 = new PizzaOrder(pizza);
order1.start();
order1.ready();
order2.start();

console.log(orders)