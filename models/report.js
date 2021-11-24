const Mongoose = require('mongoose')
const { ObjectId } = require('bson')


var Schema = new Mongoose.Schema({
    user: { type: String},
    devisi: { type: String},
    role: { type: String},
    date:{type: Date, dafault: Date.now},
})

const audit = Mongoose.model('audit',Schema)

module.exports = audit
