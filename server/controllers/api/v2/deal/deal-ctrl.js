'use strict'

const handler = require('./deal-handler')
const goodsSortTypeHandler = require('../../goodsSortType/goodsSortType-handler')
const db = require('../../../../components/db')
const crypto = require('../../../../components/crypto')
const util = require('../../../../components/util')


module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const newDeal = req.options
        const deal = await handler.findOneById(newDeal.deal_id)
        if (deal) {
            throw { status: 409, errorMessage: 'Duplicate id' }
        }
  
        newDeal.first_create_dt_time = util.getCurrentTime();
        const result = await handler.insert(newDeal, connection)
      
        await db.commit(connection)
        res.status(200).json({ result:result })
    } catch (err) {
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

    console.log('totalLength',total)
    
    res.status(200).json({result, pagenation, query})
  }
  catch (err) {
    next(err)
  }
}
  