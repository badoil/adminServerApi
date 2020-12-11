'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./push-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostPush',
  tags: ['Push'],
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
  summary: 'GetPush',
  schema: 'GetPush',
  description: '',
  tags: ['Push'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
