'use strict';

/**
 * Task 7:
 * implement extend for mixins with additional override:Boolean flag
 */

const extend = (obj, mixin) => {
  mixin.forEach(mix => Object.keys(mix).forEach(key => {
    if (key !== 'override')
      obj[key] = mix.override && mix[key] || obj[key] || mix[key];
  }));
  return obj;
};

// Usage

const obj = {
  override: 4,
  print() {
    console.log('default');
  },
  date() {
    console.log('ISO: ', new Date().toISOString());
  }
};

const mix = [
  {
    override: false,
    print() {
      console.log('overriden');
    }
  },
  {
    override: true,
    date() {
      console.log('UTC: ', new Date().toUTCString());
    }
  }
];

const mixed = extend(obj, mix);
mixed.print();
mixed.date();
console.dir(mixed);
