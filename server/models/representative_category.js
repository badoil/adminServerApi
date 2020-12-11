const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM representative_category 
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
        let sql = `INSERT INTO representative_category SET ?`
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
            sql: `UPDATE representative_category SET ? 
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
        let sql = `UPDATE representative_category SET`
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
                            sql += ` ${exhibitionsKeys[k]} = CASE cat_id 
                            WHEN ${value.cat_id} 
                            THEN '${value[exhibitionsKeys[k]]}' 
                            ELSE ${exhibitionsKeys[k]} 
                            END` 
                        }else{
                            sql += ` ${exhibitionsKeys[k]} = CASE cat_id 
                            WHEN ${value.cat_id} 
                            THEN '${value[exhibitionsKeys[k]]}' 
                            ELSE ${exhibitionsKeys[k]} 
                            END,` 
                        }
                    }
                } else {
                    for(let j=0; j<exhibitionsKeys.length; j++){
                    console.log('else')
                    sql += ` ${exhibitionsKeys[j]} = CASE cat_id 
                                                    WHEN ${value.cat_id} 
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
        let sql = `DELETE FROM representative_category WHERE cat_id IN (${options.id_array})`
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
                   FROM representative_category`

        if(options){
            if(options.cat_id){
                sql += ` WHERE cat_id = ${options.cat_id}`
            }else if(options.prnt_cat_id){
                sql += ` WHERE prnt_cat_id = ${options.prnt_cat_id}`
            }
        }
        
        return await db.query({
            sql
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO representative_category (cat_id, 
                                                       exp_seq, 
                                                     cat_depth, 
                                                   prnt_cat_id, 
                                                      cat_name, 
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