const request = require('request');

function loadBitcoinCurrencyFromCoindesk (req, res) {
    request.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2017-08-01', (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            console.log(JSON.parse(body));
            /*const data = Object.assign({}, {
                rates: JSON.parse(body),
                base: "UAH"
            });
            utils.saveCurrencyToDataBase(data, 'Privat Bank 24', 'PrivatCurrency');*/
            res.json({'response': {}});
        }
    });
}

module.exports = {
    loadBitcoinsCurrency: loadBitcoinCurrencyFromCoindesk
};