'use strict'

const productReviewModel = require('../../../models/productReview')


module.exports.findOneById = async (id) => {
  try{
    return await productReviewModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await productReviewModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await productReviewModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await productReviewModel.delete(options.id, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await productReviewModel.getList(options)
      return results
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }

  module.exports.getListTotal = async (options) => {
    try {
      // console.log("getList")
      const results = await productReviewModel.getListTotal(options)
      return results.length
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }