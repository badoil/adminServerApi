const db = require('../../components/db')


module.exports.findOneByIdx = async (idx) => {
    try {
        let query = `SELECT * 
                       FROM table_culum_expose
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

module.exports.findOneByIdxColumn = async (options) => {
    try {
        let query = `SELECT * 
                       FROM table_culum_expose
                      WHERE tbl_idx = ? 
                      AND tbl_culum_idx = ?
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [options.tbl_idx, options.tbl_culum_idx]
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
                    INTO table_culum_expose
                     SET ?`,
            values: [options]
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try {
        return await db.query({
            connection: connection,
            sql: `INSERT INTO table_culum_expose
                        (
                            cust_idx,
                            tbl_idx,
                            tbl_culum_idx,
                            fix,
                            first_create_dt_time
                        )
                     VALUES ?`,
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
            sql: `UPDATE table_culum_expose
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
                    FROM table_culum_expose
                   WHERE idx = ?`,
            values: [idx]
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.multipleDelete = async (idx_array, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM table_culum_expose
                   WHERE idx IN (?)`,
            values: [idx_array]
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getList = async (options) => { // condition filter
    try {
        let { 
            tbl_idx, cust_idx, tbl_culum, idx          
                } = options;
        
        let whereClause = ``
        let values = []

        if(idx){
            whereClause += ` AND idx 
                            = ?`
            values.push(idx)            
        }
        if(tbl_idx){
            whereClause += ` AND tbl_idx 
                            = ?`
            values.push(tbl_idx)            
        }
        if(cust_idx){
            whereClause += ` AND cust_idx 
                            = ?`
            values.push(cust_idx)            
        }
        if(tbl_culum){
            whereClause += ` AND tbl_culum 
                            = ?`
            values.push(tbl_culum)            
        }

        let sql = `SELECT * 
                    FROM table_culum_expose
                    WHERE 1=1
                    ${whereClause}
                    ORDER BY
                    fix DESC
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