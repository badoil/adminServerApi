'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./goods-ctrl')

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostGoods',
  tags: ['Goods'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Goods posting success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate goods'}
  },
  handler: ctrl.register
})

module.exports.registerTest = new ApiRouter({
  name: 'registerTest',
  method: 'post',
  summary: 'Register',
  schema: 'PostGoodsTest',
  tags: ['Goods'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Goods posting success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate goods'}
  },
  handler: ctrl.registerTest
})

module.exports.multipleInsert = new ApiRouter({
  name: 'multipleInsert',
  method: 'post',
  summary: 'multiInsert',
  schema: 'MultiInsert',
  tags: ['Goods'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'MultiInsert Goods success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.multipleInsert
})

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update Goods',
  schema: 'UpdateGoods',
  tags: ['Goods'],
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
  summary: 'Delete Goods',
  schema: 'DeleteGoods',
  tags: ['Goods'],
  path:["id"],
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
  summary: 'Get Goods List',
  schema: 'GetGoodsList',
  description: '전체 리스트를 불러옵니다',
  tags: ['Goods'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

module.exports.fakeCategoryMatching = new ApiRouter({
  name: 'fakeCategoryMatching',
  method: 'get',
  summary: 'Get Goods List',
  schema: '',
  description: '전체 리스트를 불러옵니다',
  tags: ['Goods'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.fakeCategoryMatching
})

module.exports.multipleDiscountUpdate = new ApiRouter({
  name: 'multipleDiscountUpdate',
  method: 'get',
  summary: 'Get Goods List',
  schema: '',
  description: '',
  tags: ['Goods'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.multipleDiscountUpdate
})

module.exports.multipleCountUpdate = new ApiRouter({
  name: 'multipleCountUpdate',
  method: 'get',
  summary: 'Update Deal List',
  schema: '',
  description: '',
  tags: ['Goods'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.multipleCountUpdate
})