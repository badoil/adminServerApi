'use strict'

const handler = require('./representative_category-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')
const fs = require('fs')
const XLSX = require('xlsx')
const rootpath = require('app-root-path')



module.exports.insertExcel = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    console.log('rootpath : ',rootpath)
    
    const excelTempPath = rootpath+'/server/public/category_list.xlsx'
    var workbook = XLSX.readFile(excelTempPath);
        // console.log('workbook : ',workbook.path)
        
      // util.getExposedCategory()
        // let data = util.ExcelFileReader(workbook, {sheetName: 'database',startCol:'A',startRow:2, columnCount:24,startNotNullCol:'A'});
    let data = util.ExcelFileReader(workbook, {sheetName: '대표카테고리',startCol:'H',startRow:8, columnCount:9,startNotNullCol:'H'});
    
    // data.map(item => item.first_create_dt_time = util.getCurrentTime())
    // data.map( subarray => subarray.map( item => item.first_create_dt_time = util.getCurrentTime() ));
    console.log('data : ',data)
    const multipleInsertCateogory = await handler.multipleInsert(data, connection)
    console.log('multipleInsertCateogory', multipleInsertCateogory)    
    await db.commit(connection);
    res.status(200).json(data);

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}



module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      const mainExhibition = req.options;

      mainExhibition.first_create_dt_time = util.getCurrentTime();
      const result = await handler.insert(mainExhibition, connection);
      await db.commit(connection);
      res.status(200).json(result);

    }catch(e){
      await db.rollback(connection);
      next(e);
    }
}

// module.exports.update = async (req, res, next) => {
//     const connection = await db.beginTransaction();
//     try{
//       let mainExhibition = req.options;
//       console.log('hotDeal:', mainExhibition);
//       const mainExhibitionResult = await handler.findOneByIdx(mainExhibition.exhib_idx);
//       if(mainExhibitionResult.length === 0){
//         throw{ status: 404, errorMessage: 'hotDeal not found'};
//       }
//       mainExhibition.last_mod_dt_time = util.getCurrentTime();
//       mainExhibition.exhib_id = mainExhibitionResult[0].exhib_id;
//       delete mainExhibition.exhib_idx

//       const result = await handler.update(mainExhibition, connection);
//       console.log('updateResult: ', result.affectedRows);
//       if(result.affectedRows === 0){
//         throw{ status: 404, errorMessage: "updating failed"};
//       }
//       await db.commit(connection);
//       res.status(200).json({ result: true });
  
//     }catch(e){
//       await db.rollback(connection);
//       next(e);
//     }
// }

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const mainExhibition = req.options
    const exhibitions = mainExhibition.exhibitions
    console.log('mainExhibition:', mainExhibition)
    exhibitions.map(item => item.last_mod_dt_time = util.getCurrentTime())
    exhibitions.map(item => delete item.first_create_dt_time);
    const result = await handler.multipleUpdate(mainExhibition, connection);

    await db.commit(connection);
    res.status(200).json({result: true})


  }
  catch(e){
    await db.rollback(connection);
    next(e);
  }
}
  
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const params = req.options
    console.log('params:', params);
  
    const result = await handler.multipleDelete(params, connection)
    let returnValue = false
    if(result.affectedRows !== 0){
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
    const params = req.options
    console.log('params:', params)

    const result = await handler.getList(params)

    return res.status(200).json({lists: result});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}

module.exports.multipleInsert = async (req, res, next) => {
  let connection = await db.beginTransaction();
  try{
    const newCategories = req.options.category
    let categoryArray = [];
    console.log('newCategories : ',newCategories)
    newCategories.map(item => item.first_create_dt_time = util.getCurrentTime())
    const multipleInsertCateogory = await handler.multipleInsert(newCategories, connection)
    console.log('multipleInsertCateogory', multipleInsertCateogory)

      await db.commit(connection);
      res.status(200).json({result: true});

  }catch(err){
    await db.rollback(connection);
    next(err);
  }
}