const db = require('../components/db')

module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM 배너`
        console.log('sql : ',sql)
        return await db.query({
            sql: sql
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.create = async (option) => {
    try{
        let sql = `INSERT INTO 배너 SET ?`
        return await db.query(sql, option)
    } catch(err){
        throw new Error(err)
    }
}