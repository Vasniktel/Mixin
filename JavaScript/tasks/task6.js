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

const MixedRobot = mixPrototype(Robot, {
  greet() {
    console.log(this.greeting);
  }
});

console.dir(MixedRobot.prototype);
console.dir(MixedRobot.__proto__);

const robot = new MixedRobot();
console.dir(robot.__proto__);
robot.greet();
