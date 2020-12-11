'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./affiliation-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostAffiliation',
  tags: ['Affiliation'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
});

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update Affiliation',
  schema: 'UpdateAffiliation',
  tags: ['Affiliation'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
});

module.exports.delete = new ApiRouter({
  name: '',
  method: 'delete',
  summary: 'Delete Affiliation',
  schema: 'DeleteAffiliation',
  tags: ['Affiliation'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.delete
});

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'GetAffiliation',
  schema: 'GetAffiliation',
  description: '',
  tags: ['Affiliation'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
});

// module.exports.getListByIdx = new ApiRouter({
//   name: ':IDX',
//   method: 'get',
//   summary: 'getListByIdx',
//   schema: 'AffiliationGetListByIdx',
//   tags: ['Affiliation'],
//   description: '',
//   isPublic: true,
//   path:["IDX"],
//   responses: {
//     200: {description: 'success'},
//     400: {description: 'bad request'},
//   },
//   handler: ctrl.getListByIdx
// })