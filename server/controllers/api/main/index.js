'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./main-ctrl')


module.exports.getList = new ApiRouter({
    name: '',
    method: 'get',
    summary: 'Get Main List',
    schema: 'GetMainList',
    description: '',
    tags: ['Main'],
    isPublic: true,
    responses: {
      200: {description: 'Success'},
      400: {description: 'Invalid data'}
    },
    handler: ctrl.getList
  })