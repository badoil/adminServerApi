'use strict'

const bannerModel = require('../../../models/banners')


module.exports.findOneByEmail = async (email) => {
  try {
    return await bannerModel.findOneByEmail(email)
  }
  catch (e) {
    throw new Error(e)
  }
}




module.exports.insert = async (options, connection) => {
  try {
    return await bannerModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await bannerModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("banner handler getList")
    const results = await bannerModel.getList(options)
    return results.map(result => {
      delete result.password
      return result
    })
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await bannerModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}