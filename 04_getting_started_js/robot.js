class Point {
    constructor (x, y) {
        if (!(typeof x === 'number') || !(typeof y === 'number')) {
            throw Error('Point coordinates (x, y) must be numbers!');
        }
        this._x = x;
        this._y = y;
    }

    get x () {
        return this._x;
    }

    get y () {
        return this._y;
    }

    xInc () {
        this._x += 1;
    }

    xDec () {
        this._x -= 1;
    }

    yInc () {
        this._y += 1;
    }

    yDec () {
        this._y -= 1;
    }
}

Point.prototype.toString = function () {
    return `Point @ ${this._x}, ${this._y}`;
}

class Robot {
    constructor (startPoint) {
        if (!(startPoint instanceof Point)) {
            throw Error('Error: starting point must be a Point object!');
        }
        this._position = startPoint;
    }

    moveLeft (amount) {
        if (!(typeof amount === 'number')) {
            throw Error('moveLeft requires an argument of type number');
        }
        
        for (var i=0; i < amount; i+=1) {
            this._position.xDec();
        }
    }

    moveRight (amount) {
        if (!(typeof amount === 'number')) {
            throw Error('moveRight requires an argument of type number');
        }

        for (var i=0; i < amount; i+=1) {
            this._position.xInc();
        }
    }


    moveUp (amount) {
        if (!(typeof amount === 'number')) {
            throw Error('moveUp requires an argument of type number');
        }

        for (var i=0; i < amount; i+=1) {
            this._position.yDec();
        }
    }


    moveDown (amount) {
        if (!(typeof amount === 'number')) {
            throw Error('moveLeft requires an argument of type number');
        }
        
        for (var i=0; i < amount; i+=1) {
            this._position.yInc();
        }
    }

    getPosition () {
        return this._position;
    }
}


var robot = new Robot(new Point(0, 0));

robot.moveLeft(10);
robot.moveDown(5);

console.log(robot.getPosition().toString()); // Point @ -10, 5