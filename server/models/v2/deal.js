const db = require('../../components/db')

module.exports.findOneById = async (id) => {
    try{
        let sql = 'SELECT * FROM deal WHERE deal_id = ?'
        return await db.query({
            sql,
            values: [id]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO deal SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        let { deal_id, term_start_dt_time, term_end_dt_time, goods_name, srch_cnt} = options
        let sql = `SELECT * 
                   FROM deal
                   WHERE 1=1`

        let whereClause = ''
        let orderClause = ''
        let limitClause = ``
        let values = []

        if(deal_id) {
            whereClause += ` AND deal_id = ?`
            values.push(deal_id)
        }
        if(term_start_dt_time){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt_time)
        }
        if(term_end_dt_time){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt_time)
        }
        if(goods_name){
            sql = `SELECT g.goods_id, deal.* 
                    FROM (
                        SELECT goods_id
                        FROM goods
                        WHERE goods_name = ?
                    )g
                    JOIN deal
                    ON g.goods_id = deal.deal_id`
            values.push(goods_name)
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

        return await db.query({
            sql: sql + ` 
                ${whereClause}
                ${limitClause}`,
            values
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getListTotal = async (options) => {
    try{
        let { deal_id, term_start_dt_time, term_end_dt_time, goods_name, srch_cnt } = options
        let sql = `SELECT * 
                   FROM deal
                   WHERE 1=1`

        let whereClause = ''
        let orderClause = ''
        let limitClause = ``
        let values = []

        if(deal_id) {
            whereClause += ` AND deal_id = ?`
            values.push(deal_id)
        }
        if(term_start_dt_time){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt_time)
        }
        if(term_end_dt_time){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt_time)
        }
        if(goods_name){
            sql = `SELECT g.goods_id, deal.* 
                    FROM (
                        SELECT goods_id
                        FROM goods
                        WHERE goods_name = ?
                    )g
                    JOIN deal
                    ON g.goods_id = deal.deal_id`
            values.push(goods_name)
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

        return await db.query({
            sql: sql + ` 
                ${whereClause}
                `,
            values
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleDelete = async (options, connection) => {
    try{
        let { idx_array, id_array } = options
        let whereClause = ''
        let values = [];

        
        if(idx_array){
            whereClause += ` AND deal_idx IN (?)`
            values.push(idx_array)
        }
        if(id_array){
            whereClause += ` AND deal_id IN (?)`
            values.push(id_array)
        }
        let sql = `DELETE FROM deal 
                    WHERE 1=1
                    ${whereClause}`

        const result = await db.query({
            connection,
            sql,
            values
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}