'use strict'

const mfrModel = require('../../../models/manufacturer')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await mfrModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.findOneById = async (id) => {
  try{
    return await mfrModel.findOneById(id)
  }catch(e){
    throw new Error(e)
  }
}

module.exports.findOneByName = async (name) => {
  try{
    return await mfrModel.findOneByName(name);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await mfrModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await mfrModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await mfrModel.delete(options.idx, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await mfrModel.getList(options)
      return results
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }