'use strict'

const orderModel = require('../../../../models/v2/order')


module.exports.getList = async (options) => {
    try {
      console.log("handler getList")
      const results = await orderModel.getList(options)
      return results
    }
    catch (e) {
      throw new Error(e)
    }
  }


module.exports.getListTotal = async (options) => {
    try{
        const results = await orderModel.getListTotal(options);
        console.log('handlerResults:', results.length)
        return results.length;
    }catch(e){
        throw new Error(e);
    }
}