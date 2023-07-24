const express = require('express');
const path = require('path');
const fs = require('fs')
const cors = require('cors');

const app = express();
app.use(express.json())
const port = process.env.port || 5000;

// For developpment puroposes only

app.use(cors({credentials: true, origin: ["http://localhost:4200"]}))

// API

app.get('/api/members', (req, res) => {
    res.send(
        JSON.parse(
            fs.readFileSync(
            path.join(__dirname, "data/members.json"))).members.
            sort((a,b) => ( 0.5 - Math.random() ))
    );
});

app.get('/api/members/lineups', (req, res) => {
    res.send(JSON.parse(fs.readFileSync(path.join(__dirname, "data/members.json"))).lineups);
});

app.get('/api/members/lineups/:lineup', (req, res) => {
    const lu = req.params.lineup;
    res.send(JSON.parse(fs.readFileSync(path.join(__dirname, "data/members.json"))).members.filter(member => member.lineup.toLowerCase() == lu));
});

app.get('/api/socials', (req, res) => {
    res.send(JSON.parse(fs.readFileSync(path.join(__dirname, "data/socials.json"))));
});

// Angular

app.use(express.static('app'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('app/index.html'));
});

app.listen(port, () => {
    console.log("Express Server listening on port " + port)
});
