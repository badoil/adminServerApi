'use strict'

const goodModel = require('../../../models/goods')
const moment = require('moment')


module.exports.findOneByGoods = async (goodsName) => {
  try {
    console.log('goodsTitle:', goodsName);
    return await goodModel.findOneByGoods(goodsName)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.findOneByIdx = async (idx) => {
  try{
    return await goodModel.findOneByIdx(idx)
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await goodModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options, connection) => {
  try{
    return await goodModel.multipleInsert(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleInsertTest = async (options, connection) => {
  try{
    return await goodModel.multipleInsertTest(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.update = async (options, connection) => {
  try{
    return await goodModel.update(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleUpdate = async (options, connection) => {
  try {
    return await goodModel.multipleUpdate(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.multipleDelete = async (options, connection) => {
  try {
    return await goodModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGet = async (options) => {
  try{
    return await goodModel.multipleGet(options)
  }catch(e){
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try{
    return await goodModel.getList(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.getListTotal = async (options) => {
  try{
    const results = await goodModel.getListTotal(options);
    console.log('handlerResults:', results.length)
    return results.length;
  }catch(e){
    throw new Error(e);
  }
}