'use strict'

const handler = require('./point-handler')
const customerHandler = require('../customer/customer-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newPoint = req.options
    const user = await customerHandler.findOneByIdx(newPoint.cust_idx)
    if (!user) {
      throw { status: 404, errorMessage: 'User not found' }
    }

    newPoint.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newPoint, connection)
  
    await db.commit(connection)
    res.status(200).json({ result:result })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.update = async (req, res, next) => {
const connection = await db.beginTransaction();
try{
  let newPoint = req.options
  console.log('newPoint:', newPoint.point_idx);
  const point = await handler.findOneByIdx(newPoint.point_idx);
  console.log('point:', point);
  if(!point){
    throw{ status: 404, errorMessage: 'Point not found'};
  }
  newPoint.last_mod_dt_time = util.getCurrentTime();
  
  const result = await handler.update(newPoint, connection);
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

    console.log('resultlengt',total)
    
    res.status(200).json({result, pagenation, query})
  } catch (err) {
    next(err)
  }
}