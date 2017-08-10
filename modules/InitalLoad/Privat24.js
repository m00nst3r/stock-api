const request = require('request');
const URLS = require('../../Types/Links');

module.exports = function (req, res) {
    request(`${URLS.uah}01.12.2014`, (err, response, data) => {
        if (response.statusCode === 200) {
            res.send(data)
        }
    });
};