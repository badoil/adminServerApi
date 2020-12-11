'use strict'

const handler = require('./productReview-handler')
const customerhandler = require('../customer/customer-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')
const { round } = require('lodash')



module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newProductReview = req.options;
    // const goods = await handler.findOneById(newProductReview.goods_id);
    // if(goods.length !== 0){
    //   throw { status: 409, errorMessage: "Duplicate goods"};
    // }
    console.log('newProductReview: ', newProductReview);

    const customerResult = await customerhandler.findOneByIdx(newProductReview.cust_idx)
    console.log('customerResult:', customerResult)
    if(!customerResult){
      throw { status: 409, errorMessage: "Not found customer"};
    }
    newProductReview.cust_idx = customerResult.cust_idx
    newProductReview.first_create_user = customerResult.cust_idx
    newProductReview.first_create_dt_time = util.getCurrentTime();
    delete newProductReview.cust_id

    const result = await handler.insert(newProductReview, connection);
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
    let newProductReview = req.options
    const productReview = await handler.findOneById(newProductReview.goods_review_id);
    console.log('productReview:', productReview);
    if(productReview.length === 0){
      throw{ status: 404, errorMessage: 'ProductReview not found'};
    }

    const customerResult = await customerhandler.findOneByIdx(newProductReview.cust_idx)
    if(customerResult.length === 0){
      throw { status: 409, errorMessage: "Not found customer"};
    }

    newProductReview.first_create_user = productReview[0].first_create_user
    newProductReview.last_mod_user = customerResult.cust_idx
    newProductReview.last_mod_dt_time = util.getCurrentTime();
    delete newProductReview.cust_id
    //newProductReview.goods_review_id = productReview[0].goods_review_id;
    //delete newBrand.brand_idx;

    const result = await handler.update(newProductReview, connection);
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
    const result = await handler.delete({ id: params.goods_review_id }, connection);
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
    console.log("list:", list)
    const result = await handler.getList(list)
    const totalResult = await handler.getListTotal(list)
    console.log('totalResult : ',totalResult)
    console.log('list.page : ',list.page)
    console.log('list.srch_cnt : ',list.srch_cnt)
    const pagenation = util.makePageData(totalResult, list.page, list.srch_cnt)
    

    const reviewTotal = await handler.getList({page:null})
    console.log('reviewTotal : ',reviewTotal.length)
    let count = reviewTotal.length;
    let ratingTotal = 0;
    let images = []
    let best;
    let worst;
    reviewTotal.map(res => {
      ratingTotal+= res.rating
      if(res.best_review_or_not == 'Y'){
        best = res;
      }
      if(res.worst_review_or_not == 'Y'){
        worst = res;
      }

      if(res.add_timg_1){
        images.push({
          id:11,
          url:res.add_timg_1
        })
      }
      if(res.add_timg_2){
        images.push({
          id:11,
          url:res.add_timg_2
        })
      }
      if(res.add_timg_3){
        images.push({
          id:11,
          url:res.add_timg_3
        })
      }
      if(res.add_timg_4){
        images.push({
          id:11,
          url:res.add_timg_4
        })
      }
      
    })
    let rating = (ratingTotal/count)*10
    rating = round(rating) / 10
    const reviewSummary = {
      count : count,
      rating : rating,
      images : images,
      best : best,
      worst:worst
    }
    // console.log('reviewSummary : ',reviewSummary)
    return res.status(200).json({reviewSummary, result, pagenation, query});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}
