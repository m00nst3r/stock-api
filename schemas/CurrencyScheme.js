const mongoose = require('mongoose');

const currencySchema = mongoose.Schema({
    name: String,
    base: String,
    currency: Array,
    date: Date
});

module.exports = currencySchema;