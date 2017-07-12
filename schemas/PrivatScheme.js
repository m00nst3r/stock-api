const mongoose = require('mongoose');

const privatSchema = mongoose.Schema({
    name: String,
    currency: Array,
    date: Date
});

module.exports = privatSchema;