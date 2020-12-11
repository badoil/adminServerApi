'use strict'

const handler = require('./popup-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newPopup = req.options;
    const popup = await handler.findOneById(newPopup.popup_id);
    if(popup.length !== 0){
      throw { status: 409, errorMessage: "Duplicate popup"};
    }
    console.log('newPopup: ', newPopup);

    newPopup.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newPopup, connection);
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
    const newPopup = req.body
    // const options = req.options
    // const popup_id = options.popup_id
    const params = req.params
    console.log('popup_id:', params)
    const popup = await handler.findOneById(params.popup_id);
    console.log('newPopup:', newPopup)
    console.log('popup:', popup);
    if(popup.length === 0){
      throw{ status: 404, errorMessage: 'Popup not found'};
    }
    newPopup.last_mod_dt_time = util.getCurrentTime();
    //newPopup.popup_id = popup[0].popup_id;
    //delete newBrand.brand_idx;

    const result = await handler.update({newPopup, popup_id: params.popup_id}, connection);
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
    const params = req.options
    const result = await handler.delete({ id: params.popup_id }, connection);
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
    const query = req.query

    const result = await handler.getList(list)
    const totalResult = await handler.getListTotal(list)
    const pagenation = util.makePageData(totalResult, list.page, list.srch_cnt)

    return res.status(200).json({result, pagenation, query})
    
  }catch(e){
    console.error(e)
    next(e);
  }
}