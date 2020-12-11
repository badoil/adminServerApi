'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./deliveryDestination-ctrl')

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostDeliveryDestination',
  tags: ['DeliveryDestination'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Post DeliveryDestination success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate DeliveryDestination'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':deliv_dest_idx',
  method: 'put',
  summary: 'update DeliveryDestination',
  schema: 'UpdateDeliveryDestination',
  tags: ['DeliveryDestination'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':deliv_dest_idx',
  method: 'delete',
  summary: 'Delete DeliveryDestination',
  schema: 'DeleteDeliveryDestination',
  tags: ['DeliveryDestination'],
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
  summary: 'GetDeliveryDestination',
  schema: 'GetDeliveryDestination',
  description: '',
  tags: ['DeliveryDestination'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
