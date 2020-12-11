'use strict'

const handler = require('./supplier-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')
const supplierSetting = require('./supplierSetting.json')

module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const newSupplier = req.options
        const supplier = await handler.findOneById(newSupplier.suppl_id)
        if (supplier) {
            throw { status: 409, errorMessage: 'Duplicate id' }
        }
  
        newSupplier.first_create_dt_time = util.getCurrentTime();
        newSupplier.join_dt = util.getCurrentTime();
        const result = await handler.insert(newSupplier, connection)
      
        await db.commit(connection)
        res.status(200).json({ result:result })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
  }
  

module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
        let newSupplier = req.options
        // console.log('newSupplier.suppl_idx', newSupplier.suppl_idx);
        newSupplier.last_mod_dt_time = util.getCurrentTime();
        
        const result = await handler.update(newSupplier, connection);
        // console.log('ctrlResult: ', result.affectedRows);
        if(result.affectedRows === 0){
            throw{ status: 404, errorMessage: "updating failed"};
        }
        await db.commit(connection);
        res.status(200).json({ result: true });

    } catch(e) {
        await db.rollback(connection);
        next(e);
    }
}

module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        console.log('newSupplier.suppl_idx', req.options.suppl_idx);
        const result = await handler.delete({ idx: req.options.suppl_idx }, connection)
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
    const total = await handler.getListTotal(params)
    const pagenation = util.makePageData(total, params.page, params.srch_cnt)

    console.log('totalLength',total)
    
    res.status(200).json({result, pagenation, query})
  }
  catch (err) {
    next(err)
  }
}

module.exports.suppelierSettingInsert = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      let array = [];
      
      //console.log('onnuri.json:', onnuri)
      for(let i=0; i<supplierSetting.length; i++){
        const tmpObj = {}
        const tmpArray = []
        tmpObj.suppl_id =supplierSetting[i].memberuid
        tmpObj.email = supplierSetting[i].email
        tmpObj.name = supplierSetting[i].name
        tmpObj.deliv_method_classif_code = supplierSetting[i].type
        tmpObj.today_deliv_dl_time = supplierSetting[i].time
        tmpObj.sat_deliv_or_not = supplierSetting[i].saturday
        tmpObj.free_deliv_or_not = supplierSetting[i].무료배송구분코드
        tmpObj.free_deliv_base_amt = supplierSetting[i].무료배송기준금액
    
        tmpArray.push(supplierSetting[i].memberuid)
        tmpArray.push(supplierSetting[i].email)
        tmpArray.push(supplierSetting[i].name)
        tmpArray.push(supplierSetting[i].type)
        tmpArray.push(supplierSetting[i].time)
        tmpArray.push(supplierSetting[i].dday)
        tmpArray.push(supplierSetting[i].saturday)
        tmpArray.push(supplierSetting[i].무료배송구분코드)
        tmpArray.push(supplierSetting[i].무료배송기준금액)
        tmpArray.push(supplierSetting[i].배송비)
        array.push(tmpArray)
        // array.push(tmpObj);
        console.log('tmpObj : ',tmpObj)
      }
      
      
      const multipleInsertGoodsTest = await handler.multipleInsert(array, connection)
  
      await db.commit(connection);
      res.status(200).json({result: true});      
  
    }catch(err){
      await db.rollback(connection);
      next(err);
    }
  }
  