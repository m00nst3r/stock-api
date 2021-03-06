const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Privat24Module = require('./modules/PrivatModule');
const EuropeanCentralBankModule = require('./modules/EuropeanCentralBankModule');
const InitalLoad = require('./modules/InitalLoad');
const logger = require('morgan');
const app = express();
const PORT = 3001;
const db = mongoose.connection;
const DB_URL = process.env.DB_URL || 'mongodb://localhost/test';

mongoose.connect(DB_URL, {
    useMongoClient: true
});

db.on('error', console.error.bind(console, 'connection error:'));

app.use(logger('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/api/currency/ukraine/p24', Privat24Module.getCurrencyFromPrivatAPI);

app.get('/api/ukraine/', Privat24Module.getLatestPrivatCurrency);

app.get('/api/currency/europe/ecb/', EuropeanCentralBankModule.getCurrencyFromECB);

app.get('/api/ecb/', EuropeanCentralBankModule.getLatestECBCurrency);

app.get('/api/initial/bitcoins/', InitalLoad.loadBitcoins);

app.get('/api/initial/uah/', InitalLoad.loadFromPrivat);

app.get('/api/initial/ecb', InitalLoad.loadFromEBC);

app.get('/health', (req, res) => {
    const status = 2 * 5;
    res.status(200).json({"status": status})
});

app.listen(PORT, function () {
    console.log('Listening on port %s!', PORT)
});