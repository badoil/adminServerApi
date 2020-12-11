'use strict'

const handler = require('./coalition_standing_point_inquiry-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newCoal = req.options
    const coal = await handler.findOneByName(newCoal.name)
    if(coal.length !== 0){
      throw { status: 401, errorMessage: 'Duplicate name'}
    }

    newCoal.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newCoal, connection)

    await db.commit(connection)
    res.status(200).json({ result: result })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    let newCoal = req.options
    const coal = await handler.findOneByIdx({idx: newCoal.idx})
    console.log("coal : ", coal)
    if (!coal) {
      throw { status: 404, errorMessage: 'Coalition not found' }
    }

    newCoal.last_mod_dt_time = util.getCurrentTime();
    newCoal.coal_standing_point_inq_idx = coal[0].coal_standing_point_inq_idx;
    delete newCoal.idx
    console.log("newCoal : ", newCoal)

    const result = await handler.update(newCoal, connection)
    if (result === 0) throw { status: 404, errorMessage: 'Not found Coalition' }

    await db.commit(connection)
    res.status(200).json({ result: true })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const result = await handler.delete({ idx: req.options.idx }, connection)
    await db.commit(connection)
    let returnValue = false;
    if (result.affectedRows === 1) {
      returnValue = true
    }
    res.status(200).json({ result: returnValue })
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
    const resultTotal = await handler.getListTotal(params)
    const pagenation = util.makePageData(resultTotal, params.page, params.srch_cnt)

    // const result = await fake.getBanner()
    res.status(200).json({result, pagenation, query})
  }
  catch (err) {
    next(err)
  }
}