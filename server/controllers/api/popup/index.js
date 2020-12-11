'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./popup-ctrl')

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostPopup',
  tags: ['Popup'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Post Popup success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate Popup'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':popup_id',
  method: 'put',
  summary: 'update Popup',
  schema: 'UpdatePopup',
  tags: ['Popup'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':popup_id',
  method: 'delete',
  summary: 'Delete Popup',
  schema: 'DeletePopup',
  tags: ['Popup'],
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
  summary: 'GetPopup',
  schema: 'GetPopupList',
  description: '',
  tags: ['Popup'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})