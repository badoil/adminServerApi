'use strict'

const paymentModel = require('../../../models/payment')


module.exports.insert = async (options, connection) => {
  try{
    return await paymentModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}


module.exports.getList = async (options) => {
    try{
      console.log("getList")
      const results =  await paymentModel.getList(options)
      return results.map(result => {
        delete result.password
        return result
      })      
    }
    catch (e) {
      throw new Error(e)
    }
  }
  