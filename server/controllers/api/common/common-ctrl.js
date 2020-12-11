'use strict'
const s3 = require('../../../components/s3')
const uuid = require('uuid/v4')
const config = require('../../../config')
const db = require('../../../components/db')
const util = require('../../../components/util')
// const axios = require('axios')
var mime = require('mime-types')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'https://7ca8bf5396474208ae836fd6d65b9190.ap-northeast-1.aws.found.io:9243' 
                          , auth: {
                                username: 'elastic',
                                password: 'KSAVTnP3hnnHgOT8qU0HcXbB'
                            }
})


// const sendMobileText = require('../../../components/sendMobileText')

// const hangjeongdong = require('../../../components/json/hangjeongdong.json')

module.exports.getImageUrl = async (req, res, next) => {
  try {
    console.log('getUserImageUrl : ', req.options)
    const {mimetype, idType, id, extension, filename} = req.options
    console.log('mimetype : ',mimetype)
    let path =`images/cloi.jpg`
    let finalFile = `${filename}.${extension}`;
    // let path = `test.png`
    const url = s3.generatePreSignedUrl({
      key: path,
      mimetype: mimetype
    })
    console.log('cloi.jpg')
    // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
    res.status(200).json({url, path})
  }
  catch (err) {
    next(err)
  }
}

module.exports.authNumSend = async(req,res,next) => {
  try{
    const receiver = req.options.receiver
    // const message = req.options.message

    let firstNum = Math.ceil(Math.random(9)*10)
    if(firstNum>9)
      firstNum -= 1 
    
    const min = Math.ceil(100)
    const max = Math.floor(1000)
    const rest = Math.ceil(Math.random() * (max - min) + min)
    
    const authNum = String(firstNum)+String(rest)

    const AuthData = {
      key: config.alligo.key,
    // 이곳에 발급받으신 api key를 입력하세요
      user_id: config.alligo.user_id,
    // 이곳에 userid를 입력하세요
    }
    req.body = {
      sender: config.alligo.sender,  // (최대 16bytes)
      receiver: receiver, // 컴마()분기 입력으로 최대 1천명
      msg: `인증번호는 ${authNum} 입니다`	// (1~2,000Byte)
    }
    
    if(process.env.NODE_ENV === 'development'){
      aligoapi.send(req,AuthData)
      .then((r)=>{
        console.log('alligo',r)
        res.status(200).json({result:authNum})
      })
      .catch((e)=>{
        console.error('err',e)
        res.status(200).send(e)
      })
    }else{
      // console.log(2)
      res.status(200).json({result:authNum})
    }
    
  }
  catch(err){
    next(err)
  }
}



module.exports.search = async(req,res,next) => {
  try{
    const srch_kw = req.options.srch_kw
    // const message = req.options.message
    console.log('srch_kw : ',srch_kw)
    client.index({
      index: 'search_keyword_test'
      ,body: {
            "srch_kw"           : srch_kw
          , "timestamp"         : util.getCurrentTime()
          , "cust_idx"          : ""
          , "sex"               : ""
          , "ovs_resint_or_not" : ""
          , "age"               : ""
          , "zipcode"           : ""
      }
    }, (err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.status(200).json(result)
    })
    
  }
  catch(err){
    next(err)
  }
}