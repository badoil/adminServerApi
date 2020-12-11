const db = require("../components/db");

module.exports.findOneByIdx = async (idx) => {
  try {
    let sql = "SELECT * FROM deal WHERE deal_idx = ?";
    return await db.query({
      sql,
      values: [idx],
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.insert = async (options, connection) => {
  try {
    let sql = `INSERT INTO deal SET ?`;
    return await db.query({
      connection: connection,
      sql,
      values: [options],
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleInsert = async (options, connection) => {
  try {
    console.log("options:", options[1].length);
    
    let sql = `INSERT INTO deal (deal_id, deal_state_code, repr_img, orig_price, hot_deal_or_not, hot_deal_expr_ts,
            ac_tgt_goods_or_not, max_acc_amt, deal_name, deal_overview, free_deliv_or_not, deliv_amt, 
            deal_classif, deal_opt_id, repr_timg, repr_cat_id, deal_disc_price,
            add_img_1, add_img_2, add_img_3,
            add_img_4, add_img_5, add_img_6, add_img_7, add_img_8, add_img_9, add_timg_1, add_timg_2,
            add_timg_3, add_timg_4, add_timg_5, add_timg_6, add_timg_7, add_timg_8, add_timg_9, first_create_dt_time) 
            VALUES ?`;
    return await db.query({
      connection: connection,
      sql: sql,
      values: [options],
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleInsertTest = async (options, connection) => {
  try {
    let sql = `INSERT INTO deal (deal_id, 
                                deal_classif, 
                                 deal_opt_id,
                             hot_deal_or_not, 
                         ac_tgt_goods_or_not, 
                             deal_state_code, 
                                   deal_name,
                               deal_overview,
                                   repr_timg, 
                                    sel_price, 
                                   first_create_dt_time,
                                   pur_cnt,
                                   view_cnt,
                                   wish_cnt) 
                    VALUES ?`;
    return await db.query({
      connection: connection,
      sql: sql,
      values: [options],
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.update = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET hot_deal_or_not = ?, ac_agt_goods_or_not = ? WHERE deal_idx = ?`;
    const result = await db.query({
      connection: connection,
      sql,
      values: [
        options.hot_deal_or_not,
        options.ac_agt_goods_or_not,
        options.deal_idx,
      ],
    });
    //console.log('result:', result)
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.updateAllColumn = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET ? WHERE deal_idx = ?`;
    const result = await db.query({
      connection: connection,
      sql,
      values: [options, options.deal_idx],
    });
    //console.log('result:', result)
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.updateRandomHotDeal = async (options, connection) => {
  try {
    console.log("options:", options.deal_idx);
    let sql = `UPDATE deal SET hot_deal_or_not = ?, hot_deal_expr_ts = ? WHERE deal_idx = ?`;
    const result = await db.query({
      connection: connection,
      sql,
      values: [
        options.hot_deal_or_not,
        options.hot_deal_expr_ts,
        options.deal_idx,
      ],
    });
    //console.log('result:', result)
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.updateRandomAcDeal = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET ac_tgt_goods_or_not = ? WHERE deal_idx = ?`;
    const result = await db.query({
      connection: connection,
      sql,
      values: [options.ac_tgt_goods_or_not, options.deal_idx],
    });
    //console.log('result:', result)
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.delete = async (idx, connection) => {
  try {
    let sql = `DELETE FROM deal 
                    WHERE deal_idx = ?`;
    return await db.query({
      connection,
      sql,
      values: [idx],
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleDelete = async (options, connection) => {
  try {
    let { idx_array, id_array } = options;
    let whereClause = "";
    let values = [];

    if (idx_array) {
      whereClause += ` AND deal_idx IN (?)`;
      values.push(idx_array);
    }
    if (id_array) {
      whereClause += ` AND deal_id IN (?)`;
      values.push(id_array);
    }
    let sql = `DELETE FROM deal 
                    WHERE 1=1
                    ${whereClause}`;

    const result = await db.query({
      connection,
      sql,
      values,
    });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.getList = async (options) => {
  try {
    let { deal_idx, deal_id, repr_cat_id, exp_cat_id } = options;

    let whereClause = "";
    let values = [];

    if (deal_idx) {
      whereClause += ` AND deal_idx = ?`;
      values.push(deal_idx);
    }
    if (deal_id) {
      whereClause += ` AND deal_id = ?`;
      values.push(deal_id);
    }
    if (repr_cat_id) {
      whereClause += ` AND repr_cat_id = ?`;
      values.push(repr_cat_id);
    }
    if (exp_cat_id) {
      whereClause += ` AND exp_cat_id = ?`;
      values.push(exp_cat_id);
    }

    let sql = `SELECT * 
                   FROM deal
                   WHERE 1=1
                   ${whereClause}`;
    return await db.query({
      sql,
      values,
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleInsertUpdate = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET`;
    let deal = options.goods;
    let dealIdxs = options.dealIdx;
    const dealKeys = Object.keys(deal[0]);
    // console.log('dealKeys:', dealKeys)

    for (let i = 0; i < deal.length; i++) {
      let value = deal[i];
      let dealIdx = dealIdxs[i];
      console.log("valueDeal:", value);

      sql += ` deal_id = CASE deal_idx 
                                    WHEN ${dealIdx} 
                                    THEN '${value.deal_id}' 
                                    ELSE deal_id
                                    END, sel_price = CASE deal_idx 
                                    WHEN ${dealIdx} 
                                    THEN '${value.sel_price}' 
                                    ELSE sel_price
                                    END,
                                    deal_state_code = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deal_state_code}'
                                    ELSE deal_state_code
                                    END,
                                    repr_img = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_img}'
                                    ELSE repr_img
                                    END,
                                    last_mod_dt_time = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.last_mod_dt_time}'
                                    ELSE last_mod_dt_time
                                    END,
                                    free_deliv_or_not = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.free_deliv_or_not}'
                                    ELSE free_deliv_or_not
                                    END,
                                    deliv_amt = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deliv_amt}'
                                    ELSE deliv_amt
                                    END,`;
    }
    for (let i = 0; i < deal.length; i++) {
      let value = deal[i];
      let dealIdx = dealIdxs[i];
      if (i == deal.length - 1) {
        for (let k = 1; k < 10; k++) {
          let imgKeys = dealKeys.find((key) => key === `add_img_${k}`);
          // console.log('imgKeys:', imgKeys)
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
        for (let j = 1; j < 9; j++) {
          let imgKeys = dealKeys.find((key) => key === `add_timg_${j}`);
          // console.log('imgKeys:', imgKeys)
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
        sql += ` add_timg_9 = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value.add_timg_9}'
                                                ELSE add_timg_9
                                                END`;
      } else {
        for (let k = 1; k < 10; k++) {
          let imgKeys = dealKeys.find((key) => key === `add_img_${k}`);
          // console.log('imgKeys:', imgKeys)
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
        for (let j = 1; j < 10; j++) {
          let imgKeys = dealKeys.find((key) => key === `add_timg_${j}`);
          // console.log('imgKeys:', imgKeys)
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
      }
    }

    // console.log('sql : ',sql)
    const { affectedRows } = await db.query({
      connection: connection,
      sql: sql,
      //values: [options]
    });
    return affectedRows;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleUpdate = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET`;
    let deal = options.goods;
    let dealIdxs = options.dealIdx;
    const dealKeys = Object.keys(deal[0]);
    console.log("dealKeys:", dealKeys);

    for (let i = 0; i < deal.length; i++) {
      let value = deal[i];
      let dealIdx = dealIdxs[i];
      console.log("valueDeal:", value);

      sql += ` orig_price = CASE deal_idx 
                                    WHEN ${dealIdx} 
                                    THEN '${value.sel_price}' 
                                    ELSE orig_price
                                    END,
                                    repr_img = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_img}'
                                    ELSE repr_img
                                    END,
                                    last_mod_dt_time = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.last_mod_dt_time}'
                                    ELSE last_mod_dt_time
                                    END,
                                    free_deliv_or_not = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.free_deliv_or_not}'
                                    ELSE free_deliv_or_not
                                    END,
                                    deliv_amt = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deliv_amt}'
                                    ELSE deliv_amt
                                    END,
                                    deal_classif = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deal_classif}'
                                    ELSE deal_classif
                                    END,
                                    deal_opt_id = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deal_opt_id}'
                                    ELSE deal_opt_id
                                    END,
                                    repr_timg = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_timg}'
                                    ELSE repr_timg
                                    END,
                                    repr_cat_id = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_cat_id}'
                                    ELSE repr_cat_id
                                    END,
                                    deal_disc_price = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deal_disc_price}'
                                    ELSE deal_disc_price
                                    END,`;
    }
    for (let i = 0; i < deal.length; i++) {
      let value = deal[i];
      let dealIdx = dealIdxs[i];
      if (i == deal.length - 1) {
        for (let k = 1; k < 10; k++) {
          let imgKeys = dealKeys.find((key) => key === `add_img_${k}`);
          console.log("imgKeys:", imgKeys);
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
        for (let j = 1; j < 9; j++) {
          let imgKeys = dealKeys.find((key) => key === `add_timg_${j}`);
          console.log("imgKeys:", imgKeys);
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
        sql += ` add_timg_9 = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value.add_timg_9}'
                                                ELSE add_timg_9
                                                END`;
      } else {
        for (let k = 1; k < 10; k++) {
          let imgKeys = dealKeys.find((key) => key === `add_img_${k}`);
          console.log("imgKeys:", imgKeys);
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
        for (let j = 1; j < 10; j++) {
          let imgKeys = dealKeys.find((key) => key === `add_timg_${j}`);
          console.log("imgKeys:", imgKeys);
          sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`;
        }
      }
    }

    console.log("sql : ", sql);
    const { affectedRows } = await db.query({
      connection: connection,
      sql: sql,
      //values: [options]
    });
    return affectedRows;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleCategoryUpdate = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET`;
    let categories = options.categories;
    let dealIdArray = options.dealIdArray;

    for (let i = 0; i < dealIdArray.length; i++) {
      const randomElement =
        categories[Math.floor(Math.random() * categories.length)];
      let deal_id = dealIdArray[i];
      if (i == dealIdArray.length - 1) {
        sql += ` repr_cat_id = CASE deal_id 
                WHEN ${deal_id} 
                THEN '${randomElement}'
                ELSE repr_cat_id
                END
                `;
      } else {
        sql += ` repr_cat_id = CASE deal_id 
                WHEN ${deal_id} 
                THEN '${randomElement}'
                ELSE repr_cat_id
                END,
                `;
      }
    }

    console.log("sql : ", sql);
    const { affectedRows } = await db.query({
      connection: connection,
      sql: sql,
      //values: [options]
    });
    return affectedRows;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleDiscountUpdate = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET`;
    let dealIdArray = options.dealIdArray;
    let origPriceArray = options.origPriceArray;
    let disPiceArray = options.disPiceArray;
    let length = dealIdArray.length;
    // let length = 4;
    for (let i = 0; i < length; i++) {
      let deal_id = dealIdArray[i];
      let orig_price = origPriceArray[i];
      let deal_disc_price = disPiceArray[i];
      if (i == length - 1) {
        sql += ` orig_price = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${orig_price}'
                        ELSE orig_price
                        END,
                        deal_disc_price = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${deal_disc_price}'
                        ELSE deal_disc_price
                        END`;
      } else {
        sql += ` orig_price = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${orig_price}'
                        ELSE orig_price
                        END,
                        deal_disc_price = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${deal_disc_price}'
                        ELSE deal_disc_price
                        END,
                `;
      }
    }

    // console.log('sql : ',sql)
    const { affectedRows } = await db.query({
      connection: connection,
      sql: sql,
      //values: [options]
    });
    return affectedRows;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleCountUpdate = async (options, connection) => {
  try {
    let sql = `UPDATE deal SET`;
    let dealIdArray = options.dealIdArray;
    let purCntArray = options.purCntArray;
    let viewCntArray = options.viewCntArray;
    let wishCntArray = options.wishCntArray;
    let freeDelivOrNotArray = options.freeDelivOrNotArray;
    let delivAmtArray = options.delivAmtArray;
    let length = dealIdArray.length;

    // let length = 4;
    for (let i = 0; i < length; i++) {
      let deal_id = dealIdArray[i];
      let pur_cnt = purCntArray[i];
      let view_cnt = viewCntArray[i];
      let wish_cnt = wishCntArray[i];
      let free_deliv_or_not = freeDelivOrNotArray[i];
      let deliv_amt = delivAmtArray[i];
      if (i == length - 1) {
        sql += ` pur_cnt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${pur_cnt}'
                        ELSE pur_cnt
                        END,
                        view_cnt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${view_cnt}'
                        ELSE view_cnt
                        END,
                        wish_cnt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${wish_cnt}'
                        ELSE wish_cnt
                        END,
                        free_deliv_or_not = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${free_deliv_or_not}'
                        ELSE free_deliv_or_not
                        END,
                        deliv_amt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${deliv_amt}'
                        ELSE deliv_amt
                        END`;
      } else {
        sql += ` pur_cnt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${pur_cnt}'
                        ELSE pur_cnt
                        END,
                        view_cnt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${view_cnt}'
                        ELSE view_cnt
                        END,
                        wish_cnt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${wish_cnt}'
                        ELSE wish_cnt
                        END,
                        free_deliv_or_not = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${free_deliv_or_not}'
                        ELSE free_deliv_or_not
                        END,
                        deliv_amt = CASE deal_id 
                        WHEN ${deal_id} 
                        THEN '${deliv_amt}'
                        ELSE deliv_amt
                        END,
                        `;
      }
    }

    console.log("sql : ", sql);
    const { affectedRows } = await db.query({
      connection: connection,
      sql: sql,
      //values: [options]
    });
    return affectedRows;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleGet = async (options) => {
  try {
    let sql = `SELECT deal_idx, deal_state_code, deliv_amt FROM deal WHERE deal_id IN (${options})`;
    return await db.query({
      sql,
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.multipleGetDeal = async (options) => {
  try {
    let sql = `SELECT * FROM deal WHERE deal_id IN (${options})`;
    return await db.query({
      sql,
    });
  } catch (e) {
    throw new Error(e);
  }
};
module.exports.multipleGetAll = async (options) => {
  try {
    let sql = `SELECT * FROM deal WHERE deal_id IN (${options})`;
    return await db.query({
      sql,
    });
  } catch (e) {
    throw new Error(e);
  }
};
