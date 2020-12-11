'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./sabangnet-ctrl')

// module.exports.register = new ApiRouter({
//   name: 'signup',
//   method: 'post',
//   summary: 'Sign up',
//   schema: 'AdminSignUp',
//   tags: ['Admin'],
//   description: 'Admin SignUp' ,
//   isPublic: true,
//   responses: {
//     200: {description: 'Sign up success'},
//     400: {description: 'Invalid data'},
//     409: {description: 'Duplicate email'}
//   },
//   handler: ctrl.register
// })

// module.exports.signIn = new ApiRouter({
//   name: 'signin',
//   method: 'post',
//   summary: 'Sign in',
//   schema: 'AdminSignIn',
//   tags: ['Admin'],
//   description: 'Admin Sign In.',
//   isPublic: true,
//   responses: {
//     200: {description: 'Sign in success'},
//     401: {description: 'Authentication failed'},
//     404: {description: 'Not found'}
//   },
//   handler: ctrl.signIn
// })


module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: '',
  schema: '',
  description: '기획전',
  tags: ['sabangnet'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
module.exports.getShopList = new ApiRouter({
  name: 'shop',
  method: 'get',
  summary: '',
  schema: '',
  description: '기획전',
  tags: ['sabangnet'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getShopList
})