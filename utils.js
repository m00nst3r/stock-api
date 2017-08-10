const mongoose = require('mongoose');
const currencyScheme = require('./schemas/CurrencyScheme');

/**
 * Save currency to database
 * @param data {Object} contains fields rates and base
 * @param bankName {String} Bank or Source name
 * @param collectionName {String} Name of collection in database
 */
function saveCurrencyToDataBase (data, bankName, collectionName) {
    const BankCurrency = mongoose.model(collectionName, currencyScheme);
    const date = data.date ? new Date(data.date) : new Date();
    const Currency = new BankCurrency({
        name: bankName,
        currency: data.rates,
        base: data.base,
        date: date
    });

    Currency.save()
        .then(() => {
            console.log(`Saved ${bankName} Bank to db with date ${data.date}`);
        })
        .catch(err => {console.log(err);});
}

getLatestCurrencyFromDataBase = (collectionName) => {
    const BankCurrency = mongoose.model(collectionName, currencyScheme);
    return BankCurrency.find().limit(1).sort({$natural:-1}).then(item => {
        return Object.assign({}, {
            id: item[0]._id,
            name: item[0].name,
            date: item[0].date,
            base: item[0].base || null,
            currency: item[0].currency
        });
    })
};

module.exports = {
    saveCurrencyToDataBase,
    getLatestCurrencyFromDataBase
};