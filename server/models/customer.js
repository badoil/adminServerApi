const db = require('../components/db')
const point = require('./point')

module.exports.findOneById = async (cust_id) => {
    try {
        let query = `SELECT * 
                       FROM customer 
                      WHERE cust_id = ? 
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [cust_id]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.findOneByIdx = async (cust_idx) => {
    try {
        let query = `SELECT * 
                       FROM customer 
                      WHERE cust_idx = ? 
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [cust_idx]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}


module.exports.getList = async (options) => { // condition filter
        try {
        let { 
              term_start_dt, //기간 시작 날짜
                term_end_dt, //기간 종료 날짜
     info_email_rcpt_or_not, //정보메일수신여부
            sms_rcpt_or_not, //문자수신여부
               srch_orderby, //검색기준
                   srch_seq, //검색순서
                   srch_cnt, //검색개수
                    srch_kw, //검색키워드
                affiliation, 
                  charged_sv,
               mbr_rank_name, //회원등급
                       point, //포인트
                     cust_id,
                        name, 
                        email,
                   base_addr,
                   dets_addr, 
                   cust_idx,         
                } = options;
        console.log("options:", options)
        console.log("info_email_rcpt_or_not:", info_email_rcpt_or_not)

        // let sql = `SELECT *
        //             FROM customer`
        

        let whereClause = ``
        let values = []
        let orderClause = ``
        let limitClause = ``

        if(term_start_dt){
            whereClause += ` AND DATE(join_dt) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(join_dt) <= ?`
            values.push(term_end_dt)
        }
        if(affiliation !== undefined){
            whereClause += ` AND customer.affiliation = ?`
            values.push(affiliation)
        }
        if(charged_sv !== undefined){
            whereClause += ` AND customer.charged_sv = ?`
            values.push(charged_sv)
        }
        if(info_email_rcpt_or_not !== undefined){
            console.log("email")
            whereClause += ` AND customer.info_email_rcpt_or_not = ?`
            values.push(info_email_rcpt_or_not)
        }
        if(sms_rcpt_or_not !== undefined){
            whereClause += ` AND customer.sms_rcpt_or_not = ?`
            values.push(sms_rcpt_or_not)
        }
        if(name){
            whereClause += ` AND customer.name 
                            LIKE ?
                            `
            values.push(`%${name}%`)            
        }
        if(email){
            whereClause += ` AND customer.email 
                            LIKE ?
                            `
            values.push(`%${email}%`)            
        }
        // if(phar_name){
        //     whereClause += ` AND phar_name 
        //                     LIKE ?`
        //     values.push(`%${phar_name}%`)            
        // }
        if(cust_id){
            whereClause += ` AND customer.cust_id
                            LIKE ? `
            values.push(`%${cust_id}%`)            
        }
        if(base_addr){
            whereClause += ` AND customer.base_addr 
                            LIKE ?  `
            values.push(`%${base_addr}%`)            
        }
        if(dets_addr){
            whereClause += ` AND customer.dets_addr 
                            LIKE ?`
            values.push(`%${dets_addr}%`)            
        }
        if(cust_idx){
            whereClause += ` AND customer.cust_idx 
                            = ?`
            values.push(`${cust_idx}`)            
        }

        if(!srch_orderby){
            srch_orderby = 'customer.join_dt'
        } 
        if(!srch_seq){
            srch_seq = 'asc'
        }
        
        let sql = `SELECT customer.*, dd.cust_idx as delivCustIdx, dd.deliv_dest_idx, dd.deliv_dest_name,
                            dd.dflt_deliv_dest_or_not, dd.rcpt_name, dd.rcpt_mobi, dd.rcpt_phone, dd.rcpt_email,
                            dd.rcpt_zip_code, dd.rcpt_base_addr, dd.rcpt_dets_addr
                     FROM customer
                     LEFT JOIN delivery_destination AS dd
                     ON customer.cust_idx = dd.cust_idx
                     ` 

        //console.log('sql : ',sql)
        if(srch_orderby){
            switch (srch_orderby) {
                case "보유포인트":
                    sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                    whereClause += ` AND point.used_cat = 1 AND point.point_cat = 1`
                    srch_orderby = 'point.amt'
            
                break
                case "사용포인트":
                    sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                    whereClause += ` AND point.used_cat = 2 AND point.point_cat = 1`
                    srch_orderby = 'point.amt'

                break
                case "보유적립금":
                    sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                    whereClause += ` AND point.used_cat = 1 AND point.point_cat = 2`
                    srch_orderby = 'point.amt'
                break
                case "사용적립금":
                    sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                    whereClause += ` AND point.used_cat = 2 AND point.point_cat = 2`
                    srch_orderby = 'point.amt'
                break
                case "보유예치금":
                    sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                    whereClause += ` AND point.used_cat = 1 AND point.point_cat = 3`
                    srch_orderby = 'point.amt'
                break
                case "사용예치금":
                    sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                    whereClause += ` AND point.used_cat = 2 AND point.point_cat = 3`
                    srch_orderby = 'point.amt'
                break
            }
        }
        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`

        let page = options.page
        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }

               

        console.log('sql : ',sql)
        // return await db.query(sql)
        return await db.query({
            sql: sql + ` WHERE 1=1
                        ${whereClause}
                        ${orderClause}
                        ${limitClause}`
            , values:values

        })
    } catch (err) {
        throw new Error(err)
    };
}

module.exports.getListTotal = async(options) => {
    try {
        let { 
            term_start_dt, //기간 시작 날짜
              term_end_dt, //기간 종료 날짜
   info_email_rcpt_or_not, //정보메일수신여부
          sms_rcpt_or_not, //문자수신여부
             srch_orderby, //검색기준
                 srch_seq, //검색순서
                 srch_cnt, //검색개수
                  srch_kw, //검색키워드
              affiliation, 
                charged_sv,
             mbr_rank_name, //회원등급
                     point, //포인트
                   cust_id,
                      name,
                      email, 
                 phar_name,
                 base_addr,
                 dets_addr, 
                 cust_idx,         
              } = options;
      let sql = `SELECT COUNT(*) as total
                    FROM customer`
      let whereClause = ``
      let values = []
      let orderClause = ``
      let limitClause = ``

      if(term_start_dt){
          whereClause += ` AND DATE(join_dt) >= ?`
          values.push(term_start_dt)
      }
      if(term_end_dt){
          whereClause += ` AND DATE(join_dt) <= ?`
          values.push(term_end_dt)
      }
      if(affiliation !== undefined){
          whereClause += ` AND affiliation = ?`
          values.push(affiliation)
      }
      if(charged_sv !== undefined){
          whereClause += ` AND charged_sv = `
          values.push(charged_sv)
      }
      if(info_email_rcpt_or_not){
          whereClause += ` AND info_email_rcpt_or_not = ?`
          values.push(info_email_rcpt_or_not)
      }
      if(sms_rcpt_or_not){
          whereClause += ` AND sms_rcpt_or_not = ?`
          values.push(sms_rcpt_or_not)
      }
      if(name){
          whereClause += ` AND name 
                          LIKE ?
                          `
          values.push(`%${name}%`)            
      }
      if(email){
        whereClause += ` AND email 
                        LIKE ?
                        `
        values.push(`%${email}%`)            
    }
    //   if(phar_name){
    //       whereClause += ` AND phar_name 
    //                       LIKE ?`
    //       values.push(`%${phar_name}%`)            
    //   }
      if(cust_id){
          whereClause += ` AND cust_id
                          LIKE ? `
          values.push(`%${cust_id}%`)            
      }
      if(base_addr){
          whereClause += ` AND base_addr 
                          LIKE ?  `
          values.push(`%${base_addr}%`)            
      }
      if(dets_addr){
          whereClause += ` AND dets_addr 
                          LIKE ?`
          values.push(`%${dets_addr}%`)            
      }

      if(cust_idx){
        whereClause += ` AND cust_idx 
                        = ?`
        values.push(`${cust_idx}`)            
        }
      if(!srch_orderby){
          srch_orderby = 'join_dt'
      } 
      if(!srch_seq){
          srch_seq = 'asc'
      }

      console.log('sql : ',sql)
      if(srch_orderby){
          switch (srch_orderby) {
              case "보유포인트":
                  sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                  whereClause += ` AND point.used_cat = 1 AND point.point_cat = 1`
                  srch_orderby = 'point.amt'
          
              break
              case "사용포인트":
                  sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                  whereClause += ` AND point.used_cat = 2 AND point.point_cat = 1`
                  srch_orderby = 'point.amt'

              break
              case "보유적립금":
                  sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                  whereClause += ` AND point.used_cat = 1 AND point.point_cat = 2`
                  srch_orderby = 'point.amt'
              break
              case "사용적립금":
                  sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                  whereClause += ` AND point.used_cat = 2 AND point.point_cat = 2`
                  srch_orderby = 'point.amt'
              break
              case "보유예치금":
                  sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                  whereClause += ` AND point.used_cat = 1 AND point.point_cat = 3`
                  srch_orderby = 'point.amt'
              break
              case "사용예치금":
                  sql += ` INNER JOIN point ON customer.cust_idx = point.cust_idx`                    
                  whereClause += ` AND point.used_cat = 2 AND point.point_cat = 3`
                  srch_orderby = 'point.amt'
              break
          }
      }
      orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`
      
      console.log('sql : ',sql)
      let page = options.page
      if (!page || page < 0) {
          page = 1
      }
      let offset = (page - 1) * srch_cnt

      if (srch_cnt) {
          limitClause = ` LIMIT ${offset}, ${srch_cnt}`
      } else {
          limitClause = ``
      }
        console.log('sql : ',sql)
        // return await db.query(sql)
        return await db.query({
            sql: sql + ` WHERE 1=1
                        ${whereClause}
                        `
            , values:values

        })
    } catch (err) {
        throw new Error(err)
    };
}
module.exports.insert = async (options, connection) => {
    try {
        const { insertId } = await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO customer 
                     SET ?`,
            values: [options]
        })
        return insertId
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try {
        const { affectedRows } = await db.query({
            connection: connection,
            sql: `UPDATE customer 
                     SET ? 
                   WHERE cust_idx = ?`,
            values: [options, options.cust_idx]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (cust_idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM customer 
                   WHERE cust_idx = ?`,
            values: [cust_idx]
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getListByIdx = async (cust_idx) => {
    try{
        let sql = `SELECT * 
                   FROM customer 
                   WHERE cust_idx = ? 
                   `
        const result = await db.query({
            sql,
            values: [cust_idx]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};