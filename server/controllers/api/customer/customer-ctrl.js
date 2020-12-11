'use strict'

const handler = require('./customer-handler')
const orderHandler = require('../order/order-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const JWT = require('../../../libs/jwt/index')
const axios = require('axios')

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newUser = req.options
    
    const user = await handler.findOneById(newUser.cust_id)
    if (user) {
      throw { status: 409, errorMessage: 'Duplicate id' }
    }

    // console.log("newAcademy : ",newUser);
    const hashPw = crypto.createMD5Hash(newUser.password)
    // const {salt, encodedPw} = crypto.createPasswordPbkdf2(newUser.password)
    // console.log('salt length : ',salt.length)
    // console.log('encodedPw length : ',encodedPw.length)
    // newUser.salt = salt
    newUser.password = hashPw
    newUser.first_create_dt_time = util.getCurrentTime();
    newUser.join_dt = util.getCurrentTime();
    const insertId = await handler.insert(newUser, connection)

    // console.log('insertId : ',insertId)
    const tokens = await JWT.createToken({idx: insertId, id: newUser.cust_id})
    // console.log("tokens : ",tokens)
    newUser.token = tokens.accessToken
    console.log('token.length : ', tokens.accessToken.length)
    newUser.cust_idx = insertId
    console.log("newUser : ",newUser)
    const updateResult = await handler.update(newUser, connection)

    await db.commit(connection)
    res.status(200).json({ result:true })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.signIn = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newUser = req.options
    const user = await handler.findOneById(newUser.cust_id)
    if (!user) {
      throw { status: 404, errorMessage: 'User not found' }
    }

    // const encodedPw = crypto.getPasswordPbkdf2(newUser.password, user.salt)
    const hashPw = crypto.createMD5Hash(newUser.password)
    
    if (user.password === hashPw) { 
        console.log('Authentication succeed')           
    } else {
        throw {status: 401, errorMessage: 'Authentication failed'}
    }

    const tokens = await JWT.createToken({idx: user.cust_idx, id: user.id})
    console.log('tokens:', tokens)
    newUser.token = tokens.accessToken
    newUser.cust_idx = user.cust_idx
    console.log("newUser : ",newUser)
    //const updateResult = await handler.update({options:{token:tokens.accessToken}, cust_idx:user.cust_idx}, connection)
    const updateResult = await handler.update(newUser, connection)

    const result2 = await handler.findOneById(newUser.cust_id)
    // console.log('result2 : ',result2)
    delete result2.password
    delete result2.salt
    delete result2.token
    await db.commit(connection)
    res.status(200).json({ result:result2 })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let newUser = req.options
        let newOrder = {}
        let total_pur_cnt = newUser.total_pur_cnt
        let total_pur_amt = newUser.total_pur_amt
        console.log('newUser : ',newUser)
        const user = await handler.findOneByIdx(newUser.cust_idx)
        console.log("user : ", user)
        if (!user) {
            throw { status: 404, errorMessage: 'User not found' }
        }

        newUser.last_mod_dt_time = util.getCurrentTime();
        if(newUser.password){
          const hashPw = crypto.createMD5Hash(newUser.password)
          newUser.password = hashPw
        }

        delete newUser.total_pur_cnt
        delete newUser.total_pur_amt
        const result = await handler.update(newUser, connection)
        if (result === 0) throw { status: 404, errorMessage: 'Not found User' }

        const getOrderId = await orderHandler.getList({cust_id: newUser.cust_id})
        console.log("getOrderId:", getOrderId)
        newOrder.pur_cnt = total_pur_cnt
        newOrder.pur_amt = total_pur_amt
        newOrder.order_idx = getOrderId[0].order_idx
        console.log('newOrder:', newOrder)
        const orderResult = await orderHandler.update(newOrder, connection)

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
    const result = await handler.delete({ idx: req.options.cust_idx }, connection)
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
    console.log('params',params)
    const result = await handler.getList(params)
    const total = await handler.getListTotal(params)
    const query = req.query
    const pagenation = util.makePageData(total,req.options.page,req.options.srch_cnt)

    res.status(200).json({result,pagenation,query})    
  }
  catch (err) {
    next(err)
  }
}