const express = require('express');
const router = express.Router();
const db = require('../services/db');

/*
*   Sends all the members in a random order
*/
router.get('/', (req, res) => {
    db.query("SELECT members.name, members.role, members.imageUrl, lineups.name AS lineup FROM members INNER JOIN lineups on lineups.id = members.id_lineups ORDER BY RAND();")
    .then(rows => {
        res.send(rows);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/*
*   Sends all the linups in an array
*/
router.get('/lineups', (req, res) => {
    db.query("SELECT name from lineups;")
    .then(rows => {
        res.send(rows.map(item => item.name));
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/*
*   Sends all the players from given lineup
*/
router.get('/lineups/:lineup', (req, res) => {
    const lu = req.params.lineup;
    db.query("SELECT members.name, members.role, members.imageUrl, lineups.name AS lineup FROM members INNER JOIN lineups on lineups.id = members.id_lineups WHERE lineups.name = ? ORDER BY RAND();", lu)
    .then(rows => {
        res.send(rows);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = router;