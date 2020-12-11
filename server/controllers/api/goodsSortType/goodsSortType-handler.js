'use strict'

const goodsSortTypeModel = require('../../../models/goodsSortType')


module.exports.findOneByEmail = async (email) => {
  try {
    return await goodsSortTypeModel.findOneByEmail(email)
  }
  catch (e) {
    throw new Error(e)
  }
}




module.exports.insert = async (options, connection) => {
  try {
    return await goodsSortTypeModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await goodsSortTypeModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await goodsSortTypeModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await goodsSortTypeModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}