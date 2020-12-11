'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./representative_category-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostMainExhibition',
  description: '노출카테고리',
  tags: ['representative_category'],
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
  schema: 'UpdateMainExhibition',
  description: '대표카테고리',
  tags: ['representative_category'],
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
  schema: 'DeleteMainExhibition',
  description: '대표카테고리',
  tags: ['representative_category'],
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
  schema: 'GetMainExhibitionList',
  description: '대표카테고리',
  tags: ['representative_category'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})



module.exports.insertExcel = new ApiRouter({
  name: 'insertExcel',
  method: 'post',
  summary: 'Register',
  schema: 'PostMainExhibition',
  description: '대표카테고리',
  tags: ['representative_category'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting MainExhibition success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.insertExcel
})