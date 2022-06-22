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

    getName () {
        return this._name;
    }

    getTimeToMake () {
        return this._timeToMake;
    }
}

class PizzaOrder {
    constructor (pizza) {
        if (!(pizza instanceof Pizza)) {
            throw Error('PizzaOrder requires an argument of type Pizza');
        }

        ordersMade += 1;
        this._pizza = pizza;
        this._id = ordersMade;
    }

    getId () {
        return this._id;
    }

    //
    getPizza () {
        return this._pizza;
    }

    start () {
        kitchenBusy = true;
        console.log(`Started making a ${this.getPizza().getName()}!`);
        setTimeout( this.ready, this.getPizza().getTimeToMake(), notifyPizzaReady );
    }

    ready ( callback ) {
        callback(this._pizza, queue[0]);
        queue.shift();
        kitchenBusy = false;
    }
}

function notifyPizzaReady (pizza, order) {
    console.log(`Order #${order.getId()} (${order.getPizza().getName()}) is ready!`);
}

function placeOrder () {
    let randomPizzaIndex = generateRandomInt(pizzas.length - 1);
    let order = new PizzaOrder(pizzas[randomPizzaIndex]);
    queue.push(order);
    console.log(`Placed a new order (ID=${order.getId()}, #${queue.length} in queue)!`);
}

function generateRandomBool () {
    return ( generateRandomInt(1) == 1 );
}

function generateRandomInt (max) {
    // generates a random integer in the range [0, max]
    let rand = Math.random();
    rand = Math.floor( rand * (max+1) );

    return rand;
}

function tick () {
    let randBool = generateRandomBool();
    if (randBool) {
        placeOrder();
    }

    if (!(kitchenBusy) && (queue.length > 0)) {
        queue[0].start();
    }
}

var ordersMade = 0;
var queue = [];
var kitchenBusy = false

var peperoni = new Pizza('Peperoni', 100 /*cost*/, 2000 /*timeToMake in ms = 2 seconds */);
var vegetariana = new Pizza('Vegetariana', 70, 1500);
var quattroStagioni = new Pizza('Quattro Stagioni', 120, 2500);

var pizzas = [peperoni, vegetariana, quattroStagioni]

setInterval(tick, 1000);