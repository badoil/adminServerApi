'use strict'

const tableCustQryCountListModel = require('../../../../models/v2/tableCustQryCountList')
const db = require('../../../../components/db')
const crypto = require('../../../../components/crypto')
const util = require('../../../../components/util')

module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const newTable = req.options
  
        newTable.first_create_dt_time = util.getCurrentTime();
        const result = await tableCustQryCountListModel.insert(newTable, connection)
      
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
        let newTable = req.options
        console.log("newTable:", newTable)
        const table = await tableCustQryCountListModel.findOneByIdx(newTable.idx)
        console.log('table:', table)
        if (!table) {
            throw { status: 409, errorMessage: 'Table not found' }
        }
        newTable.last_mod_dt_time = util.getCurrentTime();
        newTable.idx = table.idx
        console.log("newTable:", newTable)
        
        const result = await tableCustQryCountListModel.update(newTable, connection);
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
        const params = req.options
        console.log("params:", params)
        const result = await tableCustQryCountListModel.delete(params.idx, connection)
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

    const result = await tableCustQryCountListModel.getList(params)
    
    res.status(200).json({ result })
  }
  catch (err) {
    next(err)
  }
}