const db = require('../components/db')

module.exports.findOneByIdx = async (email_form_idx) => {
    try {
        let query = `SELECT * 
                       FROM email_form 
                      WHERE email_form_idx = ? 
                      limit 1`
        const result = await db.query({
            sql: query,
            values: [email_form_idx]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}



module.exports.getList = async (option) => { // condition filter
    try {
        let {email_form_idx} = option
        let sql = `SELECT * 
                     FROM email_form`

        let whereClause = ``
        let values = []
        if(email_form_idx){
            whereClause += ` AND email_form_idx = ?`
            values.push(email_form_idx)
        }


        // return await db.query(sql)
        return await db.query({
            sql:  sql + 
                  ` WHERE 1=1
                    ${whereClause}`, 
            values:values
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        const { insertId } = await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO email_form 
                     SET ?`,
            values: [options]
        })
        return insertId
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try {
        const { affectedRows } = await db.query({
            connection: connection,
            sql: `UPDATE email_form 
                     SET ? 
                   WHERE email_form_idx = ?`,
            values: [options, options.email_form_idx]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (email_form_idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM email_form 
                   WHERE email_form_idx = ?`,
            values: [email_form_idx]
        })
    } catch (err) {
        throw new Error(err)
    }
}