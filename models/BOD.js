const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    name: { type: String},
    structure: { type: String},//bod/boc
    image: { type: String},
    pengalaman: { type: String},
})

const BOD = Mongoose.model('BOD',Schema)

module.exports = BOD
