'use strict'

const coalitionModel = require('../../../models/coalition')


module.exports.findOneByName = async (name) => {
  try {
    return await coalitionModel.findOneByName(name)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.findOneByIdx = async (options) => {
  try{
    return await coalitionModel.findOneByIdx(options.idx)
  }catch(e){
    throw new Error(e)
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await coalitionModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await coalitionModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.getList = async (options) => {
  try {
    const results = await coalitionModel.getList(options)
  
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    const results = await coalitionModel.getListTotal(options)
  
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await coalitionModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}