'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./mbr-rank-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostMemberRank',
  tags: ['mbr_rank'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Register success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate email'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update member rank',
  schema: 'UpdateMemberRank',
  tags: ['mbr_rank'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':idx',
  method: 'delete',
  summary: 'Delete User',
  schema: 'DeleteMemberRank',
  tags: ['mbr_rank'],
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
  summary: 'GetMemberRank',
  schema: 'GetMemberRank',
  description: '',
  tags: ['mbr_rank'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})