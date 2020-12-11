"use strict";

const handler = require("./deal-handler");
const goodsSortTypeHandler = require("../goodsSortType/goodsSortType-handler");
const exposedHandler = require("../exposed_category/exposed_category-handler");
const exposedCategoryDealHandler = require('../exposed_category_deal/exposed_category_deal-handler');
const db = require("../../../components/db");
const crypto = require("../../../components/crypto");
const util = require("../../../components/util");
const fake = require("../../../models/fake");

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try {
    const newDeal = req.options;
    console.log("newDeal: ", newDeal);

    newDeal.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newDeal, connection);
    await db.commit(connection);
    res.status(200).json(result);
  } catch (e) {
    await db.rollback(connection);
    next(e);
  }
};

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try {
    let newDeal = req.options;
    const deal = await handler.findOneByIdx(newDeal.deal_idx);
    console.log("deal:", deal);
    if (deal.length === 0) {
      throw { status: 404, errorMessage: "Deal not found" };
    }
    newDeal.last_mod_dt_time = util.getCurrentTime();
    newDeal.deal_id = deal[0].deal_id;
    newDeal.deal_idx = deal[0].deal_idx;

    const result = await handler.updateAllColumn(newDeal, connection);
    console.log("updateResult: ", result.affectedRows);
    if (result.affectedRows === 0) {
      throw { status: 404, errorMessage: "updating failed" };
    }
    await db.commit(connection);
    res.status(200).json({ result: true });
  } catch (e) {
    await db.rollback(connection);
    next(e);
  }
};

module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try {
    console.log("deleteId:", req.options);
    const result = await handler.delete(
      { idx: req.options.deal_idx },
      connection
    );
    console.log("deleteResult:", result);
    let returnValue = false;
    if (result.affectedRows === 1) {
      returnValue = true;
    }
    await db.commit(connection);
    res.status(200).json({ result: returnValue });
  } catch (e) {
    await db.rollback(connection);
    next(e);
  }
};

module.exports.getList = async (req, res, next) => {
  try {
    const options = req.options;
    let result;

    if (options.exp_cat_id) {
      let expCategory1 = await exposedCategoryDealHandler.getList({
        exp_cat_id: options.exp_cat_id,
      });
      let expCategory1CatIds = [];
      for (let j = 0; j < expCategory1.length; j++) {
        expCategory1CatIds.push(expCategory1[j].deal_id);
      }
      result = await handler.multipleGetAll(expCategory1CatIds);
    } else if (options.repr_cat_id) {
      result = await handler.getList(options);
    } else {
      result = await handler.getList(options);
    }

    return res.status(200).json({ lists: result });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
