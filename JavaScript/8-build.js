'use strict';

// Another implementation of 7-build.js file:
// parse csv file into array of arrays with predefined properties

const fs = require('fs');

const parse = csv => {
  const data = csv.split('\n');
  if (!data[data.length - 1]) data.pop(); // empty string
  return data.map(line => line.split(','));
};

const partWrap = (fn, ...args) => function(...pars) {
  return fn.call(this, ...args, ...pars);
};

const partial = (field, ...args) => (
  Object.keys(field).reduce((acc, fnName) => {
    acc[fnName] = partWrap(field[fnName], ...args);
    return acc;
  }, {})
);

const objectify = (data, fields) => {
  const header = data.shift();

  const props = header.reduce((acc, col, index) => {
    acc[col] = (
      fields[col] ?
        partial(fields[col], index) :
        {
          get() {
            return this[index];
          },
          set(value) {
            this[index] = value;
          }
        }
    );
    return acc;
  }, {});

  Object.keys(fields)
    .filter(fnName => (
      !header.includes(fnName) && typeof(fields[fnName]) === 'function'
    ))
    .forEach(fnName => (
      props[fnName] = { get: fields[fnName] }
    ));

  return data.map(row => Object.defineProperties(row, props));
};

// Usage

const fields = {
  name: {
    get(index) {
      return this[index];
    }
  },
  born: {
    get(index) {
      return new Date(this[index]);
    },
    set(index, value) {
      this[index] = value instanceof Date ? value.toISOString() : value;
    }
  },
  age() {
    return (
      new Date().getFullYear() -
      new Date(this.born + '').getFullYear()
    );
  }
};

const csv = fs.readFileSync('data.csv').toString();
const parsed = objectify(parse(csv), fields);

console.dir(parsed, { showHidden: true, colors: true });
parsed.forEach(person => (
  console.log(`${person.name} was born in ${person.city} in ${person.born}`),
  console.log(`His age is ${person.age} as of today`)
));
