const db = require('../components/db')

module.exports.findOneByName = async (name) => {
    try {
        let sql = `SELECT * 
                       FROM mbr_rank 
                      WHERE name = ? 
                      `
        const result = await db.query({
            sql: sql,
            values: [name]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getList = async (options) => { // condition filter
    try {
        let { name, mbr_cnt, cxn_cnt, post_cnt, com_cnt, srch_cnt, mbr_rank_idx } = options;

        let whereClause = ``
        let limitClause = ``
        let values = []

        if(name){
            whereClause += ` AND name
                             LIKE ?`
            values.push(`%${name}%`);
        }
        if(mbr_rank_idx){
            whereClause += ` AND mbr_rank_idx
                             = ?`
            values.push(`${mbr_rank_idx}`);
        }
        if(mbr_cnt){
            whereClause += ` AND mbr_cnt 
                             LIKE ?`
            values.push(`%${mbr_cnt}%`)
        }
        if(cxn_cnt){
            whereClause += ` AND cxn_cnt 
                             LIKE ?`
            values.push(`%${cxn_cnt}%`)
        }
        if(post_cnt){
            whereClause += ` AND post_cnt 
                             LIKE ?`
            values.push(`%${post_cnt}%`)
        }
        if(com_cnt){
            whereClause += ` AND com_cnt 
                             LIKE ?`
            values.push(`%${com_cnt}%`)
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

        // return await db.query(sql)
        return await db.query({
            sql: `SELECT * 
                    FROM mbr_rank
                    WHERE 1=1
                    ${whereClause}
                    ${limitClause}`,
            values
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getListTotal = async (options) => { // condition filter
    try {
        let { name, mbr_cnt, cxn_cnt, post_cnt, com_cnt, srch_cnt,
            mbr_rank_idx} = options;

        let whereClause = ``
        let limitClause = ``
        let values = []

        if(name){
            whereClause += ` AND name
                             LIKE ?`
            values.push(`%${name}%`);
        }
        if(mbr_rank_idx){
            whereClause += ` AND mbr_rank_idx
                             = ?`
            values.push(`${mbr_rank_idx}`);
        }
        if(mbr_cnt){
            whereClause += ` AND mbr_cnt 
                             LIKE ?`
            values.push(`%${mbr_cnt}%`)
        }
        if(cxn_cnt){
            whereClause += ` AND cxn_cnt 
                             LIKE ?`
            values.push(`%${cxn_cnt}%`)
        }
        if(post_cnt){
            whereClause += ` AND post_cnt 
                             LIKE ?`
            values.push(`%${post_cnt}%`)
        }
        if(com_cnt){
            whereClause += ` AND com_cnt 
                             LIKE ?`
            values.push(`%${com_cnt}%`)
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

        // return await db.query(sql)
        return await db.query({
            sql: `SELECT * 
                    FROM mbr_rank
                    WHERE 1=1
                    ${whereClause}
                    `,
            values 
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        const { insertId } = await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO mbr_rank 
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
            sql: `UPDATE mbr_rank 
                     SET ? 
                   WHERE mbr_rank_idx = ?`,
            values: [options, options.email_form_idx]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try {

        // console.log('options : ',options)
        let sql = `UPDATE mbr_rank 
                      SET`
                      
        let mbr_rank = options.mbr_rank
        // console.log('mbr_rank.length : ',mbr_rank.length)
        for (let i=0;i<mbr_rank.length;i++){
            let value = mbr_rank[i]
            // console.log(value)
            if(i==mbr_rank.length-1){
                sql += ` name = CASE mbr_rank_idx 
                                WHEN ${value.mbr_rank_idx} 
                                THEN '${value.name}' 
                                ELSE name 
                                END`    
            } else {
                sql += ` name = CASE mbr_rank_idx 
                                WHEN ${value.mbr_rank_idx} 
                                THEN '${value.name}' 
                                ELSE name 
                                END,`
            }            
        }
        // console.log('sql : ',sql)
        const { affectedRows } = await db.query({
            connection: connection,
            sql: sql,
            values: [options]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (mbr_rank_idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM mbr_rank 
                   WHERE mbr_rank_idx = ?`,
            values: [mbr_rank_idx]
        })
    } catch (err) {
        throw new Error(err)
    }
}