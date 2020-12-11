const db = require('../components/db')



module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = 'SELECT * FROM deal_composite_details WHERE deal_detail_idx = ?'
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
        let sql = `INSERT INTO deal_composite_details SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        
        let sql = `INSERT INTO deal_composite_details (deal_id, goods_id, qty_unit, goods_state_code, deal_opt_id,
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

module.exports.multipleInsertTest = async (options, connection) => {
    try{
        
        let sql = `INSERT INTO deal_composite_details (deal_id, 
                                                   deal_opt_id,
                                                      goods_id,
                                               goods_state_code, 
                                           first_create_dt_time
                                           ) 
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

module.exports.update = async (options, connection) => {
    try{
        const result = await db.query({
            connection: connection,
            sql: `UPDATE deal_composite_details SET ? WHERE deal_id = ?`,
            values: [options, options.deal_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

// module.exports.multipleUpdate = async (options, connection) => {
//     try{
//         let sql = `UPDATE deal_composite_details SET`
//         let deal = options.goods
//         let dealDetailIdx = options.dealDetailIdx
        
//         for (let i=0;i<deal.length;i++){
//             let value = deal[i]
//             let detailIdx = dealDetailIdx[i]
//             console.log('value:', value)
            
//             const dealKeys = Object.keys(deal[0])
//             //console.log('dealKeys:', dealKeys)
//                 if(i==deal.length-1){
//                     sql += ` goods_id = CASE deal_detail_idx 
//                                             WHEN ${detailIdx} 
//                                             THEN '${value.goods_id}' 
//                                             ELSE goods_id 
//                                             END, 
//                                             qty_unit = CASE deal_detail_idx 
//                                             WHEN ${detailIdx} 
//                                             THEN '${value.goods_compo_unit_classif_code}' 
//                                             ELSE qty_unit
//                                             END,
//                                             deal_id = CASE deal_detail_idx
//                                             WHEN ${detailIdx}
//                                             THEN '${value.deal_id}'
//                                             ELSE deal_id
//                                             END,
//                                             goods_state_code = CASE deal_detail_idx
//                                             WHEN ${detailIdx}
//                                             THEN '${value.goods_state_code}'
//                                             ELSE goods_state_code
//                                             END,
//                                             last_mod_dt_time = CASE deal_detail_idx
//                                             WHEN ${detailIdx}
//                                             THEN '${value.last_mod_dt_time}'
//                                             ELSE last_mod_dt_time
//                                             END`
                    
//                 } else {
//                     sql += ` goods_id = CASE deal_detail_idx 
//                                             WHEN ${detailIdx} 
//                                             THEN '${value.goods_id}' 
//                                             ELSE goods_id 
//                                             END, 
//                                             qty_unit = CASE deal_detail_idx 
//                                             WHEN ${detailIdx} 
//                                             THEN '${value.goods_compo_unit_classif_code}' 
//                                             ELSE qty_unit
//                                             END,
//                                             deal_id = CASE deal_detail_idx
//                                             WHEN ${detailIdx}
//                                             THEN '${value.deal_id}'
//                                             ELSE deal_id
//                                             END,
//                                             goods_state_code = CASE deal_detail_idx
//                                             WHEN ${detailIdx}
//                                             THEN '${value.goods_state_code}'
//                                             ELSE goods_state_code
//                                             END,
//                                             last_mod_dt_time = CASE deal_detail_idx
//                                             WHEN ${detailIdx}
//                                             THEN '${value.last_mod_dt_time}'
//                                             ELSE last_mod_dt_time
//                                             END,` 
                    
//                 }           
//         }
    
//         console.log('sql : ',sql)
//         const { affectedRows } = await db.query({
//             connection: connection,
//             sql: sql,
//             //values: [options]
//         })
//         return affectedRows
    
//     }catch(e){
//         throw new Error(e);
//     }
// }
module.exports.multipleUpdate = async (options, connection) => {
    try{
        let sql = `UPDATE deal_composite_details SET`
        let deal = options.goods
        let dealDetailIdx = options.dealDetailIdx
        
        for (let i=0;i<deal.length;i++){
            let value = deal[i]
            let detailIdx = dealDetailIdx[i]
            console.log('value:', value)
            
            const dealKeys = Object.keys(deal[0])
            console.log('dealKeys:', dealKeys)
                if(i==deal.length-1){
                    sql += ` qty_unit = CASE deal_detail_idx 
                                            WHEN ${detailIdx} 
                                            THEN '${value.goods_compo_unit_classif_code}' 
                                            ELSE qty_unit
                                            END,
                                            goods_state_code = CASE deal_detail_idx
                                            WHEN ${detailIdx}
                                            THEN '${value.goods_state_code}'
                                            ELSE goods_state_code
                                            END,
                                            last_mod_dt_time = CASE deal_detail_idx
                                            WHEN ${detailIdx}
                                            THEN '${value.last_mod_dt_time}'
                                            ELSE last_mod_dt_time
                                            END`
                    
                } else {
                    sql += ` qty_unit = CASE deal_detail_idx 
                                            WHEN ${detailIdx} 
                                            THEN '${value.goods_compo_unit_classif_code}' 
                                            ELSE qty_unit
                                            END,
                                            goods_state_code = CASE deal_detail_idx
                                            WHEN ${detailIdx}
                                            THEN '${value.goods_state_code}'
                                            ELSE goods_state_code
                                            END,
                                            last_mod_dt_time = CASE deal_detail_idx
                                            WHEN ${detailIdx}
                                            THEN '${value.last_mod_dt_time}'
                                            ELSE last_mod_dt_time
                                            END,`
                    
                }           
        }
    
        console.log('sql : ',sql)
        const { affectedRows } = await db.query({
            connection: connection,
            sql: sql,
            //values: [options]
        })
        return affectedRows
    
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (idx, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM deal_composite_details WHERE deal_detail_idx = ?`,
            values: [idx]
        })
        return result;
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
            whereClause += ` AND deal_detail_idx IN (?)`
            values.push(idx_array)
        }
        if(id_array){
            whereClause += ` AND deal_id IN (?)`
            values.push(id_array)
        }
        let sql = `DELETE FROM deal_composite_details 
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

module.exports.getList = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM deal_composite_details`

        if(options){
            sql += ` WHERE deal_detail_idx = ${options}`
        }else{
            sql
        }
        return await db.query({
            sql,
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGet = async(options) => {
    try{
        let sql = `SELECT deal_detail_idx, deal_id FROM deal_composite_details WHERE goods_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e);
    }
}
