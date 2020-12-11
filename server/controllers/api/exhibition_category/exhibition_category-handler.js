'use strict'

const mainExhibitionModel = require('../../../models/exhibition-category')


module.exports.findOneById = async (id) => {
  try{
    return await mainExhibitionModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}


module.exports.insert = async (options, connection) => {
  try {
    return await mainExhibitionModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await mainExhibitionModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await mainExhibitionModel.delete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    const results = await mainExhibitionModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    const results = await mainExhibitionModel.getListTotal(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multiInsert = async (options, connection) => {
  try {
    return await mainExhibitionModel.multiInsert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGet = async (options) => {
  try{
    return await mainExhibitionModel.multipleGet(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetTotal = async (options) => {
  try{
    const result =  await mainExhibitionModel.multipleGetTotal(options);
    return result.length
  }catch(e){
    throw new Error(e);
  }
}