const { ObjectId } = require('bson')
const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    title: { type: String},
    excerpt: { type: String},
    description: { type: String},
    date:{type: Date, dafault: Date.now},
    upload:{type: String},
    images: { type: String},
})

const newscontent = Mongoose.model('newscontent',Schema)

module.exports = newscontent
