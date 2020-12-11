'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./supplier-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostSupplier',
  tags: ['supplier'],
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
  name: ':suppl_idx',
  method: 'put',
  summary: 'update supplier',
  schema: 'UpdateSupplier',
  tags: ['supplier'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':suppl_idx',
  method: 'delete',
  summary: 'Delete supplier',
  schema: 'DeleteSupplier',
  tags: ['supplier'],
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
  summary: 'Get supplier',
  schema: 'GetSupplierList',
  description: '',
  tags: ['supplier'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})



module.exports.suppelierSettingInsert = new ApiRouter({
  name: 'registerTest',
  method: 'post',
  summary: 'Register',
  schema: '',
  tags: ['supplier'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Goods posting success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate goods'}
  },
  handler: ctrl.suppelierSettingInsert
})