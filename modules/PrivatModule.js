const mongoose = require('mongoose');
const request = require('request');
const privatSchema = require('../schemas/PrivatScheme');
const PrivatCurrency = mongoose.model('PrivatCurrency', privatSchema);

saveCurrencyFromP24 = (currency) => {
    const privatCurrency = new PrivatCurrency({
        name: 'Privat Bank 24',
        currency: currency,
        base: 'UAH',
        date: new Date()
    });

    privatCurrency.save()
        .then(() => {
            console.log('Saved From Privat 24 to db');
        })
        .catch(err => {console.log(err);});
};

function getCurrencyFromPrivatAPI(req, res) {
    request.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4', (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            saveCurrencyFromP24(JSON.parse(body));
            res.json({'response': JSON.parse(body)});
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
