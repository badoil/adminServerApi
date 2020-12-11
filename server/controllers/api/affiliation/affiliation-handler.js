'use strict'

const affiliationModel = require('../../../models/affiliation')


module.exports.findOneByIdx = async (options, connection) => {
  try{
    return await affiliationModel.findOneByIdx(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.findOneByName = async (options, connection) => {
  try{
    return await affiliationModel.findOneByName(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.findOneByAff_code = async (options, connection) => {
  try{
    return await affiliationModel.findOneByAff_code(options, connection);
  }catch(e){
    throw new Error(e);
  };
};

module.exports.findOneByView_seq = async (options, connection) => {
  try{
    return await affiliationModel.findOneByView_seq(options, connection);
  }catch(e){
    throw new Error(e);
  };
};


module.exports.insert = async (options, connection) => {
  try{
    return await affiliationModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e);
  };
};

// module.exports.update = async (options, connection) => {
//   try {
//     return await affiliationModel.update(options, connection)
//   }
//   catch (e) {
//     // throw new Error(e)
//     console.log(e)
//   }
// };

module.exports.multipleUpdate = async (options, connection) => {
  try {
      return await affiliationModel.multipleUpdate(options, connection)
  } catch (e) {
      throw new Error(e)
    
  }
}

module.exports.multipleDelete = async (options, connection) => {
  try {
    return await affiliationModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
};

// module.exports.delete = async (options, connection) => {
//   try {
//     return await affiliationModel.delete(options.idx, connection)
//   }
//   catch (e) {
//     throw new Error(e)
//   }
// };

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    return await affiliationModel.getList(options)
  }
  catch (e) {
    throw new Error(e)
  }
};

module.exports.getListTotal = async (options) => {
  try{
    const results = await affiliationModel.getListTotal(options)
    return results.length
  }catch(e){
    throw new Error(e);
  }
};

module.exports.getListByIdx = async(idx) => {
  try{
    const results = await affiliationModel.getListByIdx(idx)
    
    console.log('result',results)
    return results
  }
  catch(err){
    throw new Error(err)
  }
}