'use strict';

/**
 * Task 4:
 * implement universal equilateral mixin for N sides (see 5-class.js)
 */

const equilateral = Category => class extends Category {
  constructor(x, y, side) {
    super(x, y, ...Array(Category.length - 2).fill(side));
  }
};

// Usage

const Rect = class {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toString() {
    return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
  }
};

const Square = equilateral(Rect);
const p1 = new Square(10, 20, 50);
console.log(p1.toString());


const Pentagon = class {
  constructor(x, y, size1, size2, size3, size4, size5) {
    this.x = x;
    this.y = y;
    this.sizes = [ size1, size2, size3, size4, size5 ];
  }

  toString() {
    return `[${this.x}, ${this.y}, sizes: ${this.sizes}]`;
  }
};

const EqualPentagon = equilateral(Pentagon);
const p2 = new EqualPentagon(10, 20, 50);
console.log(p2.toString());
