'use strict'

const handler = require('./mbr-rank-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const JWT = require('../../../libs/jwt/index')

module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const newMbrRank = req.options
        const mbrRank = await handler.findOneByName(newMbrRank.name)
        if (mbrRank) {
            throw { status: 409, errorMessage: 'Duplicate mbrRank' }
        }
        await handler.insert(newMbrRank, connection)
        await db.commit(connection)
        res.status(200).json({ result:true })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let newMbrRank = req.options
        console.log('newMbrRank : ',newMbrRank)
        
        await handler.multipleUpdate(newMbrRank, connection)        
        await db.commit(connection)
        res.status(200).json({ result: true })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

module.exports.getList = async (req, res, next) => {
    try {
        const params = req.options
        const query = req.query
        const result = await handler.getList(params)
        const total = await handler.getListTotal(params);
        console.log('total:', total);
        const pagenation = util.makePageData(total, params.page, params.srch_cnt);

        res.status(200).json({result, pagenation, query})
    } catch (err) {
        next(err)
    }
}

module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
        const result = await handler.delete({idx: req.options.idx}, connection)
        let returnValue = false
        if(result.affectedRows === 1){
            returnValue = true
        }

        await db.commit(connection);
        res.status(200).json({result: returnValue});
    }catch(err){
        next(err)
    }
}