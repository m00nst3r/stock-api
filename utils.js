const mongoose = require('mongoose');
const currencyScheme = require('./schemas/CurrencyScheme');

saveCurrencyToDataBase = (data, bankName, collectionName) => {
    const BankCurrency = mongoose.model(collectionName, currencyScheme);
    const Currency = new BankCurrency({
        name: bankName,
        currency: data.rates,
        base: data.base,
        date: new Date()
    });

    Currency.save()
        .then(() => {
            console.log(`Saved ${bankName} Bank to db`);
        })
        .catch(err => {console.log(err);});
};

module.exports = {
    saveCurrencyToDataBase
};