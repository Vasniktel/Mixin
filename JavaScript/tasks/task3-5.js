'use strict';

/**
 * Task 3:
 * implement mixin loggable()
 * Task 5:
 * implement emitable with Object.defineProperty (see 6-evants.js)
 */

const loggable = obj => Object.assign(obj, {
  log(...args) {
    console.log(...args);
  }
});

const emitable = obj => {
  const mixin = {
    events: {},
    on(name, ...funcs) {
      const event = this.events[name] || [];
      this.events[name] = event.concat(funcs);
    },
    emit(name, ...args) {
      const event = this.events[name];
      if (event) event.forEach(fn => fn(...args));
    }
  };
  Object.keys(mixin).forEach(key => Object.defineProperty(obj, key, {
    value: mixin[key]
  }));
  return obj;
};

// Usage

const logger = value => {
  let data = value;
  const raw = {
    get data() {
      return data;
    },
    set data(value) {
      data = value;
      this.emit('change', 'new data: ', data);
    }
  };
  const result = emitable(loggable(raw));
  result.on('change', result.log);
  return result;
};

const log = logger(5);
log.data = 6;
log.data = 7;
