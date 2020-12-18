const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const shopSchema = mongoose.Schema({
    title: String,
    description: String,
    categorie: String,
    quantity: Number,
    price: Number,
    coupon: {activate: Boolean, code: String, reduction: Number},
    hidden: Boolean,
    date: {type: Date, default: Date.now},
    meta: {hit: Number},
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }]
});

const categorieSchema = mongoose.Schema({
    name: String
})

const Shop = mongoose.model('Shop', shopSchema);
const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = {
    Shop,
    Categorie
}