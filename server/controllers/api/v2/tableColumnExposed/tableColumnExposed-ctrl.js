'use strict'

//const handler = require('./tableColumnExposed-handler')
const tableColumnExposedModel = require('../../../../models/v2/tableColumnExposed')

const db = require('../../../../components/db')
const crypto = require('../../../../components/crypto')
const util = require('../../../../components/util')

module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const newTable = req.options
        const table = await tableColumnExposedModel.findOneByIdxColumn(newTable)
        if (table) {
            throw { status: 409, errorMessage: 'Duplicate exposed column' }
        }
        const getResult = await tableColumnExposedModel.getList({cust_idx: newTable.cust_idx, tbl_idx: newTable.tbl_idx})
        const idxArray = getResult.map(item => item.idx)
        if(idxArray.length !== 0){
          const deleteResult = await tableColumnExposedModel.multipleDelete(idxArray)
          console.log("deleteResult:", deleteResult)
        }
        
        let newTableArray = []
        for(let k=0; k<newTable.column_list.length; k++){
          let tempNewTableArray = []
          
          let cust_idx = newTable.cust_idx
          let tbl_idx = newTable.tbl_idx
          let tbl_column_idx = newTable.column_list[k].tbl_column_idx
          let fix = newTable.column_list[k].fix
          let first_create_dt_time = util.getCurrentTime()

          tempNewTableArray.push(cust_idx)
          tempNewTableArray.push(tbl_idx)
          tempNewTableArray.push(tbl_column_idx)
          tempNewTableArray.push(fix)
          tempNewTableArray.push(first_create_dt_time)

          newTableArray.push(tempNewTableArray)
        }

        console.log("newTableArray:", newTableArray)
        const result = await tableColumnExposedModel.multipleInsert(newTableArray, connection)
  
        // newTable.first_create_dt_time = util.getCurrentTime();
        // const result = await handler.insert(newTable, connection)
      
        await db.commit(connection)
        res.status(200).json({ result:result })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
  }

module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const params = req.options
        console.log("params:", params)
        const result = await tableColumnExposedModel.delete(params.idx, connection)
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

    const result = await tableColumnExposedModel.getList(params)
    
    res.status(200).json({ result })
  }
  catch (err) {
    next(err)
  }
}