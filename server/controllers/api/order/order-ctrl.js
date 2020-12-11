'use strict'

const handler = require('./order-handler')
const orderDetsHandler = require('../orderDetails/orderDetails-handler')
const dealHandler = require('../deal/deal-handler');
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')

//const sabangnet = require('./sabangnet');

let sabangnets = require('./sabangnet2');


module.exports.multipleInsertTest = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    //console.log('sabangnet:', sabangnet)
    let ordersArray = []
    let orderDetailsArray = []
    let sabangnet = sabangnets.slice()
    console.log('sabangnet:', sabangnet)

    let sabangEcommOrderId = sabangnet.map(a => a.order_id)
    const sabangResults = await handler.multipleGetSabangList(sabangEcommOrderId)
    console.log('sabangResults:', sabangResults)
    if(sabangResults.length !== 0){
      for(let k=0; k<sabangResults.length; k++){
        sabangnet = sabangnet.filter(sabang => sabang.order_id[0] !== sabangResults[k].sabang_cxn_ecomm_order_id )
      }
    }
    console.log('sabangnet:', sabangnet)
    if(sabangnet.length === 0){
      return res.status(404).json({message: "Duplicate sabang_cxn_ecomm_order_id"})
    }

    for(let i=0; i<sabangnet.length; i++){
      let order = {}
      let orderDetail = {}

      order.order_state_code = sabangnet[i].order_status
      order.order_classif_code = sabangnet[i].order_gubun
      // order.cust_idx = sabangnet[i].user_id
      order.order_dt = sabangnet[i].order_date
      order.order_amt = sabangnet[i].total_cost
      order.deliv_amt = sabangnet[i].delv_cost
      order.pymt_amt = sabangnet[i].pay_cost
      order.sabang_order_id = sabangnet[i].idx
      order.sabang_cxn_ecomm_order_id = sabangnet[i].order_id
      order.sabang_cxn_ecomm_user_id = sabangnet[i].user_id
      order.sabang_cxn_ecomm_name = sabangnet[i].mall_id
      order.sabang_order_coll_ts = sabangnet[i].reg_date
      order.sabang_order_conf_ts = sabangnet[i].ord_confirm_date
      order.orderer_name = sabangnet[i].user_name
      order.orderer_mobi = sabangnet[i].user_tel
      order.orderer_email = sabangnet[i].user_email
      order.rcpt_name = sabangnet[i].receive_name
      order.rcpt_mobi = sabangnet[i].receive_tel
      order.rcpt_phone = sabangnet[i].receive_cel
      order.rcpt_email = sabangnet[i].receive_email
      order.rcpt_zip_code = sabangnet[i].receive_zipcode
      order.rcpt_base_addr = sabangnet[i].receive_addr
      order.rcpt_dets_addr = sabangnet[i].receive_addr
      order.deliv_rqmt_drt_msg = sabangnet[i].delv_msg_1
      order.first_create_dt_time = util.getCurrentTime()

      orderDetail.deal_id = sabangnet[i].company_goods_cd
      orderDetail.pur_cnt = sabangnet[i].sale_cnt
      orderDetail.pur_amt = sabangnet[i].pay_cost
      orderDetail.deliv_amt = sabangnet[i].delv_cost
      orderDetail.deliv_company_code = sabangnet[i].delivery_id
      orderDetail.inv_num = sabangnet[i].invoice_no
      orderDetail.first_create_dt_time = util.getCurrentTime()

      ordersArray.push(order)
      orderDetailsArray.push(orderDetail)
      
    }
    console.log('ordersArray:', ordersArray)
    console.log('orderDetailsArray:', orderDetailsArray)

    const result = await handler.multipleInsert(ordersArray, connection);
    const orderDetsResult = await orderDetsHandler.multipleInsert({orderDetails: orderDetailsArray}, connection);

    await db.commit(connection);
    res.status(200).json({result: true})


  }catch(err){
    await db.rollback(connection);
    next(err);
  }
}


module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      const newOrder = req.options;
      console.log('newOrder: ', newOrder)
      let newOrderDetail = {}

      newOrderDetail.order_dets_id = newOrder.order_dets_id
      newOrderDetail.deal_id = newOrder.deal_id
      newOrderDetail.deal_opt_id = newOrder.deal_opt_id
      newOrderDetail.pur_cnt = newOrder.pur_cnt
      newOrderDetail.pur_amt = newOrder.pur_amt
      newOrderDetail.disc_amt = newOrder.disc_amt
      newOrderDetail.deliv_amt = newOrder.deliv_amt
      newOrderDetail.deliv_company_code = newOrder.deliv_company_code
      newOrderDetail.inv_num = newOrder.inv_num
      newOrderDetail.first_create_dt_time = util.getCurrentTime();

      newOrder.first_create_dt_time = util.getCurrentTime();
      //newOrder.order_dt = util.getCurrentTime();
      delete newOrder.order_dets_id
      delete newOrder.deal_id
      delete newOrder.deal_opt_id
      delete newOrder.pur_cnt
      delete newOrder.pur_amt
      delete newOrder.disc_amt
      delete newOrder.deliv_company_code
      delete newOrder.inv_num
      const result = await handler.insert(newOrder, connection);
      newOrderDetail.order_id = result.insertId

      console.log('newOrderDetail:', newOrderDetail)

      const newOrderDetResult = await orderDetsHandler.insert(newOrderDetail, connection)

      await db.commit(connection);
      return res.status(200).json({result: true});
  
    }catch(e){
      await db.rollback(connection);
      next(e);
    }
  }

module.exports.multipleInsert = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
        const newOrder = req.options
        let orders = newOrder.orders
        let orderDetsArray = []

        let sabangEcommOrderId = orders.map(order => order.sabang_cxn_ecomm_order_id)
        const sabangResults = await handler.multipleGetSabangList(sabangEcommOrderId)
        console.log('sabangResults:', sabangResults)
        if(sabangResults.length !== 0){
          for(let k=0; k<sabangResults.length; k++){
            orders = orders.filter(order => order.sabang_cxn_ecomm_order_id !== sabangResults[k].sabang_cxn_ecomm_order_id )
          }
        }
        console.log('orders:', orders)
        if(orders.length === 0){
          return res.status(404).json({message: "Duplicate sabang_cxn_ecomm_order_id"})
        }

        orders.map(order => order.first_create_dt_time = util.getCurrentTime())
        const newOrderResult = await handler.multipleInsert(orders, connection);
        console.log('newOrderResult:', newOrderResult)
        let newOrders = newOrderResult.returnValue

        for(let i=0; i<orders.length; i++){
            let orderId = newOrders[i].insertId
            let dealId = newOrderResult.dealId[i]
            let dealOptId = newOrderResult.dealOptId[i]
            let purCnt = newOrderResult.purCnt[i]
            let purAmt = newOrderResult.purAmt[i]
            let delivAmt = newOrderResult.delivAmt[i]
            let discAmt = newOrderResult.discAmt[i]
            let delivCompanyCode = newOrderResult.delivCompanyCode[i]
            let invNum = newOrderResult.invNum[i]
            let firstCreateDtTime = util.getCurrentTime();

            let tempOrderDetsArray = []
            tempOrderDetsArray.push(orderId)
            tempOrderDetsArray.push(dealId)
            tempOrderDetsArray.push(dealOptId)
            tempOrderDetsArray.push(purCnt)
            tempOrderDetsArray.push(purAmt)
            tempOrderDetsArray.push(delivAmt)
            tempOrderDetsArray.push(discAmt)
            tempOrderDetsArray.push(delivCompanyCode)
            tempOrderDetsArray.push(invNum)
            tempOrderDetsArray.push(firstCreateDtTime)

            orderDetsArray.push(tempOrderDetsArray)
        }
        const orderDetsResult = await orderDetsHandler.multipleInsert(orderDetsArray, connection);

        await db.commit(connection);
        res.status(200).json({result: true})

    }catch(err){
        await db.rollback(connection);
        next(err);
    }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newOrders = req.options
    const orders = newOrders.orders
    console.log('newOrders:', newOrders)
    console.log('orders:', orders)

    const orderIdList = orders.map(order => order.order_id);
    const getOrderDets = await orderDetsHandler.multipleGet(orderIdList);
    console.log('getOrderDets:', getOrderDets)

    let orderDetsArray = [] 
    for(let i=0; i<orders.length; i++){
      //getOrderDets[i].order_dets_id = orders[i].order_dets_id
      getOrderDets[i].deal_id = orders[i].deal_id
      getOrderDets[i].deal_opt_id = orders[i].deal_opt_id
      getOrderDets[i].pur_cnt = orders[i].pur_cnt
      getOrderDets[i].pur_amt = orders[i].pur_amt
      getOrderDets[i].deliv_amt = orders[i].deliv_amt
      getOrderDets[i].disc_amt = orders[i].disc_amt
      getOrderDets[i].deliv_company_code = orders[i].deliv_company_code
      getOrderDets[i].inv_num = orders[i].inv_num
      getOrderDets[i].last_mod_dt_time = util.getCurrentTime()
    }
    console.log('getOrderDets:', getOrderDets)

    const orderDetsResult = await orderDetsHandler.multipleUpdate(getOrderDets, connection);

    const result = await handler.multipleUpdate(newOrders, connection);
    await db.commit(connection);
    res.status(200).json({result: true})

  }catch(err){
    await db.rollback(connection);
    next(err);
  }
}
  
module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction()
  try {
    const params = req.options
    console.log('params:', params);

    
    const orderDetsResult = await orderDetsHandler.multipleDelete(params, connection);
    const result = await handler.multipleDelete(params, connection);
    let returnValue = false
    if((result.affectedRows !== 0) && (orderDetsResult.affectedRows !== 0)){
      returnValue = true
    }
    await db.commit(connection)
    
    res.status(200).json({ result: returnValue })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.getList = async(req, res, next) => {
  try{
    console.log('crtl getList ')
    const list = req.options
    const query = req.query
    const result = await handler.getList(list)
    const total = await handler.getListTotal(list)
    const pagenation = util.makePageData(total, list.page, list.srch_cnt)

    for(let i=0; i<result.length; i++){
      let dealResult = await dealHandler.getList({ deal_id: result[i].deal_id })
      result[i].deal = dealResult
    }

    return res.status(200).json({result, pagenation, query});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}


  
module.exports.deleteAll = async (req, res, next) => {
  const connection = await db.beginTransaction()
try {
  const params = req.options
  console.log('params:', params);

  
  const orderDetsResult = await orderDetsHandler.deleteAll(params, connection);
  const result = await handler.deleteAll(params, connection);
  let returnValue = false
  if((result.affectedRows !== 0) && (orderDetsResult.affectedRows !== 0)){
    returnValue = true
  }
  await db.commit(connection)
  
  res.status(200).json({ result: returnValue })
}
catch (err) {
  await db.rollback(connection)
  next(err)
}
}

