'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./dealCompositionDetail-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostDealCompositionDetail',
  tags: ['DealCompositionDetail'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'DealCompositionDetail posting success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':deal_detail_idx',
  method: 'put',
  summary: 'update DealCompositionDetail',
  schema: 'UpdateDealCompositionDetail',
  tags: ['DealCompositionDetail'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':deal_detail_idx',
  method: 'delete',
  summary: 'Delete DealCompositionDetail',
  schema: 'DeleteDealCompositionDetail',
  tags: ['DealCompositionDetail'],
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
  summary: 'Get DealCompositionDetail List',
  schema: 'GetDealCompositionDetailList',
  description: '',
  tags: ['DealCompositionDetail'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
