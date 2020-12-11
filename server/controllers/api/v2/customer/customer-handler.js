'use strict'

const userModel = require('../../../../models/v2/customer')


module.exports.findOneByIdx = async (cust_idx) => {
    try {
        return await userModel.findOneByIdx(cust_idx)
    } catch (e) {
        throw new Error(e)
    }
}

module.exports.findOneById = async (cust_id) => {
    try {
        return await userModel.findOneById(cust_id)
    } catch (e) {
        throw new Error(e)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        return await userModel.insert(options, connection)
    } catch (e) {
        throw new Error(e)
    }
}

module.exports.update = async (options, connection) => {
    try {
        return await userModel.update(options, connection)
    } catch (e) {
        throw new Error(e)
      // console.log(e)
    }
}

module.exports.delete = async (options, connection) => {
    try {
        return await userModel.delete(options.idx, connection)
    } catch (e) {
        throw new Error(e)
    }
}

module.exports.getList = async (options) => {
    try {
      // console.log("getList")
        const results = await userModel.getList(options)
        return results.map(result => {
          delete result.password
          delete result.salt
          delete result.token
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
      return results.length
    }
    catch (e) {
      throw new Error(e)
    }
}