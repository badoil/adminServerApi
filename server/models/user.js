const db = require('../components/db')

module.exports.getList = async (options) => { // condition filter
    const {
        mbr_auth,   //회원인증
        mbr_lev,    //회원등급
        sex,    //성별
        join_suburb,    //가입지역
        cur_cxn,    //현재접속
        marri_or_not,   //결혼여부
        info_email_rcpt_or_not,     //정보메일수신여부
        sms_rcpt_or_not,    //문자수신여부
        id,
        name,
        freq_phar,  //선호약국
        address_1,  //주소1 2도있음
        Affiliation,    //소속지부
        charged_sv,     //담당SV
        limit,
        start_date,
        end_date
    } = options

    let page = options.page

    // console.log("page",page)

    if(!page || page<0){
        page = 1
    }
        
    let offset = (page-1)*limit

    let limitClause
    // console.log('limit',limit)
    if(limit){
        limitClause = `limit ${offset}, ${limit}`
    }else{
        limitClause = ``
    }

    let whereClause = ''

    if(mbr_auth)
        whereClause += ` AND mbr_auth = '${mbr_auth}'`
    if(mbr_lev)
        whereClause += ` AND mbr_lev = '${mbr_lev}'`
    if(sex)
        whereClause += ` AND sex = '${sex}'`
    if(join_suburb)
        whereClause += ` AND join_suburb = '${join_suburb}'`
    if(cur_cxn)
        whereClause += ` AND cur_cxn = '${cur_cxn}'`
    if(marri_or_not)
        whereClause += ` AND marri_or_not = '${marri_or_not}'`
    if(info_email_rcpt_or_not)
        whereClause += ` AND info_email_rcpt_or_not = '${info_email_rcpt_or_not}'`
    if(sms_rcpt_or_not)
        whereClause += ` AND sms_rcpt_or_not = '${sms_rcpt_or_not}'`
    if(id)
        whereClause += ` AND id LIKE '%${id}%'`
    if(name)
        whereClause += ` AND name LIKE '%${name}%'`
    if(freq_phar)
        whereClause += ` AND freq_phar LIKE '%${freq_phar}%'`
    if(address_1)
        whereClause += ` AND address_1 LIKE '%${address_1}%'`
    if(charged_sv)
        whereClause += ` AND charged_sv LIKE '%${charged_sv}%'`
    if(Affiliation)
        whereClause += ` AND Affiliation LIKE '%${Affiliation}%'`
    if(start_date && !end_date)
        whereClause += ` AND join_dt >= '${start_date}' `
    if(end_date)
        whereClause += ` AND str_to_date(join_dt,'%Y-%m-%d') BETWEEN '${start_date}' AND '${end_date}' `
    try {
        return await db.query({
            sql: `
                SELECT 
                    * 
                FROM 
                    Customer
                WHERE 1=1
                ${whereClause}
                ORDER BY
                    join_dt DESC
                ${limitClause}`
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getListTotal = async(options) => {
    const {
        mbr_auth,   //회원인증
        mbr_lev,    //회원등급
        sex,    //성별
        join_suburb,    //가입지역
        cur_cxn,    //현재접속
        marri_or_not,   //결혼여부
        info_email_rcpt_or_not,     //정보메일수신여부
        sms_rcpt_or_not,    //문자수신여부
        id,
        name,
        freq_phar,  //선호약국
        address_1,  //주소1 2도있음
        Affiliation,    //소속지부
        charged_sv,     //담당SV
        limit,
        start_date,
        end_date
    } = options

    let page = options.page

    // console.log("page",page)

    if(!page || page<0){
        page = 1
    }
        
    let offset = (page-1)*limit

    let limitClause
    // console.log('limit',limit)
    if(limit){
        limitClause = `limit ${offset}, ${limit}`
    }else{
        limitClause = ``
    }

    let whereClause = ''

    if(mbr_auth)
        whereClause += ` AND mbr_auth = '${mbr_auth}'`
    if(mbr_lev)
        whereClause += ` AND mbr_lev = '${mbr_lev}'`
    if(sex)
        whereClause += ` AND sex = '${sex}'`
    if(join_suburb)
        whereClause += ` AND join_suburb = '${join_suburb}'`
    if(cur_cxn)
        whereClause += ` AND cur_cxn = '${cur_cxn}'`
    if(marri_or_not)
        whereClause += ` AND marri_or_not = '${marri_or_not}'`
    if(info_email_rcpt_or_not)
        whereClause += ` AND info_email_rcpt_or_not = '${info_email_rcpt_or_not}'`
    if(sms_rcpt_or_not)
        whereClause += ` AND sms_rcpt_or_not = '${sms_rcpt_or_not}'`
    if(id)
        whereClause += ` AND id LIKE '%${id}%'`
    if(name)
        whereClause += ` AND name LIKE '%${name}%'`
    if(freq_phar)
        whereClause += ` AND freq_phar LIKE '%${freq_phar}%'`
    if(address_1)
        whereClause += ` AND address_1 LIKE '%${address_1}%'`
    if(charged_sv)
        whereClause += ` AND charged_sv LIKE '%${charged_sv}%'`
    if(Affiliation)
        whereClause += ` AND Affiliation LIKE '%${Affiliation}%'`
    if(start_date && !end_date)
        whereClause += ` AND join_dt >= '${start_date}' `
    if(end_date)
        whereClause += ` AND str_to_date(join_dt,'%Y-%m-%d') BETWEEN '${start_date}' AND '${end_date}' `
    try {
        return await db.query({
            sql: `
                SELECT 
                    COUNT(*) as total 
                FROM 
                    Customer
                WHERE 1=1
                ${whereClause}
                `
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        const { insertId } = await db.query({
            connection: connection,
            sql: `INSERT INTO Customer SET ?`,
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
            sql: `UPDATE Customer SET ? WHERE idx = ?`,
            values: [options, options.idx]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE FROM Customer WHERE idx = ?`,
            values: [idx]
        })
    } catch (err) {
        throw new Error(err)
    }
}