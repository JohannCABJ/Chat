const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
        name: String,
})

const model = mongoose.model('user', mySchema) //El primer parámetro hace referencia al nombre de la collection (tabla) que le vamos a dar

module.exports = model