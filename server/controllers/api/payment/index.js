'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./payment-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostPayment',
  tags: ['Payment'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Sign up success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate email'}
  },
  handler: ctrl.register
})

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'GetPayment',
  schema: 'GetPayment',
  description: '',
  tags: ['Payment'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
