'use strict'

const handler = require('./manufacturer-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newMfr = req.options;
    const mfr = await handler.findOneByName(newMfr.mfr_name);
    if(mfr.length !== 0){
      throw { status: 409, errorMessage: "Duplicate Manufacturer"};
    }
    console.log('newMfr: ', newMfr);

    newMfr.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newMfr, connection);
    await db.commit(connection);
    res.status(200).json(result);

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}


module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    let newMfr = req.options
    const mfr = await handler.findOneByIdx(newMfr.mfr_idx);
    console.log('mfr:', mfr);
    if(mfr.length === 0){
      throw{ status: 404, errorMessage: 'Manufacturer not found'};
    }
    newMfr.last_mod_dt_time = util.getCurrentTime();
    
    const result = await handler.update(newMfr, connection);
    console.log('updateResult: ', result.affectedRows);
    if(result.affectedRows === 0){
      throw{ status: 404, errorMessage: "updating failed"};
    }
    await db.commit(connection);
    res.status(200).json({ result: true });

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    console.log('deleteId:', req.options)
    const result = await handler.delete({ idx: req.options.mfr_idx }, connection);
    console.log('deleteResult:', result);
    let returnValue = false;
    if(result.affectedRows === 1){
      returnValue = true
    }
    await db.commit(connection);
    res.status(200).json({ result: returnValue });
  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.getList = async(req, res, next) => {
  try{
    const list = req.options
    let result;
    console.log('list.id:', list.mfr_idx)
    console.log('typeof:' , typeof(list.mfr_idx))
    if(typeof(list.mfr_idx) === undefined){
      console.log("list.id")
      result = await handler.getList();
    }else{
      console.log(2)
      result = await handler.getList(list.mfr_idx);
    }

    return res.status(200).json({lists: result});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}