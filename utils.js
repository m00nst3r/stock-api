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