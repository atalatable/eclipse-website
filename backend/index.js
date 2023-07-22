const express = require('express');
const { members } = require('./data');

const app = express();
app.use(express.json())
const port = 5000;

app.get('/api/members', (req, res) => {
   res.send(members);
});

app.use(express.static('app'));

app.listen(port,() => {
    console.log("Express Server listening on port " + port)
});