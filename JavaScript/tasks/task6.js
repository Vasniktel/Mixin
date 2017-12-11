'use strict';

/**
 * Task 6:
 * implement mixin for prototypes (not instances)
 */

const mixPrototype = (arg, mixin) => {
  const prototype = typeof(arg) === 'object' ? arg.__proto__ : arg.prototype;
  Object.assign(prototype, mixin);
  return arg;
};

// Usage

const Robot = class {
  constructor(greeting) {
    this.greeting = greeting || 'Hello';
  }
};

const mixed = mixPrototype(Robot, {
  greet() {
    console.log(this.greeting);
  }
});

console.dir(mixed.prototype);
console.dir(mixed.__proto__);

const robot = new Robot();
console.dir(robot.__proto__);
robot.greet();
