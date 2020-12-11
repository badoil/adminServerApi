'use strict'

const suppplierModel = require('../../../../models//v2/supplier')


module.exports.findOneById = async (suppl_id) => {
  try {
    return await suppplierModel.findOneById(suppl_id)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await suppplierModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options, connection) => {
  try{
    return await suppplierModel.multipleInsert(options, connection);
  }catch(e){
    throw new Error(e);
  }
}


module.exports.update = async (options, connection) => {
  try {
    return await suppplierModel.update(options, connection)
  }
  catch (e) {
    throw new Error(e)
    // console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await suppplierModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await suppplierModel.getList(options)
    return results.map(result => {
      delete result.password
      return result
    })
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    const results = await suppplierModel.getListTotal(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGet = async (options) => {
  try{
    return await suppplierModel.multipleGet(options)
  }catch(e){
    throw new Error(e)
  }
}