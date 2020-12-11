const db = require('../components/db')

module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM push`        
        return await db.query({
            sql: sql
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try{
        const {insertId} = await db.query({
            connection: connection,
            sql: `INSERT INTO push SET ?`,
            values: [options]
        })
        return insertId
    } catch(err){
        throw new Error(err)
    }
}