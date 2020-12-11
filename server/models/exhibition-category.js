const db = require('../components/db')

module.exports.findOneById = async (id) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category 
                   WHERE exhib_id = ?`
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
        let sql = `INSERT INTO exhibition_category SET ?`
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
            sql: `UPDATE exhibition_category SET ? 
                  WHERE exhib_id = ?`,
            values: [options, options.exhib_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (id, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM exhibition_category 
                  WHERE exhib_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        // let sql = `SELECT * 
        //            FROM exhibition_category`
        let { srch_cnt, page } = options
        let whereClause = ``
        let limitClause = ``

        if(options){
            if(options.exhib_id) {
                whereClause += ` AND exhibition_category.exhib_id = ${options.exhib_id}`
            }
            
        }else{
            sql
        }

        //let page = options.page
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
            sql: `SELECT * 
                  FROM exhibition_category
                  JOIN exhibition_category_deal
                  ON exhibition_category.exhib_id = exhibition_category_deal.exhib_id
                  WHERE 1=1
                  ${whereClause}
                  ${limitClause}`,
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getListTotal = async (options) => {
    try{
        // let sql = `SELECT * 
        //            FROM exhibition_category`
        let { srch_cnt, page } = options
        let whereClause = ``
        let limitClause = ``

        if(options){
            if(options.exhib_id) {
                whereClause += ` AND exhibition_category.exhib_id = ${options.exhib_id}`
            }
            
        }else{
            sql
        }

        //let page = options.page
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
            sql: `SELECT * 
                  FROM exhibition_category
                  JOIN exhibition_category_deal
                  ON exhibition_category.exhib_id = exhibition_category_deal.exhib_id
                  WHERE 1=1
                  ${whereClause}
                  `,
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multiInsert = async (options, connection) => {
    try{
        
        let sql = `INSERT INTO exhibition_category (exhib_name,
                                  exhib_overview,
                                exhib_banner_img,
                                 exhib_horiz_img,
                                  exhib_vert_img,
                                    exhib_sq_img,
                             exhib_dets_info_img,
                               exhib_thema_color,
                                       exhib_tag,
                               banner_exp_or_not,
                            main_page_exp_or_not,
                                  valid_start_dt,
                                    valid_end_dt,
                            repr_goods_compo_list,
                            exhib_compo_goods_list,                                    
                              first_create_dt_time) 
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
        let { srch_cnt, page, exhib_id } = options.params

        let whereClause = ``
        let limitClause = ``
        let values = []

        if(exhib_id){
            whereClause += ` AND exhib_id = ${exhib_id}`
        }
        
        if(options){
            if(options.exhibIdArray){
                whereClause += ` AND exhib_id IN (${options.exhibIdArray})`
            }
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
        let sql = `SELECT * 
                    FROM exhibition_category
                    WHERE 1=1
                    ${whereClause}
                    ${limitClause}`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleGetTotal = async(options) => {
    try{
        let { srch_cnt, page, exhib_id } = options.params

        let whereClause = ``
        let limitClause = ``
        let values = []

        
        if(options){
            if(exhib_id){
                whereClause += ` AND exhib_id = ${exhib_id}`
            }else if(options.exhibIdArray){
                whereClause += ` AND exhib_id IN (${options.exhibIdArray})`
            }
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
        let sql = `SELECT * 
                    FROM exhibition_category
                    WHERE 1=1
                    ${whereClause}
                    `
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}