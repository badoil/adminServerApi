const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM exposed_category 
                   WHERE exhib_idx = ?`
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO exposed_category SET ?`
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
            sql: `UPDATE exposed_category SET ? 
                  WHERE exhib_id = ?`,
            values: [options, options.exhib_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try{
        let sql = `UPDATE exposed_category SET`
        let exhibitions = options.exhibitions
        
        for (let i=0;i<exhibitions.length;i++){
            let value = exhibitions[i]
            console.log('value:', value)
            const exhibitionsKeys = Object.keys(exhibitions[0])
            console.log('exhibitionsKeys:', exhibitionsKeys)
                if(i==exhibitions.length-1){
                    for(let k=0; k<exhibitionsKeys.length; k++){
                    console.log('i==goods.length-1')
                        if(k==exhibitionsKeys.length-1){
                            sql += ` ${exhibitionsKeys[k]} = CASE exp_cat_id 
                            WHEN ${value.exp_cat_id} 
                            THEN '${value[exhibitionsKeys[k]]}' 
                            ELSE ${exhibitionsKeys[k]} 
                            END` 
                        }else{
                            sql += ` ${exhibitionsKeys[k]} = CASE exp_cat_id 
                            WHEN ${value.exp_cat_id} 
                            THEN '${value[exhibitionsKeys[k]]}' 
                            ELSE ${exhibitionsKeys[k]} 
                            END,` 
                        }
                    }
                } else {
                    for(let j=0; j<exhibitionsKeys.length; j++){
                    console.log('else')
                    sql += ` ${exhibitionsKeys[j]} = CASE exp_cat_id 
                                                    WHEN ${value.exp_cat_id} 
                                                    THEN '${value[exhibitionsKeys[j]]}' 
                                                    ELSE ${exhibitionsKeys[j]} 
                                                    END,` 
                    }
                }           
        }
    
        console.log('sql : ',sql)
        const result = await db.query({
            connection: connection,
            sql: sql
            //values: [options]
        })
        return result
    
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleDelete = async(options, connection) => {
    try{
        let sql = `DELETE FROM exposed_category WHERE exp_cat_id IN (${options.id_array})`
            return await db.query({
                connection,
                sql: sql
            })
    }catch(e){
        throw new Error(e);
    }
};

module.exports.getList = async (options) => {
    try{
        let sql = `SELECT *
                   FROM exposed_category`
        if(options){
            if(options.prnt_cat_id){
                sql += ` WHERE prnt_cat_id = ${options.prnt_cat_id}`
            } else if(options.exp_cat_id) {
                sql += ` WHERE exp_cat_id = ${options.exp_cat_id}`        
            }
        }
        
        sql += ` ORDER BY cat_depth ASC, exp_cat_id ASC`
        return await db.query({
            sql
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getMainList = async (options) => {
    try{
        let sql = `SELECT *
                   FROM exposed_category WHERE main_page_exp_or_not = 'Y'`        
        return await db.query({
            sql
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO exposed_category (exp_cat_id, 
                                                    exp_seq, 
                                                  cat_depth, 
                                                prnt_cat_id, 
                                                   cat_name, 
                                       main_page_exp_or_not,
                                            appl_goods_list, 
                                          first_create_user, 
                                       first_create_dt_time,
                                              last_mod_user,
                                           last_mod_dt_time) 
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
