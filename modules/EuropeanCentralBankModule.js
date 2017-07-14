const mongoose = require('mongoose');
const request = require('request');
const privatSchema = require('../schemas/PrivatScheme');
const EuropeanCentralBankCurrency = mongoose.model('EuropeanCentralBankCurrency', privatSchema);


saveCurrencyFromECB = (data) => {
    const Currency = new EuropeanCentralBankCurrency({
        name: 'European Central Bank',
        currency: data.rates,
        base: data.base,
        date: new Date()
    });

    Currency.save()
        .then(() => {
            console.log('Saved From European Central Bank to db');
        })
        .catch(err => {console.log(err);});
};

function getCurrencyFromECB(req, res) {
    request.get('http://api.fixer.io/latest', (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            saveCurrencyFromECB(JSON.parse(body));
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