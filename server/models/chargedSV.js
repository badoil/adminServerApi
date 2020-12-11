const db = require('../components/db')


module.exports.findOneByIdx = async (sv_idx) => {
    try{
        let sql = `SELECT * 
                   FROM charged_sv 
                   WHERE sv_idx = ? 
                   limit 1`
        const result = await db.query({
            sql,
            values: [sv_idx]
        })
        return result[0];
    }catch(e){
        
    };
};

module.exports.findOneByName = async (name) => {
    try{
        let sql = `SELECT * 
                   FROM charged_sv 
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

module.exports.findOneBySV_code = async (sv_code) => {
    try{
        let sql = `SELECT * 
                   FROM charged_sv 
                   WHERE sv_code = ? 
                   limit 1`
        const result = await db.query({
            sql,
            values: [sv_code]
        })
        return result[0];
    }catch(e){
        throw new Error(e)
    };
};

module.exports.findOneByView_seq = async (view_seq) => {
    try{
        let sql = `SELECT * 
                   FROM charged_sv 
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
        let sql = `INSERT INTO charged_sv SET ?`
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
        let sql = `UPDATE charged_sv 
                      SET`
                      
        let chargedSV = options.chargedSV
        for (let i=0;i<chargedSV.length;i++){
            let value = chargedSV[i]
            if(i==chargedSV.length-1){
                sql += ` name = CASE sv_idx 
                                WHEN ${value.sv_idx} 
                                THEN '${value.name}' 
                                ELSE name 
                                END`    
            } else {
                sql += ` name = CASE sv_idx 
                                WHEN ${value.sv_idx} 
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
            
            let sql = `DELETE FROM charged_sv WHERE sv_idx IN (${options.idx_array})`
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
        let { name, sv_code, srch_cnt, sv_idx } = options;        
        let sql = `SELECT * 
                     FROM charged_sv`
        let whereClause = ``  
        let limitClause = ``
        
        if(name){
            whereClause += ` AND charged_sv.name 
                    LIKE '%${name}%' 
                       ` 
        }  
        if(sv_code){
            whereClause += ` AND charged_sv.sv_code 
                    LIKE '%${sv_code}%'`
        }  
        if(sv_idx){
            whereClause += `AND charged_sv.sv_idx
                    = '${sv_idx}'`
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
        let { name, sv_code, srch_cnt, sv_idx } = options;        
        let sql = `SELECT * 
                     FROM charged_sv`
        let whereClause = ``  
        let limitClause = ``
        
        if(name){
            whereClause += ` AND charged_sv.name 
                    LIKE '%${name}%' 
                       ` 
        }  
        if(sv_code){
            whereClause += `AND charged_sv.sv_code 
                    LIKE '%${sv_code}%'`
        }  
        if(sv_idx){
            whereClause += `AND charged_sv.sv_idx
                    LIKE '%${sv_idx}%'`
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