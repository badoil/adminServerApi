const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM manufacturer 
                   WHERE mfr_idx = ?`
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.findOneById = async (id) => {
    try{
        let sql = `SELECT *
                    FROM manufacturer
                    WHERE mfr_id = ?`
        return await db.query({
            sql,
            values: [id]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.findOneByName = async (name) => {
    try{
        let sql = `SELECT * 
                   FROM manufacturer 
                   WHERE mfr_name = ?`
        return await db.query({
            sql,
            values: [name]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO manufacturer SET ?`
        return await db.query({
            connection: connection,
            sql,
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
            sql: `UPDATE manufacturer SET ? 
                  WHERE mfr_idx = ?`,
            values: [options, options.mfr_idx]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (idx, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM manufacturer 
                  WHERE mfr_idx = ?`,
            values: [idx]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM manufacturer`

        if(options){
            sql += ` WHERE mfr_idx = ${options}`
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