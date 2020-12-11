const db = require('../components/db')

module.exports.findOneById = async (id) => {
    try{
        let query = `SELECT * FROM admin WHERE admin_id = ? limit 1`
        const result = await db.query({
            sql: query,
            values: [id]
        })
        return result[0]
    } catch(err){
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try{
        const {affectedRows} = await db.query({
            connection: connection,
            sql: `UPDATE admin SET ? WHERE admin_idx = ?`,
            values: [options, options.admin_idx]
        })
        return affectedRows
    } catch(err){
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try{
        const {insertId} = await db.query({
            connection: connection,
            sql: `INSERT INTO admin SET ?`,
            values: [options]
        })
        return insertId
    } catch(err){
        throw new Error(err)
    }
}

module.exports.delete = async (admin_idx, connection) => {
    try{
        return await db.query({
            connection,
            sql: `DELETE FROM admin WHERE admin_idx = ?`,
            values: [admin_idx]
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        let sql = `SELECT * FROM admin`

        if(options){
            if(options.admin_idx){
                sql += ` WHERE admin_idx = ?`
            }
        }        
        return await db.query({
            sql: sql,
            values: [options.admin_idx]
        })
    } catch(err){
        throw new Error(err)
    }
}