const { exit } = require('process');
const db = require('../services/db');
const fs = require('fs');

const sqlInit = fs.readFileSync("src/data/init.sql").toString();
const sqlValues = fs.readFileSync("src/data/values.sql").toString();

console.log("APP - CREATING TABLES");
db.query(sqlInit).then((rows) => {
    console.log("APP - POPULATING TABLES");
    db.query(sqlValues).catch(err => console.log(err))
    .then((rows) => {
        console.log("DATABASE INITIALIZED");
        exit(0);
    })
}).catch(err => console.log(err))