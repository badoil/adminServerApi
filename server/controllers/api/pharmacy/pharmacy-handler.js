'use strict'

const pharModel = require('../../../models/pharmacy')


module.exports.findOneByIdx = async (phar_idx) => {
  try {
    return await pharModel.findOneByIdx(phar_idx)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.findOneById = async (phar_id) => {
  try {
    return await pharModel.findOneById(phar_id)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await pharModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await pharModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await pharModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await pharModel.getList(options)
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
    const results = await pharModel.getListTotal(options)
    return results[0].total
  }
  catch (e) {
    throw new Error(e)
  }
}