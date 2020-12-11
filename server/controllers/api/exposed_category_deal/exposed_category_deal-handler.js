'use strict'

const model = require('../../../models/exposed-category-deal')


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
