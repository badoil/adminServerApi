'use strict'

const handler = require('./chargedSV-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newChargedSV = req.options
    const resultName = await handler.findOneByName(newChargedSV.name)
    if(resultName){
      throw { status: 401, errorMessage: "Duplicate name"}
    }
    const resultSV_code = await handler.findOneBySV_code(newChargedSV.sv_code)
    if(resultSV_code){
      throw { status: 401, errorMessage: "Duplicate sv_code"}
    }

    const resultView_seq = await handler.findOneByView_seq(newChargedSV.view_seq)
    if(resultView_seq){
      throw { status: 401, errorMessage: "Duplicate view_seq"}
    }

    const result = await handler.insert(newChargedSV, connection)
  
    await db.commit(connection)
    res.status(200).json({ result:result })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
      let newForm = req.options
      console.log('newForm : ',newForm)
      
      await handler.multipleUpdate(newForm, connection)        
      await db.commit(connection)
      res.status(200).json({ result: true })
  } catch (err) {
      await db.rollback(connection)
      next(err)
  }
}

module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const result = await handler.multipleDelete(req.options, connection)
    await db.commit(connection)
    res.status(200).json({ result: result })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.getList = async (req, res, next) => {
try {
  const params = req.options
  const query = req.query
  const result = await handler.getList(params)
  const total = await handler.getListTotal(params)
  const pagenation = util.makePageData(total, params.page, params.srch_cnt)

  console.log('resultlengt',result)
  
  res.status(200).json({result, pagenation, query})
}
catch (err) {
  next(err)
}
}

module.exports.getListByIdx = async(req,res,next) => {
  try{
    const idx = req.options.IDX
    const result = await handler.getListByIdx(idx)
    if(!result)
      throw{status:400,errorMessage:'User not found'}
    res.status(200).json({result})
  }
  catch(err){
    next(err)
  }
}