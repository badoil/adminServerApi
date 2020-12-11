'use strict'

const handler = require('./pharmacy-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const JWT = require('../../../libs/jwt/index')

module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
      const newPharmUser = req.options
      const user = await handler.findOneById(newPharmUser.phar_id)
      if (user) {
        throw { status: 409, errorMessage: 'Duplicate id' }
      }

      newPharmUser.first_create_dt_time = util.getCurrentTime();
      newPharmUser.join_dt = util.getCurrentTime();
      const hashPw = crypto.createMD5Hash(newPharmUser.password)
      newPharmUser.password = hashPw
    
      const insertId = await handler.insert(newPharmUser, connection)

      // console.log('insertId : ',insertId)
      const tokens = await JWT.createToken({idx: insertId, id: newPharmUser.phar_id})
      // console.log("tokens : ",tokens)
      newPharmUser.token = tokens.accessToken
      console.log('token.length : ', tokens.accessToken.length)
      newPharmUser.phar_idx = insertId
      console.log("newUser : ",newPharmUser)
      const updateResult = await handler.update(newPharmUser, connection)

      await db.commit(connection)
      res.status(200).json({ result:true })
    }
    catch (err) {
      await db.rollback(connection)
      next(err)
    }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    let newPharmUser = req.options
    const pharmacy = await handler.findOneByIdx(newPharmUser.phar_idx)
    console.log("user : ", pharmacy)
    if (!pharmacy) {
      throw { status: 404, errorMessage: 'User not found' }
    }

    newPharmUser.last_mod_dt_time = util.getCurrentTime();
    newPharmUser.phar_idx = pharmacy.phar_idx;
    const hashPw = crypto.createMD5Hash(newPharmUser.password)
    newPharmUser.password = hashPw
    
    console.log("newUser : ", newPharmUser)

    const result = await handler.update(newPharmUser, connection)
    if (result === 0) throw { status: 404, errorMessage: 'Not found User' }

    await db.commit(connection)
    res.status(200).json({ result: true })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const result = await handler.delete({ idx: req.options.phar_idx }, connection)
        await db.commit(connection)
        let returnValue = false;
        if (result.affectedRows === 1) {
            returnValue = true
        }
        res.status(200).json({ result: returnValue })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

module.exports.getList = async (req, res, next) => {
    try {
        const params = req.options

        const result = await handler.getList(params)
        const total = await handler.getListTotal(params)
        const query = req.query
        const pagenation = util.makePageData(total,req.options.page,req.options.srch_cnt)
        
        res.status(200).json({result,query,pagenation})
    } catch (err) {
        next(err)
    }
}

