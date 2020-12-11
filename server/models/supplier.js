const db = require('../components/db')


module.exports.findOneById = async (suppl_id) => {
    try {
        let query = `SELECT * 
                       FROM supplier 
                      WHERE suppl_id = ? 
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [suppl_id]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        return await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO supplier 
                     SET ?`,
            values: [options]
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try {
        const result = await db.query({
            connection: connection,
            sql: `UPDATE supplier 
                     SET ? 
                   WHERE suppl_idx = ?`,
            values: [options, options.suppl_idx]
        })
        return result;
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM supplier 
                   WHERE suppl_idx = ?`,
            values: [idx]
        })
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
                suppl_id,
                suppl_idx,
                name,
                mgr_name,
                email,
                mgr_mobi,
                cs_phone,
                charged_md,
       company_base_addr,
       company_dets_addr,
             affiliation, //소속지부
              charged_sv,  //담당sv
              suppl_code, //회원코드
                srch_all //전체검색             
            } = options;
    
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
    if(suppl_code){
        whereClause += ` AND suppl_code 
                        = ?`
        values.push(`${suppl_code}`)            
    }
    if(name){
        whereClause += ` AND name 
                        LIKE ?                          
                        `
        values.push(`%${name}%`)            
    }
    if(suppl_id){
        whereClause += ` AND suppl_id
                        = ? `
        values.push(`${suppl_id}`)            
    }
    if(suppl_idx){
        whereClause += ` AND suppl_idx = ?`
        values.push(suppl_idx)            
    }
    if(mgr_name){
        whereClause += ` AND mgr_name
                        = ? `
        values.push(mgr_name)            
    }
    if(email){
        whereClause += ` AND email
                        = ? `
        values.push(email)            
    }
    if(mgr_mobi){
        whereClause += ` AND mgr_mobi
                        = ? `
        values.push(mgr_mobi)            
    }
    if(cs_phone){
        whereClause += ` AND cs_phone
                        = ? `
        values.push(cs_phone)            
    }
    if(charged_md){
        whereClause += ` AND charged_md
                        = ? `
        values.push(charged_md)            
    }
    if(company_base_addr){
        whereClause += ` AND company_base_addr 
                        LIKE ?  `
        values.push(`%${company_base_addr}%`)            
    }
    if(company_dets_addr){
        whereClause += ` AND company_dets_addr 
                        LIKE ?`
        values.push(`%${company_dets_addr}%`)            
    }

    if(srch_all){
        whereClause += ` AND (name
                        LIKE ?
                          OR suppl_id
                        = ? 
                          OR company_base_addr
                        LIKE ? 
                          OR company_dets_addr
                        LIKE ?  
                        )
                        `
        values.push(`%${srch_all}%`)            
        values.push(`%${srch_all}%`)            
        values.push(`%${srch_all}%`)            
        values.push(`%${srch_all}%`)            
        values.push(`%${srch_all}%`)            
        
    }
    

    if(!srch_orderby){
        srch_orderby = 'join_dt'
    } 
    if(!srch_seq){
        srch_seq = 'asc'
    }

    let sql

    if(srch_orderby){
        switch (srch_orderby) {
            case "상품등록수":
                sql = `SELECT COUNT(*) AS total_goods_count, s.*, goods.suppl_code 
                        FROM (
                              SELECT *
                              FROM supplier
                              WHERE 1=1
                              ${whereClause}
                            )s 
                        INNER JOIN goods 
                        ON s.suppl_id = goods.suppl_code
                        `                    
                //srch_orderby = 'total_goods_count'
            break
            case "최근접속일":
                srch_orderby = 'latest_cxn_dt'
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

    srch_orderby === '상품등록수' ? sql :  sql = `SELECT * 
                                                FROM supplier
                                                WHERE 1=1
                                                ${whereClause} 
                                                ${orderClause} 
                                                ${limitClause}`

    console.log('sql : ',sql)
    // return await db.query(sql)
    return await db.query({
        sql: sql, 
        values:values

    })
} catch (err) {
    throw new Error(err)
};
}

module.exports.getListTotal = async (options) => { // condition filter
    try {
        let { 
            term_start_dt, //기간 시작 날짜
              term_end_dt, //기간 종료 날짜
   info_email_rcpt_or_not, //정보메일수신여부
          sms_rcpt_or_not, //문자수신여부
             srch_orderby, //검색기준
                 srch_seq, //검색순서
                 srch_cnt, //검색개수                
                  suppl_id,
                  suppl_idx,
                  name,
                  mgr_name,
                  email,
                  mgr_mobi,
                  cs_phone,
                  charged_md,
         company_base_addr,
         company_dets_addr,
               affiliation, //소속지부
                charged_sv,  //담당sv
                suppl_code, //회원코드
                  srch_all //전체검색             
              } = options;
      
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
      if(suppl_code){
          whereClause += ` AND suppl_code 
                          = ?`
          values.push(`${suppl_code}`)            
      }
      if(name){
          whereClause += ` AND name 
                          LIKE ?                          
                          `
          values.push(`%${name}%`)            
      }
      if(suppl_id){
          whereClause += ` AND suppl_id
                          = ? `
          values.push(`${suppl_id}`)            
      }
      if(suppl_idx){
          whereClause += ` AND suppl_idx = ?`
          values.push(suppl_idx)            
      }
      if(mgr_name){
          whereClause += ` AND mgr_name
                          = ? `
          values.push(mgr_name)            
      }
      if(email){
          whereClause += ` AND email
                          = ? `
          values.push(email)            
      }
      if(mgr_mobi){
          whereClause += ` AND mgr_mobi
                          = ? `
          values.push(mgr_mobi)            
      }
      if(cs_phone){
          whereClause += ` AND cs_phone
                          = ? `
          values.push(cs_phone)            
      }
      if(charged_md){
          whereClause += ` AND charged_md
                          = ? `
          values.push(charged_md)            
      }
      if(company_base_addr){
          whereClause += ` AND company_base_addr 
                          LIKE ?  `
          values.push(`%${company_base_addr}%`)            
      }
      if(company_dets_addr){
          whereClause += ` AND company_dets_addr 
                          LIKE ?`
          values.push(`%${company_dets_addr}%`)            
      }
  
      if(srch_all){
          whereClause += ` AND (name
                          LIKE ?
                            OR suppl_id
                          = ? 
                            OR company_base_addr
                          LIKE ? 
                            OR company_dets_addr
                          LIKE ?  
                          )
                          `
          values.push(`%${srch_all}%`)            
          values.push(`%${srch_all}%`)            
          values.push(`%${srch_all}%`)            
          values.push(`%${srch_all}%`)            
          values.push(`%${srch_all}%`)            
          
      }
      
      if(!srch_orderby){
          srch_orderby = 'join_dt'
      } 
      if(!srch_seq){
          srch_seq = 'asc'
      }

      let sql 

        if(srch_orderby){
            switch (srch_orderby) {
                case "상품등록수":
                    sql = `SELECT COUNT(*) AS total_goods_count, s.*, goods.suppl_code 
                            FROM (
                                SELECT *
                                FROM supplier
                                WHERE 1=1
                                ${whereClause}
                                )s 
                            INNER JOIN goods 
                            ON s.suppl_id = goods.suppl_code
                            `                    
                    srch_orderby = 'total_goods_count'
                break
                case "최근접속일":
                    srch_orderby = 'latest_cxn_dt'
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

        srch_orderby === '상품등록수' ? sql :  sql = `SELECT * 
                                                FROM supplier
                                                WHERE 1=1
                                                ${whereClause} 
                                                `

        console.log('sql : ',sql)
        // return await db.query(sql)
        return await db.query({
            sql: sql, 
            values:values

        })
} catch (err) {
    throw new Error(err)
};
}



module.exports.multipleInsert = async (options, connection) => {
    try{
        
        let sql = `INSERT INTO supplier (suppl_id, email, name, deliv_method_classif_code, today_deliv_dl_time, gen_deliv_dl_time,  
                    sat_deliv_or_not, free_deliv_or_not, free_deliv_base_amt, deliv_amt) 
                    VALUES ?`

        return await db.query({
            connection: connection,
            sql: sql,
            values: [options]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGet = async(options) => {
    try{
        let sql = `SELECT * FROM supplier WHERE suppl_code IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e);
    }
}