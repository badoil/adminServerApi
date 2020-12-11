const db = require('../../components/db')


module.exports.findOneByIdx = async (idx) => {
    try {
        let query = `SELECT * 
                       FROM table_name 
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
                    INTO table_name 
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
            sql: `UPDATE table_name 
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
                    FROM table_name 
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
            tbl_name, idx          
                } = options;
        
        let whereClause = ``
        let values = []

        if(idx){
            whereClause += ` AND idx 
                            = ?`
            values.push(idx)            
        }
        if(tbl_name){
            whereClause += ` AND tbl_name 
                            = ?`
            values.push(tbl_name)            
        }

        let sql = `SELECT * 
                    FROM table_name
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