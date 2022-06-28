class Pizza {
    constructor (name, cost, timeToMake) {
        if ((!Number.isInteger(cost)) || (!Number.isInteger(timeToMake))) {
            throw Error('Error: pizza cost and timeToMake must be integers');
        }
        this.name = name;
        this.cost = cost;
        this.timeToMake = timeToMake;
    }
}

class PizzaOrder {
    constructor (pizza) {
        this.pizza = pizza;
    }

    assignId () {
        this.id = Date.now();
    }

    getId () {
        return this.id;
    }

    ready (callback) {
        this.whenReady = callback;
    }

    start () {
        this.isPrepared = true;
        setTimeout(this.whenReady.bind(this), this.pizza.timeToMake, this.pizza, this);
    }
}

function randomInt (max) {
    // returns a random integer in the range [0, max]
    return Math.floor(Math.random() * (max + 1));
}

function randomBool (trueChancePercent) {
    //returns a random boolean with a trueChancePercent % chance to be true
    return (randomInt(100) <= trueChancePercent);
}

function getTotalPrice () {
    return prepared.reduce((sum, el) => sum += el.pizza.cost, 0);
}

function pizzaDone (pizza, order) {
    // business
    prepared.push(orders.shift());

    // ui
    console.log(`\t\tREADY order ${order.getId()} --- You have ${prepared.length} pizza(s) total for ${getTotalPrice()}$`);
}

function tick () {
    // place order
    if (randomBool(20)) {
        // business
        orders.push(new PizzaOrder(pizzas[randomInt(pizzas.length - 1)]));
        orders.at(-1).assignId();
        orders.at(-1).ready(pizzaDone);

        // ui
        console.log(`NEW order ${orders.at(-1).getId()}: ${orders.at(-1).pizza.name} (${orders.length} order(s) in queue)`);
    }

    // start cooking
    if ((orders.length > 0) && (!(orders[0].hasOwnProperty('isPrepared')))) {
        // business
        orders[0].start();

        // ui
        console.log(`\tSTARTED order ${orders[0].getId()}`);
    }
}

// define pizzas
const peperoni = new Pizza('Peperoni', 100 /*cost*/, 2000 /*timeToMake in ms = 2 seconds */);
const vegetariana = new Pizza('Vegetariana', 70, 1000);
const quattroStagioni = new Pizza('Quattro Stagioni', 120, 2000);

const pizzas = [peperoni, vegetariana, quattroStagioni];

 
let orders = [];
let prepared = [];

setInterval(tick, 500)