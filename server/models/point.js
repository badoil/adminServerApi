const db = require('../components/db')


module.exports.findOneByIdx = async (point_idx) => {
    try{
        let sql = `SELECT * 
                   FROM point 
                   WHERE point_idx = ? 
                   limit 1`
        const result = await db.query({
            sql,
            values: [point_idx]
        })
        return result[0];
    }catch(e){
        
    };
};

module.exports.insert = async (option) => {
    try{
        let sql = `INSERT INTO point SET ?`
        return await db.query({
            sql,
            values: [option]
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try {
        const result = await db.query({
            connection: connection,
            sql: `UPDATE point 
                     SET ? 
                   WHERE point_idx = ?`,
            values: [options, options.point_idx]
        })
        return result;
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.multipleDelete = async (options, connection) => {
    try {
            
            let sql = `DELETE FROM point WHERE point_idx IN (${options.idx_array})`
            return await db.query({
                connection,
                sql: sql
            })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getList = async (options) => { // condition filter
    try {
        let { 
            term_start_dt, 
              term_end_dt, 
                 used_cat, 
                 srch_seq, 
                 srch_cnt, 
                     cont,
                 cust_idx,
              srch_orderby,
              point_cat,
              point_idx
            } = options;        
        // filter : term_start_dt, term_end_dt, info_email_rcpt_or_not, sms_rcpt_or_not, srch_seq, srch_cnt ,srch_kw
        let sql = `SELECT * 
                     FROM point`
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``
        let values = []

        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }
        if(used_cat){
            whereClause += ` AND used_cat = ?`
            values.push(used_cat)
        }
        if(cont){
            whereClause += ` AND cont 
                            LIKE ?`
            values.push(`%${cont}%`)            
        }
    
        if(cust_idx){
            whereClause += ` AND amt 
                            LIKE ?`
            values.push(`%${cust_idx}%`)            
        }      
        if(point_cat){
            whereClause += ` AND point_cat = ?`
            values.push(point_cat)
        } 
        if(point_idx){
            whereClause += ` AND point_idx = ?`
            values.push(point_idx)
        }
        if(!srch_orderby){
            srch_orderby = 'first_create_dt_time'
        } 
        if(!srch_seq){
            srch_seq = 'asc'
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
                        ${limitClause}`,
            values:values
        })
    } catch (err) {
        throw new Error(err)
    };
};

module.exports.getListTotal = async (options) => { // condition filter
    try {
        let { 
            term_start_dt, 
              term_end_dt, 
                 used_cat, 
                 srch_seq, 
                 srch_cnt, 
                     cont,
                 cust_idx,
              srch_orderby,
              point_cat,
              point_idx
            } = options;        
        // filter : term_start_dt, term_end_dt, info_email_rcpt_or_not, sms_rcpt_or_not, srch_seq, srch_cnt ,srch_kw
        let sql = `SELECT * 
                     FROM point`
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``
        let values = []

        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }
        if(used_cat){
            whereClause += ` AND used_cat = ?`
            values.push(used_cat)
        }
        if(cont){
            whereClause += ` AND cont 
                            LIKE ?`
            values.push(`%${cont}%`)            
        }
    
        if(cust_idx){
            whereClause += ` AND amt 
                            LIKE ?`
            values.push(`%${cust_idx}%`)            
        } 
        if(point_cat){
            whereClause += ` AND point_cat = ?`
            values.push(point_cat)
        }
        if(point_idx){
            whereClause += ` AND point_idx = ?`
            values.push(point_idx)
        }     
        if(!srch_orderby){
            srch_orderby = 'first_create_dt_time'
        } 
        if(!srch_seq){
            srch_seq = 'asc'
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
                        `,
            values:values
        })
    } catch (err) {
        throw new Error(err)
    };
};