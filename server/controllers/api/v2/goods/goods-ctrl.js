
'use strict'

const handler = require('./goods-handler')
const dealModel = require('../../../../models/v2/deal');
const dealComModel = require('../../../../models/v2/dealCompositionDetail')
const dealHandler = require('../../deal/deal-handler')
const mfrHandler = require('../../manufacturer/manufacturer-handler')
const brandHandler = require('../../brands/brand-handler')
const supplHandler = require('../../supplier/supplier-handler')
const goodsSortTypeHandler = require('../../goodsSortType/goodsSortType-handler')
const representativeCategoryHandler = require('../../representative_category/representative_category-handler')
const db = require('../../../../components/db')
const crypto = require('../../../../components/crypto')
const util = require('../../../../components/util')
const fake = require('../../../../models/fake')

const goodsList = require('./goodsList');
//const onnuri = require('./sheet2.json')
// const onnuri = require('./onnuri.json')
const { Client } = require('@elastic/elasticsearch')
const config = require('../../../../config')
const client = new Client({ node: config.elasticSearch.node 
                           , auth: {
                                username: config.elasticSearch.username,
                                password: config.elasticSearch.password
                            }
})


module.exports.registerTest = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    let dealArray = [];
    let dealCompArray = [];
    let goodsArray = [];

    //console.log('onnuri.json:', onnuri)
    for(let i=0; i<onnuri.length; i++){
      let goodsStateCode = onnuri[i].stock
      let reprTimg = onnuri[i].thumbimg
      let selPrice = onnuri[i].price
      let goodsId = onnuri[i].uid
      let reprCatId = onnuri[i].category
      let erpCode = onnuri[i].erpcode
      let goodsName = onnuri[i].name
      let origPrice = onnuri[i].price2
      let purPrice = onnuri[i].p_price
      let salesUnitPrice = onnuri[i].s_price
      onnuri[i].maker = 0
      let brandId = onnuri[i].maker
      let stockQty = onnuri[i].stock_num
      let supplCode = onnuri[i].vendor
      let goodsOverview = onnuri[i].summary
      let pbClassif = onnuri[i].gubun
      let erpClassif = onnuri[i].erpgubun
      let selPharClassif = onnuri[i].pgubun
      let nsCxnCatId = onnuri[i].naver_category
      let sabangCxnCatId = onnuri[i].sabangSyncCode
      let purCnt = onnuri[i].sell
      let viewCnt = onnuri[i].hit
      let wishCnt = onnuri[i].vote

      let tempDealCompArray = [];
      let tempDealArray = [];
      let tempGoodsArray = [];
        
        
        
        //goods 
        tempGoodsArray.push(goodsId)
        tempGoodsArray.push(reprCatId)
        tempGoodsArray.push(erpCode)
        tempGoodsArray.push(goodsName)
        tempGoodsArray.push(origPrice)
        tempGoodsArray.push(purPrice)
        tempGoodsArray.push(salesUnitPrice)
        tempGoodsArray.push(brandId)
        tempGoodsArray.push(goodsStateCode)
        tempGoodsArray.push(stockQty)
        tempGoodsArray.push(supplCode)
        tempGoodsArray.push(goodsOverview)
        tempGoodsArray.push(pbClassif)
        tempGoodsArray.push(erpClassif)
        tempGoodsArray.push(selPharClassif)
        tempGoodsArray.push(nsCxnCatId)
        tempGoodsArray.push(sabangCxnCatId)
        tempGoodsArray.push(util.getCurrentTime())

        //deal
        tempDealArray.push(goodsId) //dealid
        tempDealArray.push('1') // deal_classif / 기본딜
        tempDealArray.push(1) //deal_opt_id 
        tempDealArray.push('N') // hot_deal_or_not / N
        tempDealArray.push('N') // ac_tgt_goods_or_not / N
        tempDealArray.push(goodsStateCode);
        tempDealArray.push(goodsName)
        tempDealArray.push(goodsOverview)
        tempDealArray.push(reprTimg);
        tempDealArray.push(selPrice);
        tempDealArray.push(util.getCurrentTime())
        tempDealArray.push(purCnt)
        tempDealArray.push(viewCnt)
        tempDealArray.push(wishCnt)

        tempDealCompArray.push(goodsId);//dealid
        tempDealCompArray.push(1) //deal_opt_id 
        tempDealCompArray.push(goodsId) //goods_id
        tempDealCompArray.push(goodsStateCode);
        tempDealCompArray.push(util.getCurrentTime())

        dealCompArray.push(tempDealCompArray);
        dealArray.push(tempDealArray);
        goodsArray.push(tempGoodsArray);
    }

    // console.log('dealCompArray:', dealCompArray)
    // console.log('dealArray:', dealArray)
    // console.log('goodsArray:', goodsArray) 


    const multipleInsertDealCompTest = await dealComHandler.multipleInsertTest(dealCompArray, connection)
    const multipleInsertDealTest = await dealHandler.multipleInsertTest(dealArray, connection)
    const multipleInsertGoodsTest = await handler.multipleInsertTest(goodsArray, connection)

    await db.commit(connection);
    res.status(200).json({result: true});      

  }catch(err){
    await db.rollback(connection);
    next(err);
  }
}

module.exports.multipleDiscountUpdate = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    let dealIdArray = [];
    let origPriceArray = [];
    let disPiceArray = [];

    //console.log('onnuri.json:', onnuri)
    for(let i=0; i<onnuri.length; i++){
      let selPrice = onnuri[i].price
      let origPrice = onnuri[i].price2
      if(origPrice == 0){
        origPrice = selPrice
      }
      let deal_disc_price;
      if(selPrice<origPrice){
        deal_disc_price = origPrice-selPrice
      } else {
        deal_disc_price = 0;
      }

      let goodsId = onnuri[i].uid
      dealIdArray.push(onnuri[i].uid)
      origPriceArray.push(origPrice)
      disPiceArray.push(deal_disc_price)
    }

    const result = await dealHandler.multipleDiscountUpdate({dealIdArray :dealIdArray ,origPriceArray:origPriceArray,disPiceArray:disPiceArray})

    await db.commit(connection);
    res.status(200).json({result: true});      

  }catch(err){
    await db.rollback(connection);
    next(err);
  }
}

module.exports.multipleCountUpdate = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    let dealIdArray = [];
    let purCntArray = [];
    let viewCntArray = [];
    let wishCntArray = [];
    let freeDelivOrNotArray = [];
    let delivAmtArray = [];

    //console.log('onnuri.json:', onnuri)
    for(let i=0; i<onnuri.length; i++){
      let purCnt = onnuri[i].sell ? onnuri[i].sell : 0
      // console.log('onnuri[i].sel : ',onnuri[i].sel)
      // console.log('purCnt : ',purCnt)
      // if(purCnt > 0){
        // let purCnt = onnuri[i].sel ? onnuri[i].sel : 0
        let viewCnt = onnuri[i].hit ? onnuri[i].hit : 0
        let wishCnt = onnuri[i].vote ? onnuri[i].vote : 0
        let supplCode = onnuri[i].vendor
        console.log('supplCode:', supplCode)
  
        const supplier = await supplHandler.findOneById(supplCode)
  
        let free_deliv_or_not = 'N'
        let deliv_amt = 0
        if(supplier){
          if(supplier.free_deliv_or_not==0){
            free_deliv_or_not = 'Y'
          } else {
            if(supplier.deliv_amt >= supplier.free_deliv_base_amt ){
              free_deliv_or_not = 'Y'
            }
          }
        }
        if(supplier){
          if(!supplier.deliv_amt){
            deliv_amt = 0
          }else{
            deliv_amt = supplier.deliv_amt
          }
        }
  
        dealIdArray.push(onnuri[i].uid)
        purCntArray.push(purCnt)
        viewCntArray.push(viewCnt)
        wishCntArray.push(wishCnt)
        freeDelivOrNotArray.push(free_deliv_or_not)
        delivAmtArray.push(deliv_amt)
      }
      
    // }
    
    const result = await dealHandler.multipleCountUpdate({dealIdArray :dealIdArray ,purCntArray:purCntArray,
                                                          viewCntArray:viewCntArray, wishCntArray:wishCntArray,
                                                          freeDelivOrNotArray:freeDelivOrNotArray, delivAmtArray:delivAmtArray})

    await db.commit(connection);
    res.status(200).json({result: true})
  }catch(err){
    await db.rollback(connection);
    next(err)
  }
}

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newGoods = req.options;
    // console.log('newGoods: ', newGoods);
    // console.log('newGoods.suppl_code : ',newGoods.suppl_code)
    const supplier = await supplHandler.findOneById(newGoods.suppl_code)
    // console.log('supplier : ',supplier)

    const mfr = await mfrHandler.findOneById(newGoods.mfr_id)
    // if(mfr.length === 0){
    //   throw{ status: 409, errorMessage: "Not found manufacturer"}
    // }
    const brand = await brandHandler.findOneById(newGoods.brand_id)
    // if(brand.length === 0){
    //   throw{ status: 409, errorMessage: "Not found brand"}
    // }
    let free_deliv_or_not = 'N'
    let deliv_amt = 0
    if(supplier){
      if(supplier.free_deliv_or_not==0){
        free_deliv_or_not = 'Y'
      } else {
        if(supplier.deliv_amt >= supplier.free_deliv_base_amt ){
          free_deliv_or_not = 'Y'
        }
      }
    }
    if(supplier){
      if(!supplier.deliv_amt){
        deliv_amt = 0
      }else{
        deliv_amt = supplier.deliv_amt
      }
    }
    console.log('free_deliv_or_not : ',free_deliv_or_not)

    newGoods.hot_deal_or_not = 'N'
    let dealCom = {}
    //dealCom.deal_id = newGoods.goods_id
    //dealCom.goods_id = newGoods.goods_id
    dealCom.qty_unit = newGoods.goods_compo_unit_classif_code
    dealCom.goods_state_code = newGoods.goods_state_code

    let deal = {}
    //deal.deal_id = newGoods.goods_id
    deal.deal_state_code = newGoods.goods_state_code
    deal.repr_img = newGoods.repr_img
    deal.orig_price = newGoods.sel_price
    deal.deal_overview = newGoods.goods_overview
    deal.hot_deal_or_not = newGoods.hot_deal_or_not
    deal.hot_deal_expr_ts = newGoods.hot_deal_expr_ts
    deal.ac_tgt_goods_or_not = newGoods.ac_tgt_goods_or_not
    deal.max_acc_amt = newGoods.max_acc_amt
    deal.deal_classif = newGoods.deal_classif
    deal.deal_opt_id = newGoods.deal_opt_id
    deal.repr_timg = newGoods.repr_timg
    deal.repr_cat_id = newGoods.repr_cat_id
    deal.free_deliv_or_not = free_deliv_or_not
    deal.deliv_amt = deliv_amt
    deal.deal_disc_price = newGoods.deal_disc_price

    for(let i=1; i<10; i++){
      const newGoodsKeys = Object.keys(newGoods)
      //console.log('newGoodsKeys:', newGoodsKeys)
      const findKeys = newGoodsKeys.find(key => key === `add_img_${i}`)
      const findKeys2 = newGoodsKeys.find(key => key === `add_timg_${i}`)
      // console.log('findKeys:', findKeys)
      if(findKeys!=undefined){
        deal[findKeys] = newGoods[findKeys]
        deal[findKeys2] = newGoods[findKeys2]
      }
      
    }

    newGoods.first_create_dt_time = util.getCurrentTime();
    dealCom.first_create_dt_time = util.getCurrentTime();
    deal.first_create_dt_time = util.getCurrentTime();


    const dealForES = {
      deal_name                : newGoods.goods_name     // 딜이름
    , deal_overview            : newGoods.goods_overview     // 딜개요      
    , repr_timg                : newGoods.repr_img     // 대표이미지_썸네일   
    , orig_price               : newGoods.orig_price    // 기본가격        
    // , sel_price                : newGoods.sel_price     // 판매가격      
    , deal_state_code          : newGoods.goods_state_code     // 딜상태코드            
    , size                     : newGoods.goods_size     // 사이즈             
    , ac_app_or_not            : newGoods.ac_tgt_goods_or_not     // 애프터케어적용여부          
    , free_deliv_or_not        : free_deliv_or_not    // 무료배송여부              
    , free_deliv_base_amt      : supplier ? supplier.free_deliv_base_amt : ''    // 무료배송기준금액                
    , deliv_amt                : supplier ? supplier.deliv_amt : ''     // 배송비                              
    , deliv_method_classif_code: supplier ? supplier.deliv_method_classif_code : ''    // 배송방법구분코드                      
    , today_deliv_dl_time      : supplier ? supplier.today_deliv_dl_time : ''    // 금일배송마감시간                
    , gen_deliv_dl_time        : supplier ? supplier.gen_deliv_dl_time : ''    // 일반배송마감일수              
    , sat_deliv_or_not         : supplier ? supplier.sat_deliv_or_not : ''    // 토요일배송여부             
    , max_acc_amt              : newGoods.max_acc_amt ? supplier.max_acc_amt : ''    // 최대적립금액        
    , review_rating            : "3.5"     // 리뷰평점          
    , review_cnt               : "100"     // 리뷰개수  
    , suupl_id                 : supplier ? supplier.suppl_id : ''
    , suppl_name               : supplier ? supplier.name : ''    // 공급업체이름       
    , brand_name               : ""     // 브랜드이름       
    , last_mod_dt_time         : ""     // 마지막수정일자시간             
    , category                 : ""     // 카테고리 
}

    console.log('dealForES : ',dealForES)
    const dealId = newGoods.goods_id
    delete newGoods.deal_id
    delete newGoods.hot_deal_or_not
    delete newGoods.hot_deal_expr_ts
    delete newGoods.ac_tgt_goods_or_not
    delete newGoods.max_acc_amt
    delete newGoods.deal_classif
    delete newGoods.deal_opt_id
    delete newGoods.sel_price
    delete newGoods.deal_disc_price
    // delete newGoods.suppl_id
    

    const result = await handler.insert(newGoods, connection);
    newGoods.goods_id = result.insertId
    newGoods.goods_idx = result.insertId
    const resultUpdate = await handler.update(newGoods, connection);

    deal.deal_id = result.insertId
    const dealResult = await dealHandler.insert(deal, connection);

    dealCom.goods_id = result.insertId
    dealCom.deal_id = result.insertId
    console.log('dealcom:', dealCom)
    const dealComResult = await dealComHandler.insert(dealCom, connection)

    // console.log('dealResult:', dealResult)
    
    //console.log('insertId:', result)

  await db.commit(connection);

  console.log('dealId : ',dealId)
  client.index({
    index: 'deal_test'
    ,id   : dealId
    ,body : dealForES
  }, (err, result) => {
      if (err) console.log(err)
      // console.log(result)
      res.status(200).json({result: true});
  })
  // res.status(200).json({result: true});
    

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.multipleInsert = async (req, res, next) => {
  let connection = await db.beginTransaction();
  try{
    const newGoods = req.options
    const goods = req.options.goods
    //console.log('newGoods:', newGoods);
    //const goods = newGoods.goods
    //console.log('goods:', goods)
    let dealArray = [];
    let dealCompArray = [];

    goods.map(item => item.first_create_dt_time = util.getCurrentTime())
    //goods.map(item => item.suppl_code = 0)
    goods.map(item => item.mfr_id = 0)
    const multipleInsertGoods = await handler.multipleInsert(newGoods, connection)
    console.log('multipleInsertGoods', multipleInsertGoods)

    const supplCodeArray = goods.map(item => item.suppl_code)
    console.log('supplCodeArray:',supplCodeArray)
    const suppliers = await supplHandler.multipleGet(supplCodeArray)
    console.log('suppliers:',suppliers)
    //const suppliers = await supplHandler.findOneById(newGoods.suppl_code)
    //console.log('suppliers:',suppliers)

    let updateGoods = []
    for(let i=0; i<goods.length; i++){
      // let goodsId = goods[i].goods_id
      // let dealId = goods[i].deal_id
      let supplier = suppliers[i]
      console.log('supplier:', supplier)
      let freeDelivOrNot = 'N'
      let delivAmt = 0
      if(supplier){
        if(!suppliers[i].deliv_amt){
          delivAmt = 0
        }else{
          delivAmt = suppliers[i].deliv_amt
        }
      }
    
      if(supplier){
        if(supplier.free_deliv_or_not==0){
          freeDelivOrNot = 'Y'
        } else {
          if(supplier.deliv_amt >= supplier.free_deliv_base_amt ){
            freeDelivOrNot = 'Y'
          }
        }
      }
      let reprCatIdResult = await representativeCategoryHandler.getList({})
      console.log('reprCatIdResult:', reprCatIdResult.length)
      let randomReprCatId = Math.floor(Math.random() * reprCatIdResult.length) + 1;
      console.log('randomReprCatId:', randomReprCatId)

      let goodsId = multipleInsertGoods.result[i].insertId
      let goodsIdx = multipleInsertGoods.result[i].insertId

      let goodsCompoUnitClassifCode = goods[i].goods_compo_unit_classif_code
      let goodsStateCode = goods[i].goods_state_code
      let reprImg = goods[i].repr_img
      let reprTimg = goods[i].repr_timg
      
      let selPrice = multipleInsertGoods.selPrice[i]
      let hotDealOrNot = multipleInsertGoods.hotDealOrNot[i]
      let hotDealExprTs = multipleInsertGoods.hotDealExprTs[i]
      let AcTgtGoodsOrNot = multipleInsertGoods.AcTgtGoodsOrNot[i]
      let maxAccAmt = multipleInsertGoods.maxAccAmt[i]
      let dealName = goods[i].goods_name
      let dealOverview = goods[i].goods_overview
      let dealClassif = multipleInsertGoods.dealClassif[i]
      let dealOptId = multipleInsertGoods.dealOptId[i]
      let reprCatId = randomReprCatId
      let dealDiscPrice = multipleInsertGoods.dealDiscPrice[i]
      console.log('selPrice:', selPrice)
      console.log('multipleInsertGoods.result[i].insertId:', multipleInsertGoods.result[i].insertId)
      console.log('multipleInsertGoods.selPrice[i]', multipleInsertGoods.selPrice[i])
      console.log('reprCatId:', reprCatId)

      let tempDealCompArray = [];
      let tempDealArray = [];
        
        tempDealCompArray.push(goodsId);
        tempDealCompArray.push(goodsId);
        tempDealCompArray.push(goodsCompoUnitClassifCode);
        tempDealCompArray.push(goodsStateCode);
        tempDealCompArray.push(1)  // deal_opt_id

        tempDealArray.push(goodsId);
        tempDealArray.push(goodsStateCode);
        tempDealArray.push(reprImg);
        tempDealArray.push(selPrice);
        tempDealArray.push(hotDealOrNot);
        tempDealArray.push(hotDealExprTs);
        tempDealArray.push(AcTgtGoodsOrNot);
        tempDealArray.push(maxAccAmt);
        tempDealArray.push(dealName);
        tempDealArray.push(dealOverview);
        tempDealArray.push(freeDelivOrNot);
        tempDealArray.push(delivAmt)
        tempDealArray.push(dealClassif)
        tempDealArray.push(dealOptId)
        tempDealArray.push(reprTimg)
        tempDealArray.push(reprCatId)
        tempDealArray.push(dealDiscPrice)


        for(let j=1; j<10; j++){
          const newGoodsKeys = Object.keys(goods[i])
          //console.log('newGoodsKeys:', newGoodsKeys)
          const findKeys = newGoodsKeys.find(key => key === `add_img_${j}`)
          const findKeys2 = newGoodsKeys.find(key => key === `add_timg_${j}`)
          console.log('findKeys:', findKeys)
          tempDealArray.push(goods[i][findKeys])
          tempDealArray.push(goods[i][findKeys2])
        }
        dealCompArray.push(tempDealCompArray);
        dealArray.push(tempDealArray);

        goods[i].goods_id = goodsId
        goods[i].goods_idx = goodsIdx
        updateGoods.push(goods[i])
    }
      console.log('dealArray:', dealArray) 
      console.log('dealCompArray:', dealCompArray)

      //console.log('updateGoods:', updateGoods) 

      const multipleInsertGoodsResult = await handler.multipleUpdate(updateGoods, connection)
      
      dealArray.map(item => item.push(util.getCurrentTime()))
      const multipleInsertDeal = await dealHandler.multipleInsert(dealArray, connection)
      
      dealCompArray.map(item => item.push(util.getCurrentTime()))
      const multipleInsertDealComp = await dealComModel.multipleInsert(dealCompArray, connection)

      console.log('multipleInsertGoodsResult:', multipleInsertGoodsResult)
      console.log('multipleInsertDealComp:', multipleInsertDealComp)
      console.log('multipleInsertDeal:', multipleInsertDeal)

      await db.commit(connection);
      res.status(200).json({result: true});

  }catch(err){
    await db.rollback(connection);
    next(err);
  }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    let newGoods = req.options
    let goods = newGoods.goods

    const supplCodeArray = goods.map(item => item.suppl_code)
    console.log('supplCodeArray:',supplCodeArray)
    const suppliers = await supplHandler.multipleGet(supplCodeArray)
    console.log('suppliers:',suppliers)

    let free_deliv_or_not = 'N'
    let deliv_amt = 0
    for(let i=0; i<suppliers.length; i++){
      let supplier = suppliers[i]
      if(supplier){
        if(!suppliers[i].deliv_amt){
          deliv_amt = 0
        }else{
          deliv_amt = suppliers[i].deliv_amt
        }
      }
      if(supplier){
        if(supplier.free_deliv_or_not==0){
          free_deliv_or_not = 'Y'
        } else {
          if(supplier.deliv_amt >= supplier.free_deliv_base_amt ){
            free_deliv_or_not = 'Y'
          }
        }
      }
    }
    
    goods.map(item => item.free_deliv_or_not = free_deliv_or_not)
    goods.map(item => item.deliv_amt = deliv_amt)
    goods.map(item => item.last_mod_dt_time = util.getCurrentTime())

    const goodsIdx = goods.map(item => item.goods_idx)
    console.log('goodsIdx:', goodsIdx);

    const getDealIdAndDetailIdx = await dealComModel.multipleGet(goodsIdx)
    console.log('deal_id & deal_detail_idx:', getDealIdAndDetailIdx);
    const dealDetailIdx = getDealIdAndDetailIdx.map(item => item.deal_detail_idx)
    console.log('dealDetailIdx:', dealDetailIdx)
    console.log('goods:', goods)

    const dealComResult = await dealComModel.multipleUpdate({goods: goods, dealDetailIdx: dealDetailIdx}, connection)
    if(dealComResult === 0){
      throw{ status: 404, errorMessage: "dealCompositionDetail updating failed"};
    }

    const getDealIdx = await dealHandler.multipleGet(goodsIdx)
    console.log('getDealIdx:',getDealIdx)
    const dealIdx = getDealIdx.map(item => item.deal_idx);

    const dealResult = await dealHandler.multipleUpdate({goods: goods, dealIdx: dealIdx}, connection)
    if(dealResult === 0){
      throw{ status: 404, errorMessage: "deal updating failed"};
    }
    
    const result = await handler.multipleUpdate(newGoods, connection);
    if(result === 0){
      throw{ status: 404, errorMessage: "goods updating failed"};
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
    const params = req.options
    console.log('params:', params);
    const multipleGetResult = await handler.multipleGet(params.idx_array)
    console.log('multipleGetResult:', multipleGetResult)
    const goodsIdArray = multipleGetResult.map(item => item.goods_id)

    console.log('goodsIdArray:', goodsIdArray)
    
    const dealResult = await dealModel.multipleDelete({id_array: goodsIdArray}, connection);
    const dealComResult = await dealComModel.multipleDelete({id_array: goodsIdArray}, connection);
    const result = await handler.multipleDelete(params, connection)
    console.log('affectedRows:', dealResult, dealComResult, result)
    let returnValue = false
    if((result.affectedRows !== 0) && (dealComResult.affectedRows !== 0) && (dealResult.affectedRows !== 0)){
      returnValue = true
      await db.commit(connection)
    }
    
    res.status(200).json({ result: returnValue })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.getList = async (req, res, next) => {
  try{
    const params = req.options;
    const query = req.query;
    console.log('params1:', params)
    console.log('query1:', query);
    const result = await handler.getList(params);
    const total = await handler.getListTotal(params);
    const pagenation = util.makePageData(total, params.page, params.srch_cnt)
    console.log('pagenation:', pagenation)

    let dealId
    if(params.id_array){
      const getDealIdAndDetailIdx = await dealComHandler.multipleGet(params.id_array)
      dealId = getDealIdAndDetailIdx.map(item => item.deal_id)
    }else{
      let goodsId = result.map(item => item.goods_id);
      
      //goodsId = Array.from(new Set(goodsId));
      dealId = goodsId

      console.log('dealId.length:', dealId.length)
      console.log('result:', result.length)

    }

    const getDeal = await dealHandler.multipleGet(dealId)
    console.log('getDeal.length:', getDeal.length)
    const selPrice = getDeal.map(item => item.sel_price);
    const delivAmt = getDeal.map(item => item.deliv_amt)
  
    for(let i=0; i<result.length; i++){
      // result[i].sel_price = selPrice[i]
      result[i].deliv_amt = delivAmt[i]
    }
    
    res.status(200).json({result, pagenation, query});
  }catch(err){
    next(err);
  }
};


module.exports.getListGoods = async (req, res, next) => {
    try{
        const params = req.options
        console.log('params:', params)
        //const {category} = params
        let goods = {}

        const keyList = Object.keys(goodsList)
        console.log("keyList:", keyList)
        if(Object.keys(params).length === 0 && JSON.stringify(params) === JSON.stringify({})){
            goods.list = keyList
        }else{
            let tempGoods = goodsList[params.category]
            goods[params.category] = tempGoods
        }

        res.status(200).json({result: goods})
    }catch(err){
        console.error(err)
        next(err)
    }
}


module.exports.fakeCategoryMatching = async (req, res, next) => {
  try{

    let indexOfRepCategory = await representativeCategoryHandler.getList()
    let categoryIdxArray = [];
    let dealIdArray = [];
  
    for(let i=0; i<indexOfRepCategory.length;i++){
      categoryIdxArray.push(indexOfRepCategory[i].cat_id)

    }
    
    let deals = await dealHandler.getList();
    // console.log('deals : ',deals)
    for(let i=0; i<deals.length;i++){
      dealIdArray.push(deals[i].deal_id)

    }

    console.log('categoryIdxArray : ',categoryIdxArray)
    console.log('dealIdArray : ',dealIdArray)
    // dealIdArray = [19543, 19542]
    const result = await dealHandler.multipleCategoryUpdate({dealIdArray:dealIdArray, categories:categoryIdxArray})

    res.status(200).json(result);
  }catch(err){
    next(err);
  }
};
