'use strict'

const mbrRankModel = require('../../../models/mbr-rank')


module.exports.findOneByName = async (name) => {
    try {
        return await mbrRankModel.findOneByName(name)
    } catch (e) {
        throw new Error(e)
    }
}


module.exports.insert = async (options, connection) => {
  try {
      return await mbrRankModel.insert(options, connection)
  } catch (e) {
      throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
      return await mbrRankModel.update(options, connection)
  } catch (e) {
      throw new Error(e)
    
  }
}

module.exports.multipleUpdate = async (options, connection) => {
    try {
        return await mbrRankModel.multipleUpdate(options, connection)
    } catch (e) {
        throw new Error(e)
      
    }
  }
  

module.exports.getList = async (options) => {
  try {
      return await mbrRankModel.getList(options)    
  } catch (e) {
      throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
    try{
        const results = await mbrRankModel.getListTotal(options);
        console.log('handlerResults:', results.length)
        return results.length;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (options, connection) => {
  try { 
      return await mbrRankModel.delete(options.idx, connection)
  } catch (e) {
      throw new Error(e)
  }
}