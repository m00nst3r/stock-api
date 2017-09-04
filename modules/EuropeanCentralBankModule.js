const request = require('request');
const utils = require('../utils');
const Links = require('../Types/Links');
const ItemTypes = require('../Types/ItemTypes');

function getCurrencyFromECB(req, res) {
    request.get(`${Links.ecb}/ecb`, (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            const item = JSON.parse(body);
            const data = Object.assign({}, {
                date: item.time,
                base: 'EUR',
                rates: item.Cube.map(i => Object.assign({}, {
                    [i.currency]: i.rate
                }))
            });
            utils.saveCurrencyToDataBase(data, ItemTypes.ecb.bankName, ItemTypes.ecb.collectionName);
            res.json({'response': data});
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