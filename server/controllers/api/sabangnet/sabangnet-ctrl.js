'use strict'

const handler = require('./sabangnet-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const JWT = require('../../../libs/jwt/index')
const rootpath = require('app-root-path')
const fs      = require('fs')
const xml2js  = require('xml2js') 
const parser  = new xml2js.Parser()
const axios = require('axios')

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
    const excelTempPath = rootpath+'/server/public/sabangnet/request_example.xml'
    console.log('excelTempPath : ',excelTempPath)
    fs.readFile(excelTempPath, (error, data) => {
        console.log('data1 : ',data)
        console.log('error : ',error)
      parser.parseString(data, (error, template) => {
          console.log('template : ',template)
          // template["SABANG_ORDER_LIST"]["HEADER"][0]["SEND_DATE"   ] = today            // 솔직히 왜 배열로 잡히는지 잘 모르겠다
          // template["SABANG_ORDER_LIST"]["DATA"  ][0]["ORD_ST_DATE" ] = today        
          // template["SABANG_ORDER_LIST"]["DATA"  ][0]["ORD_ED_DATE" ] = today        
          // template["SABANG_ORDER_LIST"]["DATA"  ][0]["ORDER_STATUS"] = order_classif    // 주문완료
          // XML로 변경
          // let builder = new xml2js.Builder()
          // request_xml = builder.buildObject(template)
          // order_list.xml로 저장
          // fs.writeFile(__dirname + '/order_list.xml', request_xml, (err)=>{
          //     if (err) throw err
          //     console.log('order_list.xml has been saved!')
          //     resolve()  // go to next step
          // })
      })
    })

    let base_url = "https://r.sabangnet.co.kr/RTL_API/xml_order_info.html?xml_url=" 
    let url      = base_url + "https://onnuristorage.s3.ap-northeast-2.amazonaws.com/sabangnet/request_example.xml"


    // 사방넷으로 API 콜
    await axios.get(url)
    .then((response)=>{
        console.log('response : ',response)
        // res.status(200).json(response)
        // data = response.data.result
        // console.log('data',data)
        // res.render('pages/banner_edit',{data:data})
    }).catch((err)=>{
        console.log(err)
    })

    // request(url, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         connection.connect(function(err) {
    //             if (err) {
    //                 console.log("온누리 DB에 접속 불가")
    //                 throw err
    //             }
    //             // 사방넷 조회 결과 처리
    //             parser.parseString(body, (error, body_xml) => {   
    //                 let data_list = body_xml["SABANG_ORDER_LIST"]["DATA"]
    //                 console.log('data_list : ',data_list)
    //                 // let query = util.format(
    //                 //     `select *
    //                 //        from rb_shop_order
    //                 //       where d_regis like '%s%'
    //                 //         and naver_p_id is not null 
    //                 //     `, today)
    //                 // // 온누리 DB로 부터 조회일의 사방넷 연동 주문건을 조회한다
    //                 // connection.query(query, function (err, result, fields) {
    //                 //     if (err) throw err
    //                 //     connection.end(function(err) {
    //                 //         console.log("온누리 DB에 접속 종료")
    //                 //         if (err) throw err
    //                 //     })
    //                 // })
    //             })    
    //         })
    //     } else {
    //         console.log("Error "+response.statusCode)
    //     }
    
    // res.status(200).json({result})
  }
  catch(err){
    next(err)
  }
}

module.exports.getShopList = async(req,res,next) => {
  try{
    
    let base_url = "https://r.sabangnet.co.kr/RTL_API/xml_mall_info.html?xml_url=" 
    let url      = base_url + "https://onnuristorage.s3.ap-northeast-2.amazonaws.com/sabangnet/request_shop.xml"


    // 사방넷으로 API 콜
    await axios.get(url)
    .then((response)=>{
        console.log('response : ',response)
        // res.status(200).json(response)
        // data = response.data.result
        // console.log('data',data)
        // res.render('pages/banner_edit',{data:data})
    }).catch((err)=>{
        console.log(err)
    })

    // request(url, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         connection.connect(function(err) {
    //             if (err) {
    //                 console.log("온누리 DB에 접속 불가")
    //                 throw err
    //             }
    //             // 사방넷 조회 결과 처리
    //             parser.parseString(body, (error, body_xml) => {   
    //                 let data_list = body_xml["SABANG_ORDER_LIST"]["DATA"]
    //                 console.log('data_list : ',data_list)
    //                 // let query = util.format(
    //                 //     `select *
    //                 //        from rb_shop_order
    //                 //       where d_regis like '%s%'
    //                 //         and naver_p_id is not null 
    //                 //     `, today)
    //                 // // 온누리 DB로 부터 조회일의 사방넷 연동 주문건을 조회한다
    //                 // connection.query(query, function (err, result, fields) {
    //                 //     if (err) throw err
    //                 //     connection.end(function(err) {
    //                 //         console.log("온누리 DB에 접속 종료")
    //                 //         if (err) throw err
    //                 //     })
    //                 // })
    //             })    
    //         })
    //     } else {
    //         console.log("Error "+response.statusCode)
    //     }
    
    // res.status(200).json({result})
  }
  catch(err){
    next(err)
  }
}