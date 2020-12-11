'use strict'

const dealModel = require('../../../../models//v2/deal')


module.exports.findOneById = async (deal_id) => {
  try {
    return await dealModel.findOneById(deal_id)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await dealModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await dealModel.update(options, connection)
  }
  catch (e) {
    throw new Error(e)
    // console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await dealModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await dealModel.getList(options)
    return results.map(result => {
      delete result.password
      return result
    })
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    const results = await dealModel.getListTotal(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}