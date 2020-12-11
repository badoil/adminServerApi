const db = require('../../components/db')

module.exports.findOneByGoods = async (name) => {
    try{
        console.log('title:', name);
        let sql = 'SELECT * FROM goods WHERE goods_name = ?'
        const result = await db.query({
            sql,
            values: [name]
        })
        console.log('findGoodsResult:', result);
        return result
    }catch(e){
        throw new Error(e);
    }
}

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                    FROM goods
                    WHERE goods_idx = ?`
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO goods SET ?`
        const result = await db.query({
            connection: connection,
            sql,
            values: [options]
          })
        return result
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO goods SET ?`
        console.log('options:', options);
        let goods = options.goods
        //goods.map(item => delete item.deal_id)
        let selPrice = goods.map(item => item.sel_price)
        let hotDealOrNot = goods.map(item => item.hot_deal_or_not)
        let hotDealExprTs = goods.map(item => item.hot_deal_expr_ts)
        let AcTgtGoodsOrNot = goods.map(item => item.ac_tgt_goods_or_not)
        let maxAccAmt = goods.map(item => item.max_acc_amt)
        let dealClassif = goods.map(item => item.deal_classif)
        let dealOptId = goods.map(item => item.deal_opt_id)
        let dealDiscPrice = goods.map(item => item.deal_disc_price)
    
        console.log('selPrice:', selPrice)
        goods.map(item => delete item.sel_price)
        goods.map(item => delete item.hot_deal_or_not)
        goods.map(item => delete item.hot_deal_expr_ts)
        goods.map(item => delete item.ac_tgt_goods_or_not)
        goods.map(item => delete item.max_acc_amt)
        goods.map(item => delete item.deal_classif)
        goods.map(item => delete item.deal_opt_id)
        goods.map(item => delete item.deal_disc_price)

        let returnValue = [];
        for(let i=0; i<goods.length; i++){
            let value = goods[i]

            const result = await db.query({
                connection: connection,
                sql: sql,
                values: [value]
            })
            returnValue.push(result);
        }
        console.log('returnValue:', returnValue)
    //   for(let i=0; i<returnValue.length; i++){
    //     const result = returnValue[i].sel_price = selPrice[i]
    //     returnValue.push(result)
    //   }
        return ({result: returnValue, selPrice, hotDealOrNot, hotDealExprTs, 
            AcTgtGoodsOrNot, maxAccAmt, dealClassif, dealOptId, dealDiscPrice});

    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleInsertTest = async (options, connection) => {
    try{
        
        let sql = `INSERT INTO goods (goods_id, 
                                   repr_cat_id, 
                                      erp_code, 
                                     goods_name, 
                                     orig_price, 
                                       pur_price,  
                               sales_unit_price,
                                      brand_id, 
                                goods_state_code, 
                                       stock_qty, 
                                      suppl_code, 
                                  goods_overview, 
                                      pb_classif,
                                     erp_classif, 
                                sel_phar_classif, 
                                   ns_cxn_cat_id, 
                                sabang_cxn_cat_id, 
                              first_create_dt_time) 
                    VALUES ?`

        return await db.query({
            connection: connection,
            sql: sql,
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
            sql: `UPDATE goods SET ? WHERE goods_idx = ?`,
            values: [options, options.goods_idx]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try{
        let sql = `UPDATE goods SET`
        let goods = options.goods? options.goods : options
        console.log('goodsMultipleUpdate:', goods)
        goods.map(item => delete item.deal_id);
        goods.map(item => delete item.sel_price);
        goods.map(item => delete item.free_deliv_or_not);
        goods.map(item => delete item.deliv_amt);
        goods.map(item => delete item.deal_state_code);
        goods.map(item => delete item.deal_classif)
        goods.map(item => delete item.deal_opt_id)
        goods.map(item => delete item.deal_disc_price)

        
        for (let i=0;i<goods.length;i++){
            let value = goods[i]
            console.log('value:', value)
            const goodsKeys = Object.keys(goods[0])
            console.log('goodsKeys:', goodsKeys)
                if(i==goods.length-1){
                    for(let k=0; k<goodsKeys.length; k++){
                    console.log('i==goods.length-1')
                        if(k==goodsKeys.length-1){
                            sql += ` ${goodsKeys[k]} = CASE goods_idx 
                            WHEN ${value.goods_idx} 
                            THEN '${value[goodsKeys[k]]}' 
                            ELSE ${goodsKeys[k]} 
                            END` 
                        }else{
                            sql += ` ${goodsKeys[k]} = CASE goods_idx 
                            WHEN ${value.goods_idx} 
                            THEN '${value[goodsKeys[k]]}' 
                            ELSE ${goodsKeys[k]} 
                            END,` 
                        }
                    }
                } else {
                    for(let j=0; j<goodsKeys.length; j++){
                    console.log('else')
                    sql += ` ${goodsKeys[j]} = CASE goods_idx 
                                                    WHEN ${value.goods_idx} 
                                                    THEN '${value[goodsKeys[j]]}' 
                                                    ELSE ${goodsKeys[j]} 
                                                    END,` 
                    }
                }           
        }
    
        console.log('sql : ',sql)
        const result = await db.query({
            connection: connection,
            sql: sql
            //values: [options]
        })
        return result
    
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    
    try{
    let {term_start_dt, term_end_dt, repr_cat_id, mfr_id, goods_state_code, srch_orderby, 
           srch_seq, srch_cnt, srch_kwd, stock_qty, id_array, goods_name, suppl_name, brand_name, mfr_name,
           goods_idx} = options


    let whereClause = ''
    let orderClause = ''
    let limitClause = ``
    let values = []

    if(term_start_dt){
        whereClause += ` AND DATE(first_create_dt_time) >= ?`
        values.push(term_start_dt)
    }
    if(term_end_dt){
        whereClause += ` AND DATE(first_create_dt_time) <= ?`
        values.push(term_end_dt)
    }
    if(repr_cat_id){
        whereClause += ` AND repr_cat_id = ?`
        values.push(repr_cat_id)
    }
    if(goods_name){
        whereClause += ` AND goods_name 
                         LIKE ?`
        values.push(`%${goods_name}%`)
    }
    if(mfr_id !== undefined){
        console.log("mfr_id:", mfr_id)
        whereClause += ` AND mfr_id = ?`
        values.push(mfr_id)
    }

    if(id_array){
        whereClause += ` AND goods_id IN (?)`
        values.push(id_array)
    }
    if(goods_idx){
        whereClause += ` AND goods_idx = ?`
        values.push(goods_idx)
    }
    if(goods_state_code){
        whereClause += ` AND goods_state_code = ?`
        values.push(goods_state_code)
    }
    if(stock_qty){
        whereClause += ` AND stock_qty = ?`
        values.push(stock_qty)
    }
    if(srch_kwd){
        whereClause += ` AND goods_name
                         LIKE ?
                         OR onr_goods_code
                         LIKE ?`
        values.push(`%${srch_kwd}%`)
        values.push(`%${srch_kwd}%`)  
    }
    
    if(!srch_orderby){
        srch_orderby = 'goods.first_create_dt_time'
    } 
    if(!srch_seq){
        srch_seq = 'asc'
    }  

    if(srch_orderby){
        switch (srch_orderby) {
            case "first_create_dt_time":
                srch_orderby = 'first_create_dt_time'
            break
            case "orig_price":
                srch_orderby = 'orig_price'
            break
            case "sales_unit_price":
                srch_orderby = 'sales_unit_price'
            break
            case "pymt_amt":
                srch_orderby = 'pymt_amt'
            break
            case "used_acc_amt":
                srch_orderby = 'used_acc_amt'
            break
            case "used_sp_acc_amt":
                srch_orderby = 'used_sp_acc_amt'
            break
            case "재고있음":
                whereClause += ` AND stock_qty > 0`
                srch_orderby = 'stock_qty'
            break
            case "재고없음":
                whereClause += ` AND stock_qty <= 0`
                srch_orderby = 'stock_qty'
            break
            case "5개이하":
                whereClause += ` AND stock_qty <= 5`
                srch_orderby = 'stock_qty'
            break
            case "10개이하":
                whereClause += ` AND stock_qty <= 10`
                srch_orderby = 'stock_qty'
            break
            case "50개이하":
                whereClause += ` AND stock_qty <= 50`
                srch_orderby = 'stock_qty'
            break
            case "100개이하":
                whereClause += ` AND stock_qty <= 100`
                srch_orderby = 'stock_qty'
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

        let sql = `SELECT *
                        FROM goods
                        WHERE 1=1
                    ${whereClause}                        
                    ${orderClause}  
                    ${limitClause}`
        console.log("sql1:", sql)

        if(suppl_name){
            //whereClause += ` AND supplier.name LIKE ?`
            sql = `SELECT goods.*, supplier.* 
                    FROM (
                        SELECT name, suppl_id 
                        FROM supplier  
                        WHERE name LIKE ?                      
                        )supplier
                    JOIN goods
                    ON goods.suppl_code = supplier.suppl_id
                    WHERE
                        1=1
                    ${whereClause}
                    GROUP BY goods.goods_idx
                    ${orderClause}  
                    ${limitClause}`
            
            values.push(`%${suppl_name}%`)
        }
        if(brand_name){
            //whereClause += ` AND brand.brand_name LIKE ?`
            sql = `SELECT goods.*, brand.* 
                    FROM (
                        SELECT brand_name, brand_id
                        FROM brand
                        WHERE brand_name LIKE ?
                    )brand
                    JOIN goods
                    ON goods.brand_id = brand.brand_id
                    WHERE
                        1=1
                    ${whereClause}
                    GROUP BY goods.goods_idx
                    ${orderClause}  
                    ${limitClause}`

            values.push(`%${brand_name}%`)
        }
        if(mfr_name){
            //whereClause += ` AND manufacturer.mfr_name LIKE ?`
            sql = `SELECT goods.*, manufacturer.* 
                    FROM (
                        SELECT mfr_id, mfr_name
                        FROM manufacturer
                        WHERE mfr_name LIKE ?
                    )manufacturer
                    JOIN goods
                    ON goods.mfr_id = manufacturer.mfr_id
                    WHERE
                        1=1
                    ${whereClause}
                    GROUP BY goods.goods_idx
                    ${orderClause}
                    ${limitClause}`

            values.push(`%${mfr_name}%`)
        }

        console.log("sql:", sql)
        return await db.query({
            sql,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getListTotal = async (options) => {
    try{
        console.log('options',options)
        let {term_start_dt, term_end_dt, repr_cat_id, mfr_id, goods_state_code, srch_orderby, 
            srch_seq, srch_cnt, srch_kwd, stock_qty, id_array, goods_name, suppl_name, brand_name, mfr_name,
            goods_idx} = options
 
 
     let whereClause = ''
     let orderClause = ''
     let limitClause = ``
     let values = []
 
     if(term_start_dt){
         whereClause += ` AND DATE(first_create_dt_time) >= ?`
         values.push(term_start_dt)
     }
     if(term_end_dt){
         whereClause += ` AND DATE(first_create_dt_time) <= ?`
         values.push(term_end_dt)
     }
     if(repr_cat_id){
         whereClause += ` AND repr_cat_id = ?`
         values.push(repr_cat_id)
     }
     if(goods_name){
         whereClause += ` AND goods_name 
                          LIKE ?`
         values.push(`%${goods_name}%`)
     }
     if(mfr_id !== undefined){
         console.log("mfr_id:", mfr_id)
         whereClause += ` AND mfr_id = ?`
         values.push(mfr_id)
     }
 
     if(id_array){
         whereClause += ` AND goods_id IN (?)`
         values.push(id_array)
     }
     if(goods_idx){
         whereClause += ` AND goods_idx = ?`
         values.push(goods_idx)
     }
     if(goods_state_code){
         whereClause += ` AND goods_state_code = ?`
         values.push(goods_state_code)
     }
     if(stock_qty){
         whereClause += ` AND stock_qty = ?`
         values.push(stock_qty)
     }
     if(srch_kwd){
         whereClause += ` AND goods_name
                          LIKE ?
                          OR onr_goods_code
                          LIKE ?`
         values.push(`%${srch_kwd}%`)
         values.push(`%${srch_kwd}%`)  
     }
     
     if(!srch_orderby){
         srch_orderby = 'goods.first_create_dt_time'
     } 
     if(!srch_seq){
         srch_seq = 'asc'
     }  
 
     if(srch_orderby){
        switch (srch_orderby) {
            case "first_create_dt_time":
                srch_orderby = 'first_create_dt_time'
            break
            case "orig_price":
                srch_orderby = 'orig_price'
            break
            case "sales_unit_price":
                srch_orderby = 'sales_unit_price'
            break
            case "pymt_amt":
                srch_orderby = 'pymt_amt'
            break
            case "used_acc_amt":
                srch_orderby = 'used_acc_amt'
            break
            case "used_sp_acc_amt":
                srch_orderby = 'used_sp_acc_amt'
            break
            case "재고있음":
                whereClause += ` AND stock_qty > 0`
                srch_orderby = 'stock_qty'
            break
            case "재고없음":
                whereClause += ` AND stock_qty <= 0`
                srch_orderby = 'stock_qty'
            break
            case "5개이하":
                whereClause += ` AND stock_qty <= 5`
                srch_orderby = 'stock_qty'
            break
            case "10개이하":
                whereClause += ` AND stock_qty <= 10`
                srch_orderby = 'stock_qty'
            break
            case "50개이하":
                whereClause += ` AND stock_qty <= 50`
                srch_orderby = 'stock_qty'
            break
            case "100개이하":
                whereClause += ` AND stock_qty <= 100`
                srch_orderby = 'stock_qty'
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
 
    
        let sql = `SELECT *
                         FROM goods
                         WHERE 1=1
                     ${whereClause}`
         if(suppl_name){
            //whereClause += ` AND supplier.name LIKE ?`
            sql = `SELECT goods.*, supplier.* 
                    FROM (
                        SELECT name, suppl_id 
                        FROM supplier
                        WHERE name LIKE ?                         
                        )supplier
                    JOIN goods
                    ON goods.suppl_code = supplier.suppl_id
                    WHERE
                        1=1
                    ${whereClause}
                    GROUP BY goods.goods_idx
                    `
            values.push(`%${suppl_name}%`)
        }
         if(brand_name){
             //whereClause += ` AND brand.brand_name LIKE ?`
            sql = `SELECT goods.*, brand.* 
                    FROM (
                        SELECT brand_name, brand_id
                        FROM brand
                        WHERE brand_name LIKE ?
                    )brand
                    JOIN goods
                    ON goods.brand_id = brand.brand_id
                    WHERE
                        1=1
                    ${whereClause}
                    GROUP BY goods.goods_idx
                    `

            values.push(`%${brand_name}%`)
         }
         if(mfr_name){
             //whereClause += ` AND manufacturer.mfr_name LIKE ?`
             sql = `SELECT goods.*, manufacturer.* 
                     FROM (
                         SELECT mfr_id, mfr_name
                         FROM manufacturer
                         WHERE mfr_name LIKE ?
                     )manufacturer
                     JOIN goods
                     ON goods.mfr_id = manufacturer.mfr_id
                     WHERE
                         1=1
                     ${whereClause}
                     GROUP BY goods.goods_idx`
 
             values.push(`%${mfr_name}%`)
         }
         return await db.query({
             sql,
             values
         })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.multipleDelete = async(options, connection) => {
    try{
        let sql = `DELETE FROM goods WHERE goods_idx IN (?)`
            return await db.query({
                connection,
                sql: sql,
                values: [options.idx_array]
            })
    }catch(e){
        throw new Error(e);
    }
};

module.exports.multipleGet = async(options) => {
    try{
        let sql = `SELECT goods_id FROM goods WHERE goods_idx IN (?)`
        return await db.query({
            sql,
            values: [options]
        })
    }catch(e){
        throw new Error(e);
    }
}