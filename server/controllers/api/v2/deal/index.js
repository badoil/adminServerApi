'use strict'

const ApiRouter = require('../../../default').ApiRouter
const ctrl = require('./deal-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostV2Deal',
  tags: ['v2/Deal'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Deal posting success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.register
})

// module.exports.update = new ApiRouter({
// name: ':deal_idx',
// method: 'put',
// summary: 'update Deal',
// schema: 'UpdateDeal',
// tags: ['v2/Deal'],
// description:'',
// isPublic: true,
// responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'}
// },
// handler: ctrl.update
// })

// module.exports.delete = new ApiRouter({
//   name: ':deal_idx',
//   method: 'delete',
//   summary: 'Delete Deal',
//   schema: 'DeleteDeal',
//   tags: ['v2/Deal'],
//   isPublic: true,
//   responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'},
//     409: {description: 'Already removed'}
//   },
//   handler: ctrl.delete
// })

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'Get Deal List',
  schema: 'GetV2DealList',
  description: '',
  tags: ['v2/Deal'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

