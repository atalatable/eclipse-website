const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    res.send(
        JSON.parse(
            fs.readFileSync(
            path.join(__dirname, "../data/members.json"))).members.
            sort((a,b) => ( 0.5 - Math.random() ))
    );
});

router.get('/lineups', (req, res) => {
    res.send(JSON.parse(fs.readFileSync(path.join(__dirname, "../data/members.json"))).lineups);
});

router.get('/lineups/:lineup', (req, res) => {
    const lu = req.params.lineup;
    res.send(JSON.parse(fs.readFileSync(path.join(__dirname, "../data/members.json"))).members.filter(member => member.lineup.toLowerCase() == lu));
});

module.exports = router