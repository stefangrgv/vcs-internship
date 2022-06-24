class Point {
    constructor (x, y) {
        if ((typeof x !== 'number') || (typeof y !== 'number')) {
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

Point.prototype.equals = function (other) {
    if (!(other instanceof Point)) {
        throw Error('Error: method equals() requires an argument of type Point');
    }
    return (this.x === other.x) && (this.y === other.y);
}

var point1 = new Point(0,2);
point1.xInc();
point1.xInc();
point1.yInc();

var point2 = new Point(2,3);

console.assert(point1.equals(point2));