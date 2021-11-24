const Mongoose = require('mongoose')
const { ObjectId } = require('bson')


var Schema = new Mongoose.Schema({
    title: { type: String},
    uploadby: { type: String},
    image: { type: String},
    date:{type: Date, dafault: Date.now},
})

const iklan = Mongoose.model('iklan',Schema)

module.exports = iklan
