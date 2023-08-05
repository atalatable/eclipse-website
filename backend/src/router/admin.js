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

// ADD QUERIES

router.post('/add/member', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { username, role, imageUrl, lineup } = req.body;
    
        if(!lineup) { lineup = 'none' }
        if(!imageUrl) { imageUrl = "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" }
        db.query("INSERT INTO members (id_lineups, name, role, imageUrl) SELECT id, ?, ?, ? FROM lineups WHERE name = ?;", [username, role, imageUrl, lineup])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/add/social', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { name, link } = req.body;

        db.query("INSERT INTO socials (name, link) VALUES (?, ?);", [name, link])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/add/news', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { title, description, content, imageUrl } = req.body;

        if(!description) {description = ""}
        if(!imageUrl) {imageUrl = ""}

        db.query("INSERT INTO news (title, description, content, imageUrl) VALUES (?, ?, ?, ?);", [title, description, content, imageUrl])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/add/lineups', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { name } = req.body;

        db.query("INSERT INTO lineups (name) VALUES (?, ?);", [name])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/add/admin', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { username, password } = req.body;

        db.query("INSERT INTO admins (username, password) VALUES (?, ?);", [username, md5(password)])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

// DELETE QUERIES

router.post('/delete/member', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { username } = req.body;

        db.query("DELETE FROM members WHERE name = ?;", [username])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/delete/social', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { name } = req.body;

        db.query("DELETE FROM socials WHERE name = ?;", [name])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/delete/news', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { title } = req.body;

        db.query("DELETE FROM news WHERE title = ?;", [title])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/delete/lineups', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { name } = req.body;

        db.query("DELETE FROM lineups WHERE name = ?;", [name])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/delete/admin', (req, res) => {
    
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { username } = req.body;

        db.query("DELETE FROM admins WHERE username = ?;", [username])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

// UPDATE QUERIES

router.post('/update/member', (req, res) => {
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { username, role, imageUrl, lineup, prevName } = req.body;

        db.query("UPDATE members SET name = ?, role = ?, imageUrl = ?, id_lineups = (SELECT id FROM lineups WHERE name = ?) WHERE name = ?;", [username, role, imageUrl, lineup, prevName])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/update/social', (req, res) => {
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { name, link, prevName } = req.body;

        db.query("UPDATE socials SET name = ?, link = ? WHERE name = ?;", [name, link, prevName])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/update/news', (req, res) => {
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { title, description, content, imageUrl, prevTitle } = req.body;

        db.query("UPDATE news SET title = ?, description = ?, content = ?, imageUrl = ? WHERE title = ?;", [title, description, content, imageUrl, prevTitle])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/update/lineups', (req, res) => {
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { name, prevName } = req.body;

        db.query("UPDATE lineups SET name = ? WHERE name = ?;", [name, prevName])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

router.post('/update/admin', (req, res) => {
    const status = verifyAdmin(req.headers.cookie);

    if (status == 0) {
        const { name, password, prevName } = req.body;

        db.query("UPDATE admins SET name = ?, password = ? WHERE name = ?;", [name, password, prevName])
        .then(status => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(status);
    }
});

// PRIVATE FUNCTIONS

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