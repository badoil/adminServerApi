'use strict'

const adminModel = require('../../../models/admin')


module.exports.getUserById = async (id) => {
  try {
    return await adminModel.findOneById(id)
  }
  catch (e) {
    throw new Error(e)
  }
}


module.exports.insert = async (options, connection) => {
  try {
    return await adminModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await adminModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.getList = async (options) => {
  try {
    console.log("getList")
    const results = await adminModel.getList(options)
    return results.map(result => {
      delete result.password
      return result
    })
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListByIdx = async(idx) => {
  try{
    const results = await adminModel.getListByIdx(idx)
    const result = results.map(data=>{
      delete data.비밀번호
      delete data.SALT
      return data
    })
    console.log('result',result)
    return result[0]
  }
  catch(err){
    throw new Error(err)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await userModel.adminModel(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}