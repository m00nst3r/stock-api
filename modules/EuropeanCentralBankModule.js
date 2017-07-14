const mongoose = require('mongoose');
const request = require('request');
const currencyScheme = require('../schemas/CurrencyScheme');
const EuropeanCentralBankCurrency = mongoose.model('EuropeanCentralBankCurrency', currencyScheme);
const utils = require('../utils');

function getCurrencyFromECB(req, res) {
    request.get('http://api.fixer.io/latest', (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            utils.saveCurrencyToDataBase(JSON.parse(body), 'European Central Bank', 'EuropeanCentralBankCurrency');
            res.json({'response': JSON.parse(body)});
        }
    });
}

function getLatestECBCurrency (req, res) {
    EuropeanCentralBankCurrency.find().limit(1).sort({$natural:-1}).then(item => {
        res.json({"response": Object.assign({}, {
            id: item[0]._id,
            name: item[0].name,
            date: item[0].date,
            base: item[0].base || null,
            currency: item[0].currency
        })})
    })
}

module.exports = {
    getCurrencyFromECB: getCurrencyFromECB,
    getLatestECBCurrency: getLatestECBCurrency
};