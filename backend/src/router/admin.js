const express = require('express');
const db = require('../services/db');
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    setTimeout(() => {        
        db.query("SELECT * FROM admin WHERE username = ? and password = ?", [username, md5(password)])
        .then(rows => {
            if (rows.length > 0) {
                delete rows[0].password;
                res.send(generateToken(rows[0]));
            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
    }, (Math.floor(Math.random() * 5 ) + 1) * 1000)

});

router.get('/', (req, res) => {
    db.query("SELECT * FROM admin;")
    .then(rows => {
        res.send(rows);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

const generateToken = (user) => {
    const token = jwt.sign({
        username: user.username, isAdmin: true
    }, "ThisIsASuperSecureKey", {expiresIn: "30d"});

    user.isAdmin = true;
    user.token = token;
    return user;
}

module.exports = router