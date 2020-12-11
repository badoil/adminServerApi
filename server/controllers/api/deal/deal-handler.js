'use strict'

const dealModel = require('../../../models/deal')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await dealModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await dealModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options, connection) => {
  try{
    return await dealModel.multipleInsert(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleInsertTest = async (options, connection) => {
  try{
    return await dealModel.multipleInsertTest(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await dealModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }

module.exports.updateAllColumn = async (options, connection) => {
  try {
    return await dealModel.updateAllColumn(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.updateRandomHotDeal = async (options, connection) => {
  try {
    return await dealModel.updateRandomHotDeal(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.updateRandomAcDeal = async (options, connection) => {
  try {
    return await dealModel.updateRandomAcDeal(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.multipleUpdate = async (options, connection) => {
  try {
    return await dealModel.multipleUpdate(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.multipleInsertUpdate = async (options, connection) => {
  try {
    return await dealModel.multipleInsertUpdate(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await dealModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}
  
module.exports.multipleDelete = async (options, connection) => {
  try {
    return await dealModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await dealModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGet = async (options) => {
  try{
    return await dealModel.multipleGet(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetDeal = async (options) => {
  try{
    return await dealModel.multipleGetDeal(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetAll = async (options) => {
  try{
    return await dealModel.multipleGetAll(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleCategoryUpdate = async (options) => {
  try{
    return await dealModel.multipleCategoryUpdate(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleDiscountUpdate = async (options) => {
  try{
    return await dealModel.multipleDiscountUpdate(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleCountUpdate = async (options) => {
  try{
    return await dealModel.multipleCountUpdate(options);
  }catch(e){
    throw new Error(e);
  }
}
