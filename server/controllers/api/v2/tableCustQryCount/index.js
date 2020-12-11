'use strict'

const ApiRouter = require('../../../default').ApiRouter
const ctrl = require('./tableCustQryCount-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register TableCustQryCount',
  schema: 'PostV2TableCustQryCount',
  tags: ['v2/TableCustQryCount'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'TableCustQryCount posting success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
name: ':idx',
method: 'put',
summary: 'update TableCustQryCount',
schema: 'UpdateV2TableCustQryCount',
tags: ['v2/TableCustQryCount'],
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
  summary: 'Delete TableCustQryCount',
  schema: 'DeleteteV2TableCustQryCount',
  tags: ['v2/TableCustQryCount'],
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
  summary: 'Get TableCustQryCount List',
  schema: 'GetV2TableCustQryCountList',
  description: '',
  tags: ['v2/TableCustQryCount'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

