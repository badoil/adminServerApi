'use strict'

const popupModel = require('../../../models/popup')


module.exports.findOneById = async (id) => {
  try{
    return await popupModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await popupModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await popupModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await popupModel.delete(options.id, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await popupModel.getList(options)
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
      const results = await popupModel.getList(options)
      return results.length
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }