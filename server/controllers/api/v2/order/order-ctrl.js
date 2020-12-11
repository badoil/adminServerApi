'use strict'

const handler = require('./order-handler')
const orderDetsHandler = require('../../orderDetails/orderDetails-handler')
const dealModel = require('../../../../models/v2/deal');
const db = require('../../../../components/db')
const crypto = require('../../../../components/crypto')
const util = require('../../../../components/util')
//const fake = require('../../../models/fake')



module.exports.getList = async(req, res, next) => {
    try{
      console.log('crtl getList ')
      const list = req.options
      const query = req.query
      const result = await handler.getList(list)
      console.log('result:', result)
      const total = await handler.getListTotal(list)
      const pagenation = util.makePageData(total, list.page, list.srch_cnt)

      for(let i=0; i<result.length; i++){
        let dealResult = await dealModel.getList({ deal_id: result[i].deal_id })
        result[i].deal = dealResult
      }
  
      return res.status(200).json({result, pagenation, query});
      
    }catch(e){
      console.error(e)
      next(e);
    }
  }