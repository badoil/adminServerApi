'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./common-ctrl')


module.exports.getImageUrl = new ApiRouter({
  name: 'image/url',
  method: 'get',
  summary: 'Get a s3 pre-signed url',
  schema: 'GetImagePreSignedUrl',
  tags: ['Common'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getImageUrl
})



module.exports.search = new ApiRouter({
  name: 'search',
  method: 'get',
  summary: 'search list',
  schema: 'Search',
  tags: ['Common'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.search
})

