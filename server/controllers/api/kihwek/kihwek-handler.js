'use strict'

const kiwhekModel = require('../../../models/kihwek')


module.exports.findOneByEmail = async (email) => {
  try {
    return await kiwhekModel.findOneByEmail(email)
  }
  catch (e) {
    throw new Error(e)
  }
}




module.exports.insert = async (options, connection) => {
  try {
    return await kiwhekModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await kiwhekModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await kiwhekModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await kiwhekModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}