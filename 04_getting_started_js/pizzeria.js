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

    getCost () {
        return this._cost;
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

        this._pizza = pizza;
        this._id = Date.now() - startTime;
        this._status = 'waiting'
    }

    getPizza () {
        return this._pizza;
    }

    getId () {
        return this._id;
    }

    get status () {
        return this._status;
    }

    set status (value) {
        if (value === 'waiting' || value === 'preparing' || value === 'ready') {
            this._status = value;
        } else {
            throw Error('New order status must be one of the following: \'waiting\', \'preparing\' or \'ready\'!');
        }
    }

    start () {
        this.status = 'preparing';
        setTimeout(this.ready.bind(this), this.getPizza().getTimeToMake(), setOrderReady);

        uiSetOrderPreparing(this.getPizza(), this);
    }

    ready ( callback ) {
        callback(this.getPizza(), this);
    }
}

function setOrderReady (pizza, order) {
    order.status = 'ready';
    uiSetOrderReady(pizza, order);
}

function uiSetOrderReady (pizza, order) {
    const ordersReadyUI = document.getElementById('readyOL');
    
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`${pizza.getName()} [ID: ${order.getId()}]`));
    ordersReadyUI.appendChild(li);
    
    document.getElementById('nowPreparingText').innerHTML = 'Waiting for orders...';
    startNextOrder();
}

function uiSetOrderPreparing (pizza, order) {
    const ordersQueueUI = document.getElementById('queueOL');
    ordersQueueUI.removeChild(document.querySelectorAll('#queueOL li')[0]);

    document.getElementById('nowPreparingText').innerHTML = `Now preparing:<br><br>${pizza.getName()}<br>ID: ${order.getId()}`
}

function uiPlaceOrder (order) {
    const ordersQueueUI = document.getElementById('queueOL');

    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`${order.getPizza().getName()} [ID: ${order.getId()}]`));
    ordersQueueUI.appendChild(li);
}

function placeOrder () {
    // create a new order of a random pizza and add it to the queue
    let order = new PizzaOrder(pizzas[randomInt(pizzas.length - 1)]);
    allOrders.push(order);

    uiPlaceOrder(order);
}

function randomBool (trueChancePercent) {
    // randomly generates a boolean value with a trueChancePercent % chance of being true
    return ( randomInt(100) <= trueChancePercent );
}

function randomInt (max) {
    // generates a random integer in the range [0, max]
    return Math.floor( Math.random() * (max + 1) );
}

function startNextOrder () {
    if (!(allOrders.find(el => el.status === 'preparing')) && (allOrders.find(el => el.status === 'waiting'))) {
        allOrders.find(el => el.status === 'waiting').start();
    }
}

function tick () {
    // randomly place a new order
    randomBool(20) ? placeOrder() : document.getElementById('newOrderText').innerHTML = `Waiting for orders...`;
    startNextOrder();
}

// define pizzas
const peperoni = new Pizza('Peperoni', 100 /*cost*/, 2000 /*timeToMake in ms = 2 seconds */);
const vegetariana = new Pizza('Vegetariana', 70, 1000);
const quattroStagioni = new Pizza('Quattro Stagioni', 120, 2000);

const pizzas = [peperoni, vegetariana, quattroStagioni];

let allOrders = [];

// main loop
const tickTime = 500; // ms
const startTime = Date.now();
setInterval(tick, tickTime);