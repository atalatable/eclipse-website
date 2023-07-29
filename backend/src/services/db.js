const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.database)

let db = {}

db.query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, rows) => {
            if (err) {
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = db