'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./order-ctrl')


module.exports.multipleInsertTest = new ApiRouter({
  name: 'multipleInsertTest',
  method: 'post',
  summary: 'RegisterSabangnet',
  schema: 'PostSabangnet',
  description: 'Sabangnet',
  tags: ['Order'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting Sabangnet success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.multipleInsertTest
})

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostOrder',
  description: '주문',
  tags: ['Order'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting order success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
})

module.exports.multipleInsert = new ApiRouter({
    name: 'multipleInsert',
    method: 'post',
    summary: 'Register',
    schema: 'MultiplePost',
    description: '주문',
    tags: ['Order'],
    description: '',
    isPublic: true,
    responses: {
      200: {description: 'Posting order success'},
      400: {description: 'Invalid data'},
    },
    handler: ctrl.multipleInsert
  })

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update Order',
  schema: 'UpdateOrder',
  description: '주문',
  tags: ['Order'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: '',
  method: 'delete',
  summary: 'Delete Order',
  schema: 'DeleteOrder',
  description: '주문',
  tags: ['Order'],
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
  summary: 'MainOrder',
  schema: 'GetOrderList',
  description: '주문',
  tags: ['Order'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})


module.exports.deleteAll = new ApiRouter({
  name: 'deleteAll',
  method: 'delete',
  summary: 'deleteAll',
  schema: '',
  description: '주문',
  tags: ['Order'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.deleteAll
})
