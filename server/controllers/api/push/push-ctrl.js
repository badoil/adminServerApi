'use strict'

const handler = require('./push-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    let newPush = req.options
    newPush.registerDate = util.getCurrentTime()
    const result = await handler.insert(newPush, connection)

    await db.commit(connection)
    res.status(200).json({push: result})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    
    const result = await handler.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

