const db = require('../components/db')

module.exports.findOneById = async (id) => {
    try{
        let sql = 'SELECT * FROM orders WHERE order_id = ?'
        return await db.query({
            sql,
            values: [id]
        })
    }catch(e){
        throw new Error(e);
    }
}

// module.exports.insert = async (options, connection) => {
//     try{
//         console.log('options:', options)
//         // delete options.order_dets_id
//         // delete options.deal_id
//         // delete options.deal_opt_id
//         // delete options.pur_cnt
//         // delete options.pur_amt
//         // delete options.disc_amt
//         // delete options.deliv_company_code
//         // delete options.inv_num
//         //console.log('options2:', options)

//         //let sql = `INSERT INTO order SET ?`
//         let sql = `INSERT INTO order SET ?`
//         const result =  await db.query({
//             connection,
//             sql,
//             values: [options]
//           })
//         return result
//     }catch(e){
//         throw new Error(e);
//     }
// }

module.exports.insert = async (options, connection) => {
    try{
        console.log('optiosn:', options)
        let sql = `INSERT INTO orders SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    }catch(e){
        throw new Error(e);
    }
}

// module.exports.insert = async (options, connection) => {
//     try{
//         let sql = `INSERT INTO deal_composite_details SET ?`
//         return await db.query({
//             connection: connection,
//             sql,
//             values: [options]
//           })
//     }catch(e){
//         throw new Error(e);
//     }
// }

module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO orders SET ?`
        console.log('options:', options);
        let orders = options
        //goods.map(item => delete item.deal_id)
        let orderDetsId = orders.map(item => item.order_dets_id)
        let dealId = orders.map(item => item.deal_id)
        let dealOptId = orders.map(item => item.deal_opt_id)
        let purCnt = orders.map(item => item.pur_cnt)
        let purAmt = orders.map(item => item.pur_amt)
        let delivAmt = orders.map(item => item.deliv_amt)
        let discAmt = orders.map(item => item.disc_amt)
        let delivCompanyCode = orders.map(item => item.deliv_company_code)
        let invNum = orders.map(item => item.inv_num)
        console.log('orderDetsId:', orderDetsId)

        orders.map(item => delete item.order_dets_id)
        orders.map(item => delete item.deal_id)
        orders.map(item => delete item.deal_opt_id)
        orders.map(item => delete item.pur_cnt)
        orders.map(item => delete item.pur_amt)
        orders.map(item => delete item.disc_amt)
        orders.map(item => delete item.deliv_company_code)
        orders.map(item => delete item.inv_num)

        console.log('orders:', orders)
        let returnValue = [];
        for(let i=0; i<orders.length; i++){
            let value = orders[i]

            const result = await db.query({
                connection: connection,
                sql: sql,
                values: [value]
            })
            returnValue.push(result);
        }
        console.log('returnValue:', returnValue)
    //   for(let i=0; i<returnValue.length; i++){
    //     const result = returnValue[i].sel_price = selPrice[i]
    //     returnValue.push(result)
    //   }
        return ({returnValue, orderDetsId, dealId, dealOptId, purCnt, purAmt, delivAmt, discAmt, delivCompanyCode, invNum});

    }catch(e){
        throw new Error(e);
    }
}

module.exports.update = async (options, connection) => {
    try{
        const result = await db.query({
            connection: connection,
            sql: `UPDATE orders SET ? WHERE order_idx = ?`,
            values: [options, options.order_idx]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try{
        let sql = `UPDATE orders SET ? WHERE order_id = ?`
        let orders = options.orders
        console.log('ordersMultipleUpdate:', orders)
        orders.map(item => delete item.order_dets_id)
        orders.map(item => delete item.deal_id)
        orders.map(item => delete item.deal_opt_id)
        orders.map(item => delete item.pur_cnt)
        orders.map(item => delete item.pur_amt)
        orders.map(item => delete item.disc_amt)
        orders.map(item => delete item.deliv_company_code)
        orders.map(item => delete item.inv_num)
        
        let returnValue = []
        for (let i=0;i<orders.length;i++){
            let value = orders[i]
            const result = await db.query({
                connection,
                sql,
                values: [value, value.order_id]
            })
            returnValue.push(result)
        }
        return returnValue
    
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (id, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM orders WHERE order_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleDelete = async (options, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM orders WHERE order_id IN (${options.id_array})`,
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    
    try{
        console.log('options',options)
    let {order_idx, cust_id,
        term_start_dt, term_end_dt, repr_cat_id, order_state_code, pymt_way_code, srch_orderby, 
           srch_seq, srch_cnt, srch_kwd} = options


    let whereClause = ''
    let orderClause = ''
    let limitClause = ``
    let values = []

    if(order_idx){
        whereClause += ` AND order_idx = ?`
        values.push(order_idx)
    }
    if(cust_id){
        whereClause += ` AND cust_id = ?`
        values.push(cust_id)
    }
    if(term_start_dt){
        whereClause += ` AND DATE(first_create_dt_time) >= ?`
        values.push(term_start_dt)
    }
    if(term_end_dt){
        whereClause += ` AND DATE(first_create_dt_time) <= ?`
        values.push(term_end_dt)
    }
    if(repr_cat_id){
        whereClause += ` AND repr_cat_id = ?`
        values.push(repr_cat_id)
    }
    if(pymt_way_code){
        whereClause += ` AND pymt_way_code = ?`
        values.push(pymt_way_code)
    }
    if(order_state_code){
        whereClause += ` AND order_state_code = ?`
        values.push(order_state_code)
    }
    if(srch_kwd){
        whereClause += ` AND orderer_name
                         LIKE ?
                         OR orderer_mobi
                         LIKE ?
                         OR rcpt_name
                         LIKE ?
                         OR rcpt_mobi
                         LIKE ?
                         OR rcpt_phone
                         LIKE ?`
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)  
    }
    
    if(!srch_orderby){
        srch_orderby = 'first_create_dt_time'
    } 
    if(!srch_seq){
        srch_seq = 'asc'
    }  

    if(srch_orderby){
        switch (srch_orderby) {
            case "first_create_dt_time":
                srch_orderby = 'orders.first_create_dt_time'
        
            break
            case "order_dt":
                srch_orderby = 'orders.order_dt'

            break
            case "pymt_amt":
                srch_orderby = 'orders.pymt_amt'

            break
            case "used_acc_amt":
                srch_orderby = 'orders.used_acc_amt'

            break
            case "used_sp_acc_amt":
                srch_orderby = 'orders.used_sp_acc_amt'

            break
        }
    }
    orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`

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
            sql: `
                SELECT 
                    * 
                FROM 
                    orders
                WHERE
                    1=1
                ${whereClause}
                ${orderClause}  
                ${limitClause}`,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getListTotal = async (options) => { // condition filter
    
    try{
        console.log('options',options)
    let {order_idx,
        term_start_dt, 
        term_end_dt, repr_cat_id, order_state_code, pymt_way_code, srch_orderby, 
           srch_seq, srch_cnt, srch_kwd} = options


    let whereClause = ''
    let orderClause = ''
    let limitClause = ``
    let values = []
    if(order_idx){
        whereClause += ` AND order_idx = ?`
        values.push(order_idx)
    }
    if(term_start_dt){
        whereClause += ` AND DATE(first_create_dt_time) >= ?`
        values.push(term_start_dt)
    }
    if(term_end_dt){
        whereClause += ` AND DATE(first_create_dt_time) <= ?`
        values.push(term_end_dt)
    }
    if(repr_cat_id){
        whereClause += ` AND repr_cat_id = ?`
        values.push(repr_cat_id)
    }
    if(pymt_way_code){
        whereClause += ` AND pymt_way_code = ?`
        values.push(pymt_way_code)
    }
    if(order_state_code){
        whereClause += ` AND order_state_code = ?`
        values.push(order_state_code)
    }
    if(srch_kwd){
        whereClause += ` AND orderer_name
                         LIKE ?
                         OR orderer_mobi
                         LIKE ?
                         OR rcpt_name
                         LIKE ?
                         OR rcpt_mobi
                         LIKE ?
                         OR rcpt_phone
                         LIKE ?`
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)  
    }
    
    if(!srch_orderby){
        srch_orderby = 'first_create_dt_time'
    } 
    if(!srch_seq){
        srch_seq = 'asc'
    }  

    if(srch_orderby){
        switch (srch_orderby) {
            case "first_create_dt_time":
                srch_orderby = 'orders.first_create_dt_time'
        
            break
            case "order_dt":
                srch_orderby = 'orders.order_dt'

            break
        }
    }
    orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`

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
            sql: `
                SELECT 
                    * 
                FROM 
                    orders
                WHERE
                    1=1
                ${whereClause}`,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.multipleGetSabangList = async (options) => {
    try{
        let sql = `SELECT sabang_cxn_ecomm_order_id FROM orders WHERE sabang_cxn_ecomm_order_id IN (${options})`
        return await db.query({
            sql
        })

    }catch(e){
        throw new Error(e)
    }
} 



module.exports.deleteAll = async (options, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM orders`,
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

// module.exports.getList = async (options) => { // condition filter
//     try {
//         let { brand_id,
//             brand_name,

//             term_start_dt, 
//             term_end_dt, 
//             srch_cnt } = options; 
            
            
//         let sql = `SELECT * 
//                      FROM brand`
//         let whereClause = ``
//         let limitClause = ``
//         let values = []
        
//         if(term_start_dt){
//             whereClause += ` AND DATE(first_create_dt_time) >= ?`
//             values.push(term_start_dt)
//         }
//         if(term_end_dt){
//             whereClause += ` AND DATE(first_create_dt_time) <= ?`
//             values.push(term_end_dt)
//         }
//         if(brand_id){
//             whereClause += ` AND brand.brand_id = ?` 
//             values.push(brand_id)
//         }
//         if(brand_name){
//             whereClause += ` AND brand.brand_name 
//                     LIKE ?` 
//             values.push(`%${brand_name}%`)
//         }
           
//         let page = options.page
//         if (!page || page < 0) {
//             page = 1
//         }
//         let offset = (page - 1) * srch_cnt

//         if (srch_cnt) {
//             limitClause = ` LIMIT ${offset}, ${srch_cnt}`
//         } else {
//             limitClause = ``
//         }

//         console.log('sql : ',sql)
//         return await db.query({
//             sql: sql + ` WHERE 1=1
//                         ${whereClause}
//                         ${limitClause}
//                         `,
//             values: values
//         })
//     } catch (err) {
//         throw new Error(err)
//     };
// };

// module.exports.getListTotal = async (options) => { // condition filter
//     try {
//         let { brand_id,
//             brand_name,

//             term_start_dt, 
//             term_end_dt, 
//             srch_cnt } = options; 
            
            
//         let sql = `SELECT * 
//                      FROM brand`
//         let whereClause = ``
//         let limitClause = ``
//         let values = []
        
//         if(term_start_dt){
//             whereClause += ` AND DATE(first_create_dt_time) >= ?`
//             values.push(term_start_dt)
//         }
//         if(term_end_dt){
//             whereClause += ` AND DATE(first_create_dt_time) <= ?`
//             values.push(term_end_dt)
//         }
//         if(brand_id){
//             whereClause += ` AND brand.brand_id = ?` 
//             values.push(brand_id)
//         }
//         if(brand_name){
//             whereClause += ` AND brand.brand_name 
//                     LIKE ?` 
//             values.push(`%${brand_name}%`)
//         }
           
//         let page = options.page
//         if (!page || page < 0) {
//             page = 1
//         }
//         let offset = (page - 1) * srch_cnt

//         if (srch_cnt) {
//             limitClause = ` LIMIT ${offset}, ${srch_cnt}`
//         } else {
//             limitClause = ``
//         }

//         console.log('sql : ',sql)
//         return await db.query({
//             sql: sql + ` WHERE 1=1
//                         ${whereClause}
//                         `,
//             values: values
//         })
//     } catch (err) {
//         throw new Error(err)
//     };
// };