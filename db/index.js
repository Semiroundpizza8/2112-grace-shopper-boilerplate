
const client = require('./client');
const models = require('./models');
// const tests = require('./Tests')

module.exports = {
  client,
  ...models,
  // ...tests,
};
