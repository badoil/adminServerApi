'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./coalition_standing_point_inquiry-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostCoalition',
  tags: ['coalition_standing_point_inquiry'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Sign up success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate email'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':idx',
  method: 'put',
  summary: 'update coalition_standing_point_inquiry',
  schema: 'UpdateCoalition',
  tags: ['coalition_standing_point_inquiry'],
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
  summary: 'Delete coalition_standing_point_inquiry',
  schema: 'DeleteCoalition',
  tags: ['coalition_standing_point_inquiry'],
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
  summary: 'GetCoalition',
  schema: 'GetCoalitionList',
  description: '',
  tags: ['coalition_standing_point_inquiry'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
