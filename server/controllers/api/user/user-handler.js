'use strict'

const userModel = require('../../../models/user')


module.exports.findOneByEmail = async (email) => {
  try {
    return await userModel.findOneByEmail(email)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await userModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await userModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await userModel.getList(options)
    return results.map(result => {
      delete result.password
      delete result.salt
      return result
    })
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    const results = await userModel.getListTotal(options)
    return results[0].total
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await userModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}