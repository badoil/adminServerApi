'use strict'

const handler = require('./exhibition_category-handler')
const exhibitCatDealHandler = require('../exhibition_category_deal/exhibition_category_deal-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      const mainExhib = req.options;
      let dealIdArray = mainExhib.deal_id_array
      let dealIds = dealIdArray.map(deal => deal.deal_id)
      console.log("dealIds:", dealIds)
      // let exhibCatDealIdxArray = mainExhib.exhib_cat_deal_idx_array
      // let exhibCatDealIdxs = exhibCatDealIdxArray.map(deal => deal.exhib_cat_deal_idx)
      // console.log("exhibCatDealIdxs:", exhibCatDealIdxs)

      mainExhib.first_create_dt_time = util.getCurrentTime()
      delete mainExhib.deal_id_array
      //delete mainExhib.exhib_cat_deal_idx_array
      console.log("mainExhib:", mainExhib)
      const result = await handler.insert(mainExhib, connection)
      console.log("result:", result)

      let exhibitCatDeal = []
      for(let i=0; i<dealIdArray.length; i++){
        let tempExhibitCatDeal = []

        //let exhibCatDealIdx = exhibCatDealIdxs[i]
        let exhibId = result.insertId
        let dealId = dealIds[i]
        let createTime = util.getCurrentTime()

        //tempExhibitCatDeal.push(exhibCatDealIdx)
        tempExhibitCatDeal.push(exhibId)
        tempExhibitCatDeal.push(dealId)
        tempExhibitCatDeal.push(createTime)

        exhibitCatDeal.push(tempExhibitCatDeal)
        
      }
      console.log('exhibitCatDeal:', exhibitCatDeal)
      const exhibitCatDealResult = await exhibitCatDealHandler.multipleInsert(exhibitCatDeal, connection)
      
      await db.commit(connection);
      res.status(200).json({result: true});

    }catch(e){
      await db.rollback(connection);
      next(e);
    }
}


module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      const mainExhibit = req.options;
      let dealIdArray = mainExhibit.deal_id_array
      let dealIds = dealIdArray.map(deal => deal.deal_id)

      console.log('mainExhibit:', mainExhibit);
      const mainExhibitResult = await handler.findOneById(mainExhibit.exhib_id);
      if(mainExhibitResult.length === 0){
        throw{ status: 404, errorMessage: 'Exhibition-Category not found'};
      }
      mainExhibit.last_mod_dt_time = util.getCurrentTime();
      mainExhibit.exhib_id = mainExhibitResult[0].exhib_id;
      //delete mainExhibition.exhib_idx

      delete mainExhibit.deal_id_array
      const result = await handler.update(mainExhibit, connection);
      console.log('updateResult: ', result.affectedRows);
      if(result.affectedRows === 0){
        throw{ status: 404, errorMessage: "updating failed"};
      }

      const getExhibCatDealIdx = await exhibitCatDealHandler.multipleGet(mainExhibitResult[0].exhib_id)
      console.log("getExhibCatDealIdx:", getExhibCatDealIdx)
      const  exhibCatDealIdxs = getExhibCatDealIdx.map(exhib => exhib.exhib_cat_deal_idx)
      console.log("exhibCatDealIdxs:", exhibCatDealIdxs)

      let returnResult = []
      for(let i=0; i<dealIds.length; i++){
        let lastModTime = util.getCurrentTime()
        let dealId = dealIds[i]
        let exhibCatDealIdx = exhibCatDealIdxs[i]
        let result = await exhibitCatDealHandler.update({exhibCatDealIdx, dealId, lastModTime}, connection)
        returnResult.push(result)
      }
      console.log("returnResult:", returnResult)


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
    const result = await handler.delete(req.options.exhib_id, connection);
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
    const params = req.options
    const query = req.query

    const exhibCatDealJoinDeal = await exhibitCatDealHandler.joinGet(params)
    const exhibCatDealJoinDealGroup = await exhibitCatDealHandler.joinGetGroup(params)

    const getExhibIds = exhibCatDealJoinDealGroup.map(exhib => exhib.exhib_id)
    const filteredExhibIds = getExhibIds.filter(exhib => exhib.exhib_id !== null)
    let exhibResults = await handler.multipleGet({exhibIdArray: filteredExhibIds, params})

    
    for(let i=0; i<exhibResults.length; i++){
      let deal = []
      for(let j=0; j<exhibCatDealJoinDeal.length; j++){
        if(exhibResults[i].exhib_id === exhibCatDealJoinDeal[j].exhib_id){
          deal.push(exhibCatDealJoinDeal[j])
        }
      }
      exhibResults[i].deals = deal
    }

    const totalResult = await handler.multipleGetTotal({exhibIdArray: filteredExhibIds, params})
    const pagenation = util.makePageData(totalResult, params.page, params.srch_cnt)
    
    return res.status(200).json({exhibResults, pagenation, query});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}



module.exports.insertFakeData = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
//         exhib_name,
//     exhib_overview,
//   exhib_banner_img,
//     exhib_horiz_img,
//     exhib_vert_img,
//       exhib_sq_img,
// exhib_dets_info_img,
//   exhib_thema_color,
//           exhib_tag,
//   banner_exp_or_not,
// main_page_exp_or_not,
//     valid_start_dt,
//       valid_end_dt,
// repr_goods_compo_list,
// exhib_compo_goods_list,                                    
// first_create_dt_time
    let fakeData = [
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-1.png','','','#ecad57','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','5980|7540|5900|17988|3123|18181','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-2.png','','','#9c74be','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','7571|835|12125|4356|11606|9815','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-3.png','','','#a35d39','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','17763|17882|7309|10108|4223|4243','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-4.png','','','#0060a4','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','12394|1935|8035|3394|7925|18513','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-5.png','','','#277e6f','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','15462|12550|3328|11949|16411|7986','',util.getCurrentTime()]

    ]

    const result = await handler.multiInsert(fakeData, connection);
    await db.commit(connection);
    res.status(200).json(result);

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}