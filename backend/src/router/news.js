const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/count', (req, res) => {
    res.send({ count: JSON.parse(fs.readFileSync(path.join(__dirname, "../data/news.json"))).length });
});

router.get('/:id', (req ,res) => {
    const id = req.params.id;

    const newsArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/news.json")));

    if (newsArray[id]) {
        res.send(newsArray[id]);
    } else {
        res.send(404);
    }
});

router.get('/:id/:count', (req ,res) => {
    const id = req.params.id;
    const count = req.params.count;

    const newsArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/news.json")));
    let returnArray = [];

    for (let i = id; i < count; i++) {
        if (newsArray[id]) {
            returnArray.push(newsArray[i]);
        }
    }

    res.send(returnArray);
});

module.exports = router