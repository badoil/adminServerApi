'use strict'

const pushModel = require('../../../models/push')


module.exports.insert = async (options, connection) => {
  try{
    return await pushModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}


module.exports.getList = async (options) => {
    try{
      console.log("getList")
      const results =  await pushModel.getList(options)
      return results.map(result => {
        delete result.password
        return result
      })      
    }
    catch (e) {
      throw new Error(e)
    }
  }
  