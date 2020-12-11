const db = require('../components/db')


module.exports.multipleGet = async(options) => {
    try{
        let sql = `SELECT * FROM exhibition_category_deal WHERE exhib_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}


module.exports.getList = async (options) => {
    try{
        let sql = `SELECT *
                   FROM exhibition_category_deal`
        if(options.exhib_id) {
            sql += ` WHERE exhib_id = ${options.exhib_id}`        
        }
        // sql += ` ORDER BY cat_depth ASC, exp_cat_id ASC`
        return await db.query({
            sql
        })
        
    }catch(e){
        throw new Error(e);
    }
}


module.exports.getListExpCatIds = async (options) => {
    try{
        let sql = `SELECT exp_cat_id
                   FROM exhibition_category_deal`
        if(options.exp_cat_id) {
            sql += ` WHERE exp_cat_id = ${options.exp_cat_id}`        
        }
        // sql += ` ORDER BY cat_depth ASC, exp_cat_id ASC`
        return await db.query({
            sql
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.joinGet = async(options) => {
    try{
        
        let sql = `SELECT E.exhib_id, D.* 
                    FROM exhibition_category_deal AS E 
                    JOIN deal AS D
                    ON E.deal_id = D.deal_id
                    `
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGetGroup = async(options) => {
    try{
        let sql = `SELECT E.exhib_id, D.* 
                    FROM exhibition_category_deal AS E 
                    JOIN deal AS D
                    ON E.deal_id = D.deal_id
                    GROUP BY E.exhib_id
                    `
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO exhibition_category_deal
                    (exhib_id,
                     deal_id,
                     first_create_dt_time)
                    VALUES ?`
        return await db.query({
            connection,
            sql,
            values: [options]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.update = async(options, connection) => {
    try{
        let sql = `UPDATE exhibition_category_deal
                    SET deal_id = CASE exhib_cat_deal_idx
                    WHEN ${options.exhibCatDealIdx}
                    THEN '${options.dealId}'
                    ELSE deal_id
                    END,
                    last_mod_dt_time = CASE exhib_cat_deal_idx
                    WHEN ${options.exhibCatDealIdx}
                    THEN '${options.lastModTime}'
                    ELSE last_mod_dt_time
                    END`
        return await db.query({
            connection,
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}