'use strict'

const ApiRouter = require('../../../default').ApiRouter
const ctrl = require('./customer-ctrl')

module.exports.register = new ApiRouter({
    name: '',
    method: 'post',
    summary: 'Register',
    schema: 'PostV2Customer',
    tags: ['V2/Customers'],
    description: '',
    isPublic: true,
    responses: {
      200: {description: 'Sign up success'},
      400: {description: 'Invalid data'},
      409: {description: 'Duplicate id'}
    },
    handler: ctrl.register
  })
  
  module.exports.signIn = new ApiRouter({
    name: 'signIn',
    method: 'post',
    summary: 'Register',
    schema: 'SignInV2Customer',
    tags: ['V2/Customers'],
    description: '',
    isPublic: true,
    responses: {
      200: {description: 'Sign In success'},
      400: {description: 'Invalid data'},
      409: {description: 'Duplicate email'}
    },
    handler: ctrl.signIn
  })

module.exports.getList = new ApiRouter({
    name: '',
    method: 'get',
    summary: 'Get Customer List',
    schema: 'GetV2CustomersList',
    description: '전체 리스트를 불러옵니다',
    tags: ['V2/Customers'],
    isPublic: true,
    responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'}
    },
    handler: ctrl.getList
  })

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update Customer',
  schema: 'UpdateV2Customer',
  tags: ['V2/Customers'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})


module.exports.delete = new ApiRouter({
    name: ':cust_idx',
    method: 'delete',
    summary: 'Delete Customer',
    schema: 'DeleteV2Customer',
    tags: ['V2/Customers'],
    isPublic: true,
    responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'},
      409: {description: 'Already removed'}
    },
    handler: ctrl.delete
  })