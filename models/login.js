const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    username: { type: String},
    password: { type: String},
    email: { type: String},
    divisi: { type: String},
    roles: { type: String}, //admin dan user
    images: { type: String},
})

const login = Mongoose.model('login',Schema)

module.exports = login
