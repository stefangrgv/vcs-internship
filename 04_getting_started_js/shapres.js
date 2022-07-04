function Shape (type) {
  this.type = type;

  this.getType = function () {
    return type;
  };
}

Shape.prototype.area = function () {
  throw new Error('Cannot call area of Shape. Use subclasses!');
};

class Rectangle extends Shape {
  constructor (side) {
    if (side <= 0) {
      throw Error('Side must be > 0');
    }
    super('rectangle');
    this.side = side;
  }

  area () {
    return Math.pow(this.side, 2);
  }
}

class Triangle extends Shape {
  constructor (a, b, c) {
    if ((a <= 0) || (b <= 0) || (c <= 0)) {
      throw Error('All sides must be > 0');
    }
    if ((a + b <= c) || (a + c <= b) || (b + c <= a)) {
      throw Error('Triangle cannot exist: sides A + B must always be greater than side C');
    }
    super('triangle');
    this.a = a;
    this.b = b;
    this.c = c; 
  }

  area () {
    let s = 0.5 * (this.a + this.b + this.c);
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }
}

class Circle extends Shape {
  constructor (r) {
    if (r <= 0) {
      throw Error('Radius must be > 0');
    }
    super('circle');
    this.r = r; 
  }

  area () {
    return Math.PI * Math.pow(this.r, 2);
  }
}

let r = new Rectangle(5);
console.log(r.getType());
console.log(r.area());

let t = new Triangle(2,4,5);
console.log(t.getType());
console.log(t.area());

let c = new Circle(10);
console.log(c.getType());
console.log(c.area());