const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    res.send(JSON.parse(fs.readFileSync(path.join(__dirname, "../data/socials.json"))));
});

module.exports = router