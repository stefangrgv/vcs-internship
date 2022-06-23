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

    //
    getPizza () {
        return this._pizza;
    }

    start () {
        kitchenBusy = true;
        
        setTimeout( this.ready.bind(this), this.getPizza().getTimeToMake(), notifyPizzaReady );
    }

    ready ( callback ) {
        callback(this._pizza, queue[0]);
    }
}

function notifyPizzaReady (pizza, order) {
    // update the page queue
    let htmlQueueList = document.getElementById('queueOL');
    let htmlQueueItems = document.querySelectorAll('#queueOL li');
    htmlQueueList.removeChild(htmlQueueItems[0]);

    pizzasReady += 1;
    totalPrice += pizza.getCost();
    
    // update the notification for a ready order
    document.getElementById('orderReadyText').innerHTML = `#${order.getId()} (${pizza.getName()}) is ready!`

    // update the ready count and the total price
    document.getElementById('readyText').innerHTML = `Price: ${totalPrice} for ${pizzasReady} pizzas`;

    queue.shift();
    updateQueueHeader();

    kitchenBusy = false;
}

function placeOrder () {
    let randomPizzaIndex = generateRandomInt(pizzas.length - 1);
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

function generateRandomBool () {
    // randomly generates a true or false value
    return ( generateRandomInt(1) == 1 );
}

function generateRandomInt (max) {
    // generates a random integer in the range [0, max]
    let rand = Math.random();
    rand = Math.floor( rand * (max + 1) );

    return rand;
}

function tick () {
    let randBool = generateRandomBool();
    if (randBool) {
        placeOrder();
    } else {
        // update the notification for no new order
        document.getElementById('newOrderText').innerHTML = `Waiting for orders...`;
    }

    if (!(kitchenBusy) && (queue.length > 0)) {
        queue[0].start();
    }
}

var tickTime = 1000;

var ordersMade = 0;
var queue = [];
var kitchenBusy = false;

var peperoni = new Pizza('Peperoni', 100 /*cost*/, 2000 /*timeToMake in ms = 2 seconds */);
var vegetariana = new Pizza('Vegetariana', 70, 1500);
var quattroStagioni = new Pizza('Quattro Stagioni', 120, 2500);

var pizzas = [peperoni, vegetariana, quattroStagioni];

var pizzasReady = 0;
var totalPrice = 0;

setInterval(tick, tickTime);