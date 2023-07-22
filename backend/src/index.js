const express = require('express');
const { members } = require('./data');
const path = require('path')

const app = express();
app.use(express.json())
const port = process.env.port || 5000;

// API

app.get('/api/members', (req, res) => {
   res.send(members);
});

// Angular

app.use(express.static('app'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('app/index.html'));
});

app.listen(port,() => {
    console.log("Express Server listening on port " + port)
});