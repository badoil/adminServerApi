'use strict'

const pointModel = require('../../../models/point')


module.exports.findOneByIdx = async (options, connection) => {
  try{
    return await pointModel.findOneByIdx(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.insert = async (options, connection) => {
  try{
    return await pointModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e);
  };
};

module.exports.update = async (options, connection) => {
  try {
    return await pointModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
};

module.exports.multipleDelete = async (options, connection) => {
  try {
    return await pointModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
};

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await pointModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
};

module.exports.getListTotal = async (options) => {
  try{
    const results = await pointModel.getListTotal(options);
    return results.length
  }catch(e){
    throw new Error(e);
  }
}