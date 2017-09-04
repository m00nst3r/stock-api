const request = require('request');
const utils = require('../../utils');
const URL = require('../../Types/Links');
const ItemTypes = require('../../Types/ItemTypes');

function saveToDatabase(data) {
    const normalized = data.map(i => {
        return Object.assign({}, {
            date: i.time,
            base: 'EUR',
            rates: i.Cube.map(item => Object.assign({}, {
                [item.currency]: item.rate
            }))
        });
    });

    utils.saveBulkUploadToDataBase(normalized, ItemTypes.ecb.bankName, ItemTypes.ecb.collectionName)
}

function load90daysCurrency(req, res) {
    request.get(URL.ecb + '/ecb90', (error, response, body) => {
        if (error) {
            console.log(error);
            return error;
        }
        if (response.statusCode !== 200) {
            console.log('not 200');
        } else {
            const data = JSON.parse(body);
            saveToDatabase(data);
            res.send(data)
        }
    })
}
module.exports = load90daysCurrency;
