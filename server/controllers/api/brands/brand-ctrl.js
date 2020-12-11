'use strict'

const handler = require('./brand-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newBrand = req.options;
    const brand = await handler.findOneByName(newBrand.brand_name);
    if(brand.length !== 0){
      throw { status: 409, errorMessage: "Duplicate Brand"};
    }
    console.log('newBrand: ', newBrand);

    newBrand.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newBrand, connection);
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
    let newBrand = req.options
    const brand = await handler.findOneByIdx(newBrand.brand_idx);
    console.log('brand:', brand);
    if(brand.length === 0){
      throw{ status: 404, errorMessage: 'Brand not found'};
    }
    newBrand.last_mod_dt_time = util.getCurrentTime();
    newBrand.brand_id = brand[0].brand_id;
    delete newBrand.brand_idx;

    const result = await handler.update(newBrand, connection);
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
    const result = await handler.delete({ idx: req.options.brand_idx }, connection);
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
    const total = await handler.getListTotal(list)
    const pagenation = util.makePageData(total, list.page, list.srch_cnt)

    return res.status(200).json({result, pagenation, query});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}
