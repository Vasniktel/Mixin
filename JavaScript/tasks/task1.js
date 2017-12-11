'use strict';

/**
 * Task 1:
 *
 * implement extend(obj, ...objects)
 * so keys from objects will be mixed into obj
 * only if it doesn't contain those keys
 */

const extend = (obj, ...mixins) => {
  mixins.forEach(mixin => (
    Object.keys(mixin).forEach(key => obj[key] = obj[key] || mixin[key])
  ));
  return obj;
};

// Usage

const square = {
  height: 5,
  width: 6,
  area() {
    return this.height * this.width;
  }
};

const mix1 = {
  area() {
    return 'Bad area';
  }
};

const mix2 = {
  perimeter() {
    return (this.height + this.width) * 2;
  }
};

console.dir(extend(square, mix1, mix2));
console.log('area: ', square.area());
console.log('perimeter: ', square.perimeter());
