'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./hotDeal-ctrl')


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
  summary: 'JUKLIP: 적립',
  schema: 'GetHotDeal',
  description: 'HotDeal List / 현재 타이머는 종료시간을 맞추기 어려우니, 뷰에서 적당히 그려 주세요.',
  tags: ['HotDeal'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
