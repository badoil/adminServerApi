const db = require('../components/db')


module.exports.findOneByIdx = async (aff_idx) => {
    try{
        let sql = `SELECT * 
                   FROM affiliation 
                   WHERE aff_idx = ? 
                   limit 1`
        const result = await db.query({
            sql,
            values: [aff_idx]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};

module.exports.findOneByName = async (name) => {
    try{
        let sql = `SELECT * 
                   FROM affiliation 
                   WHERE name = ? 
                   limit 1`
        const result = await db.query({
            sql,
            values: [name]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};

module.exports.findOneByAff_code = async (aff_code) => {
    try{
        let sql = `SELECT * 
                   FROM affiliation 
                   WHERE aff_code = ? 
                   limit 1`
        const result = await db.query({
            sql,
            values: [aff_code]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};

module.exports.findOneByView_seq = async (view_seq) => {
    try{
        let sql = `SELECT * 
                   FROM affiliation 
                   WHERE view_seq = ? 
                   limit 1`
        const result = await db.query({
            sql,
            values: [view_seq]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};



module.exports.insert = async (option) => {
    try{
        let sql = `INSERT INTO affiliation SET ?`
        return await db.query({
            sql,
            values: [option]
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try {

        console.log('options : ',options)
        let sql = `UPDATE affiliation 
                      SET`
                      
        let affiliation = options.affiliation
        for (let i=0;i<affiliation.length;i++){
            let value = affiliation[i]
            if(i==affiliation.length-1){
                sql += ` name = CASE aff_idx 
                                WHEN ${value.aff_idx} 
                                THEN '${value.name}' 
                                ELSE name 
                                END`    
            } else {
                sql += ` name = CASE aff_idx 
                                WHEN ${value.aff_idx} 
                                THEN '${value.name}' 
                                ELSE name 
                                END,`
            }            
        }
        // console.log('sql : ',sql)
        const { affectedRows } = await db.query({
            connection: connection,
            sql: sql,
            values: [options, options.email_form_idx]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.multipleDelete = async (options, connection) => {
    try {
            
            let sql = `DELETE FROM affiliation WHERE aff_idx IN (${options.idx_array})`
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
        let { name, aff_code, srch_cnt, aff_idx } = options;        
        // filter : term_start_dt, term_end_dt, info_email_rcpt_or_not, sms_rcpt_or_not, srch_seq, srch_cnt ,srch_kw
        let sql = `SELECT * 
                     FROM affiliation`
        let whereClause = ``
        let limitClause = ``
        
        if(name){
            whereClause += ` AND affiliation.name 
                    LIKE '%${name}%' 
                       ` 
        }  
        if(aff_code){
            whereClause += ` AND affiliation.aff_code 
                    LIKE '%${aff_code}%'`
        }
        if(aff_idx){
            whereClause += ` AND affiliation.aff_idx
                    LIKE '%${aff_idx}%'`
        }   
        
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
                        ${limitClause}
                        `
        })
    } catch (err) {
        throw new Error(err)
    };
};

module.exports.getListTotal = async (options) => { // condition filter
    try {
        let { name, aff_code, srch_cnt } = options;        
        // filter : term_start_dt, term_end_dt, info_email_rcpt_or_not, sms_rcpt_or_not, srch_seq, srch_cnt ,srch_kw
        let sql = `SELECT * 
                     FROM affiliation`
        let whereClause = ``
        let limitClause = ``
        
        if(name){
            whereClause += ` AND affiliation.name 
                    LIKE '%${name}%' 
                       ` 
        }  
        if(aff_code){
            whereClause += `AND affiliation.aff_code 
                    LIKE '%${aff_code}%'`
        }   
        
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
        })
    } catch (err) {
        throw new Error(err)
    };
};

module.exports.getListByIdx = async (aff_idx) => {
    try{
        let sql = `SELECT * 
                   FROM affiliation 
                   WHERE aff_idx = ? 
                   `
        const result = await db.query({
            sql,
            values: [aff_idx]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};

