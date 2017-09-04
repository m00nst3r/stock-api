const bitcoins = require('./Bitcoins');
const privat24 = require('./Privat24');
const ebc = require('./ECB');

module.exports = {
    loadBitcoins: bitcoins,
    loadFromPrivat: privat24,
    loadFromEBC: ebc
};