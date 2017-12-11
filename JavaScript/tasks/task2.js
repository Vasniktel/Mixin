'use strict';

/**
 * implement wrap(obj, ...funcs)
 * so if obj contains func.name it should be wrapped
 */

const wrapper = fn => (
  (...args) => {
    console.log('Before ' + fn.name);
    const result = fn(...args);
    console.log('After ' + fn.name);
    return result;
  }
);

const wrap = (obj, ...funcs) => {
  funcs.forEach(fn => {
    if (obj.hasOwnProperty(fn.name) && typeof(obj[fn.name]) === 'function')
      obj[fn.name] = wrapper(fn.bind(obj));
  });
  return obj;
};

// Usage

const square = {
  height: 5,
  width: 6,

  area() {
    return this.height * this.width;
  },

  perimeter() {
    return (this.height + this.width) * 2;
  }
};

console.dir(wrap(square, square.area, square.perimeter));
console.dir(square.area());
console.dir(square.perimeter());
