const request = require('request');
const utils  = require('../../utils.js');
const ItemTypes = require('../../Types/ItemTypes');
const URLS = require('../../Types/Links');

function saveAllData(data) {
    // db.getCollection('coindeskbitcoins').find({"date": new ISODate("2017-08-09 00:00:00.000Z")})
    const promises = data.map(item => {
        const data = {
            rates: item.currency,
            base: 'USD',
            date: item.date
        };
        return utils.saveCurrencyToDataBase(data, ItemTypes.BitcoinsBank, ItemTypes.CoindeskBitcoins)
    });
    Promise.all(promises)
        .then(resp => {
            console.log('DONE!');
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = function loadBitcoins(req, res) {
    request.get(URLS.bitcoins, (error, response, body) => {
        if(error) {
            console.log(error);
        }
        if(response.statusCode !== 200 ) {
            console.log('1111');
        } else {
            const data = JSON.parse(body);
            const {bpi} = data;
            const arr = Object.keys(bpi).map(key => {
                return {
                    date: key,
                    base: 'bitcon',
                    name: 'coindesk',
                    currency: [
                        {usd: bpi[key]}
                    ]
                }
            });
            saveAllData(arr);
            res.json({'response': data.bpi});
        }
    });
};