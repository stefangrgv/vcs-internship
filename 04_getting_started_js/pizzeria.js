class Pizza {
    constructor (name, cost, timeToMake) {
        if (!(Number.isInteger(cost))) {
            throw Error('Error: cost must be an integer');
        }

        if (!(Number.isInteger(timeToMake))) {
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

    getCost () {
        return this._cost;
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

    getPizza () {
        return this._pizza;
    }

    start () {
        kitchenBusy = true;
        
        setTimeout( this.ready.bind(this), this.getPizza().getTimeToMake(), notifyPizzaReady );
    }

    ready ( callback ) {
        callback(this.getPizza(), this);
    }
}

function notifyPizzaReady (pizza, order) {
    // update the notification for a ready order
    document.getElementById('orderReadyText').innerHTML = `#${order.getId()} (${pizza.getName()}) is ready!`

    // update the ready count and the total price
    pizzasReady += 1;
    totalPrice += pizza.getCost();
    document.getElementById('readyText').innerHTML = `Price: ${totalPrice} for ${pizzasReady} pizzas`;

    // update the page queue
    let htmlQueueList = document.getElementById('queueOL');
    let htmlQueueItems = document.querySelectorAll('#queueOL li');
    htmlQueueList.removeChild(htmlQueueItems[0]);
    queue.shift();
    updateQueueHeader();

    kitchenBusy = false;
}

function placeOrder () {
    // create a new order of a random pizza and add it to the queue
    let randomPizzaIndex = randomInt(pizzas.length - 1);
    let order = new PizzaOrder(pizzas[randomPizzaIndex]);
    queue.push(order);
    
    // update the notification for a new order
    document.getElementById('newOrderText').innerHTML = `New order #${order.getId()} (${order.getPizza().getName()})`

    // update the page queue
    let htmlQueue = document.getElementById('queueOL');
    let htmlQueueEntry = document.createElement('li');
    htmlQueueEntry.appendChild(document.createTextNode(`Order ID=${order.getId()} -- ${order.getPizza().getName()}`));
    htmlQueue.appendChild(htmlQueueEntry);
    updateQueueHeader();
}

function updateQueueHeader () {
    let queueText = (queue.length != 1) ? `Queue (${queue.length} items)` : `Queue (${queue.length} item)`
    document.getElementById('queueText').innerHTML = queueText;
}

function randomBool () {
    // randomly generates a true or false value with a 50:50 chance
    return ( randomInt(1) == 1 );
}

function randomInt (max) {
    // generates a random integer in the range [0, max]
    let rand = Math.random();
    rand = Math.floor( rand * (max + 1) );

    return rand;
}

function tick () {
    if (randomBool()) {
        placeOrder();
    } else {
        // no new order, update the notification
        document.getElementById('newOrderText').innerHTML = `Waiting for orders...`;
    }

    if (!(kitchenBusy) && (queue.length > 0)) {
        queue[0].start();
    }
}

var ordersMade = 0;
var pizzasReady = 0;
var totalPrice = 0;
var queue = [];
var kitchenBusy = false;

// define pizzas

var peperoni = new Pizza('Peperoni', 100 /*cost*/, 2000 /*timeToMake in ms = 2 seconds */);
var vegetariana = new Pizza('Vegetariana', 70, 1000);
var quattroStagioni = new Pizza('Quattro Stagioni', 120, 2000);

var pizzas = [peperoni, vegetariana, quattroStagioni];

var tickTime = 1000; // ms
setInterval(tick, tickTime);