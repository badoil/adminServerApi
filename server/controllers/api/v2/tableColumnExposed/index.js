'use strict'

const ApiRouter = require('../../../default').ApiRouter
const ctrl = require('./tableColumnExposed-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register TableColumnExposed',
  schema: 'PostV2TableColumnExposed',
  tags: ['v2/TableColumnExposed'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'TableColumnExposed posting success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.register
})

module.exports.delete = new ApiRouter({
  name: ':idx',
  method: 'delete',
  summary: 'Delete TableColumnExposed',
  schema: 'DeleteteV2TableColumnExposed',
  tags: ['v2/TableColumnExposed'],
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
  summary: 'Get TableColumnExposed List',
  schema: 'GetV2TableColumnExposedList',
  description: '',
  tags: ['v2/TableColumnExposed'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})