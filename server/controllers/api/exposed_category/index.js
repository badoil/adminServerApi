'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./exposed_category-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostExhibition',
  description: '노출카테고리',
  tags: ['exposed-category'],
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
  schema: 'MultipleUpdateMainExhibition',
  description: '기획전',
  tags: ['exposed-category'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

// module.exports.multipleUpdate = new ApiRouter({
//   name: 'mutiple',
//   method: 'put',
//   summary: 'multipleUpdate MainExhibition',
//   schema: 'MultipleUpdateMainExhibition',
//   description: '노출카테고리',
//   tags: ['exposed-category'],
//   description:'',
//   isPublic: true,
//   responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'}
//   },
//   handler: ctrl.multipleUpdate
// })

module.exports.delete = new ApiRouter({
  name: '',
  method: 'delete',
  summary: 'Delete MainExhibition',
  schema: 'DeleteExhibition',
  description: '기획전',
  tags: ['exposed-category'],
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
  summary: 'MainExhibition',
  schema: 'GetExhibitionList',
  description: '기획전',
  tags: ['exposed-category'],
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
  description: '노출카테고리',
  tags: ['exposed-category'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting MainExhibition success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.insertExcel
})