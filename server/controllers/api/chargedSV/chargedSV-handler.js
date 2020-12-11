'use strict'

const chargedSVModel = require('../../../models/chargedSV')


module.exports.findOneByIdx = async (options, connection) => {
  try{
    return await chargedSVModel.findOneByIdx(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.findOneByName = async (options, connection) => {
  try{
    return await chargedSVModel.findOneByName(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.findOneBySV_code = async (options, connection) => {
  try{
    return await chargedSVModel.findOneBySV_code(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.findOneByView_seq = async (options, connection) => {
  try{
    return await chargedSVModel.findOneByView_seq(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.insert = async (options, connection) => {
  try{
    return await chargedSVModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e);
  };
};

module.exports.multipleUpdate = async (options, connection) => {
  try {
      return await chargedSVModel.multipleUpdate(options, connection)
  } catch (e) {
      throw new Error(e)
    
  }
}

module.exports.multipleDelete = async (options, connection) => {
  try {
    return await chargedSVModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
};

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    return await chargedSVModel.getList(options)
  }
  catch (e) {
    throw new Error(e)
  }
};

module.exports.getListTotal = async (options) => {
  try{
    const results = await chargedSVModel.getListTotal(options)
    return results.length
  }catch(e){
    throw new Error(e);
  }
}

module.exports.getListByIdx = async(idx) => {
  try{
    const results = await chargedSVModel.getListByIdx(idx)
    
    console.log('result',results)
    return results
  }
  catch(err){
    throw new Error(err)
  }
}