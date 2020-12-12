'use strict'

const config = require('../config/index')
const mysql = require('mysql')
const Schemas = require('../schemas/index')
const _ = require('lodash')
const moment = require('moment')

const pool = mysql.createPool({
  ...config.database,
  typeCast: function (field, next) {
    if ((field.type === 'TINY' || field.type === 'TINYINT') && field.length === 1) {
      return (field.string() === '1')
    }
    else if (field.type === 'JSON') {
      return JSON.parse(field.string())
    }
    return next()
  }
})

module.exports.query = (options) => {
  return new Promise((resolve, reject) => {
    // console.log('options sql : ', options.sql)
    let target = options.connection ? options.connection : pool
    target.query({sql: options.sql, values: options.values, nestTables: options.nestTables},
      (error, results, fields) => {
        if (error) {
          reject(error)
        }
        else {
          if (options.schema) {
            results.forEach(row => {
              Schemas.convert(row, options.schema, {useDefaults: true, removeAdditional: true})
            })
          }
          resolve(results)
        }
      })
  })
}


module.exports.beginTransaction = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.beginTransaction(err => {
          if (err) reject(this.rollback(connection))
          else resolve(connection)
        })
      }
    })
  })
}

module.exports.commit = (connection) => {
  return new Promise((resolve, reject) => {
    connection.commit(err => {
      if (err) reject(this.rollback(connection))
      else {
        connection.release()
        resolve()
      }
    })
  })
}

module.exports.rollback = (connection) => {
  return new Promise((resolve, reject) => {
    connection.rollback(err => {
      if (err) reject(err)
      else {
        connection.release()
        resolve()
      }
    })
  })
}
