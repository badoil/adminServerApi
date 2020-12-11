'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./manufacturer-ctrl')

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostManufacturer',
  tags: ['Manufacturer'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Post Manufacturer success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate Manufacturer'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':mfr_idx',
  method: 'put',
  summary: 'update Manufacturer',
  schema: 'UpdateManufacturer',
  tags: ['Manufacturer'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':mfr_idx',
  method: 'delete',
  summary: 'Delete Manufacturer',
  schema: 'DeleteManufacturer',
  tags: ['Manufacturer'],
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
  summary: 'GetManufacturer',
  schema: 'GetManufacturerList',
  description: '',
  tags: ['Manufacturer'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})