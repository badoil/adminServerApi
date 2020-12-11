'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./brand-ctrl')

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostBrand',
  tags: ['Brand'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Post Brand success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate Brand'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':brand_idx',
  method: 'put',
  summary: 'update Brand',
  schema: 'UpdateBrand',
  tags: ['Brand'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':brand_idx',
  method: 'delete',
  summary: 'Delete Brand',
  schema: 'DeleteBrand',
  tags: ['Brand'],
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
  summary: 'GetBrand',
  schema: 'GetBrandList',
  description: '',
  tags: ['Brand'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
