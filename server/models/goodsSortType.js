const db = require('../components/db')

module.exports.getList = async (option) => { // condition filter
    try{
        let query = `SELECT * FROM 상품분류 WHERE 분류 = ?`
        return  await db.query({
            sql: query,
            values: [option.type]
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.create = async (option) => {
    try{
        let sql = `INSERT INTO 상품분류 SET ?`
        return await db.query(sql, option)
    } catch(err){
        throw new Error(err)
    }
}