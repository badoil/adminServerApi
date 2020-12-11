'use strict'

const handler = require('./goods-handler')
const dealComHandler = require('../dealCompositionDetail/dealCompositionDetail-handler')
const dealHandler = require('../deal/deal-handler')
const mfrHandler = require('../manufacturer/manufacturer-handler')
const brandHandler = require('../brands/brand-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')

const sheet2 = require('./sheet2.json')
const onnuri = require('./onnuri.json')

const { Client } = require('@elastic/elasticsearch')
const config = require('../../../config')
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

      let reprCatId = onnuri[i].category
      let erpCode = onnuri[i].erpcode
      let goodsName = onnuri[i].name
      let origPrice = onnuri[i].price2
      let purPrice = onnuri[i].p_price
      let salesUnitPrice = onnuri[i].s_price
      onnuri[i].maker = 0
      let brandId = onnuri[i].maker
      let stockQty = onnuri[i].stock_num
      let supplCode = onnuri[i].vendorName
      let goodsOverview = onnuri[i].summary
      let pbClassif = onnuri[i].gubun
      let erpClassif = onnuri[i].erpgubun
      let selPharClassif = onnuri[i].pgubun
      let nsCxnCatId = onnuri[i].naver_category
      let sabangCxnCatId = onnuri[i].sabangSyncCode

      let tempDealCompArray = [];
      let tempDealArray = [];
      let tempGoodsArray = [];
        
        tempDealCompArray.push(goodsStateCode);

        tempDealArray.push(goodsStateCode);
        tempDealArray.push(reprTimg);
        tempDealArray.push(selPrice);

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

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newGoods = req.options;
    console.log('newGoods: ', newGoods.goods_name);
    const goods = await handler.findOneByGoods(newGoods.goods_name);
    console.log('goods:', goods)
    if(goods.length !== 0){
      throw{ status: 409, errorMessage:"Duplicate Goods" };
    }
    const mfr = await mfrHandler.findOneById(newGoods.mfr_id)
    if(mfr.length === 0){
      throw{ status: 409, errorMessage: "Not found manufacturer"}
    }
    const brand = await brandHandler.findOneById(newGoods.brand_id)
    if(brand.length === 0){
      throw{ status: 409, errorMessage: "Not found brand"}
    }
    
    let dealCom = {}
    dealCom.deal_id = newGoods.deal_id
    dealCom.goods_id = newGoods.goods_id
    dealCom.qty_unit = newGoods.goods_compo_unit_classif_code
    dealCom.goods_state_code = newGoods.goods_state_code

    let deal = {}
    deal.deal_id = newGoods.deal_id
    deal.deal_state_code = newGoods.goods_state_code
    deal.repr_img = newGoods.repr_img
    deal.sel_price = newGoods.sel_price

    for(let i=1; i<10; i++){
      const newGoodsKeys = Object.keys(newGoods)
      //console.log('newGoodsKeys:', newGoodsKeys)
      const findKeys = newGoodsKeys.find(key => key === `add_img_${i}`)
      const findKeys2 = newGoodsKeys.find(key => key === `add_timg_${i}`)
      console.log('findKeys:', findKeys)
      deal[findKeys] = newGoods[findKeys]
      deal[findKeys2] = newGoods[findKeys2]
    }

    newGoods.first_create_dt_time = util.getCurrentTime();
    dealCom.first_create_dt_time = util.getCurrentTime();
    deal.first_create_dt_time = util.getCurrentTime();


    const dealId = newGoods.deal_id
    console.log('deal : ',deal)

    delete newGoods.deal_id
    delete newGoods.sel_price

    const result = await handler.insert(newGoods, connection);
    const dealComResult = await dealComHandler.insert(dealCom, connection)
    const dealResult = await dealHandler.insert(deal, connection);
    console.log('dealResult:', dealResult)
    console.log('result:', result)

    const dealForES = {
          deal_name                : goods.name     // 딜이름
        , deal_overview            : goods.goods_overview     // 딜개요      
        , repr_timg                : goods.repr_img     // 대표이미지_썸네일   
        , orig_price               : goods.orig_price    // 기본가격        
        , sel_price                : goods.sel_price     // 판매가격      
        , deal_state_code          : goods.goods_state_code     // 딜상태코드            
        , size                     : goods.goods_size     // 사이즈             
        , ac_app_or_not            : goods.ac_tgt_goods_or_not     // 애프터케어적용여부          
        , free_deliv_or_not        : goods.free_deliv_or_not     // 무료배송여부              
        , free_deliv_base_amt      : goods.free_deliv_base_amt     // 무료배송기준금액                
        , deliv_amt                : goods.deliv_amt     // 배송비                              
        , deliv_method_classif_code: goods.deliv_method_classif_code     // 배송방법구분코드                      
        , today_deliv_dl_time      : ""     // 금일배송마감시간                
        , gen_deliv_dl_time        : ""     // 일반배송마감일수              
        , sat_deliv_or_not         : ""     // 토요일배송여부             
        , max_acc_amt              : ""     // 최대적립금액        
        , review_rating            : ""     // 리뷰평점          
        , review_cnt               : ""     // 리뷰개수       
        , suppl_name               : ""     // 공급업체이름       
        , brand_name               : ""     // 브랜드이름       
        , last_mod_dt_time         : ""     // 마지막수정일자시간             
        , category                 : ""     // 카테고리 
    }
    // client.index({
    //   index: 'deal_test'
    //  ,id   : dealId
    //   ,body : {
    //       deal_name                : "테스트"     // 딜이름
    //     , deal_overview            : ""     // 딜개요      
    //     , repr_timg                : ""     // 대표이미지_썸네일   
    //     , orig_price               : ""     // 기본가격        
    //     , sel_price                : ""     // 판매가격      
    //     , deal_state_code          : ""     // 딜상태코드            
    //     , size                     : ""     // 사이즈             
    //     , ac_app_or_not            : ""     // 애프터케어적용여부          
    //     , free_deliv_or_not        : ""     // 무료배송여부              
    //     , free_deliv_base_amt      : ""     // 무료배송기준금액                
    //     , deliv_amt                : ""     // 배송비                              
    //     , deliv_method_classif_code: ""     // 배송방법구분코드                      
    //     , today_deliv_dl_time      : ""     // 금일배송마감시간                
    //     , gen_deliv_dl_time        : ""     // 일반배송마감일수              
    //     , sat_deliv_or_not         : ""     // 토요일배송여부             
    //     , max_acc_amt              : ""     // 최대적립금액        
    //     , review_rating            : ""     // 리뷰평점          
    //     , review_cnt               : ""     // 리뷰개수       
    //     , suppl_name               : ""     // 공급업체이름       
    //     , brand_name               : ""     // 브랜드이름       
    //     , last_mod_dt_time         : ""     // 마지막수정일자시간             
    //     , category                 : ""     // 카테고리                 
    //   }
    // }, (err, result) => {
    //     if (err) console.log(err)
    //     console.log(result)
    // })

    await db.commit(connection);
    res.status(200).json({result: true});

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.multipleInsert = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newGoods = req.options
    //console.log('newGoods:', newGoods);
    const goods = newGoods.goods
    let dealArray = [];
    let dealCompArray = [];

    for(let i=0; i<goods.length; i++){
      let goodsId = goods[i].goods_id
      let dealId = goods[i].deal_id
      let goodsCompoUnitClassifCode = goods[i].goods_compo_unit_classif_code
      let goodsStateCode = goods[i].goods_state_code
      let reprImg = goods[i].repr_img
      let selPrice = goods[i].sel_price

      let tempDealCompArray = [];
      let tempDealArray = [];
        
        tempDealCompArray.push(dealId);
        tempDealCompArray.push(goodsId);
        tempDealCompArray.push(goodsCompoUnitClassifCode);
        tempDealCompArray.push(goodsStateCode);

        tempDealArray.push(dealId);
        tempDealArray.push(goodsStateCode);
        tempDealArray.push(reprImg);
        tempDealArray.push(selPrice);
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
    }
      console.log('dealCompArray:', dealCompArray)
      console.log('dealArray:', dealArray)  
      
      const multipleInsertGoods = await handler.multipleInsert(newGoods, connection)
      const multipleInsertDealComp = await dealComHandler.multipleInsert(dealCompArray, connection)
      const multipleInsertDeal = await dealHandler.multipleInsert(dealArray, connection)
      console.log('multipleInsertGoods:', multipleInsertGoods)
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

    const goodsIdx = goods.map(item => item.goods_idx)
    console.log('goodsIdx:', goodsIdx);
    const getGoodsId = await handler.multipleGet(goodsIdx)
    console.log('getGoodsId:', getGoodsId)
    const goodsId = getGoodsId.map(item => item.goods_id);
    console.log('goodsId:', goodsId)

    const getDealIdAndDetailIdx = await dealComHandler.multipleGet(goodsId)
    console.log('deal_id & deal_detail_idx:', getDealIdAndDetailIdx);
    const dealDetailIdx = getDealIdAndDetailIdx.map(item => item.deal_detail_idx)
    console.log('dealDetailIdx:', dealDetailIdx)
    const dealComResult = await dealComHandler.multipleUpdate({goods: goods, dealDetailIdx: dealDetailIdx}, connection)
    if(dealComResult === 0){
      throw{ status: 404, errorMessage: "dealCompositionDetail updating failed"};
    }

    const dealId = getDealIdAndDetailIdx.map(item => item.deal_id);
    console.log('deaId:', dealId)
    const getDealIdx = await dealHandler.multipleGet(dealId)
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
    // const multipleGetResult = await handler.multipleGet(params)
    // console.log('multipleGetResult:', multipleGetResult)
    //const goodsIdList = multipleGetResult.map(item => item.goods_id)

    console.log('multiMap:', goodsIdList)
    
    const dealResult = await dealHandler.multipleDelete(params, connection);
    const dealComResult = await dealComHandler.multipleDelete(params, connection);
    const result = await handler.multipleDelete(params, connection)
    let returnValue = false
    if((result.affectedRows !== 0) && (dealComResult.affectedRows !== 0) && (dealResult.affectedRows !== 0)){
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

module.exports.getList = async (req, res, next) => {
  try{
    const params = req.options;
    const query = req.query;
    console.log('query:', query);
    const result = await handler.getList(params);
    const total = await handler.getListTotal(params);
    const pagenation = util.makePageData(total, params.page, params.srch_cnt)
    console.log('pagenation:', pagenation)

    const goodsId = result.map(item => item.goods_id);
    console.log('goodsId:', goodsId)
    const getDealIdAndDetailIdx = await dealComHandler.multipleGet(goodsId)
    const dealId = getDealIdAndDetailIdx.map(item => item.deal_id);
    console.log('deaId:', dealId)
    const getDealSelPrice = await dealHandler.multipleGet(dealId)
    console.log('getDealSelPrice:',getDealSelPrice)
    const selPrice = getDealSelPrice.map(item => item.sel_price);
    console.log('selPrice:', selPrice);

    let returnResult = []
    for(let i=0; i<result.length; i++){
      let newResult = result[i]
      const oldName = 'orig_price'
      const newName = 'sel_goods_price'

      newResult.sel_deal_price = selPrice[i]

      Object.defineProperty(
        newResult, newName,
        Object.getOwnPropertyDescriptor(newResult, oldName)
      )
      delete newResult[oldName]
      returnResult.push(newResult)
    }

    res.status(200).json({returnResult, pagenation, query});
  }catch(err){
    next(err);
  }
};

// module.exports.inserSurveyQuestions = async (options, connection) => {
//   try {
//     let sql = `INSERT INTO SurveyQuestions ('surveysIndex', 'title', 'content', 'contentOrder') VALUES ?`
//     const {insertId} = await db.query({
//       connection: connection,
//       sql,
//       values: [options]
//     })
//     return insertId
//   }
//   catch (err) {
//     throw new Error(err)
//   }
// }


// var surveyQuestionArray = [];
//       for (var i=0; i<questions.length; i++){
//         var questionsTitle = questions[i].title;
//         var questionsOptions = questions[i].options;
//         // console.log(“questionsTitle “,i,” :“,questionsTitle)
//         // console.log(“questionsOptionList “,i,” :“,questionsOptions)
//         for(var j=0; j<questionsOptions.length;j++){
//           var tempArray = [];
//           tempArray.push(newSurvey.id)
//           tempArray.push(questionsTitle)
//           // console.log(“questionsOption “,j,” :“,questionsOptions[j])
//           tempArray.push(questionsOptions[j])
//           tempArray.push(j)
//           surveyQuestionArray.push(tempArray)
//         }
//       }
//       const inserSurveyQuestionsResult = await handler.inserSurveyQuestions(surveyQuestionArray, connection)
