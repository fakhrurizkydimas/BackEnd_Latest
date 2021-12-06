const Mongoose = require('mongoose')
const { ObjectId } = require('bson')


var Schema = new Mongoose.Schema({
    username: { type: String},
    divisi: { type: String},
    date: { type: Date, dafault: Date.now },
    link: { type: String},
})

const infographics = Mongoose.model('infographics',Schema)

module.exports = infographics
