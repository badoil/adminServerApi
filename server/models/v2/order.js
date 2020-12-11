const db = require('../../components/db')


module.exports.getList = async (options) => { // condition filter
    
    try{
        console.log('options',options)
    let {order_idx, cust_id,
        term_start_dt, term_end_dt, repr_cat_id, order_state_code, pymt_way_code, srch_orderby, 
           srch_seq, srch_cnt, order_num, cust_name, mobile, rcpt_name, goods_name, suppl_code,
           order_classif_code} = options


    let whereClause = ''
    let orderClause = ''
    let limitClause = ``
    let values = []

    let sql = `SELECT * 
                FROM 
                orders
                WHERE
                1=1`

    if(term_start_dt){
        whereClause += ` AND DATE(order_dt) >= ?`
        values.push(term_start_dt)
    }
    if(term_end_dt){
        whereClause += ` AND DATE(order_dt) <= ?`
        values.push(term_end_dt)
    }
    if(order_idx){
        whereClause += ` AND order_idx = ?`
        values.push(order_idx)
    }
    if(order_num){
        whereClause += ` AND order_num = ?`
        values.push(order_num)
    }
    if(cust_name){
        sql = `SELECT c.cust_id, orders.*
                FROM (
                    SELECT cust_id
                    FROM customer
                    WHERE cust_name = ?
                )c
                JOIN orders 
                ON c.cust_id = orders.cust_id
                 `
        values.push(cust_name)
    }
    if(cust_id){
        whereClause += ` AND cust_id = ?`
        values.push(cust_id)
    }
    if(mobile){
        sql = `SELECT c.cust_id, orders.*
                FROM (
                    SELECT cust_id
                    FROM customer
                    WHERE mobile = ?
                )c
                JOIN orders 
                ON c.cust_id = orders.cust_id
                 `
        values.push(mobile)
    }
    if(rcpt_name){
        sql = `SELECT r.order_num, orders.*
                FROM (
                    SELECT order_num
                    FROM order_delivery
                    WHERE rcpt_name = ?
                )r
                JOIN orders 
                ON r.order_num = orders.order_num
                 `
        values.push(rcpt_name)
    }
    if(goods_name){
        sql = `SELECT g.goods_id, orders.*
                FROM (
                    SELECT goods_id
                    FROM goods
                    WHERE goods_name = ?
                )g
                JOIN orders 
                ON g.goods_id = orders.deal_id
                 `
        values.push(goods_name)
    }
    if(suppl_code){
        whereClause += ` AND suppl_code = ?`
        values.push(suppl_code)
    }
    if(order_classif_code){
        whereClause += ` AND order_classif_code = ?`
        values.push(order_classif_code)
    }
    if(order_state_code){
        whereClause += ` AND order_state_code = ?`
        values.push(order_state_code)
    }
    if(pymt_way_code){
        whereClause += ` AND pymt_way_code = ?`
        values.push(pymt_way_code)
    }
    
    if(!srch_orderby){
        srch_orderby = 'first_create_dt_time'
    } 
    if(!srch_seq){
        srch_seq = 'asc'
    }  

    if(srch_orderby){
        switch (srch_orderby) {
            case "first_create_dt_time":
                srch_orderby = 'orders.first_create_dt_time'

            break
            case "order_dt":
                srch_orderby = 'orders.order_dt'

            break
            case "pur_amt":
                srch_orderby = 'orders.pymt_amt'
            break
        }
    }
    orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`

        let page = options.page
        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }

        return await db.query({
            sql: sql + `
                ${whereClause}
                ${orderClause}  
                ${limitClause}`,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getListTotal = async (options) => { // condition filter
    
    try{
        console.log('options',options)
        let {order_idx, cust_id,
            term_start_dt, term_end_dt, repr_cat_id, order_state_code, pymt_way_code, srch_orderby, 
               srch_seq, srch_cnt, order_num, cust_name, mobile, rcpt_name, goods_name, suppl_code,
               order_classif_code} = options
    
    
        let whereClause = ''
        let orderClause = ''
        let limitClause = ``
        let values = []
    
        let sql = `SELECT * 
                    FROM 
                    orders
                    WHERE
                    1=1`
    
        if(term_start_dt){
            whereClause += ` AND DATE(order_dt) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(order_dt) <= ?`
            values.push(term_end_dt)
        }
        if(order_idx){
            whereClause += ` AND order_idx = ?`
            values.push(order_idx)
        }
        if(order_num){
            whereClause += ` AND order_num = ?`
            values.push(order_num)
        }
        if(cust_name){
            sql = `SELECT c.cust_id, orders.*
                    FROM (
                        SELECT cust_id
                        FROM customer
                        WHERE cust_name = ?
                    )c
                    JOIN orders 
                    ON c.cust_id = orders.cust_id
                     `
            values.push(cust_name)
        }
        if(cust_id){
            whereClause += ` AND cust_id = ?`
            values.push(cust_id)
        }
        if(mobile){
            sql = `SELECT c.cust_id, orders.*
                    FROM (
                        SELECT cust_id
                        FROM customer
                        WHERE mobile = ?
                    )c
                    JOIN orders 
                    ON c.cust_id = orders.cust_id
                     `
            values.push(mobile)
        }
        if(rcpt_name){
            sql = `SELECT r.order_num, orders.*
                    FROM (
                        SELECT order_num
                        FROM order_delivery
                        WHERE rcpt_name = ?
                    )r
                    JOIN orders 
                    ON r.order_num = orders.order_num
                     `
            values.push(rcpt_name)
        }
        if(goods_name){
            sql = `SELECT g.goods_id, orders.*
                    FROM (
                        SELECT goods_id
                        FROM goods
                        WHERE goods_name = ?
                    )g
                    JOIN orders 
                    ON g.goods_id = orders.deal_id
                     `
            values.push(goods_name)
        }
        if(suppl_code){
            whereClause += ` AND suppl_code = ?`
            values.push(suppl_code)
        }
        if(order_classif_code){
            whereClause += ` AND order_classif_code = ?`
            values.push(order_classif_code)
        }
        if(order_state_code){
            whereClause += ` AND order_state_code = ?`
            values.push(order_state_code)
        }
        if(pymt_way_code){
            whereClause += ` AND pymt_way_code = ?`
            values.push(pymt_way_code)
        }
        
        if(!srch_orderby){
            srch_orderby = 'first_create_dt_time'
        } 
        if(!srch_seq){
            srch_seq = 'asc'
        }  
    
        if(srch_orderby){
            switch (srch_orderby) {
                case "first_create_dt_time":
                    srch_orderby = 'orders.first_create_dt_time'
    
                break
                case "order_dt":
                    srch_orderby = 'orders.order_dt'
    
                break
                case "pur_amt":
                    srch_orderby = 'orders.pymt_amt'
                break
            }
        }
        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`
    
            let page = options.page
            if (!page || page < 0) {
                page = 1
            }
            let offset = (page - 1) * srch_cnt
    
            if (srch_cnt) {
                limitClause = ` LIMIT ${offset}, ${srch_cnt}`
            } else {
                limitClause = ``
            }
    
            return await db.query({
                sql: sql + `
                    ${whereClause}
                    `,
                values
            })
    } catch(err){
        throw new Error(err)
    }
}