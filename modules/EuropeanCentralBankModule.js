const request = require('request');
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
    utils.getLatestCurrencyFromDataBase('EuropeanCentralBankCurrency')
        .then(item => {
            res.json({"response": item});
        }).catch(err => {
        console.log('err');
        console.log(err);
    })
}

module.exports = {
    getCurrencyFromECB: getCurrencyFromECB,
    getLatestECBCurrency: getLatestECBCurrency
};