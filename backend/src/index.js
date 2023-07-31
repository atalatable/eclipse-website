require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const https = require('https');

const membersRoute = require('./router/members');
const socialRoute = require('./router/socials');
const newsRoute = require('./router/news');
const adminRoute = require('./router/admin');

const app = express();
app.use(express.json())
const port = process.env.NODE_LOCAL_PORT || 5000;

// For developpment puroposes only

app.use(cors({credentials: true, origin: ["http://localhost:4200"]}))

// API

app.use('/api/members', membersRoute);
app.use('/api/socials', socialRoute);
app.use('/api/news', newsRoute);
app.use('/api/admin', adminRoute);

// Angular

app.use(express.static('app'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('app/index.html'));
});

app.listen(port, () => {
    console.log("Express Server listening on port " + port)
});
