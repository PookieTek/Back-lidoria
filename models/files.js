const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    path: String,
    extension: String
});

module.exports = mongoose.model('File', fileSchema);