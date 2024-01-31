const { Schema, model } = require('mongoose')

const Product = new Schema({
    header: {
        type: String,
        require: true
    },
    price: {
        type: Number
    },
    emimageail: {
        type: String
    }
})

module.exports = model('Product', Product)