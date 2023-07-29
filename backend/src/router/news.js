const express = require('express');
const router = express.Router();
const db = require('../services/db');

/*
*   Sends the total count of news
*/
router.get('/count', (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM news;")
    .then(rows => {
        res.send(rows[0]);
    }).catch(err => {
        console.err(err);
        res.sendStatus(500);
    });
});

/*
*   Sends the news object corresponding to the given title
*/
router.get('/:title', (req ,res) => {
    const title = decodeURI(req.params.title);

    db.query("SELECT title, description, content, imageUrl, DATE_FORMAT(date,'%d/%m/%Y') as date FROM news WHERE title = ?;", title)
    .then(rows => {
        res.send(rows[0]);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/*
*   Sends an array of news from id to (id + count)
*   if no more news, nothing is pushed into the array, the array will not be of given count every time
*/
router.get('/:id/:count', (req ,res) => {
    const id = parseInt(req.params.id);
    const count = parseInt(req.params.count);

    db.query("SELECT title, description, content, imageUrl, DATE_FORMAT(date,'%d/%m/%Y') as date FROM news ORDER BY date LIMIT ? OFFSET ?;", [count, id])
    .then(rows => {
        res.send(rows);
    }).catch(err => {
        console.error(err);
    });
});

module.exports = router