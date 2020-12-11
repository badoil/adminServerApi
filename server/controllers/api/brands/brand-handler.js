'use strict'

const brandsModel = require('../../../models/brands')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await brandsModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.findOneById = async (id) => {
  try{
    return await brandsModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.findOneByName = async (name) => {
  try{
    return await brandsModel.findOneByName(name);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await brandsModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await brandsModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await brandsModel.delete(options.idx, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await brandsModel.getList(options)
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
      const results = await brandsModel.getList(options)
      return results.length
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }