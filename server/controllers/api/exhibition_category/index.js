'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./exhibition_category-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostMainExhibitions',
  description: '기획전',
  tags: ['exhibition-category'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting MainExhibition success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update MainExhibition',
  schema: 'UpdateMainExhibitions',
  description: '기획전',
  tags: ['exhibition-category'],
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
  summary: 'Delete MainExhibition',
  schema: 'DeleteMainExhibitions',
  description: '기획전',
  tags: ['exhibition-category'],
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
  summary: 'MainExhibition',
  schema: 'GetExhibitionCategory',
  description: '기획전',
  tags: ['exhibition-category'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})


module.exports.insertFakeData = new ApiRouter({
  name: 'insertFakeData',
  method: 'post',
  summary: 'insertFakeData',
  schema: '',
  description: '기획전',
  tags: ['exhibition-category'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting MainExhibition success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.insertFakeData
})