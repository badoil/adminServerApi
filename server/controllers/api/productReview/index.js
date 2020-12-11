'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./productReview-ctrl')

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostProductReview',
  tags: ['ProductReview'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Post ProductReview success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate ProductReview'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':goods_review_id',
  method: 'put',
  summary: 'update ProductReview',
  schema: 'UpdateProductReview',
  tags: ['ProductReview'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':goods_review_id',
  method: 'delete',
  summary: 'Delete ProductReview',
  schema: 'DeleteProductReview',
  tags: ['ProductReview'],
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
  summary: 'GetProductReview',
  schema: 'GetProductReview',
  description: '',
  tags: ['ProductReview'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
