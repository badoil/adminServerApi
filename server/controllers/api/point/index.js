'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./point-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostPoint',
  tags: ['Point'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
});

module.exports.update = new ApiRouter({
  name: ':point_idx',
  method: 'put',
  summary: 'update Point',
  schema: 'UpdatePoint',
  tags: ['Point'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
});

module.exports.delete = new ApiRouter({
  name: '',
  method: 'delete',
  summary: 'Delete Point',
  schema: 'DeletePoint',
  tags: ['Point'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.delete
});

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'GetPoint',
  schema: 'GetPoint',
  description: '',
  tags: ['Point'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
});