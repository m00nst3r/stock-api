const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.json({"hello": "world"})
});

app.get('/health', (req, res) => {
    res.status(200).json({"status": "up"})
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});