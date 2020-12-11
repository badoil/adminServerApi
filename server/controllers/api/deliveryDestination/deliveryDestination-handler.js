'use strict'

const deliveryDestinationModel = require('../../../models/deliveryDestination')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await deliveryDestinationModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.findOneById = async (id) => {
  try{
    return await deliveryDestinationModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await deliveryDestinationModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await deliveryDestinationModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await deliveryDestinationModel.delete(options.id, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await deliveryDestinationModel.getList(options)
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
      const results = await deliveryDestinationModel.getList(options)
      return results.length
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }