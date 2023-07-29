const express = require('express');
const db = require('../services/db');
const router = express.Router();

router.get('/', (req, res) => {
    db.query("SELECT name, link FROM socials;")
    .then(rows => {
        res.send(rows);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = router