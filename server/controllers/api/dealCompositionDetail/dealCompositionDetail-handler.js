'use strict'

const dealComModel = require('../../../models/dealCompositionDetail')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await dealComModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await dealComModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options, connection) => {
  try{
    return await dealComModel.multipleInsert(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleInsertTest = async (options, connection) => {
  try{
    return await dealComModel.multipleInsertTest(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await dealComModel.update(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.multipleUpdate = async (options, connection) => {
  try {
    return await dealComModel.multipleUpdate(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await dealComModel.multipleDelete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleDelete = async (options, connection) => {
  try {
    return await dealComModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await dealComModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGet = async (options) => {
  try{
    return await dealComModel.multipleGet(options);
  }catch(e){
    throw new Error(e);
  }
}