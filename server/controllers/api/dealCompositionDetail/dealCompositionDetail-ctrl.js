'use strict'

const handler = require('./dealCompositionDetail-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newDealComp = req.options;
    console.log('newDealComp: ', newDealComp);
    
    newDealComp.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newDealComp, connection);
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
    let newDealComp = req.options
    console.log('newDealComp.deal_detail_idx:', newDealComp.deal_detail_idx);
    const dealComp = await handler.findOneByIdx(newDealComp.deal_detail_idx);
    console.log('dealComp:', dealComp);
    if(dealComp.length === 0){
      throw{ status: 404, errorMessage: 'DealCompositionDetail not found'};
    }
    newDealComp.last_mod_dt_time = util.getCurrentTime();
    newDealComp.deal_id = dealComp[0].deal_id;
    delete newDealComp.deal_detail_idx
    
    const result = await handler.update(newDealComp, connection);
    console.log('ctrlResult: ', result.affectedRows);
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
    const result = await handler.delete({ idx: req.options.deal_detail_idx }, connection);
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
    console.log('list.id:', list.deal_detail_idx)
    console.log('typeof:' , typeof(list.deal_detail_idx))
    if(typeof(list.deal_detail_idx) === undefined){
      console.log("list.id")
      result = await handler.getList();
    }else{
      console.log("list.deal_idx:", list.deal_detail_idx)
      result = await handler.getList(list.deal_detail_idx);
    }

    return res.status(200).json({lists: result});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}