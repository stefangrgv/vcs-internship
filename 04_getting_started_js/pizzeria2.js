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
        this.id = Date.now();
    }

    getId () {
        return this.id;
    }

    ready (callback) {
        this.whenReady = callback;
    }

    start () {
        //
    }
}

class Cook {
    constructor () {
        this.pendingOrders = [];
        this.readyOrders = [];
        this.isBusy = false;
        this.pizzas = [
            new Pizza('Peperoni', 100 /*cost*/, 2000 /*timeToMake in ms = 2 seconds */),
            new Pizza('Vegetariana', 70, 1000),
            new Pizza('Quattro Stagioni', 120, 2000)
        ];
    }

    placeNewOrder () {
        let newPizza = new PizzaOrder(this.pizzas[randomInt(this.pizzas.length - 1)]);
        this.pendingOrders.push(newPizza);
        this.pendingOrders.at(-1).ready(this.readyCallback);

        console.log(`NEW order: ${newPizza.getId()} --- ${newPizza.pizza.name}\t${this.pendingOrders.length} order(s) in queue`);
    }

    startCooking () {
        if (!this.isBusy && this.pendingOrders.length > 0) {
            this.isBusy = true;
            setTimeout(
                this.pendingOrders[0].whenReady.bind(this),
                this.pendingOrders[0].pizza.timeToMake,
                this.pendingOrders[0].pizza,
                this.pendingOrders[0]
            );

            console.log(`STARTED order: ${this.pendingOrders[0].getId()} --- ${this.pendingOrders[0].pizza.name}`);
        }
    }
    
    readyCallback (pizza, order) {
        this.pendingOrders.shift();
        this.isBusy = false;
        this.readyOrders.push(order);

        console.log(`READY order: ${order.getId()} --- ${pizza.name}\tTotal price ${this.caclulateTotalPrice()} for ${this.readyOrders.length} pizza(s)`);
    }

    caclulateTotalPrice () {
        return this.readyOrders.reduce((total, el) => total += el.pizza.cost, 0);
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

function tick () {
    // place order
    if (randomBool(25)) {
        cook.placeNewOrder();
    }

    // start cooking
    cook.startCooking();
}

let cook = new Cook();
setInterval(tick, 500);