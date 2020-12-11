'use strict'

const ApiRouter = require('../../../default').ApiRouter
const ctrl = require('./tableColumn-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register TableColumn',
  schema: 'PostV2TableColumn',
  tags: ['v2/TableColumn'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'TableColumn posting success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
name: ':idx',
method: 'put',
summary: 'update TableColumn',
schema: 'UpdateV2TableColumn',
tags: ['v2/TableColumn'],
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
  summary: 'Delete TableColumn',
  schema: 'DeleteteV2TableColumn',
  tags: ['v2/TableColumn'],
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
  summary: 'Get TableColumn List',
  schema: 'GetV2TableColumnList',
  description: '',
  tags: ['v2/TableColumn'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

