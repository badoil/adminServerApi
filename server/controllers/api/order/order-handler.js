'use strict'

const orderModel = require('../../../models/order')


module.exports.findOneById = async (id) => {
  try{
    return await orderModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await orderModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options, connection) => {
    try {
      return await orderModel.multipleInsert(options, connection)
    }
    catch (e) {
        console.error(e);
      throw new Error(e)
    }
  }

module.exports.update = async (options, connection) => {
    try {
      return await orderModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }

module.exports.multipleUpdate = async (options, connection) => {
  try {
    return await orderModel.multipleUpdate(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}
    
module.exports.delete = async (options, connection) => {
  try {
    return await orderModel.delete(options.id, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleDelete = async (options, connection) => {
  try {
    return await orderModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("handler getList")
    const results = await orderModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try{
    const results = await orderModel.getListTotal(options);
    console.log('handlerResults:', results.length)
    return results.length;
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetSabangList = async (options) => {
  try{
      const results = await orderModel.multipleGetSabangList(options)
      return results
  }catch(e){
      throw new Error(e)
  }
}



module.exports.deleteAll = async (options) => {
  try{
      const results = await orderModel.deleteAll(options)
      return results
  }catch(e){
      throw new Error(e)
  }
}