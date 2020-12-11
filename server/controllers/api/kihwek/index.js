'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./kihwek-ctrl')


// module.exports.register = new ApiRouter({
//   name: '',
//   method: 'post',
//   summary: 'Register',
//   schema: 'PostBanner',
//   tags: ['Banner'],
//   description: '',
//   isPublic: true,
//   responses: {
//     200: {description: 'Sign up success'},
//     400: {description: 'Invalid data'},
//     409: {description: 'Duplicate email'}
//   },
//   handler: ctrl.register
// })

// module.exports.update = new ApiRouter({
//   name: ':idx',
//   method: 'put',
//   summary: 'update User',
//   schema: 'UpdateUser',
//   tags: ['Banner'],
//   description:'',
//   isPublic: true,
//   responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'}
//   },
//   handler: ctrl.update
// })

// module.exports.delete = new ApiRouter({
//   name: ':idx',
//   method: 'delete',
//   summary: 'Delete User',
//   schema: 'DeleteUser',
//   tags: ['Banner'],
//   isPublic: true,
//   responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'},
//     409: {description: 'Already removed'}
//   },
//   handler: ctrl.delete
// })

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'Get Kihwek List',
  schema: '',
  description: '',
  tags: ['Kihwek'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
