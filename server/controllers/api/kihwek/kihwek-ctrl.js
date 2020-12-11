'use strict'

const handler = require('./kihwek-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const goodsHandler = require('../goods/goods-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newUser = req.options
    const user = await handler.findOneByEmail(newUser.EMAIL)
    console.log("user : ", user)
    if (user) {
      throw { status: 409, errorMessage: 'Duplicate Email' }
    }

    // console.log("newAcademy : ",newUser);
    const result = await handler.insert(newUser, connection)

    await db.commit(connection)
    res.status(200).json({ c: result })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    let newAcademy = req.options
    const academy = await handler.findOneById(newAcademy.id)
    console.log("academy : ", academy)
    if (!academy) {
      throw { status: 404, errorMessage: 'Academy not found' }
    }

    newAcademy.updateDate = util.getCurrentTime();
    newAcademy.idx = academy.idx;
    console.log("newAcademy : ", newAcademy)

    const result = await handler.update(newAcademy, connection)
    if (result === 0) throw { status: 404, errorMessage: 'Not found Academy' }

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
    const result = await handler.delete({ idx: req.options.idx }, connection)
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

    const result = await handler.getList()
    for (let i=0;i<result.length;i++){
      const goodsIdx = result[i].GOODS_IDX
      // console.log('goodsIdx : ',goodsIdx)
      const goodsIdxArray = goodsIdx.split(",")
      // console.log('goodsIdxArray : ',goodsIdxArray)
      result[i].goods = []
      for (let j=0;j<goodsIdxArray.length;j++){
        const goods = await goodsHandler.getList({idx:goodsIdxArray[j]})
        result[i].goods.push(goods)
      }


    }
    // const result = await fake.getBanner()
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

