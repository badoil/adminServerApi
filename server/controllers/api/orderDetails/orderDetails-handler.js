const orderDetsModels = require('../../../models/orderDetails')

module.exports.insert = async (options, connection) => {
    try{
        return await orderDetsModels.insert(options, connection)
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        return await orderDetsModels.multipleInsert(options, connection)
    }catch(e){
        throw new Error(e)
    }
}

module.exports.update = async (options, connection) => {
    try{
        return await orderDetsModels.update(options, connection)
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try{
        return await orderDetsModels.multipleUpdate(options, connection)
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleGet = async (options) => {
    try{
      return await orderDetsModels.multipleGet(options);
    }catch(e){
      throw new Error(e);
    }
  }

module.exports.multipleDelete = async (options, connection) => {
    try {
        return await orderDetsModels.multipleDelete(options, connection)
    }
    catch (e) {
        throw new Error(e)
}
}


module.exports.deleteAll = async (options, connection) => {
    try {
        return await orderDetsModels.deleteAll(options, connection)
    }
    catch (e) {
        throw new Error(e)
}
}