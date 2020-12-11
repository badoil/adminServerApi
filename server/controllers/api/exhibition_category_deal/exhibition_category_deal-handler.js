'use strict'

const model = require('../../../models/exhibition-category-deal')


module.exports.multipleGet = async (idx) => {
  try{
    return await model.multipleGet(idx);
  }catch(e){
    throw new Error(e);
  }
}


module.exports.getList = async (options) => {
  try {
    const results = await model.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListExpCatIds = async (options) => {
  try {
    const results = await model.getListExpCatIds(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.joinGet = async (options) => {
  try {
    const results = await model.joinGet(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.joinGetGroup = async (options) => {
  try {
    const results = await model.joinGetGroup(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options, connection) => {
  try{
    return await model.multipleInsert(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.update = async (options, connection) => {
  try {
    const results = await model.update(options, connection)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}