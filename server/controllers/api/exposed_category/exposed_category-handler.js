'use strict'

const mainExhibitionModel = require('../../../models/exposed-category')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await mainExhibitionModel.findOneByIdx(idx);
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

module.exports.multipleUpdate = async (options, connection) => {
  try {
    return await mainExhibitionModel.multipleUpdate(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await mainExhibitionModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleDelete = async (options, connection) => {
  try {
    return await mainExhibitionModel.multipleDelete(options, connection)
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

module.exports.getMainList = async (options) => {
  try {
    const results = await mainExhibitionModel.getMainList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}



module.exports.getMainList = async (options) => {
  try {
    const results = await mainExhibitionModel.getMainList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options) => {
  try {
    const results = await mainExhibitionModel.multipleInsert(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}