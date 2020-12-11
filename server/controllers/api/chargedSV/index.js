'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./chargedSV-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostChargedSV',
  tags: ['ChargedSV'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
});

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update ChargedSV',
  schema: 'UpdateChargedSV',
  tags: ['ChargedSV'],
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
  summary: 'Delete ChargedSV',
  schema: 'DeleteChargedSV',
  tags: ['ChargedSV'],
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
  summary: 'GetChargedSV',
  schema: 'GetChargedSV',
  description: '',
  tags: ['ChargedSV'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
});

module.exports.getListByIdx = new ApiRouter({
  name: ':IDX',
  method: 'get',
  summary: 'getListByIdx',
  schema: 'ChargedSVGetListByIdx',
  tags: ['ChargedSV'],
  description: '',
  isPublic: true,
  path:["IDX"],
  responses: {
    200: {description: 'success'},
    400: {description: 'bad request'},
  },
  handler: ctrl.getListByIdx
})