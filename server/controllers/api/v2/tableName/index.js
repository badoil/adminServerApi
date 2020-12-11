'use strict'

const ApiRouter = require('../../../default').ApiRouter
const ctrl = require('./tableName-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register TableName',
  schema: 'PostV2TableName',
  tags: ['v2/TableName'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Deal posting success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
name: ':idx',
method: 'put',
summary: 'update TableName',
schema: 'UpdateV2TableName',
tags: ['v2/TableName'],
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
  summary: 'Delete TableName',
  schema: 'DeleteteV2TableName',
  tags: ['v2/TableName'],
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
  summary: 'Get TableName List',
  schema: 'GetV2TableNameList',
  description: '',
  tags: ['v2/TableName'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

