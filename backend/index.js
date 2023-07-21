const express = require('express');

const app = express();
app.use(express.json())
const port = 5000;

app.get('/api/members', (req, res) => {
   res.send("Prout") 
});

app.listen(port,() => {
    console.log("Express Server listening on port " + port)
});