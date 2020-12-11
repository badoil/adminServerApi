const db = require('../components/db')

module.exports.findOneByName = async (name) => {
    try{
        let sql = `SELECT * 
                    FROM coalition_standing_point_inquiry
                    WHERE name = ?`
        return await db.query({
            sql,
            values: [name]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT *
                    FROM coalition_standing_point_inquiry
                    WHERE coal_standing_point_inq_idx = ?`
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        const result = await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO coalition_standing_point_inquiry 
                     SET ?`,
            values: [options]
        })
        return result
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.update = async (options) => {
    try{
        let sql = `UPDATE coalition_standing_point_inquiry
                    SET ?
                    WHERE coal_standing_point_inq_idx = ?`
        return await db.query({
            sql,
            values: [options, options.coal_standing_point_inq_idx]
        })
    }catch(e){

    }
}

module.exports.getList = async (options) => { // condition filter
    try {
        let { name,
            rep_name,
            
            term_start_dt, 
            term_end_dt, 
            srch_cnt } = options; 
            
            
        let sql = `SELECT * 
                     FROM coalition_standing_point_inquiry`
        let whereClause = ``
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
        if(name){
            whereClause += ` AND coalition_standing_point_inquiry.name 
                            LIKE ?` 
            values.push(`%${name}%`)
        }
        if(rep_name){
            whereClause += ` AND coalition_standing_point_inquiry.rep_name 
                            LIKE ?` 
            values.push(`%${rep_name}%`)
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
        return await db.query({
            sql: sql + ` WHERE 1=1
                        ${whereClause}
                        ${limitClause}
                        `,
            values: values
        })
    } catch (err) {
        throw new Error(err)
    };
};

module.exports.getListTotal = async (options) => { // condition filter
    try {
        let { name,
            rep_name,
            
            term_start_dt, 
            term_end_dt, 
            srch_cnt } = options; 
            
            
        let sql = `SELECT * 
                     FROM coalition_standing_point_inquiry`
        let whereClause = ``
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
        if(name){
            whereClause += ` AND coalition_standing_point_inquiry.name 
                    LIKE ?` 
            values.push(`%${name}%`)
        }
        if(rep_name){
            whereClause += ` AND coalition_standing_point_inquiry.rep_name 
                    LIKE ?` 
            values.push(`%${rep_name}%`)
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
        return await db.query({
            sql: sql + ` WHERE 1=1
                        ${whereClause}
                        `,
            values: values
        })
    } catch (err) {
        throw new Error(err)
    };
};

module.exports.delete = async (idx) => {
    try{
        let sql = `DELETE 
                    FROM coalition_standing_point_inquiry
                    WHERE coal_standing_point_inq_idx = ?`

        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e)
    }
}