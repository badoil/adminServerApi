const db = require('../../components/db')


module.exports.findOneByIdx = async (idx) => {
    try {
        let query = `SELECT * 
                       FROM table_cust_qry_count 
                      WHERE idx = ? 
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [idx]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        return await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO table_cust_qry_count 
                     SET ?`,
            values: [options]
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try {
        const result = await db.query({
            connection: connection,
            sql: `UPDATE table_cust_qry_count 
                     SET ? 
                   WHERE idx = ?`,
            values: [options, options.idx]
        })
        return result;
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM table_cust_qry_count 
                   WHERE idx = ?`,
            values: [idx]
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getList = async (options) => { // condition filter
    try {
        let { 
            tbl_idx, cust_idx, idx          
                } = options;
        
        let whereClause = ``
        let values = []

        if(idx){
            whereClause += ` AND idx 
                            = ?`
            values.push(idx)            
        }
        if(cust_idx){
            whereClause += ` AND cust_idx 
                            = ?`
            values.push(cust_idx)            
        }
        if(tbl_idx){
            whereClause += ` AND tbl_idx 
                            = ?`
            values.push(tbl_idx)            
        }

        let sql = `SELECT * 
                    FROM table_cust_qry_count
                    WHERE 1=1
                    ${whereClause}
                    `

        console.log('sql1 : ',sql)
        // return await db.query(sql)
        return await db.query({
            sql, 
            values:values

        })
} catch (err) {
    throw new Error(err)
};
}