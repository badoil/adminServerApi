'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./user-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostUser',
  tags: ['User'],
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
  summary: 'update User',
  schema: 'UpdateUser',
  tags: ['User'],
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
  schema: 'DeleteUser',
  tags: ['User'],
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
  summary: '일반회원목록',
  schema: 'GetCustomer',
  description: '',
  tags: ['User'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
