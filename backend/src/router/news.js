const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/*
*   Sends the total count of news
*/
router.get('/count', (req, res) => {
    res.send({ count: JSON.parse(fs.readFileSync(path.join(__dirname, "../data/news.json"))).length });
});

/*
*   Sends the news object corresponding to the given id
*/
router.get('/:id', (req ,res) => {
    const id = req.params.id;

    const newsArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/news.json")));

    if (newsArray[id]) {
        res.send(newsArray[id]);
    } else {
        res.send(404);
    }
});

/*
*   Sends an array of news from id to (id + count)
*   if no more news, nothing is pushed into the array, the array will not be of given count every time
*/
router.get('/:id/:count', (req ,res) => {
    const id = parseInt(req.params.id);
    const count = parseInt(req.params.count);

    const newsArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/news.json")));
    let returnArray = [];

    for (let i = 0; i < count; i++) {
        if (newsArray[id + i]) {
            returnArray.push(newsArray[id + i]);
        }
    }

    res.send(returnArray);
});

module.exports = router