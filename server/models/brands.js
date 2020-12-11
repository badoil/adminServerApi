const db = require('../components/db')

module.exports.findOneById = async (id) => {
    try{
        let sql = `SELECT * 
                   FROM brand 
                   WHERE brand_id = ?`
        return await db.query({
            sql,
            values: [id]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM brand 
                   WHERE brand_idx = ?`
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.findOneByName = async (name) => {
    try{
        let sql = `SELECT * 
                   FROM brand 
                   WHERE brand_name = ?`
        return await db.query({
            sql,
            values: [name]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO brand SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.update = async (options, connection) => {
    try{
        const result = await db.query({
            connection: connection,
            sql: `UPDATE brand SET ? 
                  WHERE brand_id = ?`,
            values: [options, options.brand_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (idx, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM brand 
                  WHERE brand_idx = ?`,
            values: [idx]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    try {
        let { brand_idx,
            term_start_dt,
            term_end_dt,
            brand_name,
            srch_cnt,
            page } = options;
            
        let sql = `SELECT * 
                     FROM brand`
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
        if(brand_idx){
            whereClause += ` AND brand.brand_idx = ?` 
            values.push(brand_idx)
        }
        if(brand_name){
            whereClause += ` AND brand.brand_name 
                    LIKE ?` 
            values.push(`%${brand_name}%`)
        }
           
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
        let { brand_idx,
            term_start_dt,
            term_end_dt,
            brand_name,
            srch_cnt,
            page } = options;
            
        let sql = `SELECT * 
                     FROM brand`
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
        if(brand_idx){
            whereClause += ` AND brand.brand_idx = ?` 
            values.push(brand_idx)
        }
        if(brand_name){
            whereClause += ` AND brand.brand_name 
                    LIKE ?` 
            values.push(`%${brand_name}%`)
        }
           
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

module.exports.getListByIdx = async (brand_idx) => {
    try{
        let sql = `SELECT * 
                   FROM brand 
                   WHERE brand_idx = ? 
                   `
        const result = await db.query({
            sql,
            values: [brand_idx]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};