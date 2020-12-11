const db = require('../components/db')

module.exports.findOneByIdx = async (phar_idx) => {
    try {
        let query = `SELECT * 
                       FROM pharmacy 
                      WHERE phar_idx = ? 
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [phar_idx]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.findOneById = async (phar_id) => {
    try {
        let query = `SELECT * 
                       FROM pharmacy 
                      WHERE phar_id = ? 
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [phar_id]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        const { insertId } = await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO pharmacy 
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
            sql: `UPDATE pharmacy 
                     SET ? 
                   WHERE phar_idx = ?`,
            values: [options, options.phar_idx]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (phar_idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM pharmacy 
                   WHERE phar_idx = ?`,
            values: [phar_idx]
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
           mbr_rank_name, //회원등급
                   point, //포인트
                 phar_id,
                phar_idx,
                    name, 
          phar_base_addr,
          phar_dets_addr,
                mbr_code, //회원코드
                srch_all, //전체검색
             affiliation, //소속지부
              charged_sv  //담당sv         
            } = options;
    let sql = `SELECT pharmacy.*, affiliation.name as affi_name
                 FROM pharmacy
                 INNER JOIN affiliation ON pharmacy.affiliation = affiliation.aff_idx`
                 

    let whereClause = ``
    let values = []
    let orderClause = ``
    let limitClause = ``

    if(term_start_dt){
        whereClause += ` AND DATE(pharmacy.join_dt) >= ?`
        values.push(term_start_dt)
    }
    if(term_end_dt){
        whereClause += ` AND DATE(pharmacy.join_dt) <= ?`
        values.push(term_end_dt)
    }
    if(affiliation !== undefined){
        whereClause += ` AND affiliation = ?`
        values.push(affiliation)
    }
    if(charged_sv !== undefined){
        whereClause += ` AND charged_sv = ?`
        values.push(charged_sv)
    }
    // if(info_email_rcpt_or_not !== undefined){
    //     whereClause += ` AND info_email_rcpt_or_not = ?`
    //     values.push(info_email_rcpt_or_not)
    // }
    // if(sms_rcpt_or_not !== undefined){
    //     whereClause += ` AND sms_rcpt_or_not = ?`
    //     values.push(sms_rcpt_or_not)
    // }
    if(name){
        console.log('name')
        whereClause += ` AND pharmacy.name 
                        LIKE ?
                        `
        values.push(`%${name}%`)            
    }
    if(phar_id){
        console.log('phar_id')
        whereClause += ` AND phar_id
                        LIKE ? `
        values.push(`%${phar_id}%`)            
    }
    if(phar_idx){
        console.log('phar_idx')
        whereClause += ` AND pharmacy.phar_idx = ? `
        values.push(`${phar_idx}`)            
    }
    if(phar_base_addr){
        whereClause += ` AND phar_base_addr 
                        LIKE ?  `
        values.push(`%${phar_base_addr}%`)            
    }
    if(phar_dets_addr){
        whereClause += ` AND phar_dets_addr 
                        LIKE ?`
        values.push(`%${phar_dets_addr}%`)            
    }
    if(mbr_code){
        whereClause += ` AND mbr_code 
                        LIKE ?`
        values.push(`%${mbr_code}%`)            
    }
    if(srch_all){
        whereClause += ` AND (pharmacy.phar_dets_addr 
                        LIKE ?
                          OR pharmacy.name
                        LIKE ?
                          OR pharmacy.phar_id
                        LIKE ? 
                          OR pharmacy.phar_base_addr
                        LIKE ?  
                          OR pharmacy.mbr_code
                        LIKE ? 
                        )
                         `  //OR phar_dets_addr
                        // LIKE ?
        values.push(`%${srch_all}%`)            
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
    if(affiliation){
        // sql += ` INNER JOIN affiliation as affi ON pharmacy.affiliation = affi.aff_idx`                            
        whereClause += ` AND affiliation = ?`
        values.push(affiliation)
    }
    if(charged_sv){
        // sql += ` AND INNER JOIN charged_sv ON pharmacy.charged_sv = charged_sv.name`                            
        whereClause += ` AND charged_sv = ?`
        values.push(charged_sv)
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
                    ${orderClause}
                    ${limitClause}`
        , values:values

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
           mbr_rank_name, //회원등급
                   point, //포인트
                 phar_id,
                phar_idx,
                    name, 
          phar_base_addr,
          phar_dets_addr,
                mbr_code, //회원코드
                srch_all, //전체검색
             affiliation, //소속지부
              charged_sv  //담당sv         
            } = options;
    let sql = `SELECT COUNT(*) as total 
                 FROM pharmacy`
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
        whereClause += ` AND charged_sv = ?`
        values.push(charged_sv)
    }
    if(info_email_rcpt_or_not !== undefined){
        whereClause += ` AND info_email_rcpt_or_not = ?`
        values.push(info_email_rcpt_or_not)
    }
    if(sms_rcpt_or_not !== undefined){
        whereClause += ` AND sms_rcpt_or_not = ?`
        values.push(sms_rcpt_or_not)
    }
    if(name){
        whereClause += ` AND name 
                        LIKE ?
                        `
        values.push(`%${name}%`)            
    }
    if(phar_id){
        whereClause += ` AND phar_id
                        LIKE ? `
        values.push(`%${phar_id}%`)            
    }
    if(phar_idx){
        whereClause += ` AND phar_idx
                        = ? `
        values.push(`${phar_idx}`)            
    }
    if(phar_base_addr){
        whereClause += ` AND phar_base_addr 
                        LIKE ?  `
        values.push(`%${phar_base_addr}%`)            
    }
    if(phar_dets_addr){
        whereClause += ` AND phar_dets_addr 
                        LIKE ?`
        values.push(`%${phar_dets_addr}%`)            
    }
    if(mbr_code){
        whereClause += ` AND mbr_code 
                        LIKE ?`
        values.push(`%${mbr_code}%`)            
    }
    if(srch_all){
        whereClause += ` AND (phar_dets_addr 
                        LIKE ?
                          OR name
                        LIKE ?
                          OR phar_id
                        LIKE ? 
                          OR phar_base_addr
                        LIKE ? 
                          OR phar_dets_addr
                        LIKE ? 
                          OR mbr_code
                        LIKE ? 
                        )
                        `
        values.push(`%${srch_all}%`)            
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
    if(affiliation){
        sql += ` INNER JOIN affiliation ON pharmacy.affiliation = affiliation.aff_idx`                            
    }
    if(charged_sv){
        sql += ` INNER JOIN charged_sv ON pharmacy.charged_sv = charged_sv.name`                            
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