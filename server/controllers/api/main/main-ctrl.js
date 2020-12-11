const exposedHandler = require('../exposed_category/exposed_category-handler');
const exhibitionHandler = require('../exhibition_category/exhibition_category-handler')
const dealHandler = require('../deal/deal-handler')
const exposedCategoryDealHandler = require('../exposed_category_deal/exposed_category_deal-handler')
const exhibitionDealHandler = require('../exhibition_category_deal/exhibition_category_deal-handler')

const db = require('../../../components/db')
const util = require('../../../components/util')


module.exports.getList = async(req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      const options = req.options
      let result = {}
      
    //   const  dealIdResult = await dealHandler.getList()
    //   console.log('dealIdResult:', dealIdResult.length)
    //   for(let i=0; i<dealIdResult.length; i++){
    //       const hot_deal_or_not = 'N'
    //       const ac_agt_goods_or_not = 'N'
    //       await dealHandler.update({hot_deal_or_not, ac_agt_goods_or_not, deal_idx: i}, connection)
    //   }

      let todayHotDeal = []
      for(let i=1; i<11; i++){
        let hot_deal_or_not = 'Y'
        let hot_deal_expr_ts = util.getCurrentTime()
        // let dealResult = await dealHandler.updateRandomHotDeal({deal_idx: i, hot_deal_or_not, hot_deal_expr_ts}, connection)
        let dealYResult = await dealHandler.getList({deal_idx: i, connection})
        console.log('dealYResult:', dealYResult)
        todayHotDeal.push(dealYResult[0])
      }
      
      console.log('todayHotDeal:', todayHotDeal)
      
      let alwaysBuyGoods = []
      for(let i=11; i<21; i++){
        let alwaysBuy = await dealHandler.getList({deal_idx: i}, connection)
        alwaysBuyGoods.push(alwaysBuy[0])
      }

      let afterCareGoods = []
      for(let i=21; i<31; i++){
        
        let ac_tgt_goods_or_not = 'Y'
        // let dealResult = await dealHandler.updateRandomAcDeal({deal_idx: i, ac_tgt_goods_or_not}, connection)
        let dealYResult = await dealHandler.getList({deal_idx: i, connection})
        afterCareGoods.push(dealYResult[0])
      }
      
      let nowTopGoods = []
      for(let i=31; i<34; i++){
        let nowTop = await dealHandler.getList({deal_idx: i}, connection)
        nowTopGoods.push(nowTop[0])
      }

      let weeklyGoods = []
      for(let i=34; i<44; i++){
        let weeklyGoodsResult = await dealHandler.getList({deal_idx: i}, connection)
        weeklyGoods.push(weeklyGoodsResult[0])
      }

      let exposedCategoryList = await exposedHandler.getMainList()
      let exposedCategories = [];
      for(let i=0;i<exposedCategoryList.length;i++){
          let expCategory1 = await exposedCategoryDealHandler.getList({exp_cat_id : exposedCategoryList[i].exp_cat_id})
          let label = exposedCategoryList[i].cat_name
          
          let expCategory1CatIds = []
          for (let j=0;j<expCategory1.length;j++){
            expCategory1CatIds.push(expCategory1[j].deal_id)
          }
          let expCategoryDeal = await dealHandler.multipleGetAll(expCategory1CatIds)
          let obejct = {
            name : label,
            list : expCategoryDeal
          }
          exposedCategories.push(obejct)
      }
      
      
      // let expCategory2 = await exposedCategoryDealHandler.getList({exp_cat_id : exposedCategoryList[1].exp_cat_id})
      // let expCategory2CatIds = []
      // for (let i=0;i<expCategory2.length;i++){
      //   expCategory2CatIds.push(expCategory2[i].deal_id)
      // }
      // let expCategoryDeal2 = await dealHandler.multipleGetAll(expCategory2CatIds)
      

      // let expCategory3 = await exposedCategoryDealHandler.getList({exp_cat_id : exposedCategoryList[2].exp_cat_id})
      // let expCategory3CatIds = []
      // for (let i=0;i<expCategory3.length;i++){
      //   expCategory3CatIds.push(expCategory3[i].deal_id)
      // }
      // let expCategoryDeal3 = await dealHandler.multipleGetAll(expCategory3CatIds)


      // let kidsHealthGoods = []
      // for(let i=44; i<54; i++){
      //   let kidsHealth = await dealHandler.getList({deal_idx: i}, connection)
      //   kidsHealthGoods.push(kidsHealth)
      // }

      // let lightMeals = []
      // for(let i=54; i<64; i++){
      //   let lightMeal = await dealHandler.getList({deal_idx: i}, connection)
      //   lightMeals.push(lightMeal)
      // }

      let banner = []

      let exhibitionResult = await exhibitionHandler.getList()
      let exhibitionList = [];
      console.log('exhibitionResult : ',exhibitionResult.length)
      for(let i=0;i<exhibitionResult.length;i++){
          let exhibitionDeal = await exhibitionDealHandler.getList({exhib_id : exhibitionResult[i].exhib_id})
          console.log('exhibitionDeal : ',exhibitionDeal)
          let dealIds = []
          for (let j=0;j<exhibitionDeal.length;j++){
            dealIds.push(exhibitionDeal[j].deal_id)
          }
          let list  = await dealHandler.multipleGetAll(dealIds)
          
          exhibitionResult[i].deals = list
          exhibitionList.push(exhibitionResult[i])
      }
      
      let popularBrand = []

      result.banner = banner
      result.todayHotDeal = todayHotDeal
      result.alwaysBuyGoods = alwaysBuyGoods
      result.afterCareGoods = afterCareGoods
      result.nowTopGoods = nowTopGoods
      result.weeklyGoods = weeklyGoods
      result.exposedCategories = exposedCategories
      result.exhibitionList = exhibitionList
      result.popularBrand = popularBrand

      await db.commit(connection)
      
      return res.status(200).json({lists: result});
      
    }catch(e){
      console.error(e)
      next(e);
    }
  }