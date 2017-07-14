const mongoose = require('mongoose');
const request = require('request');
const currencyScheme = require('../schemas/CurrencyScheme');
const PrivatCurrency = mongoose.model('PrivatCurrency', currencyScheme);
const utils = require('../utils');

function getCurrencyFromPrivatAPI(req, res) {
    request.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4', (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            const data = Object.assign({}, {
                rates: JSON.parse(body),
                base: "UAH"
            });
            utils.saveCurrencyToDataBase(data, 'Privat Bank 24', 'PrivatCurrency');
            res.json({'response': data});
        }
    });
}

function getLatestPrivatCurrency (req, res) {
    PrivatCurrency.find().limit(1).sort({$natural:-1}).then(item => {
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
    getLatestPrivatCurrency: getLatestPrivatCurrency,
    getCurrencyFromPrivatAPI: getCurrencyFromPrivatAPI
};
