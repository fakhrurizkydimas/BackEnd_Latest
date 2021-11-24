const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    title: { type: String},
    nomor: { type: String},
    date: { type: String},
    regulation: { type: String},
})

const regulation = Mongoose.model('regulation',Schema)

module.exports = regulation
