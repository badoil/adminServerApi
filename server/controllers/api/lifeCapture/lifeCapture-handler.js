'use strict'

const lifeCaptureModel = require('../../../models/lifeCapture')


module.exports.findOneByEmail = async (email) => {
  try {
    return await lifeCaptureModel.findOneByEmail(email)
  }
  catch (e) {
    throw new Error(e)
  }
}




module.exports.insert = async (options, connection) => {
  try {
    return await lifeCaptureModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await lifeCaptureModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await lifeCaptureModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await lifeCaptureModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}