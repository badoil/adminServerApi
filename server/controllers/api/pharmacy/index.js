'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./pharmacy-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostPharmacy',
  tags: ['pharmacy'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Sign up success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate id'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':phar_idx',
  method: 'put',
  summary: 'update pharmacy',
  schema: 'UpdatePharmacy',
  tags: ['pharmacy'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':phar_idx',
  method: 'delete',
  summary: 'Delete pharmacy',
  schema: 'DeletePharmacy',
  tags: ['pharmacy'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.delete
})

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'Get pharmacy',
  schema: 'GetPharmacyList',
  description: '',
  tags: ['pharmacy'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
