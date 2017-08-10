const request = require('request');
const Promise = require('promise');

module.exports = function (req, res) {
    request('https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014', (err, response, data) => {
        if (response.statusCode === 200) {
            res.send(data)
        }
    });
};