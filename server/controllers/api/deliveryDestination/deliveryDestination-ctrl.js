'use strict'

const handler = require('./deliveryDestination-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newDeliveryDestination = req.options;
    // const deliveryDestination = await handler.findOneByIdx(newDeliveryDestination.deliv_dest_idx);
    // if(deliveryDestination.length !== 0){
    //   throw { status: 409, errorMessage: "Duplicate deliveryDestination"};
    // }
    console.log('newDeliveryDestination: ', newDeliveryDestination);

    newDeliveryDestination.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newDeliveryDestination, connection);
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
    let newDeliveryDestination = req.body
    const params = req.params
    const deliveryDestination = await handler.findOneByIdx(params.deliv_dest_idx);
    console.log('newDeliveryDestination:', newDeliveryDestination)
    console.log('deliveryDestination:', deliveryDestination);
    if(deliveryDestination.length === 0){
      throw{ status: 404, errorMessage: 'deliveryDestination not found'};
    }
    newDeliveryDestination.last_mod_dt_time = util.getCurrentTime();
    //newDeliveryDestination.deliv_dest_idx = deliveryDestination[0].deliv_dest_idx;
    //delete newBrand.brand_idx;

    const result = await handler.update({newDeliveryDestination, deliv_dest_idx: params.deliv_dest_idx}, connection);
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
    const result = await handler.delete({ id: params.deliv_dest_idx }, connection);
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
    const result = await handler.getList(list)

    return res.status(200).json({result: result});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}
