require('dotenv').config();
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

router.post('/add/member', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { username, role, imageUrl, lineup } = req.body;
    
        if(lineup) {
            db.query("INSERT INTO members (id_lineups, name, role, imageUrl) SELECT id, ?, ?, ? FROM lineups WHERE name = ?;", [username, role, imageUrl, lineup])
            .then(status => {
                res.sendStatus(200);
            }).catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
        } else {
            db.query("INSERT INTO members (name, role, imageUrl) VALUES (?, ?, ?);", [username, role, imageUrl])
            .then(status => {
                res.sendStatus(200);
            }).catch(err => {
                console.error(err);
                res.sendStatus(500);
            });
        }
    } else {
        res.sendStatus(status);
    }
});

const generateToken = (user) => {
    const token = jwt.sign({
        username: user.username, isAdmin: true
    }, process.env.JWT_SECRET, {algorithm: "HS256", expiresIn: "30d"});

    user.isAdmin = true;
    user.token = token;
    return user;
}

const parseCookies = (cookies) => {
    let cookiesH = {};

    cookies.split(';').forEach(cookie => {
        let [name, value] = cookie.split("=");
        cookiesH[name] = value;
    });

    return cookiesH;
}

const verifyAdmin = (paramCookies) => {
    const cookies = parseCookies(paramCookies);
    let payload;

    if(!cookies.token) { return 401 }

    try {
        payload = jwt.verify(cookies.token, process.env.JWT_SECRET);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return 401
        }
        return 400
    }
    return 0;
}

module.exports = router