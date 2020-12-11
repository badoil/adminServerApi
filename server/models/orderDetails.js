const db = require('../components/db')


module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO order_details SET ?`
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
        if(options.orderDetails){
            let sql = `INSERT INTO order_details SET ?`
            let orderDetails = options.orderDetails
            let returnValue = [];
            for(let i=0; i<orderDetails.length; i++){
                let value = orderDetails[i]
                console.log('value:', value)

                const result = await db.query({
                    connection: connection,
                    sql: sql,
                    values: [value]
                })
                returnValue.push(result);
            }
            return returnValue
        }
        console.log('orderDetsMultiOptiosn:', options)
        let sql = `INSERT INTO order_details (order_id, deal_id, deal_opt_id, pur_cnt, pur_amt, 
                    deliv_amt, disc_amt, deliv_company_code, inv_num, first_create_dt_time) 
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
            sql: `UPDATE order_details SET ? WHERE order_id = ?`,
            values: [options, options.order_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try{
        console.log('orderDetsMultiUpdateOptiosn:', options)
        let sql = `UPDATE order_details SET ? WHERE order_id = ?`

        let returnValue = []
        for (let i=0;i<options.length;i++){
            let value = options[i]
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

module.exports.multipleGet = async(options) => {
    try{
        console.log('options:', options)
        let sql = `SELECT * FROM order_details WHERE order_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleDelete = async (options, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM order_details WHERE order_id IN (${options.id_array})`,
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}


module.exports.deleteAll = async (options, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM order_details`,
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}