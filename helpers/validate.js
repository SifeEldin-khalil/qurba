/** Require validator */
const { Pineapple }    = require('qantra-pineapple');

/** validation model */
const validationModels = [
  {
      model: '_id',
      type: 'String',
      length: 24,
  },
  {
      model: 'fullname',
      type: 'String',
      length: {min: 3, max:100},
  },
  {
      model: 'country',
      type: 'String',
      length: {min: 3, max:30},
  },
  {
      model: 'phone',
      type: 'String',
      length: 11,
  },
  {
      model: 'email',
      type: 'String',
      regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      length: {min: 10, max:30},
  },
  {
      model: 'number',
      type: 'Number',
      length: {min: 1, max:6},
  },
  {
      model: 'arrayOfStrings',
      type: 'Array',
      items: {
          type: 'String',
          length: { min: 3, max: 100}
      }
  },
  {
      model: 'obj',
      type: 'Object',
  },
  {
      model: 'bool',
      type: 'Boolean',
  },
  {
    model: 'oneOF',
    type: 'String',
    length: {min: 3, max:100},
    oneOf: [ "approval", "password", "none"]
  }
]

/** Initiate new validator */
const pineapple = new Pineapple(validationModels);

/** Export validator */
module.exports = pineapple.validate.bind(pineapple)