'use strict'

const handler = require('./admin-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const JWT = require('../../../libs/jwt/index')

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newUser = req.options
    const user = await handler.getUserById(newUser.id)
    if (user) {
      throw { status: 409, errorMessage: 'Duplicate id' }
    }

    // console.log("newAcademy : ",newUser);
    const hashPw = crypto.createMD5Hash(newUser.password)
    // newUser.salt = salt
    newUser.password = hashPw
    newUser.first_create_dt_time = util.getCurrentTime();
    newUser.join_dt = util.getCurrentTime();
    const insertId = await handler.insert(newUser, connection)


    console.log('insertId : ',insertId)
    const tokens = await JWT.createToken({admin_idx: insertId, admin_id: newUser.admin_id})
    console.log("tokens : ",tokens)
    newUser.token = tokens.accessToken
    newUser.admin_idx = insertId
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
  console.log('signIn')
  try {
    console.log(req.options)
    const {admin_id, password} = req.body
    let user = await handler.getUserById(admin_id)
    console.log('user : ',user)
    if (!user) {
      throw {status: 404, errorMessage: 'User not found'}
    }
    
    const hashPw = crypto.createMD5Hash(password)
    console.log('userpas',user.password)
    console.log('hashpw',hashPw)
    if (user.password === hashPw) { 
        console.log('Authentication succeed')           
    } else {
        throw {status: 401, errorMessage: 'Authentication failed'}
    }
    // console.log('user : ',user)
    delete user.password
    res.status(200).json({...user})
  }
  catch (err) {
    next(err)
  }
}

module.exports.getList = async(req,res,next) => {
  try{
    
    const params = req.options
    const result = await handler.getList(params)
    if(!result)
      throw{status:400,errorMessage:'User not found'}
    res.status(200).json({result})
  }
  catch(err){
    next(err)
  }
}