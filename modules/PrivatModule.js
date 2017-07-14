const request = require('request');
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
    utils.getLatestCurrencyFromDataBase('PrivatCurrency')
        .then(item => {
            res.json({"response": item});
        }).catch(err => {
            console.log('err');
            console.log(err);
        })
}

module.exports = {
    getLatestPrivatCurrency: getLatestPrivatCurrency,
    getCurrencyFromPrivatAPI: getCurrencyFromPrivatAPI
};
